import axios from "axios";

// 👇 load from .env (VITE_API_URL=http://localhost:8000/api)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
console.log("[api] API_BASE =", API_BASE);

// Create axios instance with that base
export const api = axios.create({ baseURL: API_BASE });

// initialize from localStorage (survives refresh)
let accessToken = localStorage.getItem("access") || null;
let refreshToken = localStorage.getItem("refresh") || null;

// ===== Helpers =====
export function setTokens({ access, refresh }) {
  accessToken = access;
  refreshToken = refresh;
  // ✅ persist so RequireAuth can read it
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  console.log("[api] Tokens set:", { access, refresh });
}

export function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  console.log("[api] Tokens cleared, now:", {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
  });
}

// ===== Interceptor =====
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    try {
      console.log(`Trying to understand token xxxx.yyyy.zzzz ${token}`);
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log(`Watching out the payload : ${token.split(".")[1]}`)
      const notExpired = payload.exp * 1000 > Date.now(); // exp in seconds
      if (notExpired) {
        //Core logic for simple interceptor to hold the headers from axios 
        //In every single api.get we will need header and we dont here once
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
        console.log("[api] Attached token");
      } else {
        console.warn("[api] Access token expired → not attaching header");
      }
    } catch {
      console.warn("[api] Bad token → not attaching header");
    }
  } else {
    console.log("[api] No token attached");
  }
  return config;
});