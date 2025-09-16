import { useState } from "react";
import { ClipboardDocumentIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

const AccessRequest = () => {
  const [patientAddress, setPatientAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [duration, setDuration] = useState("7"); // default 7 days
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [accessLevel, setAccessLevel] = useState("view"); // view or edit

  const validateAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const requestAccess = async () => {
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

    try {
      // Simulate blockchain transaction (replace with actual contract call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Your actual contract call would go here:
      // await contract.requestAccess(patientAddress, purpose, duration, accessLevel);
      
      setIsSuccess(true);
      // Reset form if needed
      // setPatientAddress("");
      // setPurpose("");
    } catch (err) {
      setError(err.message || "Failed to request access");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Medical Record Access</h2>
        <p className="text-gray-600">Request permission to view or edit a patient's encrypted medical records</p>
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
                onClick={() => navigator.clipboard.writeText(patientAddress)}
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
              <option value="view">View Only</option>
              <option value="edit">View and Edit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (days)
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="1">1 Day</option>
              <option value="3">3 Days</option>
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
              <option value="30">30 Days</option>
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
          <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <span>Access request submitted successfully!</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={requestAccess}
          disabled={isLoading || !patientAddress || !purpose}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading 
              ? "bg-indigo-400 cursor-not-allowed" 
              : (!patientAddress || !purpose) 
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
        </ul>
      </div>
    </div>
  );
};

export default AccessRequest;