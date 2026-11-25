import Link from "next/link";
import "./projects.css";

export const metadata = {
  title: "Upcoming Projects | WrenLabs PH",
  description: "Explore future concepts for DinkVision and WrenLabs PH, from coaching and AI-powered replay to custom business systems.",
};

type Concept = {
  title: string;
  description: string;
  illustration: "coaching" | "replay" | "subscription" | "calendar" | "business" | "workflow";
};
const court: Concept[] = [
  { title: "Coaching & Player Development", description: "Session planning, coach feedback and player progress.", illustration: "coaching" },
  { title: "AI-Powered Replay", description: "Exploring assisted match review and highlight discovery.", illustration: "replay" },
  { title: "DinkVision Subscriptions", description: "Exploring a subscription option for venues.", illustration: "subscription" },
  { title: "Court & Event Management", description: "Court bookings, league registration and match schedules.", illustration: "calendar" },
];
const business: Concept[] = [
  { title: "Business Systems", description: "Custom dashboards, customer records and integrations.", illustration: "business" },
  { title: "AI & Workflow Automation", description: "Custom tools to simplify repetitive business tasks.", illustration: "workflow" },
];

function Illustration({ kind }: { kind: Concept["illustration"] }) {
  return (
    <svg className="project-art" viewBox="0 0 280 220" fill="none" aria-hidden="true" focusable="false">
      <rect x="12" y="16" width="256" height="188" rx="48" fill="#E5F4EF" />
      {kind === "coaching" && <>
        <rect x="58" y="30" width="164" height="176" rx="12" fill="white" stroke="#001F49" strokeWidth="6" />
        <rect x="106" y="19" width="68" height="25" rx="8" fill="#001F49" />
        <rect x="78" y="58" width="124" height="82" rx="4" fill="#00A99A" />
        <path d="M140 58v82M78 99h124M78 82h124M78 116h124M98 67l10 10m0-10-10 10M170 122l10 10m0-10-10 10" stroke="white" strokeWidth="3" />
        <path d="m81 160 5 5 9-11m-14 29 5 5 9-11M109 161h75M109 185h54" stroke="#007E78" strokeWidth="5" strokeLinecap="round" />
      </>}
      {kind === "replay" && <>
        <rect x="20" y="35" width="240" height="155" rx="16" fill="#001F49" />
        <rect x="32" y="48" width="216" height="101" rx="7" fill="#DCEAEF" />
        <path d="m56 135 26-67h116l26 67ZM140 68v67M67 105h146" stroke="#7896A8" strokeWidth="3" />
        <circle cx="111" cy="91" r="9" fill="#00A99A" />
        <path d="m38 162 13 8-13 8Z" fill="white" />
        <path d="M65 170h162" stroke="#6E8EA3" strokeWidth="5" strokeLinecap="round" />
        {[110, 159, 200].map(x => <g key={x}><circle cx={x} cy="162" r="7" fill="#00A99A" /><path d={`M${x} 169v9`} stroke="#00A99A" strokeWidth="3" /></g>)}
      </>}
      {kind === "subscription" && <>
        {[25, 104, 183].map((x, i) => <g key={x}>
          <rect x={x} y={i === 1 ? 35 : 52} width="72" height={i === 1 ? 153 : 120} rx="12" fill="white" stroke={i === 1 ? "#00A99A" : "#8BA6B5"} strokeWidth="3" />
          <circle cx={x + 36} cy="82" r="16" fill="#00A99A" />
          <path d={`m${x + 28} 82 6 6 11-12`} stroke="white" strokeWidth="3" />
          {[117, 134, 151].map(y => <path key={y} d={`M${x + 18} ${y}h36`} stroke="#A1B7C3" strokeWidth="4" strokeLinecap="round" />)}
        </g>)}
      </>}
      {kind === "calendar" && <>
        <rect x="28" y="37" width="190" height="155" rx="15" fill="white" stroke="#001F49" strokeWidth="5" />
        <path d="M30 73h186M72 24v27M172 24v27" stroke="#001F49" strokeWidth="9" strokeLinecap="round" />
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={46 + i % 4 * 40} y={91 + Math.floor(i / 4) * 29} width="26" height="19" rx="4" fill={i === 2 || i === 5 ? "#00A99A" : "#DCEAEF"} />)}
        <rect x="171" y="127" width="85" height="72" rx="9" fill="#E5F4EF" stroke="#001F49" strokeWidth="3" />
        <path d="M184 143h19v19h21m-40 19h19v-19m21 0h18" stroke="#001F49" strokeWidth="3" /><circle cx="239" cy="162" r="6" fill="#00A99A" />
      </>}
      {kind === "business" && <>
        <rect x="20" y="36" width="240" height="153" rx="12" fill="white" stroke="#001F49" strokeWidth="5" />
        <path d="M22 61h236" stroke="#001F49" strokeWidth="18" />
        {[37, 50, 63].map(x => <circle key={x} cx={x} cy="60" r="3" fill="#00A99A" />)}
        <path d="M61 78v98" stroke="#DCEAEF" strokeWidth="42" />
        {[28, 45, 62, 80].map((h, i) => <rect key={h} x={87 + i * 26} y={168 - h} width="16" height={h} rx="3" fill={i % 2 ? "#00A99A" : "#8ABEBE"} />)}
        <circle cx="218" cy="107" r="22" fill="#E5F4EF" /><path d="M218 85v22h22A22 22 0 0 0 218 85" fill="#00A99A" />
        <path d="M200 149h35m-35 15h25" stroke="#9BB3C0" strokeWidth="5" strokeLinecap="round" />
      </>}
      {kind === "workflow" && <>
        <path d="M65 110h56m49 0h25V65h27m-27 45v45h27" stroke="#001F49" strokeWidth="3" />
        <rect x="20" y="88" width="48" height="44" rx="9" fill="#00A99A" /><path d="m39 99 17 11-17 11Z" fill="white" />
        <rect x="119" y="85" width="52" height="50" rx="10" fill="white" stroke="#007E78" strokeWidth="3" />
        <circle cx="145" cy="110" r="12" stroke="#007E78" strokeWidth="6" /><circle cx="145" cy="110" r="4" fill="#007E78" />
        {[43, 133].map(y => <rect key={y} x="218" y={y} width="43" height="43" rx="8" fill="white" stroke="#007E78" strokeWidth="3" />)}
        <path d="m227 58 12 10 13-10m-25 90 10 10 16-18" stroke="#00A99A" strokeWidth="3" />
      </>}
    </svg>
  );
}

function Cards({ items }: { items: Concept[] }) {
  return <div className="project-grid">{items.map(item => <article className="project-card" key={item.title}>
    <Illustration kind={item.illustration} />
    <div><span className={`project-status ${item.illustration === "workflow" ? "status-concept" : "status-progress"}`}>{item.illustration === "workflow" ? "Concept" : "In progress"}</span><h3>{item.title}</h3><p>{item.description}</p></div>
  </article>)}</div>;
}

export default function UpcomingProjects() {
  return <div className="projects-page"><div className="shell">
    <header className="projects-intro">
      <p className="kicker">WrenLabs PH / Upcoming Projects</p>
      <div className="projects-headline"><h1>The next chapter.<br /><span>On and off the court.</span></h1><p>New possibilities for players, coaches, venues and businesses.</p></div>
      <p className="projects-note">Concepts under consideration. Features and availability are not yet confirmed.</p>
    </header>
    <section className="project-group" aria-labelledby="court-projects"><h2 id="court-projects">DinkVision / On the court</h2><Cards items={court} /></section>
    <section className="project-group business-projects" aria-labelledby="business-projects"><h2 id="business-projects">WrenLabs PH / Beyond the court</h2><Cards items={business} /></section>
    <aside className="projects-cta" aria-labelledby="projects-cta-title"><div><h2 id="projects-cta-title">Your idea could be next.</h2><p>Tell us what you want to build.</p></div><Link className="btn" href="/quote?inquiry=custom-application">Discuss your idea <span aria-hidden="true">↗</span></Link></aside>
    <p className="projects-disclaimer">Future concepts are separate from the current DinkVision offer. Custom development is quoted separately.</p>
  </div></div>;
}
