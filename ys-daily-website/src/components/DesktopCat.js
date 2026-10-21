import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const SIZE = 140;
const SPEED = 1.6;
const RUN = 3.4;
const BOTTOM = 16;
const GRAVITY = 0.55;
const BALL = 30;
const DESKTOP_CAT_URL = 'https://github.com/sunyux/DesktopCat';
const INTRO_KEY = 'julie-intro-seen';
// Things on the page Julie can jump up and sit on.
const PERCHES = '.huge, .proj, .tile, .timeline h4, .about > img, .frame, .btn';

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

const PLAY_LINES = ['mine!', 'boop', 'got it~', 'again!', 'mrrp'];
const PERCH_LINES = ['nice view', 'i live here now', 'reading yuxin’s cv', 'comfy', 'hello up here'];

const pick = (list) => list[Math.floor(Math.random() * list.length)];

const perchSurface = (el) => {
  const r = el.getBoundingClientRect();
  return { left: r.left, right: r.right, top: r.top };
};

const visiblePerches = () =>
  [...document.querySelectorAll(PERCHES)].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width >= SIZE * 0.8 && r.top > 120 && r.top < window.innerHeight - 80;
  });

/**
 * Web port of Julie from DesktopCat (sunyux/DesktopCat).
 * She wanders, jumps onto headings and cards, chases the cursor and plays with a ball of yarn.
 */
const DesktopCat = () => {
  const [pos, setPos] = useState(() => ({
    x: typeof window !== 'undefined' ? Math.max(16, window.innerWidth - SIZE - 40) : 40,
    y: BOTTOM,
  }));
  const [ball, setBall] = useState({ x: 120, y: 8 });
  const [animation, setAnimation] = useState('idle');
  const [tip, setTip] = useState('');
  const [showIntro, setShowIntro] = useState(false);

  // mode: idle | walking | special | jump | fall | chase | dragged
  const modeRef = useRef('idle');
  const velRef = useRef(0);
  const vyRef = useRef(0);
  const modeEndsRef = useRef(Date.now() + 4000);
  const animRef = useRef('idle');
  const xRef = useRef(pos.x);
  const yRef = useRef(BOTTOM);
  const perchRef = useRef(null);
  const jumpRef = useRef(null);
  const ballRef = useRef({ x: 120, y: 8, vx: 0, vy: 0 });
  const mouseRef = useRef({ x: -999, y: -999, speed: 0, t: 0 });
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const clickTimerRef = useRef(null);
  const tipTimerRef = useRef(null);
  const hoveredRef = useRef(false);
  const showIntroRef = useRef(false);

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

  // Horizontal bounds of whatever she is standing on.
  const bounds = useCallback(() => {
    if (perchRef.current) {
      const s = perchSurface(perchRef.current);
      return { min: Math.max(8, s.left - SIZE * 0.25), max: Math.min(window.innerWidth - SIZE - 8, s.right - SIZE * 0.75) };
    }
    return { min: 8, max: Math.max(8, window.innerWidth - SIZE - 8) };
  }, []);

  const startWalking = useCallback(
    (dir) => {
      const { min, max } = bounds();
      const mid = (min + max) / 2;
      const goRight = dir !== undefined ? dir > 0 : xRef.current < mid ? Math.random() > 0.25 : Math.random() > 0.75;
      modeRef.current = 'walking';
      velRef.current = goRight ? SPEED : -SPEED;
      setAnim(goRight ? 'walkingRight' : 'walkingLeft');
      modeEndsRef.current = Date.now() + (3 + Math.random() * 5) * 1000;
    },
    [bounds, setAnim]
  );

  // Arc from where she is to an element's top edge (or to the floor when el is null).
  const jumpTo = useCallback(
    (el, targetX) => {
      let tx = targetX;
      if (tx === undefined) {
        if (el) {
          const s = perchSurface(el);
          tx = s.left + Math.random() * Math.max(0, s.right - s.left - SIZE);
        } else {
          tx = xRef.current + (Math.random() - 0.5) * 300;
        }
      }
      tx = Math.min(window.innerWidth - SIZE - 8, Math.max(8, tx));
      const fromY = yRef.current;
      const toY = el ? window.innerHeight - perchSurface(el).top - 12 : BOTTOM;
      jumpRef.current = {
        el,
        fromX: xRef.current,
        fromY,
        toX: tx,
        start: Date.now(),
        dur: 650 + Math.min(500, Math.hypot(tx - xRef.current, toY - fromY)),
        lift: 60 + Math.max(0, toY - fromY) * 0.35,
      };
      perchRef.current = null;
      modeRef.current = 'jump';
      setAnim('jumping');
    },
    [setAnim]
  );

  const startChase = useCallback(() => {
    if (perchRef.current) {
      jumpTo(null, ballRef.current.x - SIZE / 2);
      return;
    }
    modeRef.current = 'chase';
    modeEndsRef.current = Date.now() + 6000;
  }, [jumpTo]);

  const chooseNext = useCallback(() => {
    const roll = Math.random() * 100;
    const perched = !!perchRef.current;
    if (roll < 26) startWalking();
    else if (roll < 48) {
      const options = visiblePerches().filter((el) => el !== perchRef.current);
      if (options.length) {
        jumpTo(pick(options));
      } else startWalking();
    } else if (roll < 58 && perched) jumpTo(null);
    else if (roll < 68) startChase();
    else if (roll < 72) playSpecial('waiting', 1.8);
    else if (roll < 76) playSpecial('review', 1.7);
    else if (roll < 79) playSpecial('working', 1.6);
    else if (roll < 82) playSpecial('waving', 1.5);
    else if (roll < 85) playSpecial('belly', 2.4);
    else enterIdle(2.5 + Math.random() * 4);
  }, [enterIdle, jumpTo, playSpecial, startChase, startWalking]);

  useEffect(() => {
    showIntroRef.current = showIntro;
  }, [showIntro]);

  // Intro on first visit + wave hello
  useEffect(() => {
    const seen = (() => {
      try {
        return localStorage.getItem(INTRO_KEY) === '1';
      } catch {
        return false;
      }
    })();

    if (!seen) {
      const t = setTimeout(() => {
        setShowIntro(true);
        playSpecial('waving', 2);
      }, 900);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => showTip('hi, i’m julie~'), 700);
    return () => clearTimeout(t);
  }, [playSpecial, showTip]);

  // Main tick loop
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ballRef.current.x = Math.min(window.innerWidth - BALL - 20, xRef.current - 160);
    enterIdle(3);

    const id = window.setInterval(() => {
      const now = Date.now();
      const W = window.innerWidth;
      const H = window.innerHeight;

      // Yarn ball physics
      const b = ballRef.current;
      if (b.vx || b.vy || b.y > 8) {
        b.vy -= GRAVITY;
        b.x += b.vx;
        b.y += b.vy;
        if (b.y <= 8) {
          b.y = 8;
          b.vy = Math.abs(b.vy) > 2 ? -b.vy * 0.45 : 0;
          b.vx *= 0.9;
        }
        b.vx *= 0.985;
        if (b.x < 4) { b.x = 4; b.vx = Math.abs(b.vx) * 0.7; }
        if (b.x > W - BALL - 4) { b.x = W - BALL - 4; b.vx = -Math.abs(b.vx) * 0.7; }
        if (Math.abs(b.vx) < 0.08 && b.y === 8 && b.vy === 0) b.vx = 0;
        setBall({ x: b.x, y: b.y });
      }

      if (draggingRef.current || showIntroRef.current) return;

      const mode = modeRef.current;
      let x = xRef.current;
      let y = yRef.current;

      // Stay glued to the perch while the page scrolls; fall off if it scrolls away.
      if (perchRef.current && mode !== 'jump') {
        const s = perchSurface(perchRef.current);
        if (s.top < 70 || s.top > H - 40 || x + SIZE * 0.5 < s.left || x + SIZE * 0.5 > s.right) {
          perchRef.current = null;
          modeRef.current = 'fall';
          vyRef.current = 0;
          setAnim('jumping');
        } else {
          y = H - s.top - 12;
        }
      }

      if (mode === 'jump' && jumpRef.current) {
        const j = jumpRef.current;
        const t = Math.min(1, (now - j.start) / j.dur);
        const toY = j.el ? H - perchSurface(j.el).top - 12 : BOTTOM;
        x = j.fromX + (j.toX - j.fromX) * t;
        y = j.fromY + (toY - j.fromY) * t + Math.sin(Math.PI * t) * j.lift;
        if (t >= 1) {
          jumpRef.current = null;
          perchRef.current = j.el;
          y = toY;
          if (j.el && Math.random() < 0.5) showTip(pick(PERCH_LINES));
          if (b.vx || b.vy) startChase();
          else enterIdle(2 + Math.random() * 3);
        }
      } else if (modeRef.current === 'fall') {
        vyRef.current -= GRAVITY * 1.4;
        y += vyRef.current;
        if (y <= BOTTOM) {
          y = BOTTOM;
          enterIdle(1.5);
          showTip('oof');
        }
      } else if (mode === 'walking') {
        const { min, max } = bounds();
        x += velRef.current;
        if (x <= min) { x = min; velRef.current = SPEED; setAnim('walkingRight'); }
        else if (x >= max) { x = max; velRef.current = -SPEED; setAnim('walkingLeft'); }
      } else if (mode === 'chase') {
        // Run at the yarn, bat it when close.
        const target = b.x + BALL / 2 - SIZE / 2;
        const dx = target - x;
        if (Math.abs(dx) > 18) {
          x += Math.sign(dx) * RUN;
          setAnim(dx > 0 ? 'walkingRight' : 'walkingLeft');
        } else if (b.y < 60) {
          const dir = b.x < W / 2 ? 1 : -1;
          b.vx = dir * (4 + Math.random() * 6);
          b.vy = 4 + Math.random() * 7;
          showTip(pick(PLAY_LINES));
          playSpecial('jumping', 0.9);
        }
        if (now > modeEndsRef.current) enterIdle(2);
      } else if (mode === 'idle' && !perchRef.current && (Math.abs(b.vx) > 1.5 || b.vy > 2)) {
        startChase();
      }

      // Cursor zooming past nearby → she gives chase for a moment.
      const m = mouseRef.current;
      if (mode === 'idle' && !perchRef.current && m.speed > 25 && now - m.t < 120) {
        const near = Math.abs(m.x - (x + SIZE / 2)) < 320 && m.y > H - 260;
        if (near) startWalking(m.x - (x + SIZE / 2));
      }

      x = Math.min(W - SIZE - 8, Math.max(8, x));
      if (x !== xRef.current || y !== yRef.current) {
        xRef.current = x;
        yRef.current = y;
        setPos({ x, y });
      }

      if (calm && modeRef.current !== 'fall') return;
      if (now < modeEndsRef.current) return;
      if (modeRef.current === 'walking') enterIdle(2 + Math.random() * 4);
      else if (modeRef.current === 'idle' || modeRef.current === 'special') chooseNext();
    }, 1000 / 30);

    const onResize = () => {
      xRef.current = Math.min(window.innerWidth - SIZE - 8, Math.max(8, xRef.current));
      setPos({ x: xRef.current, y: yRef.current });
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearInterval(id);
      window.removeEventListener('resize', onResize);
      clearTimeout(clickTimerRef.current);
      clearTimeout(tipTimerRef.current);
    };
  }, [bounds, chooseNext, enterIdle, playSpecial, setAnim, showTip, startChase, startWalking]);

  // Mouse near → curious look; track cursor speed for chasing.
  useEffect(() => {
    const onMove = (e) => {
      const m = mouseRef.current;
      const now = Date.now();
      const dt = Math.max(1, now - m.t);
      m.speed = (Math.hypot(e.clientX - m.x, e.clientY - m.y) / dt) * 16;
      m.x = e.clientX;
      m.y = e.clientY;
      m.t = now;

      if (draggingRef.current || modeRef.current !== 'idle' || showIntroRef.current) return;
      const dx = e.clientX - (xRef.current + SIZE / 2);
      const dy = e.clientY - (window.innerHeight - yRef.current - SIZE / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
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
  }, [playSpecial]);

  const dismissIntro = () => {
    setShowIntro(false);
    try {
      localStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* ignore */
    }
    enterIdle(3);
  };

  const openIntro = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowIntro(true);
    playSpecial('waving', 2);
  };

  const onPointerDown = (e) => {
    if (e.target.closest('.desktop-cat-card') || e.target.closest('.desktop-cat-who')) return;
    e.preventDefault();
    draggingRef.current = false;
    dragOffsetRef.current = { x: e.clientX - xRef.current, y: window.innerHeight - e.clientY - yRef.current };
    const startX = e.clientX;
    const startY = e.clientY;
    let moved = false;

    const onMove = (ev) => {
      if (Math.hypot(ev.clientX - startX, ev.clientY - startY) > 6) {
        moved = true;
        draggingRef.current = true;
        modeRef.current = 'dragged';
        perchRef.current = null;
        jumpRef.current = null;
        velRef.current = 0;
        setAnim('working');
      }
      if (!draggingRef.current) return;
      const nx = Math.min(window.innerWidth - SIZE - 8, Math.max(8, ev.clientX - dragOffsetRef.current.x));
      const ny = Math.max(BOTTOM, Math.min(window.innerHeight - SIZE, window.innerHeight - ev.clientY - dragOffsetRef.current.y));
      xRef.current = nx;
      yRef.current = ny;
      setPos({ x: nx, y: ny });
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);

      if (moved) {
        draggingRef.current = false;
        if (yRef.current > BOTTOM + 2) {
          modeRef.current = 'fall';
          vyRef.current = 0;
          setAnim('jumping');
          showTip('wheee');
        } else {
          enterIdle(3);
          showTip('meow~ new spot');
        }
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

  // Toss the yarn: drag and release to fling it, click to give it a nudge.
  const onBallDown = (e) => {
    e.preventDefault();
    const b = ballRef.current;
    let last = { x: e.clientX, y: e.clientY, t: Date.now() };
    let vel = { x: 0, y: 0 };
    let moved = false;
    b.vx = 0;
    b.vy = 0;

    const onMove = (ev) => {
      moved = true;
      const now = Date.now();
      const dt = Math.max(1, now - last.t);
      vel = { x: ((ev.clientX - last.x) / dt) * 16, y: (-(ev.clientY - last.y) / dt) * 16 };
      last = { x: ev.clientX, y: ev.clientY, t: now };
      b.x = Math.min(window.innerWidth - BALL - 4, Math.max(4, ev.clientX - BALL / 2));
      b.y = Math.max(8, window.innerHeight - ev.clientY - BALL / 2);
      setBall({ x: b.x, y: b.y });
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (moved) {
        b.vx = Math.max(-18, Math.min(18, vel.x));
        b.vy = Math.max(-5, Math.min(16, vel.y));
      } else {
        b.vx = (Math.random() > 0.5 ? 1 : -1) * 6;
        b.vy = 6;
      }
      if (b.y <= 8 && !b.vy) b.vy = 0.1;
      if (!draggingRef.current && modeRef.current !== 'jump') startChase();
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const cardOnLeft = typeof window !== 'undefined' && pos.x > window.innerWidth / 2;

  return (
    <>
      <div
        className="cat-yarn"
        style={{ left: ball.x, bottom: ball.y }}
        onPointerDown={onBallDown}
        title="Julie’s yarn · drag to throw"
        aria-label="Ball of yarn, drag to throw it for Julie"
        role="button"
      >
        <svg viewBox="0 0 30 30" aria-hidden="true" style={{ transform: `rotate(${ball.x * 3}deg)` }}>
          <circle cx="15" cy="15" r="13" fill="#ff3b1f" />
          <path d="M5 9c6 3 14 3 20 0M3 15c8 4 16 4 24 0M5 21c6 3 14 3 20 0M10 3c-3 7-3 17 0 24M20 3c3 7 3 17 0 24" fill="none" stroke="#0d0d0d" strokeOpacity=".35" strokeWidth="1.2" />
          <path d="M26 20c4 3 2 8-3 8" fill="none" stroke="#ff3b1f" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className="desktop-cat"
        style={{ left: pos.x, bottom: pos.y, width: SIZE, height: SIZE }}
        onPointerDown={onPointerDown}
        role="img"
        aria-label="Julie the cat: click for belly rub, double-click to wave, drag to move"
        title="Julie · click = belly · double-click = wave · drag = move · throw her the yarn!"
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
            <button type="button" className="desktop-cat-card-close" onClick={dismissIntro} aria-label="Close intro">
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="desktop-cat-card-name">hi, i’m julie 🐾</p>
            <p className="desktop-cat-card-body">
              yuxin’s desktop cat. i climb on the headings, chase your mouse and play with my yarn.
              throw it for me! click me for a belly rub, or drag me somewhere new.
            </p>
            <a href={DESKTOP_CAT_URL} target="_blank" rel="noopener noreferrer" className="desktop-cat-learn">
              learn more — want julie on your computer?
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopCat;
