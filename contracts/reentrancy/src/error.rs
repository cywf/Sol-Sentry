use solana_program::program_error::ProgramError;
use thiserror::Error;

#[derive(Error, Debug, Copy, Clone)]
pub enum ReentrancyError {
    // Define errors related to reentrancy logic
    #[error("Reentrancy detected")]
    ReentrancyDetected,
    // Add more custom errors as needed
}

impl From<ReentrancyError> for ProgramError {
    fn from(e: ReentrancyError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
