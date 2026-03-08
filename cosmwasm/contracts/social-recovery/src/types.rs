use cosmwasm_schema::cw_serde;
use cosmwasm_std::Binary;

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
    pub attestor_pubkey: Option<Binary>,
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
    pub signature: Binary,
}
