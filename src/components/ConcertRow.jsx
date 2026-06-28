
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
             className={
              isHome
                ? "w-40 h-28 flex-shrink-0 overflow-hidden rounded-xl"
                : "w-48 h-38 flex-shrink-0 overflow-hidden rounded-xl"
            }
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-start gap-3">
            <Link to={`/concerts/${concert.id}`}>
              <h2 className="text-2xl font-semibold text-gray-900">
                {concert.title}
              </h2>
            </Link>

            {isPast && (
              <span className="rounded-full border border-gray-900/15 bg-gray-900/5 px-3 py-1 text-xs font-medium text-gray-700">
                Completed
              </span>
            )}
          </div>

          {/*Country*/}
          <div>
            <span className="text-base text-neutral-500">{concert.venue_detail.city}, {concert.venue_detail.country}</span>
          </div>

          {/* Venue+Map */}
          {(venue || mapUrl) && (
            <div className={isHome ? "flex flex-col md:flex-row gap-2 md:gap-8 mt-2 space-y-1" : "flex flex-col mt-2 space-y-1"}>
              <div className="flex items-center gap-1">
                <Building2 size={14} className="text-yellow-700" />
                <span className="text-sm tracking-tight text-neutral-600">{concert.venue_detail.name}</span>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-gray-900
                  hover:text-gray-700
                "
              >
                <MapPin size={14} className="text-yellow-700" />
                <span className="text-sm tracking-tight text-neutral-600">
                  {concert.venue_detail.city}
                </span>
              </a>
            </div>
          )}

          {/* Program */}
          {program.length > 0 && (
            <ul className="mt-3 text-sm text-gray-700  border-t border-[#e8dfd4]">
              {program.map((p) => (
                <li key={p.id}>
                  <span className="font-semibold">{p.composer}:</span>{" "}
                  <span>{p.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Ticket Info only in Upcoming concerts*/}
        <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={`/concerts/${concert.id}`}
              className={
                isHome
                  ? `
                    inline-flex items-center 
                    bg-white/10 text-black
                    px-4 py-4 rounded-full border border-[#d8c3a5]
                    text-sm font-medium
                  `
                  : `
                    inline-flex items-center rounded-xl 
                    bg-gray-900 text-white
                    px-6 py-3
                    text-sm font-medium
                  `
              }
            >
              {isHome ? (
                <ArrowRight size={22} />
              ) : (
                <div className="flex items-center gap-2">
                  <p>Details</p>
                  <ArrowRight size={18}/>
              </div>
              )}
             
              
            </Link>
            {concert.ticket_link && !isPast && !isHome &&(
              <a
                href={concert.ticket_link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center rounded-xl
                  border border-[#d8c3a5]
                  bg-transparent
                  text-[#b8860b]
                  px-5 py-2
                  text-sm font-medium
                  transition-all duration-200
                  hover:bg-[#faf4e8]
                  hover:border-[#b8860b]
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
