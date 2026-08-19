import FollowButton from "./FollowButton";

const Avatar = ({ name, size = "lg" }) => {
  const sz = size === "lg" ? "w-14 h-14 text-xl" : "w-10 h-10 text-sm";
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? "?";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-[#f6b042]/40 to-[#ff8c42]/20 flex items-center justify-center font-bold text-[#f6b042] shrink-0`}>
      {initials}
    </div>
  );
};

function ProfileCard({ user, showFollow = true }) {
  return (
    <div className="bg-white/3 border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/5 transition-colors">
      <Avatar name={user.name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-semibold text-white">{user.name}</div>
            {user.bio && (
              <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{user.bio}</p>
            )}
          </div>
          {showFollow && <FollowButton userId={user.id} size="sm" />}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span><span className="text-white font-medium">{user.watched}</span> watched</span>
          <span><span className="text-white font-medium">{user.followers.toLocaleString()}</span> followers</span>
          <span><span className="text-white font-medium">{user.following}</span> following</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;