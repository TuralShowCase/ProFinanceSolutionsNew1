"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}


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



    root.dataset.overlayOpen = "true";


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
