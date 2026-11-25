import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { isPreview, siteUrl } from "@/lib/seo";
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
const googleVerification = process.env.DINKVISION_GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification = process.env.DINKVISION_BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "DinkVision | Pickleball Court Recording and Replay",
    template: "%s | DinkVision",
  },
  ...(isPreview && { robots: { index: false, follow: true } }),
  verification: {
    google: googleVerification || undefined,
    other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
  },
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
