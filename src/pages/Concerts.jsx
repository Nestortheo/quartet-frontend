import React, { useMemo } from "react";
import useConcerts from "../hooks/useConcerts"; // ✅ adjust path
import { deleteConcert } from "../api/concerts";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import mediaHero from "../assets/2.png"; // adjust path

const Concerts = () => {

  
  const isAdmin = isAuthenticated()
  const { concerts, loading, error, removeConcert } = useConcerts();
  
  // 📅 Date formatter (runs once per render)
  const fmtFull = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/Athens",
      }),
    []
  );
 {/*Fetching concerts and removeConcert are called from useConcerts,
  I DID THIS CAUSE I WANTED TO FETCH AGAIN CONCERTS FOR THE HOME
  SO I DONT WRITE CODE TO FETCH TWICE THE CONCERTS */}
  const handleDelete = async (id) => {
    if (!isAuthenticated()) return;
    if (!window.confirm("Delete this concert?")) return;

    try {
      await deleteConcert(id)
      removeConcert(id); // ✅ updates hook state
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete concert.");
    }
  };
 
  if (loading) return <p>Loading concerts...</p>;
  if (error)   return <p style={{color:'crimson'}}>Error: {error}</p>;
  
  


return (
  <main>
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/*Hero Image */}
      <section className="relative mb-10 overflow-hidden rounded-3xl border border-black/5">
          <img
            src={mediaHero}
            alt="Erinys Quartet — Media"
            className="h-44 w-full object-cover md:h-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Concerts
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Dates are updated regularly.
              </p>
            </div>
          </div>
      </section>

      {/* TOP ROW (only admin button now) */}
      <div className="mb-10 flex items-end justify-end gap-4">
        {isAdmin && (
          <Link
            to="/createConcert"
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            + Create Concert
          </Link>
        )}
      </div>

      {concerts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 p-8 text-sm text-gray-600">
          No concerts available yet.
        </div>
      ) : (
        <div className="space-y-10">
          {concerts.map((concert) => {
            const d = new Date(concert.date_start);

            const month = d
              .toLocaleString("en-US", { month: "short" })
              .toUpperCase();
            const day = d.toLocaleString("en-US", { day: "2-digit" });

            const city = concert.city || concert.location_city || "";
            const region =
              concert.region || concert.state || concert.country || "";
            const headline =
              concert.title ||
              [city, region].filter(Boolean).join(", ") ||
              "Concert";

            const venue = concert.venue_detail?.name;
            const mapUrl =concert.venue_detail.map_link || "";

            const program = Array.isArray(concert.program)
              ? [...concert.program]
              : [];
            program.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

            return (
              <article key={concert.id} className="border-b border-black/10 pb-10">
                <div className="flex gap-8">
                  {/* Date badge */}
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-black/5 text-gray-800">
                    <div className="text-[11px] font-semibold tracking-widest text-gray-600">
                      {month}
                    </div>
                    <div className="text-xl font-semibold leading-none">
                      {day}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <Link
                      to = {`/concerts/${concert.id}`}
                    >
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {headline}
                    </h2>
                    </Link>
                    <p className="mt-2 text-sm text-gray-600">
                      {fmtFull.format(d)}
                    </p>

                    {(venue || mapUrl) && (
                    <div className="mt-2 space-y-1 text-sm text-gray-700">
                      {venue && (
                        <div className="font-medium text-gray-800">
                          {venue}
                        </div>
                      )}

                      {(concert.venue_detail?.address || mapUrl) && (
                        <div className="text-gray-600">
                          
                          <div>
                            {mapUrl && (
                              <>
                                {" "}
                                <a
                                  href={mapUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-900 underline underline-offset-4 hover:text-gray-700"
                                >
                                  (View Address)
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                    {program.length > 0 && (
                      <ul className="mt-6 space-y-3 text-sm text-gray-800">
                        {program.map((p) => (
                          <li key={p.id}>
                            <span className="font-semibold">{p.composer}:</span>{" "}
                            <span>{p.title}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/*Ticket Info */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                    {/* Ticket */}
                    {concert.ticket_link && (
                      <a
                        href={concert.ticket_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-xl
                                  bg-gray-900 px-5 py-2
                                  text-sm font-medium text-white
                                  transition hover:bg-gray-800"
                      >
                        Ticket
                      </a>
                    )}

                    {/* View Event */}
                    <Link
                      to={`/concerts/${concert.id}`}
                      className="inline-flex items-center rounded-xl
                                border border-gray-900/20 px-5 py-2
                                text-sm font-medium text-gray-900
                                transition hover:bg-gray-900 hover:text-white"
                    >
                      View Event
                    </Link>
                  </div>

                    {/* Admin controls */}
                    {isAdmin && (
                      <div className="mt-6 flex items-center gap-2">
                        <Link
                          to={`/concerts/${concert.id}/edit`}
                          className="inline-flex items-center rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(concert.id)}
                          className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  </main>
);
};

export default Concerts;