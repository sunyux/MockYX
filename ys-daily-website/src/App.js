// App.js — Yuxin Sun, live CV
import React, { useEffect, useState } from 'react';
import './cv.css';

const PUB = process.env.PUBLIC_URL;

const RECENT = [
  {
    no: '01',
    title: 'Mon Français',
    kind: 'French study site',
    year: '2026',
    desc: 'A topic-based A1 French course where every topic is a little hand-painted world: vocab, stories, verb conjugation on hover, quizzes and a level-by-level voyage.',
    stack: ['Three.js', 'WebGL shaders', 'Web Speech', 'Vanilla JS'],
    link: 'https://sunyux.github.io/mon-francais/',
    code: 'https://github.com/sunyux/mon-francais',
    tone: 'blue',
  },
  {
    no: '02',
    title: 'Dictée',
    kind: 'French dictation drills',
    year: '2026',
    desc: 'Drills built from 你好法语 textbook PDFs: vocabulary, sentence and full-text dictation with text-to-speech, speech recognition and cloud-synced progress.',
    stack: ['Python PDF parsing', 'Firebase', 'Web Speech', 'Vanilla JS'],
    link: 'https://sunyux.github.io/dictation/',
    code: 'https://github.com/sunyux/dictation',
    tone: 'red',
  },
  {
    no: '03',
    title: 'Biosphere37',
    kind: 'Music visualiser',
    year: '2026',
    desc: 'A Three.js galaxy you play with a MIDI keyboard: notes become stars and neon routes, driven over Web MIDI or a browser-simulated FM-1 synth.',
    stack: ['Three.js', 'Web MIDI', 'Web Audio', 'WASM'],
    link: 'https://sunyux.github.io/biosphere37/',
    code: 'https://github.com/sunyux/biosphere37',
    tone: 'acid',
  },
];

const WORK = [
  { img: 'Meme.jpg', title: 'Meme Generator', desc: 'React, Docker, Google Cloud', link: 'https://github.com/sunyux/Meme' },
  { img: 'Stroke_Victimm.jpg', title: 'Stroke Victim Classifiers', desc: 'Machine learning, Bayesian models', link: 'https://github.com/sunyux/Stroke-Victim-Classifiers/blob/main/Bayesian_for_Final_program.ipynb' },
  { img: 'sunyux.jpg', title: 'Personal website', desc: 'React, Three.js, Tailwind', link: 'https://github.com/sunyux/Portfolio' },
  { img: 'media.jpg', title: 'Social media website', desc: 'HTML, CSS', link: 'https://github.com/sunyux/stu-media' },
  { img: 'Boba.jpg', title: 'Boba search UI', desc: 'Figma', link: 'https://www.figma.com/file/7aV9KXP25BUxDigoo92GMb/Home-page?node-id=0%3A1' },
];

const SKILLS = {
  Languages: ['Python', 'C++', 'JavaScript', 'HTML / CSS', 'SQL', 'PHP'],
  Tools: ['PyTorch', 'React', 'Three.js', 'Docker', 'Linux', 'Figma', 'MongoDB', 'Laravel', 'Firebase'],
  Fields: ['Full-stack web', 'UI design', 'Deep learning', 'Computer vision', 'Creative coding', 'VR & games'],
};

const DAILY = [
  ['Climb.jpg', 'Climbing'], ['Ceramics.jpg', 'Ceramics'], ['Crochet.jpg', 'Crochet'],
  ['Sking.jpg', 'Skiing'], ['Perlerbeads.jpg', 'Perler beads'], ['Night.jpg', 'Night at the art center'],
];

const NAV = [['now', 'Now'], ['work', 'Work'], ['gallery', '3D'], ['about', 'About'], ['cv', 'CV']];

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;

export default function App() {
  const [clock, setClock] = useState('');

  // "Live" CV: a ticking Portland clock in the header.
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cv">
      <header className="bar">
        <a href="#top" className="mark">YS</a>
        <nav>
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <span className="live"><i /> Portland {clock}</span>
      </header>

      <section id="top" className="hero">
        <p className="eyebrow">Live CV · updated Oct 2026</p>
        <h1>Yuxin<br />Sun<span className="dot">.</span></h1>
        <div className="hero-foot">
          <p>Software engineer &amp; creative coder. MS Computer Science, Oregon State. I build web tools, 3D worlds and machine-learning things.</p>
          <div className="ctas">
            <a className="btn solid" href={`${PUB}/Resume.pdf`} download="Yuxin_Sun_Resume.pdf">Download CV</a>
            <a className="btn" href="#now">See projects</a>
          </div>
        </div>
        <img className="hero-img" src={`${PUB}/img/yuxin.jpg`} alt="Yuxin Sun" />
      </section>

      <div className="marquee" aria-hidden="true">
        <div>{Array(4).fill('Three.js — React — PyTorch — WebGL — Web Audio — Figma — ').join('')}</div>
      </div>

      <section id="now" className="block">
        <h2 className="huge">Now<sup>03</sup></h2>
        <p className="lede">Recent projects, live on the web.</p>
        <div className="recent">
          {RECENT.map(p => (
            <article key={p.no} className={`proj ${p.tone}`}>
              <div className="proj-head">
                <span>{p.no}</span><span>{p.kind}</span><span>{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <ul className="tags">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
              <div className="proj-links">
                <a href={p.link} target="_blank" rel="noreferrer">Open site <Arrow /></a>
                <a href={p.code} target="_blank" rel="noreferrer">Code <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="block">
        <h2 className="huge">Work<sup>{String(WORK.length).padStart(2, '0')}</sup></h2>
        <p className="lede">Earlier projects from school and side work.</p>
        <div className="work">
          {WORK.map((w, i) => (
            <a key={w.title} className={`tile ${i === 0 ? 'wide' : ''}`} href={w.link} target="_blank" rel="noreferrer">
              <img src={`${PUB}/work/${w.img}`} alt="" loading="lazy" />
              <div className="cap"><h3>{w.title} <Arrow /></h3><p>{w.desc}</p></div>
            </a>
          ))}
        </div>
      </section>

      <section id="gallery" className="block dark">
        <h2 className="huge">3D Gallery</h2>
        <p className="lede">Models I made: drag to orbit, hover to zoom.</p>
        <div className="frame">
          <iframe title="Yuxin's 3D models gallery" src="https://sunyux.github.io/ModelsGallery/" loading="lazy" />
        </div>
        <a className="more" href="https://sunyux.github.io/ModelsGallery/" target="_blank" rel="noreferrer">Open full screen <Arrow /></a>
      </section>

      <section id="about" className="block">
        <h2 className="huge">About</h2>
        <div className="about">
          <img src={`${PUB}/img/Waving.jpg`} alt="Yuxin waving" loading="lazy" />
          <div>
            <p className="big-p">Master’s in Computer Science from Oregon State University. I work across full-stack web development, UI design, deep learning and computer vision, and I love VR, games and anything that turns code into something you can play with.</p>
            <div className="skills">
              {Object.entries(SKILLS).map(([k, list]) => (
                <div key={k}><h4>{k}</h4><ul>{list.map(s => <li key={s}>{s}</li>)}</ul></div>
              ))}
            </div>
          </div>
        </div>
        <h3 className="sub">Off the clock</h3>
        <div className="daily">
          {DAILY.map(([f, t]) => (
            <figure key={f}><img src={`${PUB}/img/${f}`} alt={t} loading="lazy" /><figcaption>{t}</figcaption></figure>
          ))}
        </div>
      </section>

      <section id="cv" className="block cvblock">
        <h2 className="huge">CV</h2>
        <div className="cv-actions">
          <a className="btn solid" href={`${PUB}/Resume.pdf`} download="Yuxin_Sun_Resume.pdf">Download PDF</a>
          <a className="btn" href={`${PUB}/Resume.pdf`} target="_blank" rel="noreferrer">Open in new tab</a>
        </div>
        <object className="pdf" data={`${PUB}/Resume.pdf`} type="application/pdf" aria-label="Resume">
          <p>Your browser can’t show the PDF here. <a href={`${PUB}/Resume.pdf`}>Download it instead.</a></p>
        </object>
      </section>

      <footer className="end">
        <h2 className="huge">Say hi<span className="dot">.</span></h2>
        <div className="contacts">
          <a href="mailto:sunyux411@gmail.com">sunyux411@gmail.com <Arrow /></a>
          <a href="https://www.linkedin.com/in/yuxin-sun-psu/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          <a href="https://github.com/sunyux" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        </div>
        <p className="fine">© {new Date().getFullYear()} Yuxin Sun · Portland, OR</p>
      </footer>
    </div>
  );
}
