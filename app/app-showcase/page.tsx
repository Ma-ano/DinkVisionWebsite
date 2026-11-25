import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import AppShowcase from "./showcase";
import { chapters } from "./chapters";
import "./showcase.css";

export const metadata = pageMetadata("/app-showcase");

export default function ShowcasePage() {
  return (
    <div className="experience-page">
      <AppShowcase chapters={chapters} />
      <section
        className="shell experience-cta"
        aria-labelledby="experience-cta-title"
      >
        <h2 id="experience-cta-title">
          Bring DinkVision
          <br />
          <span>to your court.</span>
        </h2>
        <Link className="btn" href="/quote">
          Request a quote <span aria-hidden>↗</span>
        </Link>
      </section>
    </div>
  );
}
