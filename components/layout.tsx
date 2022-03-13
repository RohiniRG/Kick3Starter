import React from "react";
import Footer from "./footer";
import CustomHeader from "./header";

const Layout: React.FC = (props) => {
    return (
        <div className="wrapper">
                <CustomHeader />
                {props.children}
                <Footer />
        </div>
    );
}

export default Layout;
