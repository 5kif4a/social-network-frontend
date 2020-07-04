import {
    FAILED_LOGIN,
    FAILED_LOGOUT,
    REQUEST_COMPLETED,
    START_LOGIN,
    START_LOGOUT,
    SUCCESS_LOGIN,
    SUCCESS_LOGOUT
} from "./actionsTypes";
import {API} from "../../axios/api";
import jwt_decode from "jwt-decode";

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
            const decoded_token = jwt_decode(tokens.access);

            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);
            localStorage.setItem('user_id', decoded_token.user_id);
            localStorage.setItem('expiration_date', decoded_token.exp);

            dispatch(SuccessLogIn({
                    user: {
                        id: decoded_token['user_id']
                    },
                    tokens: {
                        access_token: tokens.access,
                        refresh_token: tokens.refresh
                    }
                }
            ));

        } catch (e) {
            const error = e.response;
            let error_message = null;

            if (error) {
                if (error.status === 400) error_message = "Username and password fields may not be blank!";
                if (error.status === 401) error_message = "Invalid username or password!";
            } else
                error_message = "No connection!";

            dispatch(FailLogIn({
                error: true,
                error_message
            }))

        } finally {
            dispatch(CompleteRequest())
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

export function CompleteRequest() {
    return {
        type: REQUEST_COMPLETED
    }
}

// User Logout Actions
export function LogOut() {
    return async dispatch => {
        dispatch(StartLogOut());
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem('user_id');
        localStorage.removeItem('expiration_date');
        dispatch(SuccessLogOut());
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

