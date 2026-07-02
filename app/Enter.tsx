"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getMusic } from "./music";
import { getSfx } from "./sfx";
import { Spark } from "./art";

const BOOT_LINES = [
  "booting fable-bull.exe",
  "loading 200 IQ weights",
  "mounting the spark",
  "calibrating horns",
  "downloading conviction",
  "waking the bull",
];

type Phase = "boot" | "wake" | "gone";

// Full-screen intro: an AI-style boot loader → a "tap to wake" splash that starts
// the music (gesture-unlock) and reveals the site. Fires window "fable:awake" so
// the page can kick off its reveal animations.
export default function Enter() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [pct, setPct] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  // lock scroll while the overlay is up
  useEffect(() => {
    if (phase !== "gone") document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  // boot progress + streaming log
  useEffect(() => {
    if (phase !== "boot") return;
    let p = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + 3 + Math.random() * 6);
      setPct(Math.round(p));
      const shouldHave = Math.min(BOOT_LINES.length, Math.ceil((p / 100) * BOOT_LINES.length));
      setLines((prev) => (prev.length < shouldHave ? BOOT_LINES.slice(0, shouldHave) : prev));
      if (p >= 100) { clearInterval(id); setTimeout(() => setPhase("wake"), 420); }
    }, 130);
    return () => clearInterval(id);
  }, [phase]);

  const wake = () => {
    if (done.current) return;
    done.current = true;
    try { getMusic().play(); } catch { /* */ }
    getSfx().begin();
    setLeaving(true);
    window.dispatchEvent(new Event("fable:awake"));
    setTimeout(() => setPhase("gone"), 720);
  };

  if (phase === "gone") return null;

  return (
    <div className={`enter ${leaving ? "enter-leaving" : ""}`}>
      {phase === "boot" && (
        <div className="boot">
          <div className="boot-spark"><Spark size={44} /></div>
          <p className="boot-title">FABLE BULL</p>
          <div className="boot-bar"><span className="boot-fill" style={{ width: `${pct}%` }} /></div>
          <p className="boot-pct">{pct}%</p>
          <ul className="boot-log">
            {lines.map((l, i) => (
              <li key={i}>
                <span className="boot-ok">ok</span> {l}
                <span className="boot-dots">…</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {phase === "wake" && (
        <button className="wake" onClick={wake} aria-label="Tap to wake the bull">
          <span className="wake-img">
            <Image src="/bull.png" alt="Fable Bull" width={360} height={360} priority />
          </span>
          <span className="wake-cta">tap to wake the bull</span>
          <span className="wake-sub">sound on · it thinks better with music</span>
        </button>
      )}
    </div>
  );
}
