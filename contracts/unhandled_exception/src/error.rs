use thiserror::Error;
use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum UnhandledExceptionError {
    #[error("An unhandled exception occurred")]
    UnhandledException,
}

impl From<UnhandledExceptionError> for ProgramError {
    fn from(e: UnhandledExceptionError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
