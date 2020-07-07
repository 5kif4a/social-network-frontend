import {LogOut} from "../../store/actions/auth";
import {connect} from "react-redux";
import React from "react";
import {Link} from "react-router-dom";

const Header = props => {
    return (
        <header className="header">
            <h1 className="header__brand">Social Network</h1>
            {
                props.isAuthenticated ?
                    <Link to={"/logout"}
                          className="header__logout"
                    >Log Out</Link> :
                    null
            }
        </header>
    )
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.access_token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Logout: () => dispatch(LogOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
