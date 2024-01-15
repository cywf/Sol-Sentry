#!/bin/bash
# AWS EC2 startup script for Sol-Sentry environment setup

# Update and install necessary dependencies
sudo yum update -y
sudo yum install -y curl build-essential pkg-config openssl-devel

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana
sh -c "$(curl -sSfL https://release.solana.com/v1.7.11/install)"

# Ensure the environment variables are set for the current session
source $HOME/.cargo/env
source $HOME/.profile

# Add any other installation or configuration commands here
