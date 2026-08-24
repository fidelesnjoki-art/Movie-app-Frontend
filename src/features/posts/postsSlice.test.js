import { describe, expect, it, vi } from "vitest";
import postsReducer, { addComment, addPost, toggleLike } from "./postsSlice";

describe("postsSlice", () => {
  it("likes a post once and removes the like when toggled again", () => {
    const state = { items: [{ id: 1, likes: 3, comments: 0 }], likedIds: [] };
    const liked = postsReducer(state, toggleLike(1));

    expect(liked).toMatchObject({ likedIds: [1], items: [{ id: 1, likes: 4 }] });
    expect(postsReducer(liked, toggleLike(1))).toMatchObject({ likedIds: [], items: [{ id: 1, likes: 3 }] });
  });

  it("prepends a new post and appends a comment to its target post", () => {
    vi.spyOn(Date, "now").mockReturnValue(123);
    const state = { items: [{ id: 1, likes: 0, comments: 0 }], likedIds: [] };
    const withPost = postsReducer(state, addPost({ content: "A new review" }));
    const withComment = postsReducer(withPost, addComment({ postId: 1, comment: { text: "Great take" } }));

    expect(withPost.items[0]).toMatchObject({ id: 123, content: "A new review", likes: 0, comments: 0 });
    expect(withComment.items[1]).toMatchObject({ comments: 1, commentList: [{ id: 123, text: "Great take" }] });
    vi.restoreAllMocks();
  });
});
