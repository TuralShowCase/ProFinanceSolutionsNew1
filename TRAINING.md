# Claude Training Notes — ProFinance Solutions

Personal lessons learned while working on this project. Read this before starting a new session.

---

## User Preferences & Workflow

**How this user works:**
- Always asks for ideas/options first before implementing — present 2–3 choices, wait for "go for it" or an option number
- Says "nvm" when they want a full restart — don't try to salvage, start clean
- Will approve incrementally — don't implement everything at once
- Dislikes trailing summaries after edits (they can read the diff)
- Says "alr" = "alright, proceed" — it's approval

**Design preferences:**
- Strongly prefers brand green `#1A3D2B` / `#52B788` — never introduce blue, teal, or off-brand colors without explicit approval. Learned: introduced `#29C5C5` teal, user immediately said "no blue colors only our green template"
- Dislikes clichés — "man at desk with document" is cliché for accounting. "it looks cliche rn" = full redo
- Prefers minimal, clean, intentional over decorative and busy
- Drop shadows on people/objects = cliché unless done very subtly
- Less is more with SVG decorations — when in doubt, remove
- Likes the "humans living in the design" concept — people integrated into 3D/layered compositions, not just placed on backgrounds

**Iteration pattern:**
1. User describes what they want (often vague)
2. I explore, ask clarifying questions or present ideas
3. User picks direction
4. I implement
5. User says "remove X", "move Y", "change Z" — make targeted edits, don't re-do everything
6. Occasionally "nvm, start from scratch" — full rebuild of that component

---

## Technical Lessons Learned

### Absolute Positioning & Heights
**Problem:** `height: "118%"` on an absolutely positioned image does nothing useful if the parent has no explicit height set.
**Cause:** Percentage heights on absolutely positioned children reference the parent's height. If the parent's height is determined by content (no explicit `height` or `min-height`), the percentage resolves to 0 or auto.
**Fix:** Always give the parent an explicit `height` or `min-height` before using percentage heights on absolute children. Use `height: "calc(100vh - 232px)"` for full-viewport containers.

### Left Positioning Confusion
**Problem:** Setting `left: "-10%"` actually moved the image RIGHT compared to `left: "50%", transform: "translateX(-50%)"`.
**Why:** The `transform: "translateX(-50%)"` was pulling the image left by 50% of its own width. Removing it (by setting transform to 0) while keeping `left` at a small value shifts the anchor point rightward.
**Rule:** To move an image left when it was centered with `left:50%/translateX(-50%)`, you need a MUCH more negative left value (like `-30%` to `-50%`) to compensate for the removed negative transform.

### GSAP + React State Flash
**Problem:** When doing a fade transition with `setActiveSlide()` mid-timeline, the new slide flashes at full opacity for one frame before the `fromTo` opacity animation starts.
**Cause:** React re-renders the new slide component at default opacity (1) before GSAP's `fromTo` can set it to 0.
**Fix:**
```tsx
.call(() => setActiveSlide(next))
.set(slideContainerRef.current, { opacity: 0 })  // force 0 after React re-render
.to(slideContainerRef.current, { opacity: 1, duration: 0.85, ease: "sine.inOut", delay: 0.03 })
```
The `.set()` clamps it to 0 after the re-render, and `delay: 0.03` gives the browser one rAF cycle to settle.

### CSS animation + inline transform conflict
**Problem:** A badge had both `animation: "heroFloat 3.6s ease-in-out infinite"` (CSS keyframe that modifies `transform`) AND `transform: hovered ? "translate(10px, -6px)" : "translate(0,0)"` (inline style) — they fight each other.
**Fix:** Wrapper div pattern:
```tsx
{/* Outer: hover transform */}
<div style={{ transform: hovered ? "translate(10px,-6px)" : "translate(0,0)", transition }}>
  {/* Inner: CSS float animation */}
  <div style={{ animation: "heroFloat 3.6s ease-in-out infinite" }}>
    {/* content */}
  </div>
</div>
```

### filter: drop-shadow() on white-background images
**Problem:** `filter: drop-shadow()` on a WebP/PNG image with a solid white background creates a rectangular shadow around the white box — not a silhouette shadow.
**Why:** `drop-shadow` uses the image's alpha channel. If there's no transparency, it treats the whole rectangle as the shape.
**Fix:** Either use real transparent-background images (PNG with alpha), or use blurred ellipse divs positioned below the objects as manual shadows.

### flexbox alignSelf: stretch height
**Problem:** Child div with `alignSelf: "stretch"` doesn't give its absolutely positioned grandchildren a reliable height to percentage-reference against.
**Why:** `alignSelf: stretch` makes the element stretch to fill the cross-axis of its flex parent — but if the flex parent's own height is `minHeight` not `height`, the computed height may not cascade properly to descendants.
**Fix:** Explicitly set `height: "calc(100vh - Xpx)"` on the containing div instead of relying on flex stretch behavior.

### overflow: hidden on sections
**Important:** The main hero `<section>` has `overflow: "hidden"`. This clips any absolutely positioned children that try to bleed beyond the section boundaries. If you want an image to bleed beyond the section, you need to either remove overflow hidden or restructure so the overflow happens above the clip boundary.

---

## Design Pattern Notes

### The "room" concept for right-side graphics
Slide 1's right side uses concentric pill layers (3D stacked) + floating badge cards to create a sense of depth. When designing right-side graphics for other slides, the equivalent "room" elements are:
- Concentric rings (circles at different sizes, very low opacity)
- Floating badge cards with relevant data
- Accent SVG arcs or geometric fragments at corners

BUT: if the image itself already has rich 3D composition (like Slide2Human with calculator + floating %, chart, coins), DO NOT add competing floating badges. The image IS the room. Let it breathe.

### When to use which shadow approach
- **Floating UI badges/cards:** `boxShadow` on the container div
- **Human cutout figures with white bg:** Blurred ellipse divs positioned below key objects (`border-radius: 50%`, `filter: blur(Xpx)`, `rgba(0,0,0,0.1)`)
- **Pill/frame graphic:** `boxShadow` directly on the frame container — increase on hover
- **Never:** `filter: drop-shadow()` on images with white/solid backgrounds

### Glassmorphism recipe (used in Slide 2 frosted panel)
```css
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
background-color: rgba(255, 255, 255, 0.62);
border: 1px solid rgba(255, 255, 255, 0.85);
border-radius: 28px;
box-shadow: 0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
```

### Slide transition (final working version)
```tsx
.to(el, { opacity: 0, duration: 0.55, ease: "sine.inOut" })
.call(() => setActiveSlide(next))
.set(el, { opacity: 0 })                          // kills the flash
.to(el, { opacity: 1, duration: 0.85, ease: "sine.inOut", delay: 0.03 })
```
`sine.inOut` is the smoothest easing for crossfades — no acceleration artifacts.

---

## Project-Specific Gotchas

- **WhyUsSection** is 300vh tall (reduced from 600vh). The inner panel is sticky. The scroll-based index advancement uses `onUpdate` with `self.progress * points.length`. Auto-advance timer also runs (4.5s, stops at last item).
- **CounterStat** uses `once: true` on ScrollTrigger — counters fire exactly once. If you need them to re-fire, remove that option.
- **GSAP context cleanup:** Every `gsap.context()` must have a corresponding `ctx.revert()` in the cleanup return. Without it, tweens pile up on hot reload.
- **The section background `#F4F8F5`** is defined as `const BG = "#F4F8F5"` in HeroSection but hardcoded everywhere else. They must all match.
- **HeroSection** has `overflow: "hidden"` — images that need to bleed beyond must be positioned carefully to stay within bounds.
- **The `light` prop on `SlideDots`** switches dot colors to white — use it when the slide background is dark.

---

## Things I Tried That Didn't Work

| What I tried | Why it failed | What worked instead |
|---|---|---|
| `mix-blend-mode: multiply` to remove white bg from images | Turns white transparent but also tints colored elements (suit, coins) | Gradient fades at image edges |
| `filter: drop-shadow()` on white-bg images | Creates rectangular shadow, not silhouette | Blurred ellipse divs under objects |
| `height: "118%"` on absolute image in parent with no height | Resolves to 0/auto | Explicit `height: "calc(100vh - Xpx)"` on parent |
| `left: "-10%"` to move image left | Actually moved it right (removed transform offset) | `left: "-30%"` with `transform: "translateX(0)"` |
| `fromTo(el, {opacity:0}, {opacity:1})` after `setActiveSlide` | Flash because React re-renders at opacity 1 before GSAP runs | `.set(el, {opacity:0})` + `delay:0.03` after `.call()` |
| Teal/blue colors (`#29C5C5`) as accent | User rejected immediately — "no blue colors" | Brand green `#52B788` for light accents |
| Adding floating badge cards over Slide2Human image | Too busy — image already has rich 3D composition | Clean image only, cast shadows underneath |
