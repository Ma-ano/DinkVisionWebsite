import Image from "next/image";
import Link from "next/link";
import { media, guide } from "@/lib/site";
import heroPoster from "@/public/media/hero-paddle.webp";
import { Replay, BackgroundVideo } from "./ui/replay";
import Motion from "./ui/motion";
import Cards from "./ui/cards";
import HomeSections from "./ui/home-sections";
import VideoCarousel from "./ui/video-carousel";
import { Action, Kicker } from "./ui/shared";
export default function Home() {
  const cards = [
    { title: guide[0][0], detail: guide[0][1], image: media.tabletApp },
    {
      title: "Play your match",
      detail:
        "Play your match, then tap stop on the courtside tablet to finish recording.",
      image: media.stop,
    },
    { title: guide[2][0], detail: guide[2][1], image: media.phone },
  ];
  return (
    <>
      <section className="hero">
        <Image
          className="hero-poster"
          src={heroPoster}
          alt=""
          fill
          sizes="100vw"
          preload
          placeholder="blur"
          style={{ objectPosition: "var(--hero-image-position, center)" }}
        />
        <BackgroundVideo src={media.heroVideo} />
        <div className="hero-shade" />
        <div className="hero-intro">
          <Kicker>Pickleball court recording</Kicker>
          <p>
            Give your players a courtside way to record a match and watch it
            again.
          </p>
        </div>
        <h1>
          <span className="mask">
            <span className="hero-line">Your game.</span>
          </span>{" "}
          <span className="mask">
            <span className="hero-line accent">On replay.</span>
          </span>
        </h1>
        <Replay src={media.replay} poster={media.rally} />
        <a className="down" href="#how-it-works" aria-label="How it works">
          <span>How it works</span>
          <b aria-hidden>↓</b>
        </a>
      </section>
      <div className="shell intro">
        <Image
          src={media.camera}
          width={180}
          height={112}
          alt="Illustration of a DinkVision-branded courtside camera"
        />
        <strong>
          <span>A fixed camera records the court.</span>{" "}
          <span>Players start each recording from the courtside tablet.</span>
        </strong>
      </div>
      <section className="shell how" id="how-it-works">
        <Kicker>Courtside recording</Kicker>
        <div className="section-head">
          <h2>
            How it <em>works.</em>
          </h2>
          <p>
            From the first tap to your replay link, here’s what happens when you
            record a match at a DinkVision court.
          </p>
        </div>
        <Cards cards={cards} />
        <div className="gallery-foot">
          <small>
            Email delivery and recording limits depend on the venue’s setup.
          </small>
          <Link href="/players">Open the player guide ↗</Link>
        </div>
      </section>
      <VideoCarousel />
      <aside className="cta">
        <div className="shell">
          <h2>What goes on your court?</h2>
          <Action href="/for-court-owners">Explore the court setup</Action>
        </div>
      </aside>
      <HomeSections />
      <Motion />
    </>
  );
}
