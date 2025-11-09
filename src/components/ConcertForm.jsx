import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function ConcertForm({ 
  createConcert,
  submitting = false,
  initialValues = null,
  onSubmit,
  submitLabel,
 }) {

  const navigate = useNavigate();
  /*
  // Local form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [venueId, setVenueId] = useState("");

  // Venues
  const [venues, setVenues] = useState([]);

  // Program (start with one empty row)
  const [program, setProgram] = useState([{ composer: "", title: "", order: 1 }]);
*/

  const [form, setForm] = useState({
    title:"",
    date:"",
    description:"",
    venueId:"",
    program : [{composer:"", title:"", order: 1}]
  })


  //Getting venues from backend
  const [venues, setVenues] = useState([]);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [venuesError, setVenuesError] = useState(null);

  useEffect(() => {
    api.get("/venues/")
      .then(res => setVenues(res.data))
      .catch(err => setVenuesError("Failed to load venues"))
      .finally(() => setVenuesLoading(false));
  }, []);

  // prefill for edit
  useEffect(() => {
    if (!initialValues) return;
    setForm(prev => ({
      ...prev,
      title: initialValues.title ?? "",
      date: (initialValues.date ?? "").slice(0, 10),
      description: initialValues.description ?? "",
      venueId:
        typeof initialValues.venue === "object"
          ? String(initialValues.venue?.id ?? "")
          : String(initialValues.venue ?? ""),
      program: Array.isArray(initialValues.program) && initialValues.program.length
        ? initialValues.program.map((p, i) => ({
            id: p.id,
            composer: p.composer ?? "",
            title: p.title ?? "",
            order: Number(p.order) || i + 1,
          }))
        : [{ composer: "", title: "", order: 1 }],
    }));
  }, [initialValues]);


  // Local error just for the form’s own validation messages
  const [localError, setLocalError] = useState(null);

//Handle click for useState updates
  function handleChange(e){
    const {name,value} = e.target
    setForm( (prev) => ({...prev, [name]:value}))
  }

 

  // Program helpers
 function updateProgramField(index, field, value) {
  /*
    setForm( (prev) => {
      const program = [...prev.program]
      program[index][field] = field ==="order" ? Number(value):value;
      return{...prev, program};

    })
      */
     setForm( (prev => ({
      ...prev, 
      program: prev.program.map((p,i) => i ===index ? {...p, [field]:field ==="order" ? Number(value) : value }: p)
     })))
  }


  function addComposition() {
    setForm((prev) => ({
      ...prev,
      program: [
        ...prev.program,{composer:"", title:"", order:prev.program.length + 1}
      ]
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLocalError(null);

    // Simple required checks
    if (!form.title.trim() || !form.date || !form.venueId) {
      setLocalError("Please fill title, date, and venue.");
      return;
    }

    // Clean program: drop empty rows, ensure order
    const cleanedProgram = form.program
      .filter(p => (p.composer?.trim() || p.title?.trim()))
      .map((p, i) => ({ ...p, order: p.order || i + 1 }));

    const payload = {
      title: form.title.trim(),
      date:form.date,
      venue: Number(form.venueId),
      description: form.description.trim(),
      program: cleanedProgram,
    };

    // Hand off to parent (Dashboard will POST and show global messages)
    (onSubmit || createConcert)?.(payload);
  }

  //Removing Single program row
  /*

function removeComposition(index) {
  setForm(prev => ({
    ...prev,
    program: prev.program
      .filter((_, i) => i !== index)
      .map((p, i) => ({ ...p, order: i + 1 })),
  }));
}

function removeComposition(id) {
  setForm(prev => ({
    ...prev,
    program: prev.program
      .filter(p => p.id !== id)
      .map((p, i) => ({ ...p, order: i + 1 })),
  }));
}
*/
function removeComposition(key) {
  setForm(prev => {
    const byIdIndex = prev.program.findIndex(p => p.id === key);
    const indexToRemove = byIdIndex !== -1
      ? byIdIndex
      : (Number.isInteger(key) ? key : -1);

    if (indexToRemove === -1) return prev;

    const next = prev.program
      .filter((_, i) => i !== indexToRemove)
      .map((p, i) => ({ ...p, order: i + 1 }));

    return { ...prev, program: next };
  });
}


 

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Title</label>
        <input
          className="border p-2 w-full rounded"
          value={form.title}
          name="title"
          onChange={handleChange}
          placeholder="Title"
        />
      </div>

      {/* Date */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Date</label>
        <input
          type="date"
          className="border p-2 w-full rounded"
          value={form.date}
          name="date"
          onChange={handleChange}
        />
      </div>

      {/* Venue */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Venue</label>
          <button
            type="button"
            onClick={() => navigate("/venues/new")}
            className="text-xs text-blue-600 underline"
          >
            + Add new Venue
          </button>
        </div>

        <select
          className="border p-2 w-full rounded"
          value={form.venueId}
          name="venueId"
          onChange={handleChange}
          disabled={venuesLoading || !!venuesError}
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

      {/* Description */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="border p-2 w-full rounded"
          value={form.description}
          name="description"
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

{/* Program */}
<div className="space-y-3">
  <h2 className="font-semibold">Program</h2>

  {form.program.map((piece, idx) => {
    // 🧩 DEBUG: inspect each piece on every render
    console.log("🧩 piece:", piece);

    return (
      <div key={piece.id ?? idx} className="flex space-x-2">
        {/* Optional tiny visual debug: */}
        {/* <span className="text-gray-400 text-xs">ID: {piece.id ?? "no id"}</span> */}

        <input
          className="border p-2 flex-1 rounded"
          placeholder="Composer"
          value={piece.composer}
          onChange={e => updateProgramField(idx, "composer", e.target.value)}
        />
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Title"
          value={piece.title}
          onChange={e => updateProgramField(idx, "title", e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-20 rounded"
          placeholder="Order"
          value={piece.order}
          onChange={e => updateProgramField(idx, "order", e.target.value)}
          min={1}
        />
        <button
          type="button"
          onClick={() => removeComposition(piece.id ?? idx)}
          className="text-xs text-red-600 underline"
        >
          Remove
        </button>
      </div>
    );
  })}

  <button
    type="button"
    onClick={addComposition}
    className="text-sm text-blue-600 underline"
  >
    + Add Composition
  </button>
</div>

      {/* Local validation message (optional) */}
      {localError && <p className="text-red-600 text-sm">{localError}</p>}

      <button
        disabled={submitting}
        className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-60"
      >
        {submitting ? "Saving…" : (submitLabel || "Create Concert")}
      </button>
    </form>
  );
}
