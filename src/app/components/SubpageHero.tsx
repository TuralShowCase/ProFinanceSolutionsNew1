"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Subpage (About / Service) hero band — an editorial split on desktop:
// headline on clear page surface at left, photo panel bleeding off the right
// edge. The panel's left edge is pinned to the middle of the same 1280/48px
// container every section below uses, so the headline lines up with the page
// and the photo gets a tall-ish box instead of a letterbox slice.
//
// Why the split: SubPagesBGDesktop is 21:9 (1915×821). Run full-bleed at a
// fixed band height it had to be cropped vertically, and the taller the screen
// the worse it got — a 1920 desktop saw ~45% of the frame, a 2560 one ~34%.
// A ~2:1 panel crops the *sides* instead (empty sky, the laptop edge), so the
// subject, the desk and the Baku skyline all survive at every width.
//
// Layout lives in globals.css (.subhero-*) rather than inline styles so the
// desktop→tablet→mobile switch happens in CSS media queries: correct at first
// paint, no useBreakpoint hydration flash on a full-page-width component.
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

      // Scroll-linked drift only — no loop, nothing moving once the page is
      // still. The image is laid out 116% tall at top:-8% so ±5% of travel
      // never exposes an edge.
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
        {/* Only rendered ≤1023px, where the photo runs full-bleed under the type */}
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
