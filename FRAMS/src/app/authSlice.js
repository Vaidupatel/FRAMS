// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isLoggedIn: false,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
