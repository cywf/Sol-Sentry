// --------------------- //
// OUTPUTS CONFIGURATION //
// --------------------- //

# Output for an AWS VPC ID, conditionally displayed if the AWS module is used
output "aws_vpc_id" {
  value       = var.use_aws ? module.aws_infrastructure.vpc_id : ""
  description = "The ID of the VPC in AWS"
  condition   = var.use_aws
}

# Output for a GCP VPC ID, conditionally displayed if the GCP module is used
output "gcp_vpc_id" {
  value       = var.use_gcp ? module.gcp_infrastructure.vpc_id : ""
  description = "The ID of the VPC in GCP"
  condition   = var.use_gcp
}

# Output for an Azure VNet ID, conditionally displayed if the Azure module is used
output "azure_vnet_id" {
  value       = var.use_azure ? module.azure_infrastructure.vnet_id : ""
  description = "The ID of the VNet in Azure"
  condition   = var.use_azure
}
