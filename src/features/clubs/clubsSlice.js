import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../../services/api";

export const fetchClubs = createAsyncThunk("clubs/fetchClubs", async () => {
  const response = await backendApi.listClubs();
  return (Array.isArray(response) ? response : response.results ?? []).map((club) => ({
    ...club,
    members: club.member_count ?? 0,
    posts: club.post_count ?? 0,
    createdBy: club.created_by?.name || club.created_by,
  }));
});

export const toggleJoinRemote = createAsyncThunk("clubs/toggleJoinRemote", async (id, { getState }) => {
  const joined = getState().clubs.joinedIds.includes(id);
  await backendApi.toggleClubMembership(id, joined);
  return { id, joined: !joined };
});

export const createClubRemote = createAsyncThunk("clubs/createClubRemote", async (club) => {
  const response = await backendApi.createClub({
    name: club.name,
    description: club.description,
    genre: club.genre,
  });
  return {
    ...response,
    members: response.member_count ?? 1,
    posts: response.post_count ?? 0,
    createdBy: response.created_by?.name || response.created_by,
  };
});

export const deleteClubRemote = createAsyncThunk("clubs/deleteClubRemote", async (id) => {
  await backendApi.deleteClub(id);
  return id;
});

const clubsSlice = createSlice({
  name: "clubs",
  initialState: {
    items: [],
    joinedIds: [],
    status: "idle",
    error: null,
  },
  reducers: {
    toggleJoin: (state, action) => {
      const id = action.payload;
      const club = state.items.find((c) => c.id === id);
      if (!club) return;
      if (state.joinedIds.includes(id)) {
        state.joinedIds = state.joinedIds.filter((i) => i !== id);
        club.members = Math.max(0, club.members - 1);
      } else {
        state.joinedIds.push(id);
        club.members += 1;
      }
    },
    addClubPost: (state, action) => {
      const { clubId } = action.payload;
      const club = state.items.find((c) => c.id === clubId);
      if (club) club.posts += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleJoinRemote.fulfilled, (state, action) => {
        const { id, joined } = action.payload;
        const club = state.items.find((item) => item.id === id);
        if (!club) return;
        if (joined) {
          state.joinedIds.push(id);
          club.members += 1;
        } else {
          state.joinedIds = state.joinedIds.filter((itemId) => itemId !== id);
          club.members = Math.max(0, club.members - 1);
        }
      })
      .addCase(createClubRemote.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.joinedIds.push(action.payload.id);
      })
      .addCase(deleteClubRemote.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export const { toggleJoin, addClubPost } = clubsSlice.actions;
export default clubsSlice.reducer;
