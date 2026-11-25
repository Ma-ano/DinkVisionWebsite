import Image from "next/image";
import { guide, media } from "@/lib/site";
import { Kicker } from "../ui/shared";
export const metadata = { title: "Player guide" };
export default function Players() {
  return (
    <div className="reading interior">
      <Kicker>Player guide</Kicker>
      <h1>
        Record your <em>match.</em>
      </h1>
      <p className="lead">
        Use the tablet beside your court. Here’s what to do before and after you
        play.
      </p>
      <Image
        className="guide-photo"
        src={media.tablet}
        alt="Courtside tablet with the recording control"
        width={900}
        height={370}
        sizes="(max-width:760px) 92vw, 720px"
      />
      <ol className="guide">
        {guide.map(([label, detail], i) => (
          <li key={label}>
            <span aria-hidden>{i + 1}</span>
            <div>
              <h2>{label}</h2>
              <p>{detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <details className="help">
        <summary>Need help finding a replay?</summary>
        <p>
          If your venue offers email delivery, check the inbox and spam folder
          for the address entered at the tablet. If the link is missing, contact
          the venue with your court number, match date and approximate local
          time.
        </p>
      </details>
    </div>
  );
}
