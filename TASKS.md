# ProFinance Solutions — Task Roadmap

## Phase 1 — Structure & Optimization
*Do this before responsiveness. Changes here make Phase 2 much easier.*

### 1.1 Clean up dead / unused files
- [ ] Delete `src/styles/globals.css` (empty, dead file)
- [ ] Delete or archive `src/imports/` folder (stale assets)
- [ ] Remove unused public assets: `Slide2Background.png`, `heroslide2.png`, `Slide2Human.webp`
- [ ] Audit `ui/` folder — remove components that are never imported anywhere
- [ ] Remove unused npm packages: `react-slick`, `react-dnd`, `canvas-confetti`, `react-responsive-masonry`, `react-popper`, `@popperjs/core`, `motion` (check if actually used first)

### 1.2 Design token consolidation
- [ ] Add shared color constants to `globals.css` as CSS variables:
  - `--color-bg: #F4F8F5`
  - `--color-text: #0F1117`
  - `--color-text-muted: #4B5563`
  - `--color-green-light: #52B788`
  - `--color-green-mid: #2D6A4F`
- [ ] Replace all hardcoded `#1A3D2B` with `var(--primary)` across all components
- [ ] Replace all hardcoded `#F4F8F5` with `var(--color-bg)`
- [ ] Add shared spacing scale constants (section padding: `120px 40px`)
- [ ] Create `src/lib/constants.ts` for shared JS-level values (BG, brand colors used in inline styles)

### 1.3 Split large component files
- [ ] **HeroSection.tsx** (528 lines) → split into:
  - `HeroSection.tsx` (root — state, transitions, auto-advance)
  - `HeroSlide1.tsx` (slide 1 layout + content)
  - `HeroSlide2.tsx` (slide 2 layout + content)
  - `Slide1Graphic.tsx` (pill + fan hover effect)
  - `SlideDots.tsx` (nav dots)
- [ ] **WhyUsSection.tsx** (581 lines) — extract the right panel content into `WhyUsRightPanel.tsx`
- [ ] **ServicesSection.tsx** (463 lines) — extract `ServiceCard` into its own file

### 1.4 Shared component extraction
- [ ] Create `SharedCtaButtons.tsx` (already exists as a function, make it a proper file)
- [ ] Create `SectionHeader.tsx` — reusable eyebrow + heading + description pattern used in every section
- [ ] Create `src/hooks/useMediaQuery.ts` — needed for Phase 2 responsiveness

### 1.5 CSS architecture
- [ ] Create `src/styles/animations.css` — move all `@keyframes` from inline `<style>` tags
- [ ] Move `heroFloat`, `heroFloatSlow` out of HeroSection into animations.css
- [ ] Consolidate `src/styles/theme.css` and `src/app/globals.css` — currently duplicated vars

---

## Phase 2 — Responsiveness
*Work section by section. Each section is an independent task.*

### Breakpoints to target
- **Desktop:** 1280px+ (current design target)
- **Tablet:** 768px–1279px
- **Mobile:** < 768px

### 2.1 Header
- [ ] Mobile: hamburger menu, hide nav links, collapse language switcher
- [ ] Tablet: compress nav gap, smaller padding

### 2.2 HeroSection
- [ ] Tablet: reduce text size, tighten pill graphic
- [ ] Mobile: stack layout (text top, graphic bottom), full-width pill, smaller badges
- [ ] Slide 2 mobile: Slide2Human image repositioned for small screens

### 2.3 PillarsSection
- [ ] Tablet: 2-column stat grid in dark strip
- [ ] Mobile: single column rows, stack the 4-column stat grid vertically

### 2.4 ServicesSection
- [ ] Tablet: 2×4 grid (2 columns)
- [ ] Mobile: 1×8 (single column), CTA card stacks vertically, CtaSitting image hidden or repositioned

### 2.5 WhyUsSection
- [ ] Tablet: reduce sticky panel heights
- [ ] Mobile: remove sticky scroll, flat sequential layout, right panel stacks below left

### 2.6 PartnerSection
- [ ] Tablet: reduce PLH card padding
- [ ] Mobile: stack the left/right panels of the PLH card vertically, 3 service cards go single column

### 2.7 ClientsSection
- [ ] Tablet + Mobile: reduce columns, adjust logo sizes

### 2.8 Footer
- [ ] Tablet: 2-column grid
- [ ] Mobile: single column, full-width links

---

## Phase 3 — Performance & Polish
*After responsiveness is complete.*

### 3.1 Image optimization
- [ ] Convert all remaining `.png` hero images to `.webp` or `.avif` (ProFinanceGirl, Slide2Human, WhyUsHuman, etc.)
- [ ] Add `width` and `height` props to all `<img>` tags (prevents layout shift)
- [ ] Use Next.js `<Image>` component instead of `<img>` for automatic optimization
- [ ] Lazy-load images below the fold

### 3.2 Animation performance
- [ ] Add `will-change: transform` to elements that animate frequently (pill layers, badges)
- [ ] Ensure GSAP ScrollTrigger instances are properly killed on unmount (audit all `ctx.revert()` calls)
- [ ] Throttle the WhyUs scroll handler

### 3.3 Accessibility
- [ ] Add `aria-label` to all icon-only buttons
- [ ] Ensure color contrast ratios meet WCAG AA (check muted text on light backgrounds)
- [ ] Add `prefers-reduced-motion` media query to disable animations for users who prefer it
- [ ] Keyboard navigation for HeroSection carousel dots

### 3.4 Code quality
- [ ] Enable ESLint rules for unused imports across the project
- [ ] Add TypeScript strict null checks where missing
- [ ] Remove all `console.log` statements if any exist

---

## Completed ✓
- [x] Counter animations (PillarsSection, PartnerSection dark strip)
- [x] Hero badge float animation
- [x] Service card stronger hover (lift + green shadow)
- [x] WhyUs auto-advance (4.5s timer, pauses on hover)
- [x] HeroSection 2-slide carousel with smooth crossfade transition
- [x] Slide 1: pill graphic with 3D fan hover effect
- [x] Slide 2: Slide2Human.png with cast shadow elements
- [x] CSS `--primary` token fixed to `#1A3D2B`
- [x] CounterStat reusable component
