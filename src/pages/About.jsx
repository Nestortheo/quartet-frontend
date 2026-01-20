import React from 'react';
import aboutBanner from '../assets/1.png'
import Stergios from '../assets/StergiosTheodoridis-(11of11).webp'
import Maria from '../assets/MarijaRaisanen1-(5of8).webp'
import Jooseph from '../assets/JoosepReimaa-(2of8).webp'
import Lizie from '../assets/IMG_0026+(1).webp'

const members = [
  {name: "Elizabeth Stewart", instrument: "Violin", image: Lizie},
  {name: "Joosep Reimaa", instrument: "Violin", image: Jooseph},
  {name: "Marija Räisänen", instrument: "Viola", image: Maria},
  {name: "Stergios Theodoridis", instrument: "Cello", image: Stergios},
]

const About = () => {
  return (
    <main data-nav-theme>
      <section className="
          relative overflow-hidden bg-black
          h-[42vh] min-h-[280px] max-h-[520px]
          sm:h-[52vh] sm:min-h-[360px] sm:max-h-[600px]
          md:h-[60vh] md:min-h-[420px] md:max-h-[680px]
        ">
        <img
          src={aboutBanner}
          alt="Erinys Quartet"
          className="h-full w-full object-cover"
        />

        {/* Optional subtle overlay */}
        <div className="absolute inset-0" />

        {/* Title */}
        <div className="absolute bottom-6 left-6 text-white/85">
          <h1 className="text-3xl font-semibold">About the Quartet</h1>
        </div>
      </section>

      <section className='py-16 md:py-20'>
        <div className="mx-auto max-w-6xl">
          <h2 className='mb-12 text-center text-2xl font-semibold text-gray-900'>
            The Ensemble
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <div key={member.name} className="text-center">
              <img
                src = {member.image}
                alt={member.name}
                className="mx-auto aspect-[2/3] w-full sm:max-w-[260px] lg:max-w-[350px] rounded-xl object-cover"
              />
              <p className='mt-4 text-sm font-medium text-gray-900'>{member.name}</p>
              <p className='text-sm text-gray-600'>{member.instrument}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 space-y-6 text-gray-700 leading-relaxed">
              <p>
              Named for the Erinyes (a.k.a. the Furies) from the Greek tragedy
              <em> Oresteia</em> by Aeschylus, and with roots in Estonia, Lithuania,
              Greece, the United States and Finland, the Erinys Quartet was founded
              in 2018 at the Sibelius Academy in Helsinki where they worked closely
              with cellist Marko Ylönen.
            </p>

            <p>
              Since Autumn 2025 Erinys has been the graduate string quartet-in-residence
              at Indiana University Jacobs School of Music in Bloomington, IN (USA).
            </p>

            <p>
              At the Bad Tölz International String Quartet Competition in 2023 they were
              awarded the Audience Prize Award of the City of Bad Tölz, as well as the
              Esterházy Foundation Special Prize for best interpretation of a Haydn
              string quartet. They also won the Bronze Medal at the 2024 Fischoff
              Chamber Music Competition.
            </p>

            <p>
              Since 2021 Erinys Quartet has been supported by Le Dimore del Quartetto
              where they are also a part of the European Union-sponsored MERITA platform.
            </p>

            <p>
              In the 2025–26 season the Erinys Quartet will present concerts throughout
              the United States and Europe, including debuts at the Philadelphia Chamber
              Music Society and the Lucerne Festival in Switzerland. They will also be
              giving concerts around the United States as part of Curtis on Tour
              performing with pianist Michelle Cann, violist Roberto Díaz, and cellist
              Peter Wiley.
            </p>

            <p>
              In addition to their studies at Indiana University with the Pacifica
              Quartet, Erinys holds a diploma in string quartet from the Curtis Institute
              of Music where they studied with the Dover Quartet, and they are pursuing
              a diploma in chamber music at Escuela Superior de Música Reina Sofía in
              Madrid, Spain under the tutelage of Professor Günter Pichler of the Alban
              Berg Quartet.
            </p>
          </div>
      </section>
    </main>
    
    
  );
};

export default About;