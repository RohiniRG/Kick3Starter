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
    [owner, ...fetchedAccounts] = await ethers.getSigners()

    mainFactory = await ethers.getContractFactory("CampaignFactory");
    campaignFactoryContract = await mainFactory.connect(owner).deploy({gasLimit: 2000000});
    await campaignFactoryContract.deployed();

    const tx = await campaignFactoryContract.createCampaign(100, {gasLimit: 2000000});
    await tx.wait();

    [campaignAddress] = await campaignFactoryContract.getDeployedCampaigns();
    campaignFactory = await ethers.getContractFactory("Campaign");
    campaignContract = await campaignFactory.attach(campaignAddress);
})

describe("Campaign", ()=> {
    it("Deploys factory and campaign", () => {
        assert.ok(campaignFactoryContract.address);
        assert.ok(campaignContract.address);
    });

    it("Assigns caller as the manager", async () => {
        const manager: string = await campaignContract.campaignManager();
        const ownerAddress: string = await owner.getAddress();
        assert.equal(ownerAddress, manager);
    });

    it("Enables people to put their money and marks them as contributors", async () => {
        const contributorAddress: string = await fetchedAccounts[1].getAddress();
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
    })
})
