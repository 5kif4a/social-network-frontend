import {NavLink} from "react-router-dom";
import React from "react";

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

export default Nav;
