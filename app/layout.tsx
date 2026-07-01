import type { Metadata } from "next";
import "./globals.css";
import { SolanaProviders } from "./providers";
import { TICKER, TOKEN_NAME } from "./config";
import { display, sans, mono } from "./fonts";

export const metadata: Metadata = {
  title: `${TICKER} — Fable Bull`,
  description: `${TOKEN_NAME} — an illustrated fable in chapters. Guide the bull with the mind of a spark through a branching saga of conviction, bags and hopium. A Solana storybook.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}
