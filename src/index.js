import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from "redux";
import reduxThunk from 'redux-thunk';

import './assets/css/styles.css'
import rootReducer from "./store/reducers/rootReducer";
import {Provider} from "react-redux";

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const app =
    <Provider store={store}>
        <App/>
    </Provider>;


ReactDOM.render(
    <React.StrictMode>
        {app}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
