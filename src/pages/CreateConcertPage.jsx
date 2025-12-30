import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createConcert} from "../api/concerts"
import { logout } from "../auth";
import ConcertForm from "../components/ConcertForm";

export default function CreateConcertPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin-login");
  }

  async function handleCreate(payload) {
    setMessage(null);
    setSubmitting(true);
    try {
      const concert = await createConcert(payload)
      console.log("✅ Created:", concert);
      setMessage("✅ Concert created!");
      setTimeout(() => navigate("/concerts"), 1500);
      
      // optional: navigate("/concerts");
    } catch (err) {
      console.error("❌ Create failed:", err);
      const is401 = err?.response?.status === 401;
      setMessage(is401 ? "Unauthorized. Please log in." : "Failed to create concert.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      {message && (
        <p className={message.startsWith("✅") ? "text-green-600" : "text-red-600"}>
          {message}
        </p>
      )}
      

      <ConcertForm onSubmit={handleCreate} submitting={submitting} />

      <button onClick={handleLogout} className="text-sm underline">
          Log out
        </button>
    </div>

    
  );
}
