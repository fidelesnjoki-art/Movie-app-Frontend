import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi, { getAdminErrorMessage } from "../../services/adminApi";

// ── Thunks ──────────────────────────────────────────────────────────────────

export const fetchDashboard = createAsyncThunk("admin/fetchDashboard", async (_, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/dashboard/"); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAdminUsers = createAsyncThunk("admin/fetchUsers", async (params = {}, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/users/", { params }); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAdminUser = createAsyncThunk("admin/fetchUser", async (id, { rejectWithValue }) => {
  try { const { data } = await adminApi.get(`/api/admin/users/${id}/`); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const updateAdminUser = createAsyncThunk("admin/updateUser", async ({ id, payload }, { rejectWithValue }) => {
  try { const { data } = await adminApi.patch(`/api/admin/users/${id}/`, payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const updateUserStatus = createAsyncThunk("admin/updateUserStatus", async ({ id, payload }, { rejectWithValue }) => {
  try { const { data } = await adminApi.patch(`/api/admin/users/${id}/status/`, payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const deleteAdminUser = createAsyncThunk("admin/deleteUser", async (id, { rejectWithValue }) => {
  try { await adminApi.delete(`/api/admin/users/${id}/`); return id; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAdminMovies = createAsyncThunk("admin/fetchMovies", async (params = {}, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/movies/", { params }); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const createAdminMovie = createAsyncThunk("admin/createMovie", async (payload, { rejectWithValue }) => {
  try { const { data } = await adminApi.post("/api/admin/movies/", payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const updateAdminMovie = createAsyncThunk("admin/updateMovie", async ({ id, payload }, { rejectWithValue }) => {
  try { const { data } = await adminApi.patch(`/api/admin/movies/${id}/`, payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const deleteAdminMovie = createAsyncThunk("admin/deleteMovie", async (id, { rejectWithValue }) => {
  try { await adminApi.delete(`/api/admin/movies/${id}/`); return id; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAdminClubs = createAsyncThunk("admin/fetchClubs", async (params = {}, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/clubs/", { params }); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const updateAdminClub = createAsyncThunk("admin/updateClub", async ({ id, payload }, { rejectWithValue }) => {
  try { const { data } = await adminApi.patch(`/api/admin/clubs/${id}/status/`, payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const deleteAdminClub = createAsyncThunk("admin/deleteClub", async (id, { rejectWithValue }) => {
  try { await adminApi.delete(`/api/admin/clubs/${id}/`); return id; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAdminPosts = createAsyncThunk("admin/fetchPosts", async (params = {}, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/posts/", { params }); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const updateAdminPost = createAsyncThunk("admin/updatePost", async ({ id, payload }, { rejectWithValue }) => {
  try { const { data } = await adminApi.patch(`/api/admin/posts/${id}/moderate/`, payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const deleteAdminPost = createAsyncThunk("admin/deletePost", async (id, { rejectWithValue }) => {
  try { await adminApi.delete(`/api/admin/posts/${id}/delete/`); return id; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAdminComments = createAsyncThunk("admin/fetchComments", async (params = {}, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/comments/", { params }); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const updateAdminComment = createAsyncThunk("admin/updateComment", async ({ id, payload }, { rejectWithValue }) => {
  try { const { data } = await adminApi.patch(`/api/admin/comments/${id}/moderate/`, payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const deleteAdminComment = createAsyncThunk("admin/deleteComment", async (id, { rejectWithValue }) => {
  try { await adminApi.delete(`/api/admin/comments/${id}/delete/`); return id; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAdminReviews = createAsyncThunk("admin/fetchReviews", async (params = {}, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/reviews/", { params }); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const deleteAdminReview = createAsyncThunk("admin/deleteReview", async (id, { rejectWithValue }) => {
  try { await adminApi.delete(`/api/admin/reviews/${id}/`); return id; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const updateAdminReview = createAsyncThunk("admin/updateReview", async ({ id, payload }, { rejectWithValue }) => {
  try { const { data } = await adminApi.patch(`/api/admin/reviews/${id}/`, payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAdminReports = createAsyncThunk("admin/fetchReports", async (params = {}, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/reports/", { params }); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const updateAdminReport = createAsyncThunk("admin/updateReport", async ({ id, payload }, { rejectWithValue }) => {
  try { const { data } = await adminApi.patch(`/api/admin/reports/${id}/`, payload); return data; }
  catch (e) { return rejectWithValue(getAdminErrorMessage(e)); }
});

export const fetchAnalytics = createAsyncThunk("admin/fetchAnalytics", async (_, { rejectWithValue }) => {
  try { const { data } = await adminApi.get("/api/admin/analytics/"); return data; }
  catch (e) { return rejectWithValue(e.response?.data ?? e.message); }
});

// ── Helpers ──────────────────────────────────────────────────────────────────

const pending = (key) => (state) => { state[key].status = "loading"; state[key].error = null; };
const failed  = (key) => (state, action) => { state[key].status = "failed"; state[key].error = action.payload; };

const listSlot = () => ({ items: [], count: 0, status: "idle", error: null });

// ── Slice ────────────────────────────────────────────────────────────────────

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboard: { data: null, status: "idle", error: null },
    users:     { ...listSlot(), selected: null },
    movies:    { ...listSlot() },
    clubs:     { ...listSlot() },
    posts:     { ...listSlot() },
    reviews:   { ...listSlot() },
    reports:   { ...listSlot() },
    comments:  { ...listSlot() },
    analytics: { data: null, status: "idle", error: null },
  },
  reducers: {
    clearSelectedUser: (state) => { state.users.selected = null; },
  },
  extraReducers: (builder) => {
    // Dashboard
    builder
      .addCase(fetchDashboard.pending,   pending("dashboard"))
      .addCase(fetchDashboard.fulfilled, (state, { payload }) => { state.dashboard.data = payload; state.dashboard.status = "succeeded"; })
      .addCase(fetchDashboard.rejected,  failed("dashboard"));

    // Users
    builder
      .addCase(fetchAdminUsers.pending,   pending("users"))
      .addCase(fetchAdminUsers.fulfilled, (state, { payload }) => {
        state.users.status = "succeeded";
        state.users.items  = payload.results ?? payload;
        state.users.count  = payload.count ?? (payload.results ?? payload).length;
      })
      .addCase(fetchAdminUsers.rejected,  failed("users"))
      .addCase(fetchAdminUser.pending, (state) => { state.users.selected = null; })
      .addCase(fetchAdminUser.fulfilled,  (state, { payload }) => { state.users.selected = payload; })
      .addCase(fetchAdminUser.rejected, (state) => { state.users.selected = null; })
      .addCase(updateAdminUser.fulfilled, (state, { payload }) => {
        state.users.items = state.users.items.map((u) => u.id === payload.id ? payload : u);
        if (state.users.selected?.id === payload.id) state.users.selected = payload;
      })
      .addCase(updateUserStatus.fulfilled, (state, { payload }) => {
        state.users.items = state.users.items.map((u) => u.id === payload.id ? payload : u);
      })
      .addCase(deleteAdminUser.fulfilled, (state, { payload: id }) => {
        state.users.items = state.users.items.filter((u) => u.id !== id);
        state.users.count = Math.max(0, state.users.count - 1);
      });

    // Movies
    builder
      .addCase(fetchAdminMovies.pending,   pending("movies"))
      .addCase(fetchAdminMovies.fulfilled, (state, { payload }) => {
        state.movies.status = "succeeded";
        state.movies.items  = payload.results ?? payload;
        state.movies.count  = payload.count ?? (payload.results ?? payload).length;
      })
      .addCase(fetchAdminMovies.rejected,  failed("movies"))
      .addCase(createAdminMovie.fulfilled, (state, { payload }) => { state.movies.items.unshift(payload); state.movies.count += 1; })
      .addCase(updateAdminMovie.fulfilled, (state, { payload }) => {
        state.movies.items = state.movies.items.map((m) => m.id === payload.id ? payload : m);
      })
      .addCase(deleteAdminMovie.fulfilled, (state, { payload: id }) => {
        state.movies.items = state.movies.items.filter((m) => m.id !== id);
        state.movies.count = Math.max(0, state.movies.count - 1);
      });

    // Clubs
    builder
      .addCase(fetchAdminClubs.pending,   pending("clubs"))
      .addCase(fetchAdminClubs.fulfilled, (state, { payload }) => {
        state.clubs.status = "succeeded";
        state.clubs.items  = payload.results ?? payload;
        state.clubs.count  = payload.count ?? (payload.results ?? payload).length;
      })
      .addCase(fetchAdminClubs.rejected,  failed("clubs"))
      .addCase(updateAdminClub.fulfilled, (state, { payload }) => {
        state.clubs.items = state.clubs.items.map((c) => c.id === payload.id ? payload : c);
      })
      .addCase(deleteAdminClub.fulfilled, (state, { payload: id }) => {
        state.clubs.items = state.clubs.items.filter((c) => c.id !== id);
        state.clubs.count = Math.max(0, state.clubs.count - 1);
      });

    // Posts
    builder
      .addCase(fetchAdminPosts.pending,   pending("posts"))
      .addCase(fetchAdminPosts.fulfilled, (state, { payload }) => {
        state.posts.status = "succeeded";
        state.posts.items  = payload.results ?? payload;
        state.posts.count  = payload.count ?? (payload.results ?? payload).length;
      })
      .addCase(fetchAdminPosts.rejected,  failed("posts"))
      .addCase(updateAdminPost.fulfilled, (state, { payload }) => {
        state.posts.items = state.posts.items.map((p) => p.id === payload.id ? payload : p);
      })
      .addCase(deleteAdminPost.fulfilled, (state, { payload: id }) => {
        state.posts.items = state.posts.items.filter((p) => p.id !== id);
        state.posts.count = Math.max(0, state.posts.count - 1);
      });

    // Reviews
    builder
      .addCase(fetchAdminReviews.pending,   pending("reviews"))
      .addCase(fetchAdminReviews.fulfilled, (state, { payload }) => {
        state.reviews.status = "succeeded";
        state.reviews.items  = payload.results ?? payload;
        state.reviews.count  = payload.count ?? (payload.results ?? payload).length;
      })
      .addCase(fetchAdminReviews.rejected,  failed("reviews"))
      .addCase(updateAdminReview.fulfilled, (state, { payload }) => {
        state.reviews.items = state.reviews.items.map((r) => r.id === payload.id ? payload : r);
      })
      .addCase(deleteAdminReview.fulfilled, (state, { payload: id }) => {
        state.reviews.items = state.reviews.items.filter((r) => r.id !== id);
        state.reviews.count = Math.max(0, state.reviews.count - 1);
      });

    // Reports
    builder
      .addCase(fetchAdminReports.pending,   pending("reports"))
      .addCase(fetchAdminReports.fulfilled, (state, { payload }) => {
        state.reports.status = "succeeded";
        state.reports.items  = payload.results ?? payload;
        state.reports.count  = payload.count ?? (payload.results ?? payload).length;
      })
      .addCase(fetchAdminReports.rejected,  failed("reports"))
      .addCase(updateAdminReport.fulfilled, (state, { payload }) => {
        state.reports.items = state.reports.items.map((r) => r.id === payload.id ? payload : r);
      });

    // Analytics
    builder
      .addCase(fetchAnalytics.pending,   pending("analytics"))
      .addCase(fetchAnalytics.fulfilled, (state, { payload }) => { state.analytics.data = payload; state.analytics.status = "succeeded"; })
      .addCase(fetchAnalytics.rejected,  failed("analytics"));

    // Comments
    builder
      .addCase(fetchAdminComments.pending,   pending("comments"))
      .addCase(fetchAdminComments.fulfilled, (state, { payload }) => {
        state.comments.status = "succeeded";
        state.comments.items  = payload.results ?? payload;
        state.comments.count  = payload.count ?? (payload.results ?? payload).length;
      })
      .addCase(fetchAdminComments.rejected,  failed("comments"))
      .addCase(updateAdminComment.fulfilled, (state, { payload }) => {
        state.comments.items = state.comments.items.map((c) => c.id === payload.id ? payload : c);
      })
      .addCase(deleteAdminComment.fulfilled, (state, { payload: id }) => {
        state.comments.items = state.comments.items.filter((c) => c.id !== id);
        state.comments.count = Math.max(0, state.comments.count - 1);
      });
  },
});

export const { clearSelectedUser } = adminSlice.actions;
export default adminSlice.reducer;
