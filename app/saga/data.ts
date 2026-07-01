// Fable Bull — "The Fable Saga". A data-driven branching gamebook.
// The story is a graph of nodes; each choice moves the reader on and nudges the
// three stats. Some choices are gated behind a stat threshold (secret paths).
// It is a fable / lore — no real bets, no financial advice.

export type StatKey = "conviction" | "bag" | "hopium";
export type Stats = Record<StatKey, number>;

export interface Effect { conviction?: number; bag?: number; hopium?: number }

export interface Choice {
  label: string;
  to: string;                 // target node id
  effect?: Effect;
  // Only offered when the given stat is at least `min` (for hidden/secret branches).
  requires?: { stat: StatKey; min: number };
  hint?: string;              // tiny sub-label shown under the choice
}

export type EndingTone = "up" | "down" | "secret";
export interface Ending {
  key: string;                // stable id for the collection gallery
  name: string;
  tone: EndingTone;
  blurb: string;
}

export interface SagaNode {
  id: string;
  chapter: number;            // chapter number shown in the UI
  artId: string;              // scene art key (see app/art)
  title: string;
  prose: string[];            // paragraphs; first gets the drop-cap
  choices?: Choice[];
  ending?: Ending;
}

export const START_ID = "awaken";
export const START_STATS: Stats = { conviction: 2, bag: 2, hopium: 2 };

export const SAGA: Record<string, SagaNode> = {
  awaken: {
    id: "awaken",
    chapter: 1,
    artId: "valley",
    title: "The Bull Awakens",
    prose: [
      "In the low green valley where charts are grown like wheat, a bull opened its eyes for the first time. Between its horns burned a small, steady spark — not fire, but a mind: the spark of Fable, thinking its very first thought.",
      "The thought was this: up. Somewhere above the hills there is a moon, and a bull is meant to climb toward it. But the valley offered two roads, and a spark must choose.",
    ],
    choices: [
      { label: "Follow the green trail up the hill", to: "resistance", effect: { hopium: 2, conviction: 1 }, hint: "Bold and hopeful" },
      { label: "Study the soil before you step", to: "study", effect: { conviction: 2, hopium: -1 }, hint: "Patient and careful" },
    ],
  },

  study: {
    id: "study",
    chapter: 2,
    artId: "valley",
    title: "Reading the Soil",
    prose: [
      "The bull lowered its head and read the ground the way scholars read old books. Every hoofprint of every beast that came before was written there — the greedy, the fearful, the patient.",
      "Understanding settled in like warm light. The spark grew brighter, though the day grew later, and a later start is a smaller bag.",
    ],
    choices: [
      { label: "Buy the quiet dip you uncovered", to: "whale", effect: { bag: 2, conviction: 1 }, hint: "Trust the reading" },
      { label: "Descend into the Bear Cave to learn its fear", to: "bearcave", effect: { conviction: 1 }, hint: "Face the dark" },
    ],
  },

  resistance: {
    id: "resistance",
    chapter: 2,
    artId: "resistance",
    title: "The Wall of Resistance",
    prose: [
      "The trail ended at a great grey wall, taller than any bull, built from every price the valley had feared to pass. Beasts gathered at its foot, muttering that it could not be broken.",
      "The spark disagreed. Walls, it reasoned, are only agreements — and agreements can be charged.",
    ],
    choices: [
      { label: "Lower your horns and charge the wall", to: "charge", effect: { conviction: 2, hopium: 1 }, hint: "Send it" },
      { label: "Wait in the grass for a whale to pass", to: "whale", effect: { conviction: -1, bag: 1 }, hint: "Let volume do the work" },
    ],
  },

  charge: {
    id: "charge",
    chapter: 3,
    artId: "resistance",
    title: "The Charge",
    prose: [
      "The bull ran. The spark screamed white. The wall met the horns — and for one endless heartbeat nothing in the market moved.",
      "Then a crack. Whether it ran up the wall or up the bull's own courage depended entirely on how much conviction had been carried this far.",
    ],
    choices: [
      { label: "Break through into open sky", to: "moon", effect: { hopium: 2, bag: 1 }, requires: { stat: "conviction", min: 4 }, hint: "For the truly convicted" },
      { label: "Bounce, wounded, back down the slope", to: "bearcave", effect: { hopium: -2, bag: -1 }, hint: "The wall held" },
    ],
  },

  whale: {
    id: "whale",
    chapter: 3,
    artId: "whale",
    title: "The Whale Surfaces",
    prose: [
      "The grass parted and the sea rose where no sea had been. A whale — vast, ancient, its back scarred with old candles — breached beside the little bull and regarded it with one slow eye.",
      "Its wake could lift a bull to the clouds, or drown it. The spark weighed the water.",
    ],
    choices: [
      { label: "Ride the whale's wake upward", to: "moon", effect: { hopium: 2, conviction: 1 }, hint: "Follow smart money" },
      { label: "Sell your grass into its hunger", to: "bearcave", effect: { bag: 3, conviction: -2 }, hint: "Take the profit, lose the faith" },
    ],
  },

  bearcave: {
    id: "bearcave",
    chapter: 4,
    artId: "bearcave",
    title: "The Bear Cave",
    prose: [
      "Down where the light gives up there is a cave, and in the cave a red arrow points forever downward. This is where conviction is tested and most of it is spent.",
      "The spark flickered — the first time it had ever dimmed. To go on, the bull would have to hold when every instinct said to run.",
    ],
    choices: [
      { label: "Plant your hooves and hold through the dark", to: "temple", effect: { conviction: 3, hopium: 1 }, requires: { stat: "conviction", min: 3 }, hint: "Diamond resolve" },
      { label: "Turn and flee toward daylight", to: "end_exile", effect: { bag: 1, conviction: -3 }, hint: "Paperhand" },
      { label: "Freeze, and let the dark decide", to: "end_rekt", hint: "No conviction left" },
    ],
  },

  temple: {
    id: "temple",
    chapter: 5,
    artId: "temple",
    title: "The Diamond Temple",
    prose: [
      "Those who hold through the cave emerge somewhere the fearful never see: a temple on a high hill, its pillars cut from pressure and time, humming with the low note of hands that never let go.",
      "The bull had become a legend of the hold. Above, the moon was close now — and the spark burned like a second sun.",
    ],
    choices: [
      { label: "Rest here as a Diamond Legend", to: "end_diamond", hint: "Take your place" },
      { label: "Merge with the spark and ascend beyond the moon", to: "end_ascension", effect: { conviction: 1 }, requires: { stat: "conviction", min: 7 }, hint: "??? A path few will find" },
    ],
  },

  moon: {
    id: "moon",
    chapter: 5,
    artId: "moon",
    title: "The Approach",
    prose: [
      "Open sky at last. The valley shrank to a green coin below and the moon swelled ahead, pale and enormous, close enough to smell the silver on it.",
      "The bull gathered itself for the final leap. What happened next belonged to the spark — and to everything the journey had made it.",
    ],
    choices: [
      { label: "Plant the flag and ascend to the moon", to: "end_moon", hint: "The classic victory" },
      { label: "Let go of the flag and become the light itself", to: "end_ascension", effect: { conviction: 1 }, requires: { stat: "hopium", min: 6 }, hint: "??? Something more" },
    ],
  },

  // ─────────────────────────── ENDINGS ───────────────────────────
  end_moon: {
    id: "end_moon", chapter: 6, artId: "moon", title: "Ascended to the Moon",
    prose: ["The bull leapt, and the leap did not come down. It planted its flag in silver dust while the valley cheered so loudly the sound reached space a little late. A green candle a mile high marked the spot forever."],
    ending: { key: "moon", name: "Ascended to the Moon", tone: "up", blurb: "You climbed the whole way and planted the flag. The textbook fable — hope, held long enough, made real." },
  },
  end_diamond: {
    id: "end_diamond", chapter: 6, artId: "temple", title: "Diamond Legend",
    prose: ["The bull sat among the pillars and did not move again — not from stubbornness, but from certainty. Beasts still make the climb to the temple to touch its horns for luck before their own charge. It held, and holding made it eternal."],
    ending: { key: "diamond", name: "Diamond Legend", tone: "up", blurb: "You held through the Bear Cave when the spark itself dimmed. Fear is a season; you outlasted it." },
  },
  end_exile: {
    id: "end_exile", chapter: 6, artId: "exile", title: "Paperhand Exile",
    prose: ["The bull kept the small bag it fled with and walked out into the dunes where charts do not grow. Safe, and a little smaller each day. Sometimes, at night, it looks back toward the hills and the spark aches faintly, remembering an up it did not reach."],
    ending: { key: "exile", name: "Paperhand Exile", tone: "down", blurb: "You took the safe exit and kept your bag. No shame in surviving — but the moon stayed a rumor." },
  },
  end_rekt: {
    id: "end_rekt", chapter: 6, artId: "bearcave", title: "Rekt in the Bear Cave",
    prose: ["With no conviction left to spend, the bull froze, and the red arrow did what red arrows do. The spark guttered out gently, like a candle at dawn. In the valley they tell it as a warning: never enter the cave lighter than the dark."],
    ending: { key: "rekt", name: "Rekt in the Bear Cave", tone: "down", blurb: "You entered the dark without enough conviction to leave it. The cautionary chapter every valley needs." },
  },
  end_ascension: {
    id: "end_ascension", chapter: 6, artId: "ascension", title: "The Fable Ascension",
    prose: [
      "The bull let go of horn and hoof and flag and bag, and there was only the spark — Fable, thinking its final and largest thought.",
      "It did not reach the moon. It became the reason bulls look up at all. Somewhere, right now, a new bull is opening its eyes in a green valley, carrying a little of this light between its horns.",
    ],
    ending: { key: "ascension", name: "The Fable Ascension", tone: "secret", blurb: "SECRET — reached only with overwhelming conviction or hope. The bull became the fable itself. Very few find this page." },
  },
};

export const ALL_ENDINGS: Ending[] = Object.values(SAGA).filter((n) => n.ending).map((n) => n.ending!);

export function isEnding(node: SagaNode): boolean { return !!node.ending; }
