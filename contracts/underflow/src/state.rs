use solana_program::{
    program_pack::{IsInitialized, Pack, Sealed},
    program_error::ProgramError,
    pubkey::Pubkey,
};

use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};

pub struct UnderflowState {
    pub is_initialized: bool,
    pub owner: Pubkey,
    pub numerical_value: u64,
}

impl Sealed for UnderflowState {}

impl IsInitialized for UnderflowState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for UnderflowState {
    const LEN: usize = 41; // 1 + 32 + 8

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let dst = array_mut_ref![dst, 0, UnderflowState::LEN];
        let (is_initialized_dst, owner_dst, numerical_value_dst) = mut_array_refs![dst, 1, 32, 8];

        is_initialized_dst[0] = self.is_initialized as u8;
        owner_dst.copy_from_slice(self.owner.as_ref());
        *numerical_value_dst = self.numerical_value.to_le_bytes();
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let src = array_ref![src, 0, UnderflowState::LEN];
        let (is_initialized_src, owner_src, numerical_value_src) = array_refs![src, 1, 32, 8];

        let is_initialized = match is_initialized_src {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };

        let owner = Pubkey::new_from_array(*owner_src);
        let numerical_value = u64::from_le_bytes(*numerical_value_src);

        Ok(UnderflowState {
            is_initialized,
            owner,
            numerical_value,
        })
    }
}
