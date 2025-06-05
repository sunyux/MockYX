// components/GalleryPage.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Instagram,  Facebook, Play, Pause, Star } from 'lucide-react';

const GalleryPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your Instagram username - update this with your actual username
  const INSTAGRAM_USERNAME = 'sungulubb';

  const DiscordIcon = ({ className = "w-5 h-5" }) => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z" 
        fill="currentColor"
      />
    </svg>
  );

  // Mock Instagram API call - Replace with actual Instagram Basic Display API
  const fetchInstagramPosts = async () => {
    try {
 
      const mockData = [
        
        { 
          id: '2', 
          media_url: `${process.env.PUBLIC_URL}/img/Night.jpg`, 
          caption: 'Night at art center',
          timestamp: '2025-04-02T12:00:00Z'
        },
        { 
          id: '3', 
          media_url: `${process.env.PUBLIC_URL}/img/Cheery.jpg`, 
          caption: 'Cheery bloom',
          timestamp: '2024-03-03T12:00:00Z'
        },
        { 
          id: '4', 
          media_url: `${process.env.PUBLIC_URL}/img/Night2.jpg`, 
          caption: 'Night at art center',
          timestamp: '2025-04-02T12:00:00Z'
        },
      
      ];

      setInstagramPosts(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlay && instagramPosts.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % instagramPosts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, instagramPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % instagramPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + instagramPosts.length) % instagramPosts.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading Instagram posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800">Gallery</h2>
        <p className="text-center text-gray-600 mb-12">Explore my latest work and connect with me on social media</p>
        
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a 
            href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow @{INSTAGRAM_USERNAME}</span>
          </a>
          <a 
  href="https://discord.gg/c8r2AFqkDJ" // Replace with your Discord server invite
  target="_blank" 
  rel="noopener noreferrer" 
  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
>
  <DiscordIcon className="w-5 h-5" />
  <span>Discord</span>
</a>
          <a 
            href="https://www.facebook.com/sun.yuxin.107615" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Facebook className="w-5 h-5" />
            <span>Facebook</span>
          </a>
        </div>

        {/* LIVE INSTAGRAM FEED - SnapWidget Integration */}
        <div className="bg-white rounded-lg shadow-xl py-12 px-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Live Instagram Feed</h3>
            <div className="flex items-center space-x-2 text-green-600">
              <Star className="w-5 h-10" />
              <span className="text-sm font-medium">Auto-updating</span>
            </div>
          </div>

          {/* Your SnapWidget Embed */}
          <div className="snapwidget-container">
            <iframe 
              src="https://snapwidget.com/embed/1098676" 
              className="snapwidget-widget w-full rounded-lg" 
              allowTransparency="true" 
              frameBorder="0" 
              scrolling="no" 
              style={{
                border: 'none', 
                overflow: 'hidden', 
                width: '100%', 
                height: '510px',
                minHeight: '400px'
              }}
              title="Posts from Instagram"
            />
          </div>

        </div>

        
        <div className="bg-white rounded-lg shadow-xl p-12 mb-12 min-h-[500px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Featured Gallery</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isAutoPlay ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={fetchInstagramPosts}
                className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Refresh
              </button>
            </div>
          </div>
          
          <div className="relative">
            {/* Main Carousel */}
            <div className="relative h-96 overflow-hidden rounded-lg">
              {instagramPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                    index === currentSlide ? 'translate-x-0' : 
                    index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                  }`}
                >
                  <img
                    src={post.media_url}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-white text-sm">{post.caption}</p>
                    <p className="text-gray-300 text-xs mt-1">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {instagramPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, index) => (
              <button
                key={post.id}
                onClick={() => goToSlide(index)}
                className={`relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  index === currentSlide ? 'ring-4 ring-purple-500' : ''
                }`}
              >
                <img
                  src={post.media_url}
                  alt={post.caption}
                  className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;