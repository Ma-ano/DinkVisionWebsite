"use client";
import Image from "next/image";
import { useState } from "react";
type Card = { title: string; detail: string; image: string };
export default function Cards({ cards }: { cards: Card[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="steps">
      {cards.map((card, i) => (
        <article
          key={card.title}
          className={"step-card" + (active === i ? " active" : "")}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
        >
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(max-width: 700px) 95vw, 43vw"
          />
          <div className="card-top">
            <span>0{i + 1}</span>
            <span aria-hidden>{active === i ? "−" : "+"}</span>
          </div>
          <div className="card-copy">
            <h3>{card.title}</h3>
            <p>{card.detail}</p>
          </div>
          <button
            className="card-select"
            aria-label={card.title}
            aria-expanded={active === i}
            onClick={() => setActive(i)}
          />
        </article>
      ))}
    </div>
  );
}
