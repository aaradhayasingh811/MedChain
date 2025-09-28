// contracts.js
import medical from './abi/MedicalRecordsStorage.json';
import access from './abi/AccessRequests.json';
import imedical from './abi/IMedicalRecords.json';
import research from './abi/ResearchAccessToken.json';
import roles from './abi/Roles.json';

export const CONTRACT_ADDRESSES = {
  researchToken: "0x318B3Be311bf722428878E8d96047749Ed02fDB0",
  roles: "0xF3759999A7A7C05D7410c01DD55e5dc70467C9F9",
  medicalRecordsStorage: "0xB4c504ac290f8b5dc0ECa4a003981941FaBF7edD",
  accessRequests: "0x319aFf6AaAD12B2d0479530bC5bA52049BE53f23",
  researchInMedical:"0x318B3Be311bf722428878E8d96047749Ed02fDB0"
};

export const CONTRACT_ABIS = {
  MedicalRecords: medical.abi,       
  AccessRequests: access.abi,        
  IMedicalRecords: imedical.abi,
  ResearchAccessToken: research.abi,
  Roles: roles.abi
};
