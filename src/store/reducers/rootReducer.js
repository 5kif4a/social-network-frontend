import {combineReducers} from "redux";
import postsReducer from "./posts";
import userReducer from "./user";
import authReducer from "./auth";
import searchReducer from "../actions/search";
import friendsReducer from "./friends";
import {RESET_STATE} from "../actions/actionsTypes";


const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    posts: postsReducer,
    search: searchReducer,
    friends: friendsReducer
});

export default function rootReducer(state, action) {
    if (action.type === RESET_STATE) {
        state = undefined
    }
    return appReducer(state, action)
}
