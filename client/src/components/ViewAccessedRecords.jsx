
import { useState, useEffect } from "react";
import axios from "axios";
import {
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  UserIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import ContractService from "../config/contractService";
import { useWallet } from "../context/WalletContext";
import { useNavigate } from "react-router-dom";

const ViewAccessedRecords = () => {
  const [accessedRecords, setAccessedRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { walletAddress } = useWallet();
  const navigate = useNavigate();

  const handleGoToAccess = async() => {
    navigate('/access');
  }

  useEffect(() => {
    if (walletAddress) {
      fetchAccessedRecords();
    }
  }, [walletAddress]);

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
    } else if (error.message?.includes("Not a registered doctor")) {
      userMessage = "Your account is not registered as a doctor on blockchain";
    } else if (error.message?.includes("No access to patient records")) {
      userMessage = "You don't have access to these patient records";
    } else {
      userMessage = error.message || "Blockchain operation failed";
    }
    
    setError({ message: userMessage, context });
    setTimeout(clearError, 8000);
  };

  const fetchAccessedRecords = async () => {
    if (!walletAddress) return;
    
    try {
      setLoading(true);
      clearError();
      await ContractService.init();

      // Check if user is registered as doctor
      const isDoctor = await ContractService.hasRole(ContractService.ROLES.DOCTOR, walletAddress);
      if (!isDoctor) {
        setError("You need to register as a doctor to access patient records");
        setAccessedRecords([]);
        return;
      }

      // Get approved access requests
      const accessRequests = await ContractService.getMyAccessRequests();
      const approvedRequests = accessRequests.filter(req => req.approved);
      
      // For each approved request, fetch patient records
      const recordsWithAccess = [];
      
      for (const request of approvedRequests) {
        try {
          // Check if access is still valid
          const hasAccess = await ContractService.hasAccess(request.patient, walletAddress);
          if (!hasAccess) {
            console.log(`Access expired for patient ${request.patient}`);
            continue;
          }

          const patientRecords = await ContractService.getPatientRecords(request.patient);
          
          // Add patient info to each record
          const recordsWithPatientInfo = patientRecords.map((record, index) => ({
            ...record,
            id: `${request.patient}-${record.recordId || index}`,
            patientAddress: request.patient,
            patientName: `Patient ${request.patient.substring(2, 8)}`, // Simple patient name from address
            accessGranted: new Date(Number(request.timestamp) * 1000),
            purpose: request.purpose || "Medical treatment",
            recordId: record.recordId?.toString() || index + 1,
            ipfsHash: record.ipfsHash,
            fileType: record.fileType || "Unknown",
            fileSize: record.fileSize ? formatFileSize(Number(record.fileSize)) : "Unknown",
            description: record.description || "Medical Record",
            timestamp: new Date(Number(record.timestamp) * 1000),
          }));
          
          recordsWithAccess.push(...recordsWithPatientInfo);
        } catch (patientError) {
          console.error(`Error fetching records for patient ${request.patient}:`, patientError);
          // Continue with other patients
        }
      }
      
      setAccessedRecords(recordsWithAccess);
    } catch (error) {
      handleContractError(error, "fetching accessed records");
      setAccessedRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };


const handleDownloadRecord = async (record) => {
  try {
    // Call your backend to get decrypted file
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/upload/download/${record.ipfsHash}`, {
      responseType: "blob", 
    });

    const fileExtension = record.fileType?.toLowerCase() || "txt";
    const fileName = `patient-record-${record.patientName}-${record.id}.${fileExtension}`;

    // Create a temporary link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Downloading decrypted patient record from backend: ${record.ipfsHash}`);
  } catch (error) {
    console.error("Error downloading record:", error);
    setError({ 
      message: "Failed to download record. Please try again.", 
      context: "download record" 
    });
    setTimeout(clearError, 5000);
  }
};


  const getFileTypeIcon = (fileType) => {
    const type = fileType?.toLowerCase() || 'unknown';
    
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('text')) return '📝';
    if (type.includes('video')) return '🎥';
    if (type.includes('audio')) return '🎵';
    return '📁';
  };

  const getFileTypeColor = (fileType) => {
    const type = fileType?.toLowerCase() || 'unknown';
    
    if (type.includes('pdf')) return 'bg-red-100 text-red-800';
    if (type.includes('image')) return 'bg-green-100 text-green-800';
    if (type.includes('text')) return 'bg-blue-100 text-blue-800';
    if (type.includes('video')) return 'bg-purple-100 text-purple-800';
    if (type.includes('audio')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Filter records based on search term
  const filteredRecords = accessedRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique patients
  const uniquePatients = [...new Set(accessedRecords.map(record => record.patientAddress))];

  if (loading && accessedRecords.length === 0) {
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
              Accessed Patient Records
            </h1>
            <p className="text-gray-600 mt-2">
              View medical records from patients who have granted you access
            </p>
          </div>
          <button
            onClick={fetchAccessedRecords}
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
                <DocumentTextIcon className="h-4 w-4 inline mr-1" />
                {accessedRecords.length} record{accessedRecords.length !== 1 ? 's' : ''} accessed
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                <UserIcon className="h-4 w-4 inline mr-1" />
                {uniquePatients.length} patient{uniquePatients.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by patient name, description, or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {accessedRecords.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <ShieldCheckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No accessed records found
          </h3>
          <p className="text-gray-500 mb-6">
            {walletAddress 
              ? "You haven't been granted access to any patient records yet, or your access may have expired."
              : "Please connect your wallet to view accessed records."
            }
          </p>
          {walletAddress && (
            <button
              onClick={handleGoToAccess}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Request Access to Records
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Patient Records ({filteredRecords.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <div key={record.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getFileTypeIcon(record.fileType)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {record.description}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <UserIcon className="h-3 w-3 mr-1" />
                          {record.patientName}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFileTypeColor(record.fileType)}`}>
                          {record.fileType.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {record.fileSize}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span className="flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Uploaded: {formatDate(record.timestamp)}
                        </span>
                        <span className="flex items-center">
                          <ShieldCheckIcon className="h-3 w-3 mr-1" />
                          Access granted: {formatDate(record.accessGranted)}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-600">
                        Purpose: {record.purpose}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewRecord(record)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownloadRecord(record)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Record Details Modal */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Patient Record Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Patient</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRecord.patientName}</p>
                  <p className="mt-1 text-xs text-gray-500 font-mono">
                    {selectedRecord.patientAddress.substring(0, 8)}...
                    {selectedRecord.patientAddress.substring(selectedRecord.patientAddress.length - 6)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Access Purpose</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRecord.purpose}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Record Description</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRecord.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">File Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRecord.fileType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">File Size</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRecord.fileSize}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Upload Date</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedRecord.timestamp)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Access Granted</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedRecord.accessGranted)}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">IPFS Hash</label>
                <p className="mt-1 text-sm text-gray-900 font-mono break-all">{selectedRecord.ipfsHash}</p>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handleDownloadRecord(selectedRecord)}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1 inline" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAccessedRecords;