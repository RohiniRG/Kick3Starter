// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract Campaign {
    struct Request {
        string purpose;
        uint requiredAmount;
        address receiver;
        bool isComplete;
    }

    address public campaignManager;
    uint public minimumContribution;
    address[] public contributors;
    Request[] public requests;

    modifier restricted() {
        require(msg.sender == campaignManager, "Access denied!");
        _;
    }

    constructor(uint minimumValue) {
        campaignManager = msg.sender;
        minimumContribution = minimumValue;
        console.log("Manager is: ", campaignManager);
        console.log("Minimum contribution is: ", minimumContribution);
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "Insufficient funds to satisy minimum contribution amount!!");
        contributors.push(msg.sender);
    } 

    function createRequest(string memory purpose, uint requiredAmount, address receiver) public restricted {
        Request memory newRequest = Request({
            purpose: purpose,
            requiredAmount: requiredAmount,
            receiver: receiver,
            isComplete: false
        });

        requests.push(newRequest);
    }
}
