import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Favicon: the Fable Bull head — a line-inked bull with a coral spark between its
// horns, on a warm cream disc. Matches the editorial storybook identity.
const ART = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <circle cx="256" cy="256" r="252" fill="#f4eee2" stroke="#201b16" stroke-width="12"/>
  <!-- face -->
  <path d="M256 150c70 0 116 46 122 102 5 42-7 78-32 108-23 30-56 52-90 52s-67-22-90-52c-25-30-37-66-32-108 7-56 52-102 122-102Z"
        fill="#f4eee2" stroke="#201b16" stroke-width="16"/>
  <!-- horns -->
  <path d="M148 200c-46-18-82-10-102 14 32-4 54 8 74 36" fill="none" stroke="#201b16" stroke-width="18" stroke-linecap="round"/>
  <path d="M364 200c46-18 82-10 102 14-32-4-54 8-74 36" fill="none" stroke="#201b16" stroke-width="18" stroke-linecap="round"/>
  <!-- eyes -->
  <ellipse cx="206" cy="288" rx="17" ry="20" fill="#201b16"/>
  <ellipse cx="306" cy="288" rx="17" ry="20" fill="#201b16"/>
  <!-- muzzle -->
  <path d="M214 356c14-12 70-12 84 0 10 14 6 34-16 44-14 6-38 6-52 0-22-10-26-30-16-44Z" fill="#c79a3f" fill-opacity="0.4" stroke="#201b16" stroke-width="14"/>
  <ellipse cx="234" cy="386" rx="8" ry="9" fill="#201b16"/>
  <ellipse cx="278" cy="386" rx="8" ry="9" fill="#201b16"/>
  <!-- the spark -->
  <path d="M256 168c3 16 8 25 17 31 9 6 22 8 22 8s-13 2-22 8c-9 6-14 15-17 31-3-16-8-25-17-31-9-6-22-8-22-8s13-2 22-8c9-6 14-15 17-31Z" fill="#cc6a45"/>
</svg>`;

async function main() {
  const buf = Buffer.from(ART);
  await sharp(buf).resize(256, 256).png({ compressionLevel: 9 }).toFile(join(root, "app/icon.png"));
  await sharp(buf).resize(180, 180).png({ compressionLevel: 9 }).toFile(join(root, "app/apple-icon.png"));
  console.log("favicon generated (Fable Bull head + spark)");
}
main().catch((e) => { console.error(e); process.exit(1); });
