import {
    FAILED_FETCH_POSTS,
    REQUEST_COMPLETED,
    START_FETCH_POSTS,
    SUCCESS_FETCH_POSTS
} from "../actions/actionsTypes";

const initialState = {
    isRequesting: false,
    isLoaded: false,
    posts: [],
    error: false,
    error_message: ""

};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCH_POSTS:
            return {
                ...state,
                isRequesting: true
            };
        case SUCCESS_FETCH_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            };
        case FAILED_FETCH_POSTS:
            return {
                ...state,
                error: true,
                error_message: action.payload.error_message
            };
        case REQUEST_COMPLETED:
            return {
                ...state,
                isRequesting: false,
                isLoaded: true
            };
        default:
            return state
    }
}
