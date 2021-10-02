require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: { // Default network, can be removed from here and will still work
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/a411c7e6b1c6470f8bbc2399c51648df",
      accounts: {
        mnemonic: "cushion soft soap strong trigger fluid rally toast tornado web salute ginger"
      }
    }
  },
  solidity: "0.8.4",
};
