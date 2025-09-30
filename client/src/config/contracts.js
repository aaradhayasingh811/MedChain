// config/contracts.js

// ==================== DEPLOYED CONTRACT ADDRESSES ====================
export const CONTRACT_ADDRESSES = {
  researchToken: "0xF87B3DC0238aA486B5ac76172E9E51445Ec43Eb0",
  medicalRecordsStorage: "0x5252Ad981a3DF3aB933b1669065c4833A0fE5eBe",
  accessRequests: "0xaCaA39c13955bb770cbb2ac2E1de067C41f418Bf",
  emergencyAccess: "0xEA714C3f1bec589F42E4E9a313F52d06C0dE5ACd",
  orchestrator: "0x80BaA4C7fB99FcD0530e572A6B35C651F4761590",
};

// ==================== CONTRACT ABIs ====================
// Import the ABIs generated during compilation (JSON files)
import OrchestratorABI from "../artifacts/contracts/MedicalRecordsOrchestrator.sol/MedicalRecordsOrchestrator.json";
import RolesABI from "../artifacts/contracts/Roles.sol/Roles.json";
import ResearchTokenABI from "../artifacts/contracts/ResearchAccessToken.sol/ResearchAccessToken.json";

export const CONTRACT_ABIS = {
  Orchestrator: OrchestratorABI.abi,
  Roles: RolesABI.abi,
  ResearchAccessToken: ResearchTokenABI.abi
};
