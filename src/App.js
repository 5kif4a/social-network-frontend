import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Base from "./components/Base/Base";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ChatPage from "./components/Chat/ChatPage";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Logout from "./components/Base/Logout";
import Success from "./components/Success/Success";
import FriendsPage from "./components/FriendsPage/FriendsPage";


function App(props) {
    let routes = (
        <Switch>
            <Route path={"/auth"} component={SignIn}/>
            <Route path={"/register"} component={SignUp}/>
            <Route path={"/success"} component={Success}/>
            <Route path={"/"}>
                <Redirect to={"/auth"}/>
            </Route>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>

                <Route path={"/profile"} component={ProfilePage}/>
                <Route path={"/im"} component={ChatPage}/>
                <Route path={"/friends"} component={FriendsPage}/>
                <Route path={"/settings"} component={ProfileSettings}/>

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
