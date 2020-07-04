import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Base from "./components/Base/Base";
import Profile from "./components/Profile/Profile";
import Chat from "./components/Chat/Chat";
import Settings from "./components/Settings/Settings";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Logout from "./components/Base/Logout";


function App(props) {
    let routes = (
        <Switch>
            <Route path={"/auth"} component={SignIn}/>
            <Route path={"/register"} component={SignUp}/>

            <Route path={"/"}>
                <Redirect to={"/auth"}/>
            </Route>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path={"/profile"} component={Profile}/>
                <Route path={"/im"} component={Chat}/>
                <Route path={"/settings"} component={Settings}/>
                <Route path={"/logout"} component={Logout}/>

                <Route path={"/"}>
                    <Redirect to={"profile"}/>
                </Route>
            </Switch>
        )
    }

    return (
        <Base>
            {routes}
        </Base>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.access_token
    }
}

export default connect(mapStateToProps)(App);
