import Image from "next/image";
import { media } from "@/lib/site";
import { Kicker } from "../ui/shared";
import QuoteForm from "./form";
export const metadata = { title: "Request a quote" };
export default async function Quote({
  searchParams,
}: {
  searchParams: Promise<{ inquiry?: string | string[] }>;
}) {
  const custom = (await searchParams).inquiry === "custom-application";
  if (custom) {
    return (
      <div className="shell interior quote-grid">
        <section>
          <Kicker>Custom application inquiry</Kicker>
          <h1>
            Bring your idea <em>to life.</em>
          </h1>
          <p className="lead">
            Tell WrenLabs PH what you want to build, who it is for, and the
            workflows you want to improve.
          </p>
          <aside className="costs">
            <h2>Custom development services</h2>
            <p>
              Custom projects have their own scope and quote, separate from the
              DinkVision court recording package.
            </p>
          </aside>
        </section>
        <QuoteForm key="custom" custom />
      </div>
    );
  }
  return (
    <div className="shell interior quote-grid">
      <section>
        <Kicker>For court owners</Kicker>
        <h1>
          Bring replay <em>to your courts.</em>
        </h1>
        <p className="lead">
          Purchase the DinkVision software once. Your quote reflects your court
          count, existing equipment and installation.
        </p>
        <Image
          className="quote-photo"
          src={media.tablet}
          alt="Courtside recording tablet"
          width={760}
          height={230}
          sizes="45vw"
        />
        <aside className="costs">
          <h2>Ongoing operating costs</h2>
          <p>
            After transition, the venue covers hosting, Google Drive storage and
            backups.
          </p>
        </aside>
      </section>
      <QuoteForm key="dinkvision" />
    </div>
  );
}
