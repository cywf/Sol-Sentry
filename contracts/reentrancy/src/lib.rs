use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
};

use crate::processor::Processor;
use crate::instruction::ReentrancyInstruction;

// Declare the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
fn process_instruction(
    program_id: &Pubkey,      // Public key of the account the hello_world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8],  // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    // Iterating accounts is safer then indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        return Err(ProgramError::IncorrectProgramId);
    }

    // Get the instruction from the instruction data
    let instruction = ReentrancyInstruction::unpack(instruction_data)?;

    // Call the appropriate function for the instruction
    match instruction {
        ReentrancyInstruction::TriggerReentrancy { amount } => {
            Processor::trigger_reentrancy(account, amount)
        },
        // Handle other instructions
    }
}

// Include the rest of your module files
mod error;
mod instruction;
mod processor;
mod state;
