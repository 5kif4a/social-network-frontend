import {
    FAILED_LOGIN,
    REQUEST_COMPLETED,
    START_LOGIN,
    START_LOGOUT,
    SUCCESS_LOGIN,
    SUCCESS_LOGOUT
} from "../actions/actionsTypes";

const initialState = {
    user: {},
    isRequesting: false,
    access_token: null,
    refresh_token: null,
    error: false,
    error_message: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOGIN:
            return {
                ...state,
                isRequesting: true
            };
        case SUCCESS_LOGIN:
            return {
                ...state,
                user: action.payload.user,
                access_token: action.payload.tokens.access_token,
                refresh_token: action.payload.tokens.refresh_token,
                error: false
            };
        case FAILED_LOGIN:
            return {
                ...state,
                error: action.payload.error,
                error_message: action.payload.error_message
            };
        case REQUEST_COMPLETED:
            return {
                ...state,
                isRequesting: false
            };
        case START_LOGOUT: {
            return {
                ...state
            }
        }
        case SUCCESS_LOGOUT:
            return {
                ...state,
                access_token: null,
                refresh_token: null,
            };
        default:
            return state
    }
}
