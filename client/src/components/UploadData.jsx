import axios from "axios";
import { useState } from "react";
import { ArrowUpTrayIcon, DocumentTextIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if the file is a PDF
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith('.pdf')) {
        setFileName(selectedFile.name);
        setFile(selectedFile);
      } else {
        setError("Please upload a PDF file only");
        setFile(null);
        setFileName("");
      }
    }
  };

  const uploadToIPFS = async () => {
    if (!file) {
      setError("Please upload a PDF file");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/upload/pdf-to-fhir`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response.data);
      setIsSuccess(true);
      setFile(null);
      setFileName("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to upload PDF");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center mb-6">
        <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Upload Medical Records</h2>
      </div>

      <div className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF File
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ArrowUpTrayIcon className="h-10 w-10 text-gray-400 mb-3" />
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
              />
            </label>
          </div>
          {fileName && (
            <div className="mt-2 text-sm text-gray-600 truncate">
              <span className="font-medium">Selected file:</span> {fileName}
            </div>
          )}
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
            <span>PDF uploaded successfully to IPFS!</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={uploadToIPFS}
          disabled={isLoading || !file}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading 
              ? "bg-indigo-400 cursor-not-allowed" 
              : !file 
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
              Uploading...
            </>
          ) : (
            "Encrypt & Upload to IPFS"
          )}
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-6 text-sm text-gray-500">
        <p>All PDFs are encrypted before being stored on IPFS. Only authorized parties with the correct decryption keys can access this information.</p>
      </div>
    </div>
  );
};

export default UploadData;