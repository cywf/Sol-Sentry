// --------------------- //
// GCP DEPLOYMENT MODULE //
// --------------------- //

# Define the Terraform provider for GCP
provider "google" {
  project     = var.gcp_project
  region      = var.gcp_region
  credentials = file(var.gcp_credentials_file_path)
}

# Create a GCP Compute Engine virtual machine instance
resource "google_compute_instance" "sol_sentry_vm" {
  name         = "sol-sentry-vm"
  machine_type = "n1-standard-2" # Adjust the machine type based on your requirements
  zone         = var.gcp_zone

  boot_disk {
    initialize_params {
      image = "projects/ubuntu-os-cloud/global/images/family/ubuntu-2004-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {
      // Ephemeral public IP
    }
  }

  metadata_startup_script = file("${path.module}/startup-script.sh")

  # Tags are used to apply networking rules
  tags = ["sol-sentry-vm"]
}

# Use an output to display the instance IP after deployment
output "instance_ip" {
  value = google_compute_instance.sol_sentry_vm.network_interface[0].access_config[0].nat_ip
  description = "The public IP address of the VM instance."
}
