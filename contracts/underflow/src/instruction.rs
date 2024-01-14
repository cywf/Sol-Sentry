use solana_program::{
    program_error::ProgramError,
    pubkey::Pubkey,
    instruction::{AccountMeta, Instruction},
};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum UnderflowInstruction {
    /// Triggers an underflow operation
    ///
    /// Accounts expected:
    ///
    /// 0. `[writable]` The account to perform underflow operation.
    TriggerUnderflow {
        amount: u64,
    },
}

pub fn create_trigger_underflow_instruction(
    program_id: Pubkey,
    target_account: Pubkey,
    amount: u64,
) -> Result<Instruction, ProgramError> {
    let data = UnderflowInstruction::TriggerUnderflow { amount }.try_to_vec()?;
    let accounts = vec![
        AccountMeta::new(target_account, false),
    ];
    Ok(Instruction {
        program_id,
        accounts,
        data,
    })
}
