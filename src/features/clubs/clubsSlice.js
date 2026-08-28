import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clubs as seedClubs } from "../../data/clubs";
import { backendApi } from "../../services/api";

export const fetchClubs = createAsyncThunk("clubs/fetchClubs", async () => {
  const response = await backendApi.listClubs();
  return (Array.isArray(response) ? response : response.results ?? []).map((club) => ({
    ...club,
    members: club.member_count,
    createdBy: club.created_by,
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
  return { ...response, members: response.member_count, createdBy: response.created_by };
});

const clubsSlice = createSlice({
  name: "clubs",
  initialState: {
    items: seedClubs,
    joinedIds: [],
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
    createClub: (state, action) => {
      state.items.unshift({
        id: Date.now(),
        members: 1,
        posts: 0,
        banner: null,
        ...action.payload,
      });
      state.joinedIds.push(action.payload.id ?? Date.now());
    },
    addClubPost: (state, action) => {
      const { clubId } = action.payload;
      const club = state.items.find((c) => c.id === clubId);
      if (club) club.posts += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClubs.fulfilled, (state, action) => {
      state.items = action.payload;
    }).addCase(toggleJoinRemote.fulfilled, (state, action) => {
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
    }).addCase(createClubRemote.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
      state.joinedIds.push(action.payload.id);
    });
  },
});

export const { toggleJoin, createClub, addClubPost } = clubsSlice.actions;
export default clubsSlice.reducer;