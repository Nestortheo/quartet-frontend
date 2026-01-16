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
    
    return (
      <section className="mx-auto max-w-4xl px-4 py-12">
        {/* Back */}
        <Link
          to="/concerts"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
        >
          <span aria-hidden>←</span>
          Back to concerts
        </Link>

        {/* Main panel */}
        <div className="mt-6 rounded-3xl border border-black/10 bg-white/40 backdrop-blur-md shadow-sm">
          <div className="p-6 sm:p-10">
            {/* Date */}
            <p className="text-sm text-neutral-600">
              {concert?.date_start ? fmt.format(new Date(concert.date_start)) : "Date to be announced"}
            </p>

            {/* Title */}
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              {concert?.title || "Untitled Concert"}
            </h1>

            {/* Venue */}
            <p className="mt-3 text-base sm:text-lg text-neutral-700">
              {concert?.venue_detail?.name || concert?.venue_detail?.city ? (
                [concert?.venue_detail?.name, concert?.venue_detail?.city].filter(Boolean).join(" • ")
              ) : (
                <span className="italic text-neutral-500">Venue will be announced</span>
              )}
            </p>

            {/* Optional description */}
            {concert?.description && (
              <p className="mt-6 whitespace-pre-line text-neutral-700 leading-relaxed">
                {concert.description}
              </p>
            )}

            {/* Divider */}
            <hr className="my-8 border-black/10" />

            {/* Program */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-sm font-semibold tracking-widest uppercase text-neutral-800">
                  Program
                </h2>
              </div>

              {Array.isArray(concert?.program) && concert.program.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {[...concert.program]
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((p) => (
                      <li
                        key={p.id}
                        className="rounded-2xl border border-black/10 bg-white/50 p-4 shadow-sm"
                      >
                        <div className="text-sm font-medium text-neutral-900">
                          {p.composer || "Composer"}
                        </div>
                        <div className="mt-1 text-sm text-neutral-700 italic">
                          {p.title || "Work title"}
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm italic text-neutral-500">
                  Program will be announced soon.
                </p>
              )}
            </div>
            {/*Tickets*/}
            {concert?.ticket_link && (
              <div className="mt-4">
                <a
                  href={concert.ticket_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-900/20 bg-neutral-900 px-5 py-2.5
                            text-sm font-medium text-white transition
                            hover:bg-neutral-800 hover:border-neutral-900"
                >
                  Get tickets
                  <span aria-hidden>→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
);

}