// ---------------------------- //
// OUTPUT CONFIG FOR GCP MODULE //
// ---------------------------- //

output "instance_ip" {
  description = "The public IP address of the provisioned VM instance."
  value       = google_compute_instance.sol_sentry_vm.network_interface[0].access_config[0].nat_ip
}
