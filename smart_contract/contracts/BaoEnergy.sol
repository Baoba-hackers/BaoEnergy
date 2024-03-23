// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./BaoFunction.sol";

contract BaoEnergy is BaoFunction {
    constructor(uint64 functionsSubscriptionId) BaoFunction(functionsSubscriptionId) { }
    //Define the struct of Consumer
    struct Consumer{
        bool isMemberOfFreeEnergyMarket;
        uint256 cnpj;
        uint256 localId;
        bool active;
    }

    //Define the struct of Distributor
    struct Distributor{
        uint256 cnpj;
        uint256 pricePerMonthKWH;
        uint256 localId;
        bool active;
    }

    //Define the struct of Propose
    struct Propose{
        UserContract userContract;
        address distributor;
        address consumer;
        bool answered;
    }

    //Define the modifier of onlyConsumer
    modifier onlyConsumer(){
        require(consumers[msg.sender].active, "Voce nao e um consumidor");
        _;
    }

    //Define the modifier of onlyDistributor
    modifier onlyDistributor(){
        require(distributors[msg.sender].active, "Voce nao e um distribuidor");
        _;
    }

    //Define the event of newConsumerRegistered
    event newConsumerRegistered(address indexed consumer);

    //Define the event of newProposeAdded
    event newProposeAdded(address indexed _distributor);

    //Define the event of newDistributorAdded
    event newDistributorAdded(address indexed _distributor);

    //Define the event of answeredPropose
    event answeredPropose(uint256 indexed _id, bool _decision);

    //Define the mapping of Propose
    mapping(address => Propose[]) public proposes;

    //Define the mapping of Consumer
    mapping(address => Consumer) public consumers;

    //Define the mapping of Distributor by local
    mapping(uint256 => Distributor[]) public localIdToDistributors;

    //Define the mapping of Distributor
    mapping(address => Distributor) public distributors;

    //Define the mapping for consumer to userCOntract
    mapping(address => UserContract) public consumerToUserContract;

    //Define the function of registerConsumer
    function registerConsumer(uint256 _cnpj, uint256 _localId, bool _isMemberOfFreeEnergyMarket) public {
        require(!distributors[msg.sender].active, "Voce nao pode ser um distribuidor e um consumidor ao mesmo tempo");
        Consumer memory newConsumer = Consumer(_isMemberOfFreeEnergyMarket, _cnpj, _localId, true);
        consumers[msg.sender] = newConsumer;
        emit newConsumerRegistered(msg.sender);
    }

    function bestOptions(uint256 _localId) public view returns(Distributor[] memory){
        //Return the best options of distributors for the consumer based on the localId
        return localIdToDistributors[_localId];
    }

    function addPropose(uint256 _energyConsume, uint256 _pricePerMonth, address _distributor, uint256 _localId) onlyConsumer public{
        //Checks if the _distributor is a distributor
        require(distributors[_distributor].active, "O endereco passado nao e um distribuidor");
        UserContract memory newUserContract = UserContract(msg.sender, _energyConsume, _pricePerMonth, block.timestamp, _localId, true, block.timestamp + 30 days);
        Propose memory newPropose = Propose(newUserContract, msg.sender, _distributor, false);
        //Add the propose to the mapping of proposes
        proposes[_distributor].push(newPropose);
        //Emit the event of newProposeAdded
        emit newProposeAdded(_distributor);
    }

    function addDistributor(uint256 _cnpj, uint256 _pricePerMonthKWH, uint256 _localId) public{
        require(!consumers[msg.sender].active, "Voce nao pode ser um distribuidor e um consumidor ao mesmo tempo");
        Distributor memory newDistributor = Distributor(_cnpj, _pricePerMonthKWH, _localId, true);
        //Add the distributor to the localIdToDistributors
        localIdToDistributors[_localId].push(newDistributor);
        //Add the distributor to the mapping of distributors
        distributors[msg.sender] = newDistributor;
        emit newDistributorAdded(msg.sender);
    }

    function answerPropose(uint256 _id, bool _decision) onlyDistributor public{
        //Get the propose by the id
        Propose storage propose = proposes[msg.sender][_id];
        //Require that the msg.sender is the distributor of the propose
        require(propose.distributor != msg.sender, "Voce nao e o distribuidor dessa proposta");
        propose.answered = true;

        if (_decision) {
            //Add the propose's userContract into the mapping of consumerToUserContract
            consumerToUserContract[propose.consumer] = propose.userContract;
            //Add the propose's userContract into the mapping of localToContract
            localToContract[propose.userContract.localId].push(propose.userContract);
            //Define the propose as answered
            propose.answered = true;
        }
        //Emit the event of newProposeAdded
        emit newProposeAdded(msg.sender);
    }

    function getProposes() public view returns(Propose[] memory){
        return proposes[msg.sender];
    }

}