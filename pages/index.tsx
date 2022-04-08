import React, { Component } from 'react';
import { Contract, ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/campaign.sol/CampaignFactory.json'
import web3Provider from '../scripts/web3_provider';
import { Header, Grid, Image, Button, Icon, Popup, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/layout';
import Router from "next/router";
import Link from 'next/link';

class CampaignList extends Component<any> {
    state = {
        dropdownMenuStyle: {
            display: "none"
        }
    };

    static campaignContractAddress: string = '0x9246966F5504655BeAB11e31d5b26318CDCe6d04';

    static async getInitialProps(): Promise<any> {
        const contract: Contract = new ethers.Contract(this.campaignContractAddress, CampaignFactory.abi, web3Provider);
        const campaigns: any[] = await contract.getDeployedCampaigns();
        console.log(campaigns);
        return { campaigns };
    }

    handleToggleDropdownMenu = () => {
        let newState = Object.assign({}, this.state);
        if (newState.dropdownMenuStyle.display === "none") {
            newState.dropdownMenuStyle = { display: "flex" };
        } else {
            newState.dropdownMenuStyle = { display: "none" };
        }

        this.setState(newState);
    };

    hexShortner = (address): String => {
        return address.substr(0, 5) + " ... " + address.substr(address.length - 5);
    }

    copyToClipboard = (address) => {
        return navigator.clipboard.writeText(address);
    }

    campaignsCardGroup(): JSX.Element {
        const items: JSX.Element = this.props.campaigns.map((campaignAddress: string, i: number) => {
            return (
                <Grid.Column key={i} mobile={16} tablet={8} computer={4}>
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
                    <Link href={`/campaigns/${campaignAddress}`}>
                        <Button basic size="medium">
                            View details &raquo;
                        </Button>
                    </Link>
                </Grid.Column>
            )
        })
        return items;
    }

    render(): JSX.Element {
        return (
            <Layout>
                <Grid>
                    <Message size="massive">
                        <br />
                        <Header textAlign='center' size="huge" as="h1">
                            Let's decentralise creativity!
                        </Header>
                        <p style={{ 'textAlign': 'center' }}>
                            Kick3Starter is a decentralized campaign platform that allows creators to help creators in bringing their projects to life.
                            Creators will have the opportunity to work with full control over their projects and with people who are constantly willing to support them.
                        </p>
                        <p style={{ 'textAlign': 'center' }}>
                            Come, let's change your ideas into reality!
                        </p>
                        <Grid padded centered>
                            <Button
                                positive
                                size='huge'
                                onClick={() => Router.push('/campaigns/new')}
                            >
                                <p style={{ 'fontSize': '20px' }}>
                                    Create Campaign
                                </p>
                            </Button>
                        </Grid>
                    </Message>
                </Grid>
                <Grid padded className='body'>
                    <Grid.Column>
                        <h1 id='campaigns-view' style={{ 'fontSize': 35 }}>
                            Here are the list of campaigns
                        </h1>
                        <Grid padded columns={3} centered={true}>
                            {this.campaignsCardGroup()}
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignList;
