import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const SIZE = 140;
const SPEED = 1.1;
const BOTTOM = 16;
const DESKTOP_CAT_URL = 'https://github.com/sunyux/DesktopCat';
const INTRO_KEY = 'julie-intro-seen';

const ANIM = {
  idle: `${process.env.PUBLIC_URL}/img/cat/idle.gif`,
  walkingLeft: `${process.env.PUBLIC_URL}/img/cat/running-left.gif`,
  walkingRight: `${process.env.PUBLIC_URL}/img/cat/running-right.gif`,
  waving: `${process.env.PUBLIC_URL}/img/cat/waving.gif`,
  jumping: `${process.env.PUBLIC_URL}/img/cat/jumping.gif`,
  belly: `${process.env.PUBLIC_URL}/img/cat/belly.gif`,
  waiting: `${process.env.PUBLIC_URL}/img/cat/waiting.gif`,
  review: `${process.env.PUBLIC_URL}/img/cat/review.gif`,
  working: `${process.env.PUBLIC_URL}/img/cat/running.gif`,
};

/**
 * Web port of Julie from DesktopCat (sunyux/DesktopCat).
 * Pet only — no to-do / Pomodoro. Reacts to mouse + walks around.
 */
const DesktopCat = () => {
  const [x, setX] = useState(() =>
    typeof window !== 'undefined' ? Math.max(16, window.innerWidth - SIZE - 40) : 40
  );
  const [animation, setAnimation] = useState('idle');
  const [tip, setTip] = useState('');
  const [showIntro, setShowIntro] = useState(false);

  const modeRef = useRef('idle'); // idle | walking | special | dragged
  const velRef = useRef(0);
  const modeEndsRef = useRef(Date.now() + 8000);
  const animRef = useRef('idle');
  const xRef = useRef(x);
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const clickTimerRef = useRef(null);
  const tipTimerRef = useRef(null);
  const hoveredRef = useRef(false);

  const showTip = useCallback((text) => {
    setTip(text);
    clearTimeout(tipTimerRef.current);
    tipTimerRef.current = setTimeout(() => setTip(''), 2200);
  }, []);

  const setAnim = useCallback((name) => {
    if (animRef.current === name) return;
    animRef.current = name;
    setAnimation(name);
  }, []);

  const enterIdle = useCallback(
    (seconds) => {
      modeRef.current = 'idle';
      velRef.current = 0;
      setAnim('idle');
      modeEndsRef.current = Date.now() + seconds * 1000;
    },
    [setAnim]
  );

  const playSpecial = useCallback(
    (name, seconds) => {
      modeRef.current = 'special';
      velRef.current = 0;
      setAnim(name);
      modeEndsRef.current = Date.now() + seconds * 1000;
    },
    [setAnim]
  );

  const startWalking = useCallback(() => {
    const maxX = Math.max(8, window.innerWidth - SIZE - 8);
    const mid = xRef.current + SIZE / 2;
    let goRight;
    if (mid < window.innerWidth * 0.25) goRight = true;
    else if (mid > window.innerWidth * 0.75) goRight = false;
    else goRight = Math.random() > 0.5;

    modeRef.current = 'walking';
    velRef.current = goRight ? SPEED : -SPEED;
    setAnim(goRight ? 'walkingRight' : 'walkingLeft');
    modeEndsRef.current = Date.now() + (5 + Math.random() * 7) * 1000;

    xRef.current = Math.min(maxX, Math.max(8, xRef.current));
    setX(xRef.current);
  }, [setAnim]);

  const chooseNext = useCallback(() => {
    const roll = Math.floor(Math.random() * 100);
    if (roll < 22) startWalking();
    else if (roll < 30) playSpecial('waiting', 1.8);
    else if (roll < 38) playSpecial('review', 1.7);
    else if (roll < 45) playSpecial('working', 1.6);
    else if (roll < 50) playSpecial('jumping', 1.4);
    else if (roll < 55) playSpecial('waving', 1.5);
    else enterIdle(12 + Math.random() * 16);
  }, [enterIdle, playSpecial, startWalking]);

  // Intro on first visit + wave hello
  useEffect(() => {
    const seen = (() => {
      try {
        return localStorage.getItem(INTRO_KEY) === '1';
      } catch {
        return false;
      }
    })();

    const openIntro = () => {
      setShowIntro(true);
      playSpecial('waving', 2);
    };

    if (!seen) {
      const t = setTimeout(openIntro, 900);
      return () => clearTimeout(t);
    }

    // Returning visitors: small tip, can reopen card via "who?"
    const t = setTimeout(() => showTip('hi, i’m julie~'), 700);
    return () => clearTimeout(t);
  }, [playSpecial, showTip]);

  // Main tick loop
  useEffect(() => {
    enterIdle(6);
    const id = window.setInterval(() => {
      if (draggingRef.current) return;

      const maxX = Math.max(8, window.innerWidth - SIZE - 8);

      if (modeRef.current === 'walking') {
        let next = xRef.current + velRef.current;
        if (next <= 8) {
          next = 8;
          velRef.current = Math.abs(SPEED);
          setAnim('walkingRight');
        } else if (next >= maxX) {
          next = maxX;
          velRef.current = -Math.abs(SPEED);
          setAnim('walkingLeft');
        }
        xRef.current = next;
        setX(next);
      }

      if (Date.now() < modeEndsRef.current) return;

      if (modeRef.current === 'walking') {
        enterIdle(14 + Math.random() * 12);
      } else if (modeRef.current === 'idle' || modeRef.current === 'special') {
        chooseNext();
      }
    }, 1000 / 30);

    const onResize = () => {
      const maxX = Math.max(8, window.innerWidth - SIZE - 8);
      xRef.current = Math.min(maxX, Math.max(8, xRef.current));
      setX(xRef.current);
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearInterval(id);
      window.removeEventListener('resize', onResize);
      clearTimeout(clickTimerRef.current);
      clearTimeout(tipTimerRef.current);
    };
  }, [chooseNext, enterIdle, setAnim]);

  // Mouse near → curious look
  useEffect(() => {
    const onMove = (e) => {
      if (draggingRef.current || modeRef.current === 'special' || showIntro) return;
      const catCenterX = xRef.current + SIZE / 2;
      const catCenterY = window.innerHeight - BOTTOM - SIZE / 2;
      const dx = e.clientX - catCenterX;
      const dy = e.clientY - catCenterY;
      const dist = Math.hypot(dx, dy);

      if (dist < 120 && modeRef.current === 'idle') {
        if (!hoveredRef.current) {
          hoveredRef.current = true;
          playSpecial('waiting', 1.6);
        }
      } else if (dist > 180) {
        hoveredRef.current = false;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [playSpecial, showIntro]);

  const dismissIntro = () => {
    setShowIntro(false);
    try {
      localStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* ignore */
    }
    enterIdle(8);
  };

  const openIntro = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowIntro(true);
    playSpecial('waving', 2);
  };

  const onPointerDown = (e) => {
    if (e.target.closest('.desktop-cat-card') || e.target.closest('.desktop-cat-who')) {
      return;
    }
    e.preventDefault();
    draggingRef.current = false;
    dragOffsetRef.current = e.clientX - xRef.current;
    const startX = e.clientX;
    const startY = e.clientY;
    let moved = false;

    const onMove = (ev) => {
      if (Math.hypot(ev.clientX - startX, ev.clientY - startY) > 6) {
        moved = true;
        draggingRef.current = true;
        modeRef.current = 'dragged';
        velRef.current = 0;
        setAnim('working');
      }
      if (!draggingRef.current) return;
      const maxX = Math.max(8, window.innerWidth - SIZE - 8);
      const next = Math.min(maxX, Math.max(8, ev.clientX - dragOffsetRef.current));
      xRef.current = next;
      setX(next);
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);

      if (moved) {
        draggingRef.current = false;
        enterIdle(8);
        showTip('meow~ new spot');
        return;
      }

      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
        playSpecial('waving', 1.5);
        showTip('hi hi~');
      } else {
        clickTimerRef.current = setTimeout(() => {
          clickTimerRef.current = null;
          playSpecial('belly', 2.6);
          showTip('belly rub 💕');
        }, 260);
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  // Keep intro card near cat, but flip left if near right edge
  const cardOnLeft = typeof window !== 'undefined' && x > window.innerWidth / 2;

  return (
    <div
      className="desktop-cat"
      style={{ left: x, bottom: BOTTOM, width: SIZE, height: SIZE }}
      onPointerDown={onPointerDown}
      role="img"
      aria-label="Julie the cat — click for belly rub, double-click to wave, drag to move"
      title="Julie · click = belly · double-click = wave · drag = move"
    >
      <img src={ANIM[animation] || ANIM.idle} alt="Julie" draggable={false} />

      {!showIntro && (
        <button type="button" className="desktop-cat-who" onClick={openIntro}>
          who?
        </button>
      )}

      {tip && !showIntro && <span className="desktop-cat-tip">{tip}</span>}

      {showIntro && (
        <div
          className={`desktop-cat-card ${cardOnLeft ? 'desktop-cat-card-left' : 'desktop-cat-card-right'}`}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="desktop-cat-card-close"
            onClick={dismissIntro}
            aria-label="Close intro"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="desktop-cat-card-name">hi, i’m julie 🐾</p>
          <p className="desktop-cat-card-body">
            yuxin’s desktop cat. i nap, wander around the page, and love belly rubs.
            click me, drag me — i react to your mouse.
          </p>
          <a
            href={DESKTOP_CAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-cat-learn"
          >
            learn more — want julie on your computer?
          </a>
        </div>
      )}
    </div>
  );
};

export default DesktopCat;
