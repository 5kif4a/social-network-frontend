import React from "react";
import {connect} from "react-redux";
import Footer from "./Footer";
import Nav from "./Nav";
import Header from "./Header";


const Base = props => {
    return (
        <div className="container">
            <Header/>
            <div className="content">
                {props.isAuthenticated ? <Nav/> : null}
                {props.children}
            </div>
            <Footer/>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.access_token
    }
}


export default connect(mapStateToProps)(Base);
