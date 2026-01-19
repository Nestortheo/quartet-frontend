import { useMemo } from "react";
import { Link } from "react-router-dom";
import useConcerts from "../hooks/useConcerts"; // adjust path if needed

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
    <section className="w-full mx-auto overflow-x-hidden px-4 sm:px-0">
      {/* Header */}
      <div className="w-full max-w-4xl flex flex-col  justify-between gap-6 sm:border-r sm:border-neutral-900/40 sm:pr-3" >
        <div className="border-l-2 border-neutral-900/50 pl-4">
          <h2 className="text-xl sm:text-3xl font-semibold tracking-tight text-neutral-700">
            Upcoming concerts
          </h2>
          <p className="mt-1 text-sm sm:text-base text-neutral-600">
            Dates are updated regularly.
          </p>
        </div>

        <Link
          to="/concerts"
          className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-700 transition"
        >
          View all
          <span className="transition group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
      </div>

      {loading && (
        <div className="mt-6 rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
          Loading concerts…
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-red-200 p-6 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && !hasRealUpcoming && (
        <div className="mt-6 rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
          No upcoming concerts yet.
        </div>
      )}

      {!loading && !error && (
        <div className="w-full max-w-4xl">
          <div className="mt-8 grid gap-6">
            {items.map((c) => {
              // Placeholder cards
              if (c.__placeholder) {
                return (
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
                          className="inline-flex items-center gap-2 rounded-xl border border-gray-900/20 bg-white/30 px-4 py-2 text-sm font-medium text-gray-900
                                     transition hover:bg-gray-900 hover:text-white hover:border-gray-900"
                        >
                          View all
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              // Real concerts
              const d = c.dt ?? new Date(c.date_start);
              const month = d
                .toLocaleString("en-US", { month: "short" })
                .toUpperCase();
              const day = d.toLocaleString("en-US", { day: "2-digit" });

              return (
                
                <div
                  key={c.id}
                  className=" rounded-2xl border border-black/10 bg-white/20 backdrop-blur shadow-sm transition
                             hover:-translate-y-0.5 hover:shadow-md hover:bg-white/70"
                >
                  {/* Parent Flex for Date - Event - Detail Button */}
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                    {/* LEFT: date */}
                    <div className="flex flex-col items-center border-r border-neutral-900/40 pr-3 text-neutral-900">
                      <div className="text-xs uppercase tracking-widest text-neutral-500">{month}</div>
                      <div className="text-xl font-semibold leading-none">{day}</div>
                    </div>

                    {/* MIDDLE: main info */}
                    <div className="min-w-0 w-full flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 underline underline-offset-4 decoration-black/20 group-hover:decoration-black/40">
                        {c.title || "Untitled Concert"}
                      </h3>

                      {c.venue_detail && (
                        <p className="mt-1 text-lg sm:text-lg text-black-900">
                          {[c.venue_detail.name].filter(Boolean).join(" • ")}
                        </p>
                      )}

                      {c.venue_detail && (
                        <p className="mt-1 text-m text-gray-600">
                          {[c.venue_detail.city].filter(Boolean).join(" • ")}
                        </p>
                      )}

                      {Array.isArray(c.program) && c.program.length > 0 ? (
                        <ul className="mt-4 space-y-1 text-sm text-gray-700  sm:block">
                          {[...c.program]
                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                            .slice(0, 2)
                            .map((p) => (
                              <li key={p.id} className="break-words sm:truncate sm:whitespace-nowrap">
                                <span className="font-medium text-gray-900">
                                  {p.composer}:
                                </span>{" "}
                                <span className="text-gray-700">{p.title}</span>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-sm italic text-gray-500">
                            Program will be announced soon.
                        </p>

                      )}
                    </div>

                    {/* RIGHT: CTA */}
                    <div className="sm:pt-1 flex justify-center sm:justify-end">
                      <Link
                        to={`/concerts/${c.id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-900/20 bg-white/40 px-4 py-2 text-sm font-medium text-gray-900
                                   transition hover:bg-gray-900 hover:text-white hover:border-gray-900"
                      >
                        Details
                        <span aria-hidden className="transition group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingConcerts;
