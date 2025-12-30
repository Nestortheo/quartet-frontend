import { useState, useEffect } from "react";
import { createVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";

const VenueForm = () => {

    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [mapLink, setMapLink] = useState("")

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

    function makeMapsUrl(address, city) {
        const q = encodeURIComponent([address, city].filter(Boolean).join(", "));
        return `https://www.google.com/maps?q=${q}`;
        }

    async function handleVenueSubmit(e)  {
        
        e.preventDefault();
        setMessage(null);

        // (Optional) quick required checks
        if (!name.trim() || !city.trim()) {
            setMessage("Name and city are required.");
            return;
        }

        const cleanMap = mapLink.trim();
        if (cleanMap && !isValidUrl(cleanMap)) {
            setMessage("Please enter a valid URL for Map Link (starts with http(s)://).");
            return;
        }

        setSubmitting(true);
        try{
         const payload = {
            name: name.trim(),
            city: city.trim(),
            address: address.trim(),
            ...(cleanMap ? { map_link: cleanMap } : {}), // ✅ only include if non-empty & valid
            };

            console.log("Payload:", payload);
            //Posting Venue 
            const created = await createVenue(payload);
            console.log("✅ Venue created:", created);

            setMessage("✅ Venue created successfully!");
            navigate(-1);
            // reset inputs
            setName("");
            setCity("");
            setAddress("");
            setMapLink("");


        }catch (err) {
            console.error("❌ Error creating venue:", err);
            setMessage("❌ Failed to create venue");
        } finally {
            setSubmitting(false);
        }



    }

    


 return(
    <form onSubmit={handleVenueSubmit} className="max-w-md mx-auto p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create Venue</h1>
        <div className="flex flex-col space-y-1"></div>
            <label className="text-sm font-medium">Name</label>
            <input 
                value = {name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Name"
            />
            
        <div className="flex flex-col space-y-1"></div>
            <label className="text-sm font-medium">City</label>
            <input
                value = {city}
                onChange = {(e) => setCity(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="City"
            />
            
        <div className="flex flex-col space-y-1"></div>
            <label className="text-sm font-medium">Adress</label>
            <input
                value = {address}
                onChange = {(e) => setAddress(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Adress"
            />
            
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Map Link</label>
            <input
            type="url"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="https://maps.google.com/?q=Kalantidou+38+Athens"
            />
            <button
            type="button"
            className="text-xs underline mt-1"
            onClick={() => setMapLink(makeMapsUrl(address, city))}
            >
            Generate from address
            </button>
            <span className="text-xs text-gray-500">Optional — paste a Google Maps URL</span>
      </div>
            
        <div className="flex flex-col space-y-1"></div>

        {message && (
            <p className={message.startsWith("✅") ? "text-green-600" : "text-red-600"}>
            {message}
            </p>
        )}
        <button
            disabled={submitting}
            className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-60"
        >
            {submitting ? "Creating..." : "Create Venue"}
        
        </button>

    </form>



 );


};

export default VenueForm;