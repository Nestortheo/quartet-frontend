import {useEffect,useState,useMemo} from "react"
import ConcertRow from "../components/ConcertRow"
import useConcerts from "../hooks/useConcerts"
import { isAuthenticated } from "../auth"

export default function(){

    const {concerts} = useConcerts();
    const isAdmin = isAuthenticated();
    const PAST_LIMIT = 2
    const UPCOMING_LIMIT = 2
    const[showAllPast, setShowAllPast] = useState(false)

    function isPastDate(date){
        const start = new Date(date)
        const cutoff = new Date(start)
        cutoff.setDate(cutoff.getDate() +1)
        const now = new Date()
        return now >= cutoff
    }

    useEffect(() => {
        console.log("Log concerts",concerts[0]?.date_start) // -->Log concerts 2026-01-02T13:00:00Z 
        console.log(isPastDate(concerts[0]?.date_start)) //Today is 2/11 so 2/11 > 1/13 TRUE 
    },[concerts])

    //Now we have a mechanic that returns true/false to concerts.date_start
    //if true its a past date so past.push(concert.date_start) 
    //if false its a present or future date so upcoming.push(concert.date_start)
   const {upcoming,past} = useMemo(() => {
        const past = [];
        const upcoming = [];
        
        for(const concert of concerts){
            isPastDate(concert?.date_start) ? past.push(concert) 
                                            : upcoming.push(concert)
        }
        //we have to sort out the concerts too..

        console.log("current past before sort", past)
        upcoming.sort((a,b) => new Date(a.date_start) - new Date(b.date_start)) //ascending a-b 
        past.sort((a,b) => new Date(b.date_start) - new Date(a.date_start)) // descending b-a 

        

        return {upcoming,past}
    })

    //Create fmtFull function to get clean dates
    const fmtFull = useMemo(()=> 
        new Intl.DateTimeFormat("en-GB",{
            dateStyle:"full",
            timeStyle:"short",
            timeZone:"Europe/Athens"
        })
    ,[])
   
    //if showAllPast -> true then we show ALL past if not (first state) we simple show 2
    const pastToRender = showAllPast ? past : past.slice(0,PAST_LIMIT)
    
    
    const upcoming2 = upcoming.slice(0,UPCOMING_LIMIT)
    const hiddenPastCount = past.length - PAST_LIMIT
    

    return(
        <main className=" mx-auto max-w-7xl px-4 py-8">
            <div className="mb-10">
                <h1 className="text-3xl font-semibold mb-2">Spartan Mode</h1>
                <p className="text-sm text-neutral-500 ml-2">Concerts: {concerts.length} • admin: {String(isAdmin)}</p>
            </div>

            <section>
                <h2 className="text-2xl font-semibold mb-5">Upcoming Only 2 </h2>
                <div className="border border-dashed rounded-xl border-neutral-500 p-6 mb-10">
                    {upcoming2.map((concert) => (
                        <ConcertRow 
                            key={concert.id}
                            concert={concert}
                            fmtFull={fmtFull}
                            isAdmin={isAdmin}
                            variant="upcoming"
                        />
                    ))}
                </div>
            </section>

            <section className="border rounded-xl border-dashed border-neutral-600 p-6 mb-10">
                <h2 className="text-3xl font-semibold mb-2">Upcoming Concerts</h2>
                <div className="text-sm text-neutral-500 ml-2">
                   {upcoming.length === 0 ? (
                    <p>No upcoming concerts...</p>
                   ): (
                    <div>
                        {upcoming.map((concert) => (
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
            <section className="border rounded-xl border-dashed border-neutral-600 p-6">
                <h2 className="text-3xl font-semibold mb-2">Past Concerts</h2>
                <div className="text-sm text-neutral-500 ml-2">
                    {past.length === 0 ? (
                        <p>No past Concerts</p>
                    ) : (
                        <div>
                            {pastToRender.map((concert) => (
                                <ConcertRow 
                                    key={concert.id}
                                    concert={concert}
                                    isAdmin={isAdmin}
                                    fmtFull={fmtFull}
                                    variant = "past"
                                />
                            ))}
                           {past.length > PAST_LIMIT && (
                            <button
                                type = "button"
                                className="mt-4 hover:underline"
                                onClick = {() => setShowAllPast((v) => !v)}
                            >
                                {showAllPast ? "Show Less" : `Show All (${hiddenPastCount})`}
                            </button>
                           )}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}