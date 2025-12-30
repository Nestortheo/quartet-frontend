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
        <section className="mx-auto max-w-6xl px-4 py-10">

            {/* Header */}
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                <h2 className="text-2xl font-semibold text-gray-900">Upcoming concerts</h2>
                <p className="mt-1 text-sm text-gray-600">Dates are updated regularly.</p>
                </div>

                <Link
                to="/concerts"
                className="text-sm font-medium text-gray-900 underline underline-offset-4"
                >
                View all
                </Link>
            </div>
            {loading && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
                Loading concerts…
            </div>
            )}
            {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                {error}
            </div>
            )}
            {!loading && !error && upcoming.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
                No upcoming concerts yet.
            </div>
            )}

            {!loading && !error && upcoming.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((c) => (
                <Link
                key={c.id}
                to={`/concerts/${c.id}`}
                className="block rounded-2xl border border-gray-200 bg-white p-5 transition hover:bg-gray-50"
                >
                <p className="text-xs font-medium text-gray-500">
                    {fmt.format(new Date(c.date_start))}
                </p>

                <h3 className="mt-2 text-sm font-semibold text-gray-900 underline underline-offset-4">
                    {c.title || "Untitled Concert"}
                </h3>

                {(c.venue || c.city) && (
                    <p className="mt-1 text-sm text-gray-600">
                    {[c.venue, c.city].filter(Boolean).join(" • ")}
                    </p>
                )}

                {Array.isArray(c.program) && c.program.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    {[...c.program]
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                        .slice(0, 2)
                        .map((p) => (
                        <li key={p.id}>
                            {p.composer}: {p.title}
                        </li>
                        ))}
                    </ul>
                )}
                </Link>
            ))}
            </div>
        )}

        </section>
    )
}

export default UpcomingConcerts