// Local persistence: endings collected + best conviction score + audio prefs.
// Device-local only (localStorage). No accounts, no server.

const ENDINGS_KEY = "fablebull_endings";
const BEST_KEY = "fablebull_best_conviction";

export function getEndings(): string[] {
  try { const s = localStorage.getItem(ENDINGS_KEY); return s ? (JSON.parse(s) as string[]) : []; } catch { return []; }
}
export function addEnding(id: string): string[] {
  const cur = getEndings();
  if (!cur.includes(id)) { cur.push(id); try { localStorage.setItem(ENDINGS_KEY, JSON.stringify(cur)); } catch { /* */ } }
  return cur;
}

export function getBestConviction(): number {
  try { return Number(localStorage.getItem(BEST_KEY) || "0") || 0; } catch { return 0; }
}
export function saveBestConviction(score: number): boolean {
  const cur = getBestConviction();
  if (score <= cur) return false;
  try { localStorage.setItem(BEST_KEY, String(score)); return true; } catch { return false; }
}

export function getMuted(): boolean { try { return localStorage.getItem("fablebull_muted") === "1"; } catch { return false; } }
export function setMuted(v: boolean) { try { localStorage.setItem("fablebull_muted", v ? "1" : "0"); } catch { /* */ } }
