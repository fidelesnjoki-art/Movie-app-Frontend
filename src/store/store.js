import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import moviesReducer from "../features/movies/moviesSlice";
import postsReducer from "../features/posts/postsSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import clubsReducer from "../features/clubs/clubsSlice";
import usersReducer from "../features/users/usersSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    posts: postsReducer,
    watchlist: watchlistReducer,
    clubs: clubsReducer,
    users: usersReducer,
    admin: adminReducer,
  },
});
