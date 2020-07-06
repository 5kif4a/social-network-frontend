import {
    FAILED_FETCH_USER_PROFILE_INFO,
    REQUEST_COMPLETED,
    START_FETCH_USER_PROFILE_INFO,
    SUCCESS_FETCH_USER_PROFILE_INFO
} from "./actionsTypes";
import {API} from "../../axios/api";

export default function GetUserProfileInfo(user_id) {
    return async dispatch => {
        dispatch(StartFetchUserProfileInfo());
        try {
            const response = await API.get(`/api/profiles/${user_id}/`);
            const data = response.data;

            dispatch(SuccessFetchUserProfileInfo({
                username: data.user.username,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                avatar: data.avatar,
                theme: data.theme,
                status: data.status
            }))
        } catch (e) {
            const error = e.response;
            let error_message = null;

            if (error) {
                if (error.status === 400) error_message = "User doesn't exist!";
            } else
                error_message = "No connection or request timeout!";

            dispatch(FailedFetchUserProfileInfo({
                error: true,
                error_message
            }));
        } finally {
            dispatch(CompleteRequest())
        }
    }
}

export function CompleteRequest() {
    return {
        type: REQUEST_COMPLETED
    }
}

export function StartFetchUserProfileInfo() {
    return {
        type: START_FETCH_USER_PROFILE_INFO
    }
}

export function SuccessFetchUserProfileInfo(payload) {
    return {
        type: SUCCESS_FETCH_USER_PROFILE_INFO,
        payload
    }
}

export function FailedFetchUserProfileInfo(payload) {
    return {
        type: FAILED_FETCH_USER_PROFILE_INFO,
        payload
    }
}
