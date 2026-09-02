"use client";

import { useEffect, useState } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint {



  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      const w = window.innerWidth;
      if (w < 768) return "mobile";
      if (w < 1024) return "tablet";
      return "desktop";
    };

    const mqlMobile = window.matchMedia("(max-width: 767px)");
    const mqlTablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");

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
