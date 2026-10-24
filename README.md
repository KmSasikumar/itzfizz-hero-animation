# Itzfizz — Scroll-Driven Hero Animation

Assignment build for the Itzfizz Digital Web Development internship: a
scroll-driven hero section animation. Code only — no deployment, no repo,
no form submission.

The reference live demo was studied for the *feel* of the effect (headline +
car + impact metrics moving with scroll). No code, assets, or artwork were
copied from it: the animation code, layout, and the car illustration in
`src/components/CarSvg.jsx` are original to this project.

## Stack

- React + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- GSAP + ScrollTrigger (mandatory stack, all present)

## Run locally

```sh
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Production build (for static hosting)

```sh
npm run build
npm run preview
```

`npm run build` emits static files to `dist/`. That folder can be hosted
as-is on any static host (Netlify, Vercel, GitHub Pages, etc.).

## What the animation does, section by section

**Hero (pinned, scroll-driven):**

- **Initial load** — headline letters rise in with a stagger, then the
  tagline, car, and scroll cue fade up. This part plays once on load and is
  not scroll-driven.
- **Scroll progress** — the hero is pinned while you scroll through 160% of
  extra scroll distance. A lime progress bar across the top fills with
  `scaleX`, mapped 1:1 to scroll progress.
- **Headline** — the letters of "WELCOME ITZFIZZ" fan outward from the
  centre (per-letter `x` offsets), drift up, and fade to 12% opacity as you
  scroll. The letter-spacing in the headline itself is static CSS, so the
  scroll effect never touches a layout property.
- **Car** — the car drives from left to right across the hero (`x` tied to
  scroll progress), its wheels rotate two full turns, and the dashed road
  markings slide left underneath it, selling the driving motion.
- **Background** — two blurred gradient blobs drift in opposite directions
  (parallax, `yPercent` only).
- **Impact metrics** — four stat cards rise in with a stagger, and each
  number counts up (58%, 23%, 27%, 40%) driven by the same scroll progress,
  so scrubbing back down reverses the count.
- **Scroll cue** — the "Scroll to drive" hint fades out early in the scroll.

**After the hero:** the pin releases into a short "Beyond the hero" services
section, so the exit transition is visible. Scrolling back up replays the
whole hero animation in reverse.

## Performance notes

Every animated property is a transform (`x`, `y`, `xPercent`, `yPercent`,
`scaleX`, `rotation`) or `opacity`. Nothing animates `width`, `height`,
`top`/`left`, margins, or `letter-spacing`, so the animation stays on the
compositor and avoids layout thrash. Scroll smoothing comes from
ScrollTrigger's `scrub: 1`, which eases the mapping from scroll position to
animation progress (the animation is genuinely tied to scroll progress, not
just triggered on scroll).

## Accessibility

If the visitor prefers reduced motion (`prefers-reduced-motion: reduce`),
the pin/scrub animation is skipped entirely and the hero renders in its
final state, with metric numbers already at their full values.

## Notes / placeholders

- The metric figures are demo placeholders in the spirit of the reference
  brief, not verified Itzfizz client results.
- The car is a simple original SVG illustration, not the reference demo's
  artwork.
- Best viewed at desktop/laptop widths; on small screens the layout stacks
  and the pinned hero content is compact by design.

## Project structure

```
itzfizz-hero-animation/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Hero.jsx        # headline, car, road, metrics + all GSAP logic
        ├── CarSvg.jsx      # original stylized car illustration
        └── AfterHero.jsx   # follow-up section the hero releases into
```
