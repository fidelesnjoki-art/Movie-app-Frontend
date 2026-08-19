export const IMG_BASE = "https://image.tmdb.org/t/p/original";
export const IMG_THUMB = "https://image.tmdb.org/t/p/w500";

export const tmdbApi = {
  async getTrending() {
    return { results: [] };
  },
  async getPopular() {
    return { results: [], page: 1, total_pages: 1 };
  },
  async searchMovies() {
    return { results: [], page: 1, total_pages: 1 };
  },
  async getMovieDetails() {
    return {};
  },
  async getTVDetails() {
    return {};
  },
  async getGenres() {
    return { genres: [] };
  },
  async discoverByGenre() {
    return { results: [], page: 1, total_pages: 1 };
  },
};

export default tmdbApi;
