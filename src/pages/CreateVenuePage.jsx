import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VenueForm from "../components/VenueForm";
import { createVenue } from "../api/venues";

export default function CreateVenuePage() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  function isValidUrl(str) {
    try {
      const u = new URL(str);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  async function handleSubmit(payload) {
    setSubmitting(true);
    setMessage(null);

    // Required validation
    if (!payload.name.trim() || !payload.city.trim()) {
      setMessage("Name and city are required.");
      setSubmitting(false);
      return;
    }

    const cleanMap = payload.map_link?.trim() ?? "";
    if (cleanMap && !isValidUrl(cleanMap)) {
      setMessage(
        "Please enter a valid URL for Map Link (starts with http(s)://)."
      );
      setSubmitting(false);
      return;
    }

    const cleanImage = payload.imageUrl?.trim() ?? "";
    if (cleanImage && !isValidUrl(cleanImage)) {
      setMessage("Please enter a valid image URL.");
      setSubmitting(false);
      return;
    }

    try {
      const venuePayload = {
        name: payload.name.trim(),
        city: payload.city.trim(),
        country: payload.country.trim(),
        address: payload.address.trim(),

        ...(cleanImage && { imageUrl: cleanImage }),
        ...(cleanMap && { map_link: cleanMap }),
      };

      console.log("Payload:", venuePayload);

      const created = await createVenue(venuePayload);

      console.log("✅ Venue created:", created);

      setMessage("✅ Venue created successfully!");

      setTimeout(() => {
        navigate(-1);
      }, 1000);

    } catch (err) {
      console.error("❌ Error creating venue:", err);

      const data = err?.response?.data;

      if (data) {
        const firstKey = Object.keys(data)[0];
        const firstMsg = Array.isArray(data[firstKey])
          ? data[firstKey][0]
          : data[firstKey];

        setMessage(`${firstKey}: ${firstMsg}`);
      } else {
        setMessage("❌ Failed to create venue");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-24">
      <VenueForm
        onSubmit={handleSubmit}
        submitting={submitting}
        message={message}
      />
    </div>
  );
}