import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClubRemote } from "../features/clubs/clubsSlice";
import { backendApi } from "../services/api";

const GENRES = ["Drama", "Horror", "Sci-Fi", "World", "Art House", "Noir", "Comedy", "Thriller", "Animation", "Documentary"];
const inputClass = "w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 text-sm transition-colors";

const TABS = ["overview", "users", "clubs", "posts", "create-club"];

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white/3 border border-white/5 rounded-xl p-4">
      <div className="text-white font-semibold text-2xl">{value ?? "—"}</div>
      <div className="text-gray-400 text-sm mt-0.5">{label}</div>
      {sub && <div className="text-gray-600 text-xs mt-1">{sub}</div>}
    </div>
  );
}

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Create club form
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [clubGenre, setClubGenre] = useState("");
  const [clubError, setClubError] = useState("");
  const [clubSuccess, setClubSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async (currentTab) => {
    setLoading(true);
    setError("");
    try {
      if (currentTab === "overview") {
        const data = await backendApi.adminDashboard();
        setStats(data);
      } else if (currentTab === "users") {
        const data = await backendApi.adminUsers();
        setUsers(Array.isArray(data) ? data : data.results ?? []);
      } else if (currentTab === "clubs") {
        const data = await backendApi.adminClubs();
        setClubs(Array.isArray(data) ? data : data.results ?? []);
      } else if (currentTab === "posts") {
        const data = await backendApi.adminPosts();
        setPosts(Array.isArray(data) ? data : data.results ?? []);
      }
    } catch (err) {
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(tab); }, [tab, load]);

  const handleToggleUser = async (u) => {
    try {
      const updated = await backendApi.adminToggleUserStatus(u.id, !u.is_active);
      setUsers((prev) => prev.map((x) => x.id === updated.id ? updated : x));
    } catch (err) { alert(err.message); }
  };

  const handleDeleteUser = async (u) => {
    if (!window.confirm(`Delete user "${u.email}"? This cannot be undone.`)) return;
    try {
      await backendApi.adminDeleteUser(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
    } catch (err) { alert(err.message); }
  };

  const handleDeleteClub = async (club) => {
    if (!window.confirm(`Delete club "${club.name}"?`)) return;
    try {
      await backendApi.adminDeleteClub(club.id);
      setClubs((prev) => prev.filter((x) => x.id !== club.id));
    } catch (err) { alert(err.message); }
  };

  const handleModeratePost = async (post, newStatus) => {
    try {
      const updated = await backendApi.adminModeratePost(post.id, newStatus);
      setPosts((prev) => prev.map((x) => x.id === updated.id ? updated : x));
    } catch (err) { alert(err.message); }
  };

  const handleDeletePost = async (post) => {
    if (!window.confirm(`Delete this post by "${post.user}"?`)) return;
    try {
      await backendApi.adminDeletePost(post.id);
      setPosts((prev) => prev.filter((x) => x.id !== post.id));
    } catch (err) { alert(err.message); }
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    if (!clubName.trim() || !clubDesc.trim() || !clubGenre) {
      setClubError("Please fill in all required fields.");
      return;
    }
    setClubError("");
    setSubmitting(true);
    try {
      await dispatch(createClubRemote({ name: clubName.trim(), description: clubDesc.trim(), genre: clubGenre })).unwrap();
      setClubSuccess(`Club "${clubName}" created successfully.`);
      setClubName(""); setClubDesc(""); setClubGenre("");
      setTimeout(() => setClubSuccess(""), 3000);
    } catch (err) {
      setClubError(err.message || "Failed to create club.");
    } finally {
      setSubmitting(false);
    }
  };

  const s = stats?.statistics;

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="mb-6">
          <div className="text-[#f6b042] text-xs font-semibold tracking-widest uppercase mb-1">Admin Panel</div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Logged in as {user?.email} · {user?.role || "admin"}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/8 mb-6 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`pb-3 px-1 mr-5 text-sm font-medium capitalize whitespace-nowrap transition-colors border-b-2 -mb-px ${
                tab === t ? "border-[#f6b042] text-white" : "border-transparent text-gray-500 hover:text-gray-300"
              }`}>
              {t === "create-club" ? "Create Club" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {loading && <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-12 rounded-xl bg-white/3 animate-pulse" />)}</div>}

        {/* Overview */}
        {!loading && tab === "overview" && s && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={s.total_users} sub={`${s.active_users} active`} />
              <StatCard label="Total Clubs" value={s.total_clubs} />
              <StatCard label="Total Posts" value={s.total_posts} />
              <StatCard label="Pending Reports" value={s.pending_reports} />
            </div>

            {stats.recent_activity && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Recent Users</h3>
                  <div className="space-y-2">
                    {stats.recent_activity.users.map((u) => (
                      <div key={u.id} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-gray-200">{u.name || u.email}</span>
                          <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${u.role === "superuser" ? "bg-[#f6b042]/20 text-[#f6b042]" : u.role === "admin" ? "bg-blue-500/20 text-blue-300" : "bg-white/5 text-gray-500"}`}>
                            {u.role}
                          </span>
                        </div>
                        <span className="text-gray-600 text-xs">{u.post_count} posts</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Recent Clubs</h3>
                  <div className="space-y-2">
                    {stats.recent_activity.clubs.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-200 truncate">{c.name}</span>
                        <span className="text-gray-600 text-xs shrink-0 ml-2">{c.member_count} members</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Users */}
        {!loading && tab === "users" && (
          <div className="space-y-2">
            {users.length === 0 && <p className="text-gray-500 text-sm">No users found.</p>}
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between bg-white/3 border border-white/5 rounded-xl px-5 py-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">{u.name || "—"}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      u.role === "superuser" ? "bg-[#f6b042]/20 text-[#f6b042]" :
                      u.role === "admin" ? "bg-blue-500/20 text-blue-300" :
                      "bg-white/5 text-gray-500"
                    }`}>{u.role}</span>
                    {!u.is_active && <span className="text-xs text-red-400">Inactive</span>}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">{u.email} · {u.post_count} posts · {u.club_count} clubs</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleToggleUser(u)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      u.is_active
                        ? "bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30"
                        : "bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20"
                    }`}>
                    {u.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => handleDeleteUser(u)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clubs */}
        {!loading && tab === "clubs" && (
          <div className="space-y-2">
            {clubs.length === 0 && <p className="text-gray-500 text-sm">No clubs yet.</p>}
            {clubs.map((club) => (
              <div key={club.id} className="flex items-center justify-between bg-white/3 border border-white/5 rounded-xl px-5 py-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">{club.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full border ${
                      club.status === "ACTIVE" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>{club.status}</span>
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">{club.genre} · {club.member_count} members · by {club.created_by}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => navigate(`/clubs/${club.id}`)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs hover:text-white transition-colors">
                    View
                  </button>
                  <button onClick={() => handleDeleteClub(club)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts */}
        {!loading && tab === "posts" && (
          <div className="space-y-2">
            {posts.length === 0 && <p className="text-gray-500 text-sm">No posts yet.</p>}
            {posts.map((post) => (
              <div key={post.id} className="flex items-start justify-between bg-white/3 border border-white/5 rounded-xl px-5 py-3 gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white text-sm font-medium truncate">{post.movie_title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full border shrink-0 ${
                      post.status === "VISIBLE" ? "bg-green-500/10 border-green-500/20 text-green-400" :
                      post.status === "HIDDEN" ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" :
                      "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>{post.status}</span>
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">by {post.user} · {post.like_count} likes · {post.comment_count} comments</div>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-1">{post.body}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {post.status === "VISIBLE" ? (
                    <button onClick={() => handleModeratePost(post, "HIDDEN")}
                      className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs hover:bg-yellow-500/20 transition-colors">
                      Hide
                    </button>
                  ) : (
                    <button onClick={() => handleModeratePost(post, "VISIBLE")}
                      className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs hover:bg-green-500/20 transition-colors">
                      Show
                    </button>
                  )}
                  <button onClick={() => handleDeletePost(post)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Club */}
        {tab === "create-club" && (
          <div className="max-w-xl">
            <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-5">Create a New Club</h2>
              <form onSubmit={handleCreateClub} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400 font-medium">Club Name <span className="text-red-400">*</span></label>
                  <input value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="e.g. New Wave Cinema" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400 font-medium">Description <span className="text-red-400">*</span></label>
                  <textarea value={clubDesc} onChange={(e) => setClubDesc(e.target.value)} placeholder="What is this club about?" rows={3} className={`${inputClass} resize-none`} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400 font-medium">Genre <span className="text-red-400">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map((g) => (
                      <button key={g} type="button" onClick={() => setClubGenre(g)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          clubGenre === g ? "bg-[#f6b042] text-black" : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                        }`}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                {clubError && <p className="text-red-400 text-sm">{clubError}</p>}
                {clubSuccess && <p className="text-green-400 text-sm">{clubSuccess}</p>}
                <button type="submit" disabled={submitting}
                  className="w-full py-2.5 rounded-lg bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] transition-colors disabled:opacity-50">
                  {submitting ? "Creating…" : "Create Club"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
