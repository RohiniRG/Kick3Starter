import React from "react";
import { Button, Divider, Dropdown, Grid, Menu } from "semantic-ui-react";

const Layout: React.FC = (props) => {
    return (
        <>
            <Grid className='computer' padded>
                <Grid.Column>
                    <Menu inverted borderless fluid fixed="top">
                        <Menu.Item header as='h1'>Kick3Starter</Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button positive size='large'>
                                    <p style={{ 'fontSize': '17px' }}>
                                        Create Campaign
                                    </p>
                                </Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Button color='blue' size='large'>
                                    <p style={{ 'fontSize': '17px' }}>
                                        Contribute
                                    </p>
                                </Button>
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
                                    <Dropdown.Item>
                                        <p style={{ 'fontSize': '17px' }}>
                                            Contribute
                                        </p>
                                    </Dropdown.Item>
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
            {props.children}
            <Grid>
                <Grid.Column>
                    <Divider />
                    <p style={{ 'textAlign': 'center', 'fontSize': 20, 'fontWeight': 'bold' }}>
                        KICK3STARTER  <br />
                        Made with <span role="img" aria-label="heart">❤️</span> by <a href="https://github.com/RohiniRG">Rohini Rao</a>                      
                    </p>
                </Grid.Column>
            </Grid>
        </>
    );
}

export default Layout;
