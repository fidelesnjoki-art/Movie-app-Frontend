import { describe, expect, it } from "vitest";
import authReducer, { login, logout, updateProfile } from "./authSlice";

describe("authSlice", () => {
  it("logs a user in and out", () => {
    const user = { id: 1, username: "moviefan" };
    const loggedIn = authReducer(undefined, login(user));

    expect(loggedIn).toEqual({ user, isAuthenticated: true });
    expect(authReducer(loggedIn, logout())).toEqual({ user: null, isAuthenticated: false });
  });

  it("updates only the supplied profile fields", () => {
    const state = { user: { id: 1, username: "moviefan", bio: "Old bio" }, isAuthenticated: true };

    expect(authReducer(state, updateProfile({ bio: "New bio" }))).toEqual({
      user: { id: 1, username: "moviefan", bio: "New bio" },
      isAuthenticated: true,
    });
  });
});
