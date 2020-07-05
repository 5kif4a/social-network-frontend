import {FAILED_FETCH_POSTS, REQUEST_COMPLETED, START_FETCH_POSTS, SUCCESS_FETCH_POSTS} from "./actionsTypes";
import {API} from "../../axios/api";

export function FetchPosts(user_id) {
    return async dispatch => {
        dispatch(StartFetchPosts());
        try {
            const response = await API.get(`api/user_posts/${user_id}`);
            const posts = response.data;
            dispatch(SuccessFetchPosts({
                posts
            }))

        } catch (e) {
            let error_message = "Error was occurred!";
            dispatch(FailedFetchPosts({
                error: true,
                error_message
            }))
        } finally {
            dispatch(CompleteRequest())
        }
    }
}

export function StartFetchPosts() {
    return {
        type: START_FETCH_POSTS
    }
}

export function SuccessFetchPosts(payload) {
    return {
        type: SUCCESS_FETCH_POSTS,
        payload
    }
}

export function FailedFetchPosts(payload) {
    return {
        type: FAILED_FETCH_POSTS,
        payload
    }
}

export function CompleteRequest() {
    return {
        type: REQUEST_COMPLETED
    }
}
