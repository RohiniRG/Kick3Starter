import Link from "next/link";
import Router from "next/router";
import React from "react";
import { Button, Dropdown, Grid, Menu } from "semantic-ui-react";

const CustomHeader: React.FC = () => {
    return (
        <>
            <Grid className='computer' padded>
                <Grid.Column>
                    <Menu inverted borderless fluid fixed="top">
                        <Menu.Item
                            className="name"
                            onClick={() => {
                                Router.push('/').then(() => window.location.reload());
                            }}
                            header as='h1'>Kick3Starter
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button
                                    positive
                                    size='large'
                                    onClick={() => { Router.push('/campaigns/new') }}
                                >
                                    <p style={{ 'fontSize': '17px' }}>
                                        Create Campaign
                                    </p>
                                </Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href={'/#campaigns-view'}>
                                    <Button color='blue' size='large'>
                                        <p style={{ 'fontSize': '17px' }}>
                                            Contribute
                                        </p>
                                    </Button>
                                </Link>

                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid.Column>
            </Grid>
            <Grid className='mobile only' padded>
                <Grid.Column>
                    <Menu inverted borderless fluid fixed="top">
                        <Menu.Item header as='h1'>Kick3Starter</Menu.Item>
                        <Menu.Menu position='right'>
                            <Dropdown item simple icon='content'>
                                <Dropdown.Menu>
                                    <Link href={'/#campaigns-view'}>
                                        <Dropdown.Item onClick={() => Router.push('/campaigns/new')}>
                                            <p style={{ 'fontSize': '17px' }}>
                                                Contribute
                                            </p>
                                        </Dropdown.Item>
                                    </Link>
                                    <Dropdown.Item>
                                        <p style={{ 'fontSize': '17px' }}>
                                            Create Campaign
                                        </p>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Menu>
                </Grid.Column>
            </Grid>
        </>
    );
}

export default CustomHeader;
