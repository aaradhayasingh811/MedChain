// import { useState, useEffect } from "react";
// import {
//   UserGroupIcon,
//   DocumentTextIcon,
//   ShieldCheckIcon,
//   ClockIcon,
//   BeakerIcon,
//   ExclamationTriangleIcon
// } from "@heroicons/react/24/outline";

// const Dashboard = ({ user, wallet }) => {
//   const [stats, setStats] = useState({});
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);

//   useEffect(() => {
//     // Fetch dashboard data based on user role
//     fetchDashboardData();
//   }, [user]);

//   const fetchDashboardData = async () => {
//     try {
//       // Simulate API calls based on user role
//       let statsData = {};
//       let activityData = [];
//       let requestsData = [];

//       switch(user.role) {
//         case "patient":
//           statsData = {
//             records: 12,
//             accessGrants: 3,
//             pendingRequests: 2
//           };
//           activityData = [
//             { id: 1, type: "upload", description: "Uploaded lab results", time: "2 hours ago" },
//             { id: 2, type: "access", description: "Granted access to Dr. Smith", time: "1 day ago" },
//             { id: 3, type: "request", description: "Received access request from City Hospital", time: "2 days ago" }
//           ];
//           requestsData = [
//             { id: 1, requester: "City Hospital", purpose: "Routine checkup", date: "2023-05-15" },
//             { id: 2, requester: "Research Institute", purpose: "Medical study", date: "2023-05-10" }
//           ];
//           break;
//         case "doctor":
//           statsData = {
//             patients: 24,
//             accessRequests: 5,
//             approvedAccess: 18
//           };
//           activityData = [
//             { id: 1, type: "access", description: "Viewed patient records", time: "3 hours ago" },
//             { id: 2, type: "request", description: "Requested access to new patient", time: "1 day ago" },
//             { id: 3, type: "update", description: "Updated treatment plan", time: "2 days ago" }
//           ];
//           break;
//         case "emergency":
//           statsData = {
//             emergencyAccess: 3,
//             patientsAccessed: 5,
//             responseTime: "4.2 min"
//           };
//           activityData = [
//             { id: 1, type: "emergency", description: "Emergency access granted for patient #123", time: "1 hour ago" },
//             { id: 2, type: "access", description: "Viewed critical patient information", time: "3 hours ago" },
//             { id: 3, type: "request", description: "Requested multi-sig approval", time: "5 hours ago" }
//           ];
//           break;
//         case "researcher":
//           statsData = {
//             datasets: 8,
//             researchRequests: 12,
//             approvedStudies: 5
//           };
//           activityData = [
//             { id: 1, type: "download", description: "Downloaded diabetes dataset", time: "2 days ago" },
//             { id: 2, type: "request", description: "Submitted new research proposal", time: "4 days ago" },
//             { id: 3, type: "analysis", description: "Completed preliminary analysis", time: "1 week ago" }
//           ];
//           break;
//         default:
//           break;
//       }

//       setStats(statsData);
//       setRecentActivity(activityData);
//       setPendingRequests(requestsData);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     }
//   };

//   const renderPatientDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.records || 0}</p>
//             <p className="text-gray-600">Medical Records</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.accessGrants || 0}</p>
//             <p className="text-gray-600">Access Grants</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.pendingRequests || 0}</p>
//             <p className="text-gray-600">Pending Requests</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDoctorDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.patients || 0}</p>
//             <p className="text-gray-600">Patients</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.accessRequests || 0}</p>
//             <p className="text-gray-600">Access Requests</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.approvedAccess || 0}</p>
//             <p className="text-gray-600">Approved Access</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderEmergencyDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.emergencyAccess || 0}</p>
//             <p className="text-gray-600">Emergency Accesses</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.patientsAccessed || 0}</p>
//             <p className="text-gray-600">Patients Accessed</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.responseTime || "0 min"}</p>
//             <p className="text-gray-600">Avg. Response Time</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderResearcherDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <BeakerIcon className="h-8 w-8 text-purple-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.datasets || 0}</p>
//             <p className="text-gray-600">Datasets</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.researchRequests || 0}</p>
//             <p className="text-gray-600">Research Requests</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.approvedStudies || 0}</p>
//             <p className="text-gray-600">Approved Studies</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderRoleSpecificDashboard = () => {
//     switch(user.role) {
//       case "patient":
//         return renderPatientDashboard();
//       case "doctor":
//         return renderDoctorDashboard();
//       case "emergency":
//         return renderEmergencyDashboard();
//       case "researcher":
//         return renderResearcherDashboard();
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Welcome back, {user.name}
//         </h1>
//         <p className="text-gray-600 mt-2">
//           {user.role === "patient" && "Manage your medical records and control who can access them."}
//           {user.role === "doctor" && "Access patient records and provide better care with complete medical histories."}
//           {user.role === "emergency" && "Respond to emergencies with quick access to critical patient information."}
//           {user.role === "researcher" && "Access anonymized data for medical research and advancements."}
//         </p>

//         {wallet && (
//           <div className="mt-4 p-3 bg-indigo-50 rounded-lg inline-block">
//             <p className="text-sm text-indigo-700">
//               Connected Wallet: {wallet.substring(0, 8)}...{wallet.substring(wallet.length - 6)}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Role-specific stats */}
//       {renderRoleSpecificDashboard()}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
//           <div className="space-y-4">
//             {recentActivity.map(activity => (
//               <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
//                 <div className="flex-shrink-0 mt-1">
//                   <div className={`h-3 w-3 rounded-full ${
//                     activity.type === "upload" ? "bg-indigo-500" :
//                     activity.type === "access" ? "bg-green-500" :
//                     activity.type === "request" ? "bg-yellow-500" :
//                     activity.type === "emergency" ? "bg-red-500" :
//                     activity.type === "download" ? "bg-purple-500" : "bg-blue-500"
//                   }`}></div>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-800">{activity.description}</p>
//                   <p className="text-xs text-gray-500">{activity.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pending Requests (for patients) or Quick Actions */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           {user.role === "patient" && pendingRequests.length > 0 ? (
//             <>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Access Requests</h2>
//               <div className="space-y-4">
//                 {pendingRequests.map(request => (
//                   <div key={request.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
//                     <p className="text-sm font-medium text-gray-800">{request.requester}</p>
//                     <p className="text-xs text-gray-600">{request.purpose}</p>
//                     <p className="text-xs text-gray-500 mt-1">Requested on: {request.date}</p>
//                     <div className="flex space-x-2 mt-2">
//                       <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">
//                         Approve
//                       </button>
//                       <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200">
//                         Deny
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
//               <div className="space-y-3">
//                 {user.role === "patient" && (
//                   <>
//                     <button className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
//                       Upload Medical Records
//                     </button>
//                     <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
//                       Manage Access Permissions
//                     </button>
//                   </>
//                 )}
//                 {user.role === "doctor" && (
//                   <>
//                     <button className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
//                       Request Patient Access
//                     </button>
//                     <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
//                       View Accessed Records
//                     </button>
//                   </>
//                 )}
//                 {user.role === "emergency" && (
//                   <>
//                     <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
//                       Emergency Access Request
//                     </button>
//                     <button className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
//                       View Access History
//                     </button>
//                   </>
//                 )}
//                 {user.role === "researcher" && (
//                   <>
//                     <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
//                       Request Research Data
//                     </button>
//                     <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
//                       View Approved Studies
//                     </button>
//                   </>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useState, useEffect } from "react";
// import {
//   UserGroupIcon,
//   DocumentTextIcon,
//   ShieldCheckIcon,
//   ClockIcon,
//   BeakerIcon,
//   ExclamationTriangleIcon,
//   PlusIcon,
//   EyeIcon,
//   KeyIcon,
// } from "@heroicons/react/24/outline";
// import ContractService from "../config/contractService";
// import { useWallet } from "../context/WalletContext";
// import { useNavigate } from "react-router-dom";

// const Dashboard = ({ user, wallet }) => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({});
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [blockchainStatus, setBlockchainStatus] = useState({});
//   const { walletAddress  } = useWallet();
//   console.log("Wallet Addres", walletAddress );

//   useEffect(() => {
//     // Fetch dashboard data based on user role
//     fetchDashboardData();
//     checkBlockchainStatus();
//   }, [user, walletAddress])

//   console.log("wallat", walletAddress);
//   const checkBlockchainStatus = async () => {
//     try {
//       await ContractService.init();

//       // Check if user has the correct role on blockchain
//       const roles = ContractService.ROLES;
//       console.log(roles, "roles")
//       const hasPatientRole = await ContractService.hasRole(
//         roles.PATIENT,
//         walletAddress
//       );
//       const hasDoctorRole = await ContractService.hasRole(
//         roles.DOCTOR,
//         walletAddress
//       );
//       const hasResearcherRole = await ContractService.hasRole(
//         roles.RESEARCHER,
//         walletAddress
//       );
//       const hasEmergencyRole = await ContractService.hasRole(
//         roles.EMERGENCY,
//         walletAddress
//       );
//       console.log(hasPatientRole,
//         hasDoctorRole,
//         hasResearcherRole,
//         hasEmergencyRole,"hii")

//       setBlockchainStatus({
//         hasPatientRole,
//         hasDoctorRole,
//         hasResearcherRole,
//         hasEmergencyRole,
//         roleMatch:
//           (user.role === "patient" && hasPatientRole) ||
//           (user.role === "doctor" && hasDoctorRole) ||
//           (user.role === "researcher" && hasResearcherRole) ||
//           (user.role === "emergency" && hasEmergencyRole),
//       });
//     } catch (error) {
//       console.error("Error checking blockchain status:", error);
//     }
//   };

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       // Initialize contract service
//       await ContractService.init();

//       let statsData = {};
//       let activityData = [];
//       let requestsData = [];
//       let recordsData = [];

//       // Fetch real data from blockchain based on user role
//       switch (user.role) {
//         case "patient":
//           // Get patient's medical records from blockchain
//           try {
//             recordsData = await ContractService.getMyRecords();
//             statsData.records = recordsData.length;
//           } catch (error) {
//             console.error("Error fetching medical records:", error);
//             statsData.records = 0;
//           }

//           // Get access requests (you'll need to implement this function)
//           try {
//             const requests = await ContractService.getMyAccessRequests();
//             statsData.pendingRequests = requests.filter(
//               (req) => !req.approved && !req.rejected
//             ).length;
//             statsData.accessGrants = requests.filter(
//               (req) => req.approved
//             ).length;

//             // Convert to dashboard format
//             requestsData = requests.slice(0, 3).map((req, index) => ({
//               id: index + 1,
//               requester: req.requesterName || `Requester ${index + 1}`,
//               purpose: req.purpose,
//               date: new Date(req.timestamp * 1000).toLocaleDateString(),
//             }));
//           } catch (error) {
//             console.error("Error fetching access requests:", error);
//             statsData.pendingRequests = 0;
//             statsData.accessGrants = 0;
//           }

//           activityData = [
//             {
//               id: 1,
//               type: "upload",
//               description: "Uploaded lab results",
//               time: "2 hours ago",
//             },
//             {
//               id: 2,
//               type: "access",
//               description: "Granted access to Dr. Smith",
//               time: "1 day ago",
//             },
//             {
//               id: 3,
//               type: "request",
//               description: "Received access request from City Hospital",
//               time: "2 days ago",
//             },
//           ];
//           break;

//         case "doctor":
//           // Get doctor's access statistics
//           try {
//             const requests = await ContractService.getMyAccessRequests();
//             statsData.accessRequests = requests.length;
//             statsData.approvedAccess = requests.filter(
//               (req) => req.approved
//             ).length;
//             statsData.patients = statsData.approvedAccess; // Simplified
//           } catch (error) {
//             console.error("Error fetching doctor data:", error);
//             statsData.accessRequests = 0;
//             statsData.approvedAccess = 0;
//             statsData.patients = 0;
//           }

//           activityData = [
//             {
//               id: 1,
//               type: "access",
//               description: "Viewed patient records",
//               time: "3 hours ago",
//             },
//             {
//               id: 2,
//               type: "request",
//               description: "Requested access to new patient",
//               time: "1 day ago",
//             },
//             {
//               id: 3,
//               type: "update",
//               description: "Updated treatment plan",
//               time: "2 days ago",
//             },
//           ];
//           break;

//         case "emergency":
//           // Emergency responder stats
//           statsData.emergencyAccess = 3;
//           statsData.patientsAccessed = 5;
//           statsData.responseTime = "4.2 min";

//           activityData = [
//             {
//               id: 1,
//               type: "emergency",
//               description: "Emergency access granted for patient #123",
//               time: "1 hour ago",
//             },
//             {
//               id: 2,
//               type: "access",
//               description: "Viewed critical patient information",
//               time: "3 hours ago",
//             },
//             {
//               id: 3,
//               type: "request",
//               description: "Requested multi-sig approval",
//               time: "5 hours ago",
//             },
//           ];
//           break;

//         case "researcher":
//           // Researcher stats
//           try {
//             const hasAccess = await ContractService.hasResearchAccess(
//               walletAddress
//             );
//             statsData.approvedStudies = hasAccess ? 1 : 0;
//             statsData.datasets = hasAccess ? 8 : 0;
//             statsData.researchRequests = 12;
//           } catch (error) {
//             console.error("Error fetching researcher data:", error);
//             statsData.approvedStudies = 0;
//             statsData.datasets = 0;
//             statsData.researchRequests = 0;
//           }

//           activityData = [
//             {
//               id: 1,
//               type: "download",
//               description: "Downloaded diabetes dataset",
//               time: "2 days ago",
//             },
//             {
//               id: 2,
//               type: "request",
//               description: "Submitted new research proposal",
//               time: "4 days ago",
//             },
//             {
//               id: 3,
//               type: "analysis",
//               description: "Completed preliminary analysis",
//               time: "1 week ago",
//             },
//           ];
//           break;

//         default:
//           break;
//       }

//       setStats(statsData);
//       setRecentActivity(activityData);
//       setPendingRequests(requestsData);
//       setMedicalRecords(recordsData);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Blockchain interaction functions
//   const handleUploadRecord = async () => {
//     navigate('/upload')
//   };

//   const handleGiveAccess = async()=>{
//     navigate('/grant')
//   }

//   const handleRequestAccess = async () => {
//     navigate('/access')
//   };

//   const handleGrantConsent = async (requesterAddress) => {
//     try {
//       setLoading(true);
//       await ContractService.grantConsent(requesterAddress, 86400, 1); // 1 day, basic access
//       await fetchDashboardData(); // Refresh data
//       alert("Access granted successfully!");
//     } catch (error) {
//       console.error("Error granting consent:", error);
//       alert("Error granting access. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRevokeConsent = async (granteeAddress) => {
//     try {
//       setLoading(true);
//       await ContractService.revokeConsent(granteeAddress);
//       await fetchDashboardData(); // Refresh data
//       alert("Access revoked successfully!");
//     } catch (error) {
//       console.error("Error revoking consent:", error);
//       alert("Error revoking access. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproveRequest = async (requestId) => {
//     try {
//       setLoading(true);
//       await ContractService.approveAccess(requestId);
//       await fetchDashboardData(); // Refresh data
//       alert("Request approved successfully!");
//     } catch (error) {
//       console.error("Error approving request:", error);
//       alert("Error approving request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRejectRequest = async (requestId) => {
//     try {
//       setLoading(true);
//       await ContractService.rejectAccess(requestId);
//       await fetchDashboardData(); // Refresh data
//       alert("Request rejected successfully!");
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//       alert("Error rejecting request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderPatientDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.records || 0}</p>
//             <p className="text-gray-600">Medical Records</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.accessGrants || 0}</p>
//             <p className="text-gray-600">Access Grants</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.pendingRequests || 0}</p>
//             <p className="text-gray-600">Pending Requests</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDoctorDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.patients || 0}</p>
//             <p className="text-gray-600">Patients</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.accessRequests || 0}</p>
//             <p className="text-gray-600">Access Requests</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.approvedAccess || 0}</p>
//             <p className="text-gray-600">Approved Access</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderEmergencyDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.emergencyAccess || 0}</p>
//             <p className="text-gray-600">Emergency Accesses</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.patientsAccessed || 0}</p>
//             <p className="text-gray-600">Patients Accessed</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">
//               {stats.responseTime || "0 min"}
//             </p>
//             <p className="text-gray-600">Avg. Response Time</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderResearcherDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <BeakerIcon className="h-8 w-8 text-purple-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.datasets || 0}</p>
//             <p className="text-gray-600">Datasets</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.researchRequests || 0}</p>
//             <p className="text-gray-600">Research Requests</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.approvedStudies || 0}</p>
//             <p className="text-gray-600">Approved Studies</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderRoleSpecificDashboard = () => {
//     switch (user.role) {
//       case "patient":
//         return renderPatientDashboard();
//       case "doctor":
//         return renderDoctorDashboard();
//       case "emergency":
//         return renderEmergencyDashboard();
//       case "researcher":
//         return renderResearcherDashboard();
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Welcome back, {user.name}
//         </h1>
//         <p className="text-gray-600 mt-2">
//           {user.role === "patient" &&
//             "Manage your medical records and control who can access them."}
//           {user.role === "doctor" &&
//             "Access patient records and provide better care with complete medical histories."}
//           {user.role === "emergency" &&
//             "Respond to emergencies with quick access to critical patient information."}
//           {user.role === "researcher" &&
//             "Access anonymized data for medical research and advancements."}
//         </p>

//         {walletAddress && (
//           <div className="mt-4 flex flex-wrap gap-4">
//             <div className="p-3 bg-indigo-50 rounded-lg">
//               <p className="text-sm text-indigo-700">
//                 <KeyIcon className="h-4 w-4 inline mr-1" />
//                 Wallet: {walletAddress.substring(0, 8)}...
//                 {walletAddress.substring(walletAddress.length - 6)}
//               </p>
//             </div>

//             {blockchainStatus.roleMatch !== undefined && (
//               <div
//                 className={`p-3 rounded-lg ${
//                   blockchainStatus.roleMatch ? "bg-green-50" : "bg-yellow-50"
//                 }`}
//               >
//                 <p
//                   className={`text-sm ${
//                     blockchainStatus.roleMatch
//                       ? "text-green-700"
//                       : "text-yellow-700"
//                   }`}
//                 >
//                   <ShieldCheckIcon className="h-4 w-4 inline mr-1" />
//                   {blockchainStatus.roleMatch
//                     ? "Role verified on blockchain"
//                     : "Role not verified on blockchain"}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Role-specific stats */}
//       {renderRoleSpecificDashboard()}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Recent Activity
//           </h2>
//           <div className="space-y-4">
//             {recentActivity.map((activity) => (
//               <div
//                 key={activity.id}
//                 className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0"
//               >
//                 <div className="flex-shrink-0 mt-1">
//                   <div
//                     className={`h-3 w-3 rounded-full ${
//                       activity.type === "upload"
//                         ? "bg-indigo-500"
//                         : activity.type === "access"
//                         ? "bg-green-500"
//                         : activity.type === "request"
//                         ? "bg-yellow-500"
//                         : activity.type === "emergency"
//                         ? "bg-red-500"
//                         : activity.type === "download"
//                         ? "bg-purple-500"
//                         : "bg-blue-500"
//                     }`}
//                   ></div>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-800">
//                     {activity.description}
//                   </p>
//                   <p className="text-xs text-gray-500">{activity.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pending Requests (for patients) or Quick Actions */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           {user.role === "patient" && pendingRequests.length > 0 ? (
//             <>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Pending Access Requests
//               </h2>
//               <div className="space-y-4">
//                 {pendingRequests.map((request) => (
//                   <div
//                     key={request.id}
//                     className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
//                   >
//                     <p className="text-sm font-medium text-gray-800">
//                       {request.requester}
//                     </p>
//                     <p className="text-xs text-gray-600">{request.purpose}</p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Requested on: {request.date}
//                     </p>
//                     <div className="flex space-x-2 mt-2">
//                       <button
//                         onClick={() => handleApproveRequest(request.id)}
//                         className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
//                         disabled={loading}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleRejectRequest(request.id)}
//                         className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
//                         disabled={loading}
//                       >
//                         Deny
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Quick Actions
//               </h2>
//               <div className="space-y-3">
//                 {user.role === "patient" && (
//                   <>
//                     <button
//                       onClick={handleUploadRecord}
//                       className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center"
//                       disabled={loading}
//                     >
//                       <PlusIcon className="h-5 w-5 mr-2" />
//                       Upload Medical Records
//                     </button>
//                     <button
//                       onClick={handleGiveAccess}
//                       className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center"
//                       disabled={loading}
//                     >
//                       <ShieldCheckIcon className="h-5 w-5 mr-2" />
//                       Manage Access Permissions
//                     </button>
//                   </>
//                 )}
//                 {user.role === "doctor" && (
//                   <>
//                     <button
//                       onClick={handleRequestAccess}
//                       className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center"
//                       disabled={loading}
//                     >
//                       <DocumentTextIcon className="h-5 w-5 mr-2" />
//                       Request Patient Access
//                     </button>
//                     <button
//                       onClick={() => console.log("View records")}
//                       className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
//                       disabled={loading}
//                     >
//                       <EyeIcon className="h-5 w-5 mr-2" />
//                       View Accessed Records
//                     </button>
//                   </>
//                 )}
//                 {user.role === "emergency" && (
//                   <>
//                     <button
//                       onClick={() => console.log("Emergency access")}
//                       className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center"
//                       disabled={loading}
//                     >
//                       <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
//                       Emergency Access Request
//                     </button>
//                     <button
//                       onClick={() => console.log("Access history")}
//                       className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors flex items-center"
//                       disabled={loading}
//                     >
//                       <ClockIcon className="h-5 w-5 mr-2" />
//                       View Access History
//                     </button>
//                   </>
//                 )}
//                 {user.role === "researcher" && (
//                   <>
//                     <button
//                       onClick={() => console.log("Request data")}
//                       className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors flex items-center"
//                       disabled={loading}
//                     >
//                       <BeakerIcon className="h-5 w-5 mr-2" />
//                       Request Research Data
//                     </button>
//                     <button
//                       onClick={() => console.log("View studies")}
//                       className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center"
//                       disabled={loading}
//                     >
//                       <ShieldCheckIcon className="h-5 w-5 mr-2" />
//                       View Approved Studies
//                     </button>
//                   </>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import { useState, useEffect } from "react";
// import {
//   UserGroupIcon,
//   DocumentTextIcon,
//   ShieldCheckIcon,
//   ClockIcon,
//   BeakerIcon,
//   ExclamationTriangleIcon,
//   PlusIcon,
//   EyeIcon,
//   KeyIcon,
//   ArrowPathIcon,
// } from "@heroicons/react/24/outline";
// import ContractService from "../config/contractService";
// import { useWallet } from "../context/WalletContext";
// import { useNavigate } from "react-router-dom";

// const Dashboard = ({ user, wallet }) => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({});
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [blockchainStatus, setBlockchainStatus] = useState({});
//   const { walletAddress } = useWallet();

//   useEffect(() => {
//     fetchDashboardData();
//     checkBlockchainStatus();
//     setupEventListeners();
    
//     return () => {
//       // Cleanup listeners on unmount
//       ContractService.removeAllListeners?.();
//     };
//   }, [user, walletAddress]);

//   const checkBlockchainStatus = async () => {
//     try {
//       await ContractService.init();

//       const roles = ContractService.ROLES;
//       const hasPatientRole = await ContractService.hasRole(
//         roles.PATIENT,
//         walletAddress
//       );
//       const hasDoctorRole = await ContractService.hasRole(
//         roles.DOCTOR,
//         walletAddress
//       );
//       const hasResearcherRole = await ContractService.hasRole(
//         roles.RESEARCHER,
//         walletAddress
//       );
//       const hasEmergencyRole = await ContractService.hasRole(
//         roles.EMERGENCY,
//         walletAddress
//       );

//       setBlockchainStatus({
//         hasPatientRole,
//         hasDoctorRole,
//         hasResearcherRole,
//         hasEmergencyRole,
//         roleMatch:
//           (user.role === "patient" && hasPatientRole) ||
//           (user.role === "doctor" && hasDoctorRole) ||
//           (user.role === "researcher" && hasResearcherRole) ||
//           (user.role === "emergency" && hasEmergencyRole),
//       });
//     } catch (error) {
//       console.error("Error checking blockchain status:", error);
//     }
//   };

//   const setupEventListeners = async () => {
//     try {
//       await ContractService.init();
      
//       // Listen for new access requests (patients)
//       ContractService.contracts.medicalRecords.on("AccessRequested", (patient, requester, requestId) => {
//         if (patient.toLowerCase() === walletAddress.toLowerCase()) {
//           fetchDashboardData(); // Refresh when new request comes in
//         }
//       });

//       // Listen for consent changes
//       ContractService.contracts.medicalRecords.on("ConsentGranted", (patient, grantee) => {
//         if (patient.toLowerCase() === walletAddress.toLowerCase() || 
//             grantee.toLowerCase() === walletAddress.toLowerCase()) {
//           fetchDashboardData();
//         }
//       });

//     } catch (error) {
//       console.error("Error setting up event listeners:", error);
//     }
//   };

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       await ContractService.init();

//       let statsData = {};
//       let activityData = [];
//       let requestsData = [];
//       let recordsData = [];

//       switch (user.role) {
//         case "patient":
//           try {
//             recordsData = await ContractService.getMyRecords();
//             statsData.records = recordsData?.length || 0;
            
//             // Get access requests - using the correct function name from your contract
//             const requests = await ContractService.getMyAccessRequests();
//             const pending = requests?.filter(req => 
//               !req.approved && !req.rejected
//             ) || [];
//             const approved = requests?.filter(req => req.approved) || [];

//             statsData.pendingRequests = pending.length;
//             statsData.accessGrants = approved.length;

//             // Convert to dashboard format
//             requestsData = pending.slice(0, 3).map((req, index) => ({
//               id: req.requestId?.toString() || index + 1,
//               requester: req.requesterName || `Doctor ${index + 1}`,
//               purpose: req.purpose || "Medical treatment",
//               date: new Date((req.timestamp || Date.now() / 1000) * 1000).toLocaleDateString(),
//               requestId: req.requestId,
//               requesterAddress: req.requester
//             }));

//             // Generate recent activity from records and requests
//             activityData = [
//               {
//                 id: 1,
//                 type: "upload",
//                 description: `Uploaded ${recordsData?.length || 0} medical records`,
//                 time: "Just now",
//                 timestamp: Date.now()
//               },
//               ...requests.map((req, index) => ({
//                 id: index + 2,
//                 type: "request",
//                 description: `Access request from ${req.requesterName || 'Unknown'}`,
//                 time: formatTimeAgo((req.timestamp || 0) * 1000),
//                 timestamp: (req.timestamp || 0) * 1000
//               }))
//             ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);

//           } catch (error) {
//             console.error("Error fetching patient data:", error);
//             statsData = { records: 0, pendingRequests: 0, accessGrants: 0 };
//             activityData = getDefaultActivity(user.role);
//           }
//           break;

//         case "doctor":
//           try {
//             const requests = await ContractService.getMyAccessRequests();
//             statsData.accessRequests = requests?.length || 0;
//             statsData.approvedAccess = requests?.filter(req => req.approved)?.length || 0;
//             statsData.patients = new Set(requests?.filter(req => req.approved).map(req => req.patient))?.size || 0;

//             activityData = [
//               {
//                 id: 1,
//                 type: "access",
//                 description: `Accessed ${statsData.approvedAccess} patient records`,
//                 time: "Today",
//               },
//               {
//                 id: 2,
//                 type: "request",
//                 description: "Submitted new access request",
//                 time: "1 day ago",
//               },
//               {
//                 id: 3,
//                 type: "update",
//                 description: "Updated patient treatment plans",
//                 time: "2 days ago",
//               }
//             ];
//           } catch (error) {
//             console.error("Error fetching doctor data:", error);
//             statsData = { patients: 0, accessRequests: 0, approvedAccess: 0 };
//             activityData = getDefaultActivity(user.role);
//           }
//           break;

//         case "emergency":
//           statsData.emergencyAccess = 3;
//           statsData.patientsAccessed = 5;
//           statsData.responseTime = "4.2 min";

//           activityData = [
//             {
//               id: 1,
//               type: "emergency",
//               description: "Emergency access granted for patient #123",
//               time: "1 hour ago",
//             },
//             {
//               id: 2,
//               type: "access",
//               description: "Viewed critical patient information",
//               time: "3 hours ago",
//             },
//             {
//               id: 3,
//               type: "request",
//               description: "Requested multi-sig approval",
//               time: "5 hours ago",
//             },
//           ];
//           break;

//         case "researcher":
//           try {
//             const hasAccess = await ContractService.hasResearchAccess(walletAddress);
//             statsData.approvedStudies = hasAccess ? 1 : 0;
//             statsData.datasets = hasAccess ? 8 : 0;
//             statsData.researchRequests = 12;

//             activityData = [
//               {
//                 id: 1,
//                 type: "download",
//                 description: "Downloaded diabetes dataset",
//                 time: "2 days ago",
//               },
//               {
//                 id: 2,
//                 type: "request",
//                 description: "Submitted new research proposal",
//                 time: "4 days ago",
//               },
//               {
//                 id: 3,
//                 type: "analysis",
//                 description: "Completed preliminary analysis",
//                 time: "1 week ago",
//               }
//             ];
//           } catch (error) {
//             console.error("Error fetching researcher data:", error);
//             statsData = { approvedStudies: 0, datasets: 0, researchRequests: 0 };
//             activityData = getDefaultActivity(user.role);
//           }
//           break;

//         default:
//           break;
//       }

//       setStats(statsData);
//       setRecentActivity(activityData);
//       setPendingRequests(requestsData);
//       setMedicalRecords(recordsData || []);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDefaultActivity = (role) => {
//     const baseActivities = {
//       patient: [
//         { id: 1, type: "upload", description: "Welcome to your medical dashboard", time: "Just now" },
//         { id: 2, type: "access", description: "Set up your profile", time: "Just now" },
//         { id: 3, type: "info", description: "Ready to manage your health records", time: "Just now" }
//       ],
//       doctor: [
//         { id: 1, type: "info", description: "Welcome to doctor dashboard", time: "Just now" },
//         { id: 2, type: "access", description: "Set up your profile", time: "Just now" },
//         { id: 3, type: "info", description: "Ready to access patient records", time: "Just now" }
//       ],
//       researcher: [
//         { id: 1, type: "info", description: "Welcome to research dashboard", time: "Just now" },
//         { id: 2, type: "access", description: "Set up your profile", time: "Just now" },
//         { id: 3, type: "info", description: "Ready to request research data", time: "Just now" }
//       ],
//       emergency: [
//         { id: 1, type: "info", description: "Welcome to emergency dashboard", time: "Just now" },
//         { id: 2, type: "access", description: "Set up your profile", time: "Just now" },
//         { id: 3, type: "info", description: "Ready for emergency access", time: "Just now" }
//       ]
//     };
//     return baseActivities[role] || baseActivities.patient;
//   };

//   const formatTimeAgo = (timestamp) => {
//     const now = Date.now();
//     const diff = now - timestamp;
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);

//     if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
//     if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//     if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     return "Just now";
//   };

//   // Blockchain interaction functions
//   const handleUploadRecord = async () => {
//     navigate('/upload');
//   };

//   const handleGiveAccess = async () => {
//     navigate('/grant');
//   };

//   const handleRequestAccess = async () => {
//     navigate('/access');
//   };

//   const handleViewRecords = async () => {
//     navigate('/records');
//   };

//   const handleEmergencyAccess = async () => {
//     navigate('/emergency-access');
//   };

//   const handleRequestResearchData = async () => {
//     navigate('/research-request');
//   };

//   const handleViewStudies = async () => {
//     navigate('/studies');
//   };

//   const handleViewAccessHistory = async () => {
//     navigate('/access-history');
//   };

//   const handleApproveRequest = async (request) => {
//     try {
//       setLoading(true);
//       await ContractService.approveAccess(request.requestId || request.id);
//       await fetchDashboardData();
//       alert("Request approved successfully!");
//     } catch (error) {
//       console.error("Error approving request:", error);
//       alert("Error approving request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRejectRequest = async (request) => {
//     try {
//       setLoading(true);
//       await ContractService.rejectAccess(request.requestId || request.id);
//       await fetchDashboardData();
//       alert("Request rejected successfully!");
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//       alert("Error rejecting request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegisterRole = async () => {
//     try {
//       setLoading(true);
//       let tx;
      
//       switch(user.role) {
//         case "patient":
//           tx = await ContractService.registerAsPatient();
//           break;
//         case "doctor":
//           tx = await ContractService.registerAsDoctor();
//           break;
//         case "researcher":
//           tx = await ContractService.registerAsResearcher();
//           break;
//         case "emergency":
//           tx = await ContractService.registerAsEmergencyResponder();
//           break;
//         default:
//           throw new Error("Unknown role");
//       }
      
//       await tx.wait();
//       await checkBlockchainStatus();
//       alert("Role registered successfully on blockchain!");
//     } catch (error) {
//       console.error("Error registering role:", error);
//       alert("Error registering role. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderPatientDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.records || 0}</p>
//             <p className="text-gray-600">Medical Records</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.accessGrants || 0}</p>
//             <p className="text-gray-600">Access Grants</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.pendingRequests || 0}</p>
//             <p className="text-gray-600">Pending Requests</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDoctorDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.patients || 0}</p>
//             <p className="text-gray-600">Patients</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.accessRequests || 0}</p>
//             <p className="text-gray-600">Access Requests</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.approvedAccess || 0}</p>
//             <p className="text-gray-600">Approved Access</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderEmergencyDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.emergencyAccess || 0}</p>
//             <p className="text-gray-600">Emergency Accesses</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.patientsAccessed || 0}</p>
//             <p className="text-gray-600">Patients Accessed</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.responseTime || "0 min"}</p>
//             <p className="text-gray-600">Avg. Response Time</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderResearcherDashboard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <BeakerIcon className="h-8 w-8 text-purple-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.datasets || 0}</p>
//             <p className="text-gray-600">Datasets</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.researchRequests || 0}</p>
//             <p className="text-gray-600">Research Requests</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center">
//           <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
//           <div>
//             <p className="text-2xl font-bold">{stats.approvedStudies || 0}</p>
//             <p className="text-gray-600">Approved Studies</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderRoleSpecificDashboard = () => {
//     switch (user.role) {
//       case "patient":
//         return renderPatientDashboard();
//       case "doctor":
//         return renderDoctorDashboard();
//       case "emergency":
//         return renderEmergencyDashboard();
//       case "researcher":
//         return renderResearcherDashboard();
//       default:
//         return null;
//     }
//   };

//   if (loading && Object.keys(stats).length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <div className="flex justify-between items-start">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Welcome back, {user.name}
//             </h1>
//             <p className="text-gray-600 mt-2">
//               {user.role === "patient" &&
//                 "Manage your medical records and control who can access them."}
//               {user.role === "doctor" &&
//                 "Access patient records and provide better care with complete medical histories."}
//               {user.role === "emergency" &&
//                 "Respond to emergencies with quick access to critical patient information."}
//               {user.role === "researcher" &&
//                 "Access anonymized data for medical research and advancements."}
//             </p>
//           </div>
//           <button
//             onClick={fetchDashboardData}
//             disabled={loading}
//             className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//           >
//             <ArrowPathIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//             Refresh
//           </button>
//         </div>

//         {walletAddress && (
//           <div className="mt-4 flex flex-wrap gap-4">
//             <div className="p-3 bg-indigo-50 rounded-lg">
//               <p className="text-sm text-indigo-700">
//                 <KeyIcon className="h-4 w-4 inline mr-1" />
//                 Wallet: {walletAddress.substring(0, 8)}...
//                 {walletAddress.substring(walletAddress.length - 6)}
//               </p>
//             </div>

//             {blockchainStatus.roleMatch !== undefined && (
//               <div
//                 className={`p-3 rounded-lg ${
//                   blockchainStatus.roleMatch ? "bg-green-50" : "bg-yellow-50"
//                 }`}
//               >
//                 <p
//                   className={`text-sm ${
//                     blockchainStatus.roleMatch
//                       ? "text-green-700"
//                       : "text-yellow-700"
//                   }`}
//                 >
//                   <ShieldCheckIcon className="h-4 w-4 inline mr-1" />
//                   {blockchainStatus.roleMatch
//                     ? "Role verified on blockchain"
//                     : "Role not verified on blockchain"}
//                 </p>
//                 {!blockchainStatus.roleMatch && (
//                   <button
//                     onClick={handleRegisterRole}
//                     disabled={loading}
//                     className="text-xs mt-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200 disabled:opacity-50"
//                   >
//                     Register Role
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Role-specific stats */}
//       {renderRoleSpecificDashboard()}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Recent Activity
//           </h2>
//           <div className="space-y-4">
//             {recentActivity.length === 0 ? (
//               <div className="text-center py-8 text-gray-500">
//                 <ClockIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                 <p>No recent activity</p>
//               </div>
//             ) : (
//               recentActivity.map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0"
//                 >
//                   <div className="flex-shrink-0 mt-1">
//                     <div
//                       className={`h-3 w-3 rounded-full ${
//                         activity.type === "upload"
//                           ? "bg-indigo-500"
//                           : activity.type === "access"
//                           ? "bg-green-500"
//                           : activity.type === "request"
//                           ? "bg-yellow-500"
//                           : activity.type === "emergency"
//                           ? "bg-red-500"
//                           : activity.type === "download"
//                           ? "bg-purple-500"
//                           : activity.type === "info"
//                           ? "bg-blue-500"
//                           : "bg-gray-500"
//                       }`}
//                     ></div>
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm font-medium text-gray-800">
//                       {activity.description}
//                     </p>
//                     <p className="text-xs text-gray-500">{activity.time}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Pending Requests (for patients) or Quick Actions */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           {user.role === "patient" && pendingRequests.length > 0 ? (
//             <>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Pending Access Requests
//               </h2>
//               <div className="space-y-4">
//                 {pendingRequests.map((request) => (
//                   <div
//                     key={request.id}
//                     className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
//                   >
//                     <p className="text-sm font-medium text-gray-800">
//                       {request.requester}
//                     </p>
//                     <p className="text-xs text-gray-600">{request.purpose}</p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Requested on: {request.date}
//                     </p>
//                     <div className="flex space-x-2 mt-2">
//                       <button
//                         onClick={() => handleApproveRequest(request)}
//                         className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 disabled:opacity-50"
//                         disabled={loading}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleRejectRequest(request)}
//                         className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 disabled:opacity-50"
//                         disabled={loading}
//                       >
//                         Deny
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : user.role === "patient" && pendingRequests.length === 0 ? (
//             <>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Quick Actions
//               </h2>
//               <div className="space-y-3">
//                 <button
//                   onClick={handleUploadRecord}
//                   className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center disabled:opacity-50"
//                   disabled={loading}
//                 >
//                   <PlusIcon className="h-5 w-5 mr-2" />
//                   Upload Medical Records
//                 </button>
//                 <button
//                   onClick={handleGiveAccess}
//                   className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center disabled:opacity-50"
//                   disabled={loading}
//                 >
//                   <ShieldCheckIcon className="h-5 w-5 mr-2" />
//                   Manage Access Permissions
//                 </button>
//                 <button
//                   onClick={handleViewRecords}
//                   className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center disabled:opacity-50"
//                   disabled={loading}
//                 >
//                   <EyeIcon className="h-5 w-5 mr-2" />
//                   View My Records
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Quick Actions
//               </h2>
//               <div className="space-y-3">
//                 {user.role === "doctor" && (
//                   <>
//                     <button
//                       onClick={handleRequestAccess}
//                       className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       <DocumentTextIcon className="h-5 w-5 mr-2" />
//                       Request Patient Access
//                     </button>
//                     <button
//                       onClick={handleViewRecords}
//                       className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       <EyeIcon className="h-5 w-5 mr-2" />
//                       View Accessed Records
//                     </button>
//                   </>
//                 )}
//                 {user.role === "emergency" && (
//                   <>
//                     <button
//                       onClick={handleEmergencyAccess}
//                       className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
//                       Emergency Access Request
//                     </button>
//                     <button
//                       onClick={handleViewAccessHistory}
//                       className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors flex items-center disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       <ClockIcon className="h-5 w-5 mr-2" />
//                       View Access History
//                     </button>
//                   </>
//                 )}
//                 {user.role === "researcher" && (
//                   <>
//                     <button
//                       onClick={handleRequestResearchData}
//                       className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors flex items-center disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       <BeakerIcon className="h-5 w-5 mr-2" />
//                       Request Research Data
//                     </button>
//                     <button
//                       onClick={handleViewStudies}
//                       className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       <ShieldCheckIcon className="h-5 w-5 mr-2" />
//                       View Approved Studies
//                     </button>
//                   </>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

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
      // Safe cleanup
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
    } else if (error.message?.includes("Account is not a registered")) {
      userMessage = "Your account is not registered for this role on blockchain";
    } else if (error.message?.includes("revert")) {
      userMessage = "Transaction failed - you may not have permission for this action";
    } else if (error.message?.includes("Blockchain call failed")) {
      userMessage = "Blockchain operation failed - check console for details";
    } else if (error.message?.includes("unconfigured name") || error.message?.includes("Invalid address")) {
      userMessage = "Invalid address provided - please check your wallet connection";
    } else if (error.message?.includes("unknown fragment")) {
      userMessage = "Contract event not found - this feature may not be available";
    } else if (error.code === "NETWORK_ERROR") {
      userMessage = "Network connection error - please check your internet";
    } else if (error.message?.includes("is not a function")) {
      userMessage = "Contract function not available - check contract ABI";
    }
    
    setError({ message: userMessage, context });
    
    // Auto-clear error after 8 seconds
    setTimeout(clearError, 8000);
  };

  const checkBlockchainStatus = async () => {
    if (!walletAddress) return;
    
    try {
      clearError();
      await ContractService.init();

      const roles = ContractService.ROLES;
      
      // Check each role with error handling
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

      // Only set up listeners for events that actually exist in your contracts
      // Use safe event listening with error handling
      
      // Listen for record additions (if event exists)
      try {
        ContractService.onRecordAdded((patient, recordId) => {
          if (patient.toLowerCase() === walletAddress.toLowerCase()) {
            fetchDashboardData();
          }
        });
      } catch (eventError) {
        console.log("RecordAdded event not available");
      }

      // Listen for consent changes (if events exist)
      try {
        ContractService.onConsentGranted((patient, grantee) => {
          if (patient.toLowerCase() === walletAddress.toLowerCase() || 
              grantee.toLowerCase() === walletAddress.toLowerCase()) {
            fetchDashboardData();
          }
        });
      } catch (eventError) {
        console.log("ConsentGranted event not available");
      }

      try {
        ContractService.onConsentRevoked((patient, grantee) => {
          if (patient.toLowerCase() === walletAddress.toLowerCase() || 
              grantee.toLowerCase() === walletAddress.toLowerCase()) {
            fetchDashboardData();
          }
        });
      } catch (eventError) {
        console.log("ConsentRevoked event not available");
      }

      // Listen for access requests (if events exist)
      try {
        ContractService.onAccessRequested((patient, requester, requestId) => {
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
            recordsData = await ContractService.getMyRecords();
            statsData.records = recordsData?.length || 0;
            
            // Get access requests - handle both contract possibilities
            let requests = [];
            try {
              requests = await ContractService.getMyAccessRequests();
            } catch (reqError) {
              console.log("getMyAccessRequests failed, using empty array");
              requests = [];
            }
            
            const pending = requests?.filter(req => 
              !req.approved && !req.rejected
            ) || [];
            const approved = requests?.filter(req => req.approved) || [];

            statsData.pendingRequests = pending.length;
            statsData.accessGrants = approved.length;

            // Convert to dashboard format
            requestsData = pending.slice(0, 3).map((req, index) => ({
              id: req.requestId?.toString() || index + 1,
              requester: req.requesterName || `Doctor ${index + 1}`,
              purpose: req.purpose || "Medical treatment",
              date: new Date((req.timestamp || Date.now() / 1000) * 1000).toLocaleDateString(),
              requestId: req.requestId,
              requesterAddress: req.requester
            }));

            // Generate recent activity from records and requests
            activityData = [
              {
                id: 1,
                type: "upload",
                description: `Uploaded ${recordsData?.length || 0} medical records`,
                time: "Just now",
                timestamp: Date.now()
              },
              ...requests.map((req, index) => ({
                id: index + 2,
                type: "request",
                description: `Access request from ${req.requesterName || 'Unknown'}`,
                time: formatTimeAgo((req.timestamp || 0) * 1000),
                timestamp: (req.timestamp || 0) * 1000
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
            let requests = [];
            try {
              requests = await ContractService.getMyAccessRequests();
            } catch (reqError) {
              console.log("getMyAccessRequests failed for doctor, using empty array");
              requests = [];
            }
            
            statsData.accessRequests = requests?.length || 0;
            statsData.approvedAccess = requests?.filter(req => req.approved)?.length || 0;
            statsData.patients = new Set(requests?.filter(req => req.approved).map(req => req.patient))?.size || 0;

            activityData = [
              {
                id: 1,
                type: "access",
                description: `Accessed ${statsData.approvedAccess} patient records`,
                time: "Today",
              },
              {
                id: 2,
                type: "request",
                description: "Submitted new access request",
                time: "1 day ago",
              },
              {
                id: 3,
                type: "update",
                description: "Updated patient treatment plans",
                time: "2 days ago",
              }
            ];
          } catch (error) {
            console.error("Error fetching doctor data:", error);
            statsData = { patients: 0, accessRequests: 0, approvedAccess: 0 };
            activityData = getDefaultActivity(user.role);
          }
          break;

        case "emergency":
          try {
            // For emergency role, we might not have specific contract calls
            // Using placeholder data for now
            statsData.emergencyAccess = 0;
            statsData.patientsAccessed = 0;
            statsData.responseTime = "0 min";

            activityData = [
              {
                id: 1,
                type: "emergency",
                description: "Emergency access dashboard ready",
                time: "Just now",
              },
              {
                id: 2,
                type: "access",
                description: "No emergency accesses yet",
                time: "Today",
              },
              {
                id: 3,
                type: "info",
                description: "Ready for emergency situations",
                time: "Today",
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
            let hasAccess = false;
            try {
              hasAccess = await ContractService.hasResearchAccess(walletAddress);
            } catch (accessError) {
              console.log("hasResearchAccess failed, defaulting to false");
              hasAccess = false;
            }
            
            statsData.approvedStudies = hasAccess ? 1 : 0;
            statsData.datasets = hasAccess ? 8 : 0;
            statsData.researchRequests = hasAccess ? 12 : 0;

            activityData = [
              {
                id: 1,
                type: "download",
                description: hasAccess ? "Downloaded diabetes dataset" : "Research access pending",
                time: "2 days ago",
              },
              {
                id: 2,
                type: "request",
                description: "Submitted new research proposal",
                time: "4 days ago",
              },
              {
                id: 3,
                type: "analysis",
                description: "Completed preliminary analysis",
                time: "1 week ago",
              }
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
        { id: 1, type: "upload", description: "Welcome to your medical dashboard", time: "Just now" },
        { id: 2, type: "access", description: "Set up your profile", time: "Just now" },
        { id: 3, type: "info", description: "Ready to manage your health records", time: "Just now" }
      ],
      doctor: [
        { id: 1, type: "info", description: "Welcome to doctor dashboard", time: "Just now" },
        { id: 2, type: "access", description: "Set up your profile", time: "Just now" },
        { id: 3, type: "info", description: "Ready to access patient records", time: "Just now" }
      ],
      researcher: [
        { id: 1, type: "info", description: "Welcome to research dashboard", time: "Just now" },
        { id: 2, type: "access", description: "Set up your profile", time: "Just now" },
        { id: 3, type: "info", description: "Ready to request research data", time: "Just now" }
      ],
      emergency: [
        { id: 1, type: "info", description: "Welcome to emergency dashboard", time: "Just now" },
        { id: 2, type: "access", description: "Set up your profile", time: "Just now" },
        { id: 3, type: "info", description: "Ready for emergency access", time: "Just now" }
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
    navigate('/my-access-record');
  };

  const handleEmergencyAccess = async () => {
    navigate('/emergency-access');
  };

  const handleRequestResearchData = async () => {
    navigate('/research-request');
  };

  const handleViewStudies = async () => {
    navigate('/studies');
  };

  const handleViewAccessHistory = async () => {
    navigate('/access-history');
  };

  const handleApproveRequest = async (request) => {
    try {
      setLoading(true);
      clearError();
      await ContractService.approveAccess(request.requestId || request.id);
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
      await ContractService.rejectAccess(request.requestId || request.id);
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
            <p className="text-2xl font-bold">{stats.approvedAccess || 0}</p>
            <p className="text-gray-600">Approved Access</p>
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
          {user.role === "patient" && pendingRequests.length > 0 ? (
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
          ) : user.role === "patient" && pendingRequests.length === 0 ? (
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
                    <button
                      onClick={handleViewAccessHistory}
                      className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors flex items-center disabled:opacity-50"
                      disabled={loading}
                    >
                      <ClockIcon className="h-5 w-5 mr-2" />
                      View Access History
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
                    <button
                      onClick={handleViewStudies}
                      className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center disabled:opacity-50"
                      disabled={loading}
                    >
                      <ShieldCheckIcon className="h-5 w-5 mr-2" />
                      View Approved Studies
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

export default Dashboard;88888888888