// I imported the routing hooks so I can get the post ID and navigate between pages.
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../features/posts/postsSlice";
import Rating from "../components/posts/Rating";
import CommentList from "../components/posts/CommentList";

// I created the Avatar component to show the user's initials.
const Avatar = ({ name, size = "md" }) => {
  const sz = size === "lg" ? "w-12 h-12 text-base" : "w-9 h-9 text-xs";
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? "?";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-[#f6b042]/30 to-[#ff8c42]/10 flex items-center justify-center font-semibold text-[#f6b042] shrink-0`}>
      {initials}
    </div>
  );
};

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((s) => s.posts.items.find((p) => p.id === Number(id)));
  const liked = useSelector((s) => s.posts.likedIds.includes(Number(id)));

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-3"></div>
          <p>Review not found.</p>
          <button onClick={() => navigate("/")} className="mt-4 text-[#f6b042] hover:underline text-sm">
            Go home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-400 hover:text-white mb-6 inline-block transition-colors">
          ← Back
        </button>

        {/* I created this section to display the selected review. */}
        <div className="bg-white/3 border border-white/5 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <Avatar name={post.user.name} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-white">{post.user.name}</span>
                <span className="text-gray-500 text-sm">reviewed</span>
                <span className="italic text-gray-200 font-medium">{post.movie}</span>
              </div>
              <div className="mt-1">
                <Rating value={post.stars} readOnly size="md" />
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mt-4 text-base">{post.body}</p>

          {/* I added the like button so users can like or unlike the review. */}
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
            <button
              onClick={() => dispatch(toggleLike(post.id))}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                liked
                  ? "border-[#f6b042]/40 bg-[#f6b042]/10 text-[#f6b042]"
                  : "border-white/10 text-gray-400 hover:border-[#f6b042]/40 hover:text-[#f6b042]"
              }`}
            >
              {liked ? "liked" : "like"} {post.likes} {post.likes === 1 ? "like" : "likes"}
            </button>
            <span className="text-sm text-gray-500"> {post.comments} comments</span>
          </div>
        </div>

        <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
          <CommentList postId={post.id} comments={post.commentList ?? []} />
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
