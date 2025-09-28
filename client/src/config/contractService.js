// import { ethers } from "ethers";
// import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../config/contracts";

// class ContractService {
//   constructor() {
//     this.provider = null;
//     this.signer = null;
//     this.contracts = {};
//   }

//   async init() {
//     if (this.provider && this.signer) return;

//     if (window.ethereum) {
//       this.provider = new ethers.BrowserProvider(window.ethereum);
//       this.signer = await this.provider.getSigner();
//       this.initializeContracts();
//     } else {
//       throw new Error("MetaMask not installed");
//     }
//   }

//   initializeContracts() {
//     const signer = this.signer;

//     // MedicalRecordsStorage contains both medical records and access request functionality
//     this.contracts.medicalRecords = new ethers.Contract(
//       CONTRACT_ADDRESSES.medicalRecordsStorage,
//       CONTRACT_ABIS.MedicalRecords,
//       signer
//     );

//     // AccessRequests contract (though most functionality is in MedicalRecordsStorage)
//     this.contracts.accessRequests = new ethers.Contract(
//       CONTRACT_ADDRESSES.accessRequests,
//       CONTRACT_ABIS.AccessRequests,
//       signer
//     );

//     this.contracts.researchToken = new ethers.Contract(
//       CONTRACT_ADDRESSES.researchToken,
//       CONTRACT_ABIS.ResearchAccessToken,
//       signer
//     );

//     this.contracts.roles = new ethers.Contract(
//       CONTRACT_ADDRESSES.roles,
//       CONTRACT_ABIS.Roles,
//       signer
//     );
//   }

//   // ================= MEDICAL RECORDS =================
//   // async addMedicalRecord(ipfsHash, fileType, fileSize, description) {
//   //   const tx = await this.contracts.medicalRecords.addMedicalRecord(
//   //     ipfsHash,
//   //     fileType,
//   //     fileSize,
//   //     description
//   //   );
//   //   return await tx.wait();
//   // }


//   async addMedicalRecord(ipfsHash, fileType, fileSize, description) {
//   try {
//     if (!this.contracts.medicalRecords) {
//       throw new Error("ContractService not initialized. Call init() first.");
//     }

//     // Ensure all fields are valid
//     if (!ipfsHash || !fileType || !fileSize) {
//       throw new Error("Missing required parameters for medical record");
//     }

//     const safeDescription = (description || "Medical Record").slice(0, 200);
//     const sizeBN = BigInt(fileSize); // uint256 in Solidity
//     fileSize = Number(fileSize);
    

  
//     const tx = await this.contracts.medicalRecords.addMedicalRecord(
//       ipfsHash,
//       fileType,
//       BigInt(fileSize),
//       safeDescription,
//     );
//     return await tx.wait();
//   } catch (error) {
//     console.error("addMedicalRecord failed:", error);

//     // Better error handling for revert
//     let msg = error?.reason || error?.data?.message || error.message || error;
//     throw new Error(`Blockchain call failed: ${msg}`);
//   }
// }

  

//   async getMyRecords() {
//     return await this.contracts.medicalRecords.getMyRecords();
//   }

//   async getPatientRecords(patientAddress) {
//     // Note: This function might not exist in your actual contract
//     // Check if it exists before calling
//     try {
//       return await this.contracts.medicalRecords.getPatientRecords(patientAddress);
//     } catch (error) {
//       console.error("getPatientRecords not available:", error);
//       return [];
//     }
//   }

//   // ================= CONSENT MANAGEMENT =================
//   async grantConsent(granteeAddress, duration, accessLevel) {
//     const tx = await this.contracts.medicalRecords.grantConsent(
//       granteeAddress,
//       duration,
//       accessLevel
//     );
//     return await tx.wait();
//   }

//   async revokeConsent(granteeAddress) {
//     const tx = await this.contracts.medicalRecords.revokeConsent(granteeAddress);
//     return await tx.wait();
//   }

//   async getConsentStatus(patient, grantee) {
//     try {
//       return await this.contracts.medicalRecords.consents(patient, grantee);
//     } catch (error) {
//       console.error("Error getting consent status:", error);
//       return null;
//     }
//   }

//   // ================= ACCESS REQUESTS =================
//   async requestAccess(patientAddress, purpose, duration, accessLevel) {
//     const tx = await this.contracts.accessRequests.requestAccess(
//       patientAddress,
//       purpose,
//       duration,
//       accessLevel
//     );
//     return await tx.wait();
//   }

//   async approveAccess(requestId) {
//     // Note: approveAccess might not exist in your contract
//     // Using the available function from the ABI
//     try {
//       const tx = await this.contracts.medicalRecords.approveAccess(requestId);
//       return await tx.wait();
//     } catch (error) {
//       console.error("approveAccess not available:", error);
//       throw error;
//     }
//   }

//   async rejectAccess(requestId) {
//     try {
//       const tx = await this.contracts.medicalRecords.rejectAccess(requestId);
//       return await tx.wait();
//     } catch (error) {
//       console.error("rejectAccess not available:", error);
//       throw error;
//     }
//   }

//   async getMyAccessRequests() {
//     try {
//       return await this.contracts.medicalRecords.getMyAccessRequests();
//     } catch (error) {
//       console.error("getMyAccessRequests not available:", error);
//       return [];
//     }
//   }

//   async getAccessRequest(requestId) {
//     try {
//       return await this.contracts.accessRequests.accessRequests(requestId);
//     } catch (error) {
//       console.error("getAccessRequest not available:", error);
//       return null;
//     }
//   }

//   // ================= ROLE MANAGEMENT (SELF-REGISTER) =================
// async registerAsPatient() {
//   const tx = await this.contracts.roles.registerAsPatient();
//   return await tx.wait();
// }

// async registerAsDoctor() {
//   const tx = await this.contracts.roles.registerAsDoctor();
//   return await tx.wait();
// }

// async registerAsResearcher() {
//   const tx = await this.contracts.roles.registerAsResearcher();
//   return await tx.wait();
// }

// async registerAsEmergencyResponder() {
//   const tx = await this.contracts.roles.registerAsEmergencyResponder();
//   return await tx.wait();
// }

//   // ================= RESEARCH TOKENS =================
//   async mintResearchToken(to, researchPurpose) {
//     const tx = await this.contracts.researchToken.mintResearchToken(to, researchPurpose);
//     return await tx.wait();
//   }

//   async getTokenPurpose(tokenId) {
//     return await this.contracts.researchToken.getTokenPurpose(tokenId);
//   }

//   async isApprovedResearcher(researcher) {
//     return await this.contracts.researchToken.isApprovedResearcher(researcher);
//   }

//   // ================= UTILITY FUNCTIONS =================
//   async hasResearchAccess(user) {
//     return await this.contracts.medicalRecords.hasResearchAccess(user);
//   }

//   async setResearchToken(tokenAddress) {
//     const tx = await this.contracts.medicalRecords.setResearchToken(tokenAddress);
//     return await tx.wait();
//   }

//   // ================= ROLE CHECKING =================
//   async hasRole(role, account) {
//     return await this.contracts.roles.hasRole(role, account);
//   }

//   async getRoleAdmin(role) {
//     return await this.contracts.roles.getRoleAdmin(role);
//   }

//   // Constants for role hashes
//   get ROLES() {
//     return {
//       PATIENT: ethers.keccak256(ethers.toUtf8Bytes("PATIENT_ROLE")),
//       DOCTOR: ethers.keccak256(ethers.toUtf8Bytes("DOCTOR_ROLE")),
//       RESEARCHER: ethers.keccak256(ethers.toUtf8Bytes("RESEARCHER_ROLE")),
//       EMERGENCY: ethers.keccak256(ethers.toUtf8Bytes("EMERGENCY_ROLE")),
//       ADMIN: ethers.keccak256(ethers.toUtf8Bytes("DEFAULT_ADMIN_ROLE"))
//     };
//   }

//   // ================= EVENT LISTENERS =================
//   onRecordAdded(callback) {
//     this.contracts.medicalRecords.on("RecordAdded", callback);
//   }

//   onConsentGranted(callback) {
//     this.contracts.medicalRecords.on("ConsentGranted", callback);
//   }

//   onConsentRevoked(callback) {
//     this.contracts.medicalRecords.on("ConsentRevoked", callback);
//   }

//   // Remove all listeners
//   removeAllListeners() {
//     this.contracts.medicalRecords.removeAllListeners();
//     this.contracts.accessRequests.removeAllListeners();
//     this.contracts.researchToken.removeAllListeners();
//     this.contracts.roles.removeAllListeners();
//   }
// }

// export default new ContractService();

import { ethers } from "ethers";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../config/contracts";

class ContractService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contracts = {};
  }

  // ================= INIT =================
  async init() {
    if (this.provider && this.signer) return;

    if (!window.ethereum) throw new Error("MetaMask not installed");

    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    await this.initializeContracts();
  }

  async initializeContracts() {
    const signer = this.signer;

    this.contracts.medicalRecords = new ethers.Contract(
      CONTRACT_ADDRESSES.medicalRecordsStorage,
      CONTRACT_ABIS.MedicalRecords,
      signer
    );

    this.contracts.accessRequests = new ethers.Contract(
      CONTRACT_ADDRESSES.accessRequests,
      CONTRACT_ABIS.AccessRequests,
      signer
    );

    this.contracts.researchToken = new ethers.Contract(
      CONTRACT_ADDRESSES.researchToken,
      CONTRACT_ABIS.ResearchAccessToken,
      signer
    );

    this.contracts.roles = new ethers.Contract(
      CONTRACT_ADDRESSES.roles,
      CONTRACT_ABIS.Roles,
      signer
    );
  }

  // ================= ROLE HASHES =================
  get ROLES() {
    return {
      PATIENT: ethers.keccak256(ethers.toUtf8Bytes("PATIENT_ROLE")),
      DOCTOR: ethers.keccak256(ethers.toUtf8Bytes("DOCTOR_ROLE")),
      RESEARCHER: ethers.keccak256(ethers.toUtf8Bytes("RESEARCHER_ROLE")),
      EMERGENCY: ethers.keccak256(ethers.toUtf8Bytes("EMERGENCY_ROLE")),
      ADMIN: ethers.keccak256(ethers.toUtf8Bytes("DEFAULT_ADMIN_ROLE")),
    };
  }

  async hasRole(role, account) {
    return await this.contracts.roles.hasRole(role, account);
  }

  // ================= MEDICAL RECORDS =================
  async addMedicalRecord(ipfsHash, fileType, fileSize, description) {
    const account = await this.signer.getAddress();
    const isPatient = await this.hasRole(this.ROLES.PATIENT, account);
    if (!isPatient) throw new Error("Account is not a registered PATIENT");

    const safeDescription = (description || "Medical Record").slice(0, 200);
    const tx = await this.contracts.medicalRecords.addMedicalRecord(
      ipfsHash,
      fileType,
      BigInt(fileSize),
      safeDescription
    );
    return await tx.wait();
  }

  async getMyRecords() {
    return await this.contracts.medicalRecords.getMyRecords();
  }

  async getPatientRecords(patientAddress) {
    try {
      return await this.contracts.medicalRecords.getPatientRecords(patientAddress);
    } catch (err) {
      console.error("getPatientRecords failed:", err);
      return [];
    }
  }

  // ================= CONSENT MANAGEMENT =================
  async grantConsent(granteeAddress, duration, accessLevel) {
    const account = await this.signer.getAddress();
    const isPatient = await this.hasRole(this.ROLES.PATIENT, account);
    if (!isPatient) throw new Error("Account is not a registered PATIENT");

    const tx = await this.contracts.medicalRecords.grantConsent(granteeAddress, duration, accessLevel);
    return await tx.wait();
  }

  async revokeConsent(granteeAddress) {
    const account = await this.signer.getAddress();
    const isPatient = await this.hasRole(this.ROLES.PATIENT, account);
    if (!isPatient) throw new Error("Account is not a registered PATIENT");

    const tx = await this.contracts.medicalRecords.revokeConsent(granteeAddress);
    return await tx.wait();
  }

  async getConsentStatus(patient, grantee) {
    try {
      return await this.contracts.medicalRecords.consents(patient, grantee);
    } catch (err) {
      console.error("getConsentStatus failed:", err);
      return null;
    }
  }

  // ================= ACCESS REQUESTS =================
  async requestAccess(patientAddress, purpose, duration, accessLevel) {
    const account = await this.signer.getAddress();
    const isDoctorOrResearcher =
      (await this.hasRole(this.ROLES.DOCTOR, account)) ||
      (await this.hasRole(this.ROLES.RESEARCHER, account));

    if (!isDoctorOrResearcher) throw new Error("Account is not authorized to request access");

    const tx = await this.contracts.accessRequests.requestAccess(patientAddress, purpose, duration, accessLevel);
    return await tx.wait();
  }

  async approveAccess(requestId) {
    const tx = await this.contracts.accessRequests.approveAccess(requestId);
    return await tx.wait();
  }

  async rejectAccess(requestId) {
    const tx = await this.contracts.accessRequests.rejectAccess(requestId);
    return await tx.wait();
  }

  async getMyAccessRequests() {
    try {
      return await this.contracts.medicalRecords.getMyAccessRequests();
    } catch (err) {
      console.error("getMyAccessRequests failed:", err);
      return [];
    }
  }

  async getAccessRequest(requestId) {
    try {
      return await this.contracts.accessRequests.accessRequests(requestId);
    } catch (err) {
      console.error("getAccessRequest failed:", err);
      return null;
    }
  }

  // ================= ROLE SELF-REGISTRATION =================
  async registerAsPatient() {
    const tx = await this.contracts.roles.registerAsPatient();
    return await tx.wait();
  }

  async registerAsDoctor() {
    const tx = await this.contracts.roles.registerAsDoctor();
    return await tx.wait();
  }

  async registerAsResearcher() {
    const tx = await this.contracts.roles.registerAsResearcher();
    return await tx.wait();
  }

  async registerAsEmergencyResponder() {
    const tx = await this.contracts.roles.registerAsEmergencyResponder();
    return await tx.wait();
  }

  // ================= RESEARCH TOKEN =================
  async mintResearchToken(to, researchPurpose) {
    const account = await this.signer.getAddress();
    const isAdmin = await this.hasRole(this.ROLES.ADMIN, account);
    if (!isAdmin) throw new Error("Only ADMIN can mint research tokens");

    const tx = await this.contracts.researchToken.mintResearchToken(to, researchPurpose);
    return await tx.wait();
  }

  async getTokenPurpose(tokenId) {
    return await this.contracts.researchToken.getTokenPurpose(tokenId);
  }

  async isApprovedResearcher(researcher) {
    return await this.contracts.researchToken.isApprovedResearcher(researcher);
  }

  async hasResearchAccess(user) {
    return await this.contracts.medicalRecords.hasResearchAccess(user);
  }

  async setResearchToken(tokenAddress) {
    const account = await this.signer.getAddress();
    const isAdmin = await this.hasRole(this.ROLES.ADMIN, account);
    if (!isAdmin) throw new Error("Only ADMIN can set research token");

    const tx = await this.contracts.medicalRecords.setResearchToken(tokenAddress);
    return await tx.wait();
  }

  // ================= EVENTS =================
  onRecordAdded(callback) {
    this.contracts.medicalRecords.on("RecordAdded", callback);
  }

  onConsentGranted(callback) {
    this.contracts.medicalRecords.on("ConsentGranted", callback);
  }

  onConsentRevoked(callback) {
    this.contracts.medicalRecords.on("ConsentRevoked", callback);
  }

  removeAllListeners() {
    this.contracts.medicalRecords.removeAllListeners();
    this.contracts.accessRequests.removeAllListeners();
    this.contracts.researchToken.removeAllListeners();
    this.contracts.roles.removeAllListeners();
  }
}

export default new ContractService();
