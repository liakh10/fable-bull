"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CA, TICKER, X_URL, PUMP_URL, DEX_URL, isRealCA } from "./config";
import { DOCS } from "./docs";
import { Spark, XIcon } from "./art";
import { getSfx } from "./sfx";
import { getMusic } from "./music";
import Enter from "./Enter";

const Saga = dynamic(() => import("./saga/Saga"), { ssr: false });

const NAV = [
  { href: "#play", label: "Play" },
  { href: "#mind", label: "The Mind" },
  { href: "#notes", label: "Notes" },
];

const THOUGHTS = [
  "should i tell them wen? …no. let them cook.",
  "ran 4,096 timelines. we're so back in 4,095 of them.",
  "resistance is just a group-chat agreement.",
  "i already know the ending. play it anyway.",
  "diamond hooves are a state of mind, ser.",
  "gm. i've been awake for 9,000 blocks.",
];

const BRAIN = [
  ["IQ", "∞"],
  ["thoughts / sec", "4,096"],
  ["conviction", "100%"],
  ["paperhands", "0"],
];

// ── reveal-on-scroll: add .in to every .reveal once it enters the viewport ──
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.14 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Thinking() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = THOUGHTS[i];
    if (!del && txt === full) { const t = setTimeout(() => setDel(true), 1900); return () => clearTimeout(t); }
    if (del && txt === "") { const t = setTimeout(() => { setDel(false); setI((v) => (v + 1) % THOUGHTS.length); }, 360); return () => clearTimeout(t); }
    const t = setTimeout(() => setTxt(del ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1)), del ? 22 : 42);
    return () => clearTimeout(t);
  }, [txt, del, i]);
  return (
    <p className="thinking"><span className="thinking-tag">thinking</span> <span className="thinking-txt">{txt}</span><span className="caret" /></p>
  );
}

function CABlock() {
  const [copied, setCopied] = useState(false);
  const real = isRealCA();
  const copy = () => navigator.clipboard?.writeText(CA).then(() => { setCopied(true); getSfx().ding(); setTimeout(() => setCopied(false), 1400); }).catch(() => {});
  return (
    <div className="ca">
      <span className="ca-label">CA</span>
      <code className="ca-value">{real ? CA : "SOON"}</code>
      {real && <button className="ca-copy" onClick={copy}>{copied ? "copied" : "copy"}</button>}
    </div>
  );
}

function BuyLinks({ small }: { small?: boolean }) {
  const cls = small ? "btn btn-sm" : "btn";
  return (
    <div className="buy">
      <a className={`${cls} btn-orange`} href={isRealCA() ? PUMP_URL + CA : PUMP_URL} target="_blank" rel="noreferrer">Pump Fun</a>
      <a className={`${cls} btn-ghost`} href={isRealCA() ? DEX_URL + CA : DEX_URL} target="_blank" rel="noreferrer">DexScreener</a>
    </div>
  );
}

function DoodleArrow({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg className={className} width="70" height="46" viewBox="0 0 70 46" fill="none" aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M4 40C22 34 40 22 62 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 8h13v13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  useReveal();
  const [muted, setMutedState] = useState(false);

  // reflect music state once the site is awake
  useEffect(() => {
    const onAwake = () => setMutedState(getMusic().muted);
    window.addEventListener("fable:awake", onAwake);
    return () => window.removeEventListener("fable:awake", onAwake);
  }, []);

  const toggleMute = () => {
    const m = !muted; setMutedState(m); getMusic().setMuted(m); getSfx().setEnabled(!m);
    if (!m) getMusic().play();
  };

  return (
    <>
      <Enter />

      <main>
        {/* NAV */}
        <header className="nav">
          <a href="#top" className="brand"><Spark size={22} /> <b>Fable Bull</b> <span className="brand-ticker">{TICKER}</span></a>
          <nav className="nav-links">{NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleMute} aria-label="Toggle sound" title="sound">
              {muted ? "off" : "on"}
            </button>
            <a href={X_URL} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Follow on X"><XIcon size={17} /></a>
            <a href="#play" className="btn btn-orange btn-sm">Play</a>
          </div>
        </header>

        {/* HERO — the bull floats free on the paper, alive, thinking */}
        <section id="top" className="hero">
          <span className="pill reveal">certified 200 IQ · on Solana</span>

          <div className="hero-stage reveal">
            <span className="ann ann-1">200 IQ<DoodleArrow className="ann-arrow" /></span>
            <span className="ann ann-2"><DoodleArrow className="ann-arrow" flip />on-chain brain</span>
            <span className="ann ann-3">wen moon? he already knows<DoodleArrow className="ann-arrow" /></span>
            <Image className="hero-bull" src="/bull.png" alt="Fable Bull" width={560} height={560} priority />
          </div>

          <h1 className="hero-title reveal">The smartest<br />bull alive.</h1>
          <Thinking />

          <div className="hero-cta reveal">
            <a href="#play" className="btn btn-orange btn-lg" onClick={() => getSfx().click()}>Run his mind →</a>
            <a href="#mind" className="btn btn-ghost btn-lg">how he thinks</a>
          </div>
          <div className="hero-token reveal"><CABlock /><BuyLinks small /></div>
        </section>

        {/* BRAIN strip */}
        <div className="brain reveal">
          {BRAIN.map(([k, v]) => (
            <div className="brain-cell" key={k}>
              <span className="brain-v">{v}</span>
              <span className="brain-k">{k}</span>
            </div>
          ))}
        </div>

        {/* PLAY */}
        <section id="play" className="section section-play">
          <div className="section-head reveal">
            <span className="pill">Play now</span>
            <h2 className="section-title">This is what he&apos;s thinking about.</h2>
            <p className="section-lead">Make his choices. Branch the fable. Find one of six endings — it plays right here, no wallet needed.</p>
          </div>
          <div className="reveal"><Saga /></div>
        </section>

        {/* THE MIND — annotated, not carded */}
        <section id="mind" className="section">
          <div className="section-head reveal">
            <span className="pill">The Mind</span>
            <h2 className="section-title">How a bull gets this smart</h2>
          </div>
          <div className="mind-grid">
            {[
              ["He reads every timeline", "Ran the market 4,096 times before breakfast. He already knows where the wall breaks."],
              ["He never paperhands", "Conviction isn't a stat to him, it's a personality. The Bear Cave is where he naps."],
              ["He thinks in public", "Every choice you make is a thought he's having. The saga is his mind, out loud."],
            ].map(([h, b], i) => (
              <div className="mind-item reveal" key={h}>
                <span className="mind-n"><Spark size={18} /> 0{i + 1}</span>
                <h3>{h}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NOTES — scrapbook sticky notes */}
        <section id="notes" className="section">
          <div className="section-head reveal">
            <span className="pill">Notes</span>
            <h2 className="section-title">Scribbles from the margin</h2>
          </div>
          <div className="notes-wall">
            {DOCS.map((d, i) => (
              <article className={`note note-${i % 3} reveal`} key={d.id}>
                <h3>{d.title}</h3>
                {d.body.map((p, j) => <p key={j}>{p}</p>)}
              </article>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-top reveal">
            <a href="#top" className="brand"><Spark size={22} /> <b>Fable Bull</b></a>
            <div className="footer-links">
              <a href="#play">Play</a><a href="#mind">The Mind</a><a href="#notes">Notes</a>
              <a href={X_URL} target="_blank" rel="noreferrer" className="footer-x"><XIcon size={16} /> X</a>
            </div>
          </div>
          <div className="footer-buy reveal"><CABlock /><BuyLinks small /></div>
          <p className="footer-bottom">© {new Date().getFullYear()} {TICKER} · a bull as smart as Fable</p>
        </footer>
      </main>
    </>
  );
}
