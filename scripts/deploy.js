const {ethers} = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log(deployer)
    const contract = await ethers.getContractFactory("BaoTrack");

    const bao = await contract.deploy();

    console.log("bao address:", bao.target);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });