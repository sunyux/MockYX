// components/AboutPage.js
import React, { useEffect, useState } from 'react';
import { ExternalLink, ArrowRight, Globe } from 'lucide-react';

const AboutPage = () => {
  const [countdown, setCountdown] = useState(5);
  const redirectUrl = 'https://sunyux.github.io/yuxin/';

  useEffect(() => {
    // Automatically redirect after 5 seconds
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          window.location.href = redirectUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [redirectUrl]);

  const handleRedirectNow = () => {
    window.location.href = redirectUrl;
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Globe className="w-10 h-10 text-white" />
          </div>

          {/* Main Content */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
            About Me
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            You're being redirected to my personal portfolio website where you can learn more about my background, 
            skills, and projects.
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-2xl font-bold mb-4">
              {countdown}
            </div>
            <p className="text-gray-500">
              Redirecting automatically in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleRedirectNow}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-8 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <span>Visit My Portfolio Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 py-4 px-8 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* URL Display */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Redirecting to:</p>
            <p className="text-purple-600 font-mono text-sm break-all">
              {redirectUrl}
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-gray-500 text-sm">
          If the redirect doesn't work, please click the button above or copy the URL directly.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;