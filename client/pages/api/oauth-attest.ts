import { createHash, randomBytes } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as secp256k1 from '@noble/secp256k1';

import {
  OAuthAttestation,
  OAuthAttestationAction,
  OAuthAttestationProof,
} from '../../codegen/SocialRecovery.types';

type TokenInfoResponse = {
  aud?: string;
  exp?: string;
  iss?: string;
  sub?: string;
  error?: string;
  error_description?: string;
};

type OAuthAttestationRequest = {
  idToken?: string;
  contract?: string;
  chainId?: string;
  action?: OAuthAttestationAction;
  newPubkey?: string;
  value?: string;
};

type RemoteSignerRequest = {
  message_hash_hex: string;
  context: {
    provider: string;
    contract: string;
    chain_id: string;
    action: OAuthAttestationAction;
    sub_hash: string;
    nonce: string;
    expires_at: number;
  };
};

type RemoteSignerResponse = {
  signature_base64?: string;
  signature?: string;
  error?: string;
};

const GOOGLE_TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo';
const DEFAULT_RATE_LIMIT_WINDOW_MS = 60_000;
const DEFAULT_RATE_LIMIT_MAX = 20;
const DEFAULT_REMOTE_SIGNER_TIMEOUT_MS = 3_000;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __oauthAttestRateLimit: Map<string, RateLimitBucket> | undefined;
}

function sha256Hex(data: Uint8Array | string): string {
  const hasher = createHash('sha256');
  hasher.update(data);
  return hasher.digest('hex');
}

function parsePrivateKeyHex(rawKey: string): Uint8Array {
  const normalized = rawKey.startsWith('0x') ? rawKey.slice(2) : rawKey;
  if (!/^[0-9a-fA-F]{64}$/.test(normalized)) {
    throw new Error('OAUTH_ATTESTOR_PRIVKEY_HEX must be a 32-byte hex string');
  }
  return Uint8Array.from(Buffer.from(normalized, 'hex'));
}

function isAllowedGoogleIssuer(issuer: string): boolean {
  return issuer === 'accounts.google.com' || issuer === 'https://accounts.google.com';
}

function attestationSigningMessage(attestation: OAuthAttestation): string {
  const newPubkey = attestation.new_pubkey ?? '-';
  const shareHash = attestation.share_hash ?? '-';
  return `oauth_attestation:v1:${attestation.provider}:${attestation.contract}:${attestation.chain_id}:${attestation.sub_hash}:${attestation.action}:${newPubkey}:${shareHash}:${attestation.nonce}:${attestation.expires_at}`;
}

async function fetchTokenInfo(idToken: string): Promise<TokenInfoResponse> {
  const response = await fetch(`${GOOGLE_TOKENINFO_URL}?id_token=${encodeURIComponent(idToken)}`);
  return response.json();
}

function getRateLimitStore(): Map<string, RateLimitBucket> {
  if (!global.__oauthAttestRateLimit) {
    global.__oauthAttestRateLimit = new Map<string, RateLimitBucket>();
  }
  return global.__oauthAttestRateLimit;
}

function getClientIp(req: NextApiRequest): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }
  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function takeRateLimitToken(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const store = getRateLimitStore();
  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= max) {
    return false;
  }

  existing.count += 1;
  store.set(key, existing);
  return true;
}

function parseSignatureBase64(signatureBase64: string): Uint8Array {
  const bytes = Uint8Array.from(Buffer.from(signatureBase64, 'base64'));
  if (bytes.length !== 64) {
    throw new Error('Signer returned invalid signature length; expected 64-byte compact signature');
  }
  return bytes;
}

async function signWithRemoteSigner(
  signerUrl: string,
  signerApiKey: string | undefined,
  payload: RemoteSignerRequest,
  timeoutMs: number
): Promise<Uint8Array> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(signerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(signerApiKey ? { Authorization: `Bearer ${signerApiKey}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const body = (await response.json().catch(() => ({}))) as RemoteSignerResponse;
    if (!response.ok) {
      const message = body?.error || `Remote signer returned HTTP ${response.status}`;
      throw new Error(message);
    }

    const signatureBase64 = body.signature_base64 || body.signature;
    if (!signatureBase64) {
      throw new Error('Remote signer response does not contain signature');
    }

    return parseSignatureBase64(signatureBase64);
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body as OAuthAttestationRequest;
    const expectedAudience =
      process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const privateKeyHex = process.env.OAUTH_ATTESTOR_PRIVKEY_HEX;
    const remoteSignerUrl = process.env.OAUTH_ATTEST_SIGNER_URL;
    const remoteSignerApiKey = process.env.OAUTH_ATTEST_SIGNER_API_KEY;
    const remoteSignerTimeoutMs = Number(
      process.env.OAUTH_ATTEST_SIGNER_TIMEOUT_MS || DEFAULT_REMOTE_SIGNER_TIMEOUT_MS
    );
    const ttlSeconds = Number(process.env.OAUTH_ATTESTATION_TTL_SEC || '180');
    const rateLimitWindowMs = Number(
      process.env.OAUTH_ATTEST_RATE_WINDOW_MS || DEFAULT_RATE_LIMIT_WINDOW_MS
    );
    const rateLimitMax = Number(process.env.OAUTH_ATTEST_RATE_MAX || DEFAULT_RATE_LIMIT_MAX);
    const clientIp = getClientIp(req);

    if (!takeRateLimitToken(`ip:${clientIp}`, rateLimitMax, rateLimitWindowMs)) {
      return res.status(429).json({ error: 'Too many attestation requests, try again later' });
    }

    if (!expectedAudience) {
      return res
        .status(500)
        .json({ error: 'GOOGLE_CLIENT_ID or NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set' });
    }
    if (!privateKeyHex && !remoteSignerUrl) {
      return res.status(500).json({
        error:
          'Attestor signer is not configured; set OAUTH_ATTESTOR_PRIVKEY_HEX or OAUTH_ATTEST_SIGNER_URL',
      });
    }
    if (!body.idToken || !body.contract || !body.chainId || !body.action) {
      return res.status(400).json({ error: 'idToken, contract, chainId, action are required' });
    }

    if (body.action === 'recover' && !body.newPubkey) {
      return res.status(400).json({ error: 'newPubkey is required for recover action' });
    }
    if (body.action === 'store_share' && !body.value) {
      return res.status(400).json({ error: 'value is required for store_share action' });
    }

    const tokenInfo = await fetchTokenInfo(body.idToken);
    if (tokenInfo.error || tokenInfo.error_description) {
      return res.status(401).json({
        error: tokenInfo.error_description || tokenInfo.error || 'Invalid Google token',
      });
    }

    if (!tokenInfo.iss || !isAllowedGoogleIssuer(tokenInfo.iss)) {
      return res.status(401).json({ error: 'Invalid token issuer' });
    }
    if (!tokenInfo.aud || tokenInfo.aud !== expectedAudience) {
      return res.status(401).json({ error: 'Invalid token audience' });
    }
    if (!tokenInfo.sub) {
      return res.status(401).json({ error: 'Token does not contain sub claim' });
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = Number(tokenInfo.exp || '0');
    if (!exp || now >= exp) {
      return res.status(401).json({ error: 'Google token expired' });
    }

    const subHash = sha256Hex(tokenInfo.sub);
    const shareHash =
      body.action === 'store_share' && body.value
        ? sha256Hex(Buffer.from(body.value, 'base64'))
        : null;

    const attestation: OAuthAttestation = {
      provider: 'google',
      contract: body.contract,
      chain_id: body.chainId,
      sub_hash: subHash,
      action: body.action,
      new_pubkey: body.action === 'recover' ? body.newPubkey || null : null,
      share_hash: shareHash,
      nonce: randomBytes(16).toString('hex'),
      expires_at: now + ttlSeconds,
    };

    const signingMessage = attestationSigningMessage(attestation);
    const signingHash = createHash('sha256').update(signingMessage).digest();
    let signatureBytes: Uint8Array;

    if (remoteSignerUrl) {
      signatureBytes = await signWithRemoteSigner(
        remoteSignerUrl,
        remoteSignerApiKey,
        {
          message_hash_hex: Buffer.from(signingHash).toString('hex'),
          context: {
            provider: attestation.provider,
            contract: attestation.contract,
            chain_id: attestation.chain_id,
            action: attestation.action,
            sub_hash: attestation.sub_hash,
            nonce: attestation.nonce,
            expires_at: attestation.expires_at,
          },
        },
        remoteSignerTimeoutMs
      );
    } else {
      const privateKey = parsePrivateKeyHex(privateKeyHex as string);
      const signature = await secp256k1.signAsync(signingHash, privateKey);
      signatureBytes = signature.toCompactRawBytes();
    }

    const proof: OAuthAttestationProof = {
      attestation,
      signature: Buffer.from(signatureBytes).toString('base64'),
    };

    return res.status(200).json(proof);
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Failed to build OAuth attestation' });
  }
}
