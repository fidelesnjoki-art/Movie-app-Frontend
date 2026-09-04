import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../../services/api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await backendApi.listUsers();
  return Array.isArray(response) ? response : response.results ?? [];
});

export const toggleFollowRemote = createAsyncThunk("users/toggleFollowRemote", async (id, { getState }) => {
  const following = getState().users.followingIds.includes(id);
  if (following) {
    await backendApi.unfollowUser(id);
  } else {
    await backendApi.followUser(id);
  }
  return { id, following: !following };
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    followingIds: [],
    status: "idle",
  },
  reducers: {
    toggleFollow: (state, action) => {
      const id = action.payload;
      if (state.followingIds.includes(id)) {
        state.followingIds = state.followingIds.filter((i) => i !== id);
      } else {
        state.followingIds.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.pending, (state) => { state.status = "loading"; })
      .addCase(toggleFollowRemote.fulfilled, (state, action) => {
        const { id, following } = action.payload;
        if (following) {
          if (!state.followingIds.includes(id)) state.followingIds.push(id);
        } else {
          state.followingIds = state.followingIds.filter((i) => i !== id);
        }
      });
  },
});

export const { toggleFollow } = usersSlice.actions;
export default usersSlice.reducer;
