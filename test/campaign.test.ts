import { assert } from "chai";
import { Contract, ContractFactory, Signer } from "ethers";
import { ethers } from "hardhat";

let owner: Signer;
let fetchedAccounts: Signer[];
let mainFactory: ContractFactory;
let campaignFactory: ContractFactory;
let campaignFactoryContract: Contract;
let campaignAddress: string;
let campaignContract: Contract;

beforeEach(async () => {
    // Signer represents an ethereum account
    // getSigners() gives a list of accounts connected to the node
    [owner, ...fetchedAccounts] = await ethers.getSigners()

    // Abstraction of the CampaignFactory contract
    mainFactory = await ethers.getContractFactory("CampaignFactory");

    // Making the owner as the signer of the contract instance and deploying the contract.
    // Following function runs a promise which resolves to a contract
    campaignFactoryContract = await mainFactory.connect(owner).deploy({gasLimit: 2000000});
    // Proceeding to the future functions only after the contract has been deployed
    await campaignFactoryContract.deployed();

    // Creating a sample campaign to run tests on
    const tx = await campaignFactoryContract.createCampaign(100, {gasLimit: 2000000});
    await tx.wait();
    [campaignAddress] = await campaignFactoryContract.getDeployedCampaigns();

    // Creating a factory of instances for the campaign contract
    campaignFactory = await ethers.getContractFactory("Campaign");
    // Attaching contract to the given campaign address
    campaignContract = await campaignFactory.attach(campaignAddress);
})

describe("Campaign", ()=> {
    it("Deploys factory and campaign", () => {
        assert.ok(campaignFactoryContract.address);
        assert.ok(campaignContract.address);
    });

    it("Assigns caller as the manager", async () => {
        const manager: string = await campaignContract.campaignManager();
        // Gets the signer's address
        const ownerAddress: string = await owner.getAddress();
        assert.equal(ownerAddress, manager);
    });

    it("Enables people to put their money and marks them as contributors", async () => {
        const contributorAddress: string = await fetchedAccounts[1].getAddress();
        // Making the 1st signer in the list of fetchedAccounts as the signer to call the contract instance
        await campaignContract.connect(fetchedAccounts[1]).contribute({value: 200});
        const isContributor: boolean = await campaignContract.contributors(contributorAddress);
        assert(isContributor);
    });

    it("Requires minimum contribution", async () => {
       try {
            await campaignContract.connect(fetchedAccounts[1]).contribute({value: 50});
            assert(false);
       } catch (e) {
            assert(e);
       }
    });

    it("Allows manager to make a payment request", async () => {
        const contributorAddress: string = await fetchedAccounts[1].getAddress();
        const tx = await campaignContract.createRequest("Buy wires", "100", contributorAddress, {gasLimit: 2000000});
        await tx.wait();
        
        const request = await campaignContract.connect(owner).requests(0);
        assert.equal("Buy wires", request.purpose);
    });
})
