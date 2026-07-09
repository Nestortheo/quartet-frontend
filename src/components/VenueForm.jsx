import { useState } from "react";

export default function VenueForm({
  onSubmit,
  submitting = false,
  message,
  submitLabel = "Create Venue",
  heading = "Create Venue",
}) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    country: "",
    address: "",
    mapLink: "",
    imageUrl: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function makeMapsUrl(address, city) {
    const query = [address, city]
      .filter(Boolean)
      .join(", ")
      .trim();

    if (!query) return "";

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: form.name,
      city: form.city,
      country: form.country,
      address: form.address,
      imageUrl: form.imageUrl,
      map_link: form.mapLink,
    };

    await onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {heading && (
        <h1 className="text-xl font-semibold">
          {heading}
        </h1>
      )}

      {/* Name */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Name"
        />
      </div>

      {/* City */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">City</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="City"
        />
      </div>

      {/* Country */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Country</label>
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Country"
        />
      </div>

      {/* Image URL */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Venue Image URL</label>
        <input
          type="url"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Address"
        />
      </div>

      {/* Map Link */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Map Link</label>

        <input
          type="url"
          name="mapLink"
          value={form.mapLink}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="https://maps.google.com/..."
        />

        <button
          type="button"
          className="text-xs underline mt-1"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              mapLink: makeMapsUrl(prev.address, prev.city),
            }))
          }
        >
          Generate from address
        </button>

        <span className="text-xs text-gray-500">
          Optional — paste a Google Maps URL
        </span>
      </div>

      {message && (
        <p
          className={
            message.startsWith("✅")
              ? "text-green-600"
              : "text-red-600"
          }
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-60"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}