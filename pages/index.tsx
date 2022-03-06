import React, { Component } from 'react';
import { Contract, ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/campaign.sol/CampaignFactory.json'
import web3Provider from '../scripts/web3_provider';

const campaignContractAddress: string = '0x95ee4309Bf90F0eb923c6a17992c1D20fd55e346';

class CampaignList extends Component <any> {
    static async getInitialProps(): Promise<any> {
        const contract: Contract = new ethers.Contract(campaignContractAddress, CampaignFactory.abi, web3Provider);
        const campaigns: any[] = await contract.getDeployedCampaigns();
        console.log(campaigns);
        return { campaigns };
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>
                    Here are the list of campaigns
                </h1>
                <ul>
                    <li>
                        {this.props.campaigns[0]}
                    </li>
                </ul>
            </div>
        )
    }
}

export default CampaignList;
