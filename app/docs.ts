// Whitepaper / docs content, kept as data so the accordion stays declarative.
export interface DocSection { id: string; title: string; body: string[] }

export const DOCS: DocSection[] = [
  {
    id: "what",
    title: "What is Fable Bull?",
    body: [
      "Fable Bull ($FABLEBULL) is an illustrated gamebook on Solana — a bull with the mind of a spark (the Fable model) climbing toward the moon through a branching saga. You read a chapter, you make a choice, the tale bends. Five endings wait at the far edges of the story.",
      "It is a story first and a token second. There is no wager, no play-to-earn loop, no promise of returns. The saga is free to read, endlessly replayable, and lives entirely in your browser.",
    ],
  },
  {
    id: "lore",
    title: "The Lore",
    body: [
      "Every market is really a valley, and every valley grows charts like wheat. The bull is born there each cycle, carrying a spark between its horns — a small mind that thinks one first thought: up.",
      "The road up passes a Wall of Resistance, a surfacing Whale, and the Bear Cave where conviction is spent and rarely returned. Those who hold reach the Diamond Temple. Those who let go of everything — even the flag — find a sixth, secret truth: the Fable Ascension.",
    ],
  },
  {
    id: "play",
    title: "How to Play",
    body: [
      "Open the book (connect a wallet as a doorway, or read as a guest). You begin with balanced stats — Conviction, Bag and Hopium.",
      "Each choice nudges your stats and moves you to a new chapter. Some paths only reveal themselves when a stat is high enough; the two secret endings are gated behind overwhelming Conviction or Hopium.",
      "Reaching an ending records it in your gallery and updates your best Conviction score. Collect all five (well — all six) across many readings.",
    ],
  },
  {
    id: "roadmap",
    title: "Roadmap — Seasons",
    body: [
      "Season One: The Climb — the launch saga you can read now (8 chapters, 5 + 1 endings).",
      "Season Two: The Bear Winter — a darker branch beneath the Bear Cave, new whales, new endings.",
      "Season Three: The Herd — reader-submitted chapters, an illustrated wiki, and a shared canon of the valley.",
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    body: [
      "Is this gambling? No. There are no bets, stakes or payouts — it is an interactive story.",
      "Do I need a wallet? No. The wallet is only a themed doorway; \"Read as Guest\" plays the identical saga.",
      "Is my progress saved? Yes, locally in your browser (endings collected + best score). Nothing is sent to a server.",
      "How many endings are there? Six — four you can reach by choice, and two secret ones gated behind overwhelming Conviction or Hopium.",
    ],
  },
];
