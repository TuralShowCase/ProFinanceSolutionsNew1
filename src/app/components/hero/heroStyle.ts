// Shared palette + config for the full-screen photo hero.
// The photograph fills the viewport un-zoomed (no Ken Burns — zooming crops);
// text sits over a bottom gradient, so these are fixed photo-legible colors,
// identical in both site themes.

export const INK    = "#FFFFFF";                 // headline
export const SUB    = "rgba(255,255,255,0.95)";  // sub-text — must read as clearly as the headline
export const FAINT  = "rgba(255,255,255,0.50)";  // inactive pagination
export const HAIR   = "rgba(255,255,255,0.22)";  // hairlines / progress tracks
export const ACCENT = "#5AD094";                 // bright brand green over the photo

export type HeroSlide = {
  img: string;
  srcSet: string;
  key: "slide1" | "slide2";
  objectPosition: string;
};

/**
 * The hero runs full-bleed, so `sizes="100vw"` and the browser picks a width.
 *
 * Before this there was a single 1672px file for every device — a 390px phone
 * downloaded the full desktop asset for its LCP element. Same crop at every
 * size (no art direction), so plain srcset is the right tool: 828w is ~31KB
 * against the original 86KB.
 *
 * Variants are generated from the originals; regenerate them if the source
 * photographs are ever replaced.
 */
export const HERO_SIZES = "100vw";

const widths = (base: string) =>
  `${base}-828.avif 828w, ${base}-1280.avif 1280w, ${base}.avif 1672w`;

export const SLIDES: HeroSlide[] = [
  { img: "/HeroSlide1.avif", srcSet: widths("/HeroSlide1"), key: "slide1", objectPosition: "50% 42%" },
  { img: "/HeroSlide2.avif", srcSet: widths("/HeroSlide2"), key: "slide2", objectPosition: "50% 40%" },
];

// Seconds per slide. The GSAP progress tween in HeroSection is the ONLY timer —
// the bar filling and the slide advancing are the same tween, so they cannot drift.
export const SLIDE_SECONDS = 8;
