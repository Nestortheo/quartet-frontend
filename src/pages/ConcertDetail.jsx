import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchConcertById } from "../api/concerts";

export default function ConcertDetail() {

    const {id} = useParams();
    const [concert, setConcert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error , setError] = useState(null);


    const fmt = useMemo(
        () =>
        new Intl.DateTimeFormat("en-GB", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: "Europe/Athens",
        }),
        []
    );

    useEffect(() => {
        async function load() {
            try{
                setLoading(true);
                const data = await fetchConcertById(id)
                setConcert(data)
            }
            catch (err){
                setError("Failed to load concert")
            }
            finally{
                setLoading(false)
            }
        }
        load()
    },[id])

    if (loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>
    
    return(
    <section className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <Link
        to="/concerts"
        className="inline-block text-sm font-medium text-gray-900 underline underline-offset-4"
      >
        ← Back to concerts
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">
          {concert?.date_start ? fmt.format(new Date(concert.date_start)) : ""}
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
          {concert?.title || "Untitled Concert"}
        </h1>

        {(concert?.venue_detail?.name || concert?.venue_detail?.city) && (
          <p className="mt-2 text-gray-700">
            {[concert.venue_detail?.name, concert.venue_detail?.city].filter(Boolean).join(" • ")}
          </p>
        )}

        {concert?.description && (
          <p className="mt-4 whitespace-pre-line text-gray-700">
            {concert.description}
          </p>
        )}

        {Array.isArray(concert?.program) && concert.program.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900">Program</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {[...concert.program]
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((p) => (
                  <li key={p.id} className="rounded-xl border border-gray-200 p-3">
                    <div className="font-medium text-gray-900">{p.composer}</div>
                    <div>{p.title} - {p.composer}</div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );

}