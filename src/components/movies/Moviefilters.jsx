const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "release_date.desc", label: "Newest" },
  { value: "release_date.asc", label: "Oldest" },
];

function MovieFilters({ genres = [], activeGenre, sortBy, onGenreChange, onSortChange }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              sortBy === opt.value
                ? "bg-[#f6b042] text-black"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {genres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onGenreChange(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !activeGenre
                ? "bg-[#f6b042] text-black"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            All
          </button>
          {genres.map((g) => (
            <button
              key={g.id ?? g}
              onClick={() => onGenreChange(g.id ?? g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeGenre === (g.id ?? g)
                  ? "bg-[#f6b042] text-black"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {g.name ?? g}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieFilters;
