import type { NextApiRequest, NextApiResponse } from 'next';
import * as secp256k1 from '@noble/secp256k1';

function parsePrivateKeyHex(rawKey: string): Uint8Array {
  const normalized = rawKey.startsWith('0x') ? rawKey.slice(2) : rawKey;
  if (!/^[0-9a-fA-F]{64}$/.test(normalized)) {
    throw new Error('OAUTH_ATTESTOR_PRIVKEY_HEX must be a 32-byte hex string');
  }
  return Uint8Array.from(Buffer.from(normalized, 'hex'));
}

function parseCompressedPubkeyBase64(rawPubkey: string): string {
  const bytes = Uint8Array.from(Buffer.from(rawPubkey, 'base64'));
  if (bytes.length !== 33) {
    throw new Error(
      'OAUTH_ATTESTOR_PUBKEY must be a base64-encoded 33-byte compressed secp256k1 pubkey'
    );
  }
  return Buffer.from(bytes).toString('base64');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const configuredPubkey = process.env.OAUTH_ATTESTOR_PUBKEY;
    if (configuredPubkey) {
      return res.status(200).json({
        attestor_pubkey: parseCompressedPubkeyBase64(configuredPubkey),
      });
    }

    const privateKeyHex = process.env.OAUTH_ATTESTOR_PRIVKEY_HEX;
    if (!privateKeyHex) {
      return res.status(500).json({
        error:
          'Attestor pubkey is not configured; set OAUTH_ATTESTOR_PUBKEY or OAUTH_ATTESTOR_PRIVKEY_HEX',
      });
    }

    const privateKey = parsePrivateKeyHex(privateKeyHex);
    const compressedPubkey = secp256k1.getPublicKey(privateKey, true);
    return res.status(200).json({
      attestor_pubkey: Buffer.from(compressedPubkey).toString('base64'),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Failed to derive attestor pubkey' });
  }
}
