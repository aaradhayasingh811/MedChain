
import { useState } from "react";
import { ClipboardDocumentIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import contractService from "../config/contractService"; 
import { useWallet } from "../context/WalletContext";

const AccessRequest = () => {
  const { walletAddress } = useWallet();
  const [patientAddress, setPatientAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [duration, setDuration] = useState("604800"); // 7 days in seconds
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [accessLevel, setAccessLevel] = useState("0"); // 0 for view, 1 for edit
  const [transactionHash, setTransactionHash] = useState("");

  const validateAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const initializeBlockchain = async () => {
    try {
      await contractService.init();
      return true;
    } catch (err) {
      setError(err.message || "Failed to connect to blockchain");
      return false;
    }
  };

  const requestAccess = async () => {
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

    if (!purpose) {
      setError("Please specify the purpose of access");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    setTransactionHash("");

    try {
      // Initialize blockchain connection
      const isInitialized = await initializeBlockchain();
      if (!isInitialized) {
        return;
      }

      // Convert duration to number and access level to appropriate format
      const durationInSeconds = parseInt(duration);
      const contractAccessLevel = parseInt(accessLevel);

      // Check if user is registered as doctor
      const isDoctor = await contractService.hasRole(contractService.ROLES.DOCTOR, walletAddress);
      if (!isDoctor) {
        setError("You need to register as a doctor first to request access");
        return;
      }

      // Call the actual contract method
      const tx = await contractService.requestAccess(
        patientAddress,
        purpose,
        durationInSeconds,
        contractAccessLevel
      );

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      
      setTransactionHash(receipt.hash);
      setIsSuccess(true);
      
      // Reset form after success
      setPatientAddress("");
      setPurpose("");
      
    } catch (err) {
      console.error("Transaction error:", err);
      
      // Handle specific error cases
      if (err.code === "ACTION_REJECTED") {
        setError("Transaction was rejected by user");
      } else if (err.code === "INSUFFICIENT_FUNDS") {
        setError("Insufficient funds for transaction");
      } else if (err.message.includes("user rejected")) {
        setError("User rejected the transaction");
      } else if (err.message.includes("Not a registered doctor")) {
        setError("You need to register as a doctor first");
      } else if (err.message.includes("Patient not registered")) {
        setError("Patient address is not registered in the system");
      } else {
        setError(err.message || "Failed to request access. Please try again.");
      }
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

  // Duration options in seconds
  const durationOptions = [
    { label: "1 Day", value: "86400" },
    { label: "3 Days", value: "259200" },
    { label: "7 Days", value: "604800" },
    { label: "14 Days", value: "1209600" },
    { label: "30 Days", value: "2592000" }
  ];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Medical Record Access</h2>
        <p className="text-gray-600">Request permission to view or edit a patient's encrypted medical records</p>
        
        {walletAddress && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Connected as: {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Patient Address Input */}
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {patientAddress && (
              <button
                onClick={() => copyToClipboard(patientAddress)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                title="Copy address"
              >
                <ClipboardDocumentIcon className="h-5 w-5 text-gray-400 hover:text-indigo-600" />
              </button>
            )}
          </div>
        </div>

        {/* Access Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Level
            </label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="0">View Only</option>
              <option value="1">View and Edit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Purpose Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose of Access
          </label>
          <textarea
            placeholder="Describe why you need access to these records..."
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
        </div>

        {/* Status Messages */}
        {error && (
          <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
            <div className="flex items-center mb-2">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span>Access request submitted successfully!</span>
            </div>
            {transactionHash && (
              <div className="mt-2 flex items-center">
                <span className="text-xs mr-2">Transaction:</span>
                <button
                  onClick={() => copyToClipboard(transactionHash)}
                  className="text-xs text-green-800 hover:text-green-900 flex items-center"
                  title="Copy transaction hash"
                >
                  {`${transactionHash.slice(0, 10)}...${transactionHash.slice(-8)}`}
                  <ClipboardDocumentIcon className="h-3 w-3 ml-1" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={requestAccess}
          disabled={isLoading || !patientAddress || !purpose || !walletAddress}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading 
              ? "bg-indigo-400 cursor-not-allowed" 
              : (!patientAddress || !purpose || !walletAddress) 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Request Access"
          )}
        </button>
      </div>

      {/* Additional Information */}
      <div className="mt-6 text-sm text-gray-500">
        <p className="font-medium">Note:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>The patient will need to approve your request before access is granted</li>
          <li>All access is logged on the blockchain for transparency</li>
          <li>You'll be notified when the patient responds to your request</li>
          <li>This transaction requires gas fees</li>
          <li>You must be registered as a doctor to request access</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessRequest;