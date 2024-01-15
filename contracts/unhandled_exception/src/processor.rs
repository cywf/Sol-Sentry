use solana_program::{
    account_info::AccountInfo,
    entrypoint::ProgramResult,
    msg,
};
use crate::{
    error::UnhandledExceptionError,
};

pub struct Processor;

impl Processor {
    pub fn trigger_exception(account: &AccountInfo) -> ProgramResult {
        msg!("Triggering unhandled exception");

        // Simulate an unhandled exception by intentionally causing an error
        Err(UnhandledExceptionError::UnhandledException.into())
    }
}
