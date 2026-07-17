import aboutBanner from '../assets/1.png'
import Stergios from '../assets/StergiosTheodoridis-(11of11).webp'
import Maria from '../assets/MarijaRaisanen1-(5of8).webp'
import Jooseph from '../assets/JoosepReimaa-(2of8).webp'
import Lizie from '../assets/IMG_0026+(1).webp'
import { ArrowRight, Trophy, TrophyIcon, Medal, MedalIcon, Users } from 'lucide-react'
import { useState } from 'react'

const achievements = [
  {
    id: 1,
    icon: Trophy,
    year: "2023",
    title: "Audience Prize Award",
    subtitle: "of the City of Bad Tölz",
  },
  {
    id: 2,
    icon: Medal,
    year: "2024",
    title: "Bronze Medal",
    subtitle: "Fischoff Chamber Music Competition",
  },
  {
    id: 3,
    icon: Users,
    year: "Since 2021",
    title: "Supported by",
    subtitle: "Le Dimore del Quartetto & MERITA",
  },
];

const ensemble = [
    {
        id:1,
        name: "Elizabeth Stewart",
        instrument: "Violin",
        image : Lizie,
        reverse:false,
        bio: [
            'Hailed for her "warm tone and thought artistry" (The Strad), Elizabeth Stewart is a violinist equally at home on concert stages and in chamber music settings.',

            "She holds degrees from the Curtis Institute of Music and the Sibelius Academy, where she studied with Pamela Frank and Kaija Saarikettu."
        ],
        achievements: [
            "First Prize, Young Concert Artists International Auditions",
            "Perlman Music Program alumna",
            "Performs on a violin by J.B. Guadagnini (1750)"
        ]
    },
    {
        id:2,
        name: "Joosep Reimaa",
        instrument: "Violin",
        image : Jooseph,
        reverse:true,
        bio: [
            'Known for his vitality and musical intelligence, Joosep Reimaa is a passionate chamber musician and soloist.',

            "He studied at the Sibelius Academy with Antti Tikkanen and continued his studies at the Kronberg Academy."
        ],
        achievements: [
            "Prizewinner at the Trondheim international Chamber Music Competition",
            "Regular guest at major festivals across Europe",
            "Performs on Giovanni Battista Guadagnini violin (1762)"
        ]
    },
    {
        id:3,
        name: " Marija Räisänen",
        instrument: "Viola",
        image : Maria,
        reverse:false,
        bio: [
            'Known for his vitality and musical intelligence, Joosep Reimaa is a passionate chamber musician and soloist.',

            "He studied at the Sibelius Academy with Antti Tikkanen and continued his studies at the Kronberg Academy."
        ],
        achievements: [
            "Prizewinner at the Trondheim international Chamber Music Competition",
            "Regular guest at major festivals across Europe",
            "Performs on Giovanni Battista Guadagnini violin (1762)"
        ]
    },
    {
        id:4,
        name: "Stergios Theodoridis",
        instrument: "Cello",
        image : Stergios,
        reverse:true,
        bio: [
            'Known for his vitality and musical intelligence, Joosep Reimaa is a passionate chamber musician and soloist.',

            "He studied at the Sibelius Academy with Antti Tikkanen and continued his studies at the Kronberg Academy."
        ],
        achievements: [
            "Prizewinner at the Trondheim international Chamber Music Competition",
            "Regular guest at major festivals across Europe",
            "Performs on Giovanni Battista Guadagnini violin (1762)"
        ]
    }
]

export default function AboutRemake(){

    const [view, setView] = useState(false);
    console.log("view ->",view)

    return(
        <section className='max-w-7xl mx-auto mt-25 p-10'>
            {/*About Hero Div */}
            <div className='flex flex-col items-center md:flex-row gap-2 '>
                {/* LEFT */}
                <div className='
                        md:w-2/5
                        flex flex-col
                        gap-8
                        
                    '
                >
                    <h2 className='text-sm text-yellow-700 font-semibold'>ABOUT THE QUARTET</h2>
                    
                    <p className='text-5xl '>
                        Rooted in tradition, driven by 
                        <span className=''>{" "}discovery</span>
                    </p>
                    <div className='w-10 h-px border border-yellow-700'/>
                    <div className='flex flex-col gap-4 text-neutral-700'>
                        <p>
                            Named for Erinyes (a.k.a the Furies) from the Greek tragedy Oresteia
                            by Aeschylus the Erinya Quartet was founded in 2018 at the Sibelius
                            Academy in Helsinki where they worked closely with cellist Marko Ylönen.
                        </p>
                        <p>
                            Since Autumn 2025 Erinys has been the graduate string quartet-in-
                            residence at Indiana University Jacobs School of Music in Bloomington, IN (USA).
                        </p>
                        <p>
                            Praised for their compelling interpretations and collaborative spirit, the
                            quartet has quickly established themselves as one of the most exciting
                            emerging ensembles on the international stage.
                        </p>
                    </div>
                    {view && (
                    <div className='flex flex-col gap-4 text-neutral-700'>
                        <p>
                            At the Bad Tölz International String Quartet Competition in 2023
                            they were awarded the Audience Prize Award of the City of Bad Tölz,
                            as well as the Esterházy Foundation Special Prize for best interpretation
                            of a Haydn string quartet. They also won the Bronze Medal at the 2024 Fischoff Chamber Music Competition.
                         </p>
                         <p>
                             Since 2021 Erinys Quartet has been supported by Le Dimore del Quartetto where they are
                             also a part of the European Union-sponsored MERITA platform.
                        </p>
                        <p>
                            In the 2025–26 season the Erinys Quartet will present concerts throughout the United States and Europe,
                            including debuts at the Philadelphia Chamber Music Society and the Lucerne Festival in Switzerland.
                            They will also be giving concerts around the United States as part of Curtis on Tour performing with
                            pianist Michelle Cann, violist Roberto Díaz, and cellist Peter Wiley.
                        </p>
                        <p>
                            In addition to their studies at Indiana University with the Pacifica Quartet,
                            Erinys holds a diploma in string quartet from the Curtis Institute of Music where
                            they studied with the Dover Quartet, and they are pursuing a diploma in chamber music
                             at Escuela Superior de Música Reina Sofía in Madrid, Spain under the tutelage of Professor
                            Günter Pichler of the Alban Berg Quartet.
                        </p>
                    </div>
                )}
            
                    <button
                        type="button"
                        onClick={() => setView(!view)}
                        className='flex gap-2 text-yellow-700 md:hidden'
                    >
                        <p className='text-sm '>
                            {view ? "Show less" : "Read More"}
                        </p>
                        <ArrowRight size={22} />
                    </button>
                    {/*Desktop */}
                
                                
                </div>
                {/* RIGHT */}
                <div className='md:w-3/5 flex justify-end'>
                    <img
                        src={aboutBanner}
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
            
            {/*Desktop Expanded Text + Achievements*/}
            {/*
            <div className="hidden md:max-w-3xl md:block md:flex flex-col gap-6 text-neutral-700 mt-16 pt-12 border-t border-[#c49b63]/40">
                        <p>
                            At the Bad Tölz International String Quartet Competition in 2023
                            they were awarded the Audience Prize Award of the City of Bad Tölz,
                            as well as the Esterházy Foundation Special Prize for best interpretation
                            of a Haydn string quartet. They also won the Bronze Medal at the 2024 Fischoff Chamber Music Competition.
                         </p>
                         <p>
                             Since 2021 Erinys Quartet has been supported by Le Dimore del Quartetto where they are
                             also a part of the European Union-sponsored MERITA platform.
                        </p>
                        <p>
                            In the 2025–26 season the Erinys Quartet will present concerts throughout the United States and Europe,
                            including debuts at the Philadelphia Chamber Music Society and the Lucerne Festival in Switzerland.
                            They will also be giving concerts around the United States as part of Curtis on Tour performing with
                            pianist Michelle Cann, violist Roberto Díaz, and cellist Peter Wiley.
                        </p>
                        <p>
                            In addition to their studies at Indiana University with the Pacifica Quartet,
                            Erinys holds a diploma in string quartet from the Curtis Institute of Music where
                            they studied with the Dover Quartet, and they are pursuing a diploma in chamber music
                             at Escuela Superior de Música Reina Sofía in Madrid, Spain under the tutelage of Professor
                            Günter Pichler of the Alban Berg Quartet.
                        </p>
                    </div>
                
            */}
           
            <div className='w-full h-px border border-yellow-700 mt-10'/>
            <div className='hidden md:flex flex-col md:flex-row gap-8 mt-16'>
                        {achievements.map((achievement) => {
                            const Icon = achievement.icon;
                            return(
                                <div
                                    key={achievement.id}
                                    className="
                                    w-72 h-54
                                    rounded-3xl
                                    border border-neutral-200
                                    bg-white/30
                                    p-8
                                    shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]
                                    "
                                >
                                    <Icon 
                                        size={38}
                                        className='text-yellow-700 mb-4'
                                    />
                                    <h3 className='font-serif text-4xl mb-3'>
                                        {achievement.year}
                                    </h3>
                                    
                                    <p>{achievement.title}</p>
                                    <p>{achievement.subtitle}</p>

                                </div>
                            )
                        })}
                    </div>   
            {/*The Ensemble*/}      
            <div className='flex flex-col gap-4 items-center mt-32'>

                <h2 className='text-sm text-yellow-700'>THE ENSEMBLE</h2>
                <div className='w-10 h-px border border-yellow-700'/>
                <p className='text-5xl '>Meet the Musicians</p>
                
                
                {ensemble.map((musician) => (
                    <div 
                        key={musician.id} 
                        className={`
                            flex
                            flex-col
                            gap-12
                            mt-24
                            ${musician.reverse ? "md:flex-row-reverse" : "md:flex-row"}
                        `}
                    >
                        {/*LEFT*/}
                        <div className='md:w-[38%] flex justify-end'>
                            <img
                            src={musician.image}
                            alt="Erinys Quartet"
                            className="
                                w-full
                                h-full
                                max-h-[460px]
                                rounded-xl
                                object-cover
                                shadow-xl
                                hover:scale-[1.01]
                                transition
                                duration-500
                                
                            "
                        />
                        </div>
                        {/*RIGHT*/}
                        <div className={`
                                md:w-[40%]
                                flex flex-col justify-center gap-8
                                ${musician.reverse ? "md:w-[60%]" : "md:w-[40%]"}
                            `}
                        >
                            <h3 className='text-4xl font-serif font-light'>{musician.name}</h3>
                            <p className='text-sm uppercase tracking-wider text-yellow-700'>{musician.instrument}</p>

                            <div className='w-full md:w-[40rem] flex flex-col gap-4'>
                                {musician.bio.map((paragraph, index) => (
                                    <p 
                                        key={index}
                                        className='text-[17px] leading-8'
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                                
                                <ul className='list-disc pl-5 text-neutral-700'>
                                    {musician.achievements.map((ach, index) => (
                                        <li key={index}
                                            className='mb-4'
                                        >
                                            {ach}
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>        
        </section>
    )
}