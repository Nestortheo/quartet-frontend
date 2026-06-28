import { useState, useEffect } from "react";
import { createVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";

const VenueForm = () => {

    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [city, setCity] = useState("");
    const[country,setCountry] = useState("")
    const [address, setAddress] = useState("");
    const [mapLink, setMapLink] = useState("")
    const [imageUrl, setImageUrl] = useState("");

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
        const query = [address, city]
            .filter(Boolean)
            .join(", ")
            .trim();

        if (!query) return "";

        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
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

        const cleanImage = imageUrl.trim();
        if (cleanImage && !isValidUrl(cleanImage)) {
            setMessage("Please enter a valid image URL.");
            return;
        }   


        setSubmitting(true);

        try{
         const payload = {
            name: name.trim(),
            city: city.trim(),
            country: country.trim(),
            ...(cleanImage ? { imageUrl: cleanImage } : {}),
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
            setImageUrl("");
            setAddress("");
            setMapLink("");


        }
        catch (err) {
            console.error("❌ Error creating venue:", err);

            const data = err?.response?.data;

            if (data) {
                console.log("DRF error data:", data);
                // show first useful message
                const firstKey = Object.keys(data)[0];
                const firstMsg = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
                setMessage(`${firstKey}: ${firstMsg}`);
            } else {
                setMessage("❌ Failed to create venue");
            }
    }
    finally{
        setSubmitting(false);
    }
  }    


 return(
    <form onSubmit={handleVenueSubmit} className="max-w-md mx-auto p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create Venue</h1>
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input 
                name="name"
                value = {name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Name"
            />
        </div>
            
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">City</label>
            <input
                name="city"
                value = {city}
                onChange = {(e) => setCity(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="City"
            />
        </div>

        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Country</label>
            <input
                name="country"
                value = {country}
                onChange = {(e) => setCountry(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Country"
            />
        </div>      

        <div className="flex flex-col space-y-1">
            <label>Venue Image URL</label>
            <input 
                type="url"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="https://example.com/festival.jpg"
                
            />
        </div>

        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Address</label>
            <input
                name="address"
                value = {address}
                onChange = {(e) => setAddress(e.target.value)}
                className="border p-2 w-full rounded"
                placeholder="Address"
            />
        </div>
            
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Map Link</label>
            <input
                name="mapLink"
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