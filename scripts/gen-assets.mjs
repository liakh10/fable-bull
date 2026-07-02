import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Favicon is generated straight from the authored bull avatar (public/bull.png)
// so the tab icon is the actual character. Re-run after replacing the avatar.
async function main() {
  const src = join(root, "public/bull.png");
  await sharp(src).resize(256, 256).png({ compressionLevel: 9 }).toFile(join(root, "app/icon.png"));
  await sharp(src).resize(180, 180).png({ compressionLevel: 9 }).toFile(join(root, "app/apple-icon.png"));
  console.log("favicon generated from public/bull.png");
}
main().catch((e) => { console.error(e); process.exit(1); });
