use cosmwasm_std::{Addr, Binary, Response, Storage, Deps};

use account_base::{state::PUBKEY, execute::sha256};

use crate::{error::{ContractResult, ContractError}, state::{VOTES, GUARDIANS, COUNTS, THRESHOLD, KEY_VALUE_STORE}};

pub fn before_tx(
    deps:      Deps,
    tx_bytes:  &Binary,
    signature: Option<&Binary>,
    simulate:  bool,
) -> ContractResult<Response> {
    let tx_bytes_hash = sha256(tx_bytes);
    let pubkey = PUBKEY.load(deps.storage)?;

    // skip the signature validation in simulation mode
    if !simulate {
        let Some(sig_bytes) = signature else {
            return Err(ContractError::SignatureNotFound);
        };

        if !deps.api.secp256k1_verify(&tx_bytes_hash, sig_bytes, &pubkey)? {
            return Err(ContractError::InvalidSignature);
        }
    }

    Ok(Response::new()
        .add_attribute("method", "before_tx"))
}

pub fn after_tx() -> ContractResult<Response> {
    Ok(Response::new()
        .add_attribute("method", "after_tx"))
}

// this function is not used in this base contract directly, but is used by
// several other account contracts that extend base, so we put it here
pub fn assert_self(sender: &Addr, contract: &Addr) -> ContractResult<()> {
    if sender != contract {
        return Err(ContractError::Unauthorized);
    }

    Ok(())
}

pub fn update_pubkey(
    store:      &mut dyn Storage,
    sender:     &Addr,
    contract:   &Addr,
    new_pubkey: &Binary,
) -> ContractResult<Response> {
    // only the account itself can update its pubkey
    assert_self(sender, contract)?;

    PUBKEY.save(store, new_pubkey)?;

    Ok(Response::new()
        .add_attribute("method", "update_pubkey")
        .add_attribute("new_pubkey", new_pubkey.to_base64()))
}

pub fn recover(
    store:      &mut dyn Storage,
    sender:     &Addr,
    new_pubkey: &Binary,
) -> ContractResult<Response> {
    let guardians = GUARDIANS.load(store)?;

    if !guardians.contains(sender) {
        return Err(ContractError::NotGuardian);
    }

    let is_empty = VOTES.may_load(store, sender)?;

    if is_empty != None {
        return Err(ContractError::AlreadyVoted);
    }

    let is_empty_count = COUNTS.may_load(store, &new_pubkey.to_string())?;
    let mut count: u64 = 0;

    if is_empty_count != None {
        count = COUNTS.load(store, &new_pubkey.to_string())?;
    }

    count = count + 1;

    let threshold = THRESHOLD.load(store)?;

    if count >= threshold {
        COUNTS.clear(store);
        VOTES.clear(store);
        PUBKEY.save(store, new_pubkey)?;
        return Ok(Response::new());
    }

    COUNTS.save(store, &new_pubkey.to_string(), &count)?;
    VOTES.save(store, sender, new_pubkey)?;

    Ok(Response::new())
}

pub fn revoke(
    store:      &mut dyn Storage,
    sender:     &Addr,
) -> ContractResult<Response> {
    let guardians = GUARDIANS.load(store)?;

    if !guardians.contains(sender) {
        return Err(ContractError::NotGuardian);
    }

    let is_empty = VOTES.may_load(store, sender)?;

    if is_empty == None {
        return Err(ContractError::NoVoted);
    }

    let new_pubkey = VOTES.load(store, sender)?;

    let is_empty_count = COUNTS.may_load(store, &new_pubkey.to_string())?;

    if is_empty_count == None {
        return Err(ContractError::NoVoted);
    }

    let mut count: u64 = COUNTS.load(store, &new_pubkey.to_string())?;

    if count <= 0 {
        return Err(ContractError::NoVoted);
    }

    count = count - 1;

    if count == 0 {
        COUNTS.remove(store, &new_pubkey.to_string());
    } else {
        COUNTS.save(store, &new_pubkey.to_string(), &count)?;
    }
    VOTES.remove(store, sender);

    Ok(Response::new())
}

pub fn store_data(
    store: &mut dyn Storage,
    sender: &Addr,
    contract: &Addr,
    key: &str,
    value: &Binary,
) -> ContractResult<Response> {
    // only the account itself can store data
    assert_self(sender, contract)?;

    KEY_VALUE_STORE.save(store, key, value)?;

    Ok(Response::new()
        .add_attribute("method", "store_data")
        .add_attribute("key", key)
        .add_attribute("value", value.to_base64()))
}

pub fn remove_data(
    store: &mut dyn Storage,
    sender: &Addr,
    contract: &Addr,
    key: &str,
) -> ContractResult<Response> {
    // only the account itself can remove data
    assert_self(sender, contract)?;

    KEY_VALUE_STORE.remove(store, key);

    Ok(Response::new()
        .add_attribute("method", "remove_data")
        .add_attribute("key", key))
}
