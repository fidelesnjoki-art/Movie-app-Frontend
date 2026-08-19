const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "release_date.desc", label: "Newest" },
  { value: "release_date.asc", label: "Oldest" },
];

function MovieFilters({ genres = [], activeGenre, sortBy, onGenreChange, onSortChange }) {
  return (
    <div className="space-y-3">
      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 shrink-0">Sort by</span>
        <div className="flex gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange?.(opt.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                sortBy === opt.value
                  ? "bg-white/15 text-white border border-white/20"
                  : "bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Genres */}
      {genres.length > 0 && (
        <div className="flex items-start gap-3">
          <span className="text-xs text-gray-500 shrink-0 mt-1">Genre</span>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g.id}
                onClick={() => onGenreChange?.(activeGenre === g.id ? null : g.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeGenre === g.id
                    ? "bg-[#f6b042] text-black"
                    : "bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieFilters;