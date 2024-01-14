# Solana Smart Contracts for Sol-Sentry

Welcome to the Sol-Sentry contracts directory. This directory contains a collection of sample Solana smart contracts designed for testing and research purposes. Each contract simulates various scenarios that could occur on the Solana blockchain, allowing users to test Sol-Sentry's capabilities in practical and controlled environments.

## Directory Structure

The contracts directory is organized as follows:

- Each subdirectory represents a distinct category of smart contracts, corresponding to a specific vulnerability or feature.
- The `src` subdirectory within each contract category contains the Rust source files necessary for the smart contract's functionality.
- The `Cargo.toml` file in each contract category defines the Rust package configuration, including dependencies required for the Solana program.

## Contract Types

The following sample contract types are available:

- `overflow`: Contracts that demonstrate integer overflow vulnerabilities.
- `underflow`: Contracts that simulate integer underflow scenarios.
- `reentrancy`: Contracts that can be used to test against reentrancy attacks.
- `unhandled_exception`: Contracts that show how unhandled exceptions are dealt with in Solana smart contracts.

## Getting Started

To begin working with these contracts:

1. Navigate to the desired contract directory.
2. Read the `README.md` in the contract directory for specific information about the contract and instructions on how to compile and deploy.
3. Modify the Rust source files in the `src` directory as per your testing requirements.
4. Use `cargo build-bpf` and `solana program deploy` to compile and deploy the contracts to a Solana cluster for testing.

## Building and Testing

Each contract can be built using the Solana CLI tools. Make sure you have installed the required Solana tools and dependencies before proceeding. Refer to [Solana's official documentation](https://docs.solana.com/cli/install-solana-cli-tools) for installation instructions.

- To build a contract, run the following command in the contract's directory:

```bash
cargo build-bpf
```

- To deploy the contract to your local Solana cluster, use:

```bash
solana program deploy <PATH_TO_BPF_PROGRAM>
```
Replace `<PATH_TO_BPF_PROGRAM>` with the path to the compiled contract file.

# Contributing
We welcome contributions to this repository. If you have an idea for a new contract type or an enhancement to an existing contract, please create a pull request with your changes.

Thank you for contributing to the Sol-Sentry project and helping improve the security of Solana smart contracts.
