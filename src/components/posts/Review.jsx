import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../features/posts/postsSlice";
import Rating from "./Rating";

const Avatar = ({ name }) => {
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? "?";
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f6b042]/30 to-[#ff8c42]/10 flex items-center justify-center text-[#f6b042] text-xs font-semibold shrink-0">
      {initials}
    </div>
  );
};

function Review({ post, linkToDetail = false }) {
  const dispatch = useDispatch();
  const liked = useSelector((s) => s.posts.likedIds.includes(post.id));

  return (
    <div className="bg-white/3 border border-white/5 rounded-xl p-4 hover:bg-white/5 transition-colors">
      <div className="flex items-start gap-3">
        <Avatar name={post.user.name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-white">{post.user.name}</span>
            <span className="text-gray-500 text-xs">reviewed</span>
            <span className="italic text-gray-300 text-sm truncate">{post.movie}</span>
          </div>
          <Rating value={post.stars} readOnly size="sm" />
          <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-4">{post.body}</p>
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => dispatch(toggleLike(post.id))}
              className={`flex items-center gap-1 text-xs transition-colors ${
                liked ? "text-[#f6b042]" : "text-gray-500 hover:text-[#f6b042]"
              }`}
            >
              {liked ? "Liked" : "Like"} {post.likes}
            </button>
            <span className="text-xs text-gray-500">{post.comments} comments</span>
            {linkToDetail && (
              <a href={`/posts/${post.id}`} className="text-xs text-gray-500 hover:text-white ml-auto transition-colors">
                View
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
