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
  ArrowBigDownDash,
} from 'lucide-react';
import Typewriter from './Typewriter';

const BIO_TEXT =
  "I'm a Computer Science master's student at Oregon State University, originally from China and now living in Portland. I have full-stack web development experience and a strong interest in UI design, deep learning, and computer vision. I'm also passionate about VR and gaming technologies. Outside of tech, I enjoy trying new hobbies and exploring creative and active pursuits.";

const ROTATING_PHRASES = [
  'Full-Stack Developer',
  'UI & Design Enthusiast',
  'Deep Learning Explorer',
  'Creative Hobby Collector',
  'Proud to be me 🏳️‍🌈',
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
    }, 5000);
    return () => clearInterval(interval);
  }, [hobbies.length]);

  const nextHobby = () => {
    setCurrentHobby((prev) => (prev + 1) % hobbies.length);
  };

  const prevHobby = () => {
    setCurrentHobby((prev) => (prev - 1 + hobbies.length) % hobbies.length);
  };

  const goToHobby = (index) => {
    setCurrentHobby(index);
  };

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pride-gradient-bg">
        <div className="pride-confetti" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full pride-ring shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img
                  src={`${process.env.PUBLIC_URL}/img/yuxin.jpg`}
                  alt="Professional headshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in drop-shadow-lg">
            Hi, I am{' '}
            <span className="pride-gradient-text inline-block">
              Yuxin Sun
            </span>
          </h1>

          <p className="text-xl sm:text-2xl mb-6 min-h-[2.5rem] font-medium text-white/95">
            <Typewriter
              phrases={ROTATING_PHRASES}
              speed={70}
              deleteSpeed={40}
              pauseAfterType={2200}
              cursorClassName="typewriter-cursor-pride"
              className="inline-block"
            />
          </p>

          <div className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90 bg-black/25 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/20 shadow-xl">
            <Typewriter
              text={BIO_TEXT}
              speed={28}
              startDelay={800}
              cursorClassName="typewriter-cursor-pride"
              className="text-left block"
            />
          </div>

          <button
            onClick={() => setActiveSection('contact')}
            className="pride-btn text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
          >
            Get In Touch
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowBigDownDash className="w-8 h-8 text-white drop-shadow" />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            <span className="pride-gradient-text">My Recent Hobbies</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            When I'm not coding, I love exploring new creative outlets and adventures.
            Here's what I've been passionate about lately.
          </p>

          <div className="relative bg-gray-50 rounded-2xl p-8 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 pride-stripe-bar" aria-hidden="true" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-2">
              <div className="relative">
                <div className="relative h-80 overflow-hidden rounded-xl shadow-lg ring-2 ring-transparent hover:ring-offset-2 transition-all">
                  {hobbies.map((hobby, index) => (
                    <div
                      key={hobby.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentHobby
                          ? 'opacity-100 transform translate-x-0'
                          : 'opacity-0 transform translate-x-full'
                      }`}
                    >
                      <img
                        src={hobby.image}
                        alt={hobby.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {hobby.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={prevHobby}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
                  aria-label="Previous hobby"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={nextHobby}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
                  aria-label="Next hobby"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="pride-icon-bg text-white p-3 rounded-lg shadow-md">
                    {hobbies[currentHobby].icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {hobbies[currentHobby].title}
                  </h3>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {hobbies[currentHobby].description}
                </p>

                <div className="flex space-x-2">
                  {hobbies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToHobby(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === currentHobby
                          ? 'pride-dot-active w-8'
                          : 'bg-gray-300 hover:bg-gray-400 w-3'
                      }`}
                      aria-label={`Go to hobby ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {hobbies.map((hobby, index) => (
                <button
                  key={hobby.id}
                  onClick={() => goToHobby(index)}
                  className={`relative group overflow-hidden rounded-lg transition-all duration-300 ${
                    index === currentHobby
                      ? 'ring-4 ring-[#750787] shadow-lg scale-105'
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {hobby.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <p className="text-white text-xs font-medium truncate">
                      {hobby.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="pride-gradient-text">What I Do Technical</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                icon: <Code className="w-12 h-12" />,
                title: 'Web Developer',
                desc: 'Visit my personal website',
                url: 'https://sunyux.github.io/yuxin/',
              },
              {
                icon: <Box className="w-12 h-12" />,
                title: '3D Module Creator',
                desc: 'Explore my 3D models gallery',
                url: 'https://sunyux.github.io/ModelsGallery/',
              },
            ].map(({ icon, title, desc, url }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border-t-4 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 pride-stripe-bar" />
                <div className="mb-4 mt-2 pride-gradient-text">{icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pride-gradient-text font-medium hover:underline"
                >
                  {desc}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
