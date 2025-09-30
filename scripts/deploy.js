// scripts/deploy.js
const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying MedicalRecords contract...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy the contract
  const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
  const medicalRecords = await MedicalRecords.deploy();
  await medicalRecords.deployed();

  console.log("MedicalRecords contract deployed to:", medicalRecords.address);

  // Save deployment info to JSON file
  const deploymentInfo = {
    network: "localhost",
    contractAddress: medicalRecords.address,
    deployer: deployer.address,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    "deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployment.json");
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
