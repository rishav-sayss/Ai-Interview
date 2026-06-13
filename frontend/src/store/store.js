import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/state/auth.state";
import interviewReducer from "../feature/interview/state/interview.state";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
  },
});

export default store;
