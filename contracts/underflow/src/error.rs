use thiserror::Error;
use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum UnderflowError {
    #[error("Underflow occurred in the operation")]
    Underflow,
}

impl From<UnderflowError> for ProgramError {
    fn from(e: UnderflowError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
