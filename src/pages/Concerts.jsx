import React, { useMemo } from "react";
import useConcerts from "../hooks/useConcerts"; // ✅ adjust path
import { deleteConcert } from "../api/concerts";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

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
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Concerts</h1>
            <p className="mt-2 text-sm text-gray-600">
              Dates are updated regularly.
            </p>
          </div>

          {isAdmin && (
            <Link
              to="/createConcert"
              className="items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              + Create Concert
            </Link>
          )}
        </div>

        {concerts.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-sm text-gray-600">
            No concerts available yet.
          </div>
        ) : (
          <div className="space-y-10">
            {concerts.map((concert) => {
              const d = new Date(concert.date_start);

              const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
              const day = d.toLocaleString("en-US", { day: "2-digit" });

              // Use your fields if you have them:
              const city = concert.city || concert.location_city || "";
              const region = concert.region || concert.state || concert.country || "";
              const headline = concert.title || [city, region].filter(Boolean).join(", ") || "Concert";

              const venue = concert.venue_detail?.name;
              const mapUrl = concert.map_url || concert.venue_map_url || "";

              const program = Array.isArray(concert.program) ? [...concert.program] : [];
              program.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
              

              return (
                <article key={concert.id} className="border-b border-black-200 pb-10">
                  <div className="flex gap-8">
                    {/* Date badge */}
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                      <div className="text-xs font-semibold tracking-wide">{month}</div>
                      <div className="text-lg font-semibold leading-none">{day}</div>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {headline}
                      </h2>

                      <p className="mt-2 text-sm text-gray-600">
                        {fmtFull.format(d)}
                      </p>

                      {(venue || mapUrl) && (
                        <p className="mt-2 text-sm text-gray-700">
                          {venue}
                          {mapUrl && (
                            <>
                              {" "}
                              <a
                                href={mapUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sky-600 hover:underline"
                              >
                                (map)
                              </a>
                            </>
                          )}
                        </p>
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