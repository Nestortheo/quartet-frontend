import useConcerts from "../hooks/useConcerts";
import { isAuthenticated } from "../auth";
import {useMemo} from "react"
import ConcertRow from "../components/ConcertRow";

export default function Practice(){

  const isAdmin = isAuthenticated()
  const {concerts, loading, error} = useConcerts()

  console.log("Spartan testing concert ->",concerts[5])

  //Return true if is a past concert!
  const isPastConcert = (dateStartIso) => {
    const start = new Date(dateStartIso);
    const cutoff = new Date(start);
    cutoff.setDate(cutoff.getDate() + 1); // +1 day rule
    const now = new Date()
    return now >= cutoff;
};


//looping through concerts
//push if isPastConcert is true to past
//push to upcoming if !isPastConcert
//sorting
//now we can use upcomingConcerts and pastConcerts
  const { upcomingConcerts, pastConcerts} = useMemo(() => {

    const upcoming = []
    const past = []

    for (const concert of concerts){
      if(isPastConcert(concert.date_start)){
        past.push(concert)
      }
      else{
        upcoming.push(concert)
      }
    }

    upcoming.sort((a,b) => new Date(a.date_start) - new Date(b.date_start))
    past.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
    
    return { upcomingConcerts: upcoming, pastConcerts: past };
  },[concerts])

  const totalSplit = upcomingConcerts.length + pastConcerts.length;

  const fmtFull = useMemo(
  () =>
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/Athens",
    }),
    []
  );

  if(loading) return <p>Loading Concerts..</p>
  if(error) return <p>{error}</p>

  return(
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
          <h1 className="text-2xl font-semibold">Spartan Playground</h1>
          <p className="text-sm text-neutral-500">concerts: {concerts.length} •  admin: {String(isAdmin)}</p>
          <p className="text-xs text-neutral-500 mt-2">
            split check: {totalSplit} / {concerts.length}
          </p>
      </div>

      <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">Upcoming</h2>
          <div className="border border-dashed rounded-2xl border-neutral-400
                          p-6 text-sm text-neutral-600">
             {upcomingConcerts.length === 0 ? (
            <div className="border border-dashed rounded-2xl border-neutral-400 p-6 text-sm text-neutral-600">
              No upcoming concerts.
            </div>
          ) : (
            <div className="space-y-10">
              {upcomingConcerts.map((concert) => (
                <ConcertRow
                  key={concert.id}
                  concert={concert}
                  fmtFull={fmtFull}
                  isAdmin={isAdmin}
                  variant="upcoming"
                />
              ))}
            </div>
          )}
          </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-5">Past</h2>
        <div className="border border-dashed rounded-2xl border-neutral-400
                        p-6 text-sm  text-neutral-600">
          {pastConcerts.length === 0 ? (
            <div className="border border-dashed rounded-2xl border-neutral-400 p-6 text-sm text-neutral-600">
              No past concerts.
            </div>
          ) : (
            <div>
              {pastConcerts.map((concert) => (
                <ConcertRow 
                 key={concert.id}
                  concert={concert}
                  fmtFull={fmtFull}
                  isAdmin={isAdmin}
                  variant="past"
                />
              ))}  
            </div>
          )
        }
        </div>
      </section>
    </main>
  )
}