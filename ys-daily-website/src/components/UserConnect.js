import React, { useState, useEffect } from 'react';
import { Sparkles, Send } from 'lucide-react';

const STORAGE_KEY = 'yuxin-daily-connections';
const MAX_WALL = 12;
const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbzZS4cr72S5Qr3QzwneoOtWJFB6hihQlsAY5WaM9pf6I6y5515gaCGTfqswKIv2kPZsLw/exec';

const VIBES = [
  { id: 'wave', label: '👋 just saying hi' },
  { id: 'coffee', label: '☕ portland friend' },
  { id: 'create', label: '🎨 fellow maker' },
  { id: 'climb', label: '🧗 hobby buddy' },
];

const loadWall = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const UserConnect = () => {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [vibe, setVibe] = useState(VIBES[0].id);
  const [wall, setWall] = useState([]);
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setWall(loadWall());
  }, []);

  const saveToWall = (entry) => {
    const next = [entry, ...loadWall()].slice(0, MAX_WALL);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setWall(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedNote = note.trim();
    if (!trimmedName || !trimmedNote) {
      setStatus({ type: 'error', text: 'drop a name + a short note — even one line works.' });
      return;
    }

    setSending(true);
    setStatus(null);

    const vibeLabel = VIBES.find((v) => v.id === vibe)?.label || '';
    const entry = {
      id: `${Date.now()}`,
      name: trimmedName,
      note: trimmedNote.slice(0, 140),
      vibe: vibeLabel,
      at: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    };

    try {
      const formData = new FormData();
      formData.append('name', trimmedName);
      formData.append('email', 'visitor-connect');
      formData.append('message', `[${vibeLabel}] ${trimmedNote}`);
      formData.append('timestamp', new Date().toISOString());
      formData.append('type', 'connect');

      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
    } catch {
      /* still show on wall if sheet fails */
    }

    saveToWall(entry);
    setName('');
    setNote('');
    setStatus({ type: 'ok', text: 'you\'re on the wall — thanks for stopping by.' });
    setSending(false);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-lg mx-auto">
        <div className="connect-card">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[#750787]" />
            <h2 className="font-display text-2xl sm:text-3xl text-stone-800">
              say hi on the wall
            </h2>
          </div>
          <p className="text-stone-600 text-sm mb-6 leading-relaxed">
            tiny guestbook — no account, just your name + a note. i read these for real.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name or nickname"
              className="connect-input"
              disabled={sending}
            />
            <textarea
              rows={2}
              maxLength={140}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="what brought you here? (max 140 chars)"
              className="connect-input resize-none"
              disabled={sending}
            />

            <div className="flex flex-wrap gap-2">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVibe(v.id)}
                  className={`connect-vibe-chip ${vibe === v.id ? 'connect-vibe-chip-active' : ''}`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {status && (
              <p
                className={`text-sm ${
                  status.type === 'ok' ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {status.text}
              </p>
            )}

            <button type="submit" disabled={sending} className="connect-submit">
              <Send className="w-4 h-4" />
              <span>{sending ? 'pinning…' : 'pin to wall'}</span>
            </button>
          </form>

          {wall.length > 0 && (
            <div className="mt-8 pt-6 border-t border-stone-200/80">
              <p className="text-xs uppercase tracking-wider text-stone-500 mb-3">
                recent hellos
              </p>
              <ul className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {wall.map((item) => (
                  <li key={item.id} className="connect-wall-note">
                    <div className="flex justify-between gap-2 text-xs text-stone-500">
                      <span className="font-medium text-stone-700">{item.name}</span>
                      <span>{item.at}</span>
                    </div>
                    <p className="text-sm text-stone-800 mt-1 leading-snug">{item.note}</p>
                    {item.vibe && (
                      <span className="text-xs text-stone-500 mt-1 inline-block">
                        {item.vibe}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserConnect;
