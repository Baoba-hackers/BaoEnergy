const {ethers} = require("hardhat");
const fs = require("fs");


async function getAbi(){
  const artifactPath = "artifacts/contracts/BaoPrices.sol/BaoPrices.json";
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
  console.log(artifact);
  return artifact.abi;
}



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

    //pega a abi
    const jsonData = await getAbi();
    
    fs.writeFileSync('../backend/abi.json', JSON.stringify({"abi":jsonData, "address": bao.target}));



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });