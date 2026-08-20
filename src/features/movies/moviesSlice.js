import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbApi } from "../../services/api";

export const fetchTrending = createAsyncThunk("movies/fetchTrending", async () => {
  const data = await tmdbApi.getTrending();
  return data.results;
});

export const fetchPopular = createAsyncThunk("movies/fetchPopular", async (page = 1) => {
  const data = await tmdbApi.getPopular(page);
  return { results: data.results, page: data.page, totalPages: data.total_pages };
});

export const searchMovies = createAsyncThunk("movies/search", async ({ query, page = 1 }) => {
  const data = await tmdbApi.searchMovies(query, page);
  return { results: data.results, page: data.page, totalPages: data.total_pages, query };
});

export const fetchMovieDetails = createAsyncThunk("movies/fetchDetails", async (id) => {
  return tmdbApi.getMovieDetails(id);
});

export const fetchTVDetails = createAsyncThunk("movies/fetchTVDetails", async (id) => {
  return tmdbApi.getTVDetails(id);
});

export const fetchGenres = createAsyncThunk("movies/fetchGenres", async () => {
  const data = await tmdbApi.getGenres();
  return data.genres;
});

export const discoverByGenre = createAsyncThunk("movies/discoverByGenre", async ({ genreId, page = 1 }) => {
  const data = await tmdbApi.discoverByGenre(genreId, page);
  return { results: data.results, page: data.page, totalPages: data.total_pages, genreId };
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    trending: [],
    results: [],
    currentMovie: null,
    genres: [],
    query: "",
    activeGenre: null,
    page: 1,
    totalPages: 1,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.query = "";
      state.page = 1;
      state.totalPages = 1;
    },
    setActiveGenre: (state, action) => {
      state.activeGenre = action.payload;
    },
  },
  extraReducers: (builder) => {
    const loading = (state) => { state.status = "loading"; };
    const failed = (state, action) => { state.status = "failed"; state.error = action.error.message; };

    builder
      .addCase(fetchTrending.pending, loading)
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trending = action.payload;
      })
      .addCase(fetchTrending.rejected, failed)

      .addCase(fetchPopular.pending, loading)
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPopular.rejected, failed)

      .addCase(searchMovies.pending, loading)
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.query = action.payload.query;
      })
      .addCase(searchMovies.rejected, failed)

      .addCase(fetchMovieDetails.pending, loading)
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, failed)

      .addCase(fetchTVDetails.pending, loading)
      .addCase(fetchTVDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentMovie = { ...action.payload, title: action.payload.name, release_date: action.payload.first_air_date };
      })
      .addCase(fetchTVDetails.rejected, failed)

      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })

      .addCase(discoverByGenre.pending, loading)
      .addCase(discoverByGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.activeGenre = action.payload.genreId;
      })
      .addCase(discoverByGenre.rejected, failed);
  },
});

export const { clearSearch, setActiveGenre } = moviesSlice.actions;
export default moviesSlice.reducer;