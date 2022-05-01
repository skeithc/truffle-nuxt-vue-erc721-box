require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      ),
      network_id: 3,
      gas: 5500000,
      gasPrice: 10000000000, // 10 gwei
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      ),
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000, // 10 gwei
    },
    goerli: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      ),
      network_id: 5,
      gas: 5500000,
      gasPrice: 10000000000, // 10 gwei
    },
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      coinmarketcap: process.env.COINMARKETCAP_API_KEY,
      currency: 'USD',
      gasPrice: 100,
    },
  },

  compilers: {
    solc: { version: '0.8.11' },
  },
};
