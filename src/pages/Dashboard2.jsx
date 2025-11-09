import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";

const Dashboard = () => {
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // ✅ add venues state
  const [venues, setVenues] = useState([]);
  const [venueId, setVenueId] = useState("");

  // program state
  const [program, setProgram] = useState([
    { composer: "", title: "", order: 1 }
  ]);

  // Handler to update a field
  function updateProgramField(index, field, value) {
    const updated = [...program];
    updated[index][field] = value;
    setProgram(updated);
  }

  // Handler to add a new empty composition
  function addComposition() {
    setProgram([
      ...program,
      { composer: "", title: "", order: program.length + 1 }
    ]);
  }

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin-login");
  }

  useEffect(() => {
    api.get("/venues/")
      .then(res => setVenues(res.data))
      .catch(err => console.error("Error loading venues:", err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!title.trim() || !date || !venueId) {
      setMessage("Please fill title, date, and location.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title,
        date, 
        venue: Number(venueId), 
        description,
        program
       
         };
      const res = await api.post("/concerts/", payload);
      console.log("✅ Created:", res.data);
      setMessage("✅ Concert created!");

      // reset
      setTitle("");
      setDate("");
      setVenueId("");     // ✅ reset the select
      setDescription("");
    } catch (err) {
      console.error("❌ Create failed:", err);
      console.log("STATUS:", err?.response?.status);
      console.log("SERVER ERRORS:", err?.response?.data);
      const is401 = err?.response?.status === 401;
      setMessage(is401 ? "Unauthorized. Please log in." : "Failed to create concert.");
    } finally {
      setSubmitting(false);
    }
  }

  

 return(

    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Title</label>
            <input 
                value = {title}
                onChange = {e => setTitle(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Title"
             />
           
        </div>

        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Date</label>
            <input
                 value = {date}
                 onChange = {e => setDate(e.target.value)}                
                 type="date" 
                 className="border p-2 w-full rounded" 
                 />
                
        </div>

        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Venue</label>
            <button 
              type = "button"
              onClick={() => navigate("/venues/new")}
              className = "text-xs text-blue-600 underline"
              >
                + Add new Venue
              </button>

            <select
            value={venueId}
            onChange={e => setVenueId(e.target.value)}
            className="border p-2 w-full rounded"
            required
            >
            <option value="">Select venue…</option>
            {venues.map(v => (
                <option key={v.id} value={v.id}>
                {v.name} — {v.city}
                </option>
            ))}
            </select>
      </div>

        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
                value = {description}
                onChange = {e => setDescription(e.target.value)}
                className="border p-2 w-full rounded" 
                placeholder="Description">
            </textarea>
            
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold">Program</h2>
          {program.map((program, idx) => (
            <div key={idx} className="flex space-x-2">
              <input
                value={program.composer}
                onChange={e => updateProgramField(idx, "composer", e.target.value)}
                placeholder="Composer"
                className="border p-2 flex-1 rounded"
              />
              <input
                value={program.title}
                onChange={e => updateProgramField(idx, "title", e.target.value)}
                placeholder="Title"
                className="border p-2 flex-1 rounded"
              />
              <input
                type="number"
                value={program.order}
                onChange={e => updateProgramField(idx, "order", Number(e.target.value))}
                className="border p-2 w-20 rounded"
                placeholder="Order"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addComposition}
            className="text-sm text-blue-600 underline"
          >
            + Add Composition
          </button>
        </div>

        {message && (
        <p className={message.startsWith("✅") ? "text-green-600" : "text-red-600"}>{message}</p>
      )}

      <button
        disabled={submitting}
        className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-60"
      >
        {submitting ? "Creating…" : "Create Concert"}
      </button>

      <button onClick={handleLogout} className="text-sm underline">
      Log out
    </button>
    </form>
        
    )
};

export default Dashboard;