// I imported createSlice to manage the posts and their actions using Redux
import { createSlice } from "@reduxjs/toolkit";
import { posts as seedPosts } from "../../data/posts";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: seedPosts,
    likedIds: [],
  },
  reducers: {
    // I added this reducer to add a new comment to a post
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.items.find((p) => p.id === postId);
      if (!post) return;
      if (!post.commentList) post.commentList = [];
      post.commentList.push({ id: Date.now(), ...comment });
      post.comments = (post.comments || 0) + 1;
    },

    // I added this reducer to let users like or unlike a post
    toggleLike: (state, action) => {
      const id = action.payload;
      const post = state.items.find((p) => p.id === id);
      if (!post) return;
      if (state.likedIds.includes(id)) {
        state.likedIds = state.likedIds.filter((i) => i !== id);
        post.likes -= 1;
      } else {
        state.likedIds.push(id);
        post.likes += 1;
      }
    },

    // I added this reducer to add a new post to the beginning of the posts list
    addPost: (state, action) => {
      state.items.unshift({ id: Date.now(), likes: 0, comments: 0, ...action.payload });
    },
  },
});

export const { toggleLike, addPost, addComment } = postsSlice.actions;
export default postsSlice.reducer;