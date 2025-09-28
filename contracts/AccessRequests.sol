// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MedicalRecordsStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AccessRequests is MedicalRecordsStorage {
    using Counters for Counters.Counter;

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

    mapping(uint256 => AccessRequest) public accessRequests;
    mapping(address => uint256[]) private patientAccessRequests;
    mapping(address => uint256[]) private doctorAccessRequests;

    Counters.Counter private _requestIdCounter;

    // ================== Events ==================
    event AccessRequested(
        uint256 indexed requestId,
        address indexed patient,
        address requester,
        string purpose
    );
    event AccessApproved(
        uint256 indexed requestId,
        address indexed patient,
        address requester
    );
    event AccessRejected(
        uint256 indexed requestId,
        address indexed patient,
        address requester
    );

    // ================== Functions ==================

    function requestAccess(
        address patient,
        string memory purpose,
        uint256 duration,
        uint8 accessLevel
    ) external {
        require(
            hasRole(DOCTOR_ROLE, msg.sender) || hasRole(RESEARCHER_ROLE, msg.sender),
            "Not authorized"
        );

        _requestIdCounter.increment();
        uint256 requestId = _requestIdCounter.current();

        accessRequests[requestId] = AccessRequest(
            requestId,
            msg.sender,
            patient,
            purpose,
            duration,
            accessLevel,
            block.timestamp,
            false,
            false
        );

        patientAccessRequests[patient].push(requestId);
        doctorAccessRequests[msg.sender].push(requestId);

        emit AccessRequested(requestId, patient, msg.sender, purpose);
    }

    function approveAccess(uint256 requestId) external {
        AccessRequest storage request = accessRequests[requestId];
        require(request.patient == msg.sender, "Not patient");
        require(!request.isProcessed, "Already processed");

        request.isApproved = true;
        request.isProcessed = true;

        consents[msg.sender][request.requester] = Consent(
            request.requester,
            block.timestamp + (request.duration * 1 days),
            request.accessLevel,
            true,
            block.timestamp
        );

        emit AccessApproved(requestId, msg.sender, request.requester);
    }

    function rejectAccess(uint256 requestId) external {
        AccessRequest storage request = accessRequests[requestId];
        require(request.patient == msg.sender, "Not patient");
        require(!request.isProcessed, "Already processed");

        request.isApproved = false;
        request.isProcessed = true;

        emit AccessRejected(requestId, msg.sender, request.requester);
    }
}
