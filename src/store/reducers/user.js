import {
    FAILED_FETCH_USER_PROFILE_INFO,
    FAILED_UPDATE_USER_PROFILE_INFO,
    FETCH_USER_PROFILE_INFO_REQUEST_COMPLETED,
    START_FETCH_USER_PROFILE_INFO,
    START_UPDATE_USER_PROFILE_INFO,
    SUCCESS_FETCH_USER_PROFILE_INFO,
    SUCCESS_UPDATE_USER_PROFILE_INFO,
    UPDATE_USER_PROFILE_INFO_REQUEST_COMPLETED
} from "../actions/actionsTypes";

const initialState = {
    isRequesting: false,
    username: null,
    first_name: null,
    last_name: null,
    avatar: null,
    theme: null,
    status: null,
    error: false,
    error_message: "",
    postText: "",
    profile_settings_error: false,
    profile_settings_msg: ""
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCH_USER_PROFILE_INFO:
            return {
                ...state,
                isRequesting: true
            };
        case SUCCESS_FETCH_USER_PROFILE_INFO:
            return {
                ...state,
                username: action.payload.username,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                avatar: action.payload.avatar,
                theme: action.payload.theme,
                status: action.payload.status,
                error: false,
                error_message: ""
            };
        case FAILED_FETCH_USER_PROFILE_INFO:
            return {
                ...state,
                error: true,
                error_message: action.payload.error_message
            };
        case FETCH_USER_PROFILE_INFO_REQUEST_COMPLETED: {
            return {
                ...state,
                isRequesting: false
            }
        }
        case START_UPDATE_USER_PROFILE_INFO:
            return {
                ...state,
                isRequesting: true,
                profile_settings_error: false,
                profile_settings_msg: ""
            };
        case SUCCESS_UPDATE_USER_PROFILE_INFO:
            return {
                ...state,
                first_name: action.payload.first_name,
                last_name: action.last_name,
                avatar: action.payload.avatar,
                theme: action.payload.theme,
                status: action.payload.status
            };
        case FAILED_UPDATE_USER_PROFILE_INFO:
            return {
                ...state,
                profile_settings_error: true,
                profile_settings_msg: action.payload.error_message
            };
        case UPDATE_USER_PROFILE_INFO_REQUEST_COMPLETED:
            return {
                ...state,
                isRequesting: false,
            };
        default:
            return state
    }

}
