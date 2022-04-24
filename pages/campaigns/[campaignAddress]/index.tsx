import React, { Component } from "react";
import Layout from "../../../components/layout";
import { BigNumber, Contract, ethers } from "ethers";
import Campaign from "../../../artifacts/contracts/campaign.sol/Campaign.json";
import web3Provider from "../../../scripts/web3_provider";
import { Card, Grid, Header, Message } from "semantic-ui-react";
import { ParsedUrlQuery } from "querystring";
import ContributeForm from "../../../components/contribute_form";

interface CampaignDetailsProps {
    minContribution: string,
    balance: string,
    address: string,
    requests: string,
    totalContributors: string,
    manager: string,
}

class CampaignDetails extends Component<CampaignDetailsProps> {
    constructor(props) {
        super(props)
    }

    static getInitialProps = async (context): Promise<any> => {
        const query: ParsedUrlQuery = context.query;
        const campaignAddress: string = query.campaignAddress.toString();
        console.log(query, campaignAddress);
        const contract: Contract = new ethers.Contract(campaignAddress, Campaign.abi, web3Provider);
        const summary: any[] = await contract.getSummary();
        return {
            address: campaignAddress,
            minContribution: summary[0].toString(),
            balance: summary[1].toString(),
            requests: summary[2].toString(),
            totalContributors: summary[3].toString(),
            manager: summary[4].toString(),
        };
    }

    render() {
        const minContributionEthers = BigNumber.from(this.props.minContribution);
        const balanceEthers = BigNumber.from(this.props.balance);
        return (
            <Layout>
                <Message size="massive">
                    <Header textAlign='center' size="huge" as="h1">
                        Know and contribute!
                    </Header>
                    <p style={{ 'textAlign': 'center' }}>
                        Take a look at the details of the campaign your desire to contribute to!
                        Your contribution can really bring a change to these projects and will help them get on road.
                    </p>
                    <p style={{ 'textAlign': 'center' }}>
                        Let's make a difference together!
                    </p>
                </Message>
                <Grid>
                    <Grid.Column width={10}>
                        <div className="card-details">
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{this.props.address}</Card.Header>
                                    <Card.Meta>Campaign Address</Card.Meta>
                                    <Card.Description>
                                        The address where you can find the contract for this campaign.
                                        Enter the address in etherscan to see the transactions performed on this address.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{ethers.utils.formatUnits(minContributionEthers, 'ether').toString()} ETH</Card.Header>
                                    <Card.Meta>Minimum contribution</Card.Meta>
                                    <Card.Description>
                                        The minimum amount of contribution this campaign expects to consider you as a contributor.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{ethers.utils.formatUnits(balanceEthers, 'ether')} ETH</Card.Header>
                                    <Card.Meta>Collection</Card.Meta>
                                    <Card.Description>
                                        The funds collected by the campaign so far. It is representation of the collection of contributions put forth by all the
                                        kind contributor.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{this.props.requests}</Card.Header>
                                    <Card.Meta>Request Count</Card.Meta>
                                    <Card.Description>
                                        The number of requests that have been made to this campaign, made
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{this.props.totalContributors}</Card.Header>
                                    <Card.Meta>Total Contributors</Card.Meta>
                                    <Card.Description>
                                        The total number of people who are the Contributors for this campaign and are helping their favourite campaign make progress.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <div className="card-details">
                            <ContributeForm address={this.props.address}/>
                        </div>
                    </Grid.Column>
                </Grid>
            </Layout >
        )
    }
}

export default CampaignDetails;
