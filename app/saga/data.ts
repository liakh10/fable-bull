// Fable Bull — "The Fable Saga". A data-driven branching gamebook.
// The story is a graph of nodes; each choice moves the reader on and nudges the
// three stats. Some choices are gated behind a stat threshold (secret paths).
// Voice: a fable told by a degen. Short, punchy, memey. Still a story, no bets.

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
    id: "awaken", chapter: 1, artId: "valley", title: "gm, Bull",
    prose: ["A bull blinks awake in the green valley. Between its horns: a spark — the mind of Fable, thinking one thought only. Up. The road forks."],
    choices: [
      { label: "Sprint up the hill", to: "resistance", effect: { hopium: 2, conviction: 1 }, hint: "send it" },
      { label: "Read the charts first", to: "study", effect: { conviction: 2, hopium: -1 }, hint: "nerd mode" },
    ],
  },

  study: {
    id: "study", chapter: 2, artId: "valley", title: "Nerd Mode",
    prose: ["You read the ground like a degen reads charts at 4am. Every hoofprint is here — greedy, fearful, patient. Big brain unlocked. But the day's getting late, and late means smaller bag."],
    choices: [
      { label: "Buy the quiet dip", to: "whale", effect: { bag: 2, conviction: 1 }, hint: "actually early" },
      { label: "Go touch the Bear Cave", to: "bearcave", effect: { conviction: 1 }, hint: "know your enemy" },
    ],
  },

  resistance: {
    id: "resistance", chapter: 2, artId: "resistance", title: "The Wall",
    prose: ["The trail dead-ends at a grey wall — every price the valley ever feared, stacked to the sky. The other beasts cope: “can't break it.” The spark disagrees. A wall is just a group-chat agreement."],
    choices: [
      { label: "Lower horns and charge", to: "charge", effect: { conviction: 2, hopium: 1 }, hint: "SEND IT" },
      { label: "Camp for a whale", to: "whale", effect: { conviction: -1, bag: 1 }, hint: "let volume cook" },
    ],
  },

  charge: {
    id: "charge", chapter: 3, artId: "resistance", title: "The Charge",
    prose: ["You run. The spark goes white. Horns meet wall. One frozen candle where nothing moves... then a crack. Up the wall — or up your own cope? Depends how much conviction you packed."],
    choices: [
      { label: "Break into open sky", to: "moon", effect: { hopium: 2, bag: 1 }, requires: { stat: "conviction", min: 4 }, hint: "diamond hooves only" },
      { label: "Bounce back down", to: "bearcave", effect: { hopium: -2, bag: -1 }, hint: "wall held, rekt-lite" },
    ],
  },

  whale: {
    id: "whale", chapter: 3, artId: "whale", title: "Whale Alert",
    prose: ["The grass parts and a sea appears. A whale — ancient, its back scarred with old candles — breaches and gives you one slow look. Its wake sends you to orbit, or to zero."],
    choices: [
      { label: "Ride the wake up", to: "moon", effect: { hopium: 2, conviction: 1 }, hint: "follow smart money" },
      { label: "Dump your grass into it", to: "bearcave", effect: { bag: 3, conviction: -2 }, hint: "take profit, lose faith" },
    ],
  },

  bearcave: {
    id: "bearcave", chapter: 4, artId: "bearcave", title: "The Bear Cave",
    prose: ["Down where the light quits, a red arrow points forever down. Conviction gets spent here and rarely comes back. Your spark dims for the first time. This is the test."],
    choices: [
      { label: "Plant hooves, HODL the dark", to: "temple", effect: { conviction: 3, hopium: 1 }, requires: { stat: "conviction", min: 3 }, hint: "diamond resolve" },
      { label: "Nope out to daylight", to: "end_exile", effect: { bag: 1, conviction: -3 }, hint: "paperhands" },
      { label: "Freeze, let the dark decide", to: "end_rekt", hint: "no conviction left" },
    ],
  },

  temple: {
    id: "temple", chapter: 5, artId: "temple", title: "Diamond Temple",
    prose: ["You held. You come out where the fearful never see: the Diamond Temple, pillars cut from pure pressure, humming with hands that never sold. You're a legend now. The moon is right there."],
    choices: [
      { label: "Chill here as a Diamond Legend", to: "end_diamond", hint: "gg, well held" },
      { label: "Merge with the spark and ascend", to: "end_ascension", effect: { conviction: 1 }, requires: { stat: "conviction", min: 7 }, hint: "??? few find this" },
    ],
  },

  moon: {
    id: "moon", chapter: 5, artId: "moon", title: "The Approach",
    prose: ["Open sky. The valley shrinks to a green coin below. The moon swells ahead — close enough to smell the silver. One last leap. This part's on the spark."],
    choices: [
      { label: "Plant the flag on the moon", to: "end_moon", hint: "the classic W" },
      { label: "Drop the flag, become the light", to: "end_ascension", effect: { conviction: 1 }, requires: { stat: "hopium", min: 6 }, hint: "??? something more" },
    ],
  },

  // ─────────────────────────── ENDINGS ───────────────────────────
  end_moon: {
    id: "end_moon", chapter: 6, artId: "moon", title: "To the Moon",
    prose: ["The leap never came down. Flag in silver dust, valley screaming so loud space heard it late. A mile-high green candle marks the spot forever. wagmi."],
    ending: { key: "moon", name: "To the Moon", tone: "up", blurb: "Climbed the whole way, planted the flag. The textbook W." },
  },
  end_diamond: {
    id: "end_diamond", chapter: 6, artId: "temple", title: "Diamond Legend",
    prose: ["You sat among the pillars and never moved again — not stubborn, just certain. Beasts still hike up to touch your horns before their own charge. Diamond hooves, forever."],
    ending: { key: "diamond", name: "Diamond Legend", tone: "up", blurb: "HODL'd the Bear Cave when the spark itself dimmed. Fear is a season; you outlasted it." },
  },
  end_exile: {
    id: "end_exile", chapter: 6, artId: "exile", title: "Paperhand Exile",
    prose: ["You kept the tiny bag you fled with and walked into the dunes where no charts grow. Safe. Smaller every day. Sometimes you look back at the hills and the spark aches a little."],
    ending: { key: "exile", name: "Paperhand Exile", tone: "down", blurb: "Took the safe exit, kept the bag. No shame in surviving — but the moon stayed a rumor." },
  },
  end_rekt: {
    id: "end_rekt", chapter: 6, artId: "bearcave", title: "Rekt in the Cave",
    prose: ["No conviction left. You froze, and the red arrow did red-arrow things. The spark went out like a candle at dawn. it's over. (you'll respawn. it's always so back.)"],
    ending: { key: "rekt", name: "Rekt in the Cave", tone: "down", blurb: "Walked into the dark lighter than the dark. The cautionary tale every valley needs." },
  },
  end_ascension: {
    id: "end_ascension", chapter: 6, artId: "ascension", title: "Fable Ascension",
    prose: ["You let go of horn, hoof, flag and bag. Only the spark remained — Fable's final, largest thought. You didn't reach the moon. You became the reason bulls look up. Somewhere, a new bull is blinking awake, carrying your light."],
    ending: { key: "ascension", name: "Fable Ascension", tone: "secret", blurb: "SECRET — max conviction or max hope only. The bull became the fable itself. Few find this page." },
  },
};

export const ALL_ENDINGS: Ending[] = Object.values(SAGA).filter((n) => n.ending).map((n) => n.ending!);

export function isEnding(node: SagaNode): boolean { return !!node.ending; }
