import { Contract, ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/campaign.sol/CampaignFactory.json'

const contractInstance: Contract = new ethers.Contract('0x0c7e760E2095B4d1C40012Df2eB26BCD371663Dc', CampaignFactory.abi);

export default contractInstance;
