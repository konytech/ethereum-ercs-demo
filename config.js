const hardhatConfig = {
    defaultNetwork: "rinkeby",
    networks: {
      hardhat: { // Default network, can be removed from here and will still work
      },
      //
      //networkName: {
      //  url: "https://mainnet.infura.io/TOKEN",
      //  accounts: {
      //    mnemonic: "ENTER YOUR MNEMONIC HERE"
      //  }
      //}
    },
    solidity: "0.8.4",
  }

module.exports = {
    hardhatConfig
};