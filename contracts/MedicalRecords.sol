// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MedicalRecords {
    struct MedicalRecord {
        string ipfsHash;
        string fileType;
        uint256 fileSize;
        string description;
        uint256 timestamp;
        address uploadedBy;
    }

    struct AccessRequest {
        address patient;
        address requester;
        string purpose;
        uint256 duration;
        uint8 accessLevel; // 0 = view, 1 = edit
        uint256 timestamp;
        bool approved;
        bool rejected;
    }

    // Role management
    mapping(address => bool) public patients;
    mapping(address => bool) public doctors;
    mapping(address => bool) public researchers;
    mapping(address => bool) public emergencyResponders;

    // Medical records storage
    mapping(address => MedicalRecord[]) private patientRecords;
    
    // Access control
    mapping(address => mapping(address => uint256)) private accessGrants; // patient -> doctor -> expiry timestamp
    mapping(address => mapping(address => uint8)) private accessLevels; // patient -> doctor -> access level
    
    // Access requests
    AccessRequest[] public accessRequests;
    mapping(address => uint256[]) private patientAccessRequests;
    mapping(address => uint256[]) private requesterAccessRequests;

    // Events
    event PatientRegistered(address indexed patient);
    event DoctorRegistered(address indexed doctor);
    event ResearcherRegistered(address indexed researcher);
    event EmergencyResponderRegistered(address indexed responder);
    event MedicalRecordAdded(address indexed patient, uint256 recordId, string ipfsHash);
    event AccessRequested(address indexed patient, address indexed requester, uint256 requestId, string purpose);
    event AccessApproved(address indexed patient, address indexed requester, uint256 requestId);
    event AccessRejected(address indexed patient, address indexed requester, uint256 requestId);
    event ConsentGranted(address indexed patient, address indexed grantee, uint256 duration, uint8 accessLevel);
    event ConsentRevoked(address indexed patient, address indexed grantee);

    // Modifiers
    modifier onlyPatient() {
        require(patients[msg.sender], "Not a registered patient");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Not a registered doctor");
        _;
    }

    // Self-registration functions
    function registerAsPatient() external {
        require(!patients[msg.sender], "Already registered as patient");
        patients[msg.sender] = true;
        emit PatientRegistered(msg.sender);
    }

    function registerAsDoctor() external {
        require(!doctors[msg.sender], "Already registered as doctor");
        doctors[msg.sender] = true;
        emit DoctorRegistered(msg.sender);
    }

    function registerAsResearcher() external {
        require(!researchers[msg.sender], "Already registered as researcher");
        researchers[msg.sender] = true;
        emit ResearcherRegistered(msg.sender);
    }

    function registerAsEmergencyResponder() external {
        require(!emergencyResponders[msg.sender], "Already registered as emergency responder");
        emergencyResponders[msg.sender] = true;
        emit EmergencyResponderRegistered(msg.sender);
    }

    // Medical records management
    function addMedicalRecord(
        string memory _ipfsHash,
        string memory _fileType,
        uint256 _fileSize,
        string memory _description
    ) external onlyPatient {
        MedicalRecord memory newRecord = MedicalRecord({
            ipfsHash: _ipfsHash,
            fileType: _fileType,
            fileSize: _fileSize,
            description: _description,
            timestamp: block.timestamp,
            uploadedBy: msg.sender
        });

        patientRecords[msg.sender].push(newRecord);
        uint256 recordId = patientRecords[msg.sender].length - 1;
        
        emit MedicalRecordAdded(msg.sender, recordId, _ipfsHash);
    }

    function getMyRecords() external view onlyPatient returns (MedicalRecord[] memory) {
        return patientRecords[msg.sender];
    }

    function getPatientRecords(address _patient) external view returns (MedicalRecord[] memory) {
        require(
            hasAccess(_patient, msg.sender) || 
            emergencyResponders[msg.sender],
            "No access to patient records"
        );
        return patientRecords[_patient];
    }

    // Access request system
    function requestAccess(
        address _patient,
        string memory _purpose,
        uint256 _duration,
        uint8 _accessLevel
    ) external onlyDoctor {
        require(patients[_patient], "Patient not registered");
        require(_accessLevel <= 1, "Invalid access level");

        AccessRequest memory newRequest = AccessRequest({
            patient: _patient,
            requester: msg.sender,
            purpose: _purpose,
            duration: _duration,
            accessLevel: _accessLevel,
            timestamp: block.timestamp,
            approved: false,
            rejected: false
        });

        uint256 requestId = accessRequests.length;
        accessRequests.push(newRequest);
        patientAccessRequests[_patient].push(requestId);
        requesterAccessRequests[msg.sender].push(requestId);

        emit AccessRequested(_patient, msg.sender, requestId, _purpose);
    }

    function approveAccess(uint256 _requestId) external onlyPatient {
        AccessRequest storage request = accessRequests[_requestId];
        require(request.patient == msg.sender, "Not the patient");
        require(!request.approved && !request.rejected, "Request already processed");

        request.approved = true;
        accessGrants[msg.sender][request.requester] = block.timestamp + request.duration;
        accessLevels[msg.sender][request.requester] = request.accessLevel;

        emit AccessApproved(msg.sender, request.requester, _requestId);
    }

    function rejectAccess(uint256 _requestId) external onlyPatient {
        AccessRequest storage request = accessRequests[_requestId];
        require(request.patient == msg.sender, "Not the patient");
        require(!request.approved && !request.rejected, "Request already processed");

        request.rejected = true;
        emit AccessRejected(msg.sender, request.requester, _requestId);
    }

    function getMyAccessRequests() external view returns (AccessRequest[] memory) {
        uint256[] memory requestIds = requesterAccessRequests[msg.sender];
        AccessRequest[] memory requests = new AccessRequest[](requestIds.length);
        
        for (uint256 i = 0; i < requestIds.length; i++) {
            requests[i] = accessRequests[requestIds[i]];
        }
        
        return requests;
    }

    function getPatientAccessRequests() external view onlyPatient returns (AccessRequest[] memory) {
        uint256[] memory requestIds = patientAccessRequests[msg.sender];
        AccessRequest[] memory requests = new AccessRequest[](requestIds.length);
        
        for (uint256 i = 0; i < requestIds.length; i++) {
            requests[i] = accessRequests[requestIds[i]];
        }
        
        return requests;
    }

    // Direct consent management
    function grantConsent(
        address _grantee,
        uint256 _duration,
        uint8 _accessLevel
    ) external onlyPatient {
        require(doctors[_grantee] || researchers[_grantee], "Grantee must be registered professional");
        require(_accessLevel <= 1, "Invalid access level");

        accessGrants[msg.sender][_grantee] = block.timestamp + _duration;
        accessLevels[msg.sender][_grantee] = _accessLevel;

        emit ConsentGranted(msg.sender, _grantee, _duration, _accessLevel);
    }

    function revokeConsent(address _grantee) external onlyPatient {
        accessGrants[msg.sender][_grantee] = 0;
        accessLevels[msg.sender][_grantee] = 0;

        emit ConsentRevoked(msg.sender, _grantee);
    }

    // Helper functions
    function hasAccess(address _patient, address _requester) public view returns (bool) {
        return accessGrants[_patient][_requester] > block.timestamp;
    }

    function getAccessLevel(address _patient, address _requester) external view returns (uint8) {
        require(hasAccess(_patient, _requester), "No access granted");
        return accessLevels[_patient][_requester];
    }

    function getRole(address _user) external view returns (string memory) {
        if (patients[_user]) return "patient";
        if (doctors[_user]) return "doctor";
        if (researchers[_user]) return "researcher";
        if (emergencyResponders[_user]) return "emergency";
        return "none";
    }
}