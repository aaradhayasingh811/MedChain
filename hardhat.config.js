// import "@nomicfoundation/hardhat-ethers";

// export default {
//   solidity: "0.8.20",
//   networks: {
//     hardhat: {}
//   }
// };

import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},

    ganache: { // Local Ethereum blockchain
      url: "http://127.0.0.1:8745",
      accounts: process.env.GANACHE_PRIVATE_KEYS
        ? process.env.GANACHE_PRIVATE_KEYS.split(",")
        : [], // comma-separated private keys from Ganache
    },
  },

  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
};
