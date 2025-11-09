
import { useState, useEffect } from "react";
import {
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon,
  KeyIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import ContractService from "../config/contractService";
import { useWallet } from "../context/WalletContext";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, wallet }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blockchainStatus, setBlockchainStatus] = useState({});
  const [error, setError] = useState(null);
  const { walletAddress } = useWallet();

  useEffect(() => {
    if (walletAddress) {
      fetchDashboardData();
      checkBlockchainStatus();
      setupEventListeners();
    }
    
    return () => {
      try {
        ContractService.removeAllListeners?.();
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, [user, walletAddress]);

  const clearError = () => setError(null);

  const handleContractError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    
    let userMessage = "An unexpected error occurred";
    
    if (error.message?.includes("MetaMask not installed")) {
      userMessage = "Please install MetaMask to use this application";
    } else if (error.message?.includes("User denied transaction")) {
      userMessage = "Transaction was cancelled";
    } else if (error.message?.includes("insufficient funds")) {
      userMessage = "Insufficient funds for transaction";
    } else if (error.message?.includes("network changed")) {
      userMessage = "Network changed, please refresh the page";
    } else if (error.message?.includes("Not a registered")) {
      userMessage = "Your account is not registered for this role on blockchain";
    } else {
      userMessage = error.message || "Blockchain operation failed";
    }
    
    setError({ message: userMessage, context });
    setTimeout(clearError, 8000);
  };

  const checkBlockchainStatus = async () => {
    if (!walletAddress) return;
    
    try {
      clearError();
      await ContractService.init();

      const roles = ContractService.ROLES;
      
      // Check each role
      const roleChecks = await Promise.allSettled([
        ContractService.hasRole(roles.PATIENT, walletAddress),
        ContractService.hasRole(roles.DOCTOR, walletAddress),
        ContractService.hasRole(roles.RESEARCHER, walletAddress),
        ContractService.hasRole(roles.EMERGENCY, walletAddress),
      ]);

      const [hasPatientRole, hasDoctorRole, hasResearcherRole, hasEmergencyRole] = roleChecks.map(
        result => result.status === 'fulfilled' ? result.value : false
      );

      setBlockchainStatus({
        hasPatientRole,
        hasDoctorRole,
        hasResearcherRole,
        hasEmergencyRole,
        roleMatch:
          (user.role === "patient" && hasPatientRole) ||
          (user.role === "doctor" && hasDoctorRole) ||
          (user.role === "researcher" && hasResearcherRole) ||
          (user.role === "emergency" && hasEmergencyRole),
      });
    } catch (error) {
      handleContractError(error, "checking blockchain status");
    }
  };

  const setupEventListeners = async () => {
    if (!walletAddress) return;
    
    try {
      clearError();
      await ContractService.init();

      // Listen for record additions
      try {
        ContractService.onRecordAdded((patient, recordId, ipfsHash) => {
          if (patient.toLowerCase() === walletAddress.toLowerCase()) {
            fetchDashboardData();
          }
        });
      } catch (eventError) {
        console.log("RecordAdded event not available");
      }

      // Listen for access requests
      try {
        ContractService.onAccessRequested((patient, requester, requestId, purpose) => {
          if (patient.toLowerCase() === walletAddress.toLowerCase()) {
            fetchDashboardData();
          }
        });
      } catch (eventError) {
        console.log("AccessRequested event not available");
      }

      try {
        ContractService.onAccessApproved((patient, requester, requestId) => {
          if (patient.toLowerCase() === walletAddress.toLowerCase() || 
              requester.toLowerCase() === walletAddress.toLowerCase()) {
            fetchDashboardData();
          }
        });
      } catch (eventError) {
        console.log("AccessApproved event not available");
      }

      // Listen for consent changes
      try {
        ContractService.onConsentGranted((patient, grantee, duration, accessLevel) => {
          if (patient.toLowerCase() === walletAddress.toLowerCase() || 
              grantee.toLowerCase() === walletAddress.toLowerCase()) {
            fetchDashboardData();
          }
        });
      } catch (eventError) {
        console.log("ConsentGranted event not available");
      }

    } catch (error) {
      handleContractError(error, "setting up event listeners");
    }
  };

  const fetchDashboardData = async () => {
    if (!walletAddress) return;
    
    try {
      setLoading(true);
      clearError();
      await ContractService.init();

      let statsData = {};
      let activityData = [];
      let requestsData = [];
      let recordsData = [];

      switch (user.role) {
        case "patient":
          try {
            // Get patient's records
            recordsData = await ContractService.getMyRecords();
            statsData.records = recordsData?.length || 0;
            
            // Get access requests for this patient
            let requests = await ContractService.getPatientAccessRequests();
            
            const pending = requests?.filter(req => 
              !req.approved && !req.rejected
            ) || [];
            const approved = requests?.filter(req => req.approved) || [];

            statsData.pendingRequests = pending.length;
            statsData.accessGrants = approved.length;

            // Convert to dashboard format
            requestsData = pending.slice(0, 3).map((req, index) => ({
              id: req.requestId?.toString() || index + 1,
              requester: `Doctor ${index + 1}`,
              purpose: req.purpose || "Medical treatment",
              date: new Date(Number(req.timestamp) * 1000).toLocaleDateString(),
              requestId: req.requestId,
              requesterAddress: req.requester
            }));

            // Generate recent activity from records and requests
            activityData = [
              ...recordsData.slice(0, 2).map((record, index) => ({
                id: `record-${index}`,
                type: "upload",
                description: `Uploaded: ${record.description}`,
                time: formatTimeAgo(new Date(Number(record.timestamp) * 1000)),
                timestamp: Number(record.timestamp) * 1000
              })),
              ...pending.slice(0, 2).map((req, index) => ({
                id: `request-${index}`,
                type: "request",
                description: `Access request from doctor`,
                time: formatTimeAgo(Number(req.timestamp) * 1000),
                timestamp: Number(req.timestamp) * 1000
              }))
            ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);

          } catch (error) {
            console.error("Error fetching patient data:", error);
            statsData = { records: 0, pendingRequests: 0, accessGrants: 0 };
            activityData = getDefaultActivity(user.role);
          }
          break;

        case "doctor":
          try {
            let requests = await ContractService.getMyAccessRequests();
            
            statsData.accessRequests = requests?.length || 0;
            statsData.approvedAccess = requests?.filter(req => req.approved)?.length || 0;
            
            // Get unique patients from approved requests
            const approvedPatients = new Set(
              requests?.filter(req => req.approved).map(req => req.patient)
            );
            statsData.patients = approvedPatients.size || 0;

            // Get records count for accessed patients
            let totalRecords = 0;
            for (let patient of approvedPatients) {
              try {
                const patientRecords = await ContractService.getPatientRecords(patient);
                totalRecords += patientRecords.length;
              } catch (e) {
                console.log(`Could not fetch records for patient ${patient}`);
              }
            }
            statsData.recordsAccessed = totalRecords;

            activityData = [
              {
                id: 1,
                type: "access",
                description: `Accessed ${statsData.recordsAccessed} patient records`,
                time: "Today",
                timestamp: Date.now()
              },
              ...requests.slice(0, 2).map((req, index) => ({
                id: index + 2,
                type: "request",
                description: `Requested access to patient records`,
                time: formatTimeAgo(Number(req.timestamp) * 1000),
                timestamp: Number(req.timestamp) * 1000
              }))
            ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);

          } catch (error) {
            console.error("Error fetching doctor data:", error);
            statsData = { patients: 0, accessRequests: 0, approvedAccess: 0, recordsAccessed: 0 };
            activityData = getDefaultActivity(user.role);
          }
          break;

        case "emergency":
          try {
            // For emergency role - basic stats
            statsData.emergencyAccess = 0; // Would need contract function for this
            statsData.patientsAccessed = 0;
            statsData.responseTime = "0 min";

            activityData = [
              {
                id: 1,
                type: "emergency",
                description: "Emergency access dashboard ready",
                time: "Just now",
                timestamp: Date.now()
              },
              {
                id: 2,
                type: "access",
                description: "No emergency accesses yet",
                time: "Today",
                timestamp: Date.now() - 3600000
              },
            ];
          } catch (error) {
            console.error("Error fetching emergency data:", error);
            statsData = { emergencyAccess: 0, patientsAccessed: 0, responseTime: "0 min" };
            activityData = getDefaultActivity(user.role);
          }
          break;

        case "researcher":
          try {
            // For researcher role - basic stats
            const isResearcher = await ContractService.hasRole(ContractService.ROLES.RESEARCHER, walletAddress);
            statsData.approvedStudies = isResearcher ? 1 : 0;
            statsData.datasets = isResearcher ? 3 : 0;
            statsData.researchRequests = isResearcher ? 5 : 0;

            activityData = [
              {
                id: 1,
                type: "download",
                description: isResearcher ? "Accessed research dataset" : "Research access pending",
                time: "2 days ago",
                timestamp: Date.now() - 172800000
              },
              {
                id: 2,
                type: "request",
                description: "Submitted new research proposal",
                time: "4 days ago",
                timestamp: Date.now() - 345600000
              },
            ];
          } catch (error) {
            console.error("Error fetching researcher data:", error);
            statsData = { approvedStudies: 0, datasets: 0, researchRequests: 0 };
            activityData = getDefaultActivity(user.role);
          }
          break;

        default:
          break;
      }

      setStats(statsData);
      setRecentActivity(activityData);
      setPendingRequests(requestsData);
      setMedicalRecords(recordsData || []);
    } catch (error) {
      handleContractError(error, "fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getDefaultActivity = (role) => {
    const baseActivities = {
      patient: [
        { id: 1, type: "upload", description: "Welcome to your medical dashboard", time: "Just now", timestamp: Date.now() },
        { id: 2, type: "access", description: "Set up your profile", time: "Just now", timestamp: Date.now() },
      ],
      doctor: [
        { id: 1, type: "info", description: "Welcome to doctor dashboard", time: "Just now", timestamp: Date.now() },
        { id: 2, type: "access", description: "Set up your profile", time: "Just now", timestamp: Date.now() },
      ],
      researcher: [
        { id: 1, type: "info", description: "Welcome to research dashboard", time: "Just now", timestamp: Date.now() },
        { id: 2, type: "access", description: "Set up your profile", time: "Just now", timestamp: Date.now() },
      ],
      emergency: [
        { id: 1, type: "info", description: "Welcome to emergency dashboard", time: "Just now", timestamp: Date.now() },
        { id: 2, type: "access", description: "Set up your profile", time: "Just now", timestamp: Date.now() },
      ]
    };
    return baseActivities[role] || baseActivities.patient;
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return "Just now";
  };

  // Navigation handlers
  const handleUploadRecord = async () => {
    navigate('/upload');
  };

  const handleGiveAccess = async () => {
    navigate('/grant');
  };

  const handleRequestAccess = async () => {
    navigate('/access');
  };

  const handleViewRecords = async () => {
    if (user.role === "patient") {
      navigate('/my-record');
    } else {
      navigate('/my-access-record');
    }
  };

  const handleEmergencyAccess = async () => {
    navigate('/emergency-access');
  };

  const handleRequestResearchData = async () => {
    navigate('/research-request');
  };

  const handleApproveRequest = async (request) => {
    try {
      setLoading(true);
      clearError();
      await ContractService.approveAccess(request.requestId);
      await fetchDashboardData();
    } catch (error) {
      handleContractError(error, "approving access request");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (request) => {
    try {
      setLoading(true);
      clearError();
      await ContractService.rejectAccess(request.requestId);
      await fetchDashboardData();
    } catch (error) {
      handleContractError(error, "rejecting access request");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRole = async () => {
    try {
      setLoading(true);
      clearError();
      let tx;
      
      switch(user.role) {
        case "patient":
          tx = await ContractService.registerAsPatient();
          break;
        case "doctor":
          tx = await ContractService.registerAsDoctor();
          break;
        case "researcher":
          tx = await ContractService.registerAsResearcher();
          break;
        case "emergency":
          tx = await ContractService.registerAsEmergencyResponder();
          break;
        default:
          throw new Error("Unknown role");
      }
      
      await tx.wait();
      await checkBlockchainStatus();
      await fetchDashboardData();
    } catch (error) {
      handleContractError(error, "registering role");
    } finally {
      setLoading(false);
    }
  };

  // Dashboard rendering functions
  const renderPatientDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.records || 0}</p>
            <p className="text-gray-600">Medical Records</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <UserGroupIcon className="h-8 w-8 text-green-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.accessGrants || 0}</p>
            <p className="text-gray-600">Access Grants</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.pendingRequests || 0}</p>
            <p className="text-gray-600">Pending Requests</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.patients || 0}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.accessRequests || 0}</p>
            <p className="text-gray-600">Access Requests</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.recordsAccessed || 0}</p>
            <p className="text-gray-600">Records Accessed</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergencyDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.emergencyAccess || 0}</p>
            <p className="text-gray-600">Emergency Accesses</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.patientsAccessed || 0}</p>
            <p className="text-gray-600">Patients Accessed</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.responseTime || "0 min"}</p>
            <p className="text-gray-600">Avg. Response Time</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResearcherDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <BeakerIcon className="h-8 w-8 text-purple-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.datasets || 0}</p>
            <p className="text-gray-600">Datasets</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.researchRequests || 0}</p>
            <p className="text-gray-600">Research Requests</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.approvedStudies || 0}</p>
            <p className="text-gray-600">Approved Studies</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoleSpecificDashboard = () => {
    switch (user.role) {
      case "patient":
        return renderPatientDashboard();
      case "doctor":
        return renderDoctorDashboard();
      case "emergency":
        return renderEmergencyDashboard();
      case "researcher":
        return renderResearcherDashboard();
      default:
        return null;
    }
  };

  if (loading && Object.keys(stats).length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            <div>
              <p className="text-red-800 font-medium">{error.message}</p>
              <p className="text-red-600 text-sm">Context: {error.context}</p>
            </div>
          </div>
          <button
            onClick={clearError}
            className="text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {user.name}
            </h1>
            <p className="text-gray-600 mt-2">
              {user.role === "patient" &&
                "Manage your medical records and control who can access them."}
              {user.role === "doctor" &&
                "Access patient records and provide better care with complete medical histories."}
              {user.role === "emergency" &&
                "Respond to emergencies with quick access to critical patient information."}
              {user.role === "researcher" &&
                "Access anonymized data for medical research and advancements."}
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <ArrowPathIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {walletAddress && (
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                <KeyIcon className="h-4 w-4 inline mr-1" />
                Wallet: {walletAddress.substring(0, 8)}...
                {walletAddress.substring(walletAddress.length - 6)}
              </p>
            </div>

            {blockchainStatus.roleMatch !== undefined && (
              <div
                className={`p-3 rounded-lg ${
                  blockchainStatus.roleMatch ? "bg-green-50" : "bg-yellow-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    blockchainStatus.roleMatch
                      ? "text-green-700"
                      : "text-yellow-700"
                  }`}
                >
                  <ShieldCheckIcon className="h-4 w-4 inline mr-1" />
                  {blockchainStatus.roleMatch
                    ? "Role verified on blockchain"
                    : "Role not verified on blockchain"}
                </p>
                {!blockchainStatus.roleMatch && (
                  <button
                    onClick={handleRegisterRole}
                    disabled={loading}
                    className="text-xs mt-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200 disabled:opacity-50"
                  >
                    Register Role
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Role-specific stats */}
      {renderRoleSpecificDashboard()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ClockIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recent activity</p>
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        activity.type === "upload"
                          ? "bg-indigo-500"
                          : activity.type === "access"
                          ? "bg-green-500"
                          : activity.type === "request"
                          ? "bg-yellow-500"
                          : activity.type === "emergency"
                          ? "bg-red-500"
                          : activity.type === "download"
                          ? "bg-purple-500"
                          : activity.type === "info"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Requests (for patients) or Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {user.role === "patient" && pendingRequests.length == -1 ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Pending Access Requests
              </h2>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {request.requester}
                    </p>
                    <p className="text-xs text-gray-600">{request.purpose}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Requested on: {request.date}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleApproveRequest(request)}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 disabled:opacity-50"
                        disabled={loading}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request)}
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 disabled:opacity-50"
                        disabled={loading}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : user.role === "patient"  ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleUploadRecord}
                  className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center disabled:opacity-50"
                  disabled={loading}
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Upload Medical Records
                </button>
                <button
                  onClick={handleGiveAccess}
                  className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center disabled:opacity-50"
                  disabled={loading}
                >
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  Manage Access Permissions
                </button>
                <button
                  onClick={handleViewRecords}
                  className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center disabled:opacity-50"
                  disabled={loading}
                >
                  <EyeIcon className="h-5 w-5 mr-2" />
                  View My Records
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {user.role === "doctor" && (
                  <>
                    <button
                      onClick={handleRequestAccess}
                      className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center disabled:opacity-50"
                      disabled={loading}
                    >
                      <DocumentTextIcon className="h-5 w-5 mr-2" />
                      Request Patient Access
                    </button>
                    <button
                      onClick={handleViewRecords}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center disabled:opacity-50"
                      disabled={loading}
                    >
                      <EyeIcon className="h-5 w-5 mr-2" />
                      View Accessed Records
                    </button>
                  </>
                )}
                {user.role === "emergency" && (
                  <>
                    <button
                      onClick={handleEmergencyAccess}
                      className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center disabled:opacity-50"
                      disabled={loading}
                    >
                      <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                      Emergency Access Request
                    </button>
                  </>
                )}
                {user.role === "researcher" && (
                  <>
                    <button
                      onClick={handleRequestResearchData}
                      className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors flex items-center disabled:opacity-50"
                      disabled={loading}
                    >
                      <BeakerIcon className="h-5 w-5 mr-2" />
                      Request Research Data
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;