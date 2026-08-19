import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import JoinClubButton from "./JoinClubButton";

const GENRE_COLORS = {
  Drama: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  Horror: "bg-red-500/15 text-red-300 border-red-500/20",
  "Sci-Fi": "bg-purple-500/15 text-purple-300 border-purple-500/20",
  World: "bg-green-500/15 text-green-300 border-green-500/20",
  "Art House": "bg-pink-500/15 text-pink-300 border-pink-500/20",
  Noir: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
};

function ClubCard({ club }) {
  const navigate = useNavigate();
  const joined = useSelector((s) => s.clubs.joinedIds.includes(club.id));
  const genreClass = GENRE_COLORS[club.genre] ?? "bg-white/8 text-gray-300 border-white/10";

  return (
    <div
      onClick={() => navigate(/clubs/${club.id})}
      className="group bg-white/3 border border-white/5 rounded-2xl p-5 hover:border-white/15 hover:bg-white/5 transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f6b042]/20 to-[#ff8c42]/10 flex items-center justify-center text-xl shrink-0">
          
        </div>
        <JoinClubButton clubId={club.id} size="sm" />
      </div>

      {/* Info */}
      <h3 className="font-semibold text-white text-base mb-1 group-hover:text-[#f6b042] transition-colors">
        {club.name}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
        {club.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{club.members.toLocaleString()} members</span>
          <span className="text-gray-700">·</span>
          <span>{club.posts} posts</span>
        </div>
        <span className={px-2 py-0.5 rounded-full text-xs border ${genreClass}}>
          {club.genre}
        </span>
      </div>
    </div>
  );
}

export default ClubCard;