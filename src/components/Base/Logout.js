import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {LogOut} from "../../store/actions/auth";
import {connect} from "react-redux";

const Logout = (props) => {
    useEffect(() => {
        props.Logout()
    });

    return (
        <Redirect push to={"/auth"}/>
    )
};

function mapDispatchToProps(dispatch) {
    return {
        Logout: () => dispatch(LogOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
