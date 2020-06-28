import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Base from "./components/Base/Base";
import Profile from "./components/Profile/Profile";
import Chat from "./components/Chat/Chat";
import Settings from "./components/Settings/Settings";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";


function App(props) {
    return (
        <Router>
            <Base>
                <Switch>
                    {
                        props.user.isAuthenticated ?
                            <>
                                {/* redirect start page on profile page*/}
                                <Route exact path="/">
                                    <Redirect to="/profile"/>
                                </Route>

                                {/* if user logged redirect auth pages to profile page */}
                                <Route path={"/auth"}>
                                    <Redirect to="/profile"/>
                                </Route>
                                <Route path={"/register"}>
                                    <Redirect to="/profile"/>
                                </Route>

                                {/* main routes */}
                                <Route path={"/profile"} component={Profile}/>
                                <Route path={"/im"} component={Chat}/>
                                <Route path={"/settings"} component={Settings}/>
                            </>
                            :
                            <>
                                <Redirect to={"auth"}/>
                                <Route path={"/auth"} component={SignIn}/>
                                <Route path={"/register"} component={SignUp}/>
                            </>
                    }
                </Switch>
            </Base>
        </Router>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App);
