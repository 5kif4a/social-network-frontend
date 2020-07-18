import {
    FAILED_SEARCH_USERS,
    SEARCH_USERS_REQUEST_COMPLETED,
    START_SEARCH_USERS,
    SUCCESS_SEARCH_USERS
} from "../actions/actionsTypes"

const initialState = {
    isRequesting: false,
    users: [],
    error: false,
    error_msg: ""
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case START_SEARCH_USERS:
            return {
                ...state,
                isRequesting: true
            };
        case SUCCESS_SEARCH_USERS:
            return {
                ...state,
                users: action.payload.users
            };
        case FAILED_SEARCH_USERS:
            return {};
        case SEARCH_USERS_REQUEST_COMPLETED:
            return {
                ...state,
                isRequesting: false
            };
        default:
            return state
    }
}
