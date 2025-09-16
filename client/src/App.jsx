// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import UploadData from "./components/UploadData";
// import AccessRequest from "./components/AccessRequest";
// import GrantConsent from "./components/GrantConsent";
// import EmergencyAccess from "./components/EmergencyAccess";
// import ResearchPortal from "./components/ResearchPortal";
// import HeroPage from "./components/HeroPage";
// import LoginPage from "./components/LoginPage";
// import RegisterPage from "./components/RegisterPage";
// import "./App.css";

// function AppWrapper() {
//   const location = useLocation();
//   const hideNavbarRoutes = ["/",'/login', '/register'];

//   const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

//   return (
//     <>
//       {shouldShowNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<HeroPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/upload" element={<UploadData />} />
//         <Route path="/access" element={<AccessRequest />} />
//         <Route path="/grant" element={<GrantConsent />} />
//         <Route path="/emergency" element={<EmergencyAccess />} />
//         <Route path="/research" element={<ResearchPortal />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppWrapper />
//     </BrowserRouter>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ethers } from "ethers";
import Navbar from "./components/Navbar";
import UploadData from "./components/UploadData";
import AccessRequest from "./components/AccessRequest";
import GrantConsent from "./components/GrantConsent";
import EmergencyAccess from "./components/EmergencyAccess";
import ResearchPortal from "./components/ResearchPortal";
import HeroPage from "./components/HeroPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import ConnectWallet from "./components/ConnectWallet";
import "./App.css";

function AppWrapper() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const hideNavbarRoutes = ["/", "/login", "/register"];

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar user={user} setUser={setUser} walletAddress={walletAddress} />}
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <LoginPage setUser={setUser} />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} walletAddress={walletAddress} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/upload" 
          element={user ? <UploadData user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/access" 
          element={user ? <AccessRequest user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/grant" 
          element={user?.role === "patient" ? <GrantConsent user={user} /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/emergency" 
          element={user?.role === "emergency" ? <EmergencyAccess user={user} /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/research" 
          element={user?.role === "researcher" ? <ResearchPortal user={user} /> : <Navigate to="/dashboard" />} 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;