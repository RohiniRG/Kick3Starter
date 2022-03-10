import React, { Component } from 'react';
import { Contract, ethers } from 'ethers';
import { TransactionResponse, Provider } from "@ethersproject/abstract-provider";
import CampaignFactory from '../artifacts/contracts/campaign.sol/CampaignFactory.json'
import web3Provider from '../scripts/web3_provider';
import { Header, Grid, Image, Button, Icon, Popup, Container, Menu, Form, Message, GridColumn } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
// import { TransactionResponse } from '@ethersproject/providers';

const campaignContractAddress: string = '0x4B36d94BeDAb7db4D7E62DA7589d55AF327530fb';

class CampaignList extends Component<any> {
    static async getInitialProps(): Promise<any> {
        const contract: Contract = new ethers.Contract(campaignContractAddress, CampaignFactory.abi, web3Provider);
        const campaigns: any[] = await contract.getDeployedCampaigns();
        console.log(campaigns);
        return { campaigns };
    }

    hexShortner = (address): String => {
        return address.substr(0, 5) + " ... " + address.substr(address.length - 5);
    }

    copyToClipboard = (address) => {
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
                        <Header as="h2">Campaign {(i + 1).toString()}</Header>
                    </Grid.Row>
                    <div onClick={() => this.copyToClipboard(campaignAddress)}>
                        <p style={{ 'color': 'grey', 'display': 'inline', 'fontSize': '17px' }}>
                            {this.hexShortner(campaignAddress)}
                        </p>
                        <Popup
                            trigger={<Icon color='grey' name='copy outline' />}
                            content='Copy to clipboard'
                            position='bottom center' />
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
            <>
                <Grid className='computer' padded>
                    <Grid.Column>
                        <Menu inverted borderless fluid fixed="top">
                            <Menu.Item header as='h1'>Kick3Starter</Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item>
                                    <Button positive size='large'>
                                        <p style={{ 'fontSize': '17px' }}>
                                            Create Campaign
                                        </p>
                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button color='blue' size='large'>
                                        <p style={{ 'fontSize': '17px' }}>
                                            Contribute
                                        </p>
                                    </Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid>
                <Grid className='mobile' padded>
                    <Grid.Column>
                        <Menu inverted borderless fluid fixed="top">
                            <Menu.Item header as='h1'>Kick3Starter</Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item>
                                    <Button positive size='large'>
                                        <p style={{ 'fontSize': '17px' }}>
                                            Create Campaign
                                        </p>
                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button color='blue' size='large'>
                                        <p style={{ 'fontSize': '17px' }}>
                                            Contribute
                                        </p>
                                    </Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Message size="massive" floating>
                        <br />
                        <Header textAlign='center' size="huge" as="h1">
                            Let's decentralise creativity!
                        </Header>
                        <p style={{ 'textAlign': 'center' }}>
                            Kick3Starter is a decentralized campaign platform that allows creators to help creators in bringing their projects to life.
                            Creators will have the opportunity to work with full control over their projects and with people who are constantly willing to support them.
                        </p>
                        <p style={{ 'textAlign': 'center' }}>
                            Come, let's make our ideas into reality!    
                        </p>
                        <Grid padded centered>
                            <Button positive size='huge'>
                                <p style={{ 'fontSize': '20px' }}>
                                    Create Campaign
                                </p>
                            </Button>
                        </Grid>

                    </Message>
                </Grid>
                <h1>
                    Here are the list of campaigns
                </h1>
                <Grid padded columns={3} centered={true}>
                    {this.campaignsCardGroup()}
                </Grid>
            </>
        )
    }
}

export default CampaignList;
