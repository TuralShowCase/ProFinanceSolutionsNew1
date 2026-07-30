// Typography scale — single source of truth for font sizes across the site.
// Pairs with src/app/lib/brand.ts (colors).
//
// System: base 16px (the floor — nothing on the site renders smaller), then a
// ~Major-Third progression rounded to a 4px grid. Small end uses linear 2px
// steps (Label/Body/Body-lg) since perceived difference matters more at small
// sizes; heading end uses bigger multiplicative jumps (H4/H3/H2/Display).
//
// Only 7 roles — deliberately fewer than a first pass tends to produce.
// Label covers every tracked-uppercase meta use (eyebrow, tag, badge, footer
// column, legal text): those don't need different sizes, they differentiate
// by weight/tracking/case/color. Same logic merged body/body-sm/caption into
// one Body role — "dense vs spacious" is a layout/spacing decision, not a
// font-size one.
//
// Pick a token by role, not by "whatever's close enough" — that's how the
// scale fragmented into 15+ one-off values the first time around.

/* ---- 1. Label — 16px ----
   Standalone tracked-uppercase reading labels: eyebrows, footer columns,
   legal/fine print, mega-menu taglines. */
export const FS_LABEL = 16;

/* ---- 1b. Chip — 13px (deliberately below the 16px floor) ----
   Small status/category pills that sit BESIDE or directly above another
   heading (e.g. a "PARTNER" badge next to a firm name, a milestone tag above
   its title). These are secondary UI accents, not reading content — the 16px
   floor is for text a visitor reads for information, not a tiny indicator
   that would otherwise visually outweigh the heading it's labeling. */
export const FS_CHIP = 13;

/* ---- 2. Body — 18px ----
   Every paragraph: descriptions, subtext, card copy, footer links, list items. */
export const FS_BODY = 18;

/* ---- 3. Body-lg — 20px ----
   Lead paragraph / pull quote — one emphasized line introducing a Body block. */
export const FS_BODY_LG = 20;

/* ---- 4. H4 — 20 / 24px (mobile / desktop) ----
   Dense card, list, or process-step title. */
export const FS_H4_MOBILE  = 20;
export const FS_H4_DESKTOP = 24;

/* ---- 5. H3 — 24–32px fluid ----
   Subsection heading: pillar/feature-card title, and the final dark CTA-card
   heading (shares this tier rather than having its own bespoke size). */
export const FS_H3 = "clamp(1.5rem, 2.6vw, 2rem)";

/* ---- 6. H2 — 32–48px fluid ----
   Section heading. ONE size for every major section, homepage and About page
   alike — there's no real reason About's heading should be quietly bigger. */
export const FS_H2 = "clamp(2rem, 3.5vw, 3rem)";

/* ---- 7. Display — 36–72px across 3 breakpoints ----
   Page-title H1 (About hero, Service hero). Needs distinct mobile/tablet/
   desktop steps (long headlines don't always scale well on vw alone).

   The desktop step is sized to the subpage hero's editorial split: the title
   column is ~46% of a 1184px container (≈519px at 1280+), not the ~58% it had
   when the photo ran full-bleed behind it. 72px keeps the longest single word
   in the content ("diaqnostikası", 13 chars ≈ 474px at this weight/tracking)
   inside the column at every desktop width; the old 80px overflowed it. */
export const FS_DISPLAY_MOBILE  = "clamp(2.25rem, 9vw, 2.75rem)";    // 36–44px
export const FS_DISPLAY_TABLET  = "clamp(3rem, 6.5vw, 4rem)";        // 48–64px
export const FS_DISPLAY_DESKTOP = "clamp(3.25rem, 4.4vw, 4.5rem)";   // 52–72px
