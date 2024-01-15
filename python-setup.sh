#!/bin/bash

# Install Python3 and pip
sudo apt update
sudo apt install -y python3 python3-pip

# Install virtualenv for creating isolated Python environments
sudo pip3 install virtualenv

# Create a virtual environment in the directory 'venv'
virtualenv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies from requirements.txt
pip install -r requirements.txt

# Deactivate the virtual environment
deactivate
