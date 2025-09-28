

// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 31337, // default Hardhat local chain
    },
    ganache: {
      url: "http://127.0.0.1:8745", // Ganache RPC URL
            accounts: ["fdf3ce55f624b70ce7e889b46f947e05c34d719aae6e740bad9fa69b5361ce6c"]

    },
  },
};
