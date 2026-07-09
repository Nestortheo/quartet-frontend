
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import photo1 from "../assets/1.png";
import photo2 from "../assets/2.png";
import photo3 from "../assets/3.jpg";
import photo4 from "../assets/HomeImage.png"
import photo5 from "../assets/_C0A6131.jpg"
import mediaHero from "../assets/3.jpg"; // adjust path
import VideoCardMedia from "../components/VideoCardMedia";

const videos = [
    {id:1, title:"Janácek - Cuarteto de cuerda no. 2 'Cartas íntimas'", subtitle:"Madrid", url:"https://www.youtube.com/embed/RYanguk1JRk?start=2"},
    {id:2, title:"Bela Bartók: String Quartet No. 3, Sz. 85", subtitle:"", url:"https://www.youtube.com/embed/AqIV95zGFyg?start=2"},
    {id:3, title:"George Crumb: Black Angels", subtitle:"Gould Rehearsal Hall", url:"https://www.youtube.com/embed/_n5rUpyp3Eo?list=PL6bUhxrsclHfgowkZRfvXqeWtx-NFq5Vj&start=2"},
    {id:4, title:"George Crumb: Black Angels", subtitle:"Gould Rehearsal Hall", url:"https://www.youtube.com/embed/_n5rUpyp3Eo?list=PL6bUhxrsclHfgowkZRfvXqeWtx-NFq5Vj&start=2"},
    {id:5, title:"Bela Bartók: String Quartet No. 3, Sz. 85", subtitle:"", url:"https://www.youtube.com/embed/AqIV95zGFyg?start=2"},
]
const photos = [
  { id: 1, src: photo1, alt: "Erinys Quartet – Vienna" },
  { id: 2, src: photo2, alt: "Rehearsal" },
  { id: 3, src: photo3, alt: "Concert hall" },
  { id: 4, src: photo4, alt: "Portrait" },
  { id: 5, src: photo5, alt: "Backstage" },
  { id: 6, src: photo1, alt: "Erinys Quartet – Vienna" },
  { id: 7, src: photo2, alt: "Rehearsal" },
  { id: 8, src: photo3, alt: "Concert hall" },
  { id: 9, src: photo4, alt: "Portrait" },
  { id: 10, src: photo5, alt: "Backstage" },
];

export default function MediaRemake(){

    const [showAllVideos, setShowAllVideos] = useState(false);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const displayVideos = 
        showAllVideos ? videos : videos.slice(0,3)

    const displayPhotos = 
        showAllPhotos ? photos : photos.slice(0,5)


   const nextPhoto = () =>{
        setSelectedPhoto(prev => {
            if (prev === photos.length - 1) {
                return 0;
            }

            return prev + 1;
        });
   }

    const prevPhoto = () =>{
        setSelectedPhoto(prev => {
            if (prev === 0) {
                return photos.length - 1
            }

            return prev - 1;
        });
   }

   //Disable Scrolling when on Gallery
   useEffect(() => {
        if (selectedPhoto !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedPhoto]);

    //Keyboard interaction with Gallery
    useEffect(() => {

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedPhoto(null);
            }

            if (e.key === "ArrowRight") {
                nextPhoto();
            }

            if (e.key === "ArrowLeft") {
                prevPhoto();
            }
        };

        if(selectedPhoto  !==null){
            document.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }


    },[selectedPhoto])

    return(
        <main className="mt-24">
            <section className="relative h-[35vh] overflow-hidden">
                <img 
                    src={mediaHero}
                    alt="Erinys Quartet"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <p className="mb-3 text-5xl uppercase tracking-[0.3em] text-[#D9A474]">MEDIA</p>
                        <div className="w-20 h-px bg-[#D9A474]"/>
                        <p className="text-lg text-[#D8CDC0] max-w-2xl leading-relaxed text-center"
                        >
                            Videos, photos, recordings and press material.</p>
                    </div>
                </div>
            </section>

            {/*VIDEOS*/}
            <section className="p-8 mt-12 max-w-7xl mx-auto flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-sm text-yellow-700 font-semibold tracking-[0.2em]">FEATURED VIDEOS</h2>
                    {/*Desktop Button*/}
                    {videos.length > 3 && (
                    <button
                            type="button"
                            onClick={() => setShowAllVideos((prev) => !prev)}
                             className="
                                hidden
                                md:flex
                                items-center
                                gap-2
                                text-yellow-700
                                cursor-pointer
                            "
                        >   
                            
                            <p>
                                {showAllVideos ? "Show less" : "View all videos"}
                            </p>
                            <ArrowRight size={22}/>
                          
                        </button>
                    )}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {displayVideos.map((video) => (
                        <VideoCardMedia 
                            key={video.id}
                            video={video} 
                        />
                    ))}
                </div>
                {/*Mobile Button*/}
                {videos.length > 3 && (
                <button
                        type="button"
                        onClick={() => setShowAllVideos((prev) => !prev)}
                        className="
                            flex
                            md:hidden
                            self-center
                            items-center
                            gap-2
                            text-yellow-700
                            cursor-pointer
                            "
                    >   
                        
                        <p>
                            {showAllVideos ? "Show less" : "View all videos"}
                        </p>
                        <ArrowRight size={22}/>
                        
                    </button>
                )}
            </section>    
            
            {/*Photos*/}
            <section className="p-8 mt-12 max-w-7xl mx-auto flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-sm text-yellow-700 font-semibold tracking-[0.2em]">PHOTO GALLERY</h2>
                    {/*Desktop*/}
                    {photos.length > 5 && (
                        <button
                            type="button"
                            onClick={() => setShowAllPhotos((prev) => !prev)}
                            className="
                                hidden
                                md:flex
                                items-center
                                gap-2
                                text-yellow-700
                                cursor-pointer
                            "
                        >
                            <p>{showAllPhotos ? "Show less" : "View all photos"}</p>
                            <ArrowRight size={22} />
                            
                        </button>
                    )}
                </div>
                <div className="grid md:grid-cols-5 gap-4">
                    {displayPhotos.map((photo,index) => (
                        <div
                            key={photo.id}
                            className="
                                relative
                                aspect-[5/5]
                                overflow-hidden
                                rounded-xl
                                cursor-pointer
                            "
                            onClick={() => setSelectedPhoto(index)}
                            
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                    transition
                                    duration-500
                                    hover:scale-105
                                    
                                "
                            />
                    </div>
                    ))}
                </div>
                 {/*Mobile*/}
                    {photos.length > 5 && (
                        <button
                            type="button"
                            onClick={() => setShowAllPhotos((prev) => !prev)}
                            className="
                                flex
                                md:hidden
                                items-center
                                gap-2
                                text-yellow-700
                                cursor-pointer
                            "
                        >
                            <p>{showAllPhotos ? "Show less" : "View all photos"}</p>
                            <ArrowRight size={22} />
                            
                        </button>
                    )}

            </section>

            {/* Gallery */}
            {selectedPhoto !== null && (
                <div className="
                    fixed
                    inset-0
                    bg-black/80
                    z-50
                    flex
                    items-center
                    justify-center
                "
                onClick={() => setSelectedPhoto(null)}
                
                
                >
                {/* <- PREV image */}
                    <button
                        type="button"
                        className="mr-8"
                         onClick={(e) => {
                            e.stopPropagation();
                            prevPhoto();
                        }}
                        >
                        <ArrowLeft size={22} className="cursor-pointer text-white"/>
                    </button>

                    <div 
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={photos[selectedPhoto].src}
                            alt={photos[selectedPhoto].alt}
                            className="max-h-[60vh] max-w-[90vw] object-contain"
                        />
                        {/* X close button top right */}
                         <button
                            type="button"
                            className="
                                absolute
                                top-4
                                right-4
                            "
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X size={32} className="cursor-pointer text-white"/>
                        </button>
                    </div>
                    {/* -> NEXT image */}
                    <button
                        type="button"
                        className="ml-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            nextPhoto();
                        }}
                    >
                        <ArrowRight size={22} className="cursor-pointer text-white"/>
                    </button>
                </div>
            )}

        </main>    
    )
}