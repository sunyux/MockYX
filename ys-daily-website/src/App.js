// App.js
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import HomePage from './components/HomePage';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';

const NAV = [
  { id: 'home', label: 'home' },
  { id: 'gallery', label: 'pics' },
  { id: 'contact', label: 'write me' },
  { id: 'about', label: 'more me' },
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage setActiveSection={setActiveSection} />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage setActiveSection={setActiveSection} />;
    }
  };

  const navClass = (active) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      active
        ? 'pride-nav-active'
        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
    }`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200/80 bg-[#fffef9]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <button
              type="button"
              onClick={() => setActiveSection('home')}
              className="text-left"
            >
              <h1 className="font-nabla text-2xl text-stone-800 leading-tight">
                Yuxin Sun Daily
              </h1>
              <p className="text-xs text-stone-500 -mt-0.5">
                portland · hobbies · random snaps
              </p>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {NAV.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  className={navClass(activeSection === id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="p-2 rounded-lg text-stone-600 hover:bg-stone-100"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#fffef9] px-3 py-2">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left ${navClass(activeSection === id)}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">{renderSection()}</main>

      <Footer setActiveSection={setActiveSection} />
    </div>
  );
};

export default App;
