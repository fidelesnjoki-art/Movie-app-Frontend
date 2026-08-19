import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toggleWatchlist } from "../features/watchlist/watchlistSlice";
import { IMG_THUMB } from "../services/api";
import PostCard from "../components/posts/PostCard";
import ProfileCard from "../components/profile/ProfileCard";

const Avatar = ({ name, size = "xl" }) => {
  const sz = size === "xl" ? "w-20 h-20 text-2xl" : "w-10 h-10 text-sm";
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  return (
    <div
      className={`${sz} rounded-full bg-gradient-to-br from-[#f6b042]/40 to-[#ff8c42]/20 flex items-center justify-center font-bold text-[#f6b042] shrink-0`}
    >
      {initials}
    </div>
  );
};

const TABS = ["reviews", "watchlist", "clubs", "following"];

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const watchlist = useSelector((s) => s.watchlist.items);
  const { items: clubs, joinedIds } = useSelector((s) => s.clubs);
  const { items: users, followingIds } = useSelector((s) => s.users);

  const myPosts = useSelector((s) =>
    s.posts.items.filter(
      (p) => p.user.name === user?.name || p.user.name === user?.email
    )
  );

  const [activeTab, setActiveTab] = useState("reviews");

  const joinedClubs = clubs.filter((c) => joinedIds.includes(c.id));
  const followingUsers = users.filter((u) => followingIds.includes(u.id));
  const displayName = user?.name || user?.email || "Cinephile";

  const stats = [
    { label: "Reviews", value: myPosts.length },
    { label: "Watchlist", value: watchlist.length },
    { label: "Clubs", value: joinedClubs.length },
    { label: "Following", value: followingUsers.length },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar name={displayName} />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-semibold text-white">
                    {displayName}
                  </h1>

                  <p className="text-gray-400 text-sm mt-0.5">
                    {user?.email}
                  </p>

                  {user?.bio && (
                    <p className="text-gray-300 text-sm mt-2 max-w-md">
                      {user.bio}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => navigate("/profile/edit")}
                  className="px-4 py-2 rounded-lg border border-white/10 text-gray-400 text-sm hover:text-white hover:border-white/25 transition-colors shrink-0"
                >
                  Edit Profile
                </button>
              </div>

              <div className="flex gap-6 mt-4">
                {stats.map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="text-white font-semibold text-lg">
                      {value}
                    </div>
                    <div className="text-gray-500 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 border-b border-white/8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-[#f6b042] text-white"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "reviews" && (
          <section>
            {myPosts.length === 0 ? (
              <div className="text-center py-16 bg-white/3 border border-white/5 rounded-2xl text-gray-500">
                <p className="text-sm">No reviews yet.</p>

                <Link
                  to="/posts/create"
                  className="mt-3 inline-block text-sm text-[#f6b042] hover:underline"
                >
                  Write your first review
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "watchlist" && (
          <section>
            {watchlist.length === 0 ? (
              <div className="text-center py-16 bg-white/3 border border-white/5 rounded-2xl text-gray-500">
                <p className="text-sm">Your watchlist is empty.</p>

                <Link
                  to="/discover"
                  className="mt-3 inline-block text-sm text-[#f6b042] hover:underline"
                >
                  Browse Discover
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {watchlist.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-3 bg-white/3 border border-white/5 rounded-xl p-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-14 rounded-md bg-white/5 overflow-hidden shrink-0">
                      {movie.poster_path ? (
                        <img
                          src={`${IMG_THUMB}${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                          ?
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/movies/${movie.id}`}
                      className="flex-1 text-sm text-gray-200 truncate hover:text-white transition-colors"
                    >
                      {movie.title}
                    </Link>

                    <button
                      onClick={() => dispatch(toggleWatchlist(movie))}
                      className="text-xs text-gray-500 hover:text-red-400 transition-colors shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "clubs" && (
          <section>
            {joinedClubs.length === 0 ? (
              <div className="text-center py-16 bg-white/3 border border-white/5 rounded-2xl text-gray-500">
                <p className="text-sm">
                  You haven't joined any clubs.
                </p>

                <Link
                  to="/clubs"
                  className="mt-3 inline-block text-sm text-[#f6b042] hover:underline"
                >
                  Browse clubs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {joinedClubs.map((club) => (
                  <Link
                    key={club.id}
                    to={`/clubs/${club.id}`}
                    className="flex items-center gap-3 bg-white/3 border border-white/5 rounded-xl p-4 hover:bg-white/5 hover:border-white/15 transition-all"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {club.name}
                      </div>

                      <div className="text-xs text-gray-500 mt-0.5">
                        {club.members} members · {club.genre}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "following" && (
          <section>
            {followingUsers.length === 0 ? (
              <div className="text-center py-16 bg-white/3 border border-white/5 rounded-2xl text-gray-500">
                <p className="text-sm">
                  You're not following anyone yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {followingUsers.map((u) => (
                  <ProfileCard key={u.id} user={u} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default Profile;