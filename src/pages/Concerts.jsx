import React, { useMemo, useState} from "react";
import useConcerts from "../hooks/useConcerts"; // ✅ adjust path
import { deleteConcert } from "../api/concerts";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import mediaHero from "../assets/2.png"; // adjust path
import ConcertRow from "../components/ConcertRow"

const PAST_LIMIT = 6;

const Concerts = () => {

  
  const isAdmin = isAuthenticated()
  const { concerts, loading, error, removeConcert } = useConcerts();

  //show more past concerts if the user wants.
  const [showAllPast, setShowAllPast] = useState(false);

  // “Completed” = 1 day after the event start date
  const isPastConcert = (dateStartIso) => {
    const start = new Date(dateStartIso);
    const cutoff = new Date(start);
    cutoff.setDate(cutoff.getDate() + 1);
    return new Date() >= cutoff;
  };

  const { upcomingConcerts, pastConcerts } = useMemo(() => {
    const upcoming = [];
    const past = [];

    for (const c of concerts) {
      if (isPastConcert(c.date_start)) past.push(c);
      else upcoming.push(c);
    }

    // upcoming: soonest first
    upcoming.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
    // past: most recent first
    past.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));

    return { upcomingConcerts: upcoming, pastConcerts: past };
  }, [concerts]);

  const visiblePastConcerts = useMemo(() => {
    return showAllPast ? pastConcerts : pastConcerts.slice(0,PAST_LIMIT)
  },[pastConcerts, showAllPast]);

   const hasMorePast = pastConcerts.length > PAST_LIMIT;

  
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
            {/* UPCOMING */}
            {upcomingConcerts.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 p-8 text-sm text-gray-600">
                No upcoming concerts right now.
              </div>
            ) : (
              <div className="space-y-10">
                {upcomingConcerts.map((concert) => (
                  <ConcertRow
                    key={concert.id}
                    concert={concert}
                    fmtFull={fmtFull}
                    isAdmin={isAdmin}
                    handleDelete={handleDelete}
                    variant="upcoming"
                  />
                ))}
              </div>
            )}
           
            {/* PAST (collapsible) && limitied to 8 && showAllPast */}
            {pastConcerts.length > 0 && (
              <section className="pt-2">
                  <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Past concerts
                      </h3>
                      <span className="text-xs text-gray-600">
                        {pastConcerts.length} completed
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-10">
                    {visiblePastConcerts.map((concert) => (
                      <ConcertRow
                        key={concert.id}
                        concert={concert}
                        fmtFull={fmtFull}
                        isAdmin={isAdmin}
                        handleDelete={handleDelete}
                        variant="past"
                      />
                    ))}
                  </div>
                  {hasMorePast && (
                    <div className="pt-6 text-center">
                      <button
                        type="button"
                        onClick={() => setShowAllPast((v) => !v)}
                        className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700"
                      >
                        {showAllPast ? "Show fewer" : `Show all (${pastConcerts.length})`}
                      </button>
                    </div>
                  )}
              </section>
            )}
          </div>
        )}
    </div>
  </main>
);
};

export default Concerts;