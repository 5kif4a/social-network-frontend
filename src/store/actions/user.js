import {
    FAILED_LOGIN,
    FAILED_LOGOUT,
    START_LOGIN,
    START_LOGOUT,
    SUCCESS_LOGIN,
    SUCCESS_LOGOUT
} from "./actionsTypes";

// User Login Actions
export function LogIn(dispatch) {
    return async dispatch => {
        dispatch(StartLogin())
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

export function FailLogIn() {
    return {
        type: FAILED_LOGIN
    }
}

// User Logout Actions
export function LogOut(dispatch) {
    return async dispatch => {


    }
}

export function SuccessLogOut() {
    return {
        type: SUCCESS_LOGOUT
    }
}

export function StartLogOut() {
    return {
        type: START_LOGOUT
    }
}

export function FailLogOut() {
    return {
        type: FAILED_LOGOUT
    }
}

