// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimumContribution) public {
        address newCampaign = address(new Campaign(minimumContribution, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[] memory) {
        return deployedCampaigns;
    }
} 

contract Campaign {
    struct Request {
        string purpose;
        uint requiredAmount;
        address receiver;
        mapping(address => bool) votedCheck;
        uint approvedVotes;
        bool isComplete;
    }

    mapping(uint=>Request) public requests;
    address public campaignManager;
    uint public minimumContribution;
    mapping(address=>bool) public contributors;
    uint private currentIndex;
    uint totalContributors;

    modifier restricted() {
        // Creating a restrictor for campaign manager specific functions
        require(msg.sender == campaignManager, "Access denied!");
        _;
    }

    constructor(uint minimumValue, address creator) {
        campaignManager = creator;
        minimumContribution = minimumValue;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution, "Insufficient funds to satisy minimum contribution amount!");
        contributors[msg.sender] = true;
        totalContributors++;
    } 

    function createRequest(string memory purpose, uint requiredAmount, address receiver) public restricted {
        Request storage newRequest = requests[currentIndex];
        newRequest.purpose = purpose;
        newRequest.requiredAmount = requiredAmount;
        newRequest.receiver = receiver;
        newRequest.approvedVotes = 0;
        newRequest.isComplete = false;
        currentIndex++;
    }

    function approveRequest(uint requestIndex) public {
        Request storage currentRequest = requests[requestIndex];

        require(contributors[msg.sender], "Become a contributor first!");
        require(!currentRequest.votedCheck[msg.sender], "You only get to vote once!");
        require(!currentRequest.isComplete, "Request already processed!");

        currentRequest.votedCheck[msg.sender] = true;
        currentRequest.approvedVotes++;
    }

    function finalizeRequest(uint requestIndex) public restricted {
        Request storage currentRequest = requests[requestIndex];

        require(!currentRequest.isComplete, "Request already processed!");
        require(currentRequest.approvedVotes > totalContributors/2, "Request not approved yet!");
        require(address(this).balance > currentRequest.requiredAmount, "Insufficient funds to process payment");

        payable(currentRequest.receiver).transfer(currentRequest.requiredAmount);
        currentRequest.isComplete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            address(this).balance,
            currentIndex,
            totalContributors,
            campaignManager
        );
    }
}
