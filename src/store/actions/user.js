import {
    FAILED_FETCH_USER_PROFILE_INFO,
    FAILED_UPDATE_USER_PROFILE_INFO,
    FETCH_USER_PROFILE_INFO_REQUEST_COMPLETED,
    START_FETCH_USER_PROFILE_INFO,
    START_UPDATE_USER_PROFILE_INFO,
    SUCCESS_FETCH_USER_PROFILE_INFO,
    SUCCESS_UPDATE_USER_PROFILE_INFO,
    UPDATE_USER_PROFILE_INFO_REQUEST_COMPLETED
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
            let error_message;

            if (error) {
                if (error.status === 400) error_message = "User doesn't exist!";
            } else
                error_message = "No connection or request timeout!";

            dispatch(FailedFetchUserProfileInfo({error_message}));
        } finally {
            dispatch({type: FETCH_USER_PROFILE_INFO_REQUEST_COMPLETED})
        }
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

// Save Changes User Profile Info
export function SaveChangesUserProfileInfo(data) {
    return async (dispatch, getState) => {
        dispatch({type: START_UPDATE_USER_PROFILE_INFO});

        const updateData = new FormData();
        const user_id = getState().auth.user_id;
        let user = {
            id: user_id
        };
        if (data.first_name) user = {...user, first_name: data.first_name};
        if (data.last_name) user = {...user, last_name: data.last_name};

        if (data.status) updateData.append('status', data.status);
        if (data.avatar) updateData.append('avatar', data.avatar, data.avatar.name);
        if (data.theme) updateData.append('theme', data.theme, data.theme.name);

        updateData.append('user', JSON.stringify(user));

        try {
            const response = await API.patch(`/api/profiles/${user_id}/`, updateData);
            const newProfileData = response.data;
            dispatch({
                type: SUCCESS_UPDATE_USER_PROFILE_INFO,
                payload: {
                    first_name: newProfileData.user.first_name,
                    last_name: newProfileData.user.last_name,
                    avatar: newProfileData.avatar,
                    theme: newProfileData.theme,
                    status: newProfileData.status
                }
            })
        } catch (e) {
            const error = e.response;
            let error_message;

            if (error) {
                if (error.status === 400) error_message = "Error was occurred. Please try later";
            } else
                error_message = "No connection or request timeout!";
            dispatch({type: FAILED_UPDATE_USER_PROFILE_INFO, payload: {error_message}})
        } finally {
            dispatch({type: UPDATE_USER_PROFILE_INFO_REQUEST_COMPLETED})
        }
    }
}
