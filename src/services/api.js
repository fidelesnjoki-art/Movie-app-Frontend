const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const IMG_BASE = "https://image.tmdb.org/t/p/w500";
export const IMG_THUMB = "https://image.tmdb.org/t/p/w185";

async function tmdb(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${res.statusText}`);
  return res.json();
}

export const tmdbApi = {
  getTrending: () => tmdb("/trending/movie/week"),
  getPopular: (page = 1) => tmdb("/movie/popular", { page }),
  searchMovies: (query, page = 1) => tmdb("/search/movie", { query, page }),
  getMovieDetails: (id) => tmdb(`/movie/${id}`, { append_to_response: "credits" }),
  getTVDetails: (id) => tmdb(`/tv/${id}`, { append_to_response: "credits" }),
  searchTV: (query, page = 1) => tmdb("/search/tv", { query, page }),
  getGenres: () => tmdb("/genre/movie/list"),
  discoverByGenre: (genreId, page = 1) => tmdb("/discover/movie", { with_genres: genreId, sort_by: "popularity.desc", page }),
};
