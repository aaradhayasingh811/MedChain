import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ArrowPathIcon, CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ConnectWallet = ({ setWalletAddress }) => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [truncatedAddress, setTruncatedAddress] = useState("");

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            handleConnectionSuccess(accounts[0]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    checkConnection();

    // Set up event listeners
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          handleConnectionSuccess(accounts[0]);
        } else {
          handleDisconnect();
        }
      });

      window.ethereum.on("chainChanged", () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleConnectionSuccess);
        window.ethereum.removeListener("chainChanged", handleConnectionSuccess);
      }
    };
  }, []);

  const handleConnectionSuccess = (address) => {
    setWalletAddress(address);
    setConnected(true);
    setTruncatedAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
    setLoading(false);
    setError(null);
    
    // Get chain ID
    window.ethereum.request({ method: "eth_chainId" })
      .then(setChainId)
      .catch(console.error);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setWalletAddress("");
    setTruncatedAddress("");
    setChainId(null);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask not installed");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      handleConnectionSuccess(accounts[0]);
    } catch (err) {
      setLoading(false);
      if (err.code === 4001) {
        setError("Connection rejected by user");
      } else {
        setError("Failed to connect wallet");
        console.error(err);
      }
    }
  };

  const getNetworkName = () => {
    if (!chainId) return null;
    switch (chainId) {
      case "0x1": return "Ethereum Mainnet";
      case "0x5": return "Goerli Testnet";
      case "0xaa36a7": return "Sepolia Testnet";
      case "0x89": return "Polygon Mainnet";
      case "0x13881": return "Mumbai Testnet";
      default: return `Chain ID: ${chainId}`;
    }
  };

  return (
    <div className="flex flex-col items-end space-y-2">
      {connected ? (
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-2 bg-indigo-50 rounded-full px-4 py-2">
            <CheckBadgeIcon className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">{truncatedAddress}</span>
          </div>
          {chainId && (
            <span className="text-xs text-gray-500 mt-1">{getNetworkName()}</span>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`flex items-center space-x-2 rounded-full px-4 py-2 ${
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-medium transition-colors duration-200`}
        >
          {loading ? (
            <>
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
      )}
      
      {error && (
        <div className="flex items-center space-x-1 text-red-500 text-sm">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;