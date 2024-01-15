// ------------------------ //
// MAIN AZURE MODULE CONFIG //
// ------------------------ //

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "sol_sentry_rg" {
  name     = "sol_sentry_rg"
  location = var.location
}

resource "azurerm_virtual_network" "sol_sentry_vnet" {
  name                = "sol_sentry_vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.sol_sentry_rg.location
  resource_group_name = azurerm_resource_group.sol_sentry_rg.name
}

resource "azurerm_subnet" "sol_sentry_subnet" {
  name                 = "sol_sentry_subnet"
  resource_group_name  = azurerm_resource_group.sol_sentry_rg.name
  virtual_network_name = azurerm_virtual_network.sol_sentry_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_network_interface" "sol_sentry_nic" {
  name                = "sol_sentry_nic"
  location            = azurerm_resource_group.sol_sentry_rg.location
  resource_group_name = azurerm_resource_group.sol_sentry_rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.sol_sentry_subnet.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_linux_virtual_machine" "sol_sentry_vm" {
  name                = "sol-sentry-vm"
  resource_group_name = azurerm_resource_group.sol_sentry_rg.name
  location            = azurerm_resource_group.sol_sentry_rg.location
  size                = var.vm_size
  admin_username      = var.admin_username

  network_interface_ids = [
    azurerm_network_interface.sol_sentry_nic.id,
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }

  computer_name  = "sol-sentry-vm" 
  admin_password = var.admin_password // Use a variable for security reasons
  disable_password_authentication = false // Set true and use SSH keys for better security
}

// You can add a startup script here if Azure supports cloud-init or custom data scripts.
// Additional resources like Public IP, NSG, etc., can be added here
