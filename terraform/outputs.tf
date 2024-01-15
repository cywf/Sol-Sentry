// --------------------- //
// OUTPUTS CONFIGURATION //
// --------------------- //

# Outputs Configuration
output "aws_vpc_id" {
  description = "The ID of the VPC in AWS"
  value       = var.use_aws ? module.aws_infrastructure.vpc_id : null
}

output "gcp_vpc_id" {
  description = "The ID of the VPC in GCP"
  value       = var.use_gcp ? module.gcp_infrastructure.vpc_id : null
}

output "azure_vnet_id" {
  description = "The ID of the VNet in Azure"
  value       = var.use_azure ? module.azure_infrastructure.vnet_id : null
}
