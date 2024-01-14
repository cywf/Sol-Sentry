// ----------------------- //
// VARIABLES CONFIGURATION //
// ----------------------- //

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