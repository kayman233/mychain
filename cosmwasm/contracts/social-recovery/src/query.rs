use cosmwasm_std::{Binary, StdResult, Storage, Order, Addr};

use account_base::state::PUBKEY;

use crate::{
    state::{
        GUARDIANS, THRESHOLD, VOTES, COUNTS, KEY_VALUE_STORE, DATA_SECRET,
        SHARES, RECOVER_DATA, OAUTH_GUARDIANS, OAUTH_GUARDIANS_ROOT, OAUTH_VOTES, OAUTH_CONFIG, OAUTH_SHARES,
    },
    msg::{GuardiansListResp, VotesResponse, CountsResponse, KeyValueResponse, OAuthVotesResponse},
    types::{OAuthGuardian, OAuthConfig},
};

pub fn pubkey(store: &dyn Storage) -> StdResult<Binary> {
    PUBKEY.load(store)
}

pub fn guardians_list(store: &dyn Storage) -> StdResult<GuardiansListResp> {
    let guardians = GUARDIANS.load(store)?;
    let resp = GuardiansListResp { guardians };
    Ok(resp)
}

pub fn threshold(store: &dyn Storage) -> StdResult<u64> {
    THRESHOLD.load(store)
}

pub fn votes(store: &dyn Storage) -> StdResult<Vec<VotesResponse>> {
    VOTES
    .range(store, None, None, Order::Ascending)
    .map(|item| {
        let (addr, vote) = item?;
        Ok(VotesResponse {
            addr,
            vote: vote.to_string(),
        })
    })
    .collect()
}

pub fn counts(store: &dyn Storage) -> StdResult<Vec<CountsResponse>> {
    COUNTS
    .range(store, None, None, Order::Ascending)
    .map(|item| {
        let (pubkey, votes) = item?;
        Ok(CountsResponse {
            pubkey,
            votes,
        })
    })
    .collect()
}

pub fn get_data(store: &dyn Storage, key: &str) -> StdResult<KeyValueResponse> {
    let value = KEY_VALUE_STORE.load(store, key)?;
    Ok(KeyValueResponse {
        key: key.to_string(),
        value,
    })
}

pub fn get_all_data(store: &dyn Storage) -> StdResult<Vec<KeyValueResponse>> {
    KEY_VALUE_STORE
        .range(store, None, None, Order::Ascending)
        .map(|item| {
            let (key, value) = item?;
            Ok(KeyValueResponse {
                key,
                value,
            })
        })
        .collect()
}

pub fn get_secret(store: &dyn Storage) -> StdResult<Binary> {
    DATA_SECRET.load(store)
}

pub fn get_share(store: &dyn Storage, address: &str) -> StdResult<Binary> {
    let addr = Addr::unchecked(address);
    SHARES.load(store, &addr)
}

pub fn get_all_shares(store: &dyn Storage) -> StdResult<Vec<(Addr, Binary)>> {
    SHARES
        .range(store, None, None, Order::Ascending)
        .collect()
}

pub fn get_recover_data(store: &dyn Storage, address: &str) -> StdResult<Binary> {
    let addr = Addr::unchecked(address);
    RECOVER_DATA.load(store, &addr)
}

pub fn get_all_recover_data(store: &dyn Storage) -> StdResult<Vec<(Addr, Binary)>> {
    RECOVER_DATA
        .range(store, None, None, Order::Ascending)
        .collect()
}

// ---- OAuth queries ----

pub fn oauth_guardians_list(store: &dyn Storage) -> StdResult<Vec<OAuthGuardian>> {
    OAUTH_GUARDIANS.may_load(store).map(|opt| opt.unwrap_or_default())
}

pub fn oauth_votes(store: &dyn Storage) -> StdResult<Vec<OAuthVotesResponse>> {
    OAUTH_VOTES
        .range(store, None, None, Order::Ascending)
        .map(|item| {
            let (sub_hash, vote) = item?;
            Ok(OAuthVotesResponse {
                sub_hash,
                vote: vote.to_string(),
            })
        })
        .collect()
}

pub fn oauth_config(store: &dyn Storage) -> StdResult<OAuthConfig> {
    OAUTH_CONFIG.load(store)
}

pub fn get_oauth_share(store: &dyn Storage, sub_hash: &str) -> StdResult<Binary> {
    OAUTH_SHARES.load(store, sub_hash)
}

pub fn oauth_guardians_root(store: &dyn Storage) -> StdResult<String> {
    OAUTH_GUARDIANS_ROOT.load(store)
}
