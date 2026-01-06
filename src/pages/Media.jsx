import React from 'react';
import photo1 from "../assets/1.png";
import photo2 from "../assets/2.png";
import photo3 from "../assets/3.jpg";
import photo4 from "../assets/HomeImage.png"
import photo5 from "../assets/_C0A6131.jpg"



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
    <main className="bg-white" data-nav-theme ="light">
      <div className="mx-auto max-w-6xl px-4 py-14">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-900">Media</h1>
        <p className="mt-2 text-sm text-gray-600">
          Videos, photos, recordings, and press material.
        </p>

        {/* VIDEOS */}
        <section className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900">Videos</h2>
              <div className="grid gap-8 lg:grid-cols-2">
                {videos.map((video) => (
                  <article key={video.id}>
                    <div className="aspect-video">
                      <iframe
                        className="h-full w-full rounded-xl"
                        src={video.url}
                        title={video.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-semibold text-gray-900">{video.title}</div>
                      {video.subtitle && ( 
                        <div className="mt-1 text-sm text-gray-600">{video.subtitle}</div>
                      )}
                      
                    </div>
                  </article>
                ))}
             </div>       
        </section>

        {/* PHOTOS */}
        {/* PHOTOS */}
        <section className="mt-16">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
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