import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
  },
  reducers: {
    toggleWatchlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((movie) => movie.id === item.id);

      if (exists) {
        state.items = state.items.filter((movie) => movie.id !== item.id);
      } else {
        state.items.push(item);
      }
    },
  },
});

export const { toggleWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
