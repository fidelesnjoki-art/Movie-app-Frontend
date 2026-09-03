import { createSlice } from "@reduxjs/toolkit";

const getStored = (key) => (typeof localStorage !== "undefined" ? localStorage.getItem(key) : null);
const storedUser = getStored("currentUser");
const storedAccessToken = getStored("accessToken");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedAccessToken,
  isAuthenticated: Boolean(storedUser && storedAccessToken),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload?.user ?? action.payload;
      const access = action.payload?.access ?? action.payload?.accessToken ?? null;
      const refresh = action.payload?.refresh;
      state.user = user;
      state.accessToken = access;
      state.isAuthenticated = true;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (access) localStorage.setItem("accessToken", access);
        if (refresh) localStorage.setItem("refreshToken", refresh);
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;