#!/bin/bash

# Create the root contracts directory with its own README
mkdir -p contracts
echo "This directory contains sample Solana smart contracts for testing Sol-Sentry's capabilities." > contracts/README.md

# List of sample contract types to create
declare -a contract_types=("overflow" "underflow" "reentrancy" "unhandled_exception")

# Loop through the contract types and create necessary subdirectories and files
for contract_type in "${contract_types[@]}"
do
  # Create contract type directory with src subdirectory
  mkdir -p "contracts/${contract_type}/src"

  # Create the base Rust files for each contract
  echo "[package]
name = \"${contract_type}_contract\"
version = \"0.1.0\"
edition = \"2018\"

[dependencies]
solana-program = \"1.7.11\"" > "contracts/${contract_type}/Cargo.toml"

  touch "contracts/${contract_type}/src/lib.rs"
  touch "contracts/${contract_type}/src/processor.rs"
  touch "contracts/${contract_type}/src/instruction.rs"
  touch "contracts/${contract_type}/src/state.rs"
  touch "contracts/${contract_type}/src/error.rs"
  touch "contracts/${contract_type}/src/constant.rs"

  # Add a simple README for each contract type
  echo "This is a sample ${contract_type} smart contract for Solana." > "contracts/${contract_type}/README.md"
done

echo "Contract directories and base files have been provisioned."
