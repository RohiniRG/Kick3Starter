import React, { Component } from 'react';
import { Contract, ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/campaign.sol/CampaignFactory.json'
import web3Provider from '../scripts/web3_provider';

const campaignContractAddress: string = '0x95ee4309Bf90F0eb923c6a17992c1D20fd55e346';

class CampaignList extends Component {
    async componentDidMount(): Promise<void> {
        const contract: Contract = new ethers.Contract(campaignContractAddress, CampaignFactory.abi, web3Provider);
        const campaigns: any[] = contract.getDeployedCampaigns();
        console.log(campaigns);
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>
                    Here are the list of campaigns
                </h1>
                <h5>
                    Ooops!
                </h5>
            </div>
        )
    }
}

export default CampaignList;
