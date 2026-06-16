// Brand color tokens — theme-aware via CSS custom properties.
// Light/dark values live in src/app/globals.css (:root and :root.dark).
// These constants resolve to var(...) so a single class flip on <html> retints
// the whole site. Use mix() for translucent tints instead of "#hex + alpha".

/* ---- Brand greens (accent CONTENT: text, icons, dots, thin lines, tints) ---- */
export const DARK   = "var(--brand)";          // primary accent — flips bright green on dark
export const ACCENT = "var(--accent-green)";   // bright green accent
export const MID    = "var(--brand-hover)";    // hover green
export const LIGHT  = "var(--brand-light)";    // lighter green

/* ---- Page surfaces ---- */
export const BG     = "var(--page-bg)";        // primary section background
export const CREAM  = "var(--page-bg-alt)";    // warm section background

/* ---- Filled surfaces that carry WHITE content ---- */
export const BRAND_SOLID = "var(--brand-solid)"; // green buttons / pills / icon boxes (white text reads)
export const INVERT      = "var(--invert)";      // large intentionally-dark panels (bands, CTA cards)

/* ---- Neutral surfaces & text ---- */
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

/* ---- Translucent tint helper ----
   Replaces the old `${DARK}0D` hex-alpha concatenation, which breaks with var().
   mix(DARK, 6) === color-mix(in srgb, var(--brand) 6%, transparent) — theme-aware. */
export const mix = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

/* ---- PLH partner colors (fixed — partner's own brand, dark in both themes) ---- */
export const PLH_DARK = "#092c3a";   // partner deep teal (used as panel background)
export const PLH_MID  = "#0d3d50";
export const PLH_ACC  = "#29a9bd";   // partner teal accent (legible on both themes)
export const PLH_TEXT = "var(--plh-text)"; // partner heading text on light tint panels (flips for dark)
