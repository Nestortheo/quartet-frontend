import React, { useEffect,useState } from 'react';

import {api} from "../api.js";

import { getAuthInfo, isAuthenticated } from "../auth"; // ✅ Correct import
import { Link } from "react-router-dom"; // ✅ You also need this


const Concerts = () => {

  const [concerts,setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 📅 Date formatter (runs once per render)
  const fmt = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Athens'
  });
 

  useEffect(() =>{

    let isMounted = true;             // avoid state updates if unmounted
    setLoading(true);
    setError(null);

    async function fetchConcerts() {
      try{
        const res = await api.get('/concerts/');
        console.log("✅ API response:", res.data);
        if(isMounted){
          setConcerts(res.data);
          setLoading(false);
          console.log("📦 Concerts state updated:", res.data);
        }

      } catch (err){
        if(isMounted){
          console.error('Error fetching concerts:', err);
          setError('Could not load concerts');
          setLoading(false);
        }

      }

    }

    fetchConcerts();
    return () => { isMounted = false; };
    
  },[]);

  if (loading) return <p>Loading concerts...</p>;
  if (error)   return <p style={{color:'crimson'}}>Error: {error}</p>;
  
  function handleDelete(id) {
  if (!isAuthenticated()) return;           // safety
  if (!window.confirm("Delete this concert?")) return;

  api.delete(`/concerts/${id}/`)
    .then(() => {
      setConcerts(prev => prev.filter(c => c.id !== id));
    })
    .catch(err => {
      console.error("Delete failed:", err);
      alert("Failed to delete concert.");
    });
}


 return (
  <div className="concerts-page">
    <h1>Concerts</h1>

    {concerts.length === 0 ? (
      <p>No concerts available.</p>
    ) : (
      <ul>
        {concerts.map(concert => (
          <li key={concert.id} className="mb-6 border p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
                {concert.title || 'Untitled Concert'}
            </h2>
            <p><strong>Date:</strong> {fmt.format(new Date(concert.date))}</p>
            {Array.isArray(concert.program) && concert.program.length > 0 && (
              <ul style={{ marginTop: 4, paddingLeft: 0, listStyle: 'none' }}>
                {[...concert.program]
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map(piece => (
                    <li key={piece.id}>
                      {piece.composer}: {piece.title}
                    </li>
                  ))}
              </ul>
            )}

            {/* ✅ Only admins see this */}
            {isAuthenticated() && (
              <>
                <Link
                  to={`/concerts/${concert.id}/edit`}
                  className="inline-block text-sm px-3 py-1 rounded bg-black text-white mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(concert.id)}
                  className="inline-block text-sm px-3 py-1 rounded bg-red-600 text-white"
                >
                  Delete
                </button>
              </>
            )}
                      
          </li>

        ))}

      </ul>
    )}
  </div>
);
};
console.log("auth:", getAuthInfo());
export default Concerts;