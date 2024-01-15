# configure_environment.py

def main():
    print("Welcome to Sol-Sentry environment configuration tool.")

    # Ask user for preferred cloud provider
    aws = input("Do you want to use AWS? (yes/no): ").lower() == 'yes'
    gcp = input("Do you want to use GCP? (yes/no): ").lower() == 'yes'
    azure = input("Do you want to use Azure? (yes/no): ").lower() == 'yes'

    # Generate the terraform.tfvars file
    with open("terraform/terraform.tfvars", "w") as tfvars:
        tfvars.write(f"use_aws = {aws}\n")
        tfvars.write(f"use_gcp = {gcp}\n")
        tfvars.write(f"use_azure = {azure}\n")

    print("Configuration complete. You can now run `terraform plan` and `terraform apply`.")

if __name__ == "__main__":
    main()