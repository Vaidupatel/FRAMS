// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("isLoggedIn", state.auth.isLoggedIn);
});

export default store;
