import {
    FAILED_LOGIN,
    FAILED_REGISTER,
    LOGOUT,
    REQUEST_COMPLETED,
    START_LOGIN,
    START_REGISTER,
    SUCCESS_LOGIN,
    SUCCESS_REGISTER
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
            const response = await API.post('/api/token/', authData);
            const tokens = response.data;
            const decoded_token = jwt_decode(tokens.access);

            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);
            localStorage.setItem('user_id', decoded_token.user_id);
            localStorage.setItem('expiration_date', decoded_token.exp);

            dispatch(SuccessLogIn({
                    user_id: decoded_token.user_id,
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
                error_message = "No connection or request timeout!";

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
    return dispatch => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem('user_id');
        localStorage.removeItem('expiration_date');
        dispatch(Logout());
    }
}

export function Logout() {
    return {
        type: LOGOUT
    }
}

// User Registration Actions
export function Register(username, email, first_name, last_name, password) {
    return async dispatch => {
        const registerData = {
            username,
            email,
            first_name,
            last_name,
            password
        };
        dispatch(StartRegister());
        try {
            const response = await API.post('/auth/users/', registerData);
            console.log(response.data);
            dispatch(SuccessRegister())

        } catch (e) {
            const error = e.response;
            let error_message;
            if (error) {
                if (error.status === 400) {
                    error_message = error.data.username || error.data.password
                }
            } else
                error_message = "No connection or request timeout!";

            dispatch(FailedRegister({
                error: true,
                error_message
            }))
        } finally {
            dispatch(CompleteRequest());
        }
    }
}

export function StartRegister() {
    return {
        type: START_REGISTER
    }
}

export function SuccessRegister() {
    return {
        type: SUCCESS_REGISTER
    }
}

export function FailedRegister(payload) {
    return {
        type: FAILED_REGISTER,
        payload
    }
}
