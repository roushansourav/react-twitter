import { combineReducers } from "redux";
import { tweets } from "./tweets";
import { users } from "./users";
import { search } from "./search";

const rootReducer = combineReducers({
  tweets,
  users,
  search,
});

export default rootReducer;
