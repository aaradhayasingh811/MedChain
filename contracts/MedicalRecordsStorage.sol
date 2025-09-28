// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Roles.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MedicalRecordsStorage is Roles {
    // ================== Research Token ==================
    IERC721 public researchToken;

    function setResearchToken(address tokenAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        researchToken = IERC721(tokenAddress);
    }

    // ================== Data Structures ==================
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

    // ================== Storage ==================
    mapping(address => MedicalRecord[]) private patientRecords;
    mapping(address => mapping(address => Consent)) public consents;

    // ================== Events ==================
    event RecordAdded(
        address indexed patient,
        string ipfsHash,
        uint256 timestamp,
        string description
    );

    event ConsentGranted(
        address indexed patient,
        address indexed grantee,
        uint8 accessLevel,
        uint256 expiresAt
    );

    event ConsentRevoked(
        address indexed patient,
        address indexed grantee
    );

    // ================== Functions ==================
    function addMedicalRecord(
        string memory ipfsHash,
        string memory fileType,
        uint256 fileSize,
        string memory description
    ) external onlyRole(PATIENT_ROLE) {
        MedicalRecord memory newRecord = MedicalRecord(
            ipfsHash,
            msg.sender,
            block.timestamp,
            fileType,
            fileSize,
            description
        );

        patientRecords[msg.sender].push(newRecord);
        emit RecordAdded(msg.sender, ipfsHash, block.timestamp, description);
    }

    function getMyRecords() external view returns (MedicalRecord[] memory) {
        return patientRecords[msg.sender];
    }

    function grantConsent(
        address grantee,
        uint256 duration,
        uint8 accessLevel
    ) external onlyRole(PATIENT_ROLE) {
        consents[msg.sender][grantee] = Consent(
            grantee,
            block.timestamp + (duration * 1 days),
            accessLevel,
            true,
            block.timestamp
        );
        emit ConsentGranted(
            msg.sender,
            grantee,
            accessLevel,
            block.timestamp + (duration * 1 days)
        );
    }

    function revokeConsent(address grantee) external onlyRole(PATIENT_ROLE) {
        consents[msg.sender][grantee].isActive = false;
        emit ConsentRevoked(msg.sender, grantee);
    }

    // Optional helper to check if user holds a research token
    function hasResearchAccess(address user) public view returns (bool) {
        return address(researchToken) != address(0) && researchToken.balanceOf(user) > 0;
    }
}
