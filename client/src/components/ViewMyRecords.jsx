import { useState, useEffect } from "react";
import {
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon ,
  CalendarIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import ContractService from "../config/contractService";
import { useWallet } from "../context/WalletContext";
import { useNavigate } from "react-router-dom";

const ViewMyRecords = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { walletAddress } = useWallet();

  const handleGoToUpload = async()=>{
    navigate('/upload')
  }

  useEffect(() => {
    fetchMyRecords();
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
    } else if (error.message?.includes("Account is not a registered")) {
      userMessage = "Your account is not registered as a patient on blockchain";
    } else if (error.message?.includes("revert")) {
      userMessage = "Transaction failed - you may not have permission for this action";
    } else if (error.message?.includes("Blockchain call failed")) {
      userMessage = "Blockchain operation failed - check console for details";
    } else if (error.code === "NETWORK_ERROR") {
      userMessage = "Network connection error - please check your internet";
    }
    
    setError({ message: userMessage, context });
    setTimeout(clearError, 8000);
  };

  const fetchMyRecords = async () => {
    if (!walletAddress) return;
    
    try {
      setLoading(true);
      clearError();
      await ContractService.init();

      const myRecords = await ContractService.getMyRecords();
      
      // Format records for display
      const formattedRecords = myRecords.map((record, index) => ({
        id: record.recordId?.toString() || index + 1,
        ipfsHash: record.ipfsHash,
        fileType: record.fileType || "Unknown",
        fileSize: record.fileSize ? formatFileSize(record.fileSize) : "Unknown",
        description: record.description || "Medical Record",
        timestamp: record.timestamp ? new Date(Number(record.timestamp) * 1000) : new Date(),
        uploadedBy: record.uploadedBy || walletAddress,
      }));

      setRecords(formattedRecords);
    } catch (error) {
      handleContractError(error, "fetching medical records");
      setRecords([]);
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
      // In a real application, you would fetch the file from IPFS using the hash
      // For now, we'll simulate the download process
      const ipfsGateway = "https://ipfs.io/ipfs/";
      const fileUrl = `${ipfsGateway}${record.ipfsHash}`;
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `medical-record-${record.id}.${record.fileType.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Log the download action
      console.log(`Downloading record from IPFS: ${record.ipfsHash}`);
      
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

  if (loading && records.length === 0) {
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
              My Medical Records
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all your medical records stored on the blockchain
            </p>
          </div>
          <button
            onClick={fetchMyRecords}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <ArrowPathIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {walletAddress && (
          <div className="mt-4">
            <div className="p-3 bg-indigo-50 rounded-lg inline-block">
              <p className="text-sm text-indigo-700">
                <DocumentTextIcon className="h-4 w-4 inline mr-1" />
                {records.length} medical record{records.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        )}
      </div>

      {records.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No medical records found
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't uploaded any medical records yet.
          </p>
          <button
            onClick={handleGoToUpload}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Upload Your First Record
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Medical Records ({records.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {records.map((record) => (
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFileTypeColor(record.fileType)}`}>
                          {record.fileType.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {record.fileSize}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {formatDate(record.timestamp)}
                        </span>
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
                      <ArrowDownTrayIcon  className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  IPFS Hash: {record.ipfsHash}
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
                  Record Details
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
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
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
              
              <div>
                <label className="text-sm font-medium text-gray-700">Upload Date</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedRecord.timestamp)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">IPFS Hash</label>
                <p className="mt-1 text-sm text-gray-900 font-mono break-all">{selectedRecord.ipfsHash}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Uploaded By</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">
                  {selectedRecord.uploadedBy.substring(0, 8)}...
                  {selectedRecord.uploadedBy.substring(selectedRecord.uploadedBy.length - 6)}
                </p>
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
                <ArrowDownTrayIcon  className="h-4 w-4 mr-1 inline" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMyRecords;