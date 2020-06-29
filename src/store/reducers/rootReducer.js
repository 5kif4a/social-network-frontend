import {combineReducers} from "redux";
import postsReducer from "./posts";
import userReducer from "./user";
import authReducer from "./auth";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    posts: postsReducer
});
