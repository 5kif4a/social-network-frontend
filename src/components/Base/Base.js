import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {LogOut} from "../../store/actions/user";

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Logout: () => dispatch(LogOut())
    }
}


let Header = props => {
    return (
        <header className="header">
            <h1 className="header__brand">Social Network</h1>
            {
                props.isAuthenticated ?
                    <button
                        className="header__logout"
                        onClick={props.Logout}
                    >Log out</button> :
                    null
            }
        </header>
    )
};

Header = connect(mapStateToProps, mapDispatchToProps)(Header);

const NavItem = props => {
    return (
        <NavLink
            to={props.path}
            className="menu__item"
            activeClassName="active"
        >
            <li><span style={{fontSize: "10px"}}>&#9658;</span>&nbsp;{props.children}</li>
        </NavLink>
    )
};

const Nav = () => {
    return (
        <ul className="menu">
            <NavItem path={"/profile"}>Profile</NavItem>
            <NavItem path={"/im"}>Messages</NavItem>
            <hr className="divider"/>
            <NavItem path={"/settings"}>Settings</NavItem>
        </ul>
    )
};

const Footer = () => {
    return (
        <footer className="footer">
            <p>Copyright &copy; 2020 Social Network</p>
        </footer>
    )
};

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


export default connect(mapStateToProps)(Base);
