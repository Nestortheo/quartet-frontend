import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import quartetImg from '../assets/_C0A6050-2.jpg'; // ✅ adjust path as needed
import aboutImg from '../assets/_C0A6131.jpg'
import UpcomingConcerts from "../components/UpcomingConcerts";
import { Instagram, Facebook, Mail } from "lucide-react";
import VideoCardMedia from '../components/VideoCardMedia';

const Home = () => {
  return (
    <main >
      {/*HERO IMAGE*/}
      <section
  data-nav-theme="dark"
  className="
    relative overflow-hidden bg-black
    h-[42vh] min-h-[280px] max-h-[520px]
    sm:h-[52vh] sm:min-h-[360px] sm:max-h-[600px]
    md:h-[60vh] md:min-h-[420px] md:max-h-[680px]
  "
>
  {/* Hero image */}
  <img
    src={quartetImg}
    alt="Erinys Quartet"
    className="h-full w-full object-cover object-center"
  />

  {/* subtle dark overlay */}
  <div className="absolute inset-0 bg-black/15" />

  {/* Title strip */}
  <div className="absolute inset-x-0 bottom-0">
    <div className="mx-auto max-w-6xl px-4 pb-[clamp(1rem,4vw,2rem)]">
      <div
        className="
          inline-flex max-w-[min(100%,36rem)] flex-col gap-2 rounded-xl
          bg-black/25 text-white backdrop-blur
          px-[clamp(1rem,3vw,1.5rem)]
          py-[clamp(0.75rem,2.5vw,1.25rem)]
        "
      >
        <h1 className="font-semibold leading-tight text-[clamp(1.4rem,4vw,1.9rem)]">
          Erinys Quartet
        </h1>

        <p className="text-white/85 text-[clamp(0.75rem,2.6vw,0.9rem)]">
          Vienna-based string quartet • Classical & contemporary repertoire
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-white/90 text-[clamp(0.8rem,2.5vw,0.95rem)]">
          <a
            href="https://www.instagram.com/erinysquartet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>

          <a
            href="https://facebook.com/erinysquartet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>

          <a
            href="mailto:erinys.stringquartet@gmail.com"
            className="hover:text-white transition"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>

          <span className="text-white/60">·</span>

          <Link
            to="/concerts"
            className="font-medium underline underline-offset-4 hover:text-white"
          >
            View concerts
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/*Mini Intro after HERO */}
      <div data-nav-theme="light" className="py-16 md:py-20">
        <section  className="mx-auto max-w-6xl px-4 ">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
            Vienna · String Quartet
          </p>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700">
            Erinys Quartet explores classical repertoire alongside contemporary works,
            shaping programs around contrast, dialogue, and sound identity.
          </p>

          <div className="mx-auto mt-18 h-px w-20 bg-black/10" />
        </section> 

        {/* UpcomingConcerts */}
        <section>
          <div className=" mx-auto max-w-6xl px-4 py-12 mt-12 md:mt-16">
            <UpcomingConcerts />
          </div>
        </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-16 md:grid-cols-2 items-stretch">
          {/* ABOUT */}
          <div className="flex flex-col h-full">
            {/* fixed-height intro block */}
            <div className="h-[140px]">
              <h2 className="text-2xl font-semibold text-gray-900">About the Quartet</h2>
              <p className="mt-4 text-gray-700">
                Erinys Quartet explores classical repertoire alongside contemporary works,
                shaping programs around contrast, dialogue, and sound identity.
              </p>
            </div>

            {/* card slot (same height as media) */}
            <div className="mt-8 h-[360px] overflow-hidden rounded-xl border border-black/10 bg-white/10 shadow-sm backdrop-blur">
              <div className="aspect-video">
                <img
                  src={aboutImg}
                  alt="Erinys Quartet"
                  className="h-full w-full object-cover block"
                />
              </div>

              {/* match VideoCardMedia meta spacing */}
              <div className="p-4 min-h-[72px]">
                <p className="text-sm font-semibold text-gray-900">Erinys Quartet</p>
                <p className="mt-1 text-sm text-gray-600">Vienna • String Quartet</p>
              </div>
            </div>

            <Link
              to="/about"
              className="mt-2 inline-block w-fit rounded-xl border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition"
            >
              Read more
            </Link>
          </div>

          {/* MEDIA */}
          <div className="flex flex-col h-full">
            {/* fixed-height intro block */}
            <div className="h-[140px]">
              <h2 className="text-2xl font-semibold text-gray-900">Our Media</h2>
              <p className="mt-4 text-gray-700">
                Listen to selected recordings and watch performances by Erinys Quartet,
                featuring works from the classical repertoire alongside contemporary music.
              </p>
            </div>

            {/* card slot (same height as about) */}
            <div className="mt-8 h-[360px]">
              <VideoCardMedia
                className="h-full"
                video={{
                  title: "Performance title",
                  subtitle: "Venue • City • Year",
                  url: "https://www.youtube.com/embed/RYanguk1JRk?start=2",
                }}
                showMeta={true}
              />
            </div>

            <Link
              to="/media"
              className="mt-2 inline-block w-fit rounded-xl border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition"
            >
              Explore media
            </Link>
          </div>
        </div>
      </section>
    </div>
  
  </main>
  )
};

export default Home;