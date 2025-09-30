

import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import ConnectWallet from "./ConnectWallet";

const Navbar = ({ user, setUser, walletAddress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
  };

  // Navigation items based on user role
  const getNavItems = () => {
  if (!user) return [];

  const baseItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/upload", label: "Upload" },
    { to: "/access", label: "Access" }
  ];

  switch (user.role) {
    case "patient":
      return [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/upload", label: "Upload" },
        { to: "/grant", label: "Consent" },
        { to: "/my-record", label: "Records" }
      ];
    case "doctor":
      return [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/my-access-record", label: "View Records" },
    { to: "/access", label: "Request Access" }
  ];
    case "emergency":
      return [...baseItems, { to: "/emergency", label: "Emergency" }];
    case "researcher":
      return [...baseItems, { to: "/research", label: "Research" }];
    default:
      return baseItems;
  }
};


  const navItems = getNavItems();

  const setWalletAddress = (address) => {
    console.log("Wallet connected:", address);
    // set to make avialble in fully project
    
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              MedChain
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            
            {/* Wallet Connection */}
            <div className="ml-4">
              <ConnectWallet setWalletAddress={setWalletAddress} />
            </div>
            
            {/* User Menu */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-700">
                  <UserCircleIcon className="h-6 w-6 mr-1" />
                  <span className="text-sm font-medium">
                    {user.name} ({user.role})
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white pb-3 px-4 border-t">
          <div className="flex flex-col space-y-2 py-4">
            {navItems.map(item => (
              <MobileNavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)}>
                {item.label}
              </MobileNavLink>
            ))}
            
            {/* Wallet Connection in Mobile */}
            <div className="px-3 py-2">
              <ConnectWallet setWalletAddress={setWalletAddress} />
            </div>
            
            {/* User Info and Logout in Mobile */}
            {user && (
              <>
                <div className="px-3 py-2 text-sm text-gray-700 border-t mt-2 pt-4 flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  {user.name} ({user.role})
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable component for desktop navigation links
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </Link>
);

// Reusable component for mobile navigation links
const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
