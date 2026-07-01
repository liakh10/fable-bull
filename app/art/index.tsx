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
    <defs>
      {/* hand-drawn wobble: displace every stroke with fractal noise (pencil feel) */}
      <filter id="hd-hero" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    {/* halo disc behind */}
    <circle cx="160" cy="152" r="130" fill={GOLD} opacity="0.14" />
    <circle cx="160" cy="152" r="130" stroke={CORAL} strokeWidth="1.5" strokeDasharray="1 9" opacity="0.45" />

    <g filter="url(#hd-hero)" strokeLinecap="round" strokeLinejoin="round">
      {/* horns — two rough strokes each */}
      <path d="M104 108C78 90 50 86 34 100c18-4 34 4 50 24" fill={GOLD} fillOpacity="0.35" stroke={INK} strokeWidth="4.5" />
      <path d="M216 108c26-18 54-22 70-8-18-4-34 4-50 24" fill={GOLD} fillOpacity="0.35" stroke={INK} strokeWidth="4.5" />
      <path d="M40 101c14-2 27 5 41 22" stroke={INK} strokeWidth="2" opacity="0.5" fill="none" />
      <path d="M280 101c-14-2-27 5-41 22" stroke={INK} strokeWidth="2" opacity="0.5" fill="none" />

      {/* ears */}
      <path d="M96 132c-24-2-42 8-50 26 18-8 33-7 48 3Z" fill="var(--paper)" stroke={INK} strokeWidth="4.5" />
      <path d="M224 132c24-2 42 8 50 26-18-8-33-7-48 3Z" fill="var(--paper)" stroke={INK} strokeWidth="4.5" />

      {/* head — a loose, slightly lopsided outline (hand-drawn) */}
      <path
        d="M160 74c42-1 71 25 76 60 3 22-2 41-14 59-13 20-35 37-62 37s-49-17-62-37c-12-18-17-37-14-59 5-35 34-61 76-60Z"
        fill="var(--paper)" stroke={INK} strokeWidth="5"
      />
      {/* forelock scribbles */}
      <path d="M138 96c6 8 6 16 2 24M160 92c2 9 2 17-2 25M182 96c-6 8-6 16-2 24" stroke={INK} strokeWidth="3" opacity="0.75" fill="none" />

      {/* cheek hatching (sketch shading) */}
      <path d="M108 168c-3 18 3 36 15 52M212 168c3 18-3 36-15 52" stroke={INK} strokeWidth="2" opacity="0.35" fill="none" />
      <path d="M100 150l10 6M104 164l9 5M210 150l-10 6M206 164l-9 5" stroke={INK} strokeWidth="1.6" opacity="0.3" />

      {/* eyes */}
      <path d="M120 172c8-6 20-4 24 4" stroke={INK} strokeWidth="3.5" fill="none" />
      <path d="M176 176c4-8 16-10 24-4" stroke={INK} strokeWidth="3.5" fill="none" />
      <circle cx="130" cy="180" r="7" fill={INK} />
      <circle cx="190" cy="182" r="7" fill={INK} />
      <circle cx="132" cy="178" r="2" fill="var(--paper)" />
      <circle cx="192" cy="180" r="2" fill="var(--paper)" />

      {/* muzzle + nostrils + nose ring (a little charm) */}
      <path d="M128 216c10-9 54-9 64 0 7 9 5 25-11 34-9 5-32 5-42 0-16-9-18-25-11-34Z" fill={GOLD} fillOpacity="0.3" stroke={INK} strokeWidth="4.5" />
      <path d="M143 234c3-3 8-3 11 0M166 234c3-3 8-3 11 0" stroke={INK} strokeWidth="3.5" fill="none" />
      <path d="M150 250a10 10 0 0 0 20 0" stroke={CORAL} strokeWidth="3.5" fill="none" />
    </g>

    {/* the Claude spark — its mind, sitting on the brow */}
    <g transform="translate(160 118)">
      <path
        d="M0-26c1.2 7.3 3.6 11.6 7.8 14.2C12-9.2 17.3-8.7 17.3-8.7s-5.3.5-9.5 3.1C3.6-3 1.2 1.4 0 8.7c-1.2-7.3-3.6-11.7-7.8-14.3C-12-8.2-17.3-8.7-17.3-8.7s5.3-.5 9.5-3.1C-3.6-14.4-1.2-18.7 0-26Z"
        fill={CORAL}
      />
      <path d="M0-26c1.2 7.3 3.6 11.6 7.8 14.2" stroke="#fff6ee" strokeWidth="1" opacity="0.4" fill="none" />
    </g>
  </svg>
);

// ── The running bull — a side-view gallop for the scroll gimmick. Hand-drawn, with
//    two alternating leg poses (animated in CSS) and the Claude spark on its head. ──
export const RunningBull: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 130 96" fill="none" className={className} aria-hidden>
    <defs>
      <filter id="hd-run" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g className="rb-body" filter="url(#hd-run)" strokeLinecap="round" strokeLinejoin="round">
      {/* body */}
      <path d="M20 46c8-16 34-22 54-16 12 4 20 2 30-4-4 12-2 22 2 30-2 10-14 18-40 18S18 60 20 46Z"
            fill="var(--paper)" stroke={INK} strokeWidth="4" />
      {/* tail */}
      <path d="M22 42c-8-3-15 1-18 9 5-3 10-2 14 3" stroke={INK} strokeWidth="3.5" fill="none" />
      {/* head + horn */}
      <path d="M96 26c10-2 18 3 20 12 1 8-3 15-12 18-8 2-16-2-18-10-2-9 2-18 10-20Z"
            fill="var(--paper)" stroke={INK} strokeWidth="4" />
      <path d="M104 16c8-6 16-6 22-2-7 0-12 4-15 11" stroke={INK} strokeWidth="3.5" fill="none" />
      <circle cx="112" cy="40" r="2.6" fill={INK} />
      <path d="M120 44c4 1 7 0 9-2" stroke={INK} strokeWidth="2.6" fill="none" />
    </g>
    {/* legs — pose A */}
    <g className="rb-legs rb-legs-a" filter="url(#hd-run)" stroke={INK} strokeWidth="4" strokeLinecap="round">
      <path d="M34 66l-6 20M50 68l2 20M74 68l8 18M90 64l12 16" fill="none" />
    </g>
    {/* legs — pose B */}
    <g className="rb-legs rb-legs-b" filter="url(#hd-run)" stroke={INK} strokeWidth="4" strokeLinecap="round">
      <path d="M34 66l8 18M50 68l-6 18M74 68l-4 20M90 64l6 20" fill="none" />
    </g>
    {/* the spark on its head */}
    <g transform="translate(108 22)">
      <path d="M0-9c.5 2.6 1.3 4.1 2.8 5.1C4.3-2.9 6-2.7 6-2.7s-1.7.2-3.2 1.2C1.3.5.5 2 0 4.6-.5 2-1.3.5-2.8-.5-4.3-1.5-6-2.7-6-2.7s1.7-.2 3.2-1.2C-1.3-5-.5-6.4 0-9Z" fill={CORAL} />
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
