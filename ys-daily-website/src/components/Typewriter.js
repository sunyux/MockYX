import React, { useState, useEffect, useRef, useMemo } from 'react';

const Typewriter = ({
  text,
  phrases,
  speed = 50,
  deleteSpeed = 35,
  pauseAfterType = 2000,
  pauseAfterDelete = 400,
  startDelay = 500,
  className = '',
  cursorClassName = 'typewriter-cursor',
  loop = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const skippedRef = useRef(false);
  const stateRef = useRef({ phraseIdx: 0, charIdx: 0, deleting: false });

  const phraseList = useMemo(
    () => (phrases?.length ? phrases : text ? [text] : []),
    [phrases, text]
  );
  const phraseKey = phraseList.join('\u0001');

  useEffect(() => {
    if (!phraseList.length) return;

    skippedRef.current = false;
    stateRef.current = { phraseIdx: 0, charIdx: 0, deleting: false };
    setDisplayText('');
    setShowCursor(true);

    let timeoutId;

    const schedule = (fn, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fn, delay);
    };

    const tick = () => {
      if (skippedRef.current) return;

      const { phraseIdx, charIdx, deleting } = stateRef.current;
      const target = phraseList[phraseIdx];
      const isSingle = phraseList.length === 1;

      if (!deleting && charIdx < target.length) {
        stateRef.current.charIdx = charIdx + 1;
        setDisplayText(target.slice(0, charIdx + 1));
        schedule(tick, speed);
        return;
      }

      if (!deleting && charIdx >= target.length) {
        if (isSingle) {
          setShowCursor(false);
          return;
        }
        schedule(() => {
          stateRef.current.deleting = true;
          tick();
        }, pauseAfterType);
        return;
      }

      if (deleting && charIdx > 0) {
        stateRef.current.charIdx = charIdx - 1;
        setDisplayText(target.slice(0, charIdx - 1));
        schedule(tick, deleteSpeed);
        return;
      }

      if (deleting && charIdx === 0) {
        const nextIdx = loop ? (phraseIdx + 1) % phraseList.length : phraseIdx;
        if (!loop && nextIdx === phraseIdx) {
          setShowCursor(false);
          return;
        }
        stateRef.current = { phraseIdx: nextIdx, charIdx: 0, deleting: false };
        schedule(tick, pauseAfterDelete);
      }
    };

    schedule(tick, startDelay);

    return () => clearTimeout(timeoutId);
  }, [
    phraseKey,
    phraseList,
    speed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
    startDelay,
    loop,
  ]);

  const handleSkip = () => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    const { phraseIdx } = stateRef.current;
    setDisplayText(phraseList[phraseIdx] || '');
    if (phraseList.length === 1) {
      setShowCursor(false);
    }
  };

  return (
    <span
      className={`typewriter-inline ${className}`}
      onClick={handleSkip}
      onKeyDown={(e) => e.key === 'Enter' && handleSkip()}
      tabIndex={0}
      title="Click to skip typing"
    >
      <span>{displayText}</span>
      {showCursor && <span className={cursorClassName}>|</span>}
    </span>
  );
};

export default Typewriter;
