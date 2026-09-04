import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchTrending } from "../features/movies/moviesSlice";
import { createPost, fetchPosts } from "../features/posts/postsSlice";
import { toggleWatchlist } from "../features/watchlist/watchlistSlice";
import { IMG_BASE, IMG_THUMB } from "../services/api";
import { movies, moviesByGenre } from "../data/movies";
import PostCard from "../components/posts/PostCard";
import PostForm from "../components/posts/PostForm";

const GENRE_SECTIONS = ["C-Drama", "Drama", "Horror", "Sci-Fi", "Thriller", "World", "Noir", "Comedy"];

function WriteReviewModal({ onClose }) {
  const dispatch = useDispatch();
  const handleSubmit = async (post) => {
    await dispatch(createPost(post)).unwrap();
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-lg">Write a Review</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">X</button>
        </div>
        <PostForm onSubmit={handleSubmit} submitLabel="Publish Review" />
      </div>
    </div>
  );
}

const Avatar = ({ name, size = "md" }) => {
  const sz = size === "lg" ? "w-12 h-12 text-base" : "w-9 h-9 text-xs";
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? "?";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-[#f6b042]/30 to-[#ff8c42]/10 flex items-center justify-center font-semibold text-[#f6b042] shrink-0`}>
      {initials}
    </div>
  );
};

function LocalMovieCard({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const inWatchlist = useSelector((s) => s.watchlist.items.some((m) => String(m.id) === String(movie.id)));
  const poster = movie.img ?? (movie.poster_path ? `${IMG_THUMB}${movie.poster_path}` : null);

  return (
    <div
      onClick={() => navigate(`/movies/${movie.id}`)}
      className="group relative bg-white/3 border border-white/5 rounded-xl overflow-hidden hover:border-[#f6b042]/30 transition-all cursor-pointer shrink-0 w-32"
    >
      <div className="aspect-[2/3] bg-white/5 overflow-hidden">
        {poster ? (
          <img src={poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs text-center px-2 leading-relaxed">
            {movie.title}
          </div>
        )}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); if (!isAuthenticated) return navigate("/login"); dispatch(toggleWatchlist({ id: movie.id, title: movie.title, poster_path: movie.poster_path })); }}
        title={inWatchlist ? "In Watchlist" : "Add to Watchlist"}
        className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow ${
          inWatchlist ? "bg-[#f6b042] text-black" : "bg-black/70 text-white hover:bg-[#f6b042] hover:text-black"
        }`}
      >
        {inWatchlist ? "✓" : "+"}
      </button>
      <div className="p-2">
        <div className="text-xs font-medium text-white truncate">{movie.title}</div>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-xs text-gray-600">{movie.year}</span>
          <span className="text-xs text-[#f6b042]"> {movie.rating}</span>
        </div>
      </div>
    </div>
  );
}

function GenreRow({ genre }) {
  const genreMovies = moviesByGenre(genre).slice(0, 8);
  if (genreMovies.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-white">{genre}</h2>
        <Link to="/discover" className="text-xs text-gray-500 hover:text-[#f6b042] transition-colors">
          See all
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {genreMovies.map((movie) => (
          <LocalMovieCard key={`${movie.id}-${movie.title}`} movie={movie} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { trending, status } = useSelector((s) => s.movies);
  const posts = useSelector((s) => s.posts.items);
  const postsStatus = useSelector((s) => s.posts.status);
  const [activeTab, setActiveTab] = useState("feed");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchPosts());
  }, [dispatch]);

  const featured = trending[0] ?? movies[0];

  const filtered = search.trim()
    ? posts.filter((p) =>
        p.movie.toLowerCase().includes(search.toLowerCase()) ||
        p.user.name.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  const sorted = activeTab === "trending"
    ? [...filtered].sort((a, b) => b.likes - a.likes)
    : filtered;

  const trendingList = trending.length > 0 ? trending.slice(0, 5) : movies.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <header className="relative border-b border-white/5 overflow-hidden">
        {featured?.backdrop_path && trending.length > 0 ? (
          <img src={`${IMG_BASE}${featured.backdrop_path}`} alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1008] via-[#0f0d0b] to-[#0b0b0d]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0d] via-[#0b0b0d]/75 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="text-[#f6b042] text-xs font-semibold tracking-widest uppercase mb-3">Featured Film</div>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight mb-2">
              {featured?.title ?? "Welcome to Cinéma"}
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              {featured?.release_date?.slice(0, 4) ?? featured?.year}
              {(featured?.vote_average > 0 || featured?.rating) &&
                ` · ${featured?.vote_average?.toFixed(1) ?? featured?.rating}`}
              {featured?.director && ` · ${featured.director}`}
            </p>
            <div className="flex gap-3">
              <button onClick={() => navigate(`/movies/${featured.id}`)}
                className="px-5 py-2 rounded-lg bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] transition-colors">
                View Film
              </button>
              <button onClick={() => setShowModal(true)}
                className="px-5 py-2 rounded-lg border border-white/15 text-gray-300 text-sm hover:border-white/30 hover:text-white transition-colors">
                Write Review
              </button>
            </div>
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews, films…"
            className="w-full md:w-80 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 transition-colors text-sm" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div>
          {!search.trim() && (
            <div className="mb-6">
              {GENRE_SECTIONS.map((genre) => <GenreRow key={genre} genre={genre} />)}
            </div>
          )}
          <div>
            <div className="flex gap-6 mb-5 border-b border-white/8">
              {["feed", "trending"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                    activeTab === tab ? "border-[#f6b042] text-white" : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}>
                  {tab === "feed" ? "Latest Reviews" : "Most Liked"}
                </button>
              ))}
              <button onClick={() => setShowModal(true)}
                className="ml-auto mb-3 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs hover:text-white hover:border-white/20 transition-colors">
                Write Review
              </button>
            </div>
            {sorted.length === 0 && postsStatus === "loading" ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-white/3 animate-pulse" />)}
              </div>
            ) : sorted.length === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet. Be the first to write one!</p>
            ) : (
              <div className="space-y-3">
                {sorted.map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          {user && (
            <div className="bg-[#f6b042]/8 border border-[#f6b042]/15 rounded-xl p-4 flex items-center gap-3">
              <Avatar name={user.name || user.email} size="lg" />
              <div>
                <div className="text-white font-semibold text-sm">{user.name || user.email}</div>
                <div className="text-xs text-gray-400 mt-0.5">Welcome back</div>
                <Link to="/profile" className="text-xs text-[#f6b042] hover:underline mt-1 inline-block">View profile</Link>
              </div>
            </div>
          )}
          <div className="bg-white/3 border border-white/5 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-white mb-3">
              {trending.length > 0 ? "Trending This Week" : "Popular Films"}
            </h4>
            {status === "loading" ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => <div key={i} className="h-8 rounded-lg bg-white/5 animate-pulse" />)}
              </div>
            ) : (
              <ul className="space-y-1">
                {trendingList.map((movie, i) => (
                  <li key={`${movie.id}-${i}`} onClick={() => navigate(`/movies/${movie.id}`)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                      i === 0 ? "bg-[#f6b042]/10 text-[#f6b042]" : "text-gray-300 hover:bg-white/5"
                    }`}>
                    <span className="text-xs text-gray-600 w-4 shrink-0">{i + 1}</span>
                    <span className="truncate">{movie.title}</span>
                    <span className="text-xs text-gray-600 ml-auto shrink-0">
                      {movie.vote_average?.toFixed(1) ?? movie.rating}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white/3 border border-white/5 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-white mb-3">In the Library</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Films", value: movies.length },
                { label: "Reviews", value: posts.length },
                { label: "Genres", value: GENRE_SECTIONS.length },
                { label: "Clubs", value: 6 },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/3 rounded-lg p-3 text-center">
                  <div className="text-white font-semibold text-lg">{value}</div>
                  <div className="text-gray-500 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-white mb-3">Browse by Genre</h4>
            <div className="flex flex-wrap gap-2">
              {GENRE_SECTIONS.map((g) => (
                <Link key={g} to="/discover"
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-colors">
                  {g}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {showModal && <WriteReviewModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Home;
