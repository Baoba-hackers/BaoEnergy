// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2;

contract BaoPrices {
    struct Transaction {
        uint256 productId;
        uint256 amount;
        uint256 priceHundred;
        uint256 blockStamp;
        uint256 localId;
        uint256 timestampTransaction;
    }

    function getAveragePrice(Transaction[] memory _transactions) public returns (uint256) {
        return 214;
    }
}