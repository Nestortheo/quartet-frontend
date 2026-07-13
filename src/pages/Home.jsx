import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import quartetImg from '../assets/_C0A6050-2.jpg'; // ✅ adjust path as needed
import aboutImg from '../assets/_C0A6131.jpg'
import UpcomingConcerts from "../components/UpcomingConcerts";
import About_Media from '../components/About_Media';
import { Instagram, Facebook, Mail, Youtube } from "lucide-react";
import VideoCardMedia from '../components/VideoCardMedia';

import introImg from '../assets/introImg.png'
import instruments from '../assets/instruments.png'
import heroImg from '../assets/hero_img.png'
import mobileHero from '../assets/mobile_hero.png'

import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <main >
      {/*HERO IMAGE*/}
      <section
        data-nav-theme="dark"
        className="relative h-screen overflow-hidden bg-black"
      >
        {/* Desktop Hero Img*/}
        <img
          src={heroImg}
          alt="Erinys Quartet"
          className="
            hidden md:block
            absolute inset-0
            h-full w-full  
            object-cover
            object-[50%_60%] 
         "
        />
        {/*Mobile Hero Img */}
        <img 
          src={mobileHero}
          alt='Erinys Quartet'
          className='
            block md:hidden
            h-full w-full
            object-cover
            object-[50%_80%]
          '
        />

        {/* Gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black/30
            via-black/15
            to-transparent
          "
        />

        {/* Content */}
        <div className="relative z-10 h-full">
          <div
            className="
              mx-auto
              max-w-7xl
              h-full
              px-8
              lg:px-2
              flex
              items-center 
            "
          >
            <div className="-ml-[10vw] max-w-2xl translate-y-12  space-y-8">
              <p className="text-sm tracking-[0.2em] text-[#c49b63]">
                ERYNIS · STRING QUARTET
              </p>

              <div>
                <h1 className="font-serif text-3xl md:text-6xl text-white leading-none">
                  Timeless music,
                </h1>

                <div className="flex gap-2 font-serif text-3xl md:text-6xl leading-none">
                  <span className="text-white">in</span>

                  <span className="italic text-[#c49b63]">
                    dialogue
                  </span>

                  <span className="text-white">
                    with today.
                  </span>
                </div>
              </div>

              <div className="text-neutral-300 leading-relaxed text-lg">
                <p>Erinys Quartet brings classical depth and</p>
                <p>contemporary perspective together,</p>
                <p>shaping programs around contrast,</p>
                <p>connection, and sound identity.</p>
              </div>

              <Link
                to="/about"
                className="
                  inline-flex
                  items-center
                  gap-2

                  text-white
                  border-b
                  border-[#c49b63]

                  pb-1

                  hover:text-[#c49b63]
                  transition
                "
              >
                Learn more
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/*SOCIALS */}
        <div className="absolute left-33 bottom-10 z-20 hidden">
          <div className="flex items-center mt-10 gap-24">
              <div className='flex gap-6'>
                  <a
                    href='https://www.instagram.com/erinysquartet/'
                    target='_blank'
                    rel="noopener noreferrer"
                  >
                    <Instagram size={22} className='text-white'/>
                  </a>
                  <a
                    href='https://www.facebook.com/erinysquartet'
                    target='_blank'
                    rel="noopener noreferrer"
                  >
                    <Facebook size={22} className='text-white'/>
                  </a> 
                  <a
                    href='https://www.youtube.com/@erinysquartet'
                    target='_blank'
                    rel="noopener noreferrer"
                  >
                    <Youtube size={22} className='text-white'/>
                  </a>  
              </div>

              {/*Media*/}
              <Link
                to="/media"
                className="border-b border-[#c49b63] pb-1 text-white/90 hover:text-white"
              >
                Explore Media
              </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="
            absolute
            bottom-10
            left-1/2
            -translate-x-1/2

            flex
            flex-col
            items-center
            gap-3

            text-white/70
          "
        >
          <div className="h-10 w-px bg-white/40" />

          <span className="text-xs tracking-[0.3em]">
            SCROLL
          </span>
        </div>
      </section>

      {/*Desktop Bridge*/}
      <section className="hidden md:block relative overflow-hidden h-[380px] bg-[#eceae7]">
        <img
          src={instruments}
          alt=""
          className="
            
            absolute

            top-[-300px]
            right-[300px]
            
            w-[1400px]
            max-w-none
            blur-[1px]
            object-cover

            opacity-90

            pointer-events-none
            select-none

            [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
          "
        />

        <div className="
              relative z-10 mt-[-20px]
              h-full
              flex
              items-center
              justify-center
            ">
              <div className="text-center">
                <p className="font-serif text-4xl text-[#444]">
                  Rooted in
                  <span className="italic text-[#c49b63]">
                    {" "}tradition,
                  </span>
                </p>

                <p className="font-serif text-4xl text-[#444]">
                  moving with the
                  <span className="italic text-[#c49b63]">
                    {" "}present.
                  </span>
                </p>
              </div>
            </div>

          {/* Curved bottom */}
          <div
            className="
              absolute
              bottom-0
              left-0

              w-full
              h-12

              bg-[#eceae7]/70

              rounded-t-[100%]
            "
          />
      </section>
      
      {/*INTRO SECTION FOR MOBILE*/}
      <section className="relative overflow-hidden mx-auto max-w-6xl px-4 py-16">
 
        {/*Intro mobile background img*/}
        <img
          src={introImg}
          alt=""
          className="
            block md:hidden
            absolute
            right-[-250px]
            top-1/2
            -translate-y-1/2

            w-[1050px]
            max-w-none

            opacity-45
            [mask-image:linear-gradient(to_right,transparent,black_30%,80%,transparent)]
            

            pointer-events-none
            select-none
          "
        />

      
        {/* Content for Mobile */}
        <div className="block md:hidden relative z-10 flex items-center justify-center pt-10">
          <div className="space-y-8">

            <p className="text-sm tracking-wider text-[#c49b63]">
              ERINYS · STRING QUARTET
            </p>

            <div className='h-px w-10 border border-yellow-700'/>

            <div className="font-serif leading-none">
              <h2 className="text-5xl">
                Timeless
              </h2>

              <h2 className="text-5xl italic text-[#c49b63]">
                music,
              </h2>

              <div className="flex flex-col">

                <div className='flex gap-2'>
                  <span className="text-5xl">in</span>

                  <span className="text-5xl ">
                    dialogue
                  </span>
                </div>
                
                <div>
                  <span className="text-5xl italic text-[#c49b63]">
                    with today
                  </span>
                  <span className='text-5xl'>.</span>
                </div>
              </div>
            </div>

            <div className="text-neutral-700 leading-relaxed">
              <p>Erinys Quartet brings classical depth and</p>
              <p>contemporary perspective together,</p>
              <p>shaping programs around contrast,</p>
              <p>connection, and sound identity.</p>
            </div>

            <Link
              to="/about"
              className="
                inline-flex
                items-center
                gap-2
                border-b-2
                border-[#c49b63]
                pb-1
                text-sm
                font-semibold
                text-gray-900
              "
            >
              Learn more
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </section>

        {/* UpcomingConcerts */}
      <section>
        <div className=" mx-auto max-w-6xl px-4 py-12 mt-12 md:mt-16">
          <UpcomingConcerts />
        </div>
      </section>

      {/*About&Media*/}
      <section className='mx-auto max-w-6xl px-4 py-12'>
        <About_Media />
       </section>

      
    
  
  </main>
  )
};

export default Home;