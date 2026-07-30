# ProFinance Solutions — Project Context

## What This Is
Financial consulting firm website for ProFinance Solutions, based in Baku, Azerbaijan. Single-page marketing site targeting corporate clients. Content is in Azerbaijani. No backend — purely static/marketing.

## Tech Stack
- **Framework:** Next.js 16.2.6 (App Router, `"use client"` components)
- **React:** 19.2.6 · **TypeScript:** 6.0.3
- **Styling:** Tailwind CSS 4.1.12 + inline React style objects (mixed approach)
- **Animations:** GSAP 3.15.0 + ScrollTrigger, Lenis 1.3.23 (smooth scroll)
- **Icons:** Lucide React 0.487.0
- **UI Primitives:** shadcn/ui (Radix UI base) — 50+ components in `ui/` folder (mostly unused)

## Brand / Design System
- **Primary green:** `#1A3D2B` (dark forest green)
- **Light green accent:** `#52B788`, `#2D6A4F`, `#40916C`, `#74C69D`
- **Text dark:** `#0F1117`, `#111410`
- **Text muted:** `#4B5563`, `#6B7280`, `#9CA3AF`
- **Section bg:** `#F4F8F5` (very light green-white)
- **Fonts:** Plus Jakarta Sans (headings, 700–800), Inter (body, 400–500)
- **CSS token:** `--primary: #1A3D2B` in `globals.css`
- **Design style:** "Humans living in the design" — real people integrated into 3D/layered compositions

## File Structure
```
src/
├── app/
│   ├── App.tsx                    # Root client component — Lenis + GSAP setup
│   ├── page.tsx                   # Next.js entry (renders App)
│   ├── layout.tsx                 # HTML shell + metadata
│   ├── globals.css                # Tailwind imports + CSS variables + base typography
│   └── components/
│       ├── Header.tsx             # Fixed nav, smooth scroll links, language switcher
│       ├── HeroSection.tsx        # 2-slide carousel (528 lines) ← most complex
│       ├── WhoWeAreSection.tsx    # "Biz kimik" editorial intro (replaced PillarsSection)
│       ├── ServicesSection.tsx    # 8 service cards + CTA (463 lines)
│       ├── WhyUsSection.tsx       # Sticky scroll 5-advantages section (581 lines)
│       ├── PartnerSection.tsx     # PLH legal partner card (390 lines)
│       ├── ClientsSection.tsx     # Client logos/testimonials (344 lines)
│       ├── Footer.tsx             # Footer (223 lines)
│       ├── CounterStat.tsx        # Reusable animated number counter (45 lines)
│       ├── figma/
│       │   └── ImageWithFallback.tsx
│       └── ui/                    # 50+ shadcn/ui primitives (mostly unused)
├── styles/
│   ├── globals.css                # Empty (CSS lives in app/globals.css)
│   ├── theme.css                  # Extended theme vars
│   ├── tailwind.css               # Tailwind directives
│   ├── fonts.css                  # Font imports
│   └── index.css                  # Imports all style files
└── imports/                       # Scratch/paste area (not used in production)
```

## Public Assets
```
public/
├── ProFinanceGirl.png             # Slide 1 hero human (pill frame)
├── Slide2Human.png                # Slide 2 hero human (man + calculator)
├── ChatGPT_Image_May_9__2026__05_25_40_PM.png  # Hero background pattern
├── WhyUsHuman.png                 # Why Us section man figure
├── CtaSitting.png                 # Services CTA sitting man
├── PartnerHuman.png               # Partner section human
├── ThinkingGirl.png               # Unused / available
├── handshake.png                  # Pillars dark strip image
├── BriefCase.png                  # Decorative
├── PLHLogo.png                    # PLH Hüquq Bürosu partner logo
├── logo-icon.png                  # ProFinance icon
├── heroslide2.png                 # Old slide 2 consultation image (unused)
├── Slide2Background.png           # Glass panel background (unused now)
└── *.avif (11 files)              # Client/partner logos (CafeCity, Integral, etc.)
```

## Homepage Section Order
1. **Header** — fixed, always visible
2. **HeroSection** — 2-slide carousel, full viewport
3. **WhoWeAreSection** (`id="about"`) — "Biz kimik" editorial intro: deck + two-column
   body copy + fact strip + cinematic team band with a floating mission card.
   Copy lives in the `whoWeAre` i18n namespace (mirrors the About page's
   `about.mission` text). Replaced the old PillarsSection / "Brend fəlsəfəsi".
4. **ServicesSection** — 8 service cards grid + CTA with CtaSitting figure
5. **IndustriesSection** — 8 practice areas, interactive list + crossfading photo panel
6. **WhyUsSection** — sticky scroll, 5 advantages
7. **PartnerSection** — PLH Hüquq Bürosu partnership
8. **ClientsSection** — client logos
9. **Footer**

## HeroSection Architecture (most complex component)
- **Slide 1:** Light bg (`#F4F8F5`) + geometric pattern · Text left (54%) · Pill graphic right with 3D stacked layers + fan hover effect + 2 floating badges
- **Slide 2:** Same bg + pattern · Text left (54%) · Slide2Human.png right (man + calculator, positioned `left: "-30%"`)
- Transition: pure crossfade, `sine.inOut`, 0.55s out / 0.85s in
- Auto-advances every 7s
- Nav dots below social proof

## Animation Conventions
- **GSAP context pattern:** `gsap.context(() => { ... }, ref)` with `ctx.revert()` cleanup
- **ScrollTrigger:** `start: "top 80-88%"`, `once: true` for counters
- **Hover transitions:** `transition: "all 280–550ms"` inline styles
- **Float animation:** `@keyframes heroFloat` (0 → -8px → 0), various durations + delays
- **Counter animations:** `CounterStat` component — GSAP tween on scroll enter

## Styling Approach (current — needs improvement)
- **Primary:** Inline React style objects with hardcoded pixel values
- **Secondary:** Some Tailwind utility classes on wrapper divs
- **No CSS Modules**, no SCSS
- **No responsive breakpoints** — all fixed pixel values
- **Color values:** Hardcoded `#1A3D2B` throughout (not using `var(--primary)`)

## Known Issues / Tech Debt
1. No responsive breakpoints — site only works at desktop widths
2. Colors hardcoded in every component instead of using CSS variables
3. HeroSection is 528 lines — should be split into sub-components
4. `styles/globals.css` is empty (dead file)
5. `src/imports/` folder has stale assets
6. Many `ui/` components installed but never used
7. `Slide2Background.png` and `heroslide2.png` no longer used in code
8. `Slide2Human.webp` superseded by `Slide2Human.png`
9. BG constant `#F4F8F5` duplicated across multiple components instead of shared
