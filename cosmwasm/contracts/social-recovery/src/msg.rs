use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Binary, Addr};

#[cw_serde]
pub struct InstantiateMsg {
    pub pubkey: Binary,
    pub guardians: Vec<String>,
    pub threshold: u64,
}
#[cw_serde]
pub enum ExecuteMsg {
    /// Change the pubkey associated with this account.
    ///
    /// Only callable by the account itself.
    UpdatePubkey {
        new_pubkey: Binary,
    },
    Recover {
        new_pubkey: Binary,
    },
    Revoke {},
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
#[derive(QueryResponses)]
pub enum QueryMsg {
    /// Query the pubkey associated with this account.
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
}

