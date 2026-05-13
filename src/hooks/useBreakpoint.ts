"use client";

import { useEffect, useState } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint {
  // "desktop" default is SSR-safe — matches the existing design so server HTML
  // is correct for the majority (desktop) visitors. Mobile users see correct
  // layout after the first useEffect fires (essentially instant post-hydration).
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      const w = window.innerWidth;
      if (w < 768) return "mobile";
      if (w < 1024) return "tablet";
      return "desktop";
    };

    const mqlMobile = window.matchMedia("(max-width: 768px)");
    const mqlTablet = window.matchMedia("(min-width: 769px) and (max-width: 1024px)");

    const onChange = () => setBp(getBreakpoint());

    mqlMobile.addEventListener("change", onChange);
    mqlTablet.addEventListener("change", onChange);

    setBp(getBreakpoint());

    return () => {
      mqlMobile.removeEventListener("change", onChange);
      mqlTablet.removeEventListener("change", onChange);
    };
  }, []);

  return bp;
}
