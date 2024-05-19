#[cfg(not(feature = "library"))]
pub mod contract;
pub mod execute;
pub mod error;
pub mod msg;
pub mod query;
pub mod state;

pub const CONTRACT_NAME: &str = "social-recovery";
pub const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
