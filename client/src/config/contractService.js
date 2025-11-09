// // src/config/contractService.js
// import { ethers } from 'ethers';
// import MedicalRecordsABI from './MedicalRecordsABI.json';

// class ContractService {
//   constructor() {
//     this.provider = null;
//     this.signer = null;
//     this.contract = null;
//     this.isInitialized = false;
    
//     // Contract ABI - you'll need to generate this after compilation
//     this.contractABI = MedicalRecordsABI;
    
//     // Contract address - update this after deployment
//     this.contractAddress = "0x8d319688d7ABd50741694c9afBE35D15e073f018";
    
//     // Role constants
//     this.ROLES = {
//       PATIENT: "patient",
//       DOCTOR: "doctor", 
//       RESEARCHER: "researcher",
//       EMERGENCY: "emergency"
//     };
//   }

//   async init() {
//     if (this.isInitialized) return;

//     if (window.ethereum) {
//       try {
//         // Request account access
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
        
//         this.provider = new ethers.providers.Web3Provider(window.ethereum);
//         this.signer = this.provider.getSigner();
        
//         // Initialize contract
//         this.contract = new ethers.Contract(
//           this.contractAddress,
//           this.contractABI,
//           this.signer
//         );

//         this.isInitialized = true;
//         console.log("Contract service initialized successfully");
//       } catch (error) {
//         console.error("Error initializing contract service:", error);
//         throw error;
//       }
//     } else {
//       throw new Error("MetaMask not installed");
//     }
//   }

//   // Role registration
//   async registerAsPatient() {
//     await this.init();
//     return await this.contract.registerAsPatient();
//   }

//   async registerAsDoctor() {
//     await this.init();
//     return await this.contract.registerAsDoctor();
//   }

//   async registerAsResearcher() {
//     await this.init();
//     return await this.contract.registerAsResearcher();
//   }

//   async registerAsEmergencyResponder() {
//     await this.init();
//     return await this.contract.registerAsEmergencyResponder();
//   }

//   // Medical records
//   async addMedicalRecord(ipfsHash, fileType, fileSize, description) {
//     await this.init();
//     return await this.contract.addMedicalRecord(ipfsHash, fileType, fileSize, description);
//   }

//   async getMyRecords() {
//     await this.init();
//     return await this.contract.getMyRecords();
//   }

//   async getPatientRecords(patientAddress) {
//     await this.init();
//     return await this.contract.getPatientRecords(patientAddress);
//   }

//   // Access requests
//   async requestAccess(patientAddress, purpose, duration, accessLevel) {
//     await this.init();
//     return await this.contract.requestAccess(patientAddress, purpose, duration, accessLevel);
//   }

//   async approveAccess(requestId) {
//     await this.init();
//     return await this.contract.approveAccess(requestId);
//   }

//   async rejectAccess(requestId) {
//     await this.init();
//     return await this.contract.rejectAccess(requestId);
//   }

//   async getMyAccessRequests() {
//     await this.init();
//     return await this.contract.getMyAccessRequests();
//   }

//   async getPatientAccessRequests() {
//     await this.init();
//     return await this.contract.getPatientAccessRequests();
//   }

//   // Consent management
//   async grantConsent(granteeAddress, duration, accessLevel) {
//     await this.init();
//     return await this.contract.grantConsent(granteeAddress, duration, accessLevel);
//   }

//   async revokeConsent(granteeAddress) {
//     await this.init();
//     return await this.contract.revokeConsent(granteeAddress);
//   }

//   // Utility functions
//   async hasAccess(patientAddress, requesterAddress) {
//     await this.init();
//     return await this.contract.hasAccess(patientAddress, requesterAddress);
//   }

//   async getRole(userAddress) {
//     await this.init();
//     return await this.contract.getRole(userAddress);
//   }

//   async getCurrentAddress() {
//     await this.init();
//     return await this.signer.getAddress();
//   }

//   // Event listeners
//   onRecordAdded(callback) {
//     this.contract.on('MedicalRecordAdded', callback);
//   }

//   onAccessRequested(callback) {
//     this.contract.on('AccessRequested', callback);
//   }

//   onAccessApproved(callback) {
//     this.contract.on('AccessApproved', callback);
//   }

//   onConsentGranted(callback) {
//     this.contract.on('ConsentGranted', callback);
//   }

//   removeAllListeners() {
//     this.contract.removeAllListeners();
//   }
// }

// export default new ContractService();

// src/config/contractService.js
import { BrowserProvider, Contract } from "ethers";

// ABI for the MedicalRecords contract
const MedicalRecordsABI = [
  "function registerAsPatient() external",
  "function registerAsDoctor() external",
  "function registerAsResearcher() external",
  "function registerAsEmergencyResponder() external",
  "function addMedicalRecord(string memory _ipfsHash, string memory _fileType, uint256 _fileSize, string memory _description) external",
  "function getMyRecords() external view returns (tuple(string ipfsHash, string fileType, uint256 fileSize, string description, uint256 timestamp, address uploadedBy)[])",
  "function getPatientRecords(address _patient) external view returns (tuple(string ipfsHash, string fileType, uint256 fileSize, string description, uint256 timestamp, address uploadedBy)[])",
  "function requestAccess(address _patient, string memory _purpose, uint256 _duration, uint8 _accessLevel) external",
  "function approveAccess(uint256 _requestId) external",
  "function rejectAccess(uint256 _requestId) external",
  "function getMyAccessRequests() external view returns (tuple(address patient, address requester, string purpose, uint256 duration, uint8 accessLevel, uint256 timestamp, bool approved, bool rejected)[])",
  "function getPatientAccessRequests() external view returns (tuple(address patient, address requester, string purpose, uint256 duration, uint8 accessLevel, uint256 timestamp, bool approved, bool rejected)[])",
  "function grantConsent(address _grantee, uint256 _duration, uint8 _accessLevel) external",
  "function revokeConsent(address _grantee) external",
  "function hasAccess(address _patient, address _requester) external view returns (bool)",
  "function getRole(address _user) external view returns (string memory)",
  "function patients(address) external view returns (bool)",
  "function doctors(address) external view returns (bool)",
  "function researchers(address) external view returns (bool)",
  "function emergencyResponders(address) external view returns (bool)",
  "event PatientRegistered(address indexed patient)",
  "event DoctorRegistered(address indexed doctor)",
  "event ResearcherRegistered(address indexed researcher)",
  "event EmergencyResponderRegistered(address indexed responder)",
  "event MedicalRecordAdded(address indexed patient, uint256 recordId, string ipfsHash)",
  "event AccessRequested(address indexed patient, address indexed requester, uint256 requestId, string purpose)",
  "event AccessApproved(address indexed patient, address indexed requester, uint256 requestId)",
  "event AccessRejected(address indexed patient, address indexed requester, uint256 requestId)",
  "event ConsentGranted(address indexed patient, address indexed grantee, uint256 duration, uint8 accessLevel)",
  "event ConsentRevoked(address indexed patient, address indexed grantee)"
];

class ContractService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.isInitialized = false;
    
    this.contractABI = MedicalRecordsABI;
    this.contractAddress = "0xf7591d837767ce7d8C50748458BecE0403c83240"; 
    
    this.ROLES = {
      PATIENT: "patient",
      DOCTOR: "doctor", 
      RESEARCHER: "researcher",
      EMERGENCY: "emergency"
    };
  }

  // async init() {
  //   if (this.isInitialized && this.contract) return;

  //   if (window.ethereum) {
  //     try {
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
        
  //       this.provider = new ethers.providers.Web3Provider(window.ethereum);
  //       this.signer = this.provider.getSigner();
        
  //       this.contract = new ethers.Contract(
  //         this.contractAddress,
  //         this.contractABI,
  //         this.signer
  //       );

  //       this.isInitialized = true;
  //       console.log("Contract service initialized successfully");
  //     } catch (error) {
  //       console.error("Error initializing contract service:", error);
  //       throw error;
  //     }
  //   } else {
  //     throw new Error("MetaMask not installed");
  //   }
  // }

  // Role registration
  
  async init() {
  if (this.isInitialized && this.contract) return;

  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      this.provider = new BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();

      this.contract = new Contract(
        this.contractAddress,
        this.contractABI,
        this.signer
      );

      this.isInitialized = true;
      console.log("Contract service initialized successfully");
    } catch (error) {
      console.error("Error initializing contract service:", error);
      throw error;
    }
  } else {
    throw new Error("MetaMask not installed");
  }
}

  
  
  
  async registerAsPatient() {
    await this.init();
    const tx = await this.contract.registerAsPatient();
    return tx;
  }

  async registerAsDoctor() {
    await this.init();
    const tx = await this.contract.registerAsDoctor();
    return tx;
  }

  async registerAsResearcher() {
    await this.init();
    const tx = await this.contract.registerAsResearcher();
    return tx;
  }

  async registerAsEmergencyResponder() {
    await this.init();
    const tx = await this.contract.registerAsEmergencyResponder();
    return tx;
  }

  // Check roles
  async hasRole(role, address) {
    await this.init();
    try {
      switch(role) {
        case this.ROLES.PATIENT:
          return await this.contract.patients(address);
        case this.ROLES.DOCTOR:
          return await this.contract.doctors(address);
        case this.ROLES.RESEARCHER:
          return await this.contract.researchers(address);
        case this.ROLES.EMERGENCY:
          return await this.contract.emergencyResponders(address);
        default:
          return false;
      }
    } catch (error) {
      console.error("Error checking role:", error);
      return false;
    }
  }

  // Medical records
  async addMedicalRecord(ipfsHash, fileType, fileSize, description) {
    await this.init();
    const tx = await this.contract.addMedicalRecord(ipfsHash, fileType, fileSize, description);
    return tx;
  }

  async getMyRecords() {
    await this.init();
    try {
      const records = await this.contract.getMyRecords();
      return records.map((record, index) => ({
        recordId: index,
        ipfsHash: record.ipfsHash,
        fileType: record.fileType,
        fileSize: record.fileSize.toString(),
        description: record.description,
        timestamp: record.timestamp.toString(),
        uploadedBy: record.uploadedBy
      }));
    } catch (error) {
      console.error("Error getting records:", error);
      return [];
    }
  }

  async getPatientRecords(patientAddress) {
    await this.init();
    try {
      const records = await this.contract.getPatientRecords(patientAddress);
      return records.map((record, index) => ({
        recordId: index,
        ipfsHash: record.ipfsHash,
        fileType: record.fileType,
        fileSize: record.fileSize.toString(),
        description: record.description,
        timestamp: record.timestamp.toString(),
        uploadedBy: record.uploadedBy
      }));
    } catch (error) {
      console.error("Error getting patient records:", error);
      return [];
    }
  }

  // Access requests
  async requestAccess(patientAddress, purpose, duration, accessLevel) {
    await this.init();
    const tx = await this.contract.requestAccess(patientAddress, purpose, duration, accessLevel);
    return tx;
  }

  async approveAccess(requestId) {
    await this.init();
    const tx = await this.contract.approveAccess(requestId);
    return tx;
  }

  async rejectAccess(requestId) {
    await this.init();
    const tx = await this.contract.rejectAccess(requestId);
    return tx;
  }

  async getMyAccessRequests() {
    await this.init();
    try {
      const requests = await this.contract.getMyAccessRequests();
      return requests.map((request, index) => ({
        requestId: index,
        patient: request.patient,
        requester: request.requester,
        purpose: request.purpose,
        duration: request.duration.toString(),
        accessLevel: request.accessLevel,
        timestamp: request.timestamp.toString(),
        approved: request.approved,
        rejected: request.rejected
      }));
    } catch (error) {
      console.error("Error getting access requests:", error);
      return [];
    }
  }

  async getPatientAccessRequests() {
    await this.init();
    try {
      const requests = await this.contract.getPatientAccessRequests();
      return requests.map((request, index) => ({
        requestId: index,
        patient: request.patient,
        requester: request.requester,
        purpose: request.purpose,
        duration: request.duration.toString(),
        accessLevel: request.accessLevel,
        timestamp: request.timestamp.toString(),
        approved: request.approved,
        rejected: request.rejected
      }));
    } catch (error) {
      console.error("Error getting patient access requests:", error);
      return [];
    }
  }

  // Consent management
  async grantConsent(granteeAddress, duration, accessLevel) {
    await this.init();
    const tx = await this.contract.grantConsent(granteeAddress, duration, accessLevel);
    return tx;
  }

  async revokeConsent(granteeAddress) {
    await this.init();
    const tx = await this.contract.revokeConsent(granteeAddress);
    return tx;
  }

  // Utility functions
  async hasAccess(patientAddress, requesterAddress) {
    await this.init();
    try {
      return await this.contract.hasAccess(patientAddress, requesterAddress);
    } catch (error) {
      console.error("Error checking access:", error);
      return false;
    }
  }

  async getRole(userAddress) {
    await this.init();
    try {
      return await this.contract.getRole(userAddress);
    } catch (error) {
      console.error("Error getting role:", error);
      return "none";
    }
  }

  async getCurrentAddress() {
    await this.init();
    return await this.signer.getAddress();
  }

  // Event listeners
  onRecordAdded(callback) {
    if (this.contract) {
      this.contract.on('MedicalRecordAdded', callback);
    }
  }

  onAccessRequested(callback) {
    if (this.contract) {
      this.contract.on('AccessRequested', callback);
    }
  }

  onAccessApproved(callback) {
    if (this.contract) {
      this.contract.on('AccessApproved', callback);
    }
  }

  onConsentGranted(callback) {
    if (this.contract) {
      this.contract.on('ConsentGranted', callback);
    }
  }

  onConsentRevoked(callback) {
    if (this.contract) {
      this.contract.on('ConsentRevoked', callback);
    }
  }

  removeAllListeners() {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
  }
}

export default new ContractService();