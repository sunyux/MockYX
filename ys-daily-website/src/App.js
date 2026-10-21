// App.js — Yuxin Sun, live CV as a junk journal
import React, { useEffect, useState } from 'react';
import './journal.css';
import DesktopCat from './components/DesktopCat';

const PUB = process.env.PUBLIC_URL;

const RECENT = [
  {
    no: '01',
    title: 'Mon Français',
    shot: 'mon-francais.jpg',
    kind: 'French study site',
    note: 'little painted planets, one per topic ✿',
    desc: 'A topic-based A1 French course: every topic is a hand-painted world with vocab, stories, verb conjugation on hover, quizzes and a level-by-level voyage.',
    stack: ['Three.js', 'WebGL shaders', 'Web Speech', 'Vanilla JS'],
    link: 'https://sunyux.github.io/mon-francais/',
    code: 'https://github.com/sunyux/mon-francais',
  },
  {
    no: '02',
    title: 'Dictée',
    shot: 'dictation.jpg',
    kind: 'French dictation drills',
    note: 'my homework, but make it an app',
    desc: 'Drills built from 你好法语 textbook PDFs: vocabulary, sentence and full-text dictation with text-to-speech, speech recognition and cloud-synced progress.',
    stack: ['Python', 'Firebase', 'Web Speech', 'Vanilla JS'],
    link: 'https://sunyux.github.io/dictation/',
    code: 'https://github.com/sunyux/dictation',
  },
  {
    no: '03',
    title: 'Biosphere37',
    shot: 'biosphere37.jpg',
    kind: 'Music visualiser',
    note: 'play notes → make stars ★',
    desc: 'A Three.js galaxy you play with a MIDI keyboard: notes become stars and neon routes, over Web MIDI or a browser-simulated FM-1 synth.',
    stack: ['Three.js', 'Web MIDI', 'Web Audio', 'WASM'],
    link: 'https://sunyux.github.io/biosphere37/',
    code: 'https://github.com/sunyux/biosphere37',
  },
];

const WORK = [
  { img: 'Meme.jpg', title: 'Meme Generator', desc: 'React, Docker, Google Cloud', link: 'https://github.com/sunyux/Meme' },
  { img: 'Stroke_Victimm.jpg', title: 'Stroke Victim Classifiers', desc: 'machine learning', link: 'https://github.com/sunyux/Stroke-Victim-Classifiers/blob/main/Bayesian_for_Final_program.ipynb' },
  { img: 'sunyux.jpg', title: 'Personal website', desc: 'React, Three.js, Tailwind', link: 'https://github.com/sunyux/Portfolio' },
  { img: 'media.jpg', title: 'Social media site', desc: 'HTML, CSS', link: 'https://github.com/sunyux/stu-media' },
  { img: 'Boba.jpg', title: 'Boba search UI', desc: 'Figma', link: 'https://www.figma.com/file/7aV9KXP25BUxDigoo92GMb/Home-page?node-id=0%3A1' },
];

const SKILLS = {
  'i speak': ['TypeScript', 'JavaScript', 'Python', 'C++', 'Java', 'C#', 'HTML / CSS', 'SQL', 'PHP'],
  'i use': ['React', 'React Native', 'Node.js', 'Laravel', 'Three.js', 'Docker', 'MongoDB', 'MySQL', 'PyTorch', 'Tailwind', 'Blender', 'Figma'],
  'i do': ['full-stack web', '3D & data viz', 'Google Cloud', 'telemetry pipelines', 'Agile (Scrum, SAFe)'],
};

const EXPERIENCE = [
  { when: 'Jul 2025 — now', role: 'Web Assistant', org: 'The Ladies Club', note: 'Built the club’s site and moved it from Google Sites to WordPress, with PHP and JavaScript features and pages non-technical members can edit.' },
  { when: 'Jul 2024 — Dec 2025', role: 'Peer Advisor', org: 'OSU Global Opportunities', note: 'Advised students on international programs; built program pages and dashboards in Drupal, WordPress and Canvas.' },
  { when: 'Jan — Dec 2025', role: 'Sensory Technician', org: 'OSU Food Innovation Center', note: 'Scheduled participants and kept program operations running with Outlook and Access.' },
  { when: 'Jan — Mar 2024', role: 'Volunteer analyst', org: 'Oregon Research & Teaching SOC', note: 'Investigated security alerts, wrote rules to cut false positives, ran penetration tests and wrote up findings.' },
];

const EDUCATION = [
  { when: '2023 — 2025', what: 'M.Eng. Computer Science', where: 'Oregon State University' },
  { when: '2019 — 2023', what: 'B.S. Computer Science', where: 'Portland State University' },
];

const DAILY = [
  ['Climb.jpg', 'climbing day'], ['Ceramics.jpg', 'wobbly ceramics'], ['Crochet.jpg', 'crochet era'],
  ['Sking.jpg', 'ski trip!'], ['Perlerbeads.jpg', 'perler beads'], ['Night.jpg', 'night at the art center'],
  ['Cheery.jpg', 'cherry bloom'], ['Rose.jpg', 'rose'],
];

const NAV = [['now', 'now'], ['work', 'old work'], ['gallery', '3D'], ['about', 'me'], ['cv', 'cv']];

// Ransom-note letters for the name.
const Ransom = ({ text }) => (
  <span className="ransom" aria-label={text}>
    {text.split(' ').map((word, w) => (
      <span key={w} className="ransom-word">
        {[...word].map((ch, i) => <span key={i} className={`r r${(w * 5 + i) % 7}`} aria-hidden="true">{ch}</span>)}
      </span>
    ))}
  </span>
);

const Tape = ({ c = 'a', className = '' }) => <span className={`tape tape-${c} ${className}`} aria-hidden="true" />;

export default function App() {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="journal">
      <header className="bar">
        <a href="#top" className="mark">yuxin’s journal</a>
        <nav>{NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <span className="live"><i /> {clock} · Portland</span>
      </header>

      {/* cover */}
      <section id="top" className="page cover">
        <div className="stamp">LIVE CV · OCT 2026</div>
        <h1 className="huge"><Ransom text="Yuxin Sun" /></h1>
        <div className="note sticky yellow tilt-l">
          software engineer &amp; creative coder in Portland.<br />
          M.Eng. CS, Oregon State ’25.<br />
          i build web tools, 3D worlds &amp; data viz ♡
        </div>
        <figure className="polaroid tilt-r cover-photo">
          <Tape c="b" />
          <img src={`${PUB}/img/yuxin.jpg`} alt="Yuxin Sun" />
          <figcaption>me, probably cold</figcaption>
        </figure>
        <div className="ticket tilt-l2">
          <span className="ticket-label">ADMIT ONE</span>
          <a className="btn" href={`${PUB}/Resume.pdf`} download="Yuxin_Sun_Resume.pdf">download my cv ↓</a>
          <a className="btn" href="#now">see projects →</a>
        </div>
        <svg className="doodle d-arrow" viewBox="0 0 120 80" aria-hidden="true"><path d="M5 60 C 30 10, 70 10, 105 40 M92 28 L106 41 L88 46" /></svg>
        <svg className="doodle d-star" viewBox="0 0 60 60" aria-hidden="true"><path d="M30 4 L36 24 L56 24 L40 36 L46 56 L30 44 L14 56 L20 36 L4 24 L24 24 Z" /></svg>
      </section>

      <div className="washi-strip" aria-hidden="true">
        {Array(3).fill('three.js ✦ react ✦ pytorch ✦ webgl ✦ web audio ✦ figma ✦ blender ✦ ').join('')}
      </div>

      {/* recent projects */}
      <section id="now" className="page grid-paper">
        <h2 className="huge label">recently ✎</h2>
        <p className="hand lede">3 things i made lately (all live, click them!)</p>
        <div className="recent">
          {RECENT.map((p, i) => (
            <article key={p.no} className={`proj scrap s${i}`}>
              <Tape c={['a', 'c', 'b'][i]} />
              <a className="shot" href={p.link} target="_blank" rel="noreferrer">
                <img src={`${PUB}/work/${p.shot}`} alt={`${p.title} screenshot`} loading="lazy" />
              </a>
              <span className="proj-no">no. {p.no}</span>
              <h3>{p.title}</h3>
              <p className="kind">{p.kind}</p>
              <p>{p.desc}</p>
              <ul className="tags">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
              <div className="proj-links">
                <a href={p.link} target="_blank" rel="noreferrer">open site ↗</a>
                <a href={p.code} target="_blank" rel="noreferrer">code ↗</a>
              </div>
              <span className="margin-note">{p.note}</span>
            </article>
          ))}
        </div>
      </section>

      {/* old work */}
      <section id="work" className="page kraft">
        <h2 className="huge label">old work</h2>
        <p className="hand lede">from school &amp; side quests, before all this</p>
        <div className="work">
          {WORK.map((w, i) => (
            <a key={w.title} className={`tile polaroid t${i}`} href={w.link} target="_blank" rel="noreferrer">
              {i % 2 === 0 ? <Tape c={['a', 'b', 'c'][i % 3]} /> : <span className="pin" aria-hidden="true" />}
              <img src={`${PUB}/work/${w.img}`} alt="" loading="lazy" />
              <figcaption><b>{w.title}</b><br />{w.desc}</figcaption>
            </a>
          ))}
        </div>
      </section>

      {/* 3D gallery */}
      <section id="gallery" className="page dark-page">
        <h2 className="huge label">3D models</h2>
        <p className="hand lede">things i modelled. drag to spin, hover to zoom</p>
        <div className="frame">
          <Tape c="c" className="tl" /><Tape c="a" className="br" />
          <iframe title="Yuxin's 3D models gallery" src="https://sunyux.github.io/ModelsGallery/" loading="lazy" />
        </div>
        <a className="btn more" href="https://sunyux.github.io/ModelsGallery/" target="_blank" rel="noreferrer">open full screen ↗</a>
      </section>

      {/* about */}
      <section id="about" className="page lined">
        <h2 className="huge label">about me</h2>
        <div className="about">
          <figure className="polaroid tilt-l">
            <Tape c="b" />
            <img src={`${PUB}/img/Waving.jpg`} alt="Yuxin waving" loading="lazy" />
            <figcaption>hi!!</figcaption>
          </figure>
          <div>
            <p className="big-p">M.Eng. in Computer Science from Oregon State, B.S. from Portland State. I work across full-stack web, 3D and data visualization, and I love anything that turns code into something you can play with.</p>
            <div className="skills">
              {Object.entries(SKILLS).map(([k, list], i) => (
                <div key={k} className={`note sticky ${['pink', 'blue', 'green'][i]} ${i % 2 ? 'tilt-r' : 'tilt-l'}`}>
                  <h4>{k}</h4>
                  <ul>{list.map(s => <li key={s}>{s}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h3 className="sub hand">off the clock ✿</h3>
        <div className="daily">
          {DAILY.map(([f, t], i) => (
            <figure key={f} className={`polaroid small d${i % 4}`}>
              {i % 3 === 0 && <Tape c={['a', 'b', 'c'][i % 3]} />}
              <img src={`${PUB}/img/${f}`} alt={t} loading="lazy" />
              <figcaption>{t}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CV */}
      <section id="cv" className="page grid-paper cvblock">
        <h2 className="huge label">the cv part</h2>
        <div className="timeline notebook">
          <Tape c="a" />
          <h3 className="sub">experience</h3>
          {EXPERIENCE.map(e => (
            <div key={e.role} className="row"><span>{e.when}</span><div><h4>{e.role} <em>@ {e.org}</em></h4><p>{e.note}</p></div></div>
          ))}
          <h3 className="sub">education</h3>
          {EDUCATION.map(e => (
            <div key={e.what} className="row"><span>{e.when}</span><div><h4>{e.what} <em>@ {e.where}</em></h4></div></div>
          ))}
        </div>
        <div className="cv-actions">
          <a className="btn" href={`${PUB}/Resume.pdf`} download="Yuxin_Sun_Resume.pdf">download pdf ↓</a>
          <a className="btn" href={`${PUB}/Resume.pdf`} target="_blank" rel="noreferrer">open in new tab ↗</a>
        </div>
        <div className="pdf-wrap">
          <span className="clip" aria-hidden="true" />
          <object className="pdf" data={`${PUB}/Resume.pdf`} type="application/pdf" aria-label="Resume">
            <p>Your browser can’t show the PDF here. <a href={`${PUB}/Resume.pdf`}>Download it instead.</a></p>
          </object>
        </div>
      </section>

      {/* back cover */}
      <footer className="page end kraft">
        <div className="envelope">
          <h2 className="huge label">say hi ✉</h2>
          <div className="contacts">
            <a href="mailto:sunyux411@gmail.com">sunyux411@gmail.com</a>
            <a href="https://www.linkedin.com/in/yuxin-sun-psu/" target="_blank" rel="noreferrer">linkedin ↗</a>
            <a href="https://github.com/sunyux" target="_blank" rel="noreferrer">github ↗</a>
          </div>
          <p className="fine">971-997-3763 · © {new Date().getFullYear()} Yuxin Sun · Portland, OR</p>
        </div>
      </footer>
      <DesktopCat />
    </div>
  );
}
