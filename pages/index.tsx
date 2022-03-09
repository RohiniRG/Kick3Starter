import React, { Component } from 'react';
import { Contract, ethers} from 'ethers';
import { TransactionResponse, Provider } from "@ethersproject/abstract-provider";
import CampaignFactory from '../artifacts/contracts/campaign.sol/CampaignFactory.json'
import web3Provider from '../scripts/web3_provider';
import { Header, Grid, Image, Button, Icon, Popup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
// import { TransactionResponse } from '@ethersproject/providers';

const campaignContractAddress: string = '0x4B36d94BeDAb7db4D7E62DA7589d55AF327530fb';

class CampaignList extends Component<any> {
    state = {
        copied: false,
    }

    static async getInitialProps(): Promise<any> {
        const contract: Contract = new ethers.Contract(campaignContractAddress, CampaignFactory.abi, web3Provider);
        const campaigns: any[] = await contract.getDeployedCampaigns();
        console.log(campaigns);
        return { campaigns };
    }

    // async getTransactionTime (address: string): Promise<any> {
    //     await web3Provider.getBlockNumber().then((blockNumber: number) => {console.log(blockNumber)});
    //     // const timest: number  = (await web3Provider.getBlock(9)).timestamp
    //     // return timest;
    // }

    hexShortner = (address): String => {
        return address.substr(0, 5) + " ... " + address.substr(address.length - 5);
    }

    copyToClipboard = (address) => {
        this.setState({ copied: true })
        setTimeout(() => {
          this.setState({ copied: false })
        }, 1000);
        return navigator.clipboard.writeText(address);
    }    

    campaignsCardGroup(): JSX.Element {
        const items: JSX.Element = this.props.campaigns.map((campaignAddress: string, i: number) => {
        return (
            <Grid.Column mobile={16} tablet={8} computer={4}>
                <Grid.Row>
                    <Image
                        floated='left'
                        size='small'
                        src={`https://avatars.dicebear.com/api/jdenticon/${campaignAddress}.svg`} />
                    <Header as="h2">Campaign {(i+1).toString()}</Header>                    
                </Grid.Row>
                <div onClick={() => this.copyToClipboard(campaignAddress)}>
                    <p style={{ 'color': 'grey', 'display': 'inline', 'fontSize': '17px'}}>
                        {this.hexShortner(campaignAddress)}
                    </p>
                    <Popup 
                        trigger={<Icon color='grey' name='copy outline' />}
                        content='Copy to clipboard'
                        position='bottom center'
                    />
                </div>
                <br />
                <br />
                <br />
                <Button basic size="medium">
                    View details &raquo;
                </Button>
            </Grid.Column>
        )
        })
        return items;
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>
                    Here are the list of campaigns
                </h1>
                <Grid>
                    {this.campaignsCardGroup()}
                </Grid>
            </div>
        )
    }
}

export default CampaignList;
