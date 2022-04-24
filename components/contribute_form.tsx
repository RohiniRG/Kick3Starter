import { Contract, ethers, Signer } from "ethers";
import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import web3Provider from "../scripts/web3_provider";
import Campaign from "../artifacts/contracts/campaign.sol/Campaign.json";
import Router from "next/router";

interface ContributeFormProps {
    address: string;
}

class ContributeForm extends Component<ContributeFormProps> {
    state = {
        contributionValue: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        const signer: Signer = web3Provider.getSigner();
        const contract: Contract = new ethers.Contract(this.props.address, Campaign.abi, signer);
        try {
            await contract.contribute({
                value: ethers.utils.parseEther(this.state.contributionValue)
            })
            await setTimeout(() => {Router.push(`/campaigns/${this.props.address}`).then(() => window.location.reload())}, 4000);
        }
        catch (err) { 
            console.log(err.message)
            if (err.message.includes('invalid')) {
                this.setState({ errorMessage: 'Invalid input!! Make sure your input values denote a valid number (in ETH)', });
            }
            else if (err.message.includes('denied')) {
                this.setState({ errorMessage: 'User denied transaction!', });
            }
            else if (err.message.includes('insufficient funds')) {
                this.setState({ errorMessage: 'Your contribution amount does not satisy the minimum contribution value.', });
            }
            else {
                this.setState({errorMessage: 'Something went wrong! Make sure you have enough funds or check if your metamask is connected to the right network.'});
            }
            this.setState({ loading: false });
            this.setState({ ContributionValue: '' })
        }
    }

    render() {
        return (
            <div className="contribute-form">
                <h1>
                    Want to contribute?
                </h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Enter amount</label>
                        <Form.Input
                            placeholder='Amount in ETH'
                            value={this.state.contributionValue}
                            onChange={event => this.setState({ contributionValue: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button loading={this.state.loading} size='large' type='submit' positive>Contribute!</Button>
                </Form>
            </div>
        );
    }
}

export default ContributeForm; 
