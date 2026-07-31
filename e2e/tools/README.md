# Migration checkers

Three small scripts written while moving responsive layout out of JavaScript and
into `src/app/responsive.css`. Each one exists because it caught a real
regression that reading the diff did not.

Run them from the repo root after converting a component, before the visual suite
— they take under a second and the visual suite takes ten minutes.

```bash
node e2e/tools/checkcls.mjs     # CSS class defined but never applied
node e2e/tools/bpcheck.mjs      # tablet rule with no mobile counterpart
node e2e/tools/revealscan.mjs   # regenerate the reveal-guard class list
```

### `checkcls.mjs`
Lists classes in `responsive.css` that appear in no `className`. Writing the CSS
and forgetting the attribute cost the About page's trait titles their font size —
the styles were correct, nothing referenced them.

### `bpcheck.mjs`
Lists properties overridden at tablet but not restated at mobile. These inherit
the tablet value on phones, because the tablet query is `max-width: 1023px` and
therefore also matches mobile. Missing one on `.team-section` made the page 65px
taller on mobile. Most hits are legitimate — mobile and tablet often share a
value on purpose — so read it as a prompt to check, not a list of bugs.

### `revealscan.mjs`
Prints every class that ships at `opacity: 0` or is named in a
`gsap.fromTo/from/set` call. Paste the output into `REVEAL_SELECTOR` in
`e2e/settle.ts` when components change.

Do not maintain that list by hand. It was hand-written once and checked
`.svc-card` — a child that always sits at opacity 1 — while the element that
actually stays hidden is its wrapper `.svc-cell`. An entirely blank Services
section passed the guard and was captured into a screenshot.

Classes that are transparent *by design* are excluded in `ALWAYS_TRANSPARENT`,
each with a reason. `why-pane` is the one to understand: WhyUs is a
scroll-scrubbed console that only ever shows one pane at a time, so its other
panes being at opacity 0 is correct, not a failed animation.
