import React from "react";
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
