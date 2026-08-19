import { useDispatch, useSelector } from "react-redux";
import { toggleJoin } from "../../features/clubs/clubsSlice";

function JoinClubButton({ clubId, size = "md" }) {
  const dispatch = useDispatch();
  const joined = useSelector((s) => s.clubs.joinedIds.includes(clubId));
  const sizeClass = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm";

  return (
    <button
      onClick={(e) => { e.stopPropagation(); dispatch(toggleJoin(clubId)); }}
      className={`${sizeClass} rounded-lg font-semibold transition-colors ${
        joined
          ? "bg-white/10 border border-white/15 text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
          : "bg-[#f6b042] text-black hover:bg-[#e09a2e]"
      }`}
    >
      {joined ? "Joined ✓" : "Join Club"}
    </button>
  );
}

export default JoinClubButton;