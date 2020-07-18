import {
    FAILED_FETCH_USER_FRIENDS,
    FETCH_USER_FRIENDS_REQUEST_COMPLETED,
    START_FETCH_USER_FRIENDS,
    SUCCESS_FETCH_USER_FRIENDS
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
        default:
            return state
    }
}
