use thiserror::Error;
use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum OverflowError {
    #[error("Integer overflow occurred")]
    IntegerOverflow,
}

impl From<OverflowError> for ProgramError {
    fn from(e: OverflowError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
