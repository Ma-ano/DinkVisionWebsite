import Link from "next/link";
import { Kicker } from "./shared";
import "./home-sections.css";

const faqs = [
  [
    "Is there a monthly software fee?",
    "DinkVision is a one-time software purchase. After transition, the venue covers ongoing hosting, Google Drive storage and backups.",
  ],
  [
    "What equipment goes on each court?",
    "Each equipped court pairs a fixed camera with a courtside tablet. Your venue-specific quote accounts for mounting, wiring and compatible equipment you already own.",
  ],
  [
    "How do players record a match?",
    "Start recording at the courtside tablet. If your venue offers email delivery, enter your email address. After play, tap stop on the same tablet so your match can upload.",
  ],
  [
    "Where does the replay arrive?",
    "When email delivery is enabled, the replay link arrives at the address entered at the tablet after upload. Check your inbox and spam folder. If it is missing, contact the venue with your court number, match date and approximate local time.",
  ],
  [
    "How long are recordings kept?",
    "Recording limits and retention depend on your venue’s setup. The venue can confirm how long recordings are kept and whether your match is still available.",
  ],
  [
    "Is staff training included?",
    "Staff training and support follow the agreement for your venue. Discuss your team’s requirements when requesting a quote.",
  ],
];

export default function HomeSections() {
  return (
    <>
      <section
        id="faqs"
        aria-labelledby="faq-heading"
        className="shell home-section faq-section"
      >
        <div>
          <Kicker>FAQs</Kicker>
          <h2 id="faq-heading">
            Good <em>questions.</em>
          </h2>
          <p className="lead">
            A few things to know before your first recording or court setup.
          </p>
          <Link href="/quote">Talk to us about your venue ↗</Link>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="upcoming-projects"
        aria-labelledby="upcoming-heading"
        className="shell home-section upcoming-section"
      >
        <div>
          <Kicker>Upcoming Projects</Kicker>
          <h2 id="upcoming-heading">
            What’s <em>next.</em>
          </h2>
        </div>
        <div>
          <p className="lead">New possibilities, on and off the court.</p>
          <p>Explore future concepts for DinkVision and WrenLabs PH.</p>
          <Link className="btn dark" href="/upcoming-projects">
            Explore upcoming projects <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
