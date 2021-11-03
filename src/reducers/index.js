import { combineReducers } from "redux";
import contactsReducer from "./contactsReducers";
export default combineReducers({
  result: contactsReducer,
});
