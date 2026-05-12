"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  style?: React.CSSProperties;
}

export function CounterStat({ end, suffix = "", prefix = "", duration = 1.8, style }: CounterStatProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.val) + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });
    return () => { tween.kill(); };
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={ref} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
