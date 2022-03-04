import React, { Component } from 'react';
import { Contract, ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/campaign.sol/CampaignFactory.json'
import web3Provider from '../scripts/web3_provider';

const campaignContractAddress: string = '0x0c7e760E2095B4d1C40012Df2eB26BCD371663Dc';

class CampaignList extends Component {
    componentDidMount(): void {
        const contract: Contract = new ethers.Contract(campaignContractAddress, CampaignFactory.abi, web3Provider);
        
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
