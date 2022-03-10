import React from "react";
import { Container } from "semantic-ui-react";
import Footer from "./footer";
import CustomHeader from "./header";

const Layout: React.FC = (props) => {
    return (
        <>
            <CustomHeader />
                {props.children}
            <Footer />
        </>
    );
}

export default Layout;
