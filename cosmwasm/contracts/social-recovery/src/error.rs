#[derive(Debug, thiserror::Error)]
pub enum ContractError {
    #[error(transparent)]
    Std(#[from] cosmwasm_std::StdError),

    #[error(transparent)]
    Verification(#[from] cosmwasm_std::VerificationError),

    #[error("signature is invalid")]
    InvalidSignature,

    #[error("signature not found")]
    SignatureNotFound,

    #[error("only the contract itself can call this method")]
    Unauthorized,

    #[error("sender is not a guardian")]
    NotGuardian,

    #[error("already voted")]
    AlreadyVoted,

    #[error("didnt vote")]
    NoVoted,

    #[error("OAuth is not configured for this account")]
    OAuthNotConfigured,

    #[error("sender is not an OAuth guardian")]
    NotOAuthGuardian,

    #[error("OAuth token was already used")]
    OAuthTokenReplay,

    #[error("threshold must be greater than zero")]
    InvalidThreshold,

    #[error("invalid OAuth attestation")]
    InvalidOAuthAttestation,

    #[error("OAuth attestation expired")]
    OAuthAttestationExpired,

    #[error("OAuth attestor key is not configured")]
    OAuthAttestorNotConfigured,

    #[error("invalid Merkle proof")]
    InvalidMerkleProof,

    #[error("insufficient attestor signatures")]
    InsufficientAttestorSignatures,
}

pub type ContractResult<T> = Result<T, ContractError>;
