use solana_program::{
    account_info::AccountInfo,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
};
use crate::{
    error::UnderflowError,
    instruction::UnderflowInstruction,
    state::UnderflowState,
};

pub struct Processor;

impl Processor {
    pub fn trigger_underflow(account: &AccountInfo, amount: u64) -> ProgramResult {
        let mut underflow_state = UnderflowState::unpack(&account.data.borrow())?;

        if underflow_state.numerical_value < amount {
            msg!("Underflow detected!");
            return Err(UnderflowError::Underflow.into());
        }

        underflow_state.numerical_value = underflow_state.numerical_value.checked_sub(amount)
            .ok_or(UnderflowError::Underflow)?;
        UnderflowState::pack(underflow_state, &mut account.data.borrow_mut())?;

        Ok(())
    }
}
