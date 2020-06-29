// import {FAILED_LOGIN, START_LOGIN, SUCCESS_LOGIN, SUCCESS_LOGOUT} from "../actions/actionsTypes";
//
// const initialState = {
//     isAuthenticated: false,
//     isRequesting: false,
//     access_token: null,
//     refresh_token: null,
//     username: null,
//     first_name: null,
//     last_name: null,
//     avatar: null,
//     theme: null,
//     status: null,
//     error: null
// };
//
// export default function userReducer(state = initialState, action) {
//     switch (action.type) {
//         case START_LOGIN:
//             return {...state, isRequesting: true, error: false};
//         case SUCCESS_LOGIN:
//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 isRequesting: false,
//                 access_token: action.payload.access_token,
//                 refresh_token: action.payload.refresh_token,
//                 // username: action.payload.username,
//                 // first_name: action.payload.first_name,
//                 // last_name: action.payload.last_name,
//                 // avatar: action.payload.avatar,
//                 // theme: action.payload.theme,
//                 // status: action.payload.status
//             };
//         case FAILED_LOGIN:
//             return {
//                 ...state,
//                 isAuthenticated: false,
//                 isRequesting: false,
//                 error: action.payload.error
//             };
//         case SUCCESS_LOGOUT:
//             return {
//                 ...state, isAuthenticated: false
//             };
//         default:
//             return state
//     }
// }
