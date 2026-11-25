import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { businessEmail, facebook } from "@/lib/site";
import Header from "./ui/header";
import "./globals.css";

const display = localFont({
  src: [
    { path: "./fonts/BarlowCondensed-Bold.woff2", weight: "700" },
    { path: "./fonts/BarlowCondensed-Black.woff2", weight: "900" },
  ],
  variable: "--display",
});
const body = localFont({
  src: "./fonts/DMSans-Variable.woff2",
  weight: "100 1000",
  variable: "--body",
});
export const metadata: Metadata = {
  title: {
    default: "DinkVision | Your game. On replay.",
    template: "%s | DinkVision",
  },
  description:
    "Courtside pickleball match recording and replay for players and venues.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable + " " + body.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="shell">
          <strong>Powered by WrenLabs</strong>
          <nav aria-label="Footer">
            <Link href="/players">Player guide</Link>
            <Link href="/privacy">Recording notice</Link>
            <a href={"mailto:" + businessEmail}>Contact</a>
            <a href={facebook}>Facebook</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
