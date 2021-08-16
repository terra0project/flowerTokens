require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  compilers: {
    solc: {
      version: "0.6.8",
      parser: "solcjs",
    }
  },
  networks: {
    develop: {
      provider() {
        return new HDWalletProvider(
          process.env.TRUFFLE_MNEMONIC,
          'http://localhost:9545/'
        )
      },
      host: 'localhost',
      port: 9545,
      network_id: 4447
    },
    ganache: {
      provider() {
        return new HDWalletProvider(
          process.env.GANACHE_PRIV,
          'http://localhost:8545'
        )
      },
      host: 'localhost',
      port: 8545,
      network_id: "*",
      gas: 60000000,
    },
    mainnet: {
      provider() {
        // using wallet at index 1 ----------------------------------------------------------------------------------------v
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY,
          1
        )
      },
      network_id: 1
      // gas: 5561260
    },
    kovan: {
      provider() {
        // using wallet at index 1 ----------------------------------------------------------------------------------------v
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://kovan.infura.io/v3/' + process.env.INFURA_API_KEY,
          1
        )
      },
      network_id: 42
      // gas: 5561260
    },
    rinkeby: {
      provider() {
        return new HDWalletProvider({
           mnemonic: {
              phrase: String(process.env.RINKEBYSEEDPHASE),
           },
           providerOrUrl: 'https://rinkeby.infura.io/v3/' + String(process.env.INFURA_API_KEY)
           }
         );
     },
      network_id: 4,
  // gas: 4700000,
      gas: 61000000,
      gasPrice: 80000000000, // 200 GWEI
      skipDryRun: true
   },

    ropsten: {
      provider() {
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY
        )
      },
      network_id: 2
      // gas: 4700000
    },
    sokol: {
      provider() {
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://sokol.poa.network'
        )
      },
      gasPrice: 1000000000,
      network_id: 77
    },
    poa: {
      provider() {
        return new HDWalletProvider(
          process.env.TESTNET_MNEMONIC,
          'https://core.poa.network'
        )
      },
      gasPrice: 1000000000,
      network_id: 99
    }
  }
}
