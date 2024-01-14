// ----------------------- //
// PROVIDERS CONFIGURATION //
// ----------------------- //

# providers.tf

# Uncomment to use AWS
# provider "aws" {
#   region = var.aws_region
# }

# Uncomment to use Azure
# provider "azure" {
#   region = var.azure_region
# }

# Uncomment to use GCP
provider "google" {
    project = var.gcp_project
    region  = var.gcp_region
}