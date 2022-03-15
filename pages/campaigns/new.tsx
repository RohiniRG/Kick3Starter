import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Form, Grid, Header, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import { Contract, ethers, Signer } from "ethers";
import CampaignList from "..";
import CampaignFactory from "../../artifacts/contracts/campaign.sol/CampaignFactory.json";
import web3Provider from "../../scripts/web3_provider";
import Router from "next/router";

class NewCampaignForm extends Component {
    state = {
        minContributionValue: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        const signer: Signer = web3Provider.getSigner();
        const contract: Contract = new ethers.Contract(CampaignList.campaignContractAddress, CampaignFactory.abi, signer);
        var success: Boolean = false;
        try {
            await contract.createCampaign(this.state.minContributionValue);
            Router.push('/');
        }
        catch(err) {
            if (err.message.includes('invalid')) {
                this.setState({ errorMessage: 'Invalid input!! Make sure your input values denote a valid number (in WEI units)', });
            }
            else if (err.message.includes('denied')) {
                this.setState({ errorMessage: 'User denied transaction!', });
            }
        }
        this.setState({minContributionValue: ''});
        this.setState({ loading: false });
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
                                The minimum contribution amount is the minimum value a user must contribute to your campaign in order to consider them as a "Contributor" in it.
                            </p>
                            <p style={{ 'textAlign': 'center' }}>
                                Who knew getting your ideas to life could be so easy?
                            </p>
                        </Message>
                        <Grid padded centered className="body">
                            <Container text>
                                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                                    <Form.Field>
                                        <label style={{ 'fontSize': 25, 'padding': 10, }}>Minimum contribution amount</label>
                                        <Form.Input 
                                            style={{ 'fontSize': 20,  }} 
                                            placeholder='Enter amount in WEI' 
                                            value={this.state.minContributionValue}
                                            onChange={event => this.setState({ minContributionValue: event.target.value })}
                                        />
                                    </Form.Field>
                                    <Message error header='Oops!' content={this.state.errorMessage} />
                                    <Button loading={this.state.loading} positive type="submit">
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
