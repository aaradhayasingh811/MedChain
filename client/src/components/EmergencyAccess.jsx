import { useState } from "react";
import { ExclamationTriangleIcon, ClipboardDocumentCheckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const EmergencyAccess = () => {
  const [patientId, setPatientId] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [requiresApproval, setRequiresApproval] = useState(false);

  const triggerAccess = async () => {
    if (!patientId) {
      setError("Please enter a patient ID");
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
      // Simulate multi-sig approval process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Your actual contract call would go here:
      // await emergencyContract.requestEmergencyAccess(patientId, reason);
      
      // Determine if additional approvals are needed
      const needsApproval = Math.random() > 0.5;
      setRequiresApproval(needsApproval);
      
      if (!needsApproval) {
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err.message || "Failed to trigger emergency access");
    } finally {
      setIsLoading(false);
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

      <div className="space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                This action will be recorded on-chain and requires valid justification. 
                Misuse may result in legal consequences.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Identifier
          </label>
          <input
            type="text"
            placeholder="Enter patient ID or wallet address"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
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
              placeholder="Provide detailed justification..."
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
            <span>Emergency access granted! This has been recorded on-chain.</span>
          </div>
        )}

        {requiresApproval && (
          <div className="flex items-center p-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg">
            <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
            <span>Request submitted for multi-signature approval. 2/3 approvals needed.</span>
          </div>
        )}

        <button
          onClick={triggerAccess}
          disabled={isLoading || !patientId || !reason}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading 
              ? "bg-red-400 cursor-not-allowed" 
              : (!patientId || !reason) 
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
    </div>
  );
};

export default EmergencyAccess;