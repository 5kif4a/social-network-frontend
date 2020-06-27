import {combineReducers} from "redux";
import postsReducer from "./posts";
import userReducer from "./user";

export default combineReducers({
    user: userReducer,
    posts: postsReducer
});
