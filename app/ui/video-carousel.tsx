"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { videoClips, type VideoClip } from "@/lib/video-clips";
import "./video-carousel.css";

function formatTime(seconds: number) {
  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  return minutes + ":" + String(wholeSeconds % 60).padStart(2, "0");
}

function ClipPlayer({
  clip,
  active,
  onPlay,
}: {
  clip: VideoClip;
  active: boolean;
  onPlay: (currentVideo: HTMLVideoElement) => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hasSought, setHasSought] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);
  const available = Boolean(clip.src) && !failed;
  const elapsedTime = formatTime(position);
  const totalTime = duration > 0 ? formatTime(duration) : "–:––";

  const connectVideo = useCallback((player: HTMLVideoElement | null) => {
    video.current = player;
    if (player && Number.isFinite(player.duration)) setDuration(player.duration);
    if (player?.error) setFailed(true);
  }, []);

  function togglePlayback() {
    const player = video.current;
    if (!player) return;
    if (!player.paused) {
      player.pause();
      return;
    }

    setPlayFailed(false);
    void player.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setPlayFailed(true);
    });
  }

  function seek(event: ChangeEvent<HTMLInputElement>) {
    const player = video.current;
    if (!player) return;
    player.currentTime = event.currentTarget.valueAsNumber;
    setPosition(player.currentTime);
    setHasSought(true);
  }

  function updatePosition(event: SyntheticEvent<HTMLVideoElement>) {
    setPosition(event.currentTarget.currentTime);
  }

  return (
    <>
      <div className="clip-picture">
        {available ? (
          <video
            ref={connectVideo}
            playsInline
            preload={active ? "metadata" : "none"}
            src={clip.src}
            poster={hasSought ? undefined : clip.poster}
            aria-label={clip.title}
            onDurationChange={({ currentTarget }) => {
              setDuration(Number.isFinite(currentTarget.duration) ? currentTarget.duration : 0);
            }}
            onTimeUpdate={updatePosition}
            onSeeked={updatePosition}
            onPlay={({ currentTarget }) => {
              setPlaying(true);
              onPlay(currentTarget);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setFailed(true)}
          >
            {clip.captions && <track kind="captions" src={clip.captions} srcLang="en" label="English" default />}
          </video>
        ) : (
          <>
            <Image src={clip.poster} alt="" fill sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 900px) 92vw, (max-width: 1455px) 88vw, 1280px" />
            <div className="clip-placeholder"><span>{failed ? "Video unavailable" : "Clip coming soon"}</span></div>
          </>
        )}
      </div>
      {available && (
        <>
          <div className="clip-playback" role="group" aria-label="Clip playback">
            <button className="clip-play-toggle" type="button" onClick={togglePlayback} aria-label={playing ? "Pause clip" : "Play clip"}>
              <span className={playing ? "clip-pause-icon" : "clip-play-icon"} aria-hidden="true" />
            </button>
            <input
              type="range"
              aria-label="Seek through clip"
              aria-valuetext={elapsedTime + " of " + totalTime}
              min={0}
              max={duration || 1}
              step="any"
              value={Math.min(position, duration)}
              disabled={duration === 0}
              onChange={seek}
            />
            <span className="clip-playback-time" aria-hidden="true">{elapsedTime} / {totalTime}</span>
          </div>
          {playFailed && <p className="clip-playback-error" role="status">Couldn’t play the clip. Try again.</p>}
        </>
      )}
    </>
  );
}

export default function VideoCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function pauseOtherClips(currentVideo: HTMLVideoElement) {
    rail.current?.querySelectorAll("video").forEach((video) => {
      if (video !== currentVideo) video.pause();
    });
  }

  function navigate(index: number) {
    const container = rail.current;
    const card = container?.children[index] as HTMLElement | undefined;
    if (!container || !card) return;
    container.scrollTo({
      left: card.offsetLeft - (container.children[0] as HTMLElement).offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className="clip-section shell" aria-labelledby="clips-title" aria-roledescription="carousel">
      <p className="clip-eyebrow">SEE DINKVISION IN ACTION</p>
      <div className="clip-heading">
        <h2 id="clips-title">Watch the game.<br /><em>Relive the moment.</em></h2>
        <p>Watch four short rallies from iPlay and Dink Garage.</p>
      </div>
      <div className="clip-rail" id="clip-rail" ref={rail} onScroll={() => {
        const container = rail.current;
        if (!container) return;
        const first = container.children[0] as HTMLElement;
        let nearest = 0;
        Array.from(container.children).forEach((item, index) => {
          if (Math.abs((item as HTMLElement).offsetLeft - first.offsetLeft - container.scrollLeft) < Math.abs((container.children[nearest] as HTMLElement).offsetLeft - first.offsetLeft - container.scrollLeft)) nearest = index;
        });
        setActive(nearest);
        container.querySelectorAll("video").forEach((video) => {
          // Pause any player whose card is outside the visible rail.
          const rect = video.getBoundingClientRect();
          const bounds = container.getBoundingClientRect();
          if (rect.right <= bounds.left || rect.left >= bounds.right) video.pause();
        });
      }}>
        {videoClips.map((clip, index) => (
          <article className="clip-card" key={clip.title} aria-label={`${index + 1} of ${videoClips.length}: ${clip.title}`}>
            <ClipPlayer clip={clip} active={index === active} onPlay={pauseOtherClips} />
            <div className="clip-caption"><span>{String(index + 1).padStart(2, "0")}</span><h3>{clip.title}</h3></div>
          </article>
        ))}
      </div>
      <div className="clip-footer">
        <div className="clip-controls" role="group" aria-label="Video carousel navigation">
          <button onClick={() => navigate(active - 1)} disabled={active === 0} aria-label="Previous clip" aria-controls="clip-rail">←</button>
          <span aria-live="polite" aria-atomic="true">{active + 1} / {videoClips.length}</span>
          <button onClick={() => navigate(active + 1)} disabled={active === videoClips.length - 1} aria-label="Next clip" aria-controls="clip-rail">→</button>
        </div>
      </div>
    </section>
  );
}


