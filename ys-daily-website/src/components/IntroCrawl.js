import React, { useState, useRef } from 'react';
import { Pause, Play, SkipForward } from 'lucide-react';

/**
 * Star Wars–style intro crawl — slower & readable.
 * Click: pause / resume. "Skip" or second click when paused: static full text.
 */
const IntroCrawl = ({ text, title = 'A long time ago in Portland…' }) => {
  const [mode, setMode] = useState('crawl'); // crawl | paused | done
  const [replayKey, setReplayKey] = useState(0);
  const crawlRef = useRef(null);

  const handleCrawlClick = () => {
    if (mode === 'done') return;
    if (mode === 'crawl') setMode('paused');
    else if (mode === 'paused') setMode('crawl');
  };

  const skipToDone = (e) => {
    e?.stopPropagation();
    setMode('done');
  };

  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  if (mode === 'done') {
    return (
      <div className="crawl-static-box">
        <p className="crawl-static-label">about me</p>
        {paragraphs.map((para, i) => (
          <p key={i} className="crawl-static-text">
            {para}
          </p>
        ))}
        <button
          type="button"
          className="crawl-replay-btn"
          onClick={() => {
            setReplayKey((k) => k + 1);
            setMode('crawl');
          }}
        >
          replay crawl
        </button>
      </div>
    );
  }

  return (
    <div className="crawl-wrapper">
      <div className="crawl-controls">
        <button
          type="button"
          className="crawl-control-btn"
          onClick={handleCrawlClick}
          aria-label={mode === 'paused' ? 'Resume crawl' : 'Pause crawl'}
        >
          {mode === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          <span>{mode === 'paused' ? 'play' : 'pause'}</span>
        </button>
        <button type="button" className="crawl-control-btn" onClick={skipToDone}>
          <SkipForward className="w-3.5 h-3.5" />
          <span>skip — read now</span>
        </button>
      </div>

      <p className="crawl-hint">
        {mode === 'paused'
          ? 'paused — click play to continue, or skip to read normally'
          : 'click the crawl to pause · skip when you\'re ready'}
      </p>

      <div
        className={`crawl-scene ${mode === 'paused' ? 'crawl-scene-paused' : ''}`}
        onClick={handleCrawlClick}
        onKeyDown={(e) => e.key === 'Enter' && handleCrawlClick()}
        role="button"
        tabIndex={0}
        aria-label="Intro crawl. Click to pause or resume."
      >
        <div
          ref={crawlRef}
          key={replayKey}
          className={`crawl-content ${mode !== 'done' ? 'crawl-content-animate' : ''}`}
          onAnimationEnd={() => {
            if (mode === 'crawl') setMode('done');
          }}
        >
          <p className="crawl-episode">{title}</p>
          {paragraphs.map((para, i) => (
            <p key={i} className="crawl-paragraph">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroCrawl;
