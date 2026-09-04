import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../../services/api";

const normalizePost = (post) => ({
  id: post.id,
  user: { name: post.user?.name || post.user || "Unknown" },
  movie: post.movie_title,
  movieId: post.movie_id,
  movie_id: post.movie_id,
  body: post.body,
  stars: post.stars,
  likes: post.like_count ?? 0,
  comments: post.comments?.length ?? post.comment_count ?? 0,
  commentList: post.comments ?? [],
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await backendApi.listPosts();
  return (Array.isArray(response) ? response : response.results ?? []).map(normalizePost);
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  const response = await backendApi.createPost({
    movie_id: Number(post.movieId || post.movie_id || 1),
    movie_title: post.movie,
    body: post.body,
    stars: post.stars,
  });
  return normalizePost(response);
});

export const toggleLikeRemote = createAsyncThunk("posts/toggleLikeRemote", async (id, { getState }) => {
  const liked = getState().posts.likedIds.includes(id);
  const response = await backendApi.togglePostLike(id, liked);
  return { id, liked: response.liked, likeCount: response.like_count };
});

export const addCommentRemote = createAsyncThunk("posts/addCommentRemote", async ({ postId, body }) => {
  return backendApi.createComment(postId, { body });
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    likedIds: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.items.find((p) => p.id === postId);
      if (!post) return;
      if (!post.commentList) post.commentList = [];
      post.commentList.push({ id: Date.now(), ...comment });
      post.comments = (post.comments || 0) + 1;
    },
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
    addPost: (state, action) => {
      state.items.unshift({ id: Date.now(), likes: 0, comments: 0, ...action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(toggleLikeRemote.fulfilled, (state, action) => {
        const { id, liked, likeCount } = action.payload;
        const post = state.items.find((item) => item.id === id);
        if (post) post.likes = likeCount;
        if (liked && !state.likedIds.includes(id)) state.likedIds.push(id);
        if (!liked) state.likedIds = state.likedIds.filter((itemId) => itemId !== id);
      })
      .addCase(addCommentRemote.fulfilled, (state, action) => {
        const post = state.items.find((item) => item.id === action.meta.arg.postId);
        if (post) {
          post.commentList = [...(post.commentList ?? []), action.payload];
          post.comments = post.commentList.length;
        }
      });
  },
});

export const { toggleLike, addPost, addComment } = postsSlice.actions;
export default postsSlice.reducer;
