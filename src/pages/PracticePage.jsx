import quartetImg from '../assets/_C0A6050-2.jpg';
import {Link} from 'react-router-dom'
import leftImg from '../assets/1.png'
import rightImg from '../assets/2.png'
import useConcerts from "../hooks/useConcerts"; // ✅ adjust path


export default function PracticePage(){
    const { concerts, loading, error, removeConcert } = useConcerts();

    return(
        <main> {/*Main exists for structuring purposes of a whole page */}
            <section>
                {/* Hero Card */}
                <div className="relative h-[60vh] min-h-[420px] max-h-[680px] overflow-hidden bg-black">
                    <img
                    src ={quartetImg}
                    className="h-full w-full object-cover object-center"
                    />
                    {/* Overlay gradient layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />  

                    {/*STRUCTURING TITLE-TEXT AND LINK , needs to be absolute to be ON the banner */}
                    <div className="absolute bottom-0 left-0 right-0">
                        {/*CODE TO SORT THE WIDTH OF THE CARD mx-auto... */}
                        <div className='mx-auto max-w-6xl px-4 pb-8'>
                            <div className='inline-flex flex-col justify-between rounded-xl bg-black/25 px-5 py-4 text-white backdrop-blur'>
                                {/* LEFT BLOCK */}
                                <div>
                                    <h1 className='text-3xl font-semibold text-white/80 leading-tight'>Erinys Quartet</h1>
                                    <p className="text-sm text-white/85">
                                        Vienna-based string quartet • Classical & contemporary repertoire
                                    </p>
                                </div>
                                {/* RIGHT BLOCK */}
                                <div>
                                    <Link to="/concerts/" className="mt-6 inline-flex items-center rounded-xl bg-white/90 px-5 py-3 text-sm font-medium text-black hover:bg-white md:mt-0">
                                        View Concerts
                                    </Link>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className='mx-auto max-w-5xl py-4'>
                {/*Double Image */}
               <div className="overflow-hidden rounded-2xl">
                    <div className=' grid md:grid-cols-2 md:divide-x md:divide-white/15 '>
                        <div className='relative h-65'>
                            <img
                                src={leftImg}
                                className='h-full w-full object-cover object-center'
                            />
                            <div className="absolute bottom-4 left-4">
                                <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
                                    <h1 className='text-3xl text-white/90'>Testing</h1>
                                </div>
                            </div>
                        </div>
                        {/* RIGHT (hidden on mobile, visible on md+) */}
                        <div className='hidden md:block h-65'>
                            <img
                                src={rightImg}
                                className='h-full w-full object-cover object-center'
                            />
                        </div>

                    </div>
              </div>
            </section>
            {/* DRILL 3---> Show Date top left, and concert.title , concert.venue + a view button */}
            <section className="mx-auto max-w-5xl">
                
                {concerts?.map((concert) => {
                    const d = new Date(concert.date_start);

                    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
                    const day = d.toLocaleString("en-US", { day: "2-digit" });

                    return(
                    <div key={concert.id} className = "border-b border-black/25 pb-10">
                        
                        <div className="border flex flex-col items-center gap-4 md:flex-row  md:gap-8">
                            {/* DATE */}
                            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-black/5 text-gray-800">
                                <span className="text-sm font-semibold leading-none">{day}</span>
                                <span className="text-xs font-medium leading-none">{month}</span>
                            </div>

                            {/* INFO */}
                            <div className="flex flex-1 flex-col items-center md:items-start">
                                <h2 className="font-medium ">{concert.title}</h2>
                                <p className="mt-1 text-sm text-gray-700">
                                {concert.venue_detail.name}
                                </p>
                            </div>

                            {/* ACTION */}
                            <Link
                                to={`/concerts/${concert.id}`}
                                className="self-center md:self-auto md:ml-auto inline-flex items-center justify-center rounded-lg border border-black/15 bg-white/70 px-3 py-2 text-sm font-medium hover:bg-white"
                            >
                                View
                            </Link>
                            </div>
                    </div>
                    );
                })}

                
            </section>
        </main>
    )
}