import { useEffect, useState } from "react";
import {fetchConcerts} from "../api/concerts.js"

export default function useConcerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const removeConcert = (id) => {
    setConcerts((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const concerts = await fetchConcerts();
        setConcerts(concerts);

      } 
      catch (err) {
        console.error(err);
        setError("Could not load concerts.");
      } 
      finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { concerts, loading, error, removeConcert };
}