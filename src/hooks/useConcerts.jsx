import { useEffect, useState, useCallback } from "react";
import { fetchConcerts } from "../api/concerts.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function useConcerts() {

  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const removeConcert = useCallback((id) => {
    setConcerts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      const MAX_TRIES = 4;

      for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
        try {
          const data = await fetchConcerts();
          console.log(
            `Concert fetch succeeded. Attempt ${attempt}/${MAX_TRIES}`
          );

          if (cancelled) return;
          setConcerts(Array.isArray(data) ? data : []);
          setLoading(false);
          return; // ✅ success, stop retrying
        } catch (err) {
          console.error(
            `Concert fetch failed. Attempt ${attempt}/${MAX_TRIES}`,
            err
          );

          if (attempt === MAX_TRIES) {
            if (!cancelled) {
              setError("Could not load concerts.");
              setLoading(false);
            }
            return;
          }

          await sleep(600 * 2 ** (attempt - 1));
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { concerts, loading, error, removeConcert };
}