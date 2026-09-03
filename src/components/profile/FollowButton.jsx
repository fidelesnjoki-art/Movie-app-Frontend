import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFollow } from "../../features/users/usersSlice";

function FollowButton({ userId, size = "md" }) {
  const dispatch = useDispatch();
  const following = useSelector((s) => s.users.followingIds.includes(userId));
  const sizeClass = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm";
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const navigate = useNavigate();

  return (
    <button
      onClick={(e) => { e.stopPropagation(); if (!isAuthenticated) return navigate('/login'); dispatch(toggleFollow(userId)); }}
      className={`${sizeClass} rounded-lg font-semibold transition-colors ${
        following
          ? "bg-white/10 border border-white/15 text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
          : "bg-[#f6b042] text-black hover:bg-[#e09a2e]"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;