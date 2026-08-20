import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails, fetchTVDetails } from "../features/movies/moviesSlice";
import { toggleWatchlist } from "../features/watchlist/watchlistSlice";
import { IMG_BASE, IMG_THUMB } from "../services/api";
import Review from "../components/posts/Review";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentMovie: movie, status } = useSelector((s) => s.movies);
  const isTV = id.startsWith("tv-");
  const tmdbId = isTV ? id.replace("tv-", "") : id;
  const inWatchlist = useSelector((s) => s.watchlist.items.some((m) => m.id === id));
  const relatedPosts = useSelector((s) =>
    s.posts.items.filter((p) => p.movieId === id)
  );

  useEffect(() => {
    if (isTV) dispatch(fetchTVDetails(tmdbId));
    else dispatch(fetchMovieDetails(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  if (status === "loading" || !movie) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center">
        <div className="space-y-4 w-full max-w-4xl px-6">
          <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-8 w-1/2 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const backdrop = movie.backdrop_path ? `${IMG_BASE}${movie.backdrop_path}` : null;
  const poster = movie.poster_path ? `${IMG_THUMB}${movie.poster_path}` : null;
  const cast = movie.credits?.cast?.slice(0, 8) ?? [];
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">

      {/* Backdrop */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {backdrop ? (
          <img src={backdrop} alt={movie.title} className="w-full h-full object-cover opacity-40" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1008] to-[#0b0b0d]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/50 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-6 text-sm text-gray-400 hover:text-white transition-colors bg-black/40 px-3 py-1.5 rounded-lg"
        >
          Back
        </button>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-24 relative pb-16">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <div className="shrink-0">
            <div className="w-36 md:w-48 rounded-xl overflow-hidden shadow-2xl border border-white/10">
              {poster ? (
                <img src={poster} alt={movie.title} className="w-full" />
              ) : (
                <div className="aspect-[2/3] bg-white/5 flex items-center justify-center text-gray-600 text-xs text-center p-2">
                  {movie.title}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 md:pt-16">
            <h1 className="text-3xl md:text-4xl font-serif font-light text-white leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
              {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
              {runtime && <><span className="text-gray-700">·</span><span>{runtime}</span></>}
              {director && <><span className="text-gray-700">·</span><span>dir. {director.name}</span></>}
              {movie.vote_average > 0 && (
                <span className="text-[#f6b042] font-semibold">{movie.vote_average.toFixed(1)}</span>
              )}
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {movie.genres.map((g) => (
                  <span key={g.id} className="px-2.5 py-0.5 rounded-full bg-white/8 border border-white/10 text-xs text-gray-300">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-2xl">{movie.overview}</p>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => dispatch(toggleWatchlist({ id: movie.id, title: movie.title, poster_path: movie.poster_path }))}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  inWatchlist
                    ? "bg-[#f6b042] text-black hover:bg-[#e09a2e]"
                    : "border border-white/15 text-gray-300 hover:border-[#f6b042]/50 hover:text-[#f6b042]"
                }`}
              >
                {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
              <button
                onClick={() => navigate(`/posts/create?movie=${encodeURIComponent(movie.title)}&movieId=${movie.id}`)}
                className="px-5 py-2 rounded-lg border border-white/15 text-gray-300 text-sm hover:border-white/30 hover:text-white transition-colors"
              >
                Write Review
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-10">
            <h2 className="text-base font-semibold text-white mb-4">Cast</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {cast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="aspect-square rounded-full overflow-hidden bg-white/5 mb-1.5 mx-auto w-12 h-12">
                    {member.profile_path ? (
                      <img
                        src={`${IMG_THUMB}${member.profile_path}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">?</div>
                    )}
                  </div>
                  <div className="text-xs text-gray-300 truncate">{member.name}</div>
                  <div className="text-xs text-gray-600 truncate">{member.character}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">
              Reviews <span className="text-gray-500 font-normal text-sm">({relatedPosts.length})</span>
            </h2>
            <button
              onClick={() => navigate(`/posts/create?movie=${encodeURIComponent(movie.title)}&movieId=${movie.id}`)}
              className="text-sm text-[#f6b042] hover:underline"
            >
              Write one
            </button>
          </div>
          {relatedPosts.length === 0 ? (
            <p className="text-sm text-gray-600">No reviews yet for this film.</p>
          ) : (
            <div className="space-y-3">
              {relatedPosts.map((post) => <Review key={post.id} post={post} linkToDetail />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MovieDetails;