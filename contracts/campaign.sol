// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract Campaign {
    address public manager;
    uint public minimumContribution;
    address[] public contributors;

    constructor(uint minimumValue) {
        manager = msg.sender;
        minimumContribution = minimumValue;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "Insufficient funds to satisy minimum contribution amount!!");
        contributors.push(msg.sender);
    }
}
