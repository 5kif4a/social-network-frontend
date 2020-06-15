import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Base from "./components/Base/Base";
import Profile from "./components/Profile/Profile";
import Chat from "./components/Chat/Chat";
import Settings from "./components/Settings/Settings";


function App() {
    return (
        <Router>
            <Base>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/profile"/>
                    </Route>
                    <Route path={"/profile"} component={Profile}/>
                    <Route path={"/im"} component={Chat}/>
                    <Route path={"/settings"} component={Settings}/>
                </Switch>
            </Base>
        </Router>
    );
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(App);
