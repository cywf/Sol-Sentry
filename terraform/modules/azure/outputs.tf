// ------------------------------ //
// OUTPUT CONFIG FOR AZURE MODULE //
// ------------------------------ //

output "public_ip_address" {
  value       = azurerm_public_ip.sol_sentry_pip.ip_address
  description = "The public IP address of the virtual machine."
  depends_on  = [azurerm_public_ip.sol_sentry_pip]
}

output "virtual_machine_id" {
  value       = azurerm_linux_virtual_machine.sol_sentry_vm.id
  description = "The ID of the virtual machine."
}