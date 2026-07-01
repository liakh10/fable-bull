import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// Fable Bull identity — an editorial storybook: an expressive serif display for
// headings/prose-openers, a humanist sans for body, and mono for the CA.
// Deliberately unlike the bold/pixel/comic faces used by the other hub games.
export const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
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
