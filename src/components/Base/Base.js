import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const LogOutButton = () => {
    return (
        <button className="header__logout"
        >Log out</button>
    )
};

let Header = props => {
    return (
        <header className="header">
            <h1 className="header__brand">Social Network</h1>
            {props.user.isAuthenticated ? <LogOutButton/> : null}
        </header>
    )
};

Header = connect(mapStateToProps)(Header);

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
                {props.user.isAuthenticated ? <Nav/> : null}
                {props.children}
            </div>
            <Footer/>
        </div>
    )
};


export default connect(mapStateToProps)(Base);
