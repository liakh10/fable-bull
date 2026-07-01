"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CA, TICKER, TOKEN_NAME, X_URL, PUMP_URL, DEX_URL, isRealCA } from "./config";
import { DOCS } from "./docs";
import { SAGA, ALL_ENDINGS } from "./saga/data";
import { BullMascot, Spark, XIcon, Scene } from "./art";
import { getSfx } from "./sfx";

// Saga + scroll-bull are client-only; load without SSR to avoid hydration noise.
const Saga = dynamic(() => import("./saga/Saga"), { ssr: false });
const ScrollBull = dynamic(() => import("./ScrollBull"), { ssr: false });

const NAV = [
  { href: "#play", label: "Play" },
  { href: "#fable", label: "The Fable" },
  { href: "#chapters", label: "Chapters" },
  { href: "#docs", label: "Docs" },
];

// The Season One chapters, for the master-detail explorer (drawn from the saga).
const CHAPTER_LIST = [
  { id: "awaken", n: 1, name: "The Bull Awakens" },
  { id: "resistance", n: 2, name: "The Wall of Resistance" },
  { id: "whale", n: 3, name: "The Whale Surfaces" },
  { id: "bearcave", n: 4, name: "The Bear Cave" },
  { id: "temple", n: 5, name: "The Diamond Temple" },
  { id: "moon", n: 5, name: "The Approach" },
];

const FEATURES = [
  { title: "A Branching Saga", body: "Eight illustrated chapters that fork on every choice. No two readings tell the same tale." },
  { title: "Five Endings + One", body: "From Ascended to the Moon to Rekt in the Bear Cave — plus a secret sixth page few ever find." },
  { title: "Play Right Here", body: "No download, no install. Open the book on the page and make your choices instantly." },
  { title: "Yours to Keep", body: "Endings and best Conviction score save locally. Collect the whole canon of the valley." },
];

function CABlock() {
  const [copied, setCopied] = useState(false);
  const real = isRealCA();
  const copy = () => {
    navigator.clipboard?.writeText(CA).then(() => { setCopied(true); getSfx().ding(); setTimeout(() => setCopied(false), 1400); }).catch(() => {});
  };
  return (
    <div className="ca">
      <span className="ca-label">Contract</span>
      <code className="ca-value">{real ? CA : "SOON"}</code>
      {real && (
        <button className="ca-copy" onClick={copy} aria-label="Copy contract address">
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

function BuyLinks({ small }: { small?: boolean }) {
  const cls = small ? "btn btn-sm" : "btn";
  return (
    <div className="buy-links">
      <a className={`${cls} btn-coral`} href={isRealCA() ? PUMP_URL + CA : PUMP_URL} target="_blank" rel="noreferrer">Pump Fun</a>
      <a className={`${cls} btn-outline`} href={isRealCA() ? DEX_URL + CA : DEX_URL} target="_blank" rel="noreferrer">DexScreener</a>
    </div>
  );
}

function ChapterExplorer() {
  const [sel, setSel] = useState(CHAPTER_LIST[0].id);
  const node = SAGA[sel];
  return (
    <div className="explorer">
      <ul className="explorer-list">
        {CHAPTER_LIST.map((c) => (
          <li key={c.id}>
            <button
              className={`explorer-item ${sel === c.id ? "active" : ""}`}
              onClick={() => { setSel(c.id); getSfx().pageTurn(); }}
              onMouseEnter={() => getSfx().hover()}
            >
              <span className="explorer-n">{String(c.n).padStart(2, "0")}</span>
              <span className="explorer-name">{c.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="explorer-detail">
        <div className="explorer-scene"><Scene id={node.artId} className="scene-svg" /></div>
        <div className="explorer-copy">
          <p className="eyebrow">Chapter {node.chapter}</p>
          <h3 className="explorer-title">{node.title}</h3>
          <p className="prose">{node.prose[0]}</p>
          <a href="#play" className="btn btn-coral btn-sm">Play this saga</a>
        </div>
      </div>
    </div>
  );
}

function Accordion() {
  const [open, setOpen] = useState<string | null>(DOCS[0].id);
  return (
    <div className="accordion">
      {DOCS.map((d) => {
        const isOpen = open === d.id;
        return (
          <div key={d.id} className={`acc-item ${isOpen ? "open" : ""}`}>
            <button className="acc-head" onClick={() => { setOpen(isOpen ? null : d.id); getSfx().click(); }}>
              <span>{d.title}</span>
              <span className="acc-sign">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && (
              <div className="acc-body">
                {d.body.map((p, i) => <p key={i} className="prose">{p}</p>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <ScrollBull />

      {/* NAV */}
      <header className="nav">
        <a href="#top" className="brand"><Spark size={22} /> <b>Fable Bull</b> <span className="brand-ticker">{TICKER}</span></a>
        <nav className="nav-links">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="nav-actions">
          <a href={X_URL} target="_blank" rel="noreferrer" className="nav-x" aria-label="Follow on X"><XIcon size={18} /></a>
          <a href="#play" className="btn btn-coral btn-sm">Play now</a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="pill">Season One · A fable in chapters</span>
            <h1 className="hero-title">Fable<span className="hero-title-spark"><Spark size={54} /></span>Bull</h1>
            <p className="hero-tag">
              A bull with the mind of a spark climbs toward the moon. You hold the pen — every choice
              bends the saga toward one of five endings, and a sixth that hides. Playable right on this page.
            </p>
            <div className="hero-cta">
              <a href="#play" className="btn btn-coral btn-lg">Play the Fable</a>
              <a href="#docs" className="btn btn-outline btn-lg">Read the Whitepaper</a>
            </div>
            <div className="hero-token">
              <CABlock />
              <BuyLinks small />
            </div>
          </div>
          <div className="hero-art">
            <BullMascot className="mascot" />
          </div>
        </div>
      </section>

      {/* PLAY — front and centre */}
      <section id="play" className="section section-play">
        <div className="section-head">
          <span className="pill">Play now</span>
          <h2 className="section-title">Open the book</h2>
          <p className="section-lead">The Fable Saga plays right here. Make your choices and find your ending.</p>
        </div>
        <Saga />
      </section>

      {/* FEATURES */}
      <section id="fable" className="section">
        <div className="section-head">
          <span className="pill">The Fable</span>
          <h2 className="section-title">An illustrated saga you actually play</h2>
          <p className="section-lead">{TOKEN_NAME} is a gamebook. Read a chapter, choose a path, live with the ending.</p>
        </div>
        <div className="features">
          {FEATURES.map((f) => (
            <article key={f.title} className="feature">
              <Spark size={22} className="feature-spark" />
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
        <div className="section-cta">
          <a href="#play" className="btn btn-coral btn-lg">Start reading — it&apos;s free</a>
        </div>
      </section>

      {/* CHAPTERS / ENDINGS explorer */}
      <section id="chapters" className="section">
        <div className="section-head">
          <span className="pill">Chapters &amp; Endings</span>
          <h2 className="section-title">Turn the pages</h2>
          <p className="section-lead">The paths of Season One — and the {ALL_ENDINGS.length} endings that close them.</p>
        </div>
        <ChapterExplorer />
        <div className="endings-row">
          {ALL_ENDINGS.map((e) => (
            <div key={e.key} className={`endcard endcard-${e.tone}`}>
              <span className="endcard-tone">{e.tone === "secret" ? "Secret" : e.tone === "up" ? "Victory" : "Cautionary"}</span>
              <h4>{e.tone === "secret" ? "??? " : ""}{e.name}</h4>
              <p>{e.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCS */}
      <section id="docs" className="section">
        <div className="section-head">
          <span className="pill">Whitepaper &amp; Docs</span>
          <h2 className="section-title">The full canon</h2>
          <p className="section-lead">Everything about the valley, the climb, and the saga.</p>
        </div>
        <Accordion />
        <div className="section-cta">
          <a href="#play" className="btn btn-coral btn-lg">Enough reading — play it</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand"><Spark size={22} /> <b>Fable Bull</b></a>
            <p className="footer-note">An illustrated fable on Solana. Open the book and make your choices.</p>
            <BuyLinks small />
          </div>
          <div className="footer-col">
            <p className="footer-h">Game</p>
            <a href="#play">Play</a>
            <a href="#chapters">Chapters</a>
            <a href="#chapters">Endings</a>
          </div>
          <div className="footer-col">
            <p className="footer-h">Resources</p>
            <a href="#docs">Whitepaper</a>
            <a href={X_URL} target="_blank" rel="noreferrer" className="footer-x"><XIcon size={16} /> Follow on X</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {TOKEN_NAME}. {TICKER}</span>
          <span className="footer-disc">Season One · The Climb</span>
        </div>
      </footer>
    </main>
  );
}
