use solana_program::{
    program_pack::{IsInitialized, Pack, Sealed},
    program_error::ProgramError,
    pubkey::Pubkey,
};

use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};

pub struct UnhandledExceptionState {
    pub is_initialized: bool,
    pub owner: Pubkey,
    // Additional state variables can be added here
}

impl Sealed for UnhandledExceptionState {}

impl IsInitialized for UnhandledExceptionState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for UnhandledExceptionState {
    const LEN: usize = 41; // 1 + 32 + (additional state size)

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let dst = array_mut_ref![dst, 0, UnhandledExceptionState::LEN];
        let (is_initialized_dst, owner_dst) = mut_array_refs![dst, 1, 32];

        is_initialized_dst[0] = self.is_initialized as u8;
        owner_dst.copy_from_slice(self.owner.as_ref());
        // Pack additional state variables here
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let src = array_ref![src, 0, UnhandledExceptionState::LEN];
        let (is_initialized_src, owner_src) = array_refs![src, 1, 32];

        let is_initialized = match is_initialized_src {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };

        let owner = Pubkey::new_from_array(*owner_src);
        // Unpack additional state variables here

        Ok(UnhandledExceptionState {
            is_initialized,
            owner,
            // Initialize additional state variables here
        })
    }
}
