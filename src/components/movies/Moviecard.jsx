import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleWatchlist } from "../../features/watchlist/watchlistSlice";
import { IMG_THUMB } from "../../services/api";

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inWatchlist = useSelector((s) =>
    s.watchlist.items.some((m) => m.id === movie.id)
  );

  const poster = movie.img ?? (movie.poster_path ? `${IMG_THUMB}${movie.poster_path}` : null);

  return (
    <div
      className="group relative bg-white/3 border border-white/5 rounded-xl overflow-hidden hover:border-[#f6b042]/30 transition-all cursor-pointer"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="aspect-[2/3] bg-white/5 overflow-hidden">
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs text-center px-2 leading-relaxed">
            {movie.title}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleWatchlist({ id: movie.id, title: movie.title, poster_path: movie.poster_path }));
        }}
        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg ${
          inWatchlist
            ? "bg-[#f6b042] text-black"
            : "bg-black/70 text-white hover:bg-[#f6b042] hover:text-black"
        }`}
        title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {inWatchlist ? "✓" : "+"}
      </button>

      <div className="p-3">
        <div className="text-sm font-medium text-white truncate">{movie.title}</div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">
            {movie.release_date?.slice(0, 4) ?? movie.first_air_date?.slice(0, 4) ?? movie.year}
          </span>
          {(movie.vote_average > 0 || movie.rating) && (
            <span className="text-xs text-[#f6b042]">
              {movie.vote_average ? movie.vote_average.toFixed(1) : movie.rating}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
