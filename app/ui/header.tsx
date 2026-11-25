"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useSyncExternalStore } from "react";
import "./header.css";

const links = [
  ["/#", "Home"],
  ["/for-court-owners", "For court owners"],
  ["/about", "About"],
  ["/app-showcase", "App showcase"],
  ["/upcoming-projects", "Upcoming projects"],
  ["/players", "Player guide"],
];
function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}
function activeSection() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("main section[id]"),
  );
  if (
    window.scrollY > 0 &&
    window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
  ) {
    return sections.at(-1)?.id || "";
  }
  return (
    sections
      .filter((section) => section.getBoundingClientRect().top <= 160)
      .at(-1)?.id || ""
  );
}
export default function Header() {
  const path = usePathname();
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > 16,
    () => false,
  );
  const section = useSyncExternalStore(subscribe, activeSection, () => "");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const current = path === "/" ? "/" + (section ? "#" + section : "") : path;
  function close() {
    setOpen(false);
  }
  function navLink([url, label]: string[]) {
    const props = {
      className: "nav-item",
      "aria-current":
        current === url.replace(/#$/, "")
          ? path === "/" && section
            ? ("location" as const)
            : ("page" as const)
          : undefined,
      onClick: close,
    };
    return url.includes("#") ? (
      <a key={url} href={url} {...props}>
        {label}
      </a>
    ) : (
      <Link key={url} href={url} {...props}>
        {label}
      </Link>
    );
  }
  return (
    <header
      className={
        "site-header" +
        (path === "/" ? " over-hero" : "") +
        (scrolled || path !== "/" || open ? " filled" : "")
      }
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        if (open) {
          close();
          toggle.current?.focus();
        }
      }}
    >
      <div className="header-inner">
        <Link
          className="header-logo"
          href="/#"
          aria-label="DinkVision home"
          onClick={(e) => {
            close();
            if (path === "/") {
              e.preventDefault();
              window.location.hash = "";
              window.scrollTo({ top: 0 });
            }
          }}
        >
          <Image
            src="/brand/dinkvision-logo-web.png"
            alt="DinkVision"
            width={1079}
            height={353}
            priority
          />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden>{open ? "×" : "☰"}</span>
          {open ? "Close" : "Menu"}
        </button>
        <nav
          id="navigation"
          aria-label="Main"
          className={open ? "header-navigation opened" : "header-navigation"}
        >
          <div className="nav-links">
            {links.map(navLink)}

          </div>
          <Link
            className="btn nav-quote"
            href="/quote"
            aria-current={path === "/quote" ? "page" : undefined}
            onClick={close}
          >
            Request a quote <span aria-hidden>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
