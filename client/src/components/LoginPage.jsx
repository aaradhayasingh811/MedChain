// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("patient");
//   const [error, setError] = useState(null);
//   const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
//   const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: OTP, 3: new password
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [forgotPasswordError, setForgotPasswordError] = useState(null);
//   const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     console.log(password)

//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
//         {
//           email,
//           password,
//           role,
//         }
//       );

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // Redirect to dashboard or role-specific page
//       navigate("/upload");
//     } catch (err) {
//       const msg = err.response?.data?.msg || "Login failed. Please try again.";
//       setError(msg);
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setForgotPasswordError(null);
    
//     if (!forgotPasswordEmail) {
//       return setForgotPasswordError("Please enter your email address");
//     }

//     try {
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
//         email: forgotPasswordEmail
//       });
//       setForgotPasswordStep(2);
//       setForgotPasswordSuccess("OTP has been sent to your email");
//     } catch (err) {
//       setForgotPasswordError(err.response?.data?.msg || "Failed to send OTP. Please try again.");
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setForgotPasswordError(null);
    
//     if (!otp) {
//       return setForgotPasswordError("Please enter the OTP");
//     }

//     try {
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`, {
//         email: forgotPasswordEmail,
//         otp
//       });
//       setForgotPasswordStep(3);
//       setForgotPasswordSuccess("OTP verified successfully");
//     } catch (err) {
//       setForgotPasswordError(err.response?.data?.msg || "Invalid OTP. Please try again.");
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setForgotPasswordError(null);
//     console.log(newPassword);
//     console.log(confirmNewPassword)

//     if (newPassword !== confirmNewPassword) {
//       return setForgotPasswordError("Passwords do not match");
//     }

//     try {
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, {
//         email: forgotPasswordEmail,
//         newPassword,
//         otp
//       });
//       setForgotPasswordSuccess("Password reset successfully. You can now login with your new password.");
//       setTimeout(() => {
//         setShowForgotPasswordModal(false);
//         setForgotPasswordStep(1);
//         setForgotPasswordEmail("");
//         setOtp("");
//         setNewPassword("");
//         setConfirmNewPassword("");
//       }, 2000);
//     } catch (err) {
//       setForgotPasswordError(err.response?.data?.msg || "Failed to reset password. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       {/* Forgot Password Modal */}
//       {showForgotPasswordModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium text-gray-900">
//                 {forgotPasswordStep === 1 && "Forgot Password"}
//                 {forgotPasswordStep === 2 && "Verify OTP"}
//                 {forgotPasswordStep === 3 && "Reset Password"}
//               </h3>
//               <button
//                 onClick={() => {
//                   setShowForgotPasswordModal(false);
//                   setForgotPasswordStep(1);
//                   setForgotPasswordEmail("");
//                   setOtp("");
//                   setNewPassword("");
//                   setConfirmNewPassword("");
//                   setForgotPasswordError(null);
//                   setForgotPasswordSuccess(null);
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {forgotPasswordSuccess && (
//               <div className="mb-4 text-sm text-green-600 bg-green-100 p-2 rounded">
//                 {forgotPasswordSuccess}
//               </div>
//             )}

//             {forgotPasswordError && (
//               <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
//                 {forgotPasswordError}
//               </div>
//             )}

//             {forgotPasswordStep === 1 && (
//               <form onSubmit={handleForgotPassword} className="space-y-4">
//                 <div>
//                   <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700">
//                     Email address
//                   </label>
//                   <input
//                     id="forgotPasswordEmail"
//                     type="email"
//                     required
//                     value={forgotPasswordEmail}
//                     onChange={(e) => setForgotPasswordEmail(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Send OTP
//                 </button>
//               </form>
//             )}

//             {forgotPasswordStep === 2 && (
//               <form onSubmit={handleVerifyOtp} className="space-y-4">
//                 <div>
//                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                     Enter OTP sent to {forgotPasswordEmail}
//                   </label>
//                   <input
//                     id="otp"
//                     type="text"
//                     required
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Verify OTP
//                 </button>
//               </form>
//             )}

//             {forgotPasswordStep === 3 && (
//               <form onSubmit={handleResetPassword} className="space-y-4">
//                 <div>
//                   <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                     New Password
//                   </label>
//                   <input
//                     id="newPassword"
//                     type="password"
//                     required
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
//                     Confirm New Password
//                   </label>
//                   <input
//                     id="confirmNewPassword"
//                     type="password"
//                     required
//                     value={confirmNewPassword}
//                     onChange={(e) => setConfirmNewPassword(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Reset Password
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Sign in to MedChain
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Select your role to continue
//         </p>
//       </div>

//       {error && (
//         <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
//           {error}
//         </div>
//       )}

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 I am a
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setRole("patient")}
//                   className={`py-2 px-4 border rounded-md text-sm font-medium ${
//                     role === "patient"
//                       ? "bg-indigo-100 border-indigo-500 text-indigo-700"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   Patient
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setRole("doctor")}
//                   className={`py-2 px-4 border rounded-md text-sm font-medium ${
//                     role === "doctor"
//                       ? "bg-indigo-100 border-indigo-500 text-indigo-700"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   Doctor
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setRole("researcher")}
//                   className={`py-2 px-4 border rounded-md text-sm font-medium ${
//                     role === "researcher"
//                       ? "bg-indigo-100 border-indigo-500 text-indigo-700"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   Researcher
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setRole("emergency")}
//                   className={`py-2 px-4 border rounded-md text-sm font-medium ${
//                     role === "emergency"
//                       ? "bg-indigo-100 border-indigo-500 text-indigo-700"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   Emergency Responder
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPasswordModal(true)}
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Forgot your password?
//                 </button>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign in
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
//                   Don't have an account?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link
//                 to="/register"
//                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Register
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState(null);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email,
          password,
          role,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user); // Set user state in parent component

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.msg || "Login failed. Please try again.";
      setError(msg);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordError(null);
    
    if (!forgotPasswordEmail) {
      return setForgotPasswordError("Please enter your email address");
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
        email: forgotPasswordEmail
      });
      setForgotPasswordStep(2);
      setForgotPasswordSuccess("OTP has been sent to your email");
    } catch (err) {
      setForgotPasswordError(err.response?.data?.msg || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setForgotPasswordError(null);
    
    if (!otp) {
      return setForgotPasswordError("Please enter the OTP");
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`, {
        email: forgotPasswordEmail,
        otp
      });
      setForgotPasswordStep(3);
      setForgotPasswordSuccess("OTP verified successfully");
    } catch (err) {
      setForgotPasswordError(err.response?.data?.msg || "Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordError(null);

    if (newPassword !== confirmNewPassword) {
      return setForgotPasswordError("Passwords do not match");
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, {
        email: forgotPasswordEmail,
        newPassword,
        otp
      });
      setForgotPasswordSuccess("Password reset successfully. You can now login with your new password.");
      setTimeout(() => {
        setShowForgotPasswordModal(false);
        setForgotPasswordStep(1);
        setForgotPasswordEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmNewPassword("");
      }, 2000);
    } catch (err) {
      setForgotPasswordError(err.response?.data?.msg || "Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {forgotPasswordStep === 1 && "Forgot Password"}
                {forgotPasswordStep === 2 && "Verify OTP"}
                {forgotPasswordStep === 3 && "Reset Password"}
              </h3>
              <button
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setForgotPasswordStep(1);
                  setForgotPasswordEmail("");
                  setOtp("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                  setForgotPasswordError(null);
                  setForgotPasswordSuccess(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {forgotPasswordSuccess && (
              <div className="mb-4 text-sm text-green-600 bg-green-100 p-2 rounded">
                {forgotPasswordSuccess}
              </div>
            )}

            {forgotPasswordError && (
              <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
                {forgotPasswordError}
              </div>
            )}

            {forgotPasswordStep === 1 && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="forgotPasswordEmail"
                    type="email"
                    required
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send OTP
                </button>
              </form>
            )}

            {forgotPasswordStep === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Enter OTP sent to {forgotPasswordEmail}
                  </label>
                  <input
                    id="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Verify OTP
                </button>
              </form>
            )}

            {forgotPasswordStep === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmNewPassword"
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to MedChain
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select your role to continue
        </p>
      </div>

      {error && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("patient")}
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    role === "patient"
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole("doctor")}
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    role === "doctor"
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => setRole("researcher")}
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    role === "researcher"
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Researcher
                </button>
                <button
                  type="button"
                  onClick={() => setRole("emergency")}
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    role === "emergency"
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Emergency Responder
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;