use cosmwasm_std::{Addr, Api, Binary, Env, Response, Storage, Deps};

use account_base::{state::PUBKEY, execute::sha256};

use crate::{
    error::{ContractResult, ContractError},
    state::{
        VOTES, GUARDIANS, COUNTS, THRESHOLD, KEY_VALUE_STORE, DATA_SECRET,
        SHARES, RECOVER_DATA, OAUTH_GUARDIANS, OAUTH_GUARDIANS_ROOT, OAUTH_CONFIG,
        OAUTH_VOTES, OAUTH_SHARES, OAUTH_USED_ATTESTATIONS,
    },
    types::{
        MerkleProof, OAuthAttestation, OAuthAttestationAction, OAuthAttestationProof, OAuthConfig, OAuthGuardian,
    },
};

pub fn before_tx(
    deps:      Deps,
    tx_bytes:  &Binary,
    signature: Option<&Binary>,
    simulate:  bool,
) -> ContractResult<Response> {
    let tx_bytes_hash = sha256(tx_bytes);
    let pubkey = PUBKEY.load(deps.storage)?;

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
        OAUTH_VOTES.clear(store);
        PUBKEY.save(store, new_pubkey)?;
        return Ok(Response::new()
            .add_attribute("method", "recover")
            .add_attribute("threshold_reached", "true"));
    }

    COUNTS.save(store, &new_pubkey.to_string(), &count)?;
    VOTES.save(store, sender, new_pubkey)?;

    Ok(Response::new()
        .add_attribute("method", "recover")
        .add_attribute("count", count.to_string()))
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
    assert_self(sender, contract)?;

    KEY_VALUE_STORE.remove(store, key);

    Ok(Response::new()
        .add_attribute("method", "remove_data")
        .add_attribute("key", key))
}

pub fn store_secret(
    store: &mut dyn Storage,
    sender: &Addr,
    contract: &Addr,
    value: &Binary,
) -> ContractResult<Response> {
    assert_self(sender, contract)?;

    DATA_SECRET.save(store, value)?;

    Ok(Response::new()
        .add_attribute("method", "store_secret")
        .add_attribute("value", value.to_base64()))
}

pub fn remove_secret(
    store: &mut dyn Storage,
    sender: &Addr,
    contract: &Addr,
) -> ContractResult<Response> {
    assert_self(sender, contract)?;

    DATA_SECRET.remove(store);

    Ok(Response::new()
        .add_attribute("method", "remove_secret"))
}

pub fn store_share(
    store: &mut dyn Storage,
    sender: &Addr,
    value: &Binary,
) -> ContractResult<Response> {
    SHARES.save(store, sender, value)?;

    Ok(Response::new()
        .add_attribute("method", "store_share")
        .add_attribute("sender", sender.to_string())
        .add_attribute("value", value.to_base64()))
}

pub fn remove_share(
    store: &mut dyn Storage,
    sender: &Addr,
) -> ContractResult<Response> {
    SHARES.remove(store, sender);

    Ok(Response::new()
        .add_attribute("method", "remove_share")
        .add_attribute("sender", sender.to_string()))
}

pub fn store_recover_data(
    store: &mut dyn Storage,
    sender: &Addr,
    value: &Binary,
) -> ContractResult<Response> {
    RECOVER_DATA.save(store, sender, value)?;

    Ok(Response::new()
        .add_attribute("method", "store_recover_data")
        .add_attribute("sender", sender.to_string())
        .add_attribute("value", value.to_base64()))
}

pub fn remove_recover_data(
    store: &mut dyn Storage,
    sender: &Addr,
) -> ContractResult<Response> {
    RECOVER_DATA.remove(store, sender);

    Ok(Response::new()
        .add_attribute("method", "remove_recover_data")
        .add_attribute("sender", sender.to_string()))
}

pub fn update_oauth_config(
    store: &mut dyn Storage,
    sender: &Addr,
    contract: &Addr,
    oauth_config: &OAuthConfig,
) -> ContractResult<Response> {
    assert_self(sender, contract)?;
    OAUTH_CONFIG.save(store, oauth_config)?;
    Ok(Response::new()
        .add_attribute("method", "update_oauth_config"))
}

// ---- OAuth functions ----

fn is_google_guardian(guardians: &[OAuthGuardian], sub_hash: &str) -> bool {
    guardians.iter().any(|guardian| {
        guardian.sub_hash == sub_hash && guardian.provider.eq_ignore_ascii_case("google")
    })
}

fn oauth_attestation_action_str(action: &OAuthAttestationAction) -> &'static str {
    match action {
        OAuthAttestationAction::Recover => "recover",
        OAuthAttestationAction::Revoke => "revoke",
        OAuthAttestationAction::StoreShare => "store_share",
    }
}

fn oauth_attestation_signing_message(attestation: &OAuthAttestation) -> String {
    let new_pubkey = attestation
        .new_pubkey
        .as_ref()
        .map(Binary::to_base64)
        .unwrap_or_else(|| "-".to_string());
    let share_hash = attestation
        .share_hash
        .as_ref()
        .cloned()
        .unwrap_or_else(|| "-".to_string());

    format!(
        "oauth_attestation:v1:{}:{}:{}:{}:{}:{}:{}:{}:{}",
        attestation.provider,
        attestation.contract,
        attestation.chain_id,
        attestation.sub_hash,
        oauth_attestation_action_str(&attestation.action),
        new_pubkey,
        share_hash,
        attestation.nonce,
        attestation.expires_at,
    )
}

fn oauth_attestation_nonce_key(attestation: &OAuthAttestation) -> String {
    format!("{}:{}", attestation.sub_hash, attestation.nonce)
}

fn is_hex_64(value: &str) -> bool {
    value.len() == 64 && value.chars().all(|c| c.is_ascii_hexdigit())
}

struct VerifiedOAuthAttestation {
    sub_hash: String,
    nonce_key: String,
}

fn consume_oauth_attestation_nonce(
    store: &mut dyn Storage,
    nonce_key: &str,
) -> ContractResult<()> {
    if OAUTH_USED_ATTESTATIONS
        .may_load(store, nonce_key)?
        .unwrap_or(false)
    {
        return Err(ContractError::OAuthTokenReplay);
    }

    OAUTH_USED_ATTESTATIONS.save(store, nonce_key, &true)?;
    Ok(())
}

fn verify_oauth_attestation(
    api: &dyn Api,
    store: &mut dyn Storage,
    env: &Env,
    proof: &OAuthAttestationProof,
    expected_action: OAuthAttestationAction,
    expected_new_pubkey: Option<&Binary>,
    expected_share: Option<&Binary>,
) -> ContractResult<VerifiedOAuthAttestation> {
    let oauth_config = OAUTH_CONFIG
        .load(store)
        .map_err(|_| ContractError::OAuthNotConfigured)?;

    let attestation = &proof.attestation;

    if !attestation.provider.eq_ignore_ascii_case("google") {
        return Err(ContractError::InvalidOAuthAttestation);
    }

    if attestation.contract != env.contract.address.to_string() {
        return Err(ContractError::InvalidOAuthAttestation);
    }

    if attestation.chain_id != env.block.chain_id {
        return Err(ContractError::InvalidOAuthAttestation);
    }

    if attestation.action != expected_action {
        return Err(ContractError::InvalidOAuthAttestation);
    }

    if !is_hex_64(&attestation.sub_hash) {
        return Err(ContractError::InvalidOAuthAttestation);
    }

    if attestation.nonce.is_empty() {
        return Err(ContractError::InvalidOAuthAttestation);
    }

    if env.block.time.seconds() > attestation.expires_at {
        return Err(ContractError::OAuthAttestationExpired);
    }

    match expected_action {
        OAuthAttestationAction::Recover => {
            let Some(new_pubkey) = expected_new_pubkey else {
                return Err(ContractError::InvalidOAuthAttestation);
            };

            if attestation.new_pubkey.as_ref() != Some(new_pubkey) || attestation.share_hash.is_some() {
                return Err(ContractError::InvalidOAuthAttestation);
            }
        },
        OAuthAttestationAction::Revoke => {
            if attestation.new_pubkey.is_some() || attestation.share_hash.is_some() {
                return Err(ContractError::InvalidOAuthAttestation);
            }
        },
        OAuthAttestationAction::StoreShare => {
            let Some(share_value) = expected_share else {
                return Err(ContractError::InvalidOAuthAttestation);
            };
            let expected_share_hash = hex::encode(sha256(share_value));
            if attestation.share_hash.as_deref() != Some(expected_share_hash.as_str())
                || attestation.new_pubkey.is_some()
            {
                return Err(ContractError::InvalidOAuthAttestation);
            }
        },
    }

    let nonce_key = oauth_attestation_nonce_key(attestation);
    if OAUTH_USED_ATTESTATIONS.may_load(store, &nonce_key)?.unwrap_or(false) {
        return Err(ContractError::OAuthTokenReplay);
    }

    // Collect all signatures from the proof
    let all_signatures: Vec<&Binary> = {
        let mut sigs = Vec::new();
        if let Some(ref sig) = proof.signature {
            sigs.push(sig);
        }
        if let Some(ref multi_sigs) = proof.signatures {
            for sig in multi_sigs {
                sigs.push(sig);
            }
        }
        sigs
    };

    if all_signatures.is_empty() {
        return Err(ContractError::InvalidSignature);
    }

    // Determine attestor pubkeys and threshold
    let (pubkeys, threshold) = if let Some(ref multi_keys) = oauth_config.attestor_pubkeys {
        let thresh = oauth_config.attestor_threshold.unwrap_or(multi_keys.len() as u64);
        (multi_keys.clone(), thresh)
    } else if let Some(ref single_key) = oauth_config.attestor_pubkey {
        (vec![single_key.clone()], 1u64)
    } else {
        return Err(ContractError::OAuthAttestorNotConfigured);
    };

    // Count valid signatures
    let signing_message = oauth_attestation_signing_message(attestation);
    let signing_hash = sha256(&Binary::from(signing_message.into_bytes()));

    let mut valid_count = 0u64;
    let mut used_keys: Vec<bool> = vec![false; pubkeys.len()];

    for sig in &all_signatures {
        for (i, pubkey) in pubkeys.iter().enumerate() {
            if used_keys[i] {
                continue; // each key can only be used once
            }
            if api.secp256k1_verify(&signing_hash, sig, pubkey)? {
                valid_count += 1;
                used_keys[i] = true;
                break;
            }
        }
    }

    if valid_count < threshold {
        return Err(ContractError::InsufficientAttestorSignatures);
    }

    Ok(VerifiedOAuthAttestation {
        sub_hash: attestation.sub_hash.clone(),
        nonce_key,
    })
}

fn verify_merkle_proof(root: &str, proof: &MerkleProof) -> ContractResult<()> {
    if proof.siblings.len() != proof.path_indices.len() {
        return Err(ContractError::InvalidMerkleProof);
    }

    // The leaf is the sub_hash hex string; hash it to get the leaf node
    let mut current = sha256(&Binary::from(proof.leaf.as_bytes().to_vec()));

    for (sibling_hex, is_right) in proof.siblings.iter().zip(proof.path_indices.iter()) {
        let sibling = hex::decode(sibling_hex)
            .map_err(|_| ContractError::InvalidMerkleProof)?;

        // If is_right, current is on the left side; else current is on the right
        let combined = if *is_right {
            [current.as_slice(), sibling.as_slice()].concat()
        } else {
            [sibling.as_slice(), current.as_slice()].concat()
        };

        current = sha256(&Binary::from(combined));
    }

    let computed_root = hex::encode(&current);
    if computed_root != root {
        return Err(ContractError::InvalidMerkleProof);
    }

    Ok(())
}

fn verify_oauth_guardian_membership(
    store: &dyn Storage,
    sub_hash: &str,
    _provider: &str,
    merkle_proof: Option<&MerkleProof>,
) -> ContractResult<()> {
    // Try Merkle proof first
    if let Some(proof) = merkle_proof {
        if let Ok(root) = OAUTH_GUARDIANS_ROOT.load(store) {
            if proof.leaf != sub_hash {
                return Err(ContractError::InvalidMerkleProof);
            }
            return verify_merkle_proof(&root, proof);
        }
    }

    // Fallback to list-based check
    let oauth_guardians = OAUTH_GUARDIANS
        .load(store)
        .map_err(|_| ContractError::OAuthNotConfigured)?;

    if !is_google_guardian(&oauth_guardians, sub_hash) {
        return Err(ContractError::NotOAuthGuardian);
    }

    Ok(())
}

pub fn recover_with_oauth(
    api: &dyn Api,
    store: &mut dyn Storage,
    env: &Env,
    attestation: &OAuthAttestationProof,
    new_pubkey: &Binary,
    merkle_proof: Option<&MerkleProof>,
) -> ContractResult<Response> {
    let verified = verify_oauth_attestation(
        api,
        store,
        env,
        attestation,
        OAuthAttestationAction::Recover,
        Some(new_pubkey),
        None,
    )?;

    verify_oauth_guardian_membership(store, &verified.sub_hash, &attestation.attestation.provider, merkle_proof)?;

    if OAUTH_VOTES.may_load(store, &verified.sub_hash)?.is_some() {
        return Err(ContractError::AlreadyVoted);
    }

    consume_oauth_attestation_nonce(store, &verified.nonce_key)?;

    let pubkey_str = new_pubkey.to_string();
    let mut count = COUNTS.may_load(store, &pubkey_str)?.unwrap_or(0);
    count += 1;

    let threshold = THRESHOLD.load(store)?;

    if count >= threshold {
        COUNTS.clear(store);
        VOTES.clear(store);
        OAUTH_VOTES.clear(store);
        PUBKEY.save(store, new_pubkey)?;
        return Ok(Response::new()
            .add_attribute("method", "recover_with_oauth")
            .add_attribute("threshold_reached", "true"));
    }

    COUNTS.save(store, &pubkey_str, &count)?;
    OAUTH_VOTES.save(store, &verified.sub_hash, new_pubkey)?;

    Ok(Response::new()
        .add_attribute("method", "recover_with_oauth")
        .add_attribute("sub_hash", &verified.sub_hash)
        .add_attribute("count", count.to_string()))
}

pub fn revoke_oauth(
    api: &dyn Api,
    store: &mut dyn Storage,
    env: &Env,
    attestation: &OAuthAttestationProof,
    merkle_proof: Option<&MerkleProof>,
) -> ContractResult<Response> {
    let verified = verify_oauth_attestation(
        api,
        store,
        env,
        attestation,
        OAuthAttestationAction::Revoke,
        None,
        None,
    )?;

    verify_oauth_guardian_membership(store, &verified.sub_hash, &attestation.attestation.provider, merkle_proof)?;

    let voted_pubkey = OAUTH_VOTES
        .may_load(store, &verified.sub_hash)?
        .ok_or(ContractError::NoVoted)?;

    consume_oauth_attestation_nonce(store, &verified.nonce_key)?;

    let pubkey_str = voted_pubkey.to_string();
    let mut count = COUNTS.load(store, &pubkey_str)?;

    if count == 0 {
        return Err(ContractError::NoVoted);
    }

    count -= 1;

    if count == 0 {
        COUNTS.remove(store, &pubkey_str);
    } else {
        COUNTS.save(store, &pubkey_str, &count)?;
    }
    OAUTH_VOTES.remove(store, &verified.sub_hash);

    Ok(Response::new()
        .add_attribute("method", "revoke_oauth")
        .add_attribute("sub_hash", &verified.sub_hash))
}

pub fn store_oauth_share(
    api: &dyn Api,
    store: &mut dyn Storage,
    env: &Env,
    attestation: &OAuthAttestationProof,
    value: &Binary,
    merkle_proof: Option<&MerkleProof>,
) -> ContractResult<Response> {
    let verified = verify_oauth_attestation(
        api,
        store,
        env,
        attestation,
        OAuthAttestationAction::StoreShare,
        None,
        Some(value),
    )?;

    verify_oauth_guardian_membership(store, &verified.sub_hash, &attestation.attestation.provider, merkle_proof)?;

    consume_oauth_attestation_nonce(store, &verified.nonce_key)?;

    OAUTH_SHARES.save(store, &verified.sub_hash, value)?;

    Ok(Response::new()
        .add_attribute("method", "store_oauth_share")
        .add_attribute("sub_hash", &verified.sub_hash))
}
