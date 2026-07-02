import type { Metadata } from "next";
import "./globals.css";
import { SolanaProviders } from "./providers";
import { TICKER, TOKEN_NAME } from "./config";
import { display, sans, mono } from "./fonts";

export const metadata: Metadata = {
  title: `${TICKER} — Fable Bull`,
  description: `${TOKEN_NAME} — the smartest bull alive. A bull with the mind of Fable. Run his mind through a branching, playable fable on Solana.`,
};

export const viewport = { themeColor: "#fbf0de" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}
