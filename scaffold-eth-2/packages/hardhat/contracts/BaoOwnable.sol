// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2;

contract BaoOwnable {
    address internal owner;

    constructor(address _owner) {
        owner = _owner;
    }
}