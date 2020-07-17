import {
    FAILED_SEARCH_USERS,
    SEARCH_USERS_REQUEST_COMPLETED,
    START_SEARCH_USERS,
    SUCCESS_SEARCH_USERS
} from "./actionsTypes";
import {API} from "../../axios/api";

export default function searchUsers(value) {
    return async dispatch => {
        dispatch({type: START_SEARCH_USERS});
        try {
            const response = await API.get(`/api/profiles?q=${value}`);
            const users = response.data.users;
            dispatch({type: SUCCESS_SEARCH_USERS, payload: {users}})
        } catch (e) {
            const error = e.response;
            let error_message = null;

            if (error) {
                if (error.status === 400) error_message = "Error was occurred!";
            } else
                error_message = "No connection or request timeout!";

            dispatch({type: FAILED_SEARCH_USERS, payload: {error_message}})
        } finally {
            dispatch({type: SEARCH_USERS_REQUEST_COMPLETED})
        }
    }
}
