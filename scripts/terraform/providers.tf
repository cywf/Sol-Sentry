// ----------------------- //
// PROVIDERS CONFIGURATION //
// ----------------------- //

# AWS Provider Configuration
provider "aws" {
  region = var.aws_region
  # Only configure the AWS provider if the user has chosen to use AWS resources
  alias  = "aws"
  version = "~> 2.0"
  enabled = var.use_aws
}

# GCP Provider Configuration
provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
  # Only configure the GCP provider if the user has chosen to use GCP resources
  alias   = "gcp"
  version = "~> 3.0"
  enabled = var.use_gcp
}

# Azure Provider Configuration
provider "azurerm" {
  features {}
  # Only configure the Azure provider if the user has chosen to use Azure resources
  alias   = "azure"
  version = "~> 2.0"
  enabled = var.use_azure
}

# Ensure the user does not activate more than one provider
locals {
  providers_count = length(compact([var.use_aws, var.use_gcp, var.use_azure]))
}

# Validate that only one provider is enabled at a time
resource "null_resource" "provider_validation" {
  count = local.providers_count > 1 ? 1 : 0

  provisioner "local-exec" {
    command = "echo 'Error: You must select only one cloud provider.' && exit 1"
  }
}
