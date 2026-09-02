"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SubpageHero({ children }: { children: ReactNode }) {
  const bandRef  = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLImageElement>(null);
  const ruleRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set([mediaRef.current, ruleRef.current], { opacity: 1, scaleX: 1, y: 0 });
        return;
      }

      gsap.fromTo(mediaRef.current, { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.06 });

      gsap.fromTo(ruleRef.current, { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.75, ease: "expo.out", delay: 0.5 });

     
     
     
      gsap.fromTo(imgRef.current, { yPercent: -5 }, {
        yPercent: 5, ease: "none",
        scrollTrigger: { trigger: bandRef.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, bandRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={bandRef} className="subhero-band">
      <div className="subhero-photo">
        <div ref={mediaRef} className="subhero-photo-media">
          <picture>
            <source media="(max-width: 767px)" srcSet="/SubPagesBGPhone.avif" />
            <img ref={imgRef} src="/SubPagesBGDesktop.avif" alt="" aria-hidden="true" fetchPriority="high" />
          </picture>
        </div>
        {}
        <div className="subhero-scrim" />
        <div className="subhero-cap" />
        <div className="subhero-fade" />
      </div>

      <div className="subhero-inner">
        <div className="subhero-text">
          {children}
          <div ref={ruleRef} className="subhero-rule" />
        </div>
      </div>
    </div>
  );
}
