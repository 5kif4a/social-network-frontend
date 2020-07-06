import {combineReducers} from "redux";
import postsReducer from "./posts";
import userReducer from "./user";
import authReducer from "./auth";

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    posts: postsReducer
});

export default function rootReducer(state, action) {
    if (action.type === 'LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}
