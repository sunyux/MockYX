// components/AboutPage.js
import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const redirectUrl = 'https://sunyux.github.io/yuxin/';

  return (
    <div className="min-h-screen py-16 paper-section flex items-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <h2 className="font-display text-4xl text-stone-800 mb-4">the other site</h2>
        <p className="text-stone-600 mb-8 leading-relaxed">
          this page is my casual daily dump. my "serious" portfolio — projects, resume stuff —
          lives over here instead.
        </p>
        <a
          href={redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="connect-submit inline-flex w-auto px-8"
        >
          <span>open portfolio</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="mt-6 text-xs text-stone-400 font-mono break-all">{redirectUrl}</p>
        <a
          href={redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-4 text-sm text-stone-500 hover:text-stone-800"
        >
          new tab <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
