// import { useState } from "react";
// import { BeakerIcon, ChartBarIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

// const ResearchPortal = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedDataset, setSelectedDataset] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [consentChecked, setConsentChecked] = useState(false);

//   const datasets = [
//     { id: "diabetes", name: "Diabetes Study Dataset (2023)", patients: "4,231" },
//     { id: "cardio", name: "Cardiovascular Health (2022-2023)", patients: "8,742" },
//     { id: "cancer", name: "Oncology Treatment Outcomes", patients: "1,532" },
//   ];

//   const accessAnonymizedData = async () => {
//     if (!selectedDataset) {
//       setError("Please select a dataset");
//       return;
//     }

//     if (!purpose) {
//       setError("Please describe your research purpose");
//       return;
//     }

//     if (!consentChecked) {
//       setError("You must agree to the terms of use");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setIsSuccess(false);

//     try {
//       // Simulate data access process
//       await new Promise(resolve => setTimeout(resolve, 2500));
      
//       // Your actual contract + backend call would go here:
//       // await researchContract.requestDataAccess(selectedDataset, purpose);
      
//       setIsSuccess(true);
//     } catch (err) {
//       setError(err.message || "Failed to access research data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       <div className="flex items-center mb-8">
//         <BeakerIcon className="h-8 w-8 text-purple-600 mr-2" />
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Research Data Portal</h2>
//           <p className="text-sm text-gray-500">Access anonymized medical data for approved research</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="md:col-span-2 space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Dataset
//             </label>
//             <div className="space-y-2">
//               {datasets.map((dataset) => (
//                 <div 
//                   key={dataset.id}
//                   onClick={() => setSelectedDataset(dataset.id)}
//                   className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                     selectedDataset === dataset.id 
//                       ? "border-purple-500 bg-purple-50" 
//                       : "border-gray-200 hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-4 h-4 rounded-full border mr-3 ${
//                       selectedDataset === dataset.id 
//                         ? "bg-purple-500 border-purple-500" 
//                         : "border-gray-300"
//                     }`}></div>
//                     <div>
//                       <p className="font-medium text-gray-800">{dataset.name}</p>
//                       <p className="text-xs text-gray-500">{dataset.patients} anonymized patients</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Research Purpose
//             </label>
//             <textarea
//               placeholder="Describe your research objectives and how this data will be used..."
//               value={purpose}
//               onChange={(e) => setPurpose(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//               rows={4}
//             />
//           </div>

//           <div className="flex items-start">
//             <div className="flex items-center h-5">
//               <input
//                 id="consent"
//                 name="consent"
//                 type="checkbox"
//                 checked={consentChecked}
//                 onChange={(e) => setConsentChecked(e.target.checked)}
//                 className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//               />
//             </div>
//             <div className="ml-3 text-sm">
//               <label htmlFor="consent" className="font-medium text-gray-700">
//                 I agree to the terms of use
//               </label>
//               <p className="text-gray-500">
//                 I will not attempt to re-identify patients and will use this data only for the stated research purpose.
//               </p>
//             </div>
//           </div>

//           {error && (
//             <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
//               <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
//               <span>{error}</span>
//             </div>
//           )}

//           {isSuccess && (
//             <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
//               <CheckCircleIcon className="h-5 w-5 mr-2" />
//               <span>Access granted! Download link sent to your registered email.</span>
//             </div>
//           )}

//           <button
//             onClick={accessAnonymizedData}
//             disabled={isLoading || !selectedDataset || !purpose || !consentChecked}
//             className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
//               isLoading 
//                 ? "bg-purple-400 cursor-not-allowed" 
//                 : (!selectedDataset || !purpose || !consentChecked) 
//                   ? "bg-gray-400 cursor-not-allowed" 
//                   : "bg-purple-600 hover:bg-purple-700"
//             }`}
//           >
//             {isLoading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing Request...
//               </>
//             ) : (
//               "Request Data Access"
//             )}
//           </button>
//         </div>

//         <div className="bg-gray-50 rounded-lg p-6">
//           <div className="flex items-center mb-4">
//             <DocumentMagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
//             <h3 className="font-medium text-gray-800">How This Works</h3>
//           </div>
//           <ul className="space-y-3 text-sm text-gray-600">
//             <li className="flex items-start">
//               <span className="text-purple-500 mr-2">•</span>
//               <span>All data is fully anonymized and aggregated</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-purple-500 mr-2">•</span>
//               <span>Requests are logged on blockchain for transparency</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-purple-500 mr-2">•</span>
//               <span>Approval typically takes 1-3 business days</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-purple-500 mr-2">•</span>
//               <span>You'll receive a secure download link upon approval</span>
//             </li>
//           </ul>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <div className="flex items-center mb-2">
//               <ChartBarIcon className="h-5 w-5 text-gray-500 mr-2" />
//               <h3 className="font-medium text-gray-800">Available Datasets</h3>
//             </div>
//             <div className="text-xs text-gray-500 space-y-1">
//               {datasets.map(dataset => (
//                 <div key={dataset.id} className="flex justify-between">
//                   <span>{dataset.name}</span>
//                   <span>{dataset.patients}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResearchPortal;
// src/components/ResearchPortal.jsx
import { useState } from "react";
import { BeakerIcon, ChartBarIcon, DocumentMagnifyingGlassIcon, ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ContractService from "../config/contractService";
import { useWallet } from "../context/WalletContext";

const ResearchPortal = () => {
  const { walletAddress } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [purpose, setPurpose] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);

  const datasets = [
    { id: "diabetes", name: "Diabetes Study Dataset (2023)", patients: "4,231", description: "Anonymized diabetes patient data including treatment outcomes" },
    { id: "cardio", name: "Cardiovascular Health (2022-2023)", patients: "8,742", description: "Cardiovascular disease risk factors and outcomes" },
    { id: "cancer", name: "Oncology Treatment Outcomes", patients: "1,532", description: "Cancer treatment response and survival data" },
  ];

  const accessAnonymizedData = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet first");
      return;
    }

    if (!selectedDataset) {
      setError("Please select a dataset");
      return;
    }

    if (!purpose) {
      setError("Please describe your research purpose");
      return;
    }

    if (!consentChecked) {
      setError("You must agree to the terms of use");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Check if user is registered as researcher
      await ContractService.init();
      const isResearcher = await ContractService.hasRole(
        ContractService.ROLES.RESEARCHER, 
        walletAddress
      );

      if (!isResearcher) {
        setError("You need to be registered as a researcher to access research data");
        return;
      }

      // Simulate data access process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Your actual contract + backend call would go here:
      // await researchContract.requestDataAccess(selectedDataset, purpose);
      
      // Log the research data request (in real implementation, this would be on-chain)
      console.log("Research data request:", {
        researcher: walletAddress,
        dataset: selectedDataset,
        purpose: purpose,
        timestamp: new Date().toISOString()
      });
      
      setIsSuccess(true);
    } catch (err) {
      console.error("Research access error:", err);
      let errorMessage = err.message || "Failed to access research data";
      
      if (err.message?.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected. Please try again.";
      } else if (err.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction gas fees.";
      } else if (err.message?.includes("Not a registered researcher")) {
        errorMessage = "You need to register as a researcher first";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center mb-8">
        <BeakerIcon className="h-8 w-8 text-purple-600 mr-2" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Research Data Portal</h2>
          <p className="text-sm text-gray-500">Access anonymized medical data for approved research</p>
        </div>
      </div>

      {walletAddress && (
        <div className="mb-6 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-700">
            Connected as researcher: {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Dataset
            </label>
            <div className="space-y-2">
              {datasets.map((dataset) => (
                <div 
                  key={dataset.id}
                  onClick={() => setSelectedDataset(dataset.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedDataset === dataset.id 
                      ? "border-purple-500 bg-purple-50" 
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border mr-3 ${
                      selectedDataset === dataset.id 
                        ? "bg-purple-500 border-purple-500" 
                        : "border-gray-300"
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{dataset.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{dataset.patients} anonymized patients</p>
                      <p className="text-xs text-gray-600 mt-2">{dataset.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Research Purpose
            </label>
            <textarea
              placeholder="Describe your research objectives, methodology, and how this data will be used. Include information about your research institution and any approvals you have obtained."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={4}
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700">
                I agree to the research data usage terms
              </label>
              <p className="text-gray-500">
                I will not attempt to re-identify patients, will use this data only for the stated research purpose, 
                will maintain data security, and will cite appropriately in any publications.
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span>Research data access approved! Download link and documentation sent to your registered email.</span>
            </div>
          )}

          <button
            onClick={accessAnonymizedData}
            disabled={isLoading || !selectedDataset || !purpose || !consentChecked || !walletAddress}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              isLoading 
                ? "bg-purple-400 cursor-not-allowed" 
                : (!selectedDataset || !purpose || !consentChecked || !walletAddress) 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Request...
              </>
            ) : (
              "Request Data Access"
            )}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <DocumentMagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-medium text-gray-800">How This Works</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>All data is fully anonymized and aggregated to protect patient privacy</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>Requests are logged on blockchain for transparency and auditability</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>Approval typically takes 1-3 business days for review</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>You'll receive a secure download link upon approval</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>All research must comply with ethical guidelines and data protection laws</span>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center mb-2">
              <ChartBarIcon className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-800">Available Datasets</h3>
            </div>
            <div className="text-xs text-gray-500 space-y-2">
              {datasets.map(dataset => (
                <div key={dataset.id} className="flex justify-between items-start">
                  <span className="flex-1">{dataset.name}</span>
                  <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    {dataset.patients}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">Requirements</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Valid researcher registration</li>
              <li>• Institutional affiliation</li>
              <li>• IRB/ethics approval</li>
              <li>• Data usage agreement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPortal;