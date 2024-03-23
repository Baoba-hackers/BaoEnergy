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

    function addUserContract(UserContract memory _userContract) public  {
        localToContract[_userContract.localId].push(_userContract);
    }

    function getUserContracts(uint256 _localId) public view returns (UserContract[] memory) {
        return localToContract[_localId];
    }
}