import React, { useState } from "react";
import photo1 from "../assets/1.png";
import photo2 from "../assets/2.png";
import photo3 from "../assets/3.jpg";
import photo4 from "../assets/HomeImage.png"
import photo5 from "../assets/_C0A6131.jpg"
import mediaHero from "../assets/3.jpg"; // adjust path
import VideoCardMedia from "../components/VideoCardMedia";


const Media = () => {

  const videos = [
    {id:1, title:"Janácek - Cuarteto de cuerda no. 2 'Cartas íntimas'", subtitle:"Madrid", url:"https://www.youtube.com/embed/RYanguk1JRk?start=2"},
    {id:2, title:"Bela Bartók: String Quartet No. 3, Sz. 85", subtitle:"", url:"https://www.youtube.com/embed/AqIV95zGFyg?start=2"},
    {id:3, title:"George Crumb: Black Angels", subtitle:"Gould Rehearsal Hall", url:"https://www.youtube.com/embed/_n5rUpyp3Eo?list=PL6bUhxrsclHfgowkZRfvXqeWtx-NFq5Vj&start=2"},
  ]
  const photos = [
  { id: 1, src: photo1, alt: "Erinys Quartet – Vienna" },
  { id: 2, src: photo2, alt: "Rehearsal" },
  { id: 3, src: photo3, alt: "Concert hall" },
  { id: 4, src: photo4, alt: "Portrait" },
  { id: 5, src: photo5, alt: "Backstage" },
];

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/*Hero Image */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-black/5">
          <img
            src={mediaHero}
            alt="Erinys Quartet — Media"
            className="h-44 w-full object-cover md:h-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Media
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Videos, photos, recordings, and press material.
              </p>
            </div>
          </div>
        </section>

        {/* VIDEOS */}
        <section className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-900">Videos</h2>
              <div className="grid gap-8 lg:grid-cols-2">
              {videos.map((video) => (
                <VideoCardMedia key={video.id} video={video} />
              ))}
             </div>       
        </section>

        {/* PHOTOS */}
        {/* PHOTOS */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-gray-900">Photos</h2>
            <p className="mt-1 text-sm text-gray-600">
              Selected images from concerts and sessions.
            </p>
          </div>

          <div className="relative">
            <div className="flex gap-1 overflow-x-auto pb-4 snap-x snap-mandatory">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="snap-start shrink-0"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-64 w-auto rounded-xl object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

        
    </main>
  );
};

export default Media;