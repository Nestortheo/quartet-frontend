
import { Link } from "react-router-dom";

export default function ConcertRow({ concert, fmtFull, isAdmin, handleDelete, variant }) {
  const d = new Date(concert.date_start);

  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.toLocaleString("en-US", { day: "2-digit" });

  const city = concert.city || concert.location_city || "";
  const region = concert.region || concert.state || concert.country || "";
  const headline =
    concert.title || [city, region].filter(Boolean).join(", ") || "Concert";

  const venue = concert.venue_detail?.name;
  const mapUrl = concert.venue_detail?.map_link || "";

  const program = Array.isArray(concert.program) ? [...concert.program] : [];
  program.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const isPast = variant === "past";

  return (
    <article
      className={[
        "border-b border-black/10 pb-10",
        isPast ? "opacity-60 grayscale-[20%]" : "",
      ].join(" ")}
    >
      <div className="flex gap-8">
        {/* Date badge */}
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-black/5 text-gray-800">
          <div className="text-[11px] font-semibold tracking-widest text-gray-600">{month}</div>
          <div className="text-xl font-semibold leading-none">{day}</div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/concerts/${concert.id}`}>
              <h2 className="text-2xl font-semibold text-gray-900">
                {headline}
              </h2>
            </Link>

            {isPast && (
              <span className="rounded-full border border-gray-900/15 bg-gray-900/5 px-3 py-1 text-xs font-medium text-gray-700">
                Completed
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-gray-600">{fmtFull.format(d)}</p>

          {(venue || mapUrl) && (
            <div className="mt-2 space-y-1 text-sm text-gray-700">
              {venue && (
                <div className="font-medium text-gray-800">{venue}</div>
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
            <ul className="mt-5 pt-3 space-y-2 border-t border-black/5 text-sm text-gray-800">
              {program.map((p) => (
                <li key={p.id}>
                  <span className="font-semibold">{p.composer}:</span>{" "}
                  <span>{p.title}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Ticket Info */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {concert.ticket_link && !isPast && (
              <a
                href={concert.ticket_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Ticket
              </a>
            )}

            <Link
              to={`/concerts/${concert.id}`}
              className="inline-flex items-center rounded-xl border border-gray-900/20 px-5 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
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
}
