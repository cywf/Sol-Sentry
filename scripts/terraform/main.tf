// ------------------ //
// MAIN CONFIGURATION //
// ------------------ //

# Specify the Terraform version
terraform {
  required_version = ">= 0.13"
}

# Initialize the required providers
provider "aws" {
  region = var.aws_region
  version = "~> 3.0"
  alias = "aws"
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
  version = "~> 3.0"
  alias = "google"
}

provider "azurerm" {
  features {}
  version = "~> 2.0"
  alias = "azurerm"
}

# Include modules based on provider choice
module "aws_infrastructure" {
  source = "./modules/aws"
  providers = {
    aws = aws.aws
  }
  # Add any required variables here
}

module "gcp_infrastructure" {
  source = "./modules/gcp"
  providers = {
    google = google.google
  }
  # Add any required variables here
}

module "azure_infrastructure" {
  source = "./modules/azure"
  providers = {
    azurerm = azurerm.azurerm
  }
  # Add any required variables here
}

# Conditionally use modules based on user input
# This logic will be controlled by the terraform-config.py script
