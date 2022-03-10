import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Message } from "semantic-ui-react";
import Layout from "../../components/layout";

class NewCampaignForm extends Component {
    render() {
        return (
            <Layout>
                <Message className="message">
                    <Message.Header>
                        <h1>Create a new campaign</h1>
                    </Message.Header>
                </Message>
            </Layout>
        )
    }
}

export default NewCampaignForm;
