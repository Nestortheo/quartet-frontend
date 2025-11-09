// src/pages/AdminLogin.jsx
import { useState } from "react";
import { login } from "../auth";
import { useNavigate, useLocation } from "react-router-dom";


export default function AdminLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // initialize navigate

  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const username = String(fd.get("username"));
    const password = String(fd.get("password"));
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (e) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-6 space-y-3">
      <h1 className="text-xl font-semibold">Admin Login</h1>
      <input name="username" className="border p-2 w-full" placeholder="Username" />
      <input name="password" type="password" className="border p-2 w-full" placeholder="Password" />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button disabled={loading} className="px-4 py-2 rounded bg-black text-white w-full">
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
