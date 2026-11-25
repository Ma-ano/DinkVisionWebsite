import { pageMetadata } from "@/lib/seo";
import { businessEmail } from "@/lib/site";
import Link from "next/link";
import { Kicker } from "../ui/shared";
export const metadata = pageMetadata("/privacy");
export default function Privacy() {
  return (
    <article className="reading interior notice">
      <Kicker>Recording notice</Kicker>
      <h1>
        Your match <em>recordings.</em>
      </h1>
      <p className="lead">
        Ask the venue about the recording settings for your court before you
        play.
      </p>
      <h2>Recording and access</h2>
      <p>
        Players start and stop recordings at the courtside tablet. Your venue
        can confirm who can view or manage recordings for its courts.
      </p>
      <h2>Replay delivery</h2>
      <p>
        When the venue enables email delivery, enter your email at the tablet.
        After the match uploads, check that inbox for the replay link.
      </p>
      <h2>Retention</h2>
      <p>
        Recording limits and retention depend on the venue’s setup. Contact the
        venue to confirm how long it keeps a recording and whether your match is
        still available.
      </p>
      <h2>Questions about a recording?</h2>
      <p>
        Contact your venue with your court number, match date and approximate
        local time. The <Link href="/players">player guide</Link> includes help
        finding a replay.
      </p>
      <h2>Website quote inquiries</h2>
      <p>
        The quote form prepares an email draft in your browser. When you send
        the draft, your email service delivers the details you include to
        WrenLabs PH.
      </p>
      <p>
        For DinkVision business inquiries, email{" "}
        <a href={"mailto:" + businessEmail}>{businessEmail}</a>.
      </p>
    </article>
  );
}
