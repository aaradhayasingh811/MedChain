import { useState } from "react";
import ContractService from "../config/contractService";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
const ContractDiagnostic = () => {
  const { walletAddress } = useWallet();
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading] = useState(false);

  const runFullDiagnostic = async () => {
    setLoading(true);
    setDiagnostics([]);
    
    const results = [];

    try {
      // Test 1: Basic Ethereum connection
      results.push({ step: "MetaMask Connection", status: "Testing..." });
      await ContractService.init();
      results.push({ step: "MetaMask Connection", status: "✅ Connected" });

      // Test 2: Check contract addresses
      results.push({ step: "Contract Addresses", status: "Checking..." });
      const medicalRecordsAddr = await ContractService.contracts.medicalRecords.getAddress();
      const rolesAddr = await ContractService.contracts.roles.getAddress();
      results.push({ 
        step: "Contract Addresses", 
        status: "✅ Found", 
        details: `MedicalRecords: ${medicalRecordsAddr}, Roles: ${rolesAddr}` 
      });

      // Test 3: Check if contracts are deployed (simple call)
      results.push({ step: "Contract Deployment", status: "Testing..." });
      try {
        const medicalRecordsCode = await ContractService.provider.getCode(medicalRecordsAddr);
        const rolesCode = await ContractService.provider.getCode(rolesAddr);
        
        if (medicalRecordsCode === "0x" || rolesCode === "0x") {
          results.push({ 
            step: "Contract Deployment", 
            status: "❌ Not Deployed", 
            details: "Contracts have no code at their addresses" 
          });
        } else {
          results.push({ 
            step: "Contract Deployment", 
            status: "✅ Deployed", 
            details: "Contracts have code" 
          });
        }
      } catch (e) {
        results.push({ 
          step: "Contract Deployment", 
          status: "❌ Error", 
          details: e.message 
        });
      }

      // Test 4: Try simple view functions
      results.push({ step: "View Function Test", status: "Testing..." });
      try {
        // Try a very simple function that should always work
        const supportsInterface = await ContractService.contracts.medicalRecords.supportsInterface("0x01ffc9a7");
        results.push({ 
          step: "View Function Test", 
          status: "✅ Works", 
          details: `supportsInterface: ${supportsInterface}` 
        });
      } catch (e) {
        results.push({ 
          step: "View Function Test", 
          status: "❌ Failed", 
          details: `Even simple view functions fail: ${e.message}` 
        });
      }

      // Test 5: Check network and chain ID
      results.push({ step: "Network Configuration", status: "Checking..." });
      const network = await ContractService.provider.getNetwork();
      results.push({ 
        step: "Network Configuration", 
        status: "ℹ️ Info", 
        details: `Network: ${network.name}, ChainId: ${network.chainId}` 
      });

      // Test 6: Check account balance
      results.push({ step: "Account Balance", status: "Checking..." });
      const balance = await ContractService.provider.getBalance(walletAddress);
      results.push({ 
        step: "Account Balance", 
        status: "ℹ️ Info", 
        details: `Balance: ${ethers.formatEther(balance)} ETH` 
      });

    } catch (error) {
      results.push({ 
        step: "Diagnostic Failed", 
        status: "❌ Error", 
        details: error.message 
      });
    } finally {
      setDiagnostics(results);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      <button
        onClick={runFullDiagnostic}
        disabled={loading}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        {loading ? "Running Diagnostic..." : "Run Full Diagnostic"}
      </button>
      
      {diagnostics.length > 0 && (
        <div className="mt-4 space-y-2">
          {diagnostics.map((diag, index) => (
            <div key={index} className={`p-2 rounded text-sm ${
              diag.status.includes("✅") ? "bg-green-100" : 
              diag.status.includes("❌") ? "bg-red-100" : "bg-blue-100"
            }`}>
              <div className="flex justify-between">
                <span className="font-medium">{diag.step}</span>
                <span>{diag.status}</span>
              </div>
              {diag.details && <div className="text-gray-600 mt-1">{diag.details}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractDiagnostic;