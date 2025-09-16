// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AccessControl.sol";
import "./utils/DataTypes.sol";

contract HealthRecord is MedicalAccessControl {
    using DataTypes for DataTypes.Record;
    using DataTypes for DataTypes.Consent;

    mapping(address => DataTypes.Record[]) private records;
    mapping(address => mapping(address => DataTypes.Consent)) private consents;

    event RecordAdded(address indexed patient, string ipfsHash, uint256 time);
    event ConsentGranted(address indexed patient, address grantee, uint256 time);
    event ConsentRevoked(address indexed patient, address grantee, uint256 time);

    constructor(address admin) MedicalAccessControl(admin) {}

    function addRecord(string memory ipfsHash)
        external
        onlyRole(PATIENT_ROLE)
    {
        DataTypes.Record memory newRecord = DataTypes.Record({
            ipfsHash: ipfsHash,
            owner: msg.sender,
            timestamp: block.timestamp
        });
        records[msg.sender].push(newRecord);
        emit RecordAdded(msg.sender, ipfsHash, block.timestamp);
    }

    function grantConsent(address grantee)
        external
        onlyRole(PATIENT_ROLE)
    {
        consents[msg.sender][grantee] = DataTypes.Consent({
            grantee: grantee,
            status: DataTypes.ConsentStatus.Granted,
            timestamp: block.timestamp
        });
        emit ConsentGranted(msg.sender, grantee, block.timestamp);
    }

    function revokeConsent(address grantee)
        external
        onlyRole(PATIENT_ROLE)
    {
        consents[msg.sender][grantee].status = DataTypes.ConsentStatus.Revoked;
        emit ConsentRevoked(msg.sender, grantee, block.timestamp);
    }

    function getRecords(address patient)
        external
        view
        returns (DataTypes.Record[] memory)
    {
        require(
            consents[patient][msg.sender].status == DataTypes.ConsentStatus.Granted ||
            hasRole(ADMIN_ROLE, msg.sender) ||
            hasRole(EMERGENCY_ROLE, msg.sender),
            "Access denied"
        );
        return records[patient];
    }
}
