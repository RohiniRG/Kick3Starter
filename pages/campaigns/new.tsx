import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Form, Grid, Header, Message } from "semantic-ui-react";
import Layout from "../../components/layout";

class NewCampaignForm extends Component {
    render() {
        return (
            <Layout>
                <div className="body">
                <Grid >
                    <Grid.Column >
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
                        <Grid padded centered >
                            <Container text>
                                <Form>
                                    <Form.Field>
                                        <label style={{ 'fontSize': 25, 'padding': 10, }}>Minimum contribution amount</label>
                                        <input style={{ 'fontSize': 20, 'padding': 10, }} placeholder='Enter amount in ETH' />
                                    </Form.Field>
                                    <Button positive>
                                        <p style={{ 'fontSize': '17px' }}>
                                            Create!
                                        </p>
                                    </Button>
                                </Form>
                            </Container>
                        </Grid>
                    </Grid.Column>
                </Grid>
                </div>
            </Layout>
        )
    }
}

export default NewCampaignForm;
