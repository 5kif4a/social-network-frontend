import {
    FAILED_FETCH_POSTS,
    FAILED_PUBLISH_POST,
    START_FETCH_POSTS,
    START_PUBLISH_POST,
    SUCCESS_FETCH_POSTS,
    SUCCESS_PUBLISH_POST
} from "./actionsTypes";
import {API} from "../../axios/api";

export function FetchPosts(user_id) {
    return async dispatch => {
        dispatch(StartFetchPosts());
        try {
            const response = await API.get(`/api/user_posts/${user_id}`);
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

// Post publish actions
export function PublishPost(user_id, postText, image) {
    return async dispatch => {
        dispatch(StartPublishPost());

        const postData = new FormData();
        postData.append('user', user_id);
        postData.append('content', postText);
        if (image) postData.append('attachment', image, image.name);

        try {
            await API.post('/api/user_posts/', postData);
            dispatch(SuccessPublishPost())
        } catch (e) {
            const error = e.response;
            let error_message = null;

            if (error) {
                if (error.status === 400) error_message = "Error was occurred!";
            } else
                error_message = "No connection or request timeout!";

            dispatch(FailedPublishPost({
                error: true,
                error_message
            }))
        }
    }
}

export function StartPublishPost() {
    return {
        type: START_PUBLISH_POST
    }
}

export function SuccessPublishPost() {
    return {
        type: SUCCESS_PUBLISH_POST
    }
}

export function FailedPublishPost(payload) {
    return {
        type: FAILED_PUBLISH_POST,
        payload
    }
}
