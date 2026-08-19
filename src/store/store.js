import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clubsReducer from "../features/clubs/clubsSlice";
import moviesReducer from "../features/movies/moviesSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clubs: clubsReducer,
    movies: moviesReducer,
    posts: postsReducer,
    users: usersReducer,
    watchlist: watchlistReducer,
  },
});