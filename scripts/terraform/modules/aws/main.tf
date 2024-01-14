// ----------------------- //
// AWS DEPLOYMENT MODULE   //
// ----------------------- //

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "sol_sentry_vpc" {
  cidr_block = var.vpc_cidr
  enable_dns_hostnames = true
  tags = {
    Name = "sol-sentry-vpc"
  }
}

resource "aws_subnet" "sol_sentry_subnet" {
  vpc_id = aws_vpc.sol_sentry_vpc.id
  cidr_block = var.subnet_cidr
  availability_zone = var.availability_zone
  map_public_ip_on_launch = true
  tags = {
    Name = "sol-sentry-subnet"
  }
}

resource "aws_security_group" "sol_sentry_sg" {
  vpc_id = aws_vpc.sol_sentry_vpc.id
  description = "Security group for Sol-Sentry VM"
    tags = {
        Name = "sol-sentry-security-group"
    }
}

resource "aws_instance" "sol_sentry_instance" {
  ami = var.ami_id
  instance_type = var.instance_type
  subnet_id = aws_subnet.sol_sentry_subnet.id
  security_groups = [aws_security_group.sol_sentry_sg.id]
  key_name = var.key_name

  user_data = file("${path.module}/startup-script.sh")

  tags = {
    Name = "sol-sentry-instance"
  }
}

// Add any other necessary resources and configurations for the VM

// Variables and outputs to be defined in `variables.tf` and `outputs.tf`
