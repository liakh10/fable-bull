// Docs — kept short and memey. Data drives the accordion.
export interface DocSection { id: string; title: string; body: string[] }

export const DOCS: DocSection[] = [
  {
    id: "what",
    title: "wtf is Fable Bull?",
    body: [
      "A playable fable on Solana. A bull with a spark for a brain climbs toward the moon. You pick the path, you get the ending. Six of them. It plays right here on the page.",
    ],
  },
  {
    id: "lore",
    title: "The lore (30 sec)",
    body: [
      "Markets are valleys. Valleys grow charts like wheat. Each cycle a bull wakes there with the mind of Fable between its horns, thinking one thing: up.",
      "It meets a Wall, a Whale, and the Bear Cave (where conviction goes to die). Hold → Diamond Temple. Let go of everything, even the flag → the secret sixth page.",
    ],
  },
  {
    id: "play",
    title: "How to play",
    body: [
      "Open the book. Pick choices. Your stats — Conviction / Bag / Hopium — steer the story.",
      "6 endings. 4 by choice, 2 secret (max conviction, or max hopium). Collect 'em all. Free, no wallet needed.",
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    body: [
      "Gambling? No. No bets, no payouts — just a story you play.",
      "Wallet needed? Nope. \"Read as Guest\" plays the exact same saga.",
      "Progress saved? Yep, in your browser. Nothing hits a server.",
      "$FABLEBULL? A memecoin and a bedtime story. gm.",
    ],
  },
];
