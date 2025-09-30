// import { createContext, useContext, useState, useEffect } from "react";

// // Create context
// const WalletContext = createContext();

// // Provider component
// export const WalletProvider = ({ children }) => {
//   const [walletAddress, setWalletAddress] = useState("");

//   // Optional: auto-connect if user already connected
//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.request({ method: "eth_accounts" }).then(accounts => {
//         if (accounts.length > 0) setWalletAddress(accounts[0]);
//       });

//       // Listen for account changes
//       window.ethereum.on("accountsChanged", (accounts) => {
//         setWalletAddress(accounts[0] || "");
//       });
//     }
//   }, []);

//   return (
//     <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// // Custom hook for easy access
// export const useWallet = () => useContext(WalletContext);

import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window.ethereum) {
      setError("MetaMask not installed");
      return;
    }

    // Check if already connected
    window.ethereum.request({ method: "eth_accounts" })
      .then(accounts => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      })
      .catch(err => setError(err.message));

    // Listen for account changes
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } else {
        setWalletAddress("");
        setIsConnected(false);
      }
    });

    // Listen for network changes
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask not installed");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      setError("");
    } catch (err) {
      setError("User rejected connection");
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, isConnected, error, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
