# Underflow Contract for Sol-Sentry

## Overview

The `underflow` contract is designed to exhibit the underflow vulnerability, a type of arithmetic error where a variable is decreased below its minimum possible value, causing it to wrap around to the maximum possible value. This can lead to serious security issues in smart contract logic.

## Structure

The directory includes:

- `src/`: Contains the Rust source code for the underflow contract.
- `Cargo.toml`: The Rust package manifest, detailing package information and dependencies.

## Usage

The underflow contract showcases how an underflow can occur and be exploited. It includes functions that deliberately cause underflows to demonstrate their potential impact on contract state.

### Testing Underflow

To test the underflow contract:

1. Change to the `underflow` contract directory.
2. Compile the contract with Rust's package manager using:

```bash
cargo build-bpf
```
Deploy the contract to a Solana cluster, whether a local test validator or a live environment, with:

```bash
solana program deploy /path/to/compiled/contract.so
```
Replace `/path/to/compiled/contract.so` with the actual compiled contract file path.

Engage with the contract through Solana's CLI tools or a bespoke client to test and observe the effects of an underflow within the smart contract.

## Contract Functions
- `trigger_underflow`: A function that, when called, causes an underflow in the contract's state, potentially disrupting logic and balance tracking.
- `check_underflow`: Allows you to verify if an underflow has occurred and inspect the contract state post-underflow.

## Underflow Protection
Sol-Sentry provides security features that can detect and mitigate the effects of underflows, safeguarding the contract's integrity. When an underflow is detected, Sol-Sentry can take actions such as halting transactions or alerting administrators based on predefined security protocols.

# Contributions
Contributions that improve the detection and handling of underflows or any general enhancements to the underflow contract are encouraged. Please report any bugs or submit pull requests with your suggested modifications for review.
