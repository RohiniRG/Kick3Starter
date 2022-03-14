import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Form, Grid, Header, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Contract, ethers } from "ethers";
import CampaignList from "..";
import CampaignFactory from "../../artifacts/contracts/campaign.sol/CampaignFactory.json";
import web3Provider from "../../scripts/web3_provider";

let contract: Contract;
class NewCampaignForm extends Component {
    state = {
        minContributionValue: '',
    }

    static async getInitialProps(context): Promise<any> {
        contract = new ethers.Contract(CampaignList.campaignContractAddress, CampaignFactory.abi, web3Provider);
        return { contract };
    }

    onSubmit = async (event) => {
        event.preventDefault();
        await contract.createCampaign(this.state.minContributionValue)
    }

    render() : JSX.Element {
        return (
            <Layout>
                <Grid >
                    <Grid.Column>
                        <Message size="massive">
                            <Header textAlign='center' size="huge" as="h1">
                                Create a new campaign!
                            </Header>
                            <p style={{ 'textAlign': 'center' }}>
                                Take your first step to start funding your projects!
                                Just enter the minimum contribution amount your idea expects and you will be good to go for now!
                            </p>
                            <p style={{ 'textAlign': 'center' }}>
                                Who knew getting your ideas to life could be so easy?
                            </p>
                        </Message>
                        <Grid padded centered className="body">
                            <Container text>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Field>
                                        <label style={{ 'fontSize': 25, 'padding': 10, }}>Minimum contribution amount</label>
                                        <input 
                                            style={{ 'fontSize': 20, 'padding': 10, }} 
                                            placeholder='Enter amount in ETH' 
                                            value={this.state.minContributionValue}
                                            onChange={event => this.setState({ minContributionValue: event.target.value })}
                                        />
                                    </Form.Field>
                                    <Button positive type="submit">
                                        <p style={{ 'fontSize': '17px' }}>
                                            Create!
                                        </p>
                                    </Button>
                                </Form>
                            </Container>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default NewCampaignForm;
