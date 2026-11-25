import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/site";
import "./about.css";

const services = [
  "Websites & online stores",
  "Web & mobile applications",
  "Business systems & integrations",
  "AI & automation",
];

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="about-heading"
    >
      <div className="shell about-content">
        <div className="about-labels">
          <p className="kicker">ABOUT DINKVISION</p>
          <p>BY WRENLABS PH</p>
        </div>
        <div className="about-grid">
          <h1 id="about-heading">
            BUILT FOR
            <br />
            THE COURT.
            <br />
            <span>AND BEYOND.</span>
          </h1>
          <div className="about-introduction">
            <h2>The team behind DinkVision</h2>
            <p>
              DinkVision is a pickleball video capture solution created by
              WrenLabs PH, helping players record their matches and relive the
              moments that matter.
            </p>
            <p>
              WrenLabs PH is a solutions company building websites, web and
              mobile applications, and AI-powered tools for businesses.
            </p>
            <p>
              Our existing products are just the beginning. Beyond DinkVision
              and our current applications, we design and build custom solutions
              around your goals, your workflows, and your customers.
            </p>
            <p>
              Whether you need a booking platform, a business dashboard, an
              automated workflow, or an entirely new application, we can help
              shape your idea and bring it to life.
            </p>
          </div>
          <figure className="about-photo">
            <Image
              src={media.camera}
              alt="Illustration of a recording camera mounted beside a pickleball court"
              width={900}
              height={580}
              sizes="(max-width: 800px) 90vw, 44vw"
            />
            <figcaption>Courtside recording · Illustrative image</figcaption>
          </figure>
          <div className="about-services">
            <h2>WHAT WE CAN BUILD</h2>
            <ol>
              {services.map((service, index) => (
                <li key={service}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {service}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <aside className="about-cta" aria-labelledby="about-cta-heading">
          <div>
            <h2 id="about-cta-heading">HAVE SOMETHING ELSE IN MIND?</h2>
            <p>Tell us what you want to build.</p>
          </div>
          <div className="about-actions">
            <Link className="btn" href="/quote?inquiry=custom-application">
              Discuss your idea <span aria-hidden="true">↗</span>
            </Link>
            <a href="https://wrenlabs-dusky-seven.vercel.app/">
              Visit WrenLabs PH <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
