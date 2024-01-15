use solana_program::{
    program_error::ProgramError,
    pubkey::Pubkey,
    instruction::{AccountMeta, Instruction},
};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum UnhandledExceptionInstruction {
    /// Triggers an unhandled exception
    ///
    /// Accounts expected:
    ///
    /// 0. `[writable]` The account to perform unhandled exception operation.
    TriggerException,
}

pub fn create_trigger_exception_instruction(
    program_id: Pubkey,
    target_account: Pubkey,
) -> Result<Instruction, ProgramError> {
    let data = UnhandledExceptionInstruction::TriggerException.try_to_vec()?;
    let accounts = vec![
        AccountMeta::new(target_account, false),
    ];
    Ok(Instruction {
        program_id,
        accounts,
        data,
    })
}
