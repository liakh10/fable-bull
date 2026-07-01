// Authored SVG art for Fable Bull — an editorial line-art storybook.
// Everything is drawn on transparent ground so the cream "paper" shows through.
// Palette via CSS vars: --ink (line), --coral (accent), --gold/--sage (secondary).
import type { CSSProperties, FC } from "react";

const INK = "var(--ink)";
const CORAL = "var(--coral)";
const GOLD = "var(--gold)";
const SAGE = "var(--sage)";

// ── The spark: Claude/Fable mark, a hand-inked four-point star. Recurring motif. ──
export const Spark: FC<{ size?: number; className?: string; style?: CSSProperties }> = ({ size = 28, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden>
    <path
      d="M24 2c1.6 9.4 4.7 15 10.1 18.4C39.5 23.8 46 24.8 46 24.8s-6.5 1-11.9 4.4C28.7 32.6 25.6 38.2 24 46c-1.6-7.8-4.7-13.4-10.1-16.8C8.5 25.8 2 24.8 2 24.8s6.5-1 11.9-4.4C19.3 17 22.4 11.4 24 2Z"
      fill={CORAL}
    />
  </svg>
);

// ── Custom X (twitter) glyph, inked to match the editorial line weight. ──
export const XIcon: FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M3 3l7.6 9.9L3.4 21h2.3l5.8-6.7L16.6 21H21l-8-10.4L20.4 3h-2.3l-5.4 6.2L7.7 3H3Z" fill="currentColor" />
  </svg>
);

// ── The hero mascot: a noble bull whose mind is a spark (third-eye between horns). ──
// Line-art, coral accents, faintly editorial. Used large in the hero.
export const BullMascot: FC<{ className?: string; style?: CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 320 320" fill="none" className={className} style={style} aria-label="Fable Bull" role="img">
    {/* halo disc behind */}
    <circle cx="160" cy="150" r="128" fill={GOLD} opacity="0.16" />
    <circle cx="160" cy="150" r="128" stroke={CORAL} strokeWidth="1.5" strokeDasharray="2 7" opacity="0.5" />
    {/* face mass */}
    <path
      d="M160 66c40 0 66 26 70 58 3 24-4 44-18 62-13 17-32 30-52 30s-39-13-52-30c-14-18-21-38-18-62 4-32 30-58 70-58Z"
      fill="var(--paper)" stroke={INK} strokeWidth="4"
    />
    {/* cheek shading */}
    <path d="M108 150c-2 20 4 40 18 56M212 150c2 20-4 40-18 56" stroke={INK} strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
    {/* horns */}
    <path d="M96 96c-26-10-46-6-58 8 18-2 30 4 42 20" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <path d="M224 96c26-10 46-6 58 8-18-2-30 4-42 20" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <path d="M96 96c-26-10-46-6-58 8 18-2 30 4 42 20" fill={GOLD} opacity="0.5" />
    <path d="M224 96c26-10 46-6 58 8-18-2-30 4-42 20" fill={GOLD} opacity="0.5" />
    {/* ears */}
    <path d="M92 118c-20 2-34 12-40 28 16-6 30-6 44 2Z" fill="var(--paper)" stroke={INK} strokeWidth="4" />
    <path d="M228 118c20 2 34 12 40 28-16-6-30-6-44 2Z" fill="var(--paper)" stroke={INK} strokeWidth="4" />
    {/* eyes */}
    <ellipse cx="128" cy="168" rx="10" ry="12" fill={INK} />
    <ellipse cx="192" cy="168" rx="10" ry="12" fill={INK} />
    <circle cx="131" cy="164" r="3" fill="var(--paper)" />
    <circle cx="195" cy="164" r="3" fill="var(--paper)" />
    {/* muzzle */}
    <path d="M132 210c8-8 48-8 56 0 6 8 4 22-10 30-8 4-28 4-36 0-14-8-16-22-10-30Z" fill={GOLD} opacity="0.35" stroke={INK} strokeWidth="4" />
    <ellipse cx="143" cy="230" rx="5" ry="6" fill={INK} />
    <ellipse cx="177" cy="230" rx="5" ry="6" fill={INK} />
    {/* the spark — its mind, between the horns */}
    <g transform="translate(160 96)">
      <path
        d="M0-30c1.4 8.4 4.2 13.4 9 16.4C13.8-10.6 20-10 20-10s-6.2.6-11 3.6C4.2-3.4 1.4 1.6 0 10c-1.4-8.4-4.2-13.4-9-16.4C-13.8-9.4-20-10-20-10s6.2-.6 11-3.6C-4.2-16.6-1.4-21.6 0-30Z"
        fill={CORAL}
      />
    </g>
  </svg>
);

// ═══════════════════════════════ SCENES ═══════════════════════════════
// Each scene fills its frame (viewBox 0 0 400 300), line-art on transparent.
type SceneProps = { className?: string; style?: CSSProperties };

const Ground: FC = () => <line x1="0" y1="252" x2="400" y2="252" stroke={INK} strokeWidth="2" opacity="0.5" />;

const SValley: FC<SceneProps> = (p) => (
  <svg viewBox="0 0 400 300" fill="none" {...p} aria-hidden>
    <circle cx="300" cy="86" r="40" fill={GOLD} opacity="0.35" />
    <path d="M0 210q80-60 150-30 70 30 130-10 60-38 120 0v130H0Z" fill={SAGE} opacity="0.2" />
    <path d="M0 210q80-60 150-30 70 30 130-10 60-38 120 0" stroke={INK} strokeWidth="2" opacity="0.5" />
    {/* a small bull on the road, looking up */}
    <g transform="translate(150 178)">
      <ellipse cx="20" cy="34" rx="34" ry="20" fill="var(--paper)" stroke={INK} strokeWidth="3" />
      <circle cx="52" cy="20" r="16" fill="var(--paper)" stroke={INK} strokeWidth="3" />
      <path d="M44 8c-8-6-16-6-22-2M60 8c8-6 16-6 22-2" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <circle cx="52" cy="6" r="4" fill={CORAL} />
      <path d="M4 50l-4 16M18 52l0 16M30 52l2 16M40 50l6 16" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
    <Ground />
  </svg>
);

const SResistance: FC<SceneProps> = (p) => (
  <svg viewBox="0 0 400 300" fill="none" {...p} aria-hidden>
    {/* a great wall of resistance — a downward candle line */}
    <path d="M20 60L120 90 200 70 280 130 380 120" stroke={CORAL} strokeWidth="3" fill="none" />
    {[[120,90],[200,70],[280,130]].map(([x,y],i)=>(
      <g key={i}><line x1={x} y1={y-22} x2={x} y2={y+22} stroke={INK} strokeWidth="2"/><rect x={x-9} y={y-10} width="18" height="20" fill={i===2?SAGE:CORAL} stroke={INK} strokeWidth="2"/></g>
    ))}
    <line x1="16" y1="150" x2="384" y2="150" stroke={INK} strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" />
    <text x="200" y="176" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill={INK} opacity="0.6">RESISTANCE</text>
    {/* bull pushing against the wall */}
    <g transform="translate(120 196)">
      <ellipse cx="30" cy="30" rx="40" ry="22" fill="var(--paper)" stroke={INK} strokeWidth="3" />
      <circle cx="70" cy="18" r="16" fill="var(--paper)" stroke={INK} strokeWidth="3" />
      <path d="M62 6c-8-6-16-6-22-2M78 6c8-6 16-6 22-2" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <circle cx="70" cy="4" r="4" fill={CORAL} />
      <path d="M8 48l-6 14M22 50l-2 14M38 50l2 14" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
    <Ground />
  </svg>
);

const SBearCave: FC<SceneProps> = (p) => (
  <svg viewBox="0 0 400 300" fill="none" {...p} aria-hidden>
    <path d="M40 250q0-150 160-150T360 250Z" fill={INK} opacity="0.85" />
    <path d="M40 250q0-150 160-150T360 250" stroke={INK} strokeWidth="3" fill="none" />
    {/* a red downward arrow inside the dark */}
    <path d="M200 120v70M180 172l20 22 20-22" stroke={CORAL} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* bear eyes glowing */}
    <circle cx="168" cy="150" r="6" fill={GOLD} />
    <circle cx="232" cy="150" r="6" fill={GOLD} />
    <Ground />
  </svg>
);

const SWhale: FC<SceneProps> = (p) => (
  <svg viewBox="0 0 400 300" fill="none" {...p} aria-hidden>
    <path d="M0 150q100-30 200 0t200 0v150H0Z" fill={SAGE} opacity="0.18" />
    {/* a whale surfacing */}
    <path d="M70 190q60-70 170-40 70 20 90 60-30 26-120 26T90 216q-14-10-20-26Z" fill="var(--paper)" stroke={INK} strokeWidth="3" />
    <path d="M320 208q28-6 40 8-12 10-30 6Z" fill={GOLD} opacity="0.4" stroke={INK} strokeWidth="3" />
    <circle cx="120" cy="196" r="5" fill={INK} />
    {/* spout */}
    <path d="M132 150q-6-30 6-46M132 150q6-30 20-40" stroke={CORAL} strokeWidth="3" strokeLinecap="round" />
    <Ground />
  </svg>
);

const SMoon: FC<SceneProps> = (p) => (
  <svg viewBox="0 0 400 300" fill="none" {...p} aria-hidden>
    <circle cx="300" cy="90" r="56" fill={GOLD} opacity="0.4" stroke={INK} strokeWidth="2" />
    <circle cx="286" cy="78" r="8" fill={INK} opacity="0.15" /><circle cx="316" cy="100" r="6" fill={INK} opacity="0.15" />
    {/* a rising green arrow / trajectory */}
    <path d="M40 250L140 200 200 150 280 96" stroke={SAGE} strokeWidth="3" fill="none" />
    <path d="M262 92l22-4-4 22" stroke={SAGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* bull leaping upward, spark trailing */}
    <g transform="translate(96 150) rotate(-24)">
      <ellipse cx="24" cy="30" rx="36" ry="20" fill="var(--paper)" stroke={INK} strokeWidth="3" />
      <circle cx="58" cy="18" r="15" fill="var(--paper)" stroke={INK} strokeWidth="3" />
      <circle cx="58" cy="4" r="4" fill={CORAL} />
      <path d="M6 46l-8 12M20 48l-4 14M34 48l2 14" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
    {[[70,210],[54,232],[88,224]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="2.5" fill={CORAL} opacity="0.7" />))}
    <Ground />
  </svg>
);

const STemple: FC<SceneProps> = (p) => (
  <svg viewBox="0 0 400 300" fill="none" {...p} aria-hidden>
    {/* a diamond-hands temple on a hill */}
    <path d="M120 120h160l-24-40H144Z" fill={GOLD} opacity="0.3" stroke={INK} strokeWidth="3" />
    {[140,180,220,260].map((x)=>(<line key={x} x1={x} y1="120" x2={x} y2="210" stroke={INK} strokeWidth="4" />))}
    <line x1="112" y1="212" x2="288" y2="212" stroke={INK} strokeWidth="4" />
    {/* a diamond floating above */}
    <path d="M200 30l24 26-24 34-24-34Z" fill={SAGE} opacity="0.4" stroke={CORAL} strokeWidth="3" />
    <path d="M176 56h48M200 30v74" stroke={CORAL} strokeWidth="1.5" opacity="0.7" />
    <Ground />
  </svg>
);

const SExile: FC<SceneProps> = (p) => (
  <svg viewBox="0 0 400 300" fill="none" {...p} aria-hidden>
    {/* barren dunes, lone bull walking away */}
    <path d="M0 220q100-40 200-10t200-6v96H0Z" fill={GOLD} opacity="0.16" />
    <path d="M0 220q100-40 200-10t200-6" stroke={INK} strokeWidth="2" opacity="0.5" />
    <circle cx="70" cy="70" r="30" fill={CORAL} opacity="0.25" />
    <g transform="translate(250 176) scale(-1 1)">
      <ellipse cx="20" cy="34" rx="30" ry="18" fill="var(--paper)" stroke={INK} strokeWidth="3" />
      <circle cx="48" cy="24" r="13" fill="var(--paper)" stroke={INK} strokeWidth="3" />
      <circle cx="48" cy="12" r="3.5" fill={INK} opacity="0.4" />
      <path d="M6 50l-4 14M18 52l0 14M30 50l4 14" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
    {/* torn paper-hand */}
    <path d="M120 150l14 6-6 14 12 4-4 14" stroke={INK} strokeWidth="2.5" fill="none" opacity="0.5" />
    <Ground />
  </svg>
);

const SAscension: FC<SceneProps> = (p) => (
  <svg viewBox="0 0 400 300" fill="none" {...p} aria-hidden>
    {/* the secret ending: the bull becomes pure spark, ascending in rays */}
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2; const x = 200 + Math.cos(a) * 130; const y = 130 + Math.sin(a) * 100;
      return <line key={i} x1="200" y1="130" x2={x} y2={y} stroke={GOLD} strokeWidth="2" opacity="0.4" />;
    })}
    <circle cx="200" cy="130" r="70" fill={GOLD} opacity="0.14" />
    {/* large spark */}
    <g transform="translate(200 130) scale(2.4)">
      <path
        d="M0-30c1.4 8.4 4.2 13.4 9 16.4C13.8-10.6 20-10 20-10s-6.2.6-11 3.6C4.2-3.4 1.4 1.6 0 10c-1.4-8.4-4.2-13.4-9-16.4C-13.8-9.4-20-10-20-10s6.2-.6 11-3.6C-4.2-16.6-1.4-21.6 0-30Z"
        fill={CORAL}
      />
    </g>
    {/* faint horns fading into light */}
    <path d="M150 96c-20-10-34-8-42 2M250 96c20-10 34-8 42 2" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
    <Ground />
  </svg>
);

// Registry: artId → scene component.
const SCENES: Record<string, FC<SceneProps>> = {
  valley: SValley,
  resistance: SResistance,
  bearcave: SBearCave,
  whale: SWhale,
  moon: SMoon,
  temple: STemple,
  exile: SExile,
  ascension: SAscension,
};

export const Scene: FC<{ id: string } & SceneProps> = ({ id, ...rest }) => {
  const C = SCENES[id] ?? SValley;
  return <C {...rest} />;
};

export const SCENE_IDS = Object.keys(SCENES);

// ── Small custom stat icons (no emoji): conviction / bag / hopium ──
export const IconConviction: FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l7 4v5c0 5-3 7-7 9-4-2-7-4-7-9V7l7-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconBag: FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 8h12l1.5 12H4.5L6 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const IconHopium: FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 21c5-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 3 8 8 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
    <path d="M12 4v6M12 10l4 3M12 10l-4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
