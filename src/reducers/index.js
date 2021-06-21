import { combineReducers } from "redux";
import monitorReducer from "./monitorReducers";
export default combineReducers({
  result: monitorReducer,
});
