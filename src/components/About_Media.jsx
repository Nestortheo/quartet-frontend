import { ArrowRight } from 'lucide-react'
import aboutImg from '../assets/_C0A6131.jpg'
import { Link } from 'react-router-dom'
import VideoCardMedia from './VideoCardMedia'


export default function About_Media(){
    
    return(
        <section className="mx-auto max-w-6xl px-4 py-20 mt-20">
            {/*ABOUT*/}
            <div className='flex flex-col md:flex-row items-center gap-16'>
                {/*LEFT*/}
                <div className="flex flex-col gap-8 md:w-2/5">

                    <h2 className='text-sm text-yellow-700'>ABOUT THE QUARTET</h2>
                    <div className='font-serif text-4xl leading-tight'>
                        <p>A quartet united by</p>
                        <p>
                            curiosity and
                            <span className='text-yellow-700'>{" "} dialogue.</span>
                        </p>
                    </div>
                    {/*Seperator line*/}
                    <div className='h-px w-10 border border-yellow-700'/>

                    <p className="max-w-sm leading-relaxed text-neutral-700">
                    Erinys Quartet explores classical repertoire
                    alongside contemporary works, shaping
                    programs around contrast, dialogue,
                    and sound identity.
                    </p>

                    <Link
                        to="/about"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            border-b
                            border-[#c49b63]
                            pb-1
                            w-fit
                        "
                    >
                        <div className='
                                flex gap-2 items-center
                               '
                        >
                            <p>Learn more about us</p>
                            <ArrowRight size={22}/>
                        </div>
                    </Link>

                </div>
                
                {/*RIGHT*/}
                <div className='md:w-3/5 flex justify-end'>
                    <img
                    src={aboutImg}
                    alt="Erinys Quartet"
                    className="
                        w-full object-cover
                        shadow-xl
                        hover:scale-[1.01]
                        transition
                        duration-500
                        rounded-4xl 
                        "
                    />

                </div>
            </div>

            {/*MEDIA*/}
            <div className='flex flex-col md:flex-row gap-16 mt-16 items-center'>
                 {/*LEFT*/}
                <div className='md:w-3/5 md:-mt-12'>
            
                    <VideoCardMedia
                        className="h-full w-full"
                        video={{
                        title: "Performance title",
                        subtitle: "Venue • City • Year",
                        url: "https://www.youtube.com/embed/RYanguk1JRk?start=2",
                        }}
                        showMeta={true}
                    />
                </div>

                {/*RIGHT*/}
                <div className='flex flex-col gap-8 md:w-2/ md:pt-8'>

                    <h2 className='text-sm text-yellow-700'>OUR MEDIA</h2>
                    <div className='font-serif text-4xl leading-tight'>
                        <p>
                            Music
                            <span className='text-yellow-700'>{" "} beyond</span>
                        </p>
                        <p>the concert hall.</p>
                    </div>

                    <div className='h-px w-10 border border-yellow-700'/>

                    <p className='max-w-sm leading-relaxed text-neutral-700'>
                        Listen to selected recordings and watch
                        performances by Erinys Quartet, featuring
                        works from the classical repertoire alongside
                        contemporary music.
                    </p>

                    <Link 
                        to="/media"
                        className='
                            inline-flex
                            items-center
                            gap-2
                            border-b
                            border-[#c49b63]
                            pb-1
                            w-fit 
                        '   
                    >
                        <div className='flex gap-2 items-center'>
                            <p>Explore media</p>
                            <ArrowRight size={22} />
                        </div>
                    </Link>
                </div>
            </div>
    
        </section>
    )
}