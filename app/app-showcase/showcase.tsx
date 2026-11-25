"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ShowcaseChapter } from "./chapters";

function ChapterCaption({ chapter }: { chapter: ShowcaseChapter }) {
  return (
    <>
      <p className="chapter-label">{chapter.label}</p>
      <h2>{chapter.heading}</h2>
      <p className="chapter-description">{chapter.description}</p>
    </>
  );
}

export default function AppShowcase({
  chapters,
}: {
  chapters: ShowcaseChapter[];
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const enlarge = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const chapter = chapters[active];

  useEffect(() => {
    if (!lightboxOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightboxOpen]);

  function choose(index: number) {
    setActive(Math.max(0, Math.min(chapters.length - 1, index)));
  }

  function openLightbox() {
    dialog.current?.showModal();
    setLightboxOpen(true);
  }

  return (
    <>
      <div className="shell experience-track">
        <div
          className="experience-stage"
          aria-label="DinkVision app walkthrough"
        >
          <header className="experience-intro">
            <p className="kicker">THE DINKVISION EXPERIENCE</p>
            <h1>TAP. PLAY.<br /><span>RELIVE.</span></h1>
          </header>
          <div className="experience-caption">
            <div className="caption-sizer" aria-hidden="true">
              {chapters.map((item) => (
                <div key={item.label}>
                  <ChapterCaption chapter={item} />
                </div>
              ))}
            </div>
            <div id="chapter-caption" aria-live="polite" aria-atomic="true">
              <div key={active} className="caption-content">
                <ChapterCaption chapter={chapter} />
              </div>
            </div>
          </div>
          <div className="experience-media">
            <div
              className="experience-device"
              onTouchStart={(event) => {
                const t = event.touches[0];
                touch.current = { x: t.clientX, y: t.clientY };
              }}
              onTouchEnd={(event) => {
                if (!touch.current) return;
                const t = event.changedTouches[0];
                const dx = t.clientX - touch.current.x;
                const dy = t.clientY - touch.current.y;
                touch.current = null;
                if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5)
                  choose(active + (dx < 0 ? 1 : -1));
              }}
              onTouchCancel={() => {
                touch.current = null;
              }}
            >
              <div className="experience-screen" id="showcase-screen">
                {chapters.map((item, index) => (
                  <div
                    key={item.image}
                    className={
                      "screen-slide" + (index === active ? " selected" : "")
                    }
                    aria-hidden={index !== active}
                  >
                    <Image
                      src={item.image}
                      alt={index === active ? item.alt : ""}
                      width={2560}
                      height={1600}
                      sizes="(max-width: 700px) 92vw, (max-width: 1200px) 88vw, 850px"
                      loading={Math.abs(index - active) <= 1 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="device-tools">
              <p>App screen preview</p>
              <button
                ref={enlarge}
                onClick={openLightbox}
                className="enlarge-button"
              >
                Enlarge screenshot <span aria-hidden>↗</span>
              </button>
            </div>
          </div>
          <div className="experience-navigation">
            <div
              className="chapter-controls"
              role="group"
              aria-label="Choose a chapter"
            >
              {chapters.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  className={index === active ? "current" : ""}
                  aria-label={item.label + ": " + item.heading}
                  aria-pressed={index === active}
                  aria-controls="showcase-screen chapter-caption"
                  onClick={() => choose(index)}
                >
                  <span className="timeline-segment" aria-hidden />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <div className="gallery-controls">
              <button
                type="button"
                onClick={() => choose(active - 1)}
                disabled={active === 0}
                aria-label="Previous chapter"
              >
                ←
              </button>
              <span className="chapter-count">
                {active + 1} / {chapters.length}
              </span>
              <button
                type="button"
                onClick={() => choose(active + 1)}
                disabled={active === chapters.length - 1}
                aria-label="Next chapter"
              >
                →
              </button>
            </div>
            <p className="scroll-hint">
              Choose a chapter or swipe the screen
            </p>
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="screenshot-lightbox"
        aria-labelledby="lightbox-title"
        onClose={() => {
          setLightboxOpen(false);
          enlarge.current?.focus({ preventScroll: true });
        }}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            const buttons = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                "button:not(:disabled)",
              ),
            );
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            choose(active - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            choose(active + 1);
          }
        }}
      >
        <div className="lightbox-top">
          <p>{chapter.label}</p>
          <button type="button" onClick={() => dialog.current?.close()}>
            Close <span aria-hidden>×</span>
          </button>
        </div>
        {lightboxOpen && (
          <Image
            className="lightbox-image"
            src={chapter.image}
            alt={chapter.alt}
            width={2560}
            height={1600}
            sizes="95vw"
            loading="eager"
          />
        )}
        <div className="lightbox-bottom">
          <div aria-live="polite" aria-atomic="true">
            <h2 id="lightbox-title">{chapter.heading}</h2>
            <p>{chapter.description}</p>
          </div>
          <div className="gallery-controls">
            <button
              type="button"
              onClick={() => choose(active - 1)}
              disabled={active === 0}
              aria-label="Previous screenshot"
            >
              ←
            </button>
            <span>
              {active + 1} / {chapters.length}
            </span>
            <button
              type="button"
              onClick={() => choose(active + 1)}
              disabled={active === chapters.length - 1}
              aria-label="Next screenshot"
            >
              →
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
