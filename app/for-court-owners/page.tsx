import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { media } from "@/lib/site";
import { Action, Kicker } from "../ui/shared";
export const metadata = pageMetadata("/for-court-owners");
export default function Owners() {
  return (
    <div className="shell interior">
      <section className="owner-top split">
        <div>
          <Kicker>For court owners</Kicker>
          <h1>
            Your court <em>setup.</em>
          </h1>
          <p className="lead">
            Equip your pickleball court with a fixed camera and a tablet
            running your venue-branded DinkVision recording app.
          </p>
          <Action href="/quote">Request a quote</Action>
        </div>
        <figure>
          <Image
            src={media.camera}
            alt="Illustration of a fixed camera mounted beside a pickleball court"
            fill
            sizes="(max-width:700px) 90vw, 48vw"
          />
          <figcaption>Courtside camera placement · Illustrative image</figcaption>
        </figure>
      </section>
      <section className="owner-admin split">
        <div>
          <h2>DinkVision Admin</h2>
          <p>
            Map cameras to courts, check uploads and set recording retention.
            Staff training and support follow your venue’s agreement.
          </p>
          <dl className="apps">
            <div>
              <dt>
                Wrenqueue <small>Beta</small>
              </dt>
              <dd>Player queuing</dd>
            </div>
            <div>
              <dt>
                PikolScore <small>Beta</small>
              </dt>
              <dd>Umpire scoring</dd>
            </div>
          </dl>
        </div>
        {media.admin ? (
          <Image
            src={media.admin}
            alt="DinkVision Admin recording log"
            width={680}
            height={330}
          />
        ) : (
          <div className="log">
            <div className="log-title">
              <strong>Recording log</strong>
              <small>Illustrative data</small>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Court</th>
                  <th>Session</th>
                  <th>Upload status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Court 01", "4:10 pm", "Uploaded"],
                  ["Court 02", "4:25 pm", "Processing"],
                  ["Court 03", "4:30 pm", "Failed"],
                ].map(([court, time, status]) => (
                  <tr key={court}>
                    <th>{court}</th>
                    <td>{time}</td>
                    <td>
                      <i className={status.toLowerCase()} />
                      {status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <details className="equipment">
        <summary>How is equipment and installation priced?</summary>
        <p>
          Your venue-specific quote accounts for camera mounting, wiring and
          compatible tablets or cameras you already own. Include those details
          in your quote request.
        </p>
      </details>
    </div>
  );
}
