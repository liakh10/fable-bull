"use client";

import { useEffect, useRef } from "react";
import { RunningBull } from "./art";

// The site's gimmick: a little bull that gallops down the left margin as you scroll,
// tracking reading progress. Position is set directly on the node (no re-renders).
export default function ScrollBull() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const travel = window.innerHeight - 130;         // keep it on-screen top→bottom
      el.style.transform = `translateY(${p * travel}px)`;
      el.style.opacity = window.scrollY > 40 ? "1" : "0";
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="scrollbull" aria-hidden>
      <RunningBull className="scrollbull-svg" />
      <span className="scrollbull-dust" />
    </div>
  );
}
