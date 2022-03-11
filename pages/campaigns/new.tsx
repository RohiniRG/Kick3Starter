import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Grid, Header, Message } from "semantic-ui-react";
import Layout from "../../components/layout";

class NewCampaignForm extends Component {
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Column >
                        <Message size="massive">
                            <br />
                            <Header textAlign='center' size="huge" as="h1">
                                Create a new campaign!
                            </Header>
                            <p style={{ 'textAlign': 'center' }}>
                                Just enter the minimum contribution amount your idea expects and you will be good to go for now!
                            </p>
                            <p style={{ 'textAlign': 'center' }}>
                                Who knew getting your ideas to life could be so easy?
                            </p>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default NewCampaignForm;
