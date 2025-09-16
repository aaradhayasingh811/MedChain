import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, ClockIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const GrantConsent = () => {
  const [doctorAddress, setDoctorAddress] = useState("");
  const [accessLevel, setAccessLevel] = useState("view");
  const [duration, setDuration] = useState("7");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      doctor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      purpose: "Routine checkup",
      requestedAt: "2023-05-15",
      duration: "7"
    },
    {
      id: 2,
      doctor: "0x53D285f6D1A9e6F8033e3b7Dd9a7D05F4c908BBF",
      purpose: "Emergency treatment",
      requestedAt: "2023-05-10",
      duration: "30"
    }
  ]);

  const validateAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const approveAccess = async () => {
    if (!doctorAddress) {
      setError("Please enter a doctor's address");
      return;
    }

    if (!validateAddress(doctorAddress)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Simulate blockchain transaction (replace with actual contract call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Your actual contract call would go here:
      // await contract.approveAccess(doctorAddress, accessLevel, duration);
      
      setIsSuccess(true);
      setDoctorAddress("");
    } catch (err) {
      setError(err.message || "Failed to grant access");
    } finally {
      setIsLoading(false);
    }
  };

  const rejectRequest = (requestId) => {
    // Add logic to reject the request
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Access Consent</h2>
        <p className="text-gray-600">Control who can access your medical records and for how long</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Requests Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ClockIcon className="h-5 w-5 text-yellow-500 mr-2" />
            Pending Requests
          </h3>
          
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-700 truncate">
                        {request.doctor}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Purpose: {request.purpose}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Requested on: {request.requestedAt} | {request.duration} days
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setDoctorAddress(request.doctor);
                          setDuration(request.duration);
                        }}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                      >
                        Quick Approve
                      </button>
                      <button
                        onClick={() => rejectRequest(request.id)}
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No pending access requests
            </div>
          )}
        </div>

        {/* Grant New Access Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Grant New Access</h3>
          
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
                {doctorAddress && (
                  <button
                    onClick={() => navigator.clipboard.writeText(doctorAddress)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    title="Copy address"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5 text-gray-400 hover:text-yellow-600" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Level
                </label>
                <select
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="1">1 Day</option>
                  <option value="3">3 Days</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="flex items-center p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                <XCircleIcon className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center p-3 text-sm text-green-700 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                <span>Access granted successfully!</span>
              </div>
            )}

            <button
              onClick={approveAccess}
              disabled={isLoading || !doctorAddress}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isLoading 
                  ? "bg-yellow-400 cursor-not-allowed" 
                  : !doctorAddress 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-yellow-600 hover:bg-yellow-700"
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
                "Grant Access"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Current Access Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          Currently Granted Access
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
          {/* You would map through actual granted access list here */}
          No currently active access grants
        </div>
      </div>
    </div>
  );
};

export default GrantConsent;