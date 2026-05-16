import axios from "axios";

const api = axios.create({
  // This checks if VITE_API_URL exists (Vercel), otherwise falls back to localhost
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1`,
  withCredentials: true,
});

export default api;
