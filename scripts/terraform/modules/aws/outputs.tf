// ---------------------------- //
// OUTPUT CONFIG FOR AWS MODULE //
// ---------------------------- //

output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value = aws_instance.sol_sentry_instance.public_ip
}

output "instance_id" {
  description = "ID of the EC2 instance"
  value = aws_instance.sol_sentry_instance.id
}
