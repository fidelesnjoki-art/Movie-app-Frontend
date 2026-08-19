import { createSlice } from "@reduxjs/toolkit";
import { posts as seedPosts } from "../../data/posts";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: seedPosts,
  },
  reducers: {
    addPost: (state, action) => {
      state.items.unshift({
        id: Date.now(),
        user: { name: "You" },
        ...action.payload,
      });
    },
    toggleLike: (state, action) => {
      const post = state.items.find((item) => item.id === action.payload);
      if (post) {
        post.likes = (post.likes ?? 0) + 1;
      }
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.items.find((item) => item.id === postId);
      if (post) {
        post.comments = [...(post.comments ?? []), comment];
      }
    },
  },
});

export const { addPost, toggleLike, addComment } = postsSlice.actions;
export default postsSlice.reducer;
