# Overflow Contract for Sol-Sentry

## Overview

The `overflow` contract is designed to demonstrate scenarios where integer overflow can occur within a Solana smart contract. This is a critical vulnerability that can lead to unexpected behavior and potentially exploitable conditions in blockchain applications.

## Structure

This directory includes the following:

- `src/`: Contains the Rust source code for the overflow contract.
- `Cargo.toml`: The Rust package manifest file with all the necessary dependencies and configurations.

## Usage

The `overflow` contract provides a simple interface to deliberately cause an integer overflow, allowing developers to observe the effects and test Sol-Sentry's detection and handling capabilities.

### Testing Overflow

To test the overflow contract:

1. Navigate to the `overflow` contract directory.
2. Build the contract using the Solana CLI tools:

    ```bash
    cargo build-bpf
    ```

3. Deploy the contract to your local Solana cluster:

    ```bash
    solana program deploy <PATH_TO_BPF_PROGRAM>
    ```

    Replace `<PATH_TO_BPF_PROGRAM>` with the path to the compiled contract file.

4. Invoke the contract's methods that lead to overflow using the Solana CLI or a client program.

## Contract Methods

- `trigger_overflow`: A method that when called, will attempt to add to an integer variable, potentially causing an overflow.

## Handling Overflow

Sol-Sentry's capabilities should be able to detect this overflow attempt and handle it according to the configured security policies, whether that's reverting the transaction, logging the event, or other custom actions.

## Contributing

If you have suggestions for improving the overflow contract or have identified potential enhancements, please submit a pull request with your recommended changes. We appreciate community feedback and contributions to make Sol-Sentry a robust security solution.
