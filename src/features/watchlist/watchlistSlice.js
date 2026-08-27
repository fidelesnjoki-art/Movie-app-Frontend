import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../../services/api";

export const fetchWatchlist = createAsyncThunk("watchlist/fetchWatchlist", async () => {
  const response = await backendApi.listWatchlist();
  return (Array.isArray(response) ? response : response.results ?? []).map((item) => ({
    id: item.movie_id,
    watchlistId: item.id,
    title: item.movie_title,
    poster_path: item.poster_path,
  }));
});

export const toggleWatchlist = createAsyncThunk("watchlist/toggleWatchlist", async (movie, { getState }) => {
  const existing = getState().watchlist.items.find((item) => item.id === movie.id);
  if (existing) {
    await backendApi.removeWatchlist(existing.watchlistId);
    return { removeId: movie.id };
  }
  const item = await backendApi.addWatchlist({
    movie_id: movie.id,
    movie_title: movie.title,
    poster_path: movie.poster_path ?? "",
  });
  return { add: { id: item.movie_id, watchlistId: item.id, title: item.movie_title, poster_path: item.poster_path } };
});

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(toggleWatchlist.fulfilled, (state, action) => {
        if (action.payload.removeId !== undefined) {
          state.items = state.items.filter((item) => item.id !== action.payload.removeId);
        } else if (action.payload.add) {
          state.items.push(action.payload.add);
        }
      });
  },
});

export default watchlistSlice.reducer;
