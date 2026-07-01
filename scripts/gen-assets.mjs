import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Favicon: hand-drawn Fable Bull head — wobbly-inked bull with the Claude spark on
// its brow, on a warm cream disc. Matches the editorial storybook identity.
const ART = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <filter id="hd" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <circle cx="256" cy="256" r="250" fill="#f4eee2" stroke="#201b16" stroke-width="12"/>
  <g filter="url(#hd)" stroke-linecap="round" stroke-linejoin="round">
    <!-- horns -->
    <path d="M162 196C118 168 74 166 52 188c30-6 56 6 78 40" fill="#c79a3f" fill-opacity="0.35" stroke="#201b16" stroke-width="16"/>
    <path d="M350 196c44-28 88-30 110-8-30-6-56 6-78 40" fill="#c79a3f" fill-opacity="0.35" stroke="#201b16" stroke-width="16"/>
    <!-- ears -->
    <path d="M150 232c-40-4-70 12-84 42 30-14 55-12 80 4Z" fill="#f4eee2" stroke="#201b16" stroke-width="16"/>
    <path d="M362 232c40-4 70 12 84 42-30-14-55-12-80 4Z" fill="#f4eee2" stroke="#201b16" stroke-width="16"/>
    <!-- head -->
    <path d="M256 158c68-2 116 42 124 98 5 36-3 67-23 96-21 32-57 60-101 60s-80-28-101-60c-20-29-28-60-23-96 8-56 56-100 124-98Z"
          fill="#f4eee2" stroke="#201b16" stroke-width="18"/>
    <!-- eyes -->
    <circle cx="206" cy="300" r="14" fill="#201b16"/>
    <circle cx="306" cy="300" r="14" fill="#201b16"/>
    <!-- muzzle -->
    <path d="M212 362c16-13 72-13 88 0 12 14 8 40-18 55-15 8-49 8-64 0-26-15-30-41-6-55Z" fill="#c79a3f" fill-opacity="0.3" stroke="#201b16" stroke-width="16"/>
    <path d="M234 388c5-5 13-5 18 0M260 388c5-5 13-5 18 0" fill="none" stroke="#201b16" stroke-width="12"/>
  </g>
  <!-- the Claude spark on the brow -->
  <path d="M256 196c4 20 10 32 22 40 12 8 28 10 28 10s-16 2-28 10c-12 8-18 20-22 40-4-20-10-32-22-40-12-8-28-10-28-10s16-2 28-10c12-8 18-20 22-40Z" fill="#cc6a45"/>
</svg>`;

async function main() {
  const buf = Buffer.from(ART);
  await sharp(buf).resize(256, 256).png({ compressionLevel: 9 }).toFile(join(root, "app/icon.png"));
  await sharp(buf).resize(180, 180).png({ compressionLevel: 9 }).toFile(join(root, "app/apple-icon.png"));
  console.log("favicon generated (Fable Bull head + spark)");
}
main().catch((e) => { console.error(e); process.exit(1); });
