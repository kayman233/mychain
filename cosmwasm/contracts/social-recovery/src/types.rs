use cosmwasm_schema::cw_serde;
use cosmwasm_std::Binary;

#[cw_serde]
pub struct MerkleProof {
    pub leaf: String,           // the sub_hash being proven (hex)
    pub siblings: Vec<String>,  // sibling hashes at each level (hex)
    pub path_indices: Vec<bool>, // false=left, true=right
}

#[cw_serde]
pub struct OAuthGuardian {
    pub provider: String,
    pub sub_hash: String,
}

#[cw_serde]
pub struct OAuthConfig {
    pub google_issuer: String,
    pub expected_audience: String,
    pub max_clock_skew: u64,
    // Single attestor (backward compat)
    pub attestor_pubkey: Option<Binary>,
    // Multi-attestor
    pub attestor_pubkeys: Option<Vec<Binary>>,
    pub attestor_threshold: Option<u64>,
}

#[cw_serde]
pub enum OAuthAttestationAction {
    Recover,
    Revoke,
    StoreShare,
}

#[cw_serde]
pub struct OAuthAttestation {
    pub provider: String,
    pub contract: String,
    pub chain_id: String,
    pub sub_hash: String,
    pub action: OAuthAttestationAction,
    pub new_pubkey: Option<Binary>,
    pub share_hash: Option<String>,
    pub nonce: String,
    pub expires_at: u64,
}

#[cw_serde]
pub struct OAuthAttestationProof {
    pub attestation: OAuthAttestation,
    // Single signature (backward compat)
    pub signature: Option<Binary>,
    // Multiple signatures
    pub signatures: Option<Vec<Binary>>,
}
