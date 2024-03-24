require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
//use sepolia
module.exports = {
  solidity: "0.8.19",
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        ["832f1bedd5eb36837d2d2032d80d4b68a25ecbd282abed4df59a887501949cb8"]
    },
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/xu-OLKHDxb7nGuGwwnibrgp5Dt-UclQN",
      accounts: ["832f1bedd5eb36837d2d2032d80d4b68a25ecbd282abed4df59a887501949cb8"]
    }
  },
};