import { assert } from "chai";
import { Contract, ContractFactory, Signer, Transaction } from "ethers";
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
        console.log("Factory contract here: ", campaignFactoryContract.address);
        console.log("Campaign contract here: ", campaignContract.address);
    })
})