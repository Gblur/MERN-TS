import { combineReducers } from "redux";
import { authReducer } from "./auth";
import posts from "./postReducer";

export default combineReducers({
  posts,
  authReducer,
});
