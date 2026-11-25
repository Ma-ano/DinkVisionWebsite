"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", animate);
    function animate() {
      if (
        matchMedia("(prefers-reduced-data: reduce)").matches ||
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData
      )
        return;
      gsap.from(".hero-line", {
        yPercent: 105,
        duration: 0.68,
        stagger: 0.09,
        ease: "power3.out",
      });
      gsap.from(".tile", { opacity: 0, y: 6, duration: 0.55 });
      const trigger = {
        trigger: ".intro",
        start: "top 82%",
        end: "top 45%",
        scrub: true,
      };
      gsap.from(".intro img", { scale: 0.94, scrollTrigger: trigger });
      gsap.from(".intro strong span", {
        color: "#526A75",
        stagger: 0.2,
        scrollTrigger: trigger,
      });
      gsap.from(".step-card", {
        y: 16,
        stagger: 0.07,
        duration: 0.45,
        scrollTrigger: { trigger: ".steps", start: "top 92%" },
      });
    }
    return () => mm.revert();
  }, []);
  return null;
}
