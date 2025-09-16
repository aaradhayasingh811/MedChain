const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy AccessControl
  const AccessControl = await ethers.getContractFactory("MedicalAccessControl");
  const accessControl = await AccessControl.deploy(deployer.address);
  await accessControl.waitForDeployment();
  console.log("AccessControl deployed at:", accessControl.target);

  // Deploy HealthRecord
  const HealthRecord = await ethers.getContractFactory("HealthRecord");
  const healthRecord = await HealthRecord.deploy(deployer.address);
  await healthRecord.waitForDeployment();
  console.log("HealthRecord deployed at:", healthRecord.target);

  // Deploy ResearchToken
  const ResearchToken = await ethers.getContractFactory("ResearchToken");
  const researchToken = await ResearchToken.deploy();
  await researchToken.waitForDeployment();
  console.log("ResearchToken deployed at:", researchToken.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
