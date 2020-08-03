import {
    ADD_USER_TO_FRIENDS_REQUEST_COMPLETED,
    FAILED_ADD_USER_TO_FRIENDS,
    FAILED_FETCH_USER_FRIENDS,
    FAILED_USER_UNFRIEND,
    FETCH_USER_FRIENDS_REQUEST_COMPLETED,
    START_ADD_USER_TO_FRIENDS,
    START_FETCH_USER_FRIENDS,
    START_USER_UNFRIEND,
    SUCCESS_ADD_USER_TO_FRIENDS,
    SUCCESS_FETCH_USER_FRIENDS,
    SUCCESS_USER_UNFRIEND,
    USER_UNFRIEND_REQUEST_COMPLETED
} from "../actions/actionsTypes"

const initialState = {
    isRequesting: false,
    friends: [],
    error: false,
    error_msg: ""
};

export default function friendsReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCH_USER_FRIENDS:
            return {
                ...state,
                isRequesting: true,
                error: false,
                error_msg: false
            };
        case SUCCESS_FETCH_USER_FRIENDS:
            return {
                ...state,
                friends: action.payload.friends
            };
        case FAILED_FETCH_USER_FRIENDS:
            return {
                ...state,
                error: true,
                error_msg: action.payload.error_message
            };
        case FETCH_USER_FRIENDS_REQUEST_COMPLETED:
            return {
                ...state,
                isRequesting: false
            };
        case START_ADD_USER_TO_FRIENDS:
            return {
                ...state,
                isRequesting: true,
                error: false,
                error_msg: false
            };
        case SUCCESS_ADD_USER_TO_FRIENDS:
            return {
                ...state
            };
        case FAILED_ADD_USER_TO_FRIENDS:
            return {
                ...state,
                error: true,
                error_msg: action.payload.error_message
            };
        case ADD_USER_TO_FRIENDS_REQUEST_COMPLETED:
            return {
                ...state,
                isRequesting: false
            };
        case START_USER_UNFRIEND:
            return {
                ...state,
                isRequesting: true,
                error: false,
                error_msg: false
            };
        case SUCCESS_USER_UNFRIEND:
            return {
                ...state
            };
        case FAILED_USER_UNFRIEND:
            return {
                ...state,
                error: true,
                error_msg: action.payload.error_message
            };
        case USER_UNFRIEND_REQUEST_COMPLETED:
            return {
                ...state,
                isRequesting: false
            };
        default:
            return state
    }
}
