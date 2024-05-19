#[cfg(not(feature = "library"))]
pub mod contract;
pub mod execute;
pub mod msg;

pub const CONTRACT_NAME: &str = "account-key-rotation";
pub const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
