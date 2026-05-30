import { createSlice } from "@reduxjs/toolkit";
// Redux Slice using createSlice
const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setUser,setLoading,setError } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
