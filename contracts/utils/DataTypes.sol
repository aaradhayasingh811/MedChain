// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library DataTypes {
    enum ConsentStatus { Granted, Revoked, Pending }

    struct Record {
        string ipfsHash;   // IPFS or FHIR reference
        address owner;     // Patient who owns the record
        uint256 timestamp;
    }

    struct Consent {
        address grantee;       // Doctor/Researcher
        ConsentStatus status;
        uint256 timestamp;
    }
}
