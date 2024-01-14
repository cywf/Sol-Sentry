// ------------------ //
// MAIN CONFIGURATION //
// ------------------ //

# Specify the Terraform version
terraform {
  required_version = ">= 0.13"
}

# Include modules based on provider choice
module "cloud_provider" {
  # Uncomment the provider you want to use
  # source = "./modules/aws"
  # source = "./modules/gcp"
  # source = "./modules/azure"
  
  # Add any required variables here
  # variable1 = "value1"
}
