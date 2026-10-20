
import { Link } from "react-router-dom";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import venueFallback from "../assets/empty_venue.png";

export default function ConcertRow({ concert, isAdmin, handleDelete, variant }) {
  
  const d = new Date(concert.date_start);

  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.toLocaleString("en-US", { day: "2-digit" });
  const year = d.toLocaleString("en-US", { year: "numeric"})

  const weekday = d.toLocaleString("en-US", {
    weekday: "short",
    timeZone: "Europe/Athens",
  }).toUpperCase();

  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Athens",
  });
  const dayHour = `${weekday} ${time}`;

  const venue = concert.venue_detail?.name;
  const mapUrl = concert.venue_detail?.map_link || "";

  const program = Array.isArray(concert.program) ? [...concert.program] : [];
  program.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const isPast = variant === "past";
  const isHome = variant === "home";
  
  

  return (
    <article
      className={[
        "pb-6",
        isPast ? "opacity-60 grayscale-[20%]" : "",
      ].join(" ")}
    >
      <div className="
              min-h-[200px]
              flex flex-col items-center
              md:flex-row gap-8
              border border-white/20
              rounded-xl
              shadow
              p-4
              bg-white/20
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-lg
              
            "
      >

        {/* Date badge */}
        <div className="flex w-18 flex-col items-center justify-center  text-gray-800">
          <span className="text-base font-semibold tracking-widest text-yellow-700">{month}</span>
          <span className="text-3xl font-semibold leading-none">{day}</span>
          <div className="flex flex-col items-center justify-center mt-2">
            <span className="text-sm">{year}</span>
            <span className="text-sm">{dayHour}</span>
          </div>
          
        </div>

        {/* Image */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={concert.venue_detail.imageUrl || venueFallback}
            alt={concert.venue_detail.name}
            onError={(e) => {
              e.currentTarget.src = venueFallback;
            }}
             className="w-[280px] h-[180px] flex-shrink-0 overflow-hidden rounded-xl object-center"
          />
        </div>

        {/* Details */}
        <div className="w-full min-w-0 flex-1 text-center md:text-left">
          {/* Concert Title */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <Link to={`/concerts/${concert.id}`}>
              <h2
                className="text-2xl font-bold leading-tight text-[var(--color-foreground)]"
              >
                {concert.title}
              </h2>
            </Link>

            {isPast && (
                  <span className="rounded-full border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/5 px-3 py-1 text-xs font-medium text-[var(--color-secondary)]">
                    Completed
                  </span>
                )}
          </div>

          {/* Location */}
          <p className="mt-1 font-sans text-base text-[var(--color-secondary)]">
            {concert.venue_detail.city}, {concert.venue_detail.country}
          </p>

          {/* Venue and map */}
          {(venue || mapUrl) && (
            <div className="mt-3 flex flex-col items-center sm:items-start gap-2">
              {venue && (
                <div className="flex items-center gap-2">
                  <Building2
                    size={15}
                    className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                  />
                  <span className="font-sans text-sm text-[var(--color-secondary)]">
                    {concert.venue_detail.name}
                  </span>
                </div>
              )}

              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-[var(--color-secondary)] transition-colors hover:text-[var(--color-primary)]"
                >
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                  />
                  <span className="font-sans text-sm">
                    {concert.venue_detail.city}
                  </span>
                </a>
              )}
            </div>
          )}

          {/* Program */}
          {program.length > 0 && (
            <ul className="mt-3 border-t border-[var(--color-primary)]/10 pt-2 font-sans text-sm text-[var(--color-secondary)]">
              {program.map((p) => (
                <li key={p.id}>
                  <span className="font-semibold text-[var(--color-foreground)]">
                    {p.composer}:
                  </span>{" "}
                  <span>{p.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Ticket Info only in Upcoming concerts */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={`/concerts/${concert.id}`}
            className={
              isHome
                ? `
                  inline-flex items-center justify-center
                  rounded-full
                  border border-[var(--color-accent)]/60
                  bg-[var(--color-navbar)]/30
                  text-[var(--color-foreground)]
                  px-4 py-4
                  font-sans text-sm font-medium
                  transition-all duration-200
                  hover:bg-[var(--color-accent)]/10
                `
                : `
                  inline-flex items-center justify-center gap-2
                  rounded-xl
                  bg-[var(--color-primary)]
                  text-[var(--color-navbar)]
                  px-6 py-3
                  font-sans text-sm font-medium
                  transition-all duration-200
                  hover:bg-[var(--color-secondary)]
                `
            }
          >
            {isHome ? (
              <ArrowRight size={22} />
            ) : (
              <>
                <span>Details</span>
                <ArrowRight size={18} />
              </>
            )}
          </Link>

          {concert.ticket_link && !isPast && !isHome && (
            <a
              href={concert.ticket_link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                rounded-xl
                border border-[var(--color-accent)]/70
                bg-transparent
                text-[var(--color-foreground)]
                px-5 py-2
                font-sans text-sm font-medium
                transition-all duration-200
                hover:bg-[var(--color-accent)]/10
                hover:border-[var(--color-accent)]
                hover:-translate-y-0.5
              "
            >
              Ticket
            </a>
          )}
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
    </article>
  );
}
