// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import image from "../assets/image.jpg";

// const HeroPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % 4);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 overflow-x-hidden">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden z-0">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full opacity-10 animate-float"
//             style={{
//               width: Math.random() * 100 + 50,
//               height: Math.random() * 100 + 50,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#3b82f6"][
//                 Math.floor(Math.random() * 4)
//               ],
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${Math.random() * 10 + 10}s`,
//             }}
//           />
//         ))}
        
//         {/* Grid overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent bg-[length:50px_50px] bg-repeat [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" 
//              style={{backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'}}>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="p-4 lg:p-6 max-w-7xl mx-auto relative z-10">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="text-xl sm:text-2xl font-bold text-white flex items-center">
//             <div className="relative">
//               <div className="absolute -inset-1 bg-indigo-600 rounded-lg blur opacity-75 animate-pulse"></div>
//               <div className="relative bg-gray-900 px-3 py-1 rounded-lg flex items-center">
//                 <svg
//                   className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-indigo-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
//                   />
//                 </svg>
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
//                   MedChain
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Desktop Links */}
//           <div className="hidden md:flex space-x-4 items-center">
            
//             <div className="h-6 w-px bg-indigo-700 mx-2"></div>
//             <Link
//               to="/login"
//               className="px-4 py-2 text-indigo-300 hover:text-white font-medium transition duration-300"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 font-medium transition duration-300 shadow-lg hover:shadow-indigo-500/30"
//             >
//               Register
//             </Link>
//           </div>

//           {/* Hamburger Menu (Mobile) */}
//           <button
//             className="md:hidden focus:outline-none relative z-20"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <div className="w-6 h-6 flex flex-col justify-center items-center">
//               <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
//               <span className={`block h-0.5 w-6 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
//               <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
//             </div>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`fixed inset-0 bg-gray-900 z-10 flex flex-col items-center justify-center transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
//           <button
//             className="absolute top-6 right-6 text-white text-3xl"
//             onClick={() => setIsMenuOpen(false)}
//             aria-label="Close menu"
//           >
//             &times;
//           </button>
          
//           <div className="flex flex-col items-center space-y-8 text-2xl">
//             <Link
//               to="/features"
//               className="text-white hover:text-indigo-300 transition duration-300"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Features
//             </Link>
//             <Link
//               to="/solutions"
//               className="text-white hover:text-indigo-300 transition duration-300"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Solutions
//             </Link>
//             <Link
//               to="/pricing"
//               className="text-white hover:text-indigo-300 transition duration-300"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Pricing
//             </Link>
//             <div className="h-px w-32 bg-indigo-700 my-4"></div>
//             <Link
//               to="/login"
//               className="text-indigo-300 hover:text-white transition duration-300"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 font-medium transition duration-300"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Content */}
//       <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-center relative z-10">
//         {/* Content */}
//         <div className="md:w-1/2 space-y-6 sm:space-y-8 mt-8 md:mt-0">
//           <div className="inline-flex items-center px-4 py-2 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium mb-4 border border-indigo-700/30 backdrop-blur-sm">
//             <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
//             Now with zero-knowledge proofs & enhanced security
//           </div>

//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
//               Secure Healthcare Data
//             </span>{" "}
//             with Blockchain Technology
//           </h1>

//           <p className="text-lg md:text-xl text-indigo-200 leading-relaxed max-w-2xl">
//             Revolutionary healthcare data management using zero-knowledge proofs, 
//             smart contracts, and FHIR compliance for ultimate privacy and security.
//           </p>

//           <div className="grid grid-cols-2 gap-4 max-w-md">
//             <div className="bg-gray-800/50 p-4 rounded-xl border border-indigo-800/30 backdrop-blur-sm">
//               <div className="flex items-center mb-2">
//                 <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
//                 <span className="text-white text-sm">Access Patient Portal</span>
//               </div>
//             </div>
//             <div className="bg-indigo-900/30 p-4 rounded-xl border border-indigo-700/50 backdrop-blur-sm">
//               <div className="flex items-center mb-2">
//                 <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
//                 <span className="text-white text-sm">Provider Login</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 pt-4">
//             <Link
//               to="/register"
//               className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 flex items-center justify-center group relative overflow-hidden"
//             >
//               <span className="relative z-10">Get Started - It's Free</span>
//               <svg
//                 className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </Link>
            
//           </div>
//         </div>

//         {/* Interactive Feature Showcase */}
//         <div className="md:w-1/2 mt-16 md:mt-0 relative">
//           <div className="relative h-96 md:h-[500px]">
//             {/* Base Card */}
//             <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-indigo-800/30 transform rotate-3"></div>
            
//             {/* Feature Cards that animate */}
//             <div className={`absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-purple-900/70 rounded-2xl border border-indigo-600/30 backdrop-blur-md p-6 transition-all duration-700 ${activeFeature === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
//               <div className="flex items-start mb-6">
//                 <div className="bg-indigo-700 p-3 rounded-lg mr-4">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Zero-knowledge Privacy</h3>
//                   <p className="text-indigo-200 mt-2">Prove consent without revealing sensitive data</p>
//                 </div>
//               </div>
//               <div className="bg-gray-800/50 p-4 rounded-lg border border-indigo-700/30 mt-4">
//                 <div className="flex justify-between items-center text-sm text-indigo-300">
//                   <span>Data Access Request</span>
//                   <span className="flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
//                     Verified
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             <div className={`absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/70 rounded-2xl border border-blue-600/30 backdrop-blur-md p-6 transition-all duration-700 ${activeFeature === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
//               <div className="flex items-start mb-6">
//                 <div className="bg-blue-700 p-3 rounded-lg mr-4">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Blockchain Security</h3>
//                   <p className="text-blue-200 mt-2">Immutable audit trails and access control</p>
//                 </div>
//               </div>
//               <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-700/30 mt-4">
//                 <div className="flex space-x-2">
//                   {[...Array(4)].map((_, i) => (
//                     <div key={i} className="flex-1 h-2 bg-blue-900/50 rounded-full overflow-hidden">
//                       <div className="h-full bg-blue-500 rounded-full" style={{width: `${25 + i * 25}%`}}></div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="text-xs text-blue-300 mt-2 flex justify-between">
//                   <span>Block 12489</span>
//                   <span>Validated</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className={`absolute inset-0 bg-gradient-to-br from-purple-900/70 to-pink-900/70 rounded-2xl border border-purple-600/30 backdrop-blur-md p-6 transition-all duration-700 ${activeFeature === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
//               <div className="flex items-start mb-6">
//                 <div className="bg-purple-700 p-3 rounded-lg mr-4">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Multi-Sig Emergency</h3>
//                   <p className="text-purple-200 mt-2">Secure emergency access protocols</p>
//                 </div>
//               </div>
//               <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-700/30 mt-4">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3].map(i => (
//                     <div key={i} className="w-8 h-8 rounded-full bg-purple-600 border-2 border-gray-900"></div>
//                   ))}
//                   <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-400">
//                     2/3
//                   </div>
//                 </div>
//                 <div className="text-xs text-purple-300 mt-2">Emergency access requires multiple approvals</div>
//               </div>
//             </div>
            
//             <div className={`absolute inset-0 bg-gradient-to-br from-teal-900/70 to-green-900/70 rounded-2xl border border-teal-600/30 backdrop-blur-md p-6 transition-all duration-700 ${activeFeature === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
//               <div className="flex items-start mb-6">
//                 <div className="bg-teal-700 p-3 rounded-lg mr-4">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">FHIR Compliant</h3>
//                   <p className="text-teal-200 mt-2">Standard healthcare data formats</p>
//                 </div>
//               </div>
//               <div className="bg-gray-800/50 p-4 rounded-lg border border-teal-700/30 mt-4">
//                 <div className="text-xs font-mono text-teal-300">
//                   <div className="flex">
//                     <span className="text-teal-500 mr-2">{"{"}</span>
//                     <div className="flex-1">
//                       <div className="ml-4">"resourceType": "Patient",</div>
//                       <div className="ml-4">"id": "example",</div>
//                       <div className="ml-4">"active": true</div>
//                     </div>
//                   </div>
//                   <div>{"}"}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Feature navigation dots */}
//           <div className="flex justify-center space-x-2 mt-6">
//             {[0, 1, 2, 3].map(i => (
//               <button
//                 key={i}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFeature === i ? 'bg-indigo-400 w-6' : 'bg-indigo-800'}`}
//                 onClick={() => setActiveFeature(i)}
//               ></button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
//           {[
//             { value: "10M+", label: "Health Records Secured" },
//             { value: "99.99%", label: "Uptime" },
//             { value: "256-bit", label: "Encryption" },
//             { value: "0", label: "Data Breaches" }
//           ].map((stat, i) => (
//             <div key={i} className="bg-gray-800/30 p-4 rounded-xl border border-indigo-800/30 backdrop-blur-sm text-center">
//               <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
//               <div className="text-xs md:text-sm text-indigo-300">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* About Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About MedChain</h2>
//           <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
//             MedChain is revolutionizing healthcare data management through blockchain technology, 
//             providing unprecedented security, privacy, and control over medical records.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="relative">
//             <div className="absolute -inset-4 bg-indigo-900/30 rounded-2xl transform rotate-3 blur-xl"></div>
//             <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-indigo-700/30 backdrop-blur-sm">
//               <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
//               <p className="text-indigo-200 mb-6">
//                 To empower patients and healthcare providers with secure, transparent, 
//                 and efficient management of medical data through cutting-edge blockchain technology.
//               </p>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-indigo-900/30 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-white mb-1">2025</div>
//                   <div className="text-xs text-indigo-300">Founded</div>
//                 </div>
//                 <div className="bg-indigo-900/30 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-white mb-1">3</div>
//                   <div className="text-xs text-indigo-300">Team Members</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
//             <div className="space-y-6">
//               {[
//                 {
//                   title: "Privacy First",
//                   description: "Patient data sovereignty is our top priority with zero-knowledge proofs ensuring privacy.",
//                   icon: (
//                     <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   )
//                 },
//                 {
//                   title: "Interoperability",
//                   description: "Seamless integration with existing healthcare systems using FHIR standards.",
//                   icon: (
//                     <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                     </svg>
//                   )
//                 },
//                 {
//                   title: "Transparency",
//                   description: "Immutable audit trails provide complete transparency for all data access.",
//                   icon: (
//                     <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                   )
//                 }
//               ].map((value, index) => (
//                 <div key={index} className="flex items-start">
//                   <div className="bg-indigo-900/30 p-2 rounded-lg mr-4 flex-shrink-0">
//                     {value.icon}
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-white mb-1">{value.title}</h4>
//                     <p className="text-indigo-200 text-sm">{value.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
//           <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
//             Trusted by healthcare professionals and patients worldwide
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             {
//               name: "Dr. Sarah Johnson",
//               role: "Chief Medical Officer, Boston General",
//               image: "https://randomuser.me/api/portraits/women/44.jpg",
//               content: "MedChain has revolutionized how we manage patient records. The security and ease of access have significantly improved our workflow and patient care.",
//               rating: 5
//             },
//             {
//               name: "Michael Chen",
//               role: "IT Director, HealthNet Systems",
//               image: "https://randomuser.me/api/portraits/men/32.jpg",
//               content: "Implementing MedChain's blockchain solution was seamless. Their FHIR compliance made integration with our existing systems straightforward and efficient.",
//               rating: 5
//             },
//             {
//               name: "Emily Rodriguez",
//               role: "Patient Advocate",
//               image: "https://randomuser.me/api/portraits/women/68.jpg",
//               content: "As someone with a chronic condition, MedChain gives me peace of mind knowing I control who accesses my medical history while ensuring emergency providers have critical information.",
//               rating: 5
//             }
//           ].map((testimonial, index) => (
//             <div key={index} className="bg-gradient-to-br from-gray-800/50 to-indigo-900/30 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
//               <div className="flex items-center mb-4">
//                 <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
//                 <div>
//                   <h4 className="text-white font-semibold">{testimonial.name}</h4>
//                   <p className="text-indigo-300 text-sm">{testimonial.role}</p>
//                 </div>
//               </div>
//               <p className="text-indigo-200 mb-4">{testimonial.content}</p>
//               <div className="flex">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

       
//       </div>

//       {/* CTA Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
//         <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-8 md:p-12 border border-indigo-700/30 backdrop-blur-sm">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Healthcare Data Management?</h2>
//             <p className="text-indigo-200 mb-8">Join thousands of healthcare providers and patients who have already secured their medical data with MedChain.</p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link
//                 to="/register"
//                 className="px-8 py-3 bg-white text-indigo-900 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
//               >
//                 Get Started Free
//               </Link>
//               <Link
//                 to="/contact"
//                 className="px-8 py-3 border border-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-900/30 transition duration-300"
//               >
//                 Contact Sales
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="border-t border-indigo-900/50 pt-12 pb-8 relative z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
//           <div className="border-t border-indigo-900/50 pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-indigo-400 text-sm mb-4 md:mb-0">
//               © {new Date().getFullYear()} MedChain. All rights reserved.
//             </p>
//             <div className="flex space-x-4">
//               {["facebook", "twitter", "linkedin", "github"].map((social) => (
//                 <a
//                   key={social}
//                   href="#"
//                   className="text-indigo-400 hover:text-white transition duration-300"
//                   aria-label={social}
//                 >
//                   <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center">
//                     <span className="text-sm">{social[0].toUpperCase()}</span>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HeroPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MedicalChatbot from "../components/MedicalChatbot";

const HeroPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);

    const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  // if (!showChatbot) {
  //   return <button onClick={() => setShowChatbot(true)}>Open Chat</button>;
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "AI Health Assistant",
      description: "24/7 medical guidance and symptom analysis",
      icon: "🤖",
      gradient: "from-indigo-900/70 to-purple-900/70",
      border: "border-indigo-600/30",
      details: "Get instant AI-powered health guidance anytime"
    },
    {
      title: "Blockchain Security",
      description: "Immutable health records with zero-knowledge proofs",
      icon: "🔒",
      gradient: "from-blue-900/70 to-indigo-900/70",
      border: "border-blue-600/30",
      details: "Your data is secured with military-grade encryption"
    },
    {
      title: "Emergency Access",
      description: "Multi-signature emergency protocols",
      icon: "🚨",
      gradient: "from-purple-900/70 to-pink-900/70",
      border: "border-purple-600/30",
      details: "Critical access when you need it most"
    },
    {
      title: "FHIR Compliant",
      description: "Healthcare interoperability standards",
      icon: "🏥",
      gradient: "from-teal-900/70 to-green-900/70",
      border: "border-teal-600/30",
      details: "Seamless integration with healthcare systems"
    }
  ];

  const stats = [
    { number: "50K+", label: "Health Queries Answered" },
    { number: "99.9%", label: "Uptime Reliability" },
    { number: "256-bit", label: "Encryption Standard" },
    { number: "24/7", label: "AI Availability" }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      content: "The AI assistant provides accurate preliminary guidance while maintaining proper medical boundaries.",
      avatar: "👩‍⚕️"
    },
    {
      name: "Mike Rodriguez",
      role: "Patient",
      content: "Finally, a health platform that respects my privacy while providing instant medical guidance.",
      avatar: "👨‍💼"
    },
    {
      name: "Dr. James Wilson",
      role: "Emergency Physician",
      content: "The emergency protocols and AI triage have significantly improved our response times.",
      avatar: "👨‍⚕️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 animate-float"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#3b82f6"][
                Math.floor(Math.random() * 4)
              ],
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent bg-[length:50px_50px] bg-repeat [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" 
             style={{backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'}}>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 lg:p-6 max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-indigo-600 rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gray-900 px-3 py-1 rounded-lg flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  MedChain
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/symptoms-checker"
              className="px-4 py-2 text-indigo-300 hover:text-white font-medium transition duration-300"
            >
              Symptoms Checker
            </Link>
            <Link
              to="/emergency-chat"
              className="px-4 py-2 text-red-300 hover:text-red-100 font-medium transition duration-300"
            >
              Emergency Help
            </Link>
            <div className="h-6 w-px bg-indigo-700 mx-2"></div>
            <Link
              to="/login"
              className="px-4 py-2 text-indigo-300 hover:text-white font-medium transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 font-medium transition duration-300 shadow-lg hover:shadow-indigo-500/30"
            >
              Register
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden focus:outline-none relative z-20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-gray-900 z-10 flex flex-col items-center justify-center transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          
          <div className="flex flex-col items-center space-y-8 text-2xl">
            <Link
              to="/symptoms-checker"
              className="text-white hover:text-indigo-300 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Symptoms Checker
            </Link>
            <Link
              to="/emergency-chat"
              className="text-red-300 hover:text-red-100 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Emergency Help
            </Link>
            <div className="h-px w-32 bg-indigo-700 my-4"></div>
            <Link
              to="/login"
              className="text-indigo-300 hover:text-white transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-center relative z-10">
        {/* Content */}
        <div className="md:w-1/2 space-y-6 sm:space-y-8 mt-8 md:mt-0">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium mb-4 border border-indigo-700/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
            AI Health Assistant • Blockchain Security • 24/7 Support
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Secure Healthcare
            </span>{" "}
            with AI Intelligence
          </h1>

          <p className="text-lg md:text-xl text-indigo-200 leading-relaxed max-w-2xl">
            Experience the future of healthcare with our blockchain-secured platform 
            and AI-powered medical assistant. Get instant, intelligent health guidance 
            while maintaining complete data privacy.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            {[
              { icon: "🔍", label: "Symptoms Checker", link: "/symptoms-checker" },
              { icon: "💊", label: "Medication Help", link: "/medication-help" },
              { icon: "🚨", label: "Emergency Chat", link: "/emergency-chat" },
              { icon: "🤖", label: "AI Assistant", action: () => setShowChatbot(true) }
            ].map((action, index) => (
              action.action ? (
                <button
                  key={index}
                  onClick={action.action}
                  className="bg-gray-800/50 p-4 rounded-xl border border-indigo-800/30 backdrop-blur-sm hover:bg-indigo-900/30 transition-all duration-300 text-center group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
                  <div className="text-white text-sm font-medium">{action.label}</div>
                </button>
              ) : (
                <Link
                  key={index}
                  to={action.link}
                  className="bg-gray-800/50 p-4 rounded-xl border border-indigo-800/30 backdrop-blur-sm hover:bg-indigo-900/30 transition-all duration-300 text-center group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
                  <div className="text-white text-sm font-medium">{action.label}</div>
                </Link>
              )
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 flex items-center justify-center group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <button
              onClick={() => setShowChatbot(true)}
              className="px-8 py-4 border-2 border-indigo-500 text-indigo-300 rounded-xl hover:bg-indigo-900/30 hover:text-white font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Try AI Assistant
            </button>
          </div>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="md:w-1/2 mt-16 md:mt-0 relative">
          <div className="relative h-96 md:h-[500px]">
            {/* Base Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-indigo-800/30 transform rotate-3"></div>
            
            {/* Feature Cards that animate */}
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl border ${feature.border} backdrop-blur-md p-6 transition-all duration-700 ${
                  activeFeature === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="flex items-start mb-6">
                  <div className={`p-3 rounded-lg mr-4 ${
                    index === 0 ? 'bg-indigo-700' :
                    index === 1 ? 'bg-blue-700' :
                    index === 2 ? 'bg-purple-700' : 'bg-teal-700'
                  }`}>
                    <div className="text-2xl text-white">{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-white/80 mt-2">{feature.description}</p>
                  </div>
                </div>
                
                {/* Feature-specific content */}
                <div className="bg-gray-800/50 p-4 rounded-lg border border-white/10 mt-4">
                  {index === 0 && (
                    <div className="text-white/80 text-sm">
                      Ask me about symptoms, medications, or general health advice
                    </div>
                  )}
                  {index === 1 && (
                    <div className="flex space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex-1 h-2 bg-blue-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: `${25 + i * 25}%`}}></div>
                        </div>
                      ))}
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-purple-600 border-2 border-gray-900"></div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-400">
                        2/3
                      </div>
                    </div>
                  )}
                  {index === 3 && (
                    <div className="text-xs font-mono text-teal-300">
                      <div className="flex">
                        <span className="text-teal-500 mr-2">{"{"}</span>
                        <div className="flex-1">
                          <div className="ml-4">"resourceType": "Patient",</div>
                          <div className="ml-4">"id": "example",</div>
                          <div className="ml-4">"active": true</div>
                        </div>
                      </div>
                      <div>{"}"}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Feature navigation dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2, 3].map(i => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFeature === i ? 'bg-indigo-400 w-6' : 'bg-indigo-800'}`}
                onClick={() => setActiveFeature(i)}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gray-800/30 p-4 rounded-xl border border-indigo-800/30 backdrop-blur-sm text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-xs md:text-sm text-indigo-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose MedChain?</h2>
          <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
            Combining cutting-edge AI with blockchain technology for the future of healthcare
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-900/30 rounded-2xl transform rotate-3 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-indigo-700/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-indigo-200 mb-6">
                To empower patients and healthcare providers with secure, transparent, 
                and efficient management of medical data through cutting-edge AI and blockchain technology.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-900/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">2024</div>
                  <div className="text-xs text-indigo-300">Founded</div>
                </div>
                <div className="bg-indigo-900/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">50K+</div>
                  <div className="text-xs text-indigo-300">Queries Served</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
            <div className="space-y-6">
              {[
                {
                  title: "Privacy First",
                  description: "Patient data sovereignty is our top priority with zero-knowledge proofs ensuring privacy.",
                  icon: "🔒"
                },
                {
                  title: "AI-Powered",
                  description: "24/7 intelligent health guidance and symptom analysis with medical accuracy.",
                  icon: "🤖"
                },
                {
                  title: "Transparency",
                  description: "Immutable audit trails provide complete transparency for all data access.",
                  icon: "🔍"
                }
              ].map((value, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-indigo-900/30 p-2 rounded-lg mr-4 flex-shrink-0">
                    <div className="text-xl">{value.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{value.title}</h4>
                    <p className="text-indigo-200 text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
            Trusted by healthcare professionals and patients worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-800/50 to-indigo-900/30 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-indigo-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-indigo-200 mb-4">"{testimonial.content}"</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-8 md:p-12 border border-indigo-700/30 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Healthcare Experience?</h2>
            <p className="text-indigo-200 mb-8">Join thousands of users who trust MedChain with their healthcare needs.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-indigo-900 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
              >
                Get Started Free
              </Link>
              <button
                onClick={() => setShowChatbot(true)}
                className="px-8 py-3 border border-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-900/30 transition duration-300"
              >
                Try AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-indigo-900/50 pt-12 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-indigo-900/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                MedChain
              </span>
            </div>
            <p className="text-indigo-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MedChain. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["facebook", "twitter", "linkedin", "github"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-indigo-400 hover:text-white transition duration-300"
                  aria-label={social}
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center">
                    <span className="text-sm">{social[0].toUpperCase()}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          <div className="w-full max-w-4xl h-[85vh] bg-transparent">
            <MedicalChatbot 
              initialMessage="Hello! I'm your MedChain AI Health Assistant. I can help with general health information, symptom guidance, and medication questions. Remember, I'm not a substitute for professional medical care. How can I help you today?"
              className="h-full"
              onClose={handleCloseChatbot}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroPage;