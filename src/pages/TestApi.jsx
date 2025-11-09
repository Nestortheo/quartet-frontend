import { api } from "../api";

export default function TestApi() {
  async function ping() {
    try {
      console.log("[test] GET /concerts/");
      const { data } = await api.get("/concerts/");
      console.log("[test] OK, concerts =", data);
      alert("Concerts count: " + data.length);
    } catch (e) {
      console.error("[test] FAIL", e?.response?.status, e?.response?.data || e.message);
      alert("Ping failed");
    }
  }

  return (
    <div className="p-4">
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white"
        onClick={ping}
      >
        Test API
      </button>
    </div>
  );
}