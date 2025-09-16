// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract MedicalAccessControl is AccessControl {
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE");
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    bytes32 public constant RESEARCHER_ROLE = keccak256("RESEARCHER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
    }

    function addPatient(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(PATIENT_ROLE, account);
    }

    function addDoctor(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(DOCTOR_ROLE, account);
    }

    function addResearcher(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(RESEARCHER_ROLE, account);
    }

    function addEmergency(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(EMERGENCY_ROLE, account);
    }
}
