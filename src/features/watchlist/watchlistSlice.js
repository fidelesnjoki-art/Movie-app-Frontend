import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try { return JSON.parse(localStorage.getItem("watchlist")) ?? []; }
  catch { return []; }
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: load() },
  reducers: {
    toggleWatchlist: (state, action) => {
      const movie = action.payload;
      const exists = state.items.some((m) => m.id === movie.id);
      if (exists) {
        state.items = state.items.filter((m) => m.id !== movie.id);
      } else {
        state.items.push(movie);
      }
      localStorage.setItem("watchlist", JSON.stringify(state.items));
    },
  },
});

export const { toggleWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
