import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cinema_auth";

function loadAuth() {
  if (typeof localStorage === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

const storedAuth = loadAuth();
const initialState = storedAuth ?? {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, ...user } = action.payload;
      state.user = user;
      state.token = token ?? null;
      state.isAuthenticated = true;
      state.isAdmin = user.is_staff === true || user.is_superuser === true || ["admin", "superuser"].includes(user.role);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      if (typeof localStorage !== "undefined") localStorage.removeItem(STORAGE_KEY);
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
