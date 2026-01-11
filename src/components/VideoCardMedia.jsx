import React, { useState } from "react";

function getYouTubeId(url) {
  // Works with your current embed URLs, plus youtu.be and watch?v=
  const m =
    url.match(/youtu\.be\/([^?&]+)/) ||
    url.match(/[?&]v=([^?&]+)/) ||
    url.match(/\/embed\/([^?&]+)/);
    console.log("URL:", url);
    console.log("match result (m):", m);
  return m?.[1] ?? null;
}

function VideoCardMedia({ video, showMeta= true, className="" }) {
  const [playing, setPlaying] = useState(false);
  const id = getYouTubeId(video.url);
  if (!id) return null;

  //i.ytimg.com/vi/HEREID/hqdefault.jpg IS STANDARD YOUTUBE THUMBNAIL ENDPOINT
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  // Keep your start=2 if it exists
  const startMatch = video.url.match(/[?&]start=(\d+)/);
  const start = startMatch ? `&start=${startMatch[1]}` : "";

  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1${start}`;

  return (
    <article className={className}>
       <div className="h-full overflow-hidden rounded-xl border border-black/10 bg-white/10 shadow-sm backdrop-blur flex flex-col">
        <div className="relative aspect-video">
          {!playing ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0"
              aria-label={`Play: ${video.title}`}
            >
              <img
                src={thumb}
                alt={video.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

              <div className="absolute inset-0 grid place-items-center">
                <div className="grid place-items-center h-16 w-16 rounded-full bg-white/90 shadow-md group-hover:scale-105 transition">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-[1px]">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          ) : (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedSrc}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {showMeta && (
          <div className="p-4 min-h-[72px]">
            <div className="text-sm font-semibold text-gray-900">
              {video.title}
            </div>
            {video.subtitle && (
              <div className="mt-1 text-sm text-gray-600">
                {video.subtitle}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default VideoCardMedia;