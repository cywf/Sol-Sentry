use solana_program::program_error::ProgramError;
use solana_program::program_pack::{Pack, Sealed};
use solana_program::{instruction::{AccountMeta, Instruction}, pubkey::Pubkey};

/// Define the type of instruction and its parameters here
pub enum ReentrancyInstruction {
    /// An instruction that might trigger reentrancy
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The account of the person invoking this instruction.
    /// 1. `[writable]` The account in which something susceptible to reentrancy will occur.
    /// ...
    TriggerReentrancy {
        /// Add additional fields for instruction data here
        amount: u64,
    },
    // Add more instructions as needed
}

impl ReentrancyInstruction {
    /// Unpacks a byte buffer into a [ReentrancyInstruction](enum.ReentrancyInstruction.html).
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        // Here, you'll need to unpack the input bytes and return the instruction
        // This is just an example and will need to be adjusted based on your actual data format
        let (tag, rest) = input.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        Ok(match tag {
            0 => Self::TriggerReentrancy {
                amount: Self::unpack_amount(rest)?,
            },
            // Handle other instructions
            _ => return Err(ProgramError::InvalidInstructionData),
        })
    }

    fn unpack_amount(input: &[u8]) -> Result<u64, ProgramError> {
        // Unpack the amount from the input bytes
        let amount = input.get(..8).and_then(|slice| slice.try_into().ok()).map(u64::from_le_bytes).ok_or(ProgramError::InvalidInstructionData)?;
        Ok(amount)
    }
}

/// Creates an 'TriggerReentrancy' instruction
pub fn trigger_reentrancy(
    program_id: &Pubkey,
    signer_account: &Pubkey,
    target_account: &Pubkey,
    amount: u64,
) -> Instruction {
    Instruction {
        program_id: *program_id,
        accounts: vec![
            AccountMeta::new(*signer_account, true),
            AccountMeta::new(*target_account, false),
            // Add other accounts needed for the instruction
        ],
        data: ReentrancyInstruction::TriggerReentrancy { amount }.pack(),
    }
}

// Implement packing and unpacking for the instruction
impl Sealed for ReentrancyInstruction {}

impl Pack for ReentrancyInstruction {
    const LEN: usize = 9; // Length in bytes of the instruction data; adjust as necessary

    fn pack_into_slice(&self, dst: &mut [u8]) {
        match *self {
            ReentrancyInstruction::TriggerReentrancy { amount } => {
                dst[0] = 0; // Instruction identifier
                dst[1..9].copy_from_slice(&amount.to_le_bytes());
            },
            // Handle packing for other instructions
        }
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = src.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        match tag {
            0 => {
                let amount = Self::unpack_amount(rest)?;
                Ok(ReentrancyInstruction::TriggerReentrancy { amount })
            },
            // Handle unpacking for other instructions
            _ => Err(ProgramError::InvalidInstructionData),
        }
    }
}

impl ReentrancyInstruction {
    fn unpack_amount(input: &[u8]) -> Result<u64, ProgramError> {
        let amount = input.get(..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(ProgramError::InvalidInstructionData)?;
        Ok(amount)
    }
}
