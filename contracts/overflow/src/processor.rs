use crate::{
    constant::MAXIMUM_OVERFLOW_VALUE,
    error::OverflowError,
    instruction::OverflowInstruction,
};
use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey};

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = OverflowInstruction::unpack(instruction_data)?;

        match instruction {
            OverflowInstruction::TriggerOverflow => {
                msg!("Triggering overflow...");
                Self::trigger_overflow(accounts, program_id)?;
            }
        }
        Ok(())
    }

    fn trigger_overflow(_accounts: &[AccountInfo], _program_id: &Pubkey) -> ProgramResult {
        let mut value: u64 = MAXIMUM_OVERFLOW_VALUE;
        value = value.wrapping_add(1); // Intentional overflow
        if value != 0 {
            return Err(OverflowError::IntegerOverflow.into());
        }
        Ok(())
    }
}

impl OverflowInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, _rest) = input.split_first().ok_or(OverflowError::InvalidInstruction)?;
        Ok(match tag {
            0 => Self::TriggerOverflow,
            _ => return Err(OverflowError::InvalidInstruction.into()),
        })
    }
}
