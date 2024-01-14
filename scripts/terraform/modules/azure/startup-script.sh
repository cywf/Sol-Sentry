#!/bin/bash

# Install necessary tools and dependencies
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y curl build-essential pkg-config libssl-dev

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.7.11/install)"

# Ensure environment variables are set for the current session
source $HOME/.cargo/env
source $HOME/.profile

# Any other installation or configuration commands can be added here
