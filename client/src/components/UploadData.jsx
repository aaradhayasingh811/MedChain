
import { useState } from "react";
import {
  ArrowUpTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import ContractService from "../config/contractService";
import { useWallet } from "../context/WalletContext";
import axios from "axios";
const UploadData = () => {
  const { walletAddress } = useWallet();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({
    ipfs: 0,
    blockchain: 0,
    status: "",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.name.endsWith(".pdf")
      ) {
        if (selectedFile.size > 10 * 1024 * 1024) {
          setError("File size too large. Maximum size is 10MB.");
          setFile(null);
          setFileName("");
          return;
        }
        setFileName(selectedFile.name);
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Please upload a PDF file only");
        setFile(null);
        setFileName("");
      }
    }
  };

  const updateProgress = (step, progress, status) => {
    setUploadProgress({
      ipfs: step === "ipfs" ? progress : uploadProgress.ipfs,
      blockchain: step === "blockchain" ? progress : uploadProgress.blockchain,
      status,
    });
  };

  const checkBlockchainReadiness = async () => {
    try {
      updateProgress("blockchain", 10, "Checking blockchain connection...");
      
      await ContractService.init();
      
      updateProgress("blockchain", 30, "Verifying patient role...");
      const isPatient = await ContractService.hasRole(ContractService.ROLES.PATIENT, walletAddress);

      if (!isPatient) {
        updateProgress("blockchain", 40, "Registering as patient...");
        const tx = await ContractService.registerAsPatient();
        console.log("Register tx:", tx);
        await tx.wait();
        
        // Verify registration
        const registered = await ContractService.hasRole(ContractService.ROLES.PATIENT, walletAddress);
        if (!registered) {
          throw new Error("Patient registration failed");
        }
      }

      updateProgress("blockchain", 50, "Blockchain ready for transaction");
      return true;
    } catch (error) {
      console.error("Blockchain readiness check failed:", error);
      throw error;
    }
  };

 const uploadToIPFS = async () => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (description) {
      formData.append("description", description);
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/upload/pdf-to-fhir`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 70) / progressEvent.total
          );
          updateProgress("ipfs", progress, "Uploading to IPFS...");
        },
      }
    );

    const { cid } = response.data;
    if (!cid) {
      throw new Error("IPFS hash not returned from server");
    }

    return cid;
  } catch (error) {
    console.error("IPFS upload failed:", error);
    throw new Error("Failed to upload to IPFS: " + error.message);
  }
};

  const storeOnBlockchain = async (ipfsHash, fileType, fileSize, description) => {
    try {
      await checkBlockchainReadiness();

      updateProgress("blockchain", 70, "Preparing transaction...");
      
      console.log("Storing on blockchain:", {
        ipfsHash,
        fileType,
        fileSize: fileSize.toString(),
        description
      });

      const receipt = await ContractService.addMedicalRecord(
        ipfsHash,
        fileType,
        fileSize,
        description || "Medical Record"
      );

      updateProgress("blockchain", 100, "Blockchain storage complete!");
      return receipt;
    } catch (error) {
      console.error("Blockchain storage failed:", error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a PDF file");
      return;
    }

    if (!walletAddress) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    setUploadProgress({
      ipfs: 0,
      blockchain: 0,
      status: "Starting upload process...",
    });

    try {
      // Step 1: Upload to IPFS
      const ipfsHash = await uploadToIPFS();

      if (!ipfsHash) {
        throw new Error("IPFS upload failed - no hash returned");
      }

      // Step 2: Store IPFS hash on blockchain
      const blockchainReceipt = await storeOnBlockchain(
        ipfsHash,
        "pdf",
        file.size,
        description || fileName
      );

      // Success
      setIsSuccess(true);
      setFile(null);
      setFileName("");
      setDescription("");
      setUploadProgress({ ipfs: 0, blockchain: 0, status: "Upload complete!" });

      console.log("Full upload process completed:", {
        ipfsHash,
        blockchainTx: blockchainReceipt.hash,
      });

    } catch (err) {
      console.error("Upload process failed:", err);
      
      let errorMessage = err.message || "Failed to upload PDF";
      
      // Provide user-friendly error messages
      if (errorMessage.includes("user rejected")) {
        errorMessage = "Transaction was rejected. Please try again and confirm the transaction in MetaMask.";
      } else if (errorMessage.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction. Please ensure you have enough ETH for gas fees.";
      } else if (errorMessage.includes("Not a registered patient")) {
        errorMessage = "Please complete your patient registration on the blockchain before uploading records.";
      } else if (errorMessage.includes("revert")) {
        errorMessage = "Transaction failed. You may not have permission to add records or the contract call failed.";
      } else if (errorMessage.includes("MetaMask not installed")) {
        errorMessage = "MetaMask not found. Please install MetaMask to continue.";
      }

      setError(errorMessage);
      setUploadProgress({ ipfs: 0, blockchain: 0, status: "Upload failed." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setFileName("");
    setDescription("");
    setError(null);
    setIsSuccess(false);
    setUploadProgress({ ipfs: 0, blockchain: 0, status: "" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center mb-6">
        <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          Upload Medical Records
        </h2>
      </div>

      {!walletAddress && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center text-yellow-700">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <span>Please connect your wallet to upload medical records.</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF File
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                file
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100"
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ArrowUpTrayIcon
                  className={`h-10 w-10 mb-3 ${
                    file ? "text-green-500" : "text-gray-400"
                  }`}
                />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF files only (Max. 10MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,application/pdf"
                disabled={isLoading}
              />
            </label>
          </div>
          {fileName && (
            <div className="mt-2 text-sm text-green-600 truncate">
              <span className="font-medium">Selected file:</span> {fileName}
            </div>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Lab Results - January 2024, Medical History, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            disabled={isLoading}
            maxLength={200}
          />
          <p className="text-xs text-gray-500 mt-1">
            {description.length}/200 characters
          </p>
        </div>

        {/* Upload Progress */}
        {isLoading && (
          <div className="space-y-4">
            {/* IPFS Progress */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>IPFS Upload</span>
                <span>{uploadProgress.ipfs}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress.ipfs}%` }}
                ></div>
              </div>
            </div>

            {/* Blockchain Progress */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Blockchain Storage</span>
                <span>{uploadProgress.blockchain}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress.blockchain}%` }}
                ></div>
              </div>
            </div>

            {/* Status Message */}
            <div className="text-sm text-gray-500 text-center">
              {uploadProgress.status}
            </div>
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-700 mb-2">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">Upload Successful!</span>
            </div>
            <div className="text-sm text-green-600 space-y-1">
              <p>✓ PDF stored on IPFS</p>
              <p>✓ IPFS hash recorded on blockchain</p>
              <p>✓ Medical record is now secure and verifiable</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleUpload}
            disabled={isLoading || !file || !walletAddress}
            className={`flex-1 flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              isLoading || !file || !walletAddress
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                Store Securely
              </>
            )}
          </button>

          {(isSuccess || error) && (
            <button
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              Upload Another
            </button>
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <CubeIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 mb-1">
              Secure Storage Process
            </p>
            <p className="text-xs text-blue-600">
              Your PDF is stored on IPFS for decentralized storage. The IPFS hash is then recorded on the blockchain,
              creating an immutable record of your medical data. Only authorized parties with proper consent can access this information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;