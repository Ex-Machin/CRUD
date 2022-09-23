import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./slices/UsersSlice";

const rootReducer = combineReducers({
  user: UsersSlice,
});

export default configureStore({
  reducer: rootReducer,
});
