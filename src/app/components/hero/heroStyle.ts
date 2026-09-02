

export const INK    = "#FFFFFF";                
export const SUB    = "rgba(255,255,255,0.95)"; 
export const FAINT  = "rgba(255,255,255,0.50)"; 
export const HAIR   = "rgba(255,255,255,0.22)"; 
export const ACCENT = "#5AD094";                

export type HeroSlide = {
  img: string;
  srcSet: string;
  key: "slide1" | "slide2";
  objectPosition: string;
};


export const HERO_SIZES = "100vw";

const widths = (base: string) =>
  `${base}-828.avif 828w, ${base}-1280.avif 1280w, ${base}.avif 1672w`;

export const SLIDES: HeroSlide[] = [
  { img: "/HeroSlide1.avif", srcSet: widths("/HeroSlide1"), key: "slide1", objectPosition: "50% 42%" },
  { img: "/HeroSlide2.avif", srcSet: widths("/HeroSlide2"), key: "slide2", objectPosition: "50% 40%" },
];

export const SLIDE_SECONDS = 8;
