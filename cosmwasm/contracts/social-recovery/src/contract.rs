use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};

use absacc::AccountSudoMsg;
use account_base::{
    self as base,
    state::PUBKEY,
};

use crate::{execute, error::ContractResult, query, msg::{ExecuteMsg, InstantiateMsg, QueryMsg}, CONTRACT_NAME, CONTRACT_VERSION, state::{GUARDIANS, THRESHOLD}};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _:    Env,
    _:    MessageInfo,
    msg:  InstantiateMsg,
) -> ContractResult<Response> {
    cw2::set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    let verified: StdResult<Vec<_>> = msg.guardians
        .into_iter()
        .map(|addr| deps.api.addr_validate(&addr))
        .collect();

    GUARDIANS.save(deps.storage, &verified?)?;
    PUBKEY.save(deps.storage, &msg.pubkey)?;
    // TODO: assert msg.threshold > 0
    THRESHOLD.save(deps.storage, &msg.threshold)?;

    Ok(Response::new())
}

#[entry_point]
pub fn sudo(deps: DepsMut, _env: Env, msg: AccountSudoMsg) -> ContractResult<Response> {
    match msg {
        AccountSudoMsg::BeforeTx {
            tx_bytes,
            cred_bytes,
            simulate,
            ..
        } => execute::before_tx(deps.as_ref(), &tx_bytes, cred_bytes.as_ref(), simulate),
        AccountSudoMsg::AfterTx {
            ..
        } => execute::after_tx(),
    }
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env:  Env,
    info:  MessageInfo,
    msg:  ExecuteMsg,
) -> ContractResult<Response> {
    match msg {
        ExecuteMsg::UpdatePubkey {
            new_pubkey,
        } => execute::update_pubkey(deps.storage, &info.sender, &env.contract.address, &new_pubkey),
        ExecuteMsg::Recover {new_pubkey} => execute::recover(deps.storage, &info.sender, &new_pubkey),
        ExecuteMsg::Revoke {} => execute::revoke(deps.storage, &info.sender),
        ExecuteMsg::StoreData { key, value } => execute::store_data(deps.storage, &info.sender, &env.contract.address, &key, &value),
        ExecuteMsg::RemoveData { key } => execute::remove_data(deps.storage, &info.sender, &env.contract.address, &key),
        ExecuteMsg::StoreSecret { value } => execute::store_secret(deps.storage, &info.sender, &env.contract.address, &value),
        ExecuteMsg::RemoveSecret {} => execute::remove_secret(deps.storage, &info.sender, &env.contract.address),
        ExecuteMsg::StoreShare { value } => execute::store_share(deps.storage, &info.sender, &value),
        ExecuteMsg::RemoveShare {} => execute::remove_share(deps.storage, &info.sender),
        ExecuteMsg::StoreRecoverData { value } => execute::store_recover_data(deps.storage, &info.sender, &value),
        ExecuteMsg::RemoveRecoverData {} => execute::remove_recover_data(deps.storage, &info.sender),
    }
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Pubkey {} => to_binary(&base::query::pubkey(deps.storage)?),
        QueryMsg::GuardiansList {} => to_binary(&query::guardians_list(deps.storage)?),
        QueryMsg::Threshold {} => to_binary(&query::threshold(deps.storage)?),
        QueryMsg::Votes {} => to_binary(&query::votes(deps.storage)?),
        QueryMsg::Counts {} => to_binary(&query::counts(deps.storage)?),
        QueryMsg::GetData { key } => to_binary(&query::get_data(deps.storage, &key)?),
        QueryMsg::GetAllData {} => to_binary(&query::get_all_data(deps.storage)?),
        QueryMsg::GetSecret {} => to_binary(&query::get_secret(deps.storage)?),
        QueryMsg::GetShare { address } => to_binary(&query::get_share(deps.storage, &address)?),
        QueryMsg::GetAllShares {} => to_binary(&query::get_all_shares(deps.storage)?),
        QueryMsg::GetRecoverData { address } => to_binary(&query::get_recover_data(deps.storage, &address)?),
        QueryMsg::GetAllRecoverData {} => to_binary(&query::get_all_recover_data(deps.storage)?),
    }
}
