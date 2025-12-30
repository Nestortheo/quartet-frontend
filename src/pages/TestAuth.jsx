import { useState } from "react";
import {api, setTokens, clearTokens } from "../api/api";

function TestAuth() {
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");

  async function set() {
  setTokens({ access, refresh });
  alert("Tokens set.");
  } 

  function clear() { 
    clearTokens(); 
    alert("Tokens cleared"); 
  }

  async function pingPublic() {
    const { data } = await api.get("/concerts/");
    console.log("[public] OK", data);
    alert("Public GET ok. Items: " + data.length);
  }

  async function tryCreate() {
    try {
      const payload = 
      { title: "Auth Test",
        date: "2025-09-05T20:30:00Z", 
        description: "Testing POST", 
        is_public: true, 
        program: [],
        venue : 1 };
        
      const { data } = await api.post("/concerts/", payload);
      console.log("[create] OK", data);
      alert("Create OK: id " + data.id);
    } catch (e) {
      console.error("[create] FAIL", e?.response?.status, e?.response?.data || e.message);
      alert("Create failed: " + (e?.response?.status || e.message));
    }
  }

  return (
    <div className="p-4 space-y-3">
     
      <h1 className="text-xl font-semibold">Auth Sandbox</h1>

      <div className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Paste ACCESS token"
          value={access}
          onChange={(e) => setAccess(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Paste REFRESH token"
          value={refresh}
          onChange={(e) => setRefresh(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <button className="border px-3 py-1 rounded" onClick={set}>Set tokens</button>
        <button className="border px-3 py-1 rounded" onClick={clear}>Clear tokens</button>
      </div>
      <div className="flex gap-2">
        <button className="border px-3 py-1 rounded" onClick={pingPublic}>Ping public GET</button>
        <button className="border px-3 py-1 rounded" onClick={tryCreate}>Try POST (needs token)</button>
      </div>
    </div>
  );
}

export default TestAuth