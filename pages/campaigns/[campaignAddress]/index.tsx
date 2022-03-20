import React from "react";
import { NextRouter } from 'next/router'
import { useRouter } from 'next/router';
import Layout from "../../../components/layout";
import { Contract, ethers } from "ethers";
import Campaign from "../../../artifacts/contracts/campaign.sol/Campaign.json";
import web3Provider from "../../../scripts/web3_provider";
import { Card, Grid, Message } from "semantic-ui-react";
import { ParsedUrlQuery } from "querystring";

interface StatelessPage<P = {}> extends React.FC<P> {
    getInitialProps?: (ctx: any) => Promise<P>
}

const CampaignDetails: StatelessPage = (props) => {
    const router: NextRouter = useRouter();
    const address: ParsedUrlQuery = router.query;
    console.log(`address: ${address}`);

    CampaignDetails.getInitialProps = async (): Promise<any> => {
        const contract: Contract = new ethers.Contract(`${address.campaignAddress}`, Campaign.abi, web3Provider);
        const summary: any[] = await contract.getSummary();
        console.log(`summary: ${summary} ${summary[0]}`);
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            totalRequests: summary[2],
            totalContributors: summary[3],
            manager: summary[4]
        }
    }

    return (
        <Layout>
            <Grid>
                <Grid.Column>
                    <Message size="massive">
                        Campaign Details: {address.campaignAddress}
                    </Message>
                    <Card.Group>
                        <Card>
                            <Card.Content>
                                <Card.Header>Matthew Harris</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>
                                    Matthew is a pianist living in Nashville.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

export default CampaignDetails;
