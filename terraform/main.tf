// ------------------ //
// MAIN CONFIGURATION //
// ------------------ //

// Specify the Terraform version
terraform {
  required_version = ">= 0.13"
}

// AWS provider configuration
provider "aws" {
  region = var.aws_region
  // version should be set to a compatible version with the resources being used
}

// GCP provider configuration
provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
  // version should be set to a compatible version with the resources being used
}

// Azure provider configuration
provider "azurerm" {
  features {}
  // version should be set to a compatible version with the resources being used
}

// Include AWS infrastructure module conditionally
module "aws_infrastructure" {
  source = "./modules/aws"
  count  = var.use_aws ? 1 : 0
  // Pass required variables if needed
}

// Include GCP infrastructure module conditionally
module "gcp_infrastructure" {
  source = "./modules/gcp"
  count  = var.use_gcp ? 1 : 0
  // Pass required variables if needed
}

// Include Azure infrastructure module conditionally
module "azure_infrastructure" {
  source = "./modules/azure"
  count  = var.use_azure ? 1 : 0
  // Pass required variables if needed
}
