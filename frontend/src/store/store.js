import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/state/auth.state";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
