import { useEffect, useState } from "react";
import {fetchVenues} from "../api/venues"
import { useNavigate } from "react-router-dom";

export default function ConcertForm({
  onSubmit,
  submitting = false,
  initialValues = null,
  submitLabel,
}) {
  const navigate = useNavigate();

  // ---- Form state (matches backend fields) -----------------
  const [form, setForm] = useState({
    title: "",
    date_start: "",         // <— datetime-local (YYYY-MM-DDTHH:mm)
    date_end: "",           // <— optional
    description: "",
    venueId: "",
    ticket_link: "",
    event_link: "",
    is_public: true,
    program: [{ composer: "", title: "", order: 1 }],
  });



  // ---- Venues ----------------------------------------------
  const [venues, setVenues] = useState([]);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [venuesError, setVenuesError] = useState(null);
  //For Edit Venue
  const [venueForm, setVenueForm] = useState({
    name: "",
    city: "",
    address: "",
    map_link: "",
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setVenuesLoading(true);
        setVenuesError(null);

        const data = await fetchVenues();
        if (!cancelled) setVenues(data);
      } catch (err) {
        if (!cancelled) setVenuesError("Failed to load venues");
      } finally {
        if (!cancelled) setVenuesLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
}, []);

  // utility: convert ISO -> value for <input type="datetime-local">
  function toDateTimeLocalValue(isoLike) {
    if (!isoLike) return "";
    // Accept "YYYY-MM-DDTHH:mm[:ss][.sss]Z?"
    // keep only YYYY-MM-DDTHH:mm
    const i = isoLike.indexOf("T");
    if (i === -1) return isoLike.slice(0, 16);
    return isoLike.slice(0, 16);
  }

  // ---- Prefill for edit ------------------------------------
  useEffect(() => {
    if (!initialValues) return;

    setForm((prev) => ({
      ...prev,
      title: initialValues.title ?? "",
      date_start: toDateTimeLocalValue(initialValues.date_start ?? ""),
      date_end: toDateTimeLocalValue(initialValues.date_end ?? ""),
      description: initialValues.description ?? "",
      ticket_link: initialValues.ticket_link ?? "",
      event_link: initialValues.event_link ?? "",
      is_public:
        typeof initialValues.is_public === "boolean"
          ? initialValues.is_public
          : true,
      venueId:
        typeof initialValues.venue === "object"
          ? String(initialValues.venue?.id ?? "")
          : String(initialValues.venue ?? ""),
      program:
        Array.isArray(initialValues.program) && initialValues.program.length
          ? initialValues.program.map((p, i) => ({
              id: p.id,
              composer: p.composer ?? "",
              title: p.title ?? "",
              order: Number(p.order) || i + 1,
            }))
          : [{ composer: "", title: "", order: 1 }],
    }));
  }, [initialValues]);

  //Prefill for Venue edit
  useEffect(() => {
  if (!initialValues) return;

  setVenueForm({
    name: initialValues.venue_detail?.name ?? "",
    city: initialValues.venue_detail?.city ?? "",
    address: initialValues.venue_detail?.address ?? "",
    map_link: initialValues.venue_detail?.map_link ?? "",
  });
}, [initialValues]);

  // ---- Local error just for the form’s own validation ------
  const [localError, setLocalError] = useState(null);

  // ---- Generic change handler ------------------------------
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ---- Program helpers -------------------------------------
  function updateProgramField(index, field, value) {
    setForm((prev) => ({
      ...prev,
      program: prev.program.map((p, i) =>
        i === index ? { ...p, [field]: field === "order" ? Number(value) : value } : p
      ),
    }));
  }

  function addComposition() {
    setForm((prev) => ({
      ...prev,
      program: [
        ...prev.program,
        { composer: "", title: "", order: prev.program.length + 1 },
      ],
    }));
  }

  function removeComposition(key) {
    setForm((prev) => {
      const byIdIndex = prev.program.findIndex((p) => p.id === key);
      const indexToRemove = byIdIndex !== -1 ? byIdIndex : (Number.isInteger(key) ? key : -1);
      if (indexToRemove === -1) return prev;
      const next = prev.program
        .filter((_, i) => i !== indexToRemove)
        .map((p, i) => ({ ...p, order: i + 1 }));
      return { ...prev, program: next };
    });
  }

  // ---- Submit ----------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    setLocalError(null);

    if (!form.title.trim() || !form.date_start || !form.venueId) {
      setLocalError("Please fill title, start date/time, and venue.");
      return;
    }

    // Clean program: drop empty rows, ensure order
    const cleanedProgram = form.program
      .filter((p) => p.composer?.trim() || p.title?.trim())
      .map((p, i) => ({ ...p, order: p.order || i + 1 }));

    const payload = {
      title: form.title.trim(),
      date_start: form.date_start,                 // datetime-local value
      date_end: form.date_end || null,
      venue: Number(form.venueId),
      description: form.description.trim(),
      ticket_link: form.ticket_link || "",
      event_link: form.event_link || "",
      is_public: !!form.is_public,
      program: cleanedProgram,

      ...(initialValues ? {
        venue_update: {
          name: venueForm.name.trim(),
          city: venueForm.city.trim(),
          address: venueForm.address.trim(),
          map_link: venueForm.map_link.trim(),
        }
      } : {}),
      
    };
    // Safety: if venue changed, don't update venue fields
    const initialVenueId =
      typeof initialValues?.venue === "object"
        ? String(initialValues?.venue?.id ?? "")
        : String(initialValues?.venue ?? "");

    if (initialVenueId && String(form.venueId) !== initialVenueId) {
      delete payload.venue_update;
    }

    // OPTIONAL: omit empty map_link (only if you DON'T want to clear it)
    if (payload.venue_update && !payload.venue_update.map_link) {
      delete payload.venue_update.map_link;
    }
    //onSubmit is either create or edit based on which component calls this
    onSubmit?.(payload);
  }

  // ---- UI ---------------------------------------------------
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

      {/* Date start / end */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Start (date & time)</label>
        <input
          type="datetime-local"
          className="border p-2 w-full rounded"
          value={form.date_start}
          name="date_start"
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">End (optional)</label>
        <input
          type="datetime-local"
          className="border p-2 w-full rounded"
          value={form.date_end}
          name="date_end"
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
          {venues.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} — {v.city}
            </option>
          ))}
        </select>

        {/* ✅ Venue edit (updates current venue) */}
        {initialValues && (
          <div className="mt-4 rounded-xl border border-black/10 bg-black/5 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Edit venue details</h3>
              <span className="text-xs text-gray-600">
                Applies to all concerts using this venue
              </span>
            </div>

            <div className="mt-3 grid gap-2">
              <input
                className="border p-2 w-full rounded text-sm"
                value={venueForm.name}
                onChange={(e) => setVenueForm((v) => ({ ...v, name: e.target.value }))}
                placeholder="Venue name"
              />
              <input
                className="border p-2 w-full rounded text-sm"
                value={venueForm.city}
                onChange={(e) => setVenueForm((v) => ({ ...v, city: e.target.value }))}
                placeholder="City"
              />
              <input
                className="border p-2 w-full rounded text-sm"
                value={venueForm.address}
                onChange={(e) => setVenueForm((v) => ({ ...v, address: e.target.value }))}
                placeholder="Address"
              />
              <input
                className="border p-2 w-full rounded text-sm"
                value={venueForm.map_link}
                onChange={(e) => setVenueForm((v) => ({ ...v, map_link: e.target.value }))}
                placeholder="Map link"
              />
            </div>
          </div>
        )}
        </div>

      {/* Links & visibility */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Ticket link (optional)</label>
        <input
          className="border p-2 w-full rounded"
          value={form.ticket_link}
          name="ticket_link"
          onChange={handleChange}
          placeholder="https://…"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Event link (optional)</label>
        <input
          className="border p-2 w-full rounded"
          value={form.event_link}
          name="event_link"
          onChange={handleChange}
          placeholder="https://…"
        />
      </div>

      <div className="flex items-center gap-2 py-2">
        <input
          id="is_public"
          type="checkbox"
          name="is_public"
          checked={form.is_public}
          onChange={handleChange}
        />
        <label htmlFor="is_public" className="text-sm">Public</label>
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

        {form.program.map((piece, idx) => (
          <div key={piece.id ?? idx} className="flex space-x-2">
            <input
              className="border p-2 flex-1 rounded"
              placeholder="Composer"
              value={piece.composer}
              onChange={(e) => updateProgramField(idx, "composer", e.target.value)}
            />
            <input
              className="border p-2 flex-1 rounded"
              placeholder="Title"
              value={piece.title}
              onChange={(e) => updateProgramField(idx, "title", e.target.value)}
            />
            <input
              type="number"
              className="border p-2 w-20 rounded"
              placeholder="Order"
              value={piece.order}
              onChange={(e) => updateProgramField(idx, "order", e.target.value)}
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
        ))}

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
        {submitting ? "Saving…" : submitLabel || "Create Concert"}
      </button>
    </form>
  );
}
