import axios from "axios";
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
      
      const hasPatientRole = await ContractService.hasRole(
        ContractService.ROLES.PATIENT,
        walletAddress
      );

      console.log("Patient role check:", hasPatientRole);
      
      if (!hasPatientRole) {
        throw new Error("You must register as a patient first. Please complete your registration on the blockchain.");
      }

      updateProgress("blockchain", 50, "Blockchain ready for transaction");
      return true;
    } catch (error) {
      console.error("Blockchain readiness check failed:", error);
      throw error;
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

      // Convert fileSize to BigInt for uint256 compatibility
      const sizeBN = BigInt(fileSize);
      
      const receipt = await ContractService.addMedicalRecord(
        ipfsHash,
        fileType,
        sizeBN,
        description || "Medical Record",
      );

      updateProgress("blockchain", 100, "Blockchain storage complete!");
      return receipt;
    } catch (error) {
      console.error("Blockchain storage failed:", error);
      throw error;
    }
  };

  const uploadToIPFS = async () => {
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
      // Step 1: Upload to IPFS via backend
      updateProgress("ipfs", 30, "Encrypting and uploading to IPFS...");

      const formData = new FormData();
      formData.append("file", file);
      if (description) {
        formData.append("description", description);
      }

      /*
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

      updateProgress("ipfs", 100, "IPFS upload complete!");
      console.log("Upload response:", response.data);

      const { cid } = response.data;
      */

      // Temporary mock response for testing
      const mockResponse = {
        cid: "Qsr",
        message: "PDF text encrypted and uploaded to Pinata (IPFS)"
      };

      updateProgress("ipfs", 100, "IPFS upload complete!");
      const { cid } = mockResponse;

      if (!cid) {
        throw new Error("IPFS hash not returned from server");
      }

      // Step 2: Store IPFS hash on blockchain
      const blockchainReceipt = await storeOnBlockchain(
        cid,
        "pdf",
          12,
          "test"
      );
      // const blockchainReceipt = await storeOnBlockchain(
      //   cid,
      //   "pdf",
      //   file.size.toString(),
      //   description || fileName
      // );

      // Success
      setIsSuccess(true);
      setFile(null);
      setFileName("");
      setDescription("");
      setUploadProgress({ ipfs: 0, blockchain: 0, status: "Upload complete!" });

      console.log("Full upload process completed:", {
        cid,
        blockchainTx: blockchainReceipt.transactionHash,
      });

    } catch (err) {
      console.error("Upload process failed:", err);
      
      let errorMessage = err.response?.data?.error || err.message || "Failed to upload PDF";
      
      // Provide user-friendly error messages
      if (errorMessage.includes("user rejected")) {
        errorMessage = "Transaction was rejected. Please try again and confirm the transaction in MetaMask.";
      } else if (errorMessage.includes("insufficient gas")) {
        errorMessage = "Insufficient gas. Please ensure you have enough ETH for gas fees.";
      } else if (errorMessage.includes("register as a patient")) {
        errorMessage = "Please complete your patient registration on the blockchain before uploading records.";
      } else if (errorMessage.includes("revert")) {
        errorMessage = "Transaction failed. You may not have permission to add records or the contract call failed.";
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
              }`}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
            maxLength={200}
          />
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
              <p>✓ PDF encrypted and stored on IPFS</p>
              <p>✓ IPFS hash recorded on blockchain</p>
              <p>✓ Medical record is now secure and verifiable</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={uploadToIPFS}
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
                Encrypt & Store Securely
              </>
            )}
          </button>

          {(isSuccess || error) && (
            <button
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
              Your PDF is encrypted and stored on IPFS for decentralized
              storage. The IPFS hash is then recorded on the blockchain,
              creating an immutable record of your medical data. Only authorized
              parties with proper consent can access this information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;

// import { useState } from "react";
// import { ethers } from "ethers";
// import {
//   ArrowUpTrayIcon,
//   DocumentTextIcon,
//   CheckCircleIcon,
//   ExclamationCircleIcon,
// } from "@heroicons/react/24/outline";
// import ContractService from "../config/contractService";
// import { useWallet } from "../context/WalletContext";
// import ContractDiagnostic from "./ContractDiagnostic";

// const UploadData = () => {
//   const { walletAddress } = useWallet();
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [description, setDescription] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [debugInfo, setDebugInfo] = useState("");
//   const [useFallback, setUseFallback] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf"))) {
//       setFileName(selectedFile.name);
//       setFile(selectedFile);
//       setError(null);
//     }
//   };

//   const addDebugInfo = (message) => {
//     setDebugInfo(prev => prev + `\n${new Date().toLocaleTimeString()}: ${message}`);
//   };

//   const testDirectTransaction = async () => {
//     addDebugInfo("Testing direct transaction...");
    
//     try {
//       await ContractService.init();
//       const provider = ContractService.provider;
//       const signer = ContractService.signer;
      
//       // Get the contract ABI for just the addMedicalRecord function
//       const abi = [
//         "function addMedicalRecord(string ipfsHash, string fileType, uint256 fileSize, string description)"
//       ];
      
//       const contractAddress = await ContractService.contracts.medicalRecords.getAddress();
//       const contract = new ethers.Contract(contractAddress, abi, signer);
      
//       addDebugInfo(`Contract address: ${contractAddress}`);
      
//       // Try a direct call with manual gas estimation
//       const ipfsHash = "QmTEST123456789012345678901234567890123456789012";
      
//       // Manually build the transaction
//       const transaction = {
//         to: contractAddress,
//         data: contract.interface.encodeFunctionData("addMedicalRecord", [
//           ipfsHash,
//           "pdf",
//           BigInt(1000),
//           "Test Record"
//         ]),
//         gasLimit: 5000000
//       };
      
//       addDebugInfo("Sending manual transaction...");
//       const tx = await signer.sendTransaction(transaction);
//       addDebugInfo(`Transaction sent: ${tx.hash}`);
      
//       const receipt = await tx.wait();
//       addDebugInfo(`Transaction confirmed: ${receipt.blockNumber}`);
      
//       return { success: true, receipt };
      
//     } catch (error) {
//       addDebugInfo(`Direct transaction failed: ${error.message}`);
//       return { success: false, error };
//     }
//   };

//   const uploadWithFallback = async () => {
//     addDebugInfo("Starting fallback upload process...");
    
//     // Fallback 1: Store in localStorage as a temporary solution
//     const record = {
//       ipfsHash: "QmSBTcsiPE5pfmCoGNbNyYReJwW45u2HE3KgATVVqGthmv",
//       fileName: fileName,
//       description: description,
//       fileSize: file.size,
//       timestamp: new Date().toISOString(),
//       walletAddress: walletAddress,
//       status: "pending_blockchain"
//     };
    
//     // Store in localStorage
//     const existingRecords = JSON.parse(localStorage.getItem('pendingMedicalRecords') || '[]');
//     existingRecords.push(record);
//     localStorage.setItem('pendingMedicalRecords', JSON.stringify(existingRecords));
    
//     addDebugInfo("Record stored in localStorage temporarily");
    
//     // Fallback 2: Try to send to a backup API endpoint
//     try {
//       const response = await fetch('/api/record-fallback', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(record)
//       });
      
//       if (response.ok) {
//         addDebugInfo("Record also sent to backup API");
//       }
//     } catch (apiError) {
//       addDebugInfo(`Backup API failed: ${apiError.message}`);
//     }
    
//     return { success: true, fallback: true, record };
//   };

//   const uploadToBlockchain = async () => {
//     if (!file || !walletAddress) return;

//     setIsLoading(true);
//     setError(null);
//     setDebugInfo("Starting upload process...\n");

//     try {
//       await ContractService.init();
//       addDebugInfo("ContractService initialized");

//       // Strategy 1: Try direct transaction first
//       addDebugInfo("Attempting direct transaction...");
//       const directResult = await testDirectTransaction();
      
//       if (directResult.success) {
//         addDebugInfo("✅ Direct transaction successful!");
//         setIsSuccess(true);
//         return;
//       }

//       // Strategy 2: If direct fails, try fallback
//       addDebugInfo("Direct transaction failed, trying fallback...");
//       const fallbackResult = await uploadWithFallback();
      
//       if (fallbackResult.success) {
//         addDebugInfo("✅ Fallback storage successful!");
//         setIsSuccess(true);
//         setUseFallback(true);
//         return;
//       }

//       throw new Error("All upload strategies failed");

//     } catch (err) {
//       console.error("Upload failed:", err);
//       setError(`Upload failed: ${err.message}`);
//       addDebugInfo(`❌ Final error: ${err.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFile(null);
//     setFileName("");
//     setDescription("");
//     setError(null);
//     setIsSuccess(false);
//     setDebugInfo("");
//     setUseFallback(false);
//   };

//   const checkPendingRecords = () => {
//     const pending = JSON.parse(localStorage.getItem('pendingMedicalRecords') || '[]');
//     addDebugInfo(`Pending records in localStorage: ${pending.length}`);
//     return pending;
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center">
//           <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-2" />
//           <h2 className="text-2xl font-bold text-gray-800">Upload Medical Records</h2>
//         </div>
//         <div className="text-sm text-gray-500">
//           {useFallback && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Using Fallback Storage</span>}
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Left Column - Upload Form */}
//         <div className="lg:col-span-1 space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Upload PDF File
//             </label>
//             <div className="flex items-center justify-center w-full">
//               <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
//                 file ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
//               }`}>
//                 <ArrowUpTrayIcon className={`h-8 w-8 mb-2 ${file ? "text-green-500" : "text-gray-400"}`} />
//                 <p className="text-sm text-gray-500">Click to upload PDF</p>
//                 <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,application/pdf" />
//               </label>
//             </div>
//             {fileName && <div className="mt-2 text-sm text-green-600">Selected: {fileName}</div>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Medical record description"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           {error && (
//             <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
//               <ExclamationCircleIcon className="h-5 w-5 mr-2" />
//               <span>{error}</span>
//             </div>
//           )}

//           {isSuccess && (
//             <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
//               <CheckCircleIcon className="h-5 w-5 mr-2" />
//               <span>
//                 {useFallback 
//                   ? "Record stored temporarily (blockchain unavailable)" 
//                   : "Upload successful!"}
//               </span>
//             </div>
//           )}

//           <div className="space-y-2">
//             <button
//               onClick={uploadToBlockchain}
//               disabled={isLoading || !file || !walletAddress}
//               className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
//                 isLoading || !file || !walletAddress ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//             >
//               {isLoading ? "Uploading..." : "Upload to Blockchain"}
//             </button>

//             <button
//               onClick={checkPendingRecords}
//               className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//             >
//               Check Pending Records
//             </button>

//             {(isSuccess || error) && (
//               <button onClick={resetForm} className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
//                 Reset Form
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Middle Column - Debug Information */}
//         <div className="lg:col-span-1">
//           <div className="p-4 bg-gray-100 rounded-lg h-full">
//             <h3 className="font-bold mb-2">Debug Information</h3>
//             <div className="text-sm bg-black text-green-400 p-3 rounded font-mono whitespace-pre-wrap overflow-auto h-64">
//               {debugInfo || "Debug information will appear here..."}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Diagnostic Tools */}
//         <div className="lg:col-span-1">
//           <ContractDiagnostic />
          
//           <div className="mt-4 p-4 bg-red-50 rounded-lg">
//             <h4 className="font-bold text-red-800 mb-2">Critical Issue Detected</h4>
//             <p className="text-sm text-red-700">
//               Both contracts are failing with "missing revert data". This usually means:
//             </p>
//             <ul className="text-sm text-red-700 list-disc list-inside mt-2 space-y-1">
//               <li>Contracts are not properly deployed</li>
//               <li>ABI doesn't match the deployed code</li>
//               <li>Contracts are on the wrong network</li>
//               <li>There's a fundamental issue with the contract implementation</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Fallback Information */}
//       {useFallback && (
//         <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//           <h4 className="font-bold text-blue-800 mb-2">Fallback Mode Active</h4>
//           <p className="text-sm text-blue-700">
//             Your records are being stored temporarily. Once the blockchain issue is resolved, 
//             you can retry uploading these records to the blockchain.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadData;