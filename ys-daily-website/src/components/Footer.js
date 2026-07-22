// components/Footer.js
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

const FOOTER_NAV = [
  { id: 'home', label: 'home' },
  { id: 'gallery', label: 'pics' },
  { id: 'contact', label: 'write me' },
  { id: 'about', label: 'more me' },
];

const Footer = ({ setActiveSection }) => {
  return (
    <footer className="bg-stone-800 text-stone-300 py-10 relative">
      <div className="absolute top-0 left-0 right-0 pride-stripe-bar" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl text-[#fffef9] mb-3">reach me</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                sunyux411@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (971) 997-9763
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Portland, Oregon
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl text-[#fffef9] mb-3">around here</h3>
            <div className="space-y-1">
              {FOOTER_NAV.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  className="block text-sm hover:text-[#ffed00] transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl text-[#fffef9] mb-3">socials</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/sungulubb"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffed00] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/yuxin-sun-54ab4b325/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffed00] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/sun.yuxin.107615"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffed00] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://discord.gg/c8r2AFqkDJ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffed00] transition-colors"
                aria-label="Discord"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-600 mt-8 pt-6 text-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} yuxin — made for friends, not recruiters.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
