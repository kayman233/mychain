use cosmwasm_std::{Addr, Binary};
use cw_storage_plus::{Item, Map};

pub const GUARDIANS: Item<Vec<Addr>> = Item::new("guardians");
pub const THRESHOLD: Item<u64> = Item::new("threshold");
pub const VOTES: Map<&Addr, Binary> = Map::new("g");
pub const COUNTS: Map<&str, u64> = Map::new("d");
