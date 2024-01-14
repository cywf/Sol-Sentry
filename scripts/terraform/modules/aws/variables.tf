// ------------------------------- //
// VARIABLES CONFIG FOR AWS MODULE //
// ------------------------------- //

variable "aws_region" {
  description = "AWS region to deploy the resources"
  default = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  default = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "CIDR block for the subnet"
  default = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "Availability zone for the subnet"
  default = "us-east-1a"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  // Specify a default value or ensure it's provided at runtime
}

variable "instance_type" {
  description = "Instance type for the EC2 instance"
  default = "t2.micro"
}

variable "key_name" {
  description = "Key pair name for the EC2 instance SSH access"
  // Ensure a key pair name is provided at runtime
}
