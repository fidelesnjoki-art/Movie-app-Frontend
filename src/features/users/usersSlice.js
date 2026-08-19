import { createSlice } from "@reduxjs/toolkit";

const seedUsers = [
  { id: 1, name: "Sofia Reyes", bio: "Cinephile. Letterboxd addict. Wong Kar-wai devotee.", watched: 743, followers: 1240, following: 310 },
  { id: 2, name: "Marcus Webb", bio: "Film critic and occasional director. Based in London.", watched: 512, followers: 890, following: 204 },
  { id: 3, name: "Aisha Nkosi", bio: "Documentary filmmaker. Loves Agnès Varda.", watched: 388, followers: 620, following: 180 },
  { id: 4, name: "Lena Hoffmann", bio: "German cinema enthusiast. Herzog is my shepherd.", watched: 601, followers: 445, following: 99 },
];

const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: seedUsers,
    followingIds: [],
  },
  reducers: {
    toggleFollow: (state, action) => {
      const id = action.payload;
      const user = state.items.find((u) => u.id === id);
      if (!user) return;
      if (state.followingIds.includes(id)) {
        state.followingIds = state.followingIds.filter((i) => i !== id);
        user.followers = Math.max(0, user.followers - 1);
      } else {
        state.followingIds.push(id);
        user.followers += 1;
      }
    },
  },
});

export const { toggleFollow } = usersSlice.actions;
export default usersSlice.reducer;