import {useMemo} from "react";
import { Link } from "react-router-dom";
import useConcerts from "../hooks/useConcerts";

const UpcomingConcerts = ({limit = 3}) => {

    const{concerts,loading,error} = useConcerts()

    const fmt = useMemo(
        () =>
        new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }),
        []
    );



    const upcoming = useMemo(() => {
        const today = new Date();
        console.log(`today is ${today}`)
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        //console.log(`todayStr is ${todayStr}`)
        //console.log(`month is ${String(today.getMonth() +1).padStart(2,"0")}`)
        
        /*
        return [...concerts]

        .filter((c) => {
            console.log("FILTER 1 (has date_start):", {
            id: c.id,
            date_start: c.date_start,
            keep: !!c?.date_start,
            });
            return c?.date_start;
        })

        .map((c) => {
            const dateKey = c.date_start.slice(0, 10);

            console.log("MAP (add dateKey):", {
            id: c.id,
            raw: c.date_start,
            dateKey,
            });

            return { ...c, dateKey };
        })

        .filter((c) => {
            const keep = c.dateKey >= todayStr;

            console.log("FILTER 2 (future only):", {
            id: c.id,
            dateKey: c.dateKey,
            todayStr,
            keep,
            });

            return keep;
        })

        .sort((a, b) => {
            const result = a.dateKey.localeCompare(b.dateKey);

            console.log("SORT:", {
            a: a.dateKey,
            b: b.dateKey,
            result,
            });

            return result;
        })

        .slice(0, limit);
                */
        
        return [...concerts]
            .filter((c) => c?.date_start)
            .map((c) => ({
            ...c,
            dateKey: c.date_start.slice(0, 10),
            }))
            .filter((c) => c.dateKey >= todayStr) // We return c.dates that are either today OR in the future
            .sort((a, b) => a.dateKey.localeCompare(b.dateKey))
            .slice(0, limit); //slice(start,end) --> start from 0 end to limit which is 3 
}, [concerts, limit]);

    console.log("concerts length:", concerts?.length);
    console.log("todayStr:", new Date().toISOString().slice(0, 10));
    console.log("sample dates:", concerts?.slice(0, 5).map(c => c?.date_start));

    
    return(
        <section className="mx-auto max-w-7xl px-4 py-10">

            {/* Header */}
           <div className="w-full max-w-4xl flex items-end justify-between gap-6">
            <div className="border-l-2 border-neutral-900/50 pl-4">
                    <h2 className="text-3xl font-semibold tracking-tight text-neutral-700">
                    Upcoming concerts
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
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
            <div className="rounded-2xl border border-gray-200  p-6 text-sm text-gray-600">
                Loading concerts…
            </div>
            )}
            {!loading && error && (
            <div className="rounded-2xl border border-red-200  p-6 text-sm text-red-700">
                {error}
            </div>
            )}
            {!loading && !error && upcoming.length === 0 && (
            <div className="rounded-2xl border border-gray-200  p-6 text-sm text-gray-600">
                No upcoming concerts yet.
            </div>
            )}

            {!loading && !error && upcoming.length > 0 && (
            <div className="w-full max-w-4xl">
                <div className="mt-8 grid gap-6">
                    {upcoming.map((c) => {
                        const d = new Date(c.date_start);
                        const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
                        const day = d.toLocaleString("en-US", { day: "2-digit" });
                        
                            
                        return(
                            <Link
                                key={c.id}
                                to={`/concerts/${c.id}`}
                                className="group block rounded-2xl border border-black/10 bg-white/20 backdrop-blur shadow-sm transition
                                        hover:-translate-y-0.5 hover:shadow-md hover:bg-white/70"
                            >   
                                {/*Parent Flex for Date- Event - Detail Button */}
                                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                                    {/* LEFT: date */}
                                    <div className="flex flex-col items-center border-r border-neutral-900/40 pr-3 text-neutral-900">
                                        <div className="text-xs uppercase tracking-widest text-neutral-500">{month}</div>
                                        <div className="text-xl font-semibold leading-none">{day}</div>
                                    </div>

                                    {/* MIDDLE: main info */}
                                    <div className=" min-w-0 flex-1 text-center sm:text-left">
                                        <h3 className="text-2xl font-semibold text-gray-900 underline underline-offset-4 decoration-black/20 group-hover:decoration-black/40">
                                        {c.title || "Untitled Concert"}
                                        </h3>

                                        {(c.venue_detail) && (
                                        <p className="mt-1 text-lg text-black-900">
                                            {[c.venue_detail.name].filter(Boolean).join(" • ")}
                                        </p>
                                        )}
                                        {(c.venue_detail) && (
                                        <p className="mt-1 text-m text-gray-600">
                                            {[c.venue_detail.city].filter(Boolean).join(" • ")}
                                        </p>
                                        )}

                                        {Array.isArray(c.program) && c.program.length > 0 && (
                                        <ul className="mt-4 space-y-1 text-sm text-gray-700">
                                            {[...c.program]
                                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                                            .slice(0,2)
                                            .map((p) => (
                                                <li key={p.id} className="truncate">
                                                <span className="font-medium text-gray-900">{p.composer}:</span>{" "}
                                                <span className="text-gray-700">{p.title}</span>
                                                </li>
                                            ))}
                                            
                                        </ul>
                                        )}
                                    </div>

                                    {/* RIGHT: CTA */}
                                    <div className="sm:pt-1 flex justify-center sm:justify-end">
                                        <span
                                        className="inline-flex items-center gap-2 rounded-xl border border-gray-900/20 bg-white/40 px-4 py-2 text-sm font-medium text-gray-900
                                                    group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition"
                                        >
                                        Details
                                        <span aria-hidden className="transition group-hover:translate-x-0.5">
                                            →
                                        </span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            );
                    })}
                </div>
            </div>
        )}

        </section>
    )
}

export default UpcomingConcerts