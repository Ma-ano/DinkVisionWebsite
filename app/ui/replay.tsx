"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export function Replay({ src, poster }: { src: string; poster: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const tile = (
    <>
      <span className="thumb">
        <Image src={poster} fill sizes="80px" alt="" />
        <b aria-hidden>{src ? "▶" : "↗"}</b>
      </span>
      <span>
        <strong>{src ? "Watch a sample replay" : "See how it works"}</strong>
        <small>{src ? "Courtside camera view" : "Courtside recording"}</small>
      </span>
    </>
  );
  if (!src)
    return (
      <a className="tile" href="#how-it-works">
        {tile}
      </a>
    );
  return (
    <>
      <button className="tile" onClick={() => dialog.current?.showModal()}>
        {tile}
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="replay-heading"
        onClose={() => player.current?.pause()}
      >
        <div className="dialog-head">
          <h2 id="replay-heading">Sample replay</h2>
          <button onClick={() => dialog.current?.close()}>Close ×</button>
        </div>
        <video
          ref={player}
          controls
          playsInline
          preload="none"
          src={src}
          poster={poster}
          onError={() => setFailed(true)}
        />
        {failed && (
          <p>
            Replay unavailable.{" "}
            <a href="#how-it-works" onClick={() => dialog.current?.close()}>
              See how recording works
            </a>
            .
          </p>
        )}
      </dialog>
    </>
  );
}
export function BackgroundVideo({ src }: { src: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = video.current;
    if (!el || !src) return;
    const pref = matchMedia(
      "(prefers-reduced-motion: reduce), (prefers-reduced-data: reduce)",
    );
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let visible = false;
    let active = true;
    function sync() {
      if (!el) return;
      if (pref.matches || connection?.saveData) {
        el.pause();
        setReady(false);
        return;
      }
      if (!visible || document.hidden || paused) {
        el.pause();
        return;
      }
      if (!el.getAttribute("src")) el.src = src;
      el.play()
        .then(() => {
          if (active) setReady(true);
        })
        .catch(() => {
          if (active) setReady(false);
        });
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    pref.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      active = false;
      el.pause();
      observer.disconnect();
      pref.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [src, paused]);
  if (!src) return null;
  return (
    <>
      <video
        aria-hidden
        ref={video}
        className={"bg-video" + (ready ? " ready" : "")}
        muted
        loop
        playsInline
      />
      <button
        hidden={!ready}
        className="video-toggle"
        onClick={() => setPaused(!paused)}
      >
        {paused ? "Play background" : "Pause background"}
      </button>
    </>
  );
}
