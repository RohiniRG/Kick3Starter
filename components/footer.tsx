import React from "react";
import {  Divider, Grid } from "semantic-ui-react";

const Footer: React.FC = () => {
    return (
        <Grid className="footer">
            <Grid.Column>
                <Divider />
                <p style={{ 'textAlign': 'center', 'fontSize': 20, 'fontWeight': 'bold' }}>
                    KICK3STARTER  <br />
                    Made with <span role="img" aria-label="heart">❤️</span> by <a href="https://github.com/RohiniRG">Rohini Rao</a>
                </p>
                <p style={{ 'textAlign': 'center',}}>
                    © All rights reserved and all that stuff
                </p>
            </Grid.Column>
        </Grid>
    );
}

export default Footer;
