// // import { useState } from "react";
// // import { CheckCircleIcon, XCircleIcon, ClockIcon, ClipboardDocumentIcon, EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

// // const GrantConsent = () => {
// //   const [doctorAddress, setDoctorAddress] = useState("");
// //   const [accessLevel, setAccessLevel] = useState("view");
// //   const [duration, setDuration] = useState("7");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isSuccess, setIsSuccess] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [pendingRequests, setPendingRequests] = useState([
// //     {
// //       id: 1,
// //       doctor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
// //       doctorName: "Dr. Sarah Johnson",
// //       purpose: "Routine checkup",
// //       requestedAt: "2023-05-15",
// //       duration: "7"
// //     },
// //     {
// //       id: 2,
// //       doctor: "0x53D285f6D1A9e6F8033e3b7Dd9a7D05F4c908BBF",
// //       doctorName: "Dr. Michael Chen",
// //       purpose: "Emergency treatment",
// //       requestedAt: "2023-05-10",
// //       duration: "30"
// //     }
// //   ]);

// //   const [grantedAccess, setGrantedAccess] = useState([
// //     {
// //       id: 1,
// //       doctor: "0x89d2A6bA5A6c7E0d4B8eF6F3c1D2a5B4c3D2e1F7",
// //       doctorName: "Dr. Emily Rodriguez",
// //       accessLevel: "view",
// //       grantedOn: "2023-05-01",
// //       expiresIn: "3 days"
// //     }
// //   ]);

// //   const validateAddress = (address) => {
// //     return /^0x[a-fA-F0-9]{40}$/.test(address);
// //   };

// //   const approveAccess = async () => {
// //     if (!doctorAddress) {
// //       setError("Please enter a doctor's address");
// //       return;
// //     }

// //     if (!validateAddress(doctorAddress)) {
// //       setError("Please enter a valid Ethereum address");
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError(null);
// //     setIsSuccess(false);

// //     try {
// //       // Simulate blockchain transaction (replace with actual contract call)
// //       await new Promise(resolve => setTimeout(resolve, 2000));
      
// //       // Your actual contract call would go here:
// //       // await contract.approveAccess(doctorAddress, accessLevel, duration);
      
// //       // Add to granted access list
// //       const newAccess = {
// //         id: Date.now(),
// //         doctor: doctorAddress,
// //         doctorName: "New Doctor", // In a real app, you'd fetch this from somewhere
// //         accessLevel,
// //         grantedOn: new Date().toISOString().split('T')[0],
// //         expiresIn: `${duration} days`
// //       };
      
// //       setGrantedAccess([...grantedAccess, newAccess]);
// //       setIsSuccess(true);
// //       setDoctorAddress("");
// //     } catch (err) {
// //       setError(err.message || "Failed to grant access");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const rejectRequest = (requestId) => {
// //     setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
// //   };

// //   const revokeAccess = (accessId) => {
// //     setGrantedAccess(grantedAccess.filter(access => access.id !== accessId));
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto p-4 md:p-6">
// //       <div className="mb-8 text-center">
// //         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Medical Records Access Control</h2>
// //         <p className="text-gray-600 max-w-2xl mx-auto">Manage consent for healthcare providers to access your medical records</p>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
// //         {/* Pending Requests Section */}
// //         <div className="bg-white rounded-xl shadow-md p-5 md:p-6">
// //           <h3 className="text-lg font-semibold mb-4 flex items-center text-amber-700">
// //             <ClockIcon className="h-5 w-5 text-amber-500 mr-2" />
// //             Pending Access Requests
// //             <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
// //               {pendingRequests.length}
// //             </span>
// //           </h3>
          
// //           {pendingRequests.length > 0 ? (
// //             <div className="space-y-4">
// //               {pendingRequests.map(request => (
// //                 <div key={request.id} className="border border-amber-100 bg-amber-50 rounded-lg p-4">
// //                   <div className="flex justify-between items-start">
// //                     <div className="flex-1 min-w-0">
// //                       <p className="font-medium text-gray-900 truncate">
// //                         {request.doctorName}
// //                       </p>
// //                       <p className="text-sm text-gray-500 mt-1 truncate">
// //                         {request.doctor}
// //                       </p>
// //                       <p className="text-sm text-gray-700 mt-2">
// //                         <span className="font-medium">Purpose:</span> {request.purpose}
// //                       </p>
// //                       <div className="flex flex-wrap gap-2 mt-2">
// //                         <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
// //                           Requested: {request.requestedAt}
// //                         </span>
// //                         <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
// //                           Duration: {request.duration} days
// //                         </span>
// //                       </div>
// //                     </div>
// //                     <div className="flex flex-col ml-4 space-y-2">
// //                       <button
// //                         onClick={() => {
// //                           setDoctorAddress(request.doctor);
// //                           setDuration(request.duration);
// //                           document.getElementById('grant-new-access')?.scrollIntoView({ behavior: 'smooth' });
// //                         }}
// //                         className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors"
// //                       >
// //                         Approve
// //                       </button>
// //                       <button
// //                         onClick={() => rejectRequest(request.id)}
// //                         className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors"
// //                       >
// //                         Reject
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
// //               <ClockIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
// //               <p>No pending access requests</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Grant New Access Section */}
// //         <div id="grant-new-access" className="bg-white rounded-xl shadow-md p-5 md:p-6">
// //           <h3 className="text-lg font-semibold mb-4 text-teal-800">Grant New Access</h3>
          
// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Doctor's Ethereum Address
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   placeholder="0x..."
// //                   value={doctorAddress}
// //                   onChange={(e) => setDoctorAddress(e.target.value)}
// //                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 />
// //                 {doctorAddress && (
// //                   <button
// //                     onClick={() => navigator.clipboard.writeText(doctorAddress)}
// //                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //                     title="Copy address"
// //                   >
// //                     <ClipboardDocumentIcon className="h-5 w-5 text-gray-400 hover:text-teal-600" />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Access Level
// //                 </label>
// //                 <div className="relative">
// //                   <select
// //                     value={accessLevel}
// //                     onChange={(e) => setAccessLevel(e.target.value)}
// //                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
// //                   >
// //                     <option value="view">View Only</option>
// //                     <option value="edit">View and Edit</option>
// //                   </select>
// //                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
// //                     {accessLevel === "view" ? (
// //                       <EyeIcon className="h-5 w-5 text-gray-400" />
// //                     ) : (
// //                       <PencilSquareIcon className="h-5 w-5 text-gray-400" />
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Duration
// //                 </label>
// //                 <select
// //                   value={duration}
// //                   onChange={(e) => setDuration(e.target.value)}
// //                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
// //                 >
// //                   <option value="1">1 Day</option>
// //                   <option value="3">3 Days</option>
// //                   <option value="7">7 Days</option>
// //                   <option value="14">14 Days</option>
// //                   <option value="30">30 Days</option>
// //                 </select>
// //               </div>
// //             </div>

// //             {error && (
// //               <div className="flex items-center p-3 text-sm text-red-700 bg-red-100 rounded-lg">
// //                 <XCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
// //                 <span>{error}</span>
// //               </div>
// //             )}

// //             {isSuccess && (
// //               <div className="flex items-center p-3 text-sm text-green-700 bg-green-100 rounded-lg">
// //                 <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
// //                 <span>Access granted successfully!</span>
// //               </div>
// //             )}

// //             <button
// //               onClick={approveAccess}
// //               disabled={isLoading || !doctorAddress}
// //               className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
// //                 isLoading 
// //                   ? "bg-teal-400 cursor-not-allowed" 
// //                   : !doctorAddress 
// //                     ? "bg-gray-400 cursor-not-allowed" 
// //                     : "bg-teal-600 hover:bg-teal-700"
// //               }`}
// //             >
// //               {isLoading ? (
// //                 <>
// //                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                   </svg>
// //                   Processing...
// //                 </>
// //               ) : (
// //                 "Grant Access"
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Current Access Section */}
// //       <div className="mt-8 bg-white rounded-xl shadow-md p-5 md:p-6">
// //         <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
// //           <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
// //           Currently Granted Access
// //           <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
// //             {grantedAccess.length}
// //           </span>
// //         </h3>
        
// //         {grantedAccess.length > 0 ? (
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-sm text-left text-gray-500">
// //               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
// //                 <tr>
// //                   <th scope="col" className="px-4 py-3">Doctor</th>
// //                   <th scope="col" className="px-4 py-3">Address</th>
// //                   <th scope="col" className="px-4 py-3">Access Level</th>
// //                   <th scope="col" className="px-4 py-3">Granted On</th>
// //                   <th scope="col" className="px-4 py-3">Expires In</th>
// //                   <th scope="col" className="px-4 py-3">Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {grantedAccess.map(access => (
// //                   <tr key={access.id} className="bg-white border-b hover:bg-gray-50">
// //                     <td className="px-4 py-3 font-medium text-gray-900">{access.doctorName}</td>
// //                     <td className="px-4 py-3 font-mono text-xs">{access.doctor}</td>
// //                     <td className="px-4 py-3">
// //                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${
// //                         access.accessLevel === "view" 
// //                           ? "bg-blue-100 text-blue-800" 
// //                           : "bg-purple-100 text-purple-800"
// //                       }`}>
// //                         {access.accessLevel === "view" ? "View Only" : "View and Edit"}
// //                       </span>
// //                     </td>
// //                     <td className="px-4 py-3">{access.grantedOn}</td>
// //                     <td className="px-4 py-3">{access.expiresIn}</td>
// //                     <td className="px-4 py-3">
// //                       <button 
// //                         onClick={() => revokeAccess(access.id)}
// //                         className="text-red-600 hover:text-red-800 text-sm font-medium"
// //                       >
// //                         Revoke
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         ) : (
// //           <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
// //             <CheckCircleIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
// //             <p>No currently active access grants</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default GrantConsent;

// import { useState, useEffect } from "react";
// import { 
//   CheckCircleIcon, 
//   XCircleIcon, 
//   ClockIcon, 
//   ClipboardDocumentIcon, 
//   EyeIcon, 
//   PencilSquareIcon,
//   ExclamationTriangleIcon
// } from "@heroicons/react/24/outline";
// import ContractService from "../config/contractService";
// import { useWallet } from "../context/WalletContext";

// const GrantConsent = () => {
//   const { walletAddress } = useWallet();
  
//   const [doctorAddress, setDoctorAddress] = useState("");
//   const [accessLevel, setAccessLevel] = useState("1"); // 1 for view, 2 for edit
//   const [duration, setDuration] = useState("604800"); // 7 days in seconds
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [grantedAccess, setGrantedAccess] = useState([]);
//   const [isInitialized, setIsInitialized] = useState(false);

//   // Duration options in seconds
//   const durationOptions = [
//     { label: "1 Day", value: "86400" },
//     { label: "3 Days", value: "259200" },
//     { label: "7 Days", value: "604800" },
//     { label: "14 Days", value: "1209600" },
//     { label: "30 Days", value: "2592000" }
//   ];

//   useEffect(() => {
//     initializeData();
//   }, [walletAddress]);

//   const initializeData = async () => {
//     try {
//       await ContractService.init();
//       setIsInitialized(true);
//       await loadPendingRequests();
//       await loadGrantedAccess();
//     } catch (error) {
//       console.error("Initialization failed:", error);
//       setError("Failed to initialize blockchain connection");
//     }
//   };

//   const loadPendingRequests = async () => {
//     try {
//       const requests = await ContractService.getMyAccessRequests();
//       console.log("Raw pending requests:", requests);
      
//       const formattedRequests = requests
//         .filter(req => !req.approved && !req.rejected)
//         .map((req, index) => ({
//           id: req.requestId?.toString() || `req-${index}`,
//           doctor: req.requester || "Unknown",
//           doctorName: `Doctor ${index + 1}`, // In real app, fetch from user profile
//           purpose: req.purpose || "Medical treatment",
//           requestedAt: new Date((req.timestamp || 0) * 1000).toISOString().split('T')[0],
//           duration: Math.floor((req.duration || 604800) / 86400), // Convert seconds to days
//           requestId: req.requestId,
//           accessLevel: req.accessLevel || "1"
//         }));
      
//       setPendingRequests(formattedRequests);
//     } catch (error) {
//       console.error("Error loading pending requests:", error);
//       setError("Failed to load pending requests");
//     }
//   };

//   const loadGrantedAccess = async () => {
//     try {
//       // This would need a function to get current consents from the contract
//       // For now, we'll use a placeholder
//       const currentConsents = [
//         {
//           id: 1,
//           doctor: "0x89d2A6bA5A6c7E0d4B8eF6F3c1D2a5B4c3D2e1F7",
//           doctorName: "Dr. Emily Rodriguez",
//           accessLevel: "1",
//           grantedOn: "2023-05-01",
//           expiresIn: "3 days"
//         }
//       ];
//       setGrantedAccess(currentConsents);
//     } catch (error) {
//       console.error("Error loading granted access:", error);
//       setError("Failed to load current access grants");
//     }
//   };

//   const validateAddress = (address) => {
//     return /^0x[a-fA-F0-9]{40}$/.test(address);
//   };

//   const grantConsent = async () => {
//     if (!doctorAddress) {
//       setError("Please enter a doctor's address");
//       return;
//     }

//     if (!validateAddress(doctorAddress)) {
//       setError("Please enter a valid Ethereum address");
//       return;
//     }

//     if (!isInitialized) {
//       setError("Blockchain connection not initialized");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setIsSuccess(false);

//     try {
//       // Convert duration to number and access level to number
//       const durationSeconds = parseInt(duration);
//       const accessLevelNum = parseInt(accessLevel);

//       console.log("Granting consent with:", {
//         doctorAddress,
//         duration: durationSeconds,
//         accessLevel: accessLevelNum
//       });

//       // Call the blockchain
//       const tx = await ContractService.grantConsent(doctorAddress, durationSeconds, accessLevelNum);
//       console.log("Transaction sent:", tx);
      
//       // Wait for confirmation
//       const receipt = await tx.wait();
//       console.log("Transaction confirmed:", receipt);

//       // Update local state
//       const newAccess = {
//         id: Date.now(),
//         doctor: doctorAddress,
//         doctorName: "New Doctor", // In real app, fetch from user profile
//         accessLevel: accessLevelNum === 1 ? "view" : "edit",
//         grantedOn: new Date().toISOString().split('T')[0],
//         expiresIn: `${parseInt(duration) / 86400} days`
//       };
      
//       setGrantedAccess(prev => [...prev, newAccess]);
//       setIsSuccess(true);
//       setDoctorAddress("");
      
//       // Clear success message after 5 seconds
//       setTimeout(() => setIsSuccess(false), 5000);
      
//     } catch (err) {
//       console.error("Error granting consent:", err);
//       let errorMessage = "Failed to grant access";
      
//       if (err.message?.includes("user rejected transaction")) {
//         errorMessage = "Transaction was rejected. Please try again.";
//       } else if (err.message?.includes("insufficient funds")) {
//         errorMessage = "Insufficient funds for transaction gas fees.";
//       } else if (err.message?.includes("Account is not a registered PATIENT")) {
//         errorMessage = "Your account is not registered as a patient on the blockchain.";
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const approveRequest = async (request) => {
//     if (!request.requestId) {
//       setError("Invalid request ID");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       console.log("Approving request:", request.requestId);
      
//       const tx = await ContractService.approveAccess(request.requestId);
//       console.log("Approval transaction sent:", tx);
      
//       const receipt = await tx.wait();
//       console.log("Approval confirmed:", receipt);

//       // Remove from pending requests
//       setPendingRequests(prev => prev.filter(req => req.id !== request.id));
      
//       // Add to granted access
//       const newAccess = {
//         id: Date.now(),
//         doctor: request.doctor,
//         doctorName: request.doctorName,
//         accessLevel: request.accessLevel === "1" ? "view" : "edit",
//         grantedOn: new Date().toISOString().split('T')[0],
//         expiresIn: `${request.duration} days`
//       };
      
//       setGrantedAccess(prev => [...prev, newAccess]);
//       setIsSuccess(true);
      
//       setTimeout(() => setIsSuccess(false), 5000);
      
//     } catch (err) {
//       console.error("Error approving request:", err);
//       let errorMessage = "Failed to approve request";
      
//       if (err.message?.includes("user rejected transaction")) {
//         errorMessage = "Transaction was rejected. Please try again.";
//       } else if (err.message?.includes("insufficient funds")) {
//         errorMessage = "Insufficient funds for transaction gas fees.";
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const rejectRequest = async (requestId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       console.log("Rejecting request:", requestId);
      
//       const tx = await ContractService.rejectAccess(requestId);
//       console.log("Rejection transaction sent:", tx);
      
//       await tx.wait();

//       // Remove from pending requests
//       setPendingRequests(prev => prev.filter(req => req.requestId !== requestId));
//       setIsSuccess(true);
      
//       setTimeout(() => setIsSuccess(false), 5000);
      
//     } catch (err) {
//       console.error("Error rejecting request:", err);
//       let errorMessage = "Failed to reject request";
      
//       if (err.message?.includes("user rejected transaction")) {
//         errorMessage = "Transaction was rejected. Please try again.";
//       } else if (err.message?.includes("insufficient funds")) {
//         errorMessage = "Insufficient funds for transaction gas fees.";
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const revokeAccess = async (accessId, doctorAddress) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       console.log("Revoking access for:", doctorAddress);
      
//       const tx = await ContractService.revokeConsent(doctorAddress);
//       console.log("Revocation transaction sent:", tx);
      
//       await tx.wait();

//       // Remove from granted access
//       setGrantedAccess(prev => prev.filter(access => access.id !== accessId));
//       setIsSuccess(true);
      
//       setTimeout(() => setIsSuccess(false), 5000);
      
//     } catch (err) {
//       console.error("Error revoking access:", err);
//       let errorMessage = "Failed to revoke access";
      
//       if (err.message?.includes("user rejected transaction")) {
//         errorMessage = "Transaction was rejected. Please try again.";
//       } else if (err.message?.includes("insufficient funds")) {
//         errorMessage = "Insufficient funds for transaction gas fees.";
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       // Optional: Show a temporary success message
//       console.log("Address copied to clipboard");
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 md:p-6">
//       <div className="mb-8 text-center">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Medical Records Access Control</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Manage consent for healthcare providers to access your medical records on the blockchain
//         </p>
        
//         {walletAddress && (
//           <div className="mt-4 inline-block p-2 bg-indigo-50 rounded-lg">
//             <p className="text-sm text-indigo-700 font-mono">
//               Wallet: {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Error and Success Messages */}
//       {error && (
//         <div className="mb-6 flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
//           <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
//           <span>{error}</span>
//           <button 
//             onClick={() => setError(null)}
//             className="ml-auto text-red-500 hover:text-red-700"
//           >
//             <XCircleIcon className="h-5 w-5" />
//           </button>
//         </div>
//       )}

//       {isSuccess && (
//         <div className="mb-6 flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
//           <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
//           <span>Operation completed successfully!</span>
//           <button 
//             onClick={() => setIsSuccess(false)}
//             className="ml-auto text-green-500 hover:text-green-700"
//           >
//             <XCircleIcon className="h-5 w-5" />
//           </button>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
//         {/* Pending Requests Section */}
//         <div className="bg-white rounded-xl shadow-md p-5 md:p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center text-amber-700">
//             <ClockIcon className="h-5 w-5 text-amber-500 mr-2" />
//             Pending Access Requests
//             <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//               {pendingRequests.length}
//             </span>
//           </h3>
          
//           {pendingRequests.length > 0 ? (
//             <div className="space-y-4">
//               {pendingRequests.map(request => (
//                 <div key={request.id} className="border border-amber-100 bg-amber-50 rounded-lg p-4">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-gray-900 truncate">
//                         {request.doctorName}
//                       </p>
//                       <div className="flex items-center mt-1">
//                         <p className="text-sm text-gray-500 truncate font-mono">
//                           {request.doctor}
//                         </p>
//                         <button
//                           onClick={() => copyToClipboard(request.doctor)}
//                           className="ml-2 text-gray-400 hover:text-gray-600"
//                           title="Copy address"
//                         >
//                           <ClipboardDocumentIcon className="h-4 w-4" />
//                         </button>
//                       </div>
//                       <p className="text-sm text-gray-700 mt-2">
//                         <span className="font-medium">Purpose:</span> {request.purpose}
//                       </p>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
//                           Requested: {request.requestedAt}
//                         </span>
//                         <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                           Duration: {request.duration} days
//                         </span>
//                         <span className={`text-xs px-2 py-1 rounded ${
//                           request.accessLevel === "1" 
//                             ? "bg-blue-100 text-blue-800" 
//                             : "bg-purple-100 text-purple-800"
//                         }`}>
//                           {request.accessLevel === "1" ? "View Only" : "View and Edit"}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex flex-col ml-4 space-y-2">
//                       <button
//                         onClick={() => approveRequest(request)}
//                         disabled={isLoading}
//                         className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => rejectRequest(request.requestId)}
//                         disabled={isLoading}
//                         className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
//               <ClockIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
//               <p>No pending access requests</p>
//             </div>
//           )}
//         </div>

//         {/* Grant New Access Section */}
//         <div id="grant-new-access" className="bg-white rounded-xl shadow-md p-5 md:p-6">
//           <h3 className="text-lg font-semibold mb-4 text-teal-800">Grant New Access</h3>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Doctor's Ethereum Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="0x..."
//                   value={doctorAddress}
//                   onChange={(e) => setDoctorAddress(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
//                   disabled={isLoading}
//                 />
//                 {doctorAddress && (
//                   <button
//                     onClick={() => copyToClipboard(doctorAddress)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     title="Copy address"
//                     disabled={isLoading}
//                   >
//                     <ClipboardDocumentIcon className="h-5 w-5 text-gray-400 hover:text-teal-600" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Access Level
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={accessLevel}
//                     onChange={(e) => setAccessLevel(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
//                     disabled={isLoading}
//                   >
//                     <option value="1">View Only</option>
//                     <option value="2">View and Edit</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//                     {accessLevel === "1" ? (
//                       <EyeIcon className="h-5 w-5 text-gray-400" />
//                     ) : (
//                       <PencilSquareIcon className="h-5 w-5 text-gray-400" />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Duration
//                 </label>
//                 <select
//                   value={duration}
//                   onChange={(e) => setDuration(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                   disabled={isLoading}
//                 >
//                   {durationOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={grantConsent}
//               disabled={isLoading || !doctorAddress || !isInitialized}
//               className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
//                 isLoading || !doctorAddress || !isInitialized
//                   ? "bg-teal-400 cursor-not-allowed" 
//                   : "bg-teal-600 hover:bg-teal-700"
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Processing Blockchain Transaction...
//                 </>
//               ) : (
//                 "Grant Access on Blockchain"
//               )}
//             </button>

//             {!isInitialized && (
//               <p className="text-sm text-amber-600 text-center">
//                 Connecting to blockchain... Please ensure MetaMask is connected.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Current Access Section */}
//       <div className="mt-8 bg-white rounded-xl shadow-md p-5 md:p-6">
//         <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
//           <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
//           Currently Granted Access
//           <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//             {grantedAccess.length}
//           </span>
//         </h3>
        
//         {grantedAccess.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left text-gray-500">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-4 py-3">Doctor</th>
//                   <th scope="col" className="px-4 py-3">Address</th>
//                   <th scope="col" className="px-4 py-3">Access Level</th>
//                   <th scope="col" className="px-4 py-3">Granted On</th>
//                   <th scope="col" className="px-4 py-3">Expires In</th>
//                   <th scope="col" className="px-4 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {grantedAccess.map(access => (
//                   <tr key={access.id} className="bg-white border-b hover:bg-gray-50">
//                     <td className="px-4 py-3 font-medium text-gray-900">{access.doctorName}</td>
//                     <td className="px-4 py-3 font-mono text-xs">
//                       <div className="flex items-center">
//                         {access.doctor}
//                         <button
//                           onClick={() => copyToClipboard(access.doctor)}
//                           className="ml-2 text-gray-400 hover:text-gray-600"
//                           title="Copy address"
//                         >
//                           <ClipboardDocumentIcon className="h-3 w-3" />
//                         </button>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                         access.accessLevel === "view" 
//                           ? "bg-blue-100 text-blue-800" 
//                           : "bg-purple-100 text-purple-800"
//                       }`}>
//                         {access.accessLevel === "view" ? "View Only" : "View and Edit"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">{access.grantedOn}</td>
//                     <td className="px-4 py-3">{access.expiresIn}</td>
//                     <td className="px-4 py-3">
//                       <button 
//                         onClick={() => revokeAccess(access.id, access.doctor)}
//                         disabled={isLoading}
//                         className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         Revoke
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
//             <CheckCircleIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
//             <p>No currently active access grants</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GrantConsent;

// src/components/GrantConsent.jsx
import { useState, useEffect } from "react";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  ClipboardDocumentIcon, 
  EyeIcon, 
  PencilSquareIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import ContractService from "../config/contractService";
import { useWallet } from "../context/WalletContext";

const GrantConsent = () => {
  const { walletAddress } = useWallet();
  
  const [doctorAddress, setDoctorAddress] = useState("");
  const [accessLevel, setAccessLevel] = useState("0"); // 0 for view, 1 for edit
  const [duration, setDuration] = useState("604800"); // 7 days in seconds
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [grantedAccess, setGrantedAccess] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Duration options in seconds
  const durationOptions = [
    { label: "1 Day", value: "86400" },
    { label: "3 Days", value: "259200" },
    { label: "7 Days", value: "604800" },
    { label: "14 Days", value: "1209600" },
    { label: "30 Days", value: "2592000" }
  ];

  useEffect(() => {
    initializeData();
  }, [walletAddress]);

  const initializeData = async () => {
    try {
      await ContractService.init();
      setIsInitialized(true);
      await loadPendingRequests();
      await loadGrantedAccess();
    } catch (error) {
      console.error("Initialization failed:", error);
      setError("Failed to initialize blockchain connection");
    }
  };

  const loadPendingRequests = async () => {
    try {
      const requests = await ContractService.getPatientAccessRequests();
      console.log("Raw pending requests:", requests);
      
      const formattedRequests = requests
        .filter(req => !req.approved && !req.rejected)
        .map((req, index) => ({
          id: req.requestId?.toString() || `req-${index}`,
          doctor: req.requester || "Unknown",
          doctorName: `Doctor ${index + 1}`,
          purpose: req.purpose || "Medical treatment",
          requestedAt: new Date(Number(req.timestamp) * 1000).toISOString().split('T')[0],
          duration: Math.floor(Number(req.duration) / 86400), // Convert seconds to days
          requestId: req.requestId,
          accessLevel: req.accessLevel?.toString() || "0"
        }));
      
      setPendingRequests(formattedRequests);
    } catch (error) {
      console.error("Error loading pending requests:", error);
      setError("Failed to load pending requests");
    }
  };

  const loadGrantedAccess = async () => {
    try {
      // This would need additional contract functions to get current grants
      // For now, we'll show approved requests
      const requests = await ContractService.getPatientAccessRequests();
      const approvedRequests = requests
        .filter(req => req.approved)
        .map((req, index) => ({
          id: req.requestId?.toString() || `grant-${index}`,
          doctor: req.requester,
          doctorName: `Doctor ${index + 1}`,
          accessLevel: req.accessLevel === 1 ? "edit" : "view",
          grantedOn: new Date(Number(req.timestamp) * 1000).toISOString().split('T')[0],
          expiresIn: `${Math.floor(Number(req.duration) / 86400)} days`,
          expiresAt: Number(req.timestamp) + Number(req.duration)
        }));
      
      setGrantedAccess(approvedRequests);
    } catch (error) {
      console.error("Error loading granted access:", error);
      setError("Failed to load current access grants");
    }
  };

  const validateAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const grantConsent = async () => {
    if (!doctorAddress) {
      setError("Please enter a doctor's address");
      return;
    }

    if (!validateAddress(doctorAddress)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    if (!isInitialized) {
      setError("Blockchain connection not initialized");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Convert duration to number and access level to number
      const durationSeconds = parseInt(duration);
      const accessLevelNum = parseInt(accessLevel);

      console.log("Granting consent with:", {
        doctorAddress,
        duration: durationSeconds,
        accessLevel: accessLevelNum
      });

      // Check if user is registered as patient
      const isPatient = await ContractService.hasRole(ContractService.ROLES.PATIENT, walletAddress);
      if (!isPatient) {
        setError("You need to register as a patient first to grant access");
        return;
      }

      // Call the blockchain
      const tx = await ContractService.grantConsent(doctorAddress, durationSeconds, accessLevelNum);
      console.log("Transaction sent:", tx);
      
      // Wait for confirmation
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      // Update local state
      const newAccess = {
        id: Date.now().toString(),
        doctor: doctorAddress,
        doctorName: "New Doctor",
        accessLevel: accessLevelNum === 1 ? "edit" : "view",
        grantedOn: new Date().toISOString().split('T')[0],
        expiresIn: `${parseInt(duration) / 86400} days`,
        expiresAt: Math.floor(Date.now() / 1000) + parseInt(duration)
      };
      
      setGrantedAccess(prev => [...prev, newAccess]);
      setIsSuccess(true);
      setDoctorAddress("");
      
      // Clear success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (err) {
      console.error("Error granting consent:", err);
      let errorMessage = "Failed to grant access";
      
      if (err.message?.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected. Please try again.";
      } else if (err.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction gas fees.";
      } else if (err.message?.includes("Not a registered patient")) {
        errorMessage = "You need to register as a patient first to grant access";
      } else if (err.message?.includes("Grantee must be registered professional")) {
        errorMessage = "The address must be a registered doctor or researcher";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const approveRequest = async (request) => {
    console.log("Approve request called with:", request)
    // if (!request.requestId) {
    //   setError("Invalid request ID");
    //   return;
    // }
    if (!request.id) {
      setError("Invalid request ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Approving request:", request.requestId);
      
      const tx = await ContractService.approveAccess(request.requestId);
      console.log("Approval transaction sent:", tx);
      
      const receipt = await tx.wait();
      console.log("Approval confirmed:", receipt);

      // Remove from pending requests
      setPendingRequests(prev => prev.filter(req => req.id !== request.id));
      
      // Add to granted access
      const newAccess = {
        id: Date.now().toString(),
        doctor: request.doctor,
        doctorName: request.doctorName,
        accessLevel: request.accessLevel === "1" ? "edit" : "view",
        grantedOn: new Date().toISOString().split('T')[0],
        expiresIn: `${request.duration} days`,
        expiresAt: Math.floor(Date.now() / 1000) + (request.duration * 86400)
      };
      
      setGrantedAccess(prev => [...prev, newAccess]);
      setIsSuccess(true);
      
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (err) {
      console.error("Error approving request:", err);
      let errorMessage = "Failed to approve request";
      
      if (err.message?.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected. Please try again.";
      } else if (err.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction gas fees.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const rejectRequest = async (requestId) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Rejecting request:", requestId);
      
      const tx = await ContractService.rejectAccess(requestId);
      console.log("Rejection transaction sent:", tx);
      
      await tx.wait();

      // Remove from pending requests
      setPendingRequests(prev => prev.filter(req => req.requestId !== requestId));
      setIsSuccess(true);
      
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (err) {
      console.error("Error rejecting request:", err);
      let errorMessage = "Failed to reject request";
      
      if (err.message?.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected. Please try again.";
      } else if (err.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction gas fees.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const revokeAccess = async (accessId, doctorAddress) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Revoking access for:", doctorAddress);
      
      const tx = await ContractService.revokeConsent(doctorAddress);
      console.log("Revocation transaction sent:", tx);
      
      await tx.wait();

      // Remove from granted access
      setGrantedAccess(prev => prev.filter(access => access.id !== accessId));
      setIsSuccess(true);
      
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (err) {
      console.error("Error revoking access:", err);
      let errorMessage = "Failed to revoke access";
      
      if (err.message?.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected. Please try again.";
      } else if (err.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction gas fees.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Address copied to clipboard");
    });
  };

  const isAccessExpired = (expiresAt) => {
    return Number(expiresAt) < Math.floor(Date.now() / 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Medical Records Access Control</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage consent for healthcare providers to access your medical records on the blockchain
        </p>
        
        {walletAddress && (
          <div className="mt-4 inline-block p-2 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700 font-mono">
              Wallet: {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
            </p>
          </div>
        )}
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="mb-6 flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
          <button 
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {isSuccess && (
        <div className="mb-6 flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>Operation completed successfully!</span>
          <button 
            onClick={() => setIsSuccess(false)}
            className="ml-auto text-green-500 hover:text-green-700"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Pending Requests Section */}
        <div className="bg-white rounded-xl shadow-md p-5 md:p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-amber-700">
            <ClockIcon className="h-5 w-5 text-amber-500 mr-2" />
            Pending Access Requests
            <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingRequests.length}
            </span>
          </h3>
          
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <div key={request.id} className="border border-amber-100 bg-amber-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {request.doctorName}
                      </p>
                      <div className="flex items-center mt-1">
                        <p className="text-sm text-gray-500 truncate font-mono">
                          {request.doctor}
                        </p>
                        <button
                          onClick={() => copyToClipboard(request.doctor)}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          title="Copy address"
                        >
                          <ClipboardDocumentIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-medium">Purpose:</span> {request.purpose}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                          Requested: {request.requestedAt}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Duration: {request.duration} days
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          request.accessLevel === "0" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-purple-100 text-purple-800"
                        }`}>
                          {request.accessLevel === "0" ? "View Only" : "View and Edit"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col ml-4 space-y-2">
                      <button
                        onClick={() => approveRequest(request)}
                        disabled={isLoading}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectRequest(request.requestId)}
                        disabled={isLoading}
                        className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
              <ClockIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>No pending access requests</p>
            </div>
          )}
        </div>

        {/* Grant New Access Section */}
        <div id="grant-new-access" className="bg-white rounded-xl shadow-md p-5 md:p-6">
          <h3 className="text-lg font-semibold mb-4 text-teal-800">Grant New Access</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor's Ethereum Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="0x..."
                  value={doctorAddress}
                  onChange={(e) => setDoctorAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
                  disabled={isLoading}
                />
                {doctorAddress && (
                  <button
                    onClick={() => copyToClipboard(doctorAddress)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    title="Copy address"
                    disabled={isLoading}
                  >
                    <ClipboardDocumentIcon className="h-5 w-5 text-gray-400 hover:text-teal-600" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Level
                </label>
                <div className="relative">
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
                    disabled={isLoading}
                  >
                    <option value="0">View Only</option>
                    <option value="1">View and Edit</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {accessLevel === "0" ? (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <PencilSquareIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  disabled={isLoading}
                >
                  {durationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={grantConsent}
              disabled={isLoading || !doctorAddress || !isInitialized}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isLoading || !doctorAddress || !isInitialized
                  ? "bg-teal-400 cursor-not-allowed" 
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Blockchain Transaction...
                </>
              ) : (
                "Grant Access on Blockchain"
              )}
            </button>

            {!isInitialized && (
              <p className="text-sm text-amber-600 text-center">
                Connecting to blockchain... Please ensure MetaMask is connected.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Current Access Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-5 md:p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          Currently Granted Access
          <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {grantedAccess.length}
          </span>
        </h3>
        
        {grantedAccess.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">Doctor</th>
                  <th scope="col" className="px-4 py-3">Address</th>
                  <th scope="col" className="px-4 py-3">Access Level</th>
                  <th scope="col" className="px-4 py-3">Granted On</th>
                  <th scope="col" className="px-4 py-3">Expires In</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {grantedAccess.map(access => {
                  const isExpired = isAccessExpired(access.expiresAt);
                  return (
                    <tr key={access.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{access.doctorName}</td>
                      <td className="px-4 py-3 font-mono text-xs">
                        <div className="flex items-center">
                          {access.doctor.substring(0, 10)}...
                          <button
                            onClick={() => copyToClipboard(access.doctor)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                            title="Copy address"
                          >
                            <ClipboardDocumentIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          access.accessLevel === "view" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-purple-100 text-purple-800"
                        }`}>
                          {access.accessLevel === "view" ? "View Only" : "View and Edit"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{access.grantedOn}</td>
                      <td className="px-4 py-3">
                        <span className={isExpired ? "text-red-600" : ""}>
                          {isExpired ? "Expired" : access.expiresIn}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          isExpired 
                            ? "bg-red-100 text-red-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {isExpired ? "Expired" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => revokeAccess(access.id, access.doctor)}
                          disabled={isLoading || isExpired}
                          className={`text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                            isExpired ? "text-gray-400" : "text-red-600 hover:text-red-800"
                          }`}
                        >
                          {isExpired ? "Expired" : "Revoke"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
            <CheckCircleIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p>No currently active access grants</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrantConsent;