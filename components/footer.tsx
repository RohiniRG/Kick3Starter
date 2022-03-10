import React from "react";
import { Divider, Grid } from "semantic-ui-react";

const Footer: React.FC = () => {
    return (
        <Grid>
            <Grid.Column>
                <Divider />
                <p style={{ 'textAlign': 'center', 'fontSize': 20, 'fontWeight': 'bold' }}>
                    KICK3STARTER  <br />
                    Made with <span role="img" aria-label="heart">❤️</span> by <a href="https://github.com/RohiniRG">Rohini Rao</a>
                </p>
            </Grid.Column>
        </Grid>
    );
}

export default Footer;
