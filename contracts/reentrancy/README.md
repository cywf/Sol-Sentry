# Reentrancy Contract for Sol-Sentry

## Overview

The `reentrancy` contract is crafted to demonstrate and test the reentrancy attack, which is a common vulnerability in smart contracts where a function makes an external call to another untrusted contract before resolving its effects.

## Structure

This directory is organized as follows:

- `src/`: The Rust source code for the reentrancy contract.
- `Cargo.toml`: The manifest file defining the Rust package, its metadata, and dependencies.

## Usage

The `reentrancy` contract simulates a scenario where a function can be re-entered before its initial execution is completed, potentially leading to unexpected behaviors or exploits.

### Testing Reentrancy

To conduct a test for the reentrancy contract:

1. Navigate to the `reentrancy` contract directory.
2. Compile the contract with the following command:

```bash
cargo build-bpf
```

Deploy the contract to your Solana test validator or live cluster with:

```bash
solana program deploy <COMPILED_CONTRACT_PATH>
```
Make sure to replace `<COMPILED_CONTRACT_PATH>` with the actual path to the compiled BPF program.

Interact with the contract's functions using Solana's command-line tools or through a custom client to observe and test reentrancy behavior.

## Contract Methods
- `initiate_reentrancy`: This method sets up the conditions necessary for a reentrancy attack.
- `invoke_reentrant_call`: Calls another contract in a way that could potentially lead to reentrancy if not properly handled.

## Reentrancy Handling
Sol-Sentry is designed to detect and mitigate reentrancy attempts. Its security features should manage such incidents based on the predefined security rules, which may include transaction reversal, alerting, or other actions.

# Contributions
Contributions are welcome! If you have ideas on how to enhance the reentrancy contract or want to report a bug, please open an issue or submit a pull request with your proposed changes for review.
