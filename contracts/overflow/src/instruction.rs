use solana_program::{
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
    system_program,
};

pub enum OverflowInstruction {
    /// Triggers an integer overflow
    TriggerOverflow,
}

pub fn trigger_overflow(
    program_id: &Pubkey,
    overflow_account: &Pubkey,
) -> Instruction {
    let accounts = vec![
        AccountMeta::new(*overflow_account, false),
        AccountMeta::new_readonly(system_program::id(), false),
    ];

    Instruction::new_with_bincode(
        *program_id,
        &OverflowInstruction::TriggerOverflow,
        accounts,
    )
}
