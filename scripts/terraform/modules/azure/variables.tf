// --------------------------------- //
// VARIABLES CONFIG FOR AZURE MODULE //
// --------------------------------- //

variable "location" {
  description = "The Azure region where all resources in this example should be created."
  default     = "East US"
}

variable "vm_size" {
  description = "The virtual machine size."
  default     = "Standard_DS1_v2"
}

variable "admin_username" {
  description = "The admin username for the virtual machine."
  default     = "adminuser"
}

variable "admin_password" {
  description = "The admin password for the virtual machine."
  // Recommend using a sensitive input variable and storing the actual password in a secure location
  type        = string
  sensitive   = true
}
