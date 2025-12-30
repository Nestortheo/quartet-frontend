import {api, setTokens, clearTokens } from "./api/api";

export async function login(username, password) {
  // POST credentials to Django SimpleJWT
  //const { data } = await axios.post(`${AUTH_BASE}/token/`, { username, password });
  const {data} = await api.post("/token/", {username, password});
  // data = { access, refresh }
  setTokens({ access: data.access, refresh: data.refresh });
  return true;
}

export function logout() {
  clearTokens();
}

export function isAuthenticated() {
  const token = localStorage.getItem("access");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode middle part
    return payload.exp * 1000 > Date.now(); // still valid?
  } catch {
    return false;
  }
}

//Function to decode who the current user is
export function getAuthInfo() {
  const token = localStorage.getItem("access");
  if (!token) return { isAuthenticated: false, isAdmin: false, user: null };

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const isValid = payload.exp * 1000 > Date.now();

    // Adjust these keys depending on how you configured your Django SimpleJWT claims
    const isAdmin = Boolean(payload.is_staff || payload.is_superuser);

    return {
      isAuthenticated: isValid,
      isAdmin,
      user: payload, // includes user_id, username, etc. if you add them in SimpleJWT
    };
  } catch {
    return { isAuthenticated: false, isAdmin: false, user: null };
  }
}