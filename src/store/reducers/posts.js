import {
    FAILED_FETCH_POSTS,
    FAILED_PUBLISH_POST, PUBLISH_POST_REQUEST_COMPLETED,
    START_FETCH_POSTS,
    START_PUBLISH_POST,
    SUCCESS_FETCH_POSTS,
    SUCCESS_PUBLISH_POST
} from "../actions/actionsTypes";

const initialState = {
    isLoaded: false,
    isPublishing: false,
    posts: [],
    error: false,
    error_message: ""

};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCH_POSTS:
            return {
                isLoaded: false,
                ...state,
            };
        case SUCCESS_FETCH_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                isLoaded: true
            };
        case FAILED_FETCH_POSTS:
            return {
                ...state,
                isLoaded: true,
                error: true,
                error_message: action.payload.error_message
            };
        case START_PUBLISH_POST:
            return {
                ...state,
                isPublishing: true,
                error: false,
                error_message: ""
            };
        case SUCCESS_PUBLISH_POST:
            return {
                ...state
            };
        case FAILED_PUBLISH_POST:
            return {
                ...state,
                error: true,
                error_message: action.payload.error_message
            };
        case PUBLISH_POST_REQUEST_COMPLETED:
            return {
                ...state,
                isPublishing: false
            };
        default:
            return state
    }
}
