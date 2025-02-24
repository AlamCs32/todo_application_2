import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { toastReducer } from "./slices/toastSlice";
import { userApiAction, userApiReducer } from "./apiSlice/userApiSlice";
import { todoApiActions, todoApiReducer } from "./apiSlice/todoApiSlice";

const rootReducers = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  [userApiAction.reducerPath]: userApiReducer,
  [todoApiActions.reducerPath]: todoApiReducer,
});

export default rootReducers;
