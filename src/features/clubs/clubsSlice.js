import { createSlice } from "@reduxjs/toolkit";
import { clubs as seedClubs } from "../../data/clubs";

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
});

export const { toggleJoin, createClub, addClubPost } = clubsSlice.actions;
export default clubsSlice.reducer;