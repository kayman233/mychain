import { OAuthAttestationProof } from '../codegen/SocialRecovery.types';

export type OAuthAttestationAction = 'recover' | 'revoke' | 'store_share';

export interface OAuthAttestationRequest {
  idToken: string;
  contract: string;
  chainId: string;
  action: OAuthAttestationAction;
  newPubkey?: string;
  shareHash?: string;
  salt?: string;
}

/**
 * Extended proof type that supports multiple signatures from independent attestors.
 * The codegen type only has `signature: string`, but the contract is being updated
 * to accept `signatures: string[]` as well. We use this extended type on the client
 * and cast when passing to the contract client.
 */
export interface MultiAttestorProof {
  attestation: OAuthAttestationProof['attestation'];
  signature?: string;
  signatures?: string[];
}

/**
 * Request payload for co-signing mode.
 * When `attestation` is provided, the attestor verifies the JWT but signs
 * the provided attestation instead of creating a new one.
 */
export interface OAuthCoSignRequest {
  idToken: string;
  attestation: OAuthAttestationProof['attestation'];
}

function getAttestorUrls(): string[] {
  const envUrls = process.env.NEXT_PUBLIC_OAUTH_ATTESTOR_URLS;
  if (envUrls) {
    return envUrls.split(',').map(u => u.trim()).filter(Boolean);
  }
  return ['/api/oauth-attest'];
}

async function fetchFromAttestor(
  url: string,
  payload: OAuthAttestationRequest | OAuthCoSignRequest
): Promise<any> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error || `Attestor ${url} failed`);
  }

  return response.json();
}

/**
 * Request an OAuth attestation, potentially from multiple independent attestors.
 *
 * Single attestor (backward compatible):
 *   Sends the request to a single endpoint and returns the proof as-is.
 *
 * Multi-attestor (two-phase):
 *   1. Gets a full attestation+signature from the primary attestor (first URL).
 *   2. Sends a co-sign request (with the attestation from step 1) to all other
 *      attestors in parallel. Each co-signer verifies the JWT independently and
 *      signs the same attestation.
 *   3. Combines all signatures into a single proof with `signatures[]`.
 */
export async function requestOAuthAttestation(
  payload: OAuthAttestationRequest
): Promise<MultiAttestorProof> {
  const urls = getAttestorUrls();

  if (urls.length === 1) {
    // Single attestor -- backward compatible
    const proof: OAuthAttestationProof = await fetchFromAttestor(urls[0], payload);
    return {
      attestation: proof.attestation,
      signature: proof.signature,
    };
  }

  // Phase 1: Get full attestation from primary attestor
  const primaryProof: OAuthAttestationProof = await fetchFromAttestor(urls[0], payload);
  const allSignatures: string[] = [primaryProof.signature];

  // Phase 2: Request co-signatures from remaining attestors in parallel
  const coSignPayload: OAuthCoSignRequest = {
    idToken: payload.idToken,
    attestation: primaryProof.attestation,
  };

  const coSignResults = await Promise.allSettled(
    urls.slice(1).map(url => fetchFromAttestor(url, coSignPayload))
  );

  for (const result of coSignResults) {
    if (result.status === 'fulfilled') {
      const coSignResponse = result.value;
      if (coSignResponse.signature) {
        allSignatures.push(coSignResponse.signature);
      }
    } else {
      console.warn('Co-sign attestor failed:', result.reason?.message || result.reason);
    }
  }

  return {
    attestation: primaryProof.attestation,
    signatures: allSignatures,
  };
}

/**
 * Get an OAuth salt for a contract address. The salt is persisted in localStorage
 * so the same sub_hash is generated consistently for a given contract.
 */
export function getOAuthSalt(contractAddress: string): string {
  const key = `oauth_salt_${contractAddress}`;
  let salt = localStorage.getItem(key);
  if (!salt) {
    salt = crypto.randomUUID();
    localStorage.setItem(key, salt);
  }
  return salt;
}
