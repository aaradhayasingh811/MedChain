// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Roles is AccessControl {
    // ================== Role Definitions ==================
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE");
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    bytes32 public constant RESEARCHER_ROLE = keccak256("RESEARCHER_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");

    // ================== Constructor ==================
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ================== Self-registration Functions ==================
    function registerAsPatient() external {
        require(!hasRole(PATIENT_ROLE, msg.sender), "Already registered as Patient");
        _grantRole(PATIENT_ROLE, msg.sender);
    }

    function registerAsDoctor() external {
        require(!hasRole(DOCTOR_ROLE, msg.sender), "Already registered as Doctor");
        _grantRole(DOCTOR_ROLE, msg.sender);
    }

    function registerAsResearcher() external {
        require(!hasRole(RESEARCHER_ROLE, msg.sender), "Already registered as Researcher");
        _grantRole(RESEARCHER_ROLE, msg.sender);
    }

    function registerAsEmergencyResponder() external {
        require(!hasRole(EMERGENCY_ROLE, msg.sender), "Already registered as Emergency");
        _grantRole(EMERGENCY_ROLE, msg.sender);
    }

    // ================== Helper Functions ==================
    function isPatient(address account) external view returns (bool) {
        return hasRole(PATIENT_ROLE, account);
    }

    function isDoctor(address account) external view returns (bool) {
        return hasRole(DOCTOR_ROLE, account);
    }

    function isResearcher(address account) external view returns (bool) {
        return hasRole(RESEARCHER_ROLE, account);
    }

    function isEmergencyResponder(address account) external view returns (bool) {
        return hasRole(EMERGENCY_ROLE, account);
    }
}
