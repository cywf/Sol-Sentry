use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
};

use crate::{
    instruction::UnhandledExceptionInstruction,
    processor::Processor,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    if let Ok(instruction) = UnhandledExceptionInstruction::try_from_slice(instruction_data) {
        match instruction {
            UnhandledExceptionInstruction::TriggerException => {
                let accounts_iter = &mut accounts.iter();
                let account = next_account_info(accounts_iter)?;
                Processor::trigger_exception(account)?;
            },
        }
    } else {
        return Err(ProgramError::InvalidInstructionData);
    }
    Ok(())
}
