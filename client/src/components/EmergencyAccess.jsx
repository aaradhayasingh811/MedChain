// import { useState } from "react";
// import { ExclamationTriangleIcon, ClipboardDocumentCheckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

// const EmergencyAccess = () => {
//   const [patientId, setPatientId] = useState("");
//   const [reason, setReason] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [requiresApproval, setRequiresApproval] = useState(false);

//   const triggerAccess = async () => {
//     if (!patientId) {
//       setError("Please enter a patient ID");
//       return;
//     }

//     if (!reason) {
//       setError("Please specify the emergency reason");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setIsSuccess(false);

//     try {
//       // Simulate multi-sig approval process
//       await new Promise(resolve => setTimeout(resolve, 3000));
      
//       // Your actual contract call would go here:
//       // await emergencyContract.requestEmergencyAccess(patientId, reason);
      
//       // Determine if additional approvals are needed
//       const needsApproval = Math.random() > 0.5;
//       setRequiresApproval(needsApproval);
      
//       if (!needsApproval) {
//         setIsSuccess(true);
//       }
//     } catch (err) {
//       setError(err.message || "Failed to trigger emergency access");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-red-100">
//       <div className="flex items-center mb-6">
//         <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-2" />
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Emergency Access Portal</h2>
//           <p className="text-sm text-gray-500">Break-glass access for life-threatening situations</p>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="bg-red-50 border-l-4 border-red-500 p-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-red-700">
//                 This action will be recorded on-chain and requires valid justification. 
//                 Misuse may result in legal consequences.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Patient Identifier
//           </label>
//           <input
//             type="text"
//             placeholder="Enter patient ID or wallet address"
//             value={patientId}
//             onChange={(e) => setPatientId(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Emergency Reason
//           </label>
//           <select
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//           >
//             <option value="">Select emergency reason</option>
//             <option value="life_threatening">Life-threatening condition</option>
//             <option value="unconscious">Patient unconscious</option>
//             <option value="public_health">Public health emergency</option>
//             <option value="other">Other (specify in notes)</option>
//           </select>
//         </div>

//         {reason === "other" && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Additional Notes
//             </label>
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//               rows={3}
//               placeholder="Provide detailed justification..."
//             />
//           </div>
//         )}

//         {error && (
//           <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
//             <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
//             <span>{error}</span>
//           </div>
//         )}

//         {isSuccess && (
//           <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
//             <ShieldCheckIcon className="h-5 w-5 mr-2" />
//             <span>Emergency access granted! This has been recorded on-chain.</span>
//           </div>
//         )}

//         {requiresApproval && (
//           <div className="flex items-center p-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg">
//             <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
//             <span>Request submitted for multi-signature approval. 2/3 approvals needed.</span>
//           </div>
//         )}

//         <button
//           onClick={triggerAccess}
//           disabled={isLoading || !patientId || !reason}
//           className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
//             isLoading 
//               ? "bg-red-400 cursor-not-allowed" 
//               : (!patientId || !reason) 
//                 ? "bg-gray-400 cursor-not-allowed" 
//                 : "bg-red-600 hover:bg-red-700"
//           }`}
//         >
//           {isLoading ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Verifying Emergency...
//             </>
//           ) : (
//             "Trigger Emergency Access"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmergencyAccess;

// src/components/EmergencyAccess.jsx
import { useState } from "react";
import { ExclamationTriangleIcon, ClipboardDocumentCheckIcon, ShieldCheckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ContractService from "../config/contractService";
import { useWallet } from "../context/WalletContext";

const EmergencyAccess = () => {
  const { walletAddress } = useWallet();
  const [patientAddress, setPatientAddress] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [requiresApproval, setRequiresApproval] = useState(false);

  const validateAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const triggerAccess = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet first");
      return;
    }

    if (!patientAddress) {
      setError("Please enter a patient address");
      return;
    }

    if (!validateAddress(patientAddress)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    if (!reason) {
      setError("Please specify the emergency reason");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Check if user is registered as emergency responder
      await ContractService.init();
      const isEmergencyResponder = await ContractService.hasRole(
        ContractService.ROLES.EMERGENCY, 
        walletAddress
      );

      if (!isEmergencyResponder) {
        setError("You need to be registered as an emergency responder to use this feature");
        return;
      }

      // Check if patient is registered
      const isPatient = await ContractService.hasRole(
        ContractService.ROLES.PATIENT,
        patientAddress
      );

      if (!isPatient) {
        setError("Patient address is not registered in the system");
        return;
      }

      // In a real implementation, this would call an emergency access function
      // For now, we'll simulate the process
      
      // Simulate multi-sig approval process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Your actual emergency contract call would go here:
      // await emergencyContract.requestEmergencyAccess(patientAddress, reason);
      
      // Determine if additional approvals are needed (simulated)
      const needsApproval = Math.random() > 0.7; // 30% chance needs approval
      setRequiresApproval(needsApproval);
      
      if (!needsApproval) {
        setIsSuccess(true);
        
        // In real implementation, you would get actual access here
        console.log("Emergency access granted for patient:", patientAddress);
      }
    } catch (err) {
      console.error("Emergency access error:", err);
      let errorMessage = err.message || "Failed to trigger emergency access";
      
      if (err.message?.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected. Please try again.";
      } else if (err.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction gas fees.";
      } else if (err.message?.includes("Not a registered emergency responder")) {
        errorMessage = "You need to register as an emergency responder first";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-red-100">
      <div className="flex items-center mb-6">
        <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-2" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Emergency Access Portal</h2>
          <p className="text-sm text-gray-500">Break-glass access for life-threatening situations</p>
        </div>
      </div>

      {walletAddress && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Connected as: {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Warning:</strong> This action will be recorded on-chain and requires valid justification. 
                Misuse may result in legal consequences and revocation of emergency responder privileges.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Ethereum Address
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="0x..."
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            {patientAddress && (
              <button
                onClick={() => copyToClipboard(patientAddress)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                title="Copy address"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-gray-400 hover:text-red-600" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Reason
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select emergency reason</option>
            <option value="life_threatening">Life-threatening condition</option>
            <option value="unconscious">Patient unconscious</option>
            <option value="critical_accident">Critical accident victim</option>
            <option value="public_health">Public health emergency</option>
            <option value="other">Other (specify in notes)</option>
          </select>
        </div>

        {reason === "other" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={3}
              placeholder="Provide detailed justification for emergency access..."
            />
          </div>
        )}

        {error && (
          <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
            <ShieldCheckIcon className="h-5 w-5 mr-2" />
            <span>Emergency access granted! This has been recorded on-chain. You now have temporary access to patient records.</span>
          </div>
        )}

        {requiresApproval && (
          <div className="flex items-center p-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg">
            <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
            <span>Request submitted for multi-signature approval. 2/3 approvals needed. You will be notified when approved.</span>
          </div>
        )}

        <button
          onClick={triggerAccess}
          disabled={isLoading || !patientAddress || !reason || !walletAddress}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading 
              ? "bg-red-400 cursor-not-allowed" 
              : (!patientAddress || !reason || !walletAddress) 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying Emergency...
            </>
          ) : (
            "Trigger Emergency Access"
          )}
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p className="font-medium">Emergency Access Protocol:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Access is automatically logged on blockchain with timestamp and reason</li>
          <li>Patient will be notified of emergency access</li>
          <li>All access is auditable and subject to review</li>
          <li>Standard access duration: 24 hours for emergency situations</li>
          <li>Requires valid emergency responder credentials</li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyAccess;