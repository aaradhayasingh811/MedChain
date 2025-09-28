// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// ================== Structs ==================
struct MedicalRecord {
    string ipfsHash;
    address patient;
    uint256 timestamp;
    string fileType;
    uint256 fileSize;
    string description;
}

struct Consent {
    address grantee;
    uint256 expiresAt;
    uint8 accessLevel;
    bool isActive;
    uint256 grantedAt;
}

struct AccessRequest {
    uint256 requestId;
    address requester;
    address patient;
    string purpose;
    uint256 duration;
    uint8 accessLevel;
    uint256 timestamp;
    bool isApproved;
    bool isProcessed;
}

struct EmergencyAccess {
    uint256 emergencyId;
    address responder;
    address patient;
    string reason;
    uint256 timestamp;
    bool approved;
    address[] approvals;
}

struct ResearchDataset {
    string datasetId;
    string name;
    string description;
    uint256 patientCount;
    string ipfsHash;
    bool active;
}

// ================== Interface ==================
interface IMedicalRecords {
    // Medical Records
    function addMedicalRecord(
        string memory ipfsHash,
        string memory fileType,
        uint256 fileSize,
        string memory description
    ) external;

    function getMyRecords() external view returns (MedicalRecord[] memory);
    function getPatientRecords(address patient) external view returns (MedicalRecord[] memory);

    // Consent Management
    function grantConsent(address grantee, uint256 duration, uint8 accessLevel) external;
    function revokeConsent(address grantee) external;
    function getConsentStatus(address patient, address grantee) external view returns (Consent memory);

    // Access Requests
    function requestAccess(address patient, string memory purpose, uint256 duration, uint8 accessLevel) external;
    function approveAccess(uint256 requestId) external;
    function rejectAccess(uint256 requestId) external;
    function getMyAccessRequests() external view returns (uint256[] memory);
    function getAccessRequest(uint256 requestId) external view returns (AccessRequest memory);

    // Emergency Access
    function requestEmergencyAccess(address patient, string memory reason) external;
    function approveEmergencyAccess(uint256 emergencyId) external;
    function getEmergencyAccess(uint256 emergencyId) external view returns (EmergencyAccess memory);

    // Research Datasets
    function getResearchDataset(string memory datasetId) external view returns (ResearchDataset memory);
    function getAllDatasets() external view returns (string[] memory);

    // Stats
    function getPatientStats(address patient) external view returns (
        uint256 recordCount,
        uint256 accessGrants,
        uint256 pendingRequests
    );

    function getDoctorStats(address doctor) external view returns (
        uint256 patients,
        uint256 accessRequests,
        uint256 approvedAccess
    );
}
