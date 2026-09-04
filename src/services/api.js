const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

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

async function backendRequest(path, options = {}) {
  const token = localStorage.getItem("accessToken");
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${BACKEND_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    const message = data?.detail || Object.values(data ?? {}).flat().join(" ") || `API ${response.status}`;
    throw new Error(message);
  }
  return data;
}

export const backendApi = {
  health: () => backendRequest("/"),
  register: (payload) => backendRequest("/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  login: (payload) => backendRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  googleAuth: (idToken) => backendRequest("/auth/google/", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken }),
  }),
  refresh: (refresh) => backendRequest("/auth/token/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh }),
  }),
  profile: (id) => backendRequest(`/users/${id}/`),
  updateProfile: (id, payload) => backendRequest(`/users/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  }),
  followUser: (id) => backendRequest(`/users/${id}/follow/`, { method: "POST" }),
  unfollowUser: (id) => backendRequest(`/users/${id}/follow/`, { method: "DELETE" }),
  listUsers: () => backendRequest("/users/"),
  createPost: (payload) => backendRequest("/posts/", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  togglePostLike: (id, liked) => backendRequest(`/posts/${id}/like/`, {
    method: liked ? "DELETE" : "POST",
  }),
  createComment: (postId, payload) => backendRequest(`/posts/${postId}/comments/`, {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  listClubs: () => backendRequest("/clubs/"),
  createClub: (payload) => backendRequest("/clubs/", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  deleteClub: (id) => backendRequest(`/clubs/${id}/`, { method: "DELETE" }),
  toggleClubMembership: (id, joined) => backendRequest(`/clubs/${id}/join/`, {
    method: joined ? "DELETE" : "POST",
  }),
  listWatchlist: () => backendRequest("/watchlist/"),
  addWatchlist: (payload) => backendRequest("/watchlist/", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  removeWatchlist: (id) => backendRequest(`/watchlist/${id}/`, {
    method: "DELETE",
  }),
  deletePost: (id) => backendRequest(`/posts/${id}/`, { method: "DELETE" }),

  // Admin endpoints
  adminDashboard: () => backendRequest("/admin/dashboard/"),
  adminUsers: () => backendRequest("/admin/users/"),
  adminToggleUserStatus: (id, is_active) => backendRequest(`/admin/users/${id}/status/`, {
    method: "PATCH",
    body: JSON.stringify({ is_active }),
  }),
  adminDeleteUser: (id) => backendRequest(`/admin/users/${id}/`, { method: "DELETE" }),
  adminClubs: () => backendRequest("/admin/clubs/"),
  adminDeleteClub: (id) => backendRequest(`/admin/clubs/${id}/`, { method: "DELETE" }),
  adminPosts: () => backendRequest("/admin/posts/"),
  adminModeratePost: (id, status) => backendRequest(`/admin/posts/${id}/moderate/`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }),
  adminDeletePost: (id) => backendRequest(`/admin/posts/${id}/delete/`, { method: "DELETE" }),
  adminAnalytics: () => backendRequest("/admin/analytics/"),
};
