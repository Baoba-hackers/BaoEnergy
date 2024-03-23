const {ethers} = require("hardhat");
const fs = require("fs");

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const contract = await ethers.getContractFactory("BaoStorage");

    const bao = await contract.deploy();

    console.log("bao address:", bao.target);

    let data = fs.readFileSync('config.json');

    data = JSON.parse(data);

    data["L2_ADDRESS"] = bao.target   

    const newData = JSON.stringify(data);

    //Escreva no config.json
    fs.writeFileSync('config.json', newData);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });