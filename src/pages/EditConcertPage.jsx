// src/pages/EditConcertPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import ConcertForm from "../components/ConcertForm";

export default function EditConcertPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // string with ✅ prefix for success

  // Small helper for conditional message styling
  const messageClass = message?.startsWith("✅") ? "text-green-600" : "text-red-600";

  // ✅ Check if concert exists
  useEffect(() => {
    setLoading(true);
    setMessage(null);

    api.get(`/concerts/${id}/`)
      .then(({ data }) => {
        setInitialValues(data);     // it exists
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 404) setMessage("Concert not found.");
        else if (status === 401) setMessage("Unauthorized. Please log in.");
        else setMessage("Failed to load concert.");
        setInitialValues(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function updateConcert(payload) {
    setMessage(null);
    setSubmitting(true);
    try {
      await api.put(`/concerts/${id}/`, payload); // .patch if you prefer
      setMessage("✅ Changes saved.");
      setTimeout(() => navigate("/concerts"), 1000);
    } catch (e) {
      setMessage("Failed to save changes.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="p-6">Loading…</p>;
  if (!initialValues) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-4">
        <h1 className="text-xl font-semibold">Edit Concert</h1>
        <p className="text-red-600">{message || "Concert not found."}</p>
        <button onClick={() => navigate(-1)} className="text-sm underline">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Edit Concert</h1>
      {message && <p className={messageClass}>{message}</p>}

      {/* Using the old prop names so ConcertForm works unchanged */}
      <ConcertForm
        initialValues={initialValues}  // ← prefill
        onSubmit={updateConcert}        // ← use new alias
        submitting={submitting}
        submitLabel="Save changes"
      />
    </div>
  );
}
