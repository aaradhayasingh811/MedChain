// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import ContractService from "../config/contractService";
// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "patient",
//     licenseNumber: "",
//     organization: "",
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const registerOnBlockchain = async (role) => {
//     try {
//       // Initialize contract service
//       await ContractService.init();
      
//       // Register user based on their role using self-registration methods
//       switch (role) {
//         case "patient":
//           await ContractService.registerAsPatient();
//           break;
//         case "doctor":
//           await ContractService.registerAsDoctor();
//           break;
//         case "researcher":
//           await ContractService.registerAsResearcher();
//           break;
//         case "emergency":
//           await ContractService.registerAsEmergencyResponder();
//           break;
//         default:
//           throw new Error("Invalid role");
//       }
      
//       return true;
//     } catch (error) {
//       console.error("Blockchain registration failed:", error);
//       throw new Error(`Blockchain registration failed: ${error.message}`);
//     }
//   };

//   const getCurrentWalletAddress = async () => {
//     if (!window.ethereum) {
//       throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
//     }

//     try {
//       // Request account access
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
      
//       return accounts[0];
//     } catch (error) {
//       if (error.code === 4001) {
//         // User rejected the request
//         throw new Error("Please connect your MetaMask wallet to continue.");
//       } else {
//         throw new Error(`MetaMask connection failed: ${error.message}`);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     // Validate passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setLoading(false);
//       return setError("Passwords do not match.");
//     }

//     // Validate required fields for specific roles
//     if ((formData.role === "doctor" || formData.role === "emergency") && 
//         (!formData.licenseNumber || !formData.organization)) {
//       setLoading(false);
//       return setError("License number and organization are required for this role.");
//     }

//     if (formData.role === "researcher" && !formData.organization) {
//       setLoading(false);
//       return setError("Research institution is required for researchers.");
//     }

//     try {
//       // Step 1: Get user's wallet address
//       const walletAddress = await getCurrentWalletAddress();
//       console.log("Wallet address:", walletAddress);
      
//       // Step 2: Prepare payload for MongoDB registration
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//         walletAddress: walletAddress, // Include wallet address in the payload
//         licenseNumber:
//           formData.role === "doctor" || formData.role === "emergency"
//             ? formData.licenseNumber
//             : undefined,
//         organization: formData.organization,
//       };

//       console.log("Registering user in database...");
      
//       // Step 3: Register user in MongoDB
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
//         payload
//       );

//       console.log("Database registration successful:", response.data);

//       // Step 4: Register user on blockchain
//       try {
//         console.log("Registering on blockchain...");
//         await registerOnBlockchain(formData.role);
//         console.log("Blockchain registration successful");
        
//         // Success - navigate to login
//         navigate("/login", { 
//           state: { 
//             message: "Registration successful! You can now login.",
//             registrationType: "both"
//           }
//         });
//       } catch (blockchainError) {
//         console.error("Blockchain registration failed:", blockchainError);
        
//         // Handle specific blockchain errors
//         if (blockchainError.message?.includes("user rejected transaction")) {
//           setError("Transaction was rejected. Please try again and confirm the transaction.");
//         } else if (blockchainError.message?.includes("already registered")) {
//           // User might already be registered on blockchain but not in DB
//           navigate("/login", { 
//             state: { 
//               message: "Account created. You may already be registered on blockchain.",
//               registrationType: "db_only"
//             }
//           });
//         } else {
//           // Blockchain registration failed, but MongoDB registration succeeded
//           navigate("/login", { 
//             state: { 
//               message: "Account created, but blockchain registration failed. You can try again later from your profile.",
//               registrationType: "db_only",
//               warning: true
//             }
//           });
//         }
//         return;
//       }

//     } catch (err) {
//       console.error("Registration error:", err);
      
//       // Handle different types of errors
//       if (err.message?.includes("MetaMask")) {
//         setError(err.message);
//       } else if (err.response?.data?.msg) {
//         setError(err.response.data.msg);
//       } else if (err.message?.includes("already registered")) {
//         setError("This email or wallet address is already registered. Please try logging in.");
//       } else if (err.message) {
//         setError(err.message);
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Enhanced role selection with role descriptions
//   const roleDescriptions = {
//     patient: "Manage your health records and control access to your data",
//     doctor: "Access patient records with consent for medical treatment",
//     researcher: "Request anonymized data for academic research purposes",
//     emergency: "Emergency access to critical health information in life-threatening situations"
//   };

//   const roleRequirements = {
//     patient: "No additional requirements",
//     doctor: "Valid medical license required",
//     researcher: "Research institution affiliation required", 
//     emergency: "Emergency responder credentials required"
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create your MedChain account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Join our secure health data network
//         </p>
        
//         {/* Blockchain Info Banner */}
//         <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-blue-700">
//                 <strong>Blockchain Integration:</strong> Your role will be registered on the blockchain for enhanced security and transparency. You'll need to confirm the transaction in MetaMask.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-200">
//               <div className="flex items-center">
//                 <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 {error}
//               </div>
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Full name
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     disabled={loading}
//                     minLength={6}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Confirm Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     disabled={loading}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Registering as
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 {["patient", "doctor", "researcher", "emergency"].map((role) => (
//                   <button
//                     key={role}
//                     type="button"
//                     onClick={() => setFormData({ ...formData, role })}
//                     className={`py-3 px-4 border rounded-md text-sm font-medium transition-colors ${
//                       formData.role === role
//                         ? "bg-indigo-100 border-indigo-500 text-indigo-700 shadow-sm"
//                         : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                     } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     disabled={loading}
//                   >
//                     <div className="font-medium">
//                       {role.charAt(0).toUpperCase() + role.slice(1)}
//                       {role === 'emergency' && ' Responder'}
//                     </div>
//                   </button>
//                 ))}
//               </div>
              
//               <div className="mt-3 p-3 bg-gray-50 rounded-md">
//                 <p className="text-sm text-gray-700 font-medium">
//                   {roleDescriptions[formData.role]}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   <strong>Requirements:</strong> {roleRequirements[formData.role]}
//                 </p>
//               </div>
//             </div>

//             {(formData.role === "doctor" || formData.role === "emergency") && (
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label
//                     htmlFor="licenseNumber"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     License Number *
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       id="licenseNumber"
//                       name="licenseNumber"
//                       type="text"
//                       required
//                       value={formData.licenseNumber}
//                       onChange={handleChange}
//                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       disabled={loading}
//                       placeholder="Enter your professional license number"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="organization"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Hospital/Organization *
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       id="organization"
//                       name="organization"
//                       type="text"
//                       required
//                       value={formData.organization}
//                       onChange={handleChange}
//                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       disabled={loading}
//                       placeholder="Enter your hospital or organization name"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {formData.role === "researcher" && (
//               <div>
//                 <label
//                   htmlFor="organization"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Research Institution *
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="organization"
//                     name="organization"
//                     type="text"
//                     required
//                     value={formData.organization}
//                     onChange={handleChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     disabled={loading}
//                     placeholder="Enter your research institution name"
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="flex items-start">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 required
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
//                 disabled={loading}
//               />
//               <label
//                 htmlFor="terms"
//                 className="ml-2 block text-sm text-gray-900"
//               >
//                 I agree to the{" "}
//                 <Link
//                   to="/terms"
//                   className="text-indigo-600 hover:text-indigo-500 font-medium"
//                   target="_blank"
//                 >
//                   Terms of Service
//                 </Link>{" "}
//                 and{" "}
//                 <Link
//                   to="/privacy"
//                   className="text-indigo-600 hover:text-indigo-500 font-medium"
//                   target="_blank"
//                 >
//                   Privacy Policy
//                 </Link>. I understand that my role will be registered on the blockchain and this action requires a transaction confirmation.
//               </label>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
//                   loading
//                     ? 'bg-indigo-400 cursor-not-allowed'
//                     : 'bg-indigo-600 hover:bg-indigo-700'
//                 }`}
//               >
//                 {loading ? (
//                   <div className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing Registration...
//                   </div>
//                 ) : (
//                   <div className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Create Account & Register on Blockchain
//                   </div>
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Already have an account?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link
//                 to="/login"
//                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//               >
//                 Sign in to your account
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ContractService from "../config/contractService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    licenseNumber: "",
    organization: "",
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [step, setStep] = useState(1); // 1: Connect Wallet, 2: Fill Form, 3: Confirm

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      setWalletAddress(accounts[0]);
      setWalletConnected(true);
      setStep(2);
      setError(null);
    } catch (error) {
      if (error.code === 4001) {
        setError("Please connect your MetaMask wallet to continue.");
      } else {
        setError(`Wallet connection failed: ${error.message}`);
      }
    }
  };

  const registerOnBlockchain = async (role) => {
  try {
    await ContractService.init();

    // Check if the user already has the role
    const userAddress = await ContractService.signer.getAddress();

    let hasRole = false;
    switch (role) {
      case "patient":
        hasRole = await ContractService.contracts.roles.hasRole(
          await ContractService.contracts.roles.PATIENT_ROLE(),
          userAddress
        );
        break;
      case "doctor":
        hasRole = await ContractService.contracts.roles.hasRole(
          await ContractService.contracts.roles.DOCTOR_ROLE(),
          userAddress
        );
        break;
      case "researcher":
        hasRole = await ContractService.contracts.roles.hasRole(
          await ContractService.contracts.roles.RESEARCHER_ROLE(),
          userAddress
        );
        break;
      case "emergency":
        hasRole = await ContractService.contracts.roles.hasRole(
          await ContractService.contracts.roles.EMERGENCY_ROLE(),
          userAddress
        );
        break;
      default:
        throw new Error("Invalid role");
    }

    if (hasRole) {
      throw new Error("This wallet already has the selected role registered on blockchain.");
    }

    // If not already registered, perform transaction
    let tx;
    switch (role) {
      case "patient":
        tx = await ContractService.registerAsPatient();
        break;
      case "doctor":
        tx = await ContractService.registerAsDoctor();
        break;
      case "researcher":
        tx = await ContractService.registerAsResearcher();
        break;
      case "emergency":
        tx = await ContractService.registerAsEmergencyResponder();
        break;
    }

    return await tx.wait();
  } catch (error) {
    console.error("Blockchain registration failed:", error);

    if (error.message?.includes("user rejected transaction")) {
      throw new Error("Transaction was rejected. Please confirm the transaction in MetaMask.");
    } else if (error.message?.includes("insufficient funds")) {
      throw new Error("Insufficient funds for transaction. Please ensure you have enough ETH for gas fees.");
    } else {
      throw new Error(`Blockchain registration failed: ${error.message}`);
    }
  }
};

  const validateForm = () => {
    // Password validation
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    // Role-specific validation
    if ((formData.role === "doctor" || formData.role === "emergency") && 
        (!formData.licenseNumber.trim() || !formData.organization.trim())) {
      return "License number and organization are required for this role.";
    }

    if (formData.role === "researcher" && !formData.organization.trim()) {
      return "Research institution is required for researchers.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Form validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Step 1: Register user in MongoDB
      const payload = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        role: formData.role,
        walletAddress: walletAddress,
        licenseNumber: (formData.role === "doctor" || formData.role === "emergency") 
          ? formData.licenseNumber.trim() 
          : undefined,
        organization: formData.organization.trim(),
      };

      console.log("Registering user in database...");
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        payload,
        {
          timeout: 30000, // 30 second timeout
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("Database registration successful:", response.data);

      // Step 2: Register user on blockchain
      try {
        console.log("Registering on blockchain...");
        setStep(3); // Move to confirmation step
        
        const receipt = await registerOnBlockchain(formData.role);
        console.log("Blockchain registration successful:", receipt);
        
        // Success - navigate to login
        navigate("/login", { 
          state: { 
            message: "Registration successful! Your account has been created and registered on the blockchain.",
            registrationType: "both",
            success: true
          }
        });
        
      } catch (blockchainError) {
        console.error("Blockchain registration failed:", blockchainError);
        
        // Handle partial success (DB success, blockchain failure)
        navigate("/login", { 
          state: { 
            message: "Account created successfully! However, blockchain registration failed. You can complete blockchain registration later from your profile.",
            registrationType: "db_only",
            warning: true,
            email: formData.email
          }
        });
        return;
      }

    } catch (err) {
      console.error("Registration error:", err);
      
      // Enhanced error handling
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError("This email or wallet address is already registered. Please try logging in.");
        } else if (err.response?.data?.msg) {
          setError(err.response.data.msg);
        } else if (err.code === 'ECONNABORTED') {
          setError("Request timeout. Please check your connection and try again.");
        } else if (err.response?.status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Registration failed. Please check your connection and try again.");
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Role descriptions and requirements
  const roleDescriptions = {
    patient: "Manage your health records and control access to your data",
    doctor: "Access patient records with consent for medical treatment",
    researcher: "Request anonymized data for academic research purposes",
    emergency: "Emergency access to critical health information in life-threatening situations"
  };

  const roleRequirements = {
    patient: "No additional requirements",
    doctor: "Valid medical license required",
    researcher: "Research institution affiliation required", 
    emergency: "Emergency responder credentials required"
  };

  const roleIcons = {
    patient: "👤",
    doctor: "👨‍⚕️",
    researcher: "🔬", 
    emergency: "🚑"
  };

  // Render step 1: Connect Wallet
  const renderConnectWalletStep = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">Connect Your Wallet</h3>
      <p className="mt-2 text-sm text-gray-600">
        To register on MedChain, you need to connect your MetaMask wallet. This will be used for blockchain transactions and role verification.
      </p>
      <div className="mt-6">
        <button
          onClick={connectWallet}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
          </svg>
          Connect MetaMask Wallet
        </button>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Don't have MetaMask?{" "}
        <a 
          href="https://metamask.io/download.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Download here
        </a>
      </div>
    </div>
  );

  // Render step 2: Fill Form
  const renderFormStep = () => (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Wallet Info */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-green-800">Wallet Connected</p>
            <p className="text-xs text-green-600">
              {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="ml-auto text-xs text-green-600 hover:text-green-800"
          >
            Change
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full name *
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address *
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password *
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
              minLength={6}
              placeholder="At least 6 characters"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password *
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
              placeholder="Confirm your password"
            />
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registering as *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["patient", "doctor", "researcher", "emergency"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData({ ...formData, role })}
              className={`py-3 px-4 border rounded-md text-sm font-medium transition-colors text-left ${
                formData.role === role
                  ? "bg-indigo-100 border-indigo-500 text-indigo-700 shadow-sm"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              <div className="flex items-center">
                <span className="text-lg mr-2">{roleIcons[role]}</span>
                <div>
                  <div className="font-medium">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                    {role === 'emergency' && ' Responder'}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-3 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700 font-medium">
            {roleDescriptions[formData.role]}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <strong>Requirements:</strong> {roleRequirements[formData.role]}
          </p>
        </div>
      </div>

      {/* Role-specific fields */}
      {(formData.role === "doctor" || formData.role === "emergency") && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
              License Number *
            </label>
            <div className="mt-1">
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                required
                value={formData.licenseNumber}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={loading}
                placeholder="Enter your professional license number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              Hospital/Organization *
            </label>
            <div className="mt-1">
              <input
                id="organization"
                name="organization"
                type="text"
                required
                value={formData.organization}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={loading}
                placeholder="Enter your hospital or organization name"
              />
            </div>
          </div>
        </div>
      )}

      {formData.role === "researcher" && (
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Research Institution *
          </label>
          <div className="mt-1">
            <input
              id="organization"
              name="organization"
              type="text"
              required
              value={formData.organization}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
              placeholder="Enter your research institution name"
            />
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
          disabled={loading}
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          I agree to the{" "}
          <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 font-medium" target="_blank">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium" target="_blank">
            Privacy Policy
          </Link>. I understand that my role will be registered on the blockchain and this action requires a transaction confirmation.
        </label>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          disabled={loading}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
            loading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Continue to Blockchain Registration"
          )}
        </button>
      </div>
    </form>
  );

  // Render step 3: Confirmation
  const renderConfirmationStep = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
        <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">Confirm Blockchain Registration</h3>
      <p className="mt-2 text-sm text-gray-600">
        Please confirm the transaction in your MetaMask wallet to complete your registration on the blockchain.
      </p>
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-700">
          <strong>Note:</strong> This transaction requires gas fees. Make sure you have sufficient ETH in your wallet.
        </p>
      </div>
      <div className="mt-6">
        <div className="animate-pulse bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-600">Waiting for transaction confirmation...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your MedChain account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our secure health data network
        </p>
        
        {/* Progress Steps */}
        <div className="mt-6">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === stepNumber 
                    ? 'bg-indigo-600 text-white' 
                    : step > stepNumber 
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}>
                  {step > stepNumber ? '✓' : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-1 mx-2 w-16 ${
                    step > stepNumber ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-4">
            <span>Connect Wallet</span>
            <span>Fill Details</span>
            <span>Confirm</span>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-200">
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Step Content */}
          {step === 1 && renderConnectWalletStep()}
          {step === 2 && renderFormStep()}
          {step === 3 && renderConfirmationStep()}

          {/* Login Link */}
          {step !== 3 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;