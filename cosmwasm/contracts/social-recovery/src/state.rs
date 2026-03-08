use cosmwasm_std::{Addr, Binary};
use cw_storage_plus::{Item, Map};

use crate::types::{OAuthGuardian, OAuthConfig};

pub const GUARDIANS: Item<Vec<Addr>> = Item::new("guardians");
pub const THRESHOLD: Item<u64> = Item::new("threshold");
pub const VOTES: Map<&Addr, Binary> = Map::new("g");
pub const COUNTS: Map<&str, u64> = Map::new("d");
pub const KEY_VALUE_STORE: Map<&str, Binary> = Map::new("kv");
pub const DATA_SECRET: Item<Binary> = Item::new("secret");
pub const SHARES: Map<&Addr, Binary> = Map::new("shares");
pub const RECOVER_DATA: Map<&Addr, Binary> = Map::new("recover_data");

// OAuth state
pub const OAUTH_GUARDIANS: Item<Vec<OAuthGuardian>> = Item::new("oauth_guardians");
pub const OAUTH_VOTES: Map<&str, Binary> = Map::new("oauth_votes");
pub const OAUTH_SHARES: Map<&str, Binary> = Map::new("oauth_shares");
pub const OAUTH_CONFIG: Item<OAuthConfig> = Item::new("oauth_config");
pub const OAUTH_USED_ATTESTATIONS: Map<&str, bool> = Map::new("oauth_used_attestations");
