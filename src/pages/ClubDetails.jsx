import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/posts/postsSlice";
import JoinClubButton from "../components/clubs/JoinClubButton";
import PostCard from "../components/posts/PostCard";
import PostForm from "../components/posts/PostForm";

const GENRE_COLORS = {
  Drama: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  Horror: "bg-red-500/15 text-red-300 border-red-500/20",
  "Sci-Fi": "bg-purple-500/15 text-purple-300 border-purple-500/20",
  World: "bg-green-500/15 text-green-300 border-green-500/20",
  "Art House": "bg-pink-500/15 text-pink-300 border-pink-500/20",
  Noir: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
};

function ClubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const club = useSelector((s) => s.clubs.items.find((c) => c.id === Number(id)));
  const joined = useSelector((s) => s.clubs.joinedIds.includes(Number(id)));
  const allPosts = useSelector((s) => s.posts.items);
  const [showForm, setShowForm] = useState(false);

  if (!club) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p>Club not found.</p>
          <button onClick={() => navigate("/clubs")} className="mt-4 text-[#f6b042] hover:underline text-sm">
            Browse clubs
          </button>
        </div>
      </div>
    );
  }

  const genreClass = GENRE_COLORS[club.genre] ?? "bg-white/8 text-gray-300 border-white/10";
  const clubPosts = allPosts.filter(
    (p) => p.clubId === club.id || p.movie?.toLowerCase().includes(club.featuredMovie?.toLowerCase() ?? "")
  );

  const handlePost = (post) => {
    dispatch(addPost({ ...post, clubId: club.id }));
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">

      <div className="h-40 bg-gradient-to-br from-[#1a1008] via-[#0f0d0b] to-[#0b0b0d] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#f6b04210_0%,_transparent_70%)]" />
        <button
          onClick={() => navigate("/clubs")}
          className="absolute top-4 left-6 text-sm text-gray-400 hover:text-white transition-colors bg-black/40 px-3 py-1.5 rounded-lg"
        >
          Clubs
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f6b042]/30 to-[#ff8c42]/10 border border-white/10 shadow-xl" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-semibold text-white">{club.name}</h1>
                <span className={px-2 py-0.5 rounded-full text-xs border ${genreClass}}>{club.genre}</span>
              </div>
              <p className="text-gray-400 text-sm">Created by {club.createdBy}</p>
            </div>
          </div>
          <JoinClubButton clubId={club.id} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">
                Discussion <span className="text-gray-500 font-normal text-sm">({clubPosts.length})</span>
              </h2>
              {joined && (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="text-sm text-[#f6b042] hover:underline"
                >
                  {showForm ? "Cancel" : "Post"}
                </button>
              )}
            </div>

            {showForm && (
              <div className="bg-white/3 border border-white/5 rounded-2xl p-5 mb-4">
                <PostForm onSubmit={handlePost} submitLabel="Post to Club" />
              </div>
            )}

            {!joined && (
              <div className="bg-white/3 border border-white/5 rounded-xl p-4 mb-4 text-sm text-gray-400 text-center">
                Join this club to participate in discussions.
              </div>
            )}

            {clubPosts.length === 0 ? (
              <p className="text-sm text-gray-600">No posts yet. Be the first to start a discussion!</p>
            ) : (
              <div className="space-y-3">
                {clubPosts.map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="bg-white/3 border border-white/5 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">About</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{club.description}</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { label: "Members", value: club.members.toLocaleString() },
                  { label: "Posts", value: club.posts },
                  { label: "Genre", value: club.genre },
                  { label: "Featured", value: club.featuredMovie },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/3 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                    <div className="text-sm text-white font-medium truncate">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;