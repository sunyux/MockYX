// components/HomePage.js
import React, { useState, useEffect } from 'react';
import {
  Code,
  Box,
  ChevronLeft,
  ChevronRight,
  Mountain,
  Amphora,
  Scissors,
  Palette,
  Snowflake,
  Move,
  ArrowDown,
} from 'lucide-react';
import Typewriter from './Typewriter';
import UserConnect from './UserConnect';

const BIO_TEXT =
  "CS master's at Oregon State — from China, living in Portland now. I build websites, mess with UI, and geek out on deep learning + VR. When I'm off the laptop I'm usually trying a new hobby (climb, crochet, ceramics… the list keeps growing).";

const ROTATING_PHRASES = [
  'probably drinking boba',
  'learning something new again',
  'portland + code + crafts',
  'proud & here 🏳️‍🌈',
];

const HomePage = ({ setActiveSection }) => {
  const [currentHobby, setCurrentHobby] = useState(0);

  const hobbies = [
    {
      id: 1,
      title: 'Climb',
      description: 'Hanging on for dear life, one awkward grip at a time',
      image: `${process.env.PUBLIC_URL}/img/Climb.jpg`,
      icon: <Mountain className="w-6 h-6" />,
      category: 'Outdoor',
    },
    {
      id: 2,
      title: 'Ceramics',
      description: 'Making wobbly mugs that somehow hold coffee',
      image: `${process.env.PUBLIC_URL}/img/Ceramics.jpg`,
      icon: <Amphora className="w-6 h-6" />,
      category: 'Creative',
    },
    {
      id: 3,
      title: 'Crochet',
      description: 'Looping yarn into chaotic masterpieces of coziness',
      image: `${process.env.PUBLIC_URL}/img/Crochet.jpg`,
      icon: <Scissors className="w-6 h-6" />,
      category: 'Handcraft',
    },
    {
      id: 4,
      title: 'Perlerbeads',
      description: 'Turning tiny plastic dots into pixel art magic',
      image: `${process.env.PUBLIC_URL}/img/Perlerbeads.jpg`,
      icon: <Palette className="w-6 h-6" />,
      category: 'Nostalgia',
    },
    {
      id: 5,
      title: 'Sking',
      description: 'Falling down snowy hills in style',
      image: `${process.env.PUBLIC_URL}/img/Sking.jpg`,
      icon: <Snowflake className="w-6 h-6" />,
      category: 'Adventure',
    },
    {
      id: 6,
      title: 'Waving',
      description: 'Flowing, flipping, and freestyling with max flair',
      image: `${process.env.PUBLIC_URL}/img/Waving.jpg`,
      icon: <Move className="w-6 h-6" />,
      category: 'Performance',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHobby((prev) => (prev + 1) % hobbies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [hobbies.length]);

  const nextHobby = () => setCurrentHobby((prev) => (prev + 1) % hobbies.length);
  const prevHobby = () =>
    setCurrentHobby((prev) => (prev - 1 + hobbies.length) % hobbies.length);
  const goToHobby = (index) => setCurrentHobby(index);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pride-gradient-bg">
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full pride-ring">
              <div className="w-full h-full rounded-full overflow-hidden bg-stone-900">
                <img
                  src={`${process.env.PUBLIC_URL}/img/yuxin.jpg`}
                  alt="Yuxin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <p className="text-sm uppercase tracking-[0.2em] text-white/70 mb-2">
            hey, i'm
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mb-3 animate-fade-in">
            yuxin sun
          </h1>

          <p className="text-lg sm:text-xl mb-6 min-h-[2rem] text-white/90 italic">
            <Typewriter
              phrases={ROTATING_PHRASES}
              speed={75}
              deleteSpeed={45}
              pauseAfterType={2800}
              cursorClassName="typewriter-cursor-pride"
            />
          </p>

          <div className="hero-note-card text-left text-base sm:text-lg leading-relaxed text-white/95 px-5 py-4 mb-8">
            <Typewriter
              text={BIO_TEXT}
              speed={32}
              startDelay={600}
              cursorClassName="typewriter-cursor-pride"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setActiveSection('contact')}
              className="pride-btn px-7 py-3 rounded-xl text-base font-medium"
            >
              write me a note
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById('connect-wall')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-7 py-3 rounded-xl text-base font-medium border border-white/40 text-white hover:bg-white/10 transition-colors"
            >
              say hi on the wall
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-pulse">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      <section id="connect-wall" className="paper-section border-t border-stone-200">
        <div className="pride-accent-line mt-10" />
        <UserConnect />
      </section>

      <section className="py-16 sm:py-20 paper-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl text-center text-stone-800 mb-2">
            stuff i've been into
          </h2>
          <p className="text-center text-stone-500 mb-10 max-w-md mx-auto text-sm">
            not a portfolio pitch — just hobbies i'm actually doing right now.
          </p>

          <div className="bg-[#fffef9] rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 pride-stripe-bar" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-3">
              <div className="relative">
                <div className="relative h-72 sm:h-80 overflow-hidden rounded-xl border border-stone-200">
                  {hobbies.map((hobby, index) => (
                    <div
                      key={hobby.id}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === currentHobby
                          ? 'opacity-100'
                          : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={hobby.image}
                        alt={hobby.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#fffef9]/90 text-stone-700 px-2.5 py-1 rounded-md text-xs">
                        {hobby.category}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={prevHobby}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#fffef9]/90 p-2 rounded-full border border-stone-200"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextHobby}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#fffef9]/90 p-2 rounded-full border border-stone-200"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-stone-700">{hobbies[currentHobby].icon}</span>
                  <h3 className="font-display text-3xl text-stone-800">
                    {hobbies[currentHobby].title}
                  </h3>
                </div>
                <p className="text-stone-600 leading-relaxed mb-4">
                  {hobbies[currentHobby].description}
                </p>
                <div className="flex gap-2">
                  {hobbies.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToHobby(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentHobby
                          ? 'pride-dot-active w-7'
                          : 'bg-stone-300 w-2 hover:bg-stone-400'
                      }`}
                      aria-label={`Hobby ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2">
              {hobbies.map((hobby, index) => (
                <button
                  key={hobby.id}
                  type="button"
                  onClick={() => goToHobby(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentHobby
                      ? 'border-stone-800 scale-[1.02]'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-full h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-stone-200 bg-[#f5f1ea]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-stone-800 mb-8">elsewhere on the internet</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Code className="w-8 h-8 mx-auto" />,
                title: 'dev site',
                url: 'https://sunyux.github.io/yuxin/',
              },
              {
                icon: <Box className="w-8 h-8 mx-auto" />,
                title: '3d models',
                url: 'https://sunyux.github.io/ModelsGallery/',
              },
            ].map(({ icon, title, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-[#fffef9] rounded-xl border border-stone-200 hover:border-stone-400 transition-colors"
              >
                <div className="text-stone-600 mb-2">{icon}</div>
                <span className="font-medium text-stone-800">{title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
