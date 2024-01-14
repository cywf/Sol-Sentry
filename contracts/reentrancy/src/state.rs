use solana_program::{
    program_pack::{IsInitialized, Pack, Sealed},
    program_error::ProgramError,
    pubkey::Pubkey,
};

use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};

pub struct ReentrancyState {
    pub is_initialized: bool,
    pub owner: Pubkey,
    pub balance: u64,
}

impl Sealed for ReentrancyState {}

impl IsInitialized for ReentrancyState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for ReentrancyState {
    const LEN: usize = 41; // 1 + 32 + 8

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let dst = array_mut_ref![dst, 0, ReentrancyState::LEN];
        let (is_initialized_dst, owner_dst, balance_dst) = mut_array_refs![dst, 1, 32, 8];

        is_initialized_dst[0] = self.is_initialized as u8;
        owner_dst.copy_from_slice(self.owner.as_ref());
        *balance_dst = self.balance.to_le_bytes();
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let src = array_ref![src, 0, ReentrancyState::LEN];
        let (is_initialized_src, owner_src, balance_src) = array_refs![src, 1, 32, 8];

        let is_initialized = match is_initialized_src {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };

        let owner = Pubkey::new_from_array(*owner_src);
        let balance = u64::from_le_bytes(*balance_src);

        Ok(ReentrancyState {
            is_initialized,
            owner,
            balance,
        })
    }
}
