import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

// Fable Bull identity v2 — "the smartest bull alive".
// Bricolage Grotesque: a characterful modern display (not the safe serif from before).
// JetBrains Mono carries the "AI thinking / boot log / CA" voice. Inter for body.
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});
export const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});
