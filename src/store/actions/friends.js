import {
    ADD_USER_TO_FRIENDS_REQUEST_COMPLETED,
    FAILED_ADD_USER_TO_FRIENDS,
    FAILED_FETCH_USER_FRIENDS,
    FETCH_USER_FRIENDS_REQUEST_COMPLETED,
    START_ADD_USER_TO_FRIENDS,
    START_FETCH_USER_FRIENDS,
    START_USER_UNFRIEND,
    SUCCESS_ADD_USER_TO_FRIENDS,
    SUCCESS_FETCH_USER_FRIENDS
} from "./actionsTypes";
import {API} from "../../axios/api";

export function fetchUserFriends(friendsSetter) {
    return async (dispatch, getState) => {
        dispatch({type: START_FETCH_USER_FRIENDS});
        try {
            const user_id = getState().auth.user_id;
            const response = await API.get(`/api/friends/${user_id}`);
            const friends = response.data;
            dispatch({type: SUCCESS_FETCH_USER_FRIENDS, payload: {friends}});
            // useState hook
            friendsSetter(friends);
        } catch (e) {
            const error = e.response;
            let error_message = null;

            if (error) {
                if (error.status === 400) error_message = "Error was occurred!";
            } else
                error_message = "No connection or request timeout!";
            dispatch({type: FAILED_FETCH_USER_FRIENDS, payload: {error_message}})
        } finally {
            dispatch({type: FETCH_USER_FRIENDS_REQUEST_COMPLETED})
        }
    }
}

export function addFriend(user_id) {
    return async (dispatch, getState) => {
        dispatch({type: START_ADD_USER_TO_FRIENDS});
        try {
            const current_user_id = getState().auth.user_id;
            await API.post('/api/friends/', {user: current_user_id, friend: user_id});
            dispatch({type: SUCCESS_ADD_USER_TO_FRIENDS});
        } catch (e) {
            const error = e.response;
            let error_message = null;

            if (error) {
                if (error.status === 400) error_message = "Error was occurred!";
            } else
                error_message = "No connection or request timeout!";
            dispatch({type: FAILED_ADD_USER_TO_FRIENDS, payload: {error_message}})
        } finally {
            dispatch({type: ADD_USER_TO_FRIENDS_REQUEST_COMPLETED})
        }
    }
}

export function unfriend(friend_id) {
    return async (dispatch, getState) => {
        dispatch({type: START_USER_UNFRIEND});
        try {
            const current_user_id = getState().auth.user_id;
            await API.delete(`/api/friends/${current_user_id}`, {data: {friend_id}});
            dispatch({type: SUCCESS_ADD_USER_TO_FRIENDS});

        } catch (e) {
            const error = e.response;
            let error_message = null;

            if (error) {
                if (error.status === 400) error_message = "Error was occurred!";
            } else
                error_message = "No connection or request timeout!";
            dispatch({type: FAILED_ADD_USER_TO_FRIENDS, payload: {error_message}})
        } finally {
            dispatch({type: ADD_USER_TO_FRIENDS_REQUEST_COMPLETED})
        }
    }
}

