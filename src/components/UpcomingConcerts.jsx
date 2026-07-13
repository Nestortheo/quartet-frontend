import { useMemo } from "react";
import { Link } from "react-router-dom";
import useConcerts from "../hooks/useConcerts"; // adjust path if needed
import ConcertRow from "./ConcertRow";
import { ArrowRight } from "lucide-react";

const UpcomingConcerts = ({ limit = 3 }) => {
  const { concerts, loading, error } = useConcerts();

  const upcoming = useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return [...(concerts ?? [])]
      .filter((c) => c?.date_start)
      .map((c) => ({ ...c, dt: new Date(c.date_start) }))
      .filter((c) => c.dt >= startOfToday)
      .sort((a, b) => a.dt - b.dt)
      .slice(0, limit);
  }, [concerts, limit]);

  // Fill remaining slots with placeholders so the section always shows `limit` cards
  const items = useMemo(() => {
    const safe = upcoming ?? [];
    const remaining = Math.max(0, limit - safe.length);

    const placeholders = Array.from({ length: remaining }, (_, i) => ({
      id: `placeholder-${i}`,
      __placeholder: true,
    }));
    
    return [...safe, ...placeholders];
  }, [upcoming, limit]);

  const hasRealUpcoming = upcoming.length > 0;

  return (
  <section className="w-full px-4 sm:px-0">
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_160px] gap-12">

        {/* LEFT COLUMN */}
        <div>
          {/* Header */}
          <div className="w-full max-w-4xl flex flex-col gap-6">
            <div className="border-l-2 border-[#c49b63] pl-4">
              <h2 className="text-4xl sm:text-5xl font-serif  tracking-tight text-neutral-700 mb-4">
                Upcoming concerts
              </h2>

              <div className="mt-8 flex justify-between">
                <p className="hidden md:block mt-1 font-sans text-sm text-neutral-600">
                  Dates are updated regularly.
                </p>

                <Link
                  to="/concerts"
                  className="
                    hidden md:inline-flex 
                    items-center gap-2
                    group 
                    text-sm font-medium text-gray-900
                    border-b-2 border-[#c49b63]
                    font-semibold
                    hover:text-neutral-700 transition
                  
                  "
                >
                  View all concerts

                  <span
                    className="transition group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-6 rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
              Loading concerts…
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-6 rounded-2xl border border-red-200 p-6 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* No concerts */}
          {!loading && !error && !hasRealUpcoming && (
            <div className="mt-6 rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
              No upcoming concerts yet.
            </div>
          )}

          {/* Concert list */}
          {!loading && !error && (
            <div className="w-full max-w-4xl">
              <div className="mt-8 grid gap-6">
                {items.map((c) =>
                 c.__placeholder ? (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-black/10 bg-white/10 backdrop-blur shadow-sm"
                  >
                    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                      {/* LEFT: date */}
                      <div className="flex flex-col items-center border-r border-neutral-900/20 pr-3 text-neutral-400">
                        <div className="text-xs uppercase tracking-widest">—</div>
                        <div className="text-xl font-semibold leading-none">—</div>
                      </div>

                      {/* MIDDLE: main info */}
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <h3 className="text-2xl font-semibold text-neutral-600">
                          More dates coming soon
                        </h3>

                        <p className="mt-1 text-sm text-neutral-500">
                          Check back later or view all concerts.
                        </p>
                      </div>

                      {/* RIGHT: CTA */}
                      <div className="sm:pt-1 flex justify-center sm:justify-end">
                        <Link
                          to="/concerts"
                          className="
                            inline-flex items-center gap-2 rounded-xl
                            border border-gray-900/20
                            bg-white/30
                            px-4 py-2
                            text-sm font-medium text-gray-900
                            transition
                            hover:bg-gray-900
                            hover:text-white
                            hover:border-gray-900
                          "
                        >
                          View all
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                    <ConcertRow
                      key={c.id}
                      concert={c}
                      variant="home"
                    />
                  )
                )}
              </div>
            </div>
          )}
          <Link
                  to="/concerts"
                  className="
                    inline-flex md:hidden 
                    items-center gap-2
                    group 
                    text-sm font-medium text-gray-900
                    border-b-2 border-[#c49b63]
                    font-semibold
                    hover:text-neutral-700 transition
                  
                  "
                >
                  View all concerts

                  <span
                    className="transition group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <ArrowRight size={18} />
                  </span>
                </Link>
        </div>
        

        {/* RIGHT COLUMN */}
        <aside
          className="
            hidden lg:flex
            flex-col justify-center
            border-l border-[#c49b63]
            pl-8
            relative
            
          "
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#c49b63]">
            2026 Season
          </p>

          <h3
            className="
              mt-8
              text-4xl
              leading-tight
              text-neutral-800
              font-serif
            "
          >
            Timeless music,
            <br />
            shared moments.
          </h3>

          <div className="mt-8 h-px w-12 bg-[#c49b63]" />

          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-neutral-500">
            Erinys Quartet
          </p>

          {/* Optional decorative SVG later */}
        </aside>

      </div>
    </div>
  </section>
);
};

export default UpcomingConcerts;
