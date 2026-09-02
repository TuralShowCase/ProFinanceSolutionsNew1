


export const DARK   = "var(--brand)";         
export const ACCENT = "var(--accent-green)";  
export const MID    = "var(--brand-hover)";   
export const LIGHT  = "var(--brand-light)";   


export const BG     = "var(--page-bg)";       
export const CREAM  = "var(--page-bg-alt)";   


export const BRAND_SOLID = "var(--brand-solid)";
export const INVERT      = "var(--invert)";     


export const SURFACE     = "var(--surface)";
export const SURFACE_2   = "var(--surface-2)";
export const SURFACE_3   = "var(--surface-3)";
export const TEXT         = "var(--text)";
export const TEXT_STRONG  = "var(--text-strong)";
export const TEXT_SOFT    = "var(--text-soft)";
export const TEXT_MUTED   = "var(--text-muted)";
export const TEXT_FAINT   = "var(--text-faint)";
export const BORDER       = "var(--border)";
export const BORDER_STRONG = "var(--border-strong)";


export const mix = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;


export const PLH_DARK = "#092c3a";  
export const PLH_MID  = "#0d3d50";
export const PLH_ACC  = "#29a9bd";  
export const PLH_TEXT = "var(--plh-text)";
