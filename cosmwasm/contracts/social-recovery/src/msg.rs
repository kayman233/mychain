use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Binary, Addr};

use crate::types::{OAuthAttestationProof, OAuthConfig, OAuthGuardian};

#[cw_serde]
pub struct InstantiateMsg {
    pub pubkey: Binary,
    pub guardians: Vec<String>,
    pub threshold: u64,
    pub oauth_guardians: Option<Vec<OAuthGuardian>>,
    pub oauth_config: Option<OAuthConfig>,
}

#[cw_serde]
pub enum ExecuteMsg {
    UpdatePubkey {
        new_pubkey: Binary,
    },
    Recover {
        new_pubkey: Binary,
    },
    Revoke {},
    StoreData {
        key: String,
        value: Binary,
    },
    RemoveData {
        key: String,
    },
    StoreSecret { value: Binary },
    RemoveSecret {},
    StoreShare { value: Binary },
    RemoveShare {},
    StoreRecoverData { value: Binary },
    RemoveRecoverData {},
    // OAuth messages
    RecoverWithOAuth {
        attestation: OAuthAttestationProof,
        new_pubkey: Binary,
    },
    RevokeOAuth {
        attestation: OAuthAttestationProof,
    },
    StoreOAuthShare {
        attestation: OAuthAttestationProof,
        value: Binary,
    },
}

#[cw_serde]
pub struct GuardiansListResp {
    pub guardians: Vec<Addr>,
}

#[cw_serde]
pub struct VotesResponse {
    pub addr:  Addr,
    pub vote:  String,
}

#[cw_serde]
pub struct CountsResponse {
    pub pubkey:  String,
    pub votes:  u64,
}

#[cw_serde]
pub struct KeyValueResponse {
    pub key: String,
    pub value: Binary,
}

#[cw_serde]
pub struct OAuthVotesResponse {
    pub sub_hash: String,
    pub vote: String,
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(Binary)]
    Pubkey {},
    #[returns(GuardiansListResp)]
    GuardiansList {},
    #[returns(u64)]
    Threshold {},
    #[returns(Vec<VotesResponse>)]
    Votes {},
    #[returns(Vec<CountsResponse>)]
    Counts {},
    #[returns(KeyValueResponse)]
    GetData { key: String },
    #[returns(Vec<KeyValueResponse>)]
    GetAllData {},
    #[returns(Binary)]
    GetSecret {},
    #[returns(Binary)]
    GetShare { address: String },
    #[returns(Vec<Binary>)]
    GetAllShares {},
    #[returns(Binary)]
    GetRecoverData { address: String },
    #[returns(Vec<Binary>)]
    GetAllRecoverData {},
    // OAuth queries
    #[returns(Vec<OAuthGuardian>)]
    OAuthGuardiansList {},
    #[returns(Vec<OAuthVotesResponse>)]
    OAuthVotes {},
    #[returns(OAuthConfig)]
    OAuthConfigQuery {},
    #[returns(Binary)]
    GetOAuthShare { sub_hash: String },
}
