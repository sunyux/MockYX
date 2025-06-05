// components/HomePage.js
import React, { useState, useEffect } from 'react';
import { Code, Box, ChevronLeft, ChevronRight, Mountain,Amphora, Scissors, Palette,Snowflake, Move, ArrowBigDownDash} from 'lucide-react';


const HomePage = ({ setActiveSection }) => {
  const [currentHobby, setCurrentHobby] = useState(0);

  const hobbies = [
    {
      id: 1,
      title: "Climb",
      description: "Hanging on for dear life, one awkward grip at a time",
      image: "img/Climb.jpg",
      icon: <Mountain className="w-6 h-6" />,
      category: "Outdoor"
    },
    {
      id: 2,
      title: "Ceramics",
      description: "Making wobbly mugs that somehow hold coffee",
      image: "img/Ceramics.jpg",
      icon: <Amphora className="w-6 h-6" />,
      category: "Creative"
    },
    {
      id: 3,
      title: "Crochet",
      description: "Looping yarn into chaotic masterpieces of coziness",
      image: "img/Crochet.jpg",
      icon: <Scissors className="w-6 h-6" />,
      category: "Handcraft"
    },
    {
      id: 4,
      title: "Perlerbeads",
      description: "Turning tiny plastic dots into pixel art magic",
      image: "img/Perlerbeads.jpg",
      icon: <Palette className="w-6 h-6" />,
      category: "Nostalgia"
    },
    {
      id: 5,
      title: "Sking",
      description: "Falling down snowy hills in style",
      image: "img/Sking.jpg",
      icon: <Snowflake className="w-6 h-6" />,
      category: "Adventure"
    },
    {
      id: 6,
      title: "Waving",
      description: "Flowing, flipping, and freestyling with max flair",
      image: "img/Waving.jpg",
      icon: <Move className="w-6 h-6" />,
      category: "Performance"
    }
  ];

  

  // Auto-advance hobby carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHobby((prev) => (prev + 1) % hobbies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hobbies.length]);

  // Typewriter effect
  useEffect(() => {
    const bioText = "I'm a Computer Science master's student at Oregon State University, originally from China and now living in Portland. I have full-stack web development experience and a strong interest in UI design, deep learning, and computer vision. I'm also passionate about VR and gaming technologies. Outside of tech, I enjoy trying new hobbies and exploring creative and active pursuits.";
    
    let index = 0;
    let timeoutId;
    const typewriterElement = document.getElementById('typewriter-bio');
    const textContent = typewriterElement?.querySelector('.typewriter-text-content');
    const cursor = typewriterElement?.querySelector('.typewriter-cursor');
    
    if (!textContent) return;
    
    const typeCharacter = () => {
      if (index < bioText.length) {
        textContent.textContent = bioText.slice(0, index + 1);
        index++;
        timeoutId = setTimeout(typeCharacter, 50); // Normal speed
      } else {
        // Hide cursor after completion
        setTimeout(() => {
          if (cursor) cursor.style.display = 'none';
        }, 1000);
      }
    };
    
    const handleClick = () => {
      if (index < bioText.length) {
        clearTimeout(timeoutId);
        textContent.textContent = bioText;
        index = bioText.length;
        setTimeout(() => {
          if (cursor) cursor.style.display = 'none';
        }, 500);
      }
    };
    
    // Start typing after 500ms delay
    const startTimeout = setTimeout(typeCharacter, 500);
    
    if (typewriterElement) {
      typewriterElement.addEventListener('click', handleClick);
    }
    
    // Cleanup
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      if (typewriterElement) {
        typewriterElement.removeEventListener('click', handleClick);
      }
    };
  }, []); // Empty dependency array - runs once on mount

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
      {/* Hero Section */}
      <section 
  className="relative min-h-screen flex items-center justify-center overflow-hidden"
  style={{
    background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
    backgroundSize: '400% 400%',
    animation: 'gradient 8s ease infinite'
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/10"></div>
  
  <style jsx>{`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .animate-fade-in {
      animation: fadeIn 1s ease-in;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>

  <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
      <div className="w-1/4 h-1/4 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <img
          src="img/yuxin.jpg"
          alt="Professional headshot"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
      Hi I am Yuxin Sun
    </h1>
    <div className="typewriter-container">
      <div 
        id="typewriter-bio" 
        className="typewriter-text text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="typewriter-text-content"></span>
        <span className="typewriter-cursor">|</span>
      </div>
    </div>
    
    <button 
      onClick={() => setActiveSection('contact')}
      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
    >
      Get In Touch
    </button>
  </div>
  
  {/* Floating animation widget */}
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
    <ArrowBigDownDash className="w-8 h-8 text-white" />
  </div>
</section>x

      {/* Recent Hobbies Section with Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
            My Recent Hobbies
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            When I'm not coding, I love exploring new creative outlets and adventures. 
            Here's what I've been passionate about lately.
          </p>
          
          <div className="relative bg-gray-50 rounded-2xl p-8 shadow-xl">
            {/* Main Hobby Display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="relative">
                <div className="relative h-80 overflow-hidden rounded-xl shadow-lg">
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
                        <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {hobby.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevHobby}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={nextHobby}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-600 text-white p-3 rounded-lg">
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
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentHobby 
                          ? 'bg-purple-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Hobby Thumbnails */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {hobbies.map((hobby, index) => (
                <button
                  key={hobby.id}
                  onClick={() => goToHobby(index)}
                  className={`relative group overflow-hidden rounded-lg transition-all duration-300 ${
                    index === currentHobby 
                      ? 'ring-4 ring-purple-500 shadow-lg scale-105' 
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
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

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800">
            What I Do Technical
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    {
      icon: <Code className="w-12 h-12 text-purple-600" />,
      title: "Web Developer",
      desc: "Visit my personal website",
      url: "https://sunyux.github.io/yuxin/",
    },
    {
      icon: <Box className="w-12 h-12 text-purple-600" />,
      title: "3D Module Creator",
      desc: "Explore my 3D models gallery",
      url: "https://sunyux.github.io/ModelsGallery/",
    },
  ].map(({ icon, title, desc, url }, idx) => (
    <div
      key={idx}
      className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-700 hover:underline"
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