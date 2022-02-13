import { Contract, ContractFactory, Signer } from "ethers";
import { ethers } from "hardhat";

let owner: Signer;
let fetchedAccounts: Signer[];
let factory: ContractFactory;
let contract: Contract;

beforeEach(async () => {
    [owner, ...fetchedAccounts] = await ethers.getSigners();

    factory = await ethers.getContractFactory("CampaignFactory")
    contract = await factory.deploy()
})

