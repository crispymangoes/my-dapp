// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageBoi {
    uint public myNumber;

    constructor(){
        myNumber = 777;
    }

    function setNumber(uint _newNumber) external {
        myNumber = _newNumber;
    }
}