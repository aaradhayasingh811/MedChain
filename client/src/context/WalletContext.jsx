import { createContext, useContext, useState, useEffect } from "react";

// Create context
const WalletContext = createContext();

// Provider component
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");

  // Optional: auto-connect if user already connected
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then(accounts => {
        if (accounts.length > 0) setWalletAddress(accounts[0]);
      });

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0] || "");
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook for easy access
export const useWallet = () => useContext(WalletContext);
