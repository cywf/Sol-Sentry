// ----------------------- //
// PROVIDERS CONFIGURATION //
// ----------------------- //

# Uncomment the provider you wish to configure
# provider "aws" {
#   region
= "us-west-1"

# ... other configuration ...
}
provider "google" {
project = "my-gcp-project"
region = "us-central1"
# ... other configuration ...
}
provider "azurerm" {
features {}
# ... other configuration ...
}
