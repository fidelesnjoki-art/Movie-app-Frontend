// I imported the hooks and Redux actions so I can manage comments and the current user.
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../features/posts/postsSlice";
import Comment from "./Comment";

function CommentList({ postId, comments = [] }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [body, setBody] = useState("");

  // I created this function to validate and add a new comment to the post.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    dispatch(addComment({
      postId,
      comment: {
        user: user?.name || user?.email || "Anonymous",
        body: body.trim(),
        createdAt: new Date().toLocaleDateString(),
      },
    }));
    setBody("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">
        Comments <span className="text-gray-500 font-normal">({comments.length})</span>
      </h3>

      {comments.length === 0 ? (
        <p className="text-sm text-gray-600">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <Comment key={c.id} comment={c} />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-white/5">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a comment…"
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-[#f6b042]/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!body.trim()}
          className="px-4 py-2 rounded-lg bg-[#f6b042] text-black text-sm font-semibold hover:bg-[#e09a2e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CommentList;
