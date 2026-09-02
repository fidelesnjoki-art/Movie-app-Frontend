import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const adminApi = axios.create({ baseURL: BASE_URL });

export function getAdminErrorMessage(error) {
  if (!error.response) return "Unable to connect to the server. Check your connection and try again.";
  const { status, data } = error.response;
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "Access denied. You do not have permission to perform this action.";
  if (status === 404) return "The requested admin resource was not found.";
  if (status >= 500) return "The server encountered an error. Please try again later.";
  if (status === 400 && data && typeof data === "object") {
    const details = Object.entries(data).flatMap(([field, value]) => {
      const message = Array.isArray(value) ? value.join(", ") : String(value);
      return `${field}: ${message}`;
    });
    if (details.length) return details.join("; ");
  }
  return data?.detail || data?.message || "The request could not be completed.";
}

// Lazily resolved to avoid circular import: adminSlice → adminApi → store → adminSlice
let _store = null;
export const injectStore = (store) => { _store = store; };

adminApi.interceptors.request.use((config) => {
  const token = _store?.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && _store) {
      _store.dispatch({ type: "auth/logout" });
    }
    return Promise.reject(err);
  }
);

export default adminApi;
