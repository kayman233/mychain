use cosmwasm_std::{Binary, StdResult, Storage, Order};

use account_base::state::PUBKEY;

use crate::{state::{GUARDIANS, THRESHOLD, VOTES, COUNTS, KEY_VALUE_STORE, DATA_SECRET}, msg::{GuardiansListResp, VotesResponse, CountsResponse, KeyValueResponse}};

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
