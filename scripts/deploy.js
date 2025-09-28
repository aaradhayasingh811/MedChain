const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1️⃣ Deploy Research Token
  const ResearchToken = await hre.ethers.getContractFactory("ResearchAccessToken");
  const researchToken = await ResearchToken.deploy();
  await researchToken.deployed();
  console.log("ResearchToken deployed to:", researchToken.address);

  // 2️⃣ Deploy Roles contract
  const Roles = await hre.ethers.getContractFactory("Roles");
  const roles = await Roles.deploy();
  await roles.deployed();
  console.log("Roles deployed to:", roles.address);

  // 3️⃣ Deploy MedicalRecordsStorage with Roles already deployed
  const MedicalRecordsStorage = await hre.ethers.getContractFactory("MedicalRecordsStorage");
  const medicalRecordsStorage = await MedicalRecordsStorage.deploy();
  await medicalRecordsStorage.deployed();
  console.log("MedicalRecordsStorage deployed to:", medicalRecordsStorage.address);

  // 4️⃣ Deploy AccessRequests with MedicalRecordsStorage inherited
  const AccessRequests = await hre.ethers.getContractFactory("AccessRequests");
  const accessRequests = await AccessRequests.deploy();
  await accessRequests.deployed();
  console.log("AccessRequests deployed to:", accessRequests.address);

  // 5️⃣ Set Research Token (ensure deployer has admin role in MedicalRecordsStorage)
  const tx = await medicalRecordsStorage.setResearchToken(researchToken.address);
  await tx.wait();
  console.log("Research token set in MedicalRecordsStorage:", researchToken.address);

  console.log("✅ Deployment finished successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
