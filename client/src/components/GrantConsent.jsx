import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, ClockIcon, ClipboardDocumentIcon, EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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
      doctorName: "Dr. Sarah Johnson",
      purpose: "Routine checkup",
      requestedAt: "2023-05-15",
      duration: "7"
    },
    {
      id: 2,
      doctor: "0x53D285f6D1A9e6F8033e3b7Dd9a7D05F4c908BBF",
      doctorName: "Dr. Michael Chen",
      purpose: "Emergency treatment",
      requestedAt: "2023-05-10",
      duration: "30"
    }
  ]);

  const [grantedAccess, setGrantedAccess] = useState([
    {
      id: 1,
      doctor: "0x89d2A6bA5A6c7E0d4B8eF6F3c1D2a5B4c3D2e1F7",
      doctorName: "Dr. Emily Rodriguez",
      accessLevel: "view",
      grantedOn: "2023-05-01",
      expiresIn: "3 days"
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
      
      // Add to granted access list
      const newAccess = {
        id: Date.now(),
        doctor: doctorAddress,
        doctorName: "New Doctor", // In a real app, you'd fetch this from somewhere
        accessLevel,
        grantedOn: new Date().toISOString().split('T')[0],
        expiresIn: `${duration} days`
      };
      
      setGrantedAccess([...grantedAccess, newAccess]);
      setIsSuccess(true);
      setDoctorAddress("");
    } catch (err) {
      setError(err.message || "Failed to grant access");
    } finally {
      setIsLoading(false);
    }
  };

  const rejectRequest = (requestId) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
  };

  const revokeAccess = (accessId) => {
    setGrantedAccess(grantedAccess.filter(access => access.id !== accessId));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Medical Records Access Control</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Manage consent for healthcare providers to access your medical records</p>
      </div>

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
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {request.doctor}
                      </p>
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
                      </div>
                    </div>
                    <div className="flex flex-col ml-4 space-y-2">
                      <button
                        onClick={() => {
                          setDoctorAddress(request.doctor);
                          setDuration(request.duration);
                          document.getElementById('grant-new-access')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectRequest(request.id)}
                        className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {doctorAddress && (
                  <button
                    onClick={() => navigator.clipboard.writeText(doctorAddress)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    title="Copy address"
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
                  >
                    <option value="view">View Only</option>
                    <option value="edit">View and Edit</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {accessLevel === "view" ? (
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
                <XCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center p-3 text-sm text-green-700 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Access granted successfully!</span>
              </div>
            )}

            <button
              onClick={approveAccess}
              disabled={isLoading || !doctorAddress}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isLoading 
                  ? "bg-teal-400 cursor-not-allowed" 
                  : !doctorAddress 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-teal-600 hover:bg-teal-700"
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
                  <th scope="col" className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {grantedAccess.map(access => (
                  <tr key={access.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{access.doctorName}</td>
                    <td className="px-4 py-3 font-mono text-xs">{access.doctor}</td>
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
                    <td className="px-4 py-3">{access.expiresIn}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => revokeAccess(access.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
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