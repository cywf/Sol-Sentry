// ----------------------- //
// VARIABLES CONFIGURATION //
// ----------------------- //

// Provider Section
variable "use_aws" {
  description = "Whether to use AWS resources"
  type        = bool
  default     = false
}

variable "use_gcp" {
  description = "Whether to use GCP resources"
  type        = bool
 
default = false
}

variable "use_azure" {
description = "Whether to use Azure resources"
type = bool
default = false
}

// Provider Region Specification
variable "aws_region" {
  description = "The AWS region to create resources in"
  type        = string
  default     = "us-west-2"
}

variable "gcp_project" {
  description = "The GCP project to create resources in"
  type        = string
}

variable "gcp_region" {
  description = "The GCP region to create resources in"
  type        = string
  default     = "us-central1"
}

variable "azure_region" {
  description = "The Azure region to create resources in"
  type        = string
  default     = "East US"
}