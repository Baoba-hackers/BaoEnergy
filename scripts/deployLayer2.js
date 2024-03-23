const {ethers} = require("hardhat");
const fs = require("fs");

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log(deployer)
    const contract = await ethers.getContractFactory("BaoTrackL2");

    const bao = await contract.deploy();

    console.log("bao address:", bao.target);

    //leia config.json e armazene em data
    let data = fs.readFileSync('config.json');

    //converta data para JSON

    data = JSON.parse(data);

    //Adicione o endereço do contrato L1 ao JSON

    data["L2_ADRESS"] = bao.target   

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