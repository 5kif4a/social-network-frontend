import {FAILED_LOGIN, FAILED_LOGOUT, START_LOGIN, START_LOGOUT, SUCCESS_LOGIN, SUCCESS_LOGOUT} from "./actionsTypes";
import {API, setTokens} from "../../axios/api";

// User Login Actions
export function LogIn(username, password) {
    return async dispatch => {
        dispatch(StartLogin());
        const authData = {
            username, password
        };
        try {
            const response = await API.post('api/token/', authData);
            const tokens = response.data;
            setTokens(tokens);

            dispatch(SuccessLogIn({
                access_token: tokens['access'],
                refresh_token: tokens['refresh'],
            }));
            // after login redirect to profile page
        } catch (e) {
            const error = e.response;
            console.log(error);
            dispatch(FailLogIn({error: true}))
        }
    }
}


export function StartLogin() {
    return {
        type: START_LOGIN
    }
}

export function SuccessLogIn(payload) {
    return {
        type: SUCCESS_LOGIN,
        payload
    }
}

export function FailLogIn(payload) {
    return {
        type: FAILED_LOGIN,
        payload
    }
}

// User Logout Actions
export function LogOut(dispatch) {
    return async dispatch => {


    }
}


export function StartLogOut() {
    return {
        type: START_LOGOUT
    }
}

export function SuccessLogOut() {
    return {
        type: SUCCESS_LOGOUT
    }
}

export function FailLogOut() {
    return {
        type: FAILED_LOGOUT
    }
}

