// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2;

contract BaoStorage {
    struct UserContract{
        uint256 energyConsume;
        uint256 pricePerMonth;
        uint256 timeStamp;
        uint256 localId;
        bool active;
        uint256 contractDeadLine;
    }

    //Define the mapping to store the mapping of Propose by localId
    mapping(uint256 => UserContract[]) public localToContract;

    function addUserContract(uint256 _energyConsume, uint256 _pricePerMonth, uint256 _timeStamp, uint256 _localId, bool _active, uint256 _contractDeadLine) public  {
        UserContract memory newUserContract = UserContract({
            energyConsume: _energyConsume,
            pricePerMonth: _pricePerMonth,
            timeStamp: _timeStamp,
            localId: _localId,
            active: _active,
            contractDeadLine: _contractDeadLine
        });
        localToContract[_localId].push(newUserContract);
    }

    function getUserContracts(uint256 _localId) public view returns (UserContract[] memory) {
        return localToContract[_localId];
    }

    string public greeting = "Hello World!";

    // This function will be called by executeFunctionCrosschain on the Operator Smart Contract
    function setGreeting(string memory greeting_) public {
        greeting = greeting_;
    }
}