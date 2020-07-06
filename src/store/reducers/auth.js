import {
    FAILED_LOGIN,
    FAILED_REGISTER,
    REQUEST_COMPLETED,
    START_LOGIN,
    START_REGISTER,
    SUCCESS_LOGIN,
    SUCCESS_REGISTER
} from "../actions/actionsTypes";

const initialState = {
    user_id: localStorage.getItem('user_id'),
    isRequesting: false,
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
    error: false,
    error_message: ""
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
                user_id: action.payload.user_id,
                access_token: action.payload.tokens.access_token,
                refresh_token: action.payload.tokens.refresh_token,
                error: false,
                error_message: ""
            };
        case FAILED_LOGIN:
            return {
                ...state,
                error: action.payload.error,
                error_message: action.payload.error_message
            };
        case START_REGISTER:
            return {
                ...state,
                isRequesting: true

            };
        case SUCCESS_REGISTER:
            return {
                ...state
            };
        case FAILED_REGISTER:
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
        default:
            return state
    }
}
