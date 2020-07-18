import {
    FAILED_FETCH_USER_FRIENDS,
    FETCH_USER_FRIENDS_REQUEST_COMPLETED,
    START_FETCH_USER_FRIENDS,
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
