const {ethers} = require("hardhat");
const fs = require("fs");

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const contract = await ethers.getContractFactory("BaoTrack");

    const bao = await contract.deploy();

    console.log("bao address:", bao.target);

    //leia config.json e armazene em data
    let data = fs.readFileSync('config.json');

    //converta data para JSON

    data = JSON.parse(data);

    //Adicione o endereço do contrato L1 ao JSON

    data["L1_ADDRESS"] = bao.target   

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