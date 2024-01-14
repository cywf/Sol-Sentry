// ------------------------------- //
// VARIABLES CONFIG FOR GCP MODULE //
// ------------------------------- //

variable "gcp_project" {
  description = "The GCP project ID."
  type        = string
  default = "value" // change me
}

variable "gcp_region" {
  description = "The GCP region where resources will be created."
  type        = string
  default     = "us-central1" // change if needed
}

variable "gcp_zone" {
  description = "The GCP zone where the VM will be created."
  type        = string
  default     = "us-central1-a" // change if needed
}

variable "gcp_credentials_file_path" {
  description = "The file path to the GCP credentials JSON file."
  type        = string
  default = "value" // change me
}
