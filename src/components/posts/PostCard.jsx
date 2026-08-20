// I imported the Redux hooks and Link so I can manage likes and navigate between posts and movies.
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleLike } from "../../features/posts/postsSlice";
import Rating from "./Rating";

// I created the Avatar component to display the user's initials.
const Avatar = ({ name }) => {
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? "?";
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f6b042]/30 to-[#ff8c42]/10 flex items-center justify-center text-[#f6b042] text-xs font-semibold shrink-0">
      {initials}
    </div>
  );
};

function PostCard({ post }) {
  const dispatch = useDispatch();
  const liked = useSelector((s) => s.posts.likedIds.includes(post.id));
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const navigate = useNavigate();

  return (
    <article className="flex gap-4 bg-white/3 hover:bg-white/5 border border-white/5 p-4 rounded-xl transition-colors">
      <Avatar name={post.user.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-semibold text-white text-sm">{post.user.name}</span>
          <span className="text-gray-500 text-xs">reviewed</span>
          <Link to={`/movies/${post.movieId || ""}`} className="italic text-gray-300 text-sm hover:text-white transition-colors truncate">
            {post.movie}
          </Link>
        </div>
        <Rating value={post.stars} readOnly size="sm" />
        <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">{post.body}</p>
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={() => {
              if (!isAuthenticated) return navigate('/login');
              dispatch(toggleLike(post.id));
            }}
            className={`flex items-center gap-1 text-xs transition-colors ${
              liked ? "text-[#f6b042]" : "text-gray-500 hover:text-[#f6b042]"
            }`}
          >
            {liked ? "Liked" : "Like"} {post.likes}
          </button>
          <span className="text-xs text-gray-500">{post.comments} comments</span>
          <Link to={`/posts/${post.id}`} className="text-xs text-gray-500 hover:text-white ml-auto transition-colors">
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
