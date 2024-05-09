import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, {payload}) => {
        state.user = payload;
    },
  },
});

export const { saveUser } = authSlice.actions

export default authSlice.reducer
