"use client";

import { useRef, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  SAGA, START_ID, START_STATS, ALL_ENDINGS,
  type Stats, type StatKey, type Choice,
} from "./data";
import { Scene, Spark, IconConviction, IconBag, IconHopium } from "../art";
import { getMusic } from "../music";
import { getSfx } from "../sfx";
import { getEndings, addEnding, getBestConviction, saveBestConviction, getMuted, setMuted } from "../store";

const STAT_META: { key: StatKey; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { key: "conviction", label: "Conviction", Icon: IconConviction },
  { key: "bag", label: "Bag", Icon: IconBag },
  { key: "hopium", label: "Hopium", Icon: IconHopium },
];

function convictionScore(s: Stats) { return s.conviction * 12 + s.bag * 6 + s.hopium * 6; }

export default function Saga() {
  const { setVisible } = useWalletModal();

  const [entered, setEntered] = useState(false);
  const [nodeId, setNodeId] = useState(START_ID);
  const [stats, setStats] = useState<Stats>({ ...START_STATS });
  const [turning, setTurning] = useState(false);
  // Lazily read persisted progress (component is client-only via dynamic ssr:false).
  const [collected, setCollected] = useState<string[]>(() => (typeof window !== "undefined" ? getEndings() : []));
  const [best, setBest] = useState(() => (typeof window !== "undefined" ? getBestConviction() : 0));
  const [muted, setMutedState] = useState(() => (typeof window !== "undefined" ? getMuted() : false));
  const bookRef = useRef<HTMLDivElement>(null);

  const node = SAGA[nodeId];

  const enter = () => {
    const music = getMusic();
    if (!getMuted()) music.play();     // start music on the entering gesture (autoplay unlock)
    getSfx().begin();
    setEntered(true);
  };

  const restart = () => {
    getSfx().pageTurn();
    setTurning(true);
    setTimeout(() => {
      setNodeId(START_ID);
      setStats({ ...START_STATS });
      setTurning(false);
    }, 260);
  };

  const choose = (c: Choice) => {
    getSfx().choice();
    setTurning(true);
    const next = { ...stats };
    if (c.effect) for (const k of Object.keys(c.effect) as StatKey[]) next[k] = Math.max(0, next[k] + (c.effect[k] ?? 0));
    setTimeout(() => {
      setStats(next);
      setNodeId(c.to);
      setTurning(false);
      bookRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      // Reaching an ending: chime, collect it, record best score — done here (not in
      // an effect) so it fires exactly once, on the transition into the ending.
      const target = SAGA[c.to];
      if (target.ending) {
        const score = convictionScore(next);
        if (target.ending.tone === "down") getSfx().doom(); else getSfx().ending();
        setCollected(addEnding(target.ending.key));
        if (saveBestConviction(score)) setBest(score);
      }
    }, 260);
  };

  const toggleMute = () => {
    const m = !muted; setMutedState(m); setMuted(m);
    getMusic().setMuted(m); getSfx().setEnabled(!m);
    if (!m) getMusic().play();
  };

  const visibleChoices = (node.choices ?? []).filter((c) => !c.requires || stats[c.requires.stat] >= c.requires.min);

  const score = convictionScore(stats);

  // ── Gate ──
  if (!entered) {
    return (
      <div className="gate">
        <div className="gate-plate">
          <div className="gate-spark"><Spark size={40} /></div>
          <p className="eyebrow">Season One · A fable in chapters</p>
          <h3 className="gate-title">Open the Book</h3>
          <p className="gate-sub">
            Guide the bull with the mind of a spark through a branching saga. Every choice bends the tale
            toward one of five endings. A story, not a bet.
          </p>
          <div className="gate-actions">
            <button className="btn btn-coral" onClick={() => { getSfx().click(); setVisible(true); enter(); }}>
              Connect Wallet
            </button>
            <button className="btn btn-outline" onClick={() => { getSfx().click(); enter(); }}>
              Read as Guest
            </button>
          </div>
          <p className="gate-note">Wallet is only a doorway — no transactions, no real money.</p>
        </div>
      </div>
    );
  }

  const ending = node.ending;

  return (
    <div className="saga">
      {/* stats + controls */}
      <div className="saga-top">
        <div className="stats">
          {STAT_META.map(({ key, label, Icon }) => (
            <div className="stat" key={key} title={label}>
              <span className="stat-ic"><Icon size={18} /></span>
              <span className="stat-label">{label}</span>
              <span className="stat-bar"><span className="stat-fill" style={{ width: `${Math.min(100, stats[key] * 10)}%` }} /></span>
              <span className="stat-val">{stats[key]}</span>
            </div>
          ))}
        </div>
        <button className="mute" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? "Sound off" : "Sound on"}
        </button>
      </div>

      {/* the book plate */}
      <div ref={bookRef} className={`book ${turning ? "turning" : ""}`}>
        <div className="book-scene">
          <Scene id={node.artId} className="scene-svg" />
          <span className="chapter-tag">Chapter {node.chapter}</span>
        </div>
        <div className="book-text">
          <h3 className="book-title">{node.title}</h3>
          {node.prose.map((p, i) => (
            <p key={i} className={i === 0 ? "prose dropcap" : "prose"}>{p}</p>
          ))}

          {ending ? (
            <div className={`ending ending-${ending.tone}`}>
              <p className="eyebrow">{ending.tone === "secret" ? "Secret ending" : "Ending"}</p>
              <h4 className="ending-name"><Spark size={20} /> {ending.name}</h4>
              <p className="ending-blurb">{ending.blurb}</p>
              <div className="ending-meta">
                <span>Conviction score <b>{score}</b></span>
                <span>Best <b>{best}</b></span>
              </div>
              <button className="btn btn-coral" onClick={restart}>Begin a new fable</button>
            </div>
          ) : (
            <div className="choices">
              {visibleChoices.map((c) => (
                <button
                  key={c.to + c.label}
                  className={`choice ${c.hint?.startsWith("???") ? "choice-secret" : ""}`}
                  onClick={() => choose(c)}
                  onMouseEnter={() => getSfx().hover()}
                >
                  <span className="choice-label">{c.label}</span>
                  {c.hint && <span className="choice-hint">{c.hint}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* endings gallery */}
      <div className="gallery">
        <p className="gallery-title">Endings collected — {collected.length}/{ALL_ENDINGS.length}</p>
        <div className="gallery-grid">
          {ALL_ENDINGS.map((e) => {
            const has = collected.includes(e.key);
            return (
              <div key={e.key} className={`slot ${has ? "found" : "locked"} slot-${e.tone}`}>
                <span className="slot-name">{has ? e.name : e.tone === "secret" ? "??? Secret" : "Undiscovered"}</span>
                <span className="slot-tone">{has ? (e.tone === "secret" ? "secret" : e.tone === "up" ? "victory" : "cautionary") : "locked"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
