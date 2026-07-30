"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One shared Lenis instance per page.
 *
 * Lenis hijacks wheel/touch on `window` and drives the scroll itself, so any UI
 * that needs to (a) scroll on its own or (b) freeze the page has to talk to the
 * instance directly — `body { overflow: hidden }` alone does nothing, Lenis
 * keeps scrolling right past it. This module is the handle everything else uses.
 *
 * Two rules for consumers:
 *   1. Any nested scroll container (drawer, modal body) needs `data-lenis-prevent`
 *      so Lenis lets the gesture through to the browser.
 *   2. Freeze/unfreeze the page with `useScrollLock`, never with body overflow.
 */

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

/** Boots Lenis + wires it to GSAP's ticker and ScrollTrigger. One call per page root. */
export function useSmoothScroll() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: isMobile ? 0.15 : 0.065,
      wheelMultiplier: isMobile ? 1 : 0.85,
      smoothWheel: true,
    });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      if (instance === lenis) instance = null;
    };
  }, []);
}

/**
 * Freezes the page behind an open overlay (drawer, modal) and restores it after.
 *
 * `lenis.stop()` is the real lock: while stopped Lenis calls preventDefault on
 * both wheel and touch, so neither pointer nor finger moves the page — while
 * anything marked `data-lenis-prevent` still scrolls natively.
 *
 * `overflow: hidden` on <html> is only added as a keyboard/native belt-and-braces
 * when the scrollbar takes no layout width (mobile + overlay scrollbars). On a
 * classic desktop scrollbar we skip it, since removing it would shift the whole
 * page sideways the moment the overlay opens.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const lenis = getLenis();
    lenis?.stop();

    const root = document.documentElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const canHideOverflow = scrollbarWidth === 0;

    const prevOverflow = root.style.overflow;
    if (canHideOverflow) root.style.overflow = "hidden";

    // Lets floating chrome (the WhatsApp FAB) duck out of the way while an
    // overlay is up — it's stacked above everything and would sit on the menu.
    root.dataset.overlayOpen = "true";

    // Fallback for the (brief) window before Lenis has booted.
    const prevBodyOverflow = document.body.style.overflow;
    if (!lenis) document.body.style.overflow = "hidden";

    return () => {
      getLenis()?.start();
      if (canHideOverflow) root.style.overflow = prevOverflow;
      document.body.style.overflow = prevBodyOverflow;
      delete root.dataset.overlayOpen;
    };
  }, [active]);
}
