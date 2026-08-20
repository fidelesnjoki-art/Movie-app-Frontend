import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopular, searchMovies, fetchGenres,
  discoverByGenre, clearSearch, setActiveGenre,
} from "../features/movies/moviesSlice";
import { movies as localMovies } from "../data/movies";
import MovieSearch from "../components/movies/MovieSearch";
import MovieFilters from "../components/movies/Moviefilters";
import MovieGrid from "../components/movies/MovieGrid";

const cdramas = localMovies.filter((m) => m.isTV);

function Discover() {
  const dispatch = useDispatch();
  const { results, genres: tmdbGenres, activeGenre, page, totalPages, status, query } = useSelector((s) => s.movies);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchPopular());
  }, [dispatch]);

  const handleSearch = useCallback((q) => {
    dispatch(searchMovies({ query: q }));
  }, [dispatch]);

  const handleClear = useCallback(() => {
    dispatch(clearSearch());
    dispatch(setActiveGenre(null));
    dispatch(fetchPopular());
  }, [dispatch]);

  const handleGenre = useCallback((id) => {
    if (id === null) { dispatch(setActiveGenre(null)); dispatch(fetchPopular()); }
    else dispatch(discoverByGenre({ genreId: id }));
  }, [dispatch]);

  const handleSort = useCallback((value) => {
    setSortBy(value);
    if (activeGenre) dispatch(discoverByGenre({ genreId: activeGenre }));
    else dispatch(fetchPopular());
  }, [dispatch, activeGenre]);

  const handlePage = (next) => {
    if (query) dispatch(searchMovies({ query, page: next }));
    else if (activeGenre) dispatch(discoverByGenre({ genreId: activeGenre, page: next }));
    else dispatch(fetchPopular(next));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayMovies = (!activeGenre && !query)
    ? [...results, ...cdramas]
    : results;

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white mb-1">Discover</h1>
          <p className="text-gray-400 text-sm">Search and explore movies from around the world.</p>
        </div>

        <div className="space-y-4 mb-6">
          <MovieSearch onSearch={handleSearch} onClear={handleClear} initialValue={query} />
          <MovieFilters
            genres={tmdbGenres}
            activeGenre={activeGenre}
            sortBy={sortBy}
            onGenreChange={handleGenre}
            onSortChange={handleSort}
          />
        </div>

        {query && (
          <p className="text-sm text-gray-400 mb-4">
            Results for <span className="text-white font-medium">"{query}"</span>
            <span className="ml-2 text-gray-600">({results.length} found)</span>
          </p>
        )}

        <MovieGrid movies={displayMovies} loading={status === "loading"} />

        {status !== "loading" && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => handlePage(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <span className="text-sm text-gray-400">
              Page <span className="text-white">{page}</span> of {Math.min(totalPages, 500)}
            </span>
            <button
              onClick={() => handlePage(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Discover;
