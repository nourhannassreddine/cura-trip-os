

## Goal

Add editorial visual depth to four screens — Trip Workspace, Cura tab, You tab, and Trip Intro — without restructuring layout, copy, or routing. Bones stay; atmosphere arrives.

## Global rules (applied across the four screens touched)

- Section vertical padding +40% on the four target screens.
- Body line-height ≥ 1.75 in copy blocks on these screens.
- Image treatment utility: `filter: saturate(0.85)` + an ivory wash overlay at 8% opacity. Implemented as a reusable `.editorial-img` wrapper class in `src/index.css` (image fills wrapper; absolutely-positioned `::after` paints `hsl(var(--paper) / 0.08)`).
- All body text remains left-aligned; no border-radius added beyond existing tokens.

## Screen 1 — Trip Workspace (`src/pages/TripWorkspace.tsx`)

**Header — full-bleed image replaces ink-black block**
- Container height: `min-h-[260px]`, `relative overflow-hidden`.
- Background `<img>`: `https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80` (Puglia trulli), `absolute inset-0 w-full h-full object-cover`, with editorial treatment.
- Gradient overlay: `absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent`.
- Text layout (over gradient, all ivory):
  - Top-right: "UNTIL DEPARTURE" eyebrow + `38 days` in cherry red `#C8102E` (existing `--accent-rust` token reused if it matches; otherwise inline).
  - Bottom-left: "Puglia" in Playfair 48px, then dates + country below.
  - Readiness bar pinned to bottom edge of header (`absolute bottom-0 left-0 right-0`), ivory fill on `ivory/20` track — reads as a horizon line. "64% ready" sits just above-right of the bar.

**CURA insight (sunflower) — untouched.**

**Engine grid — Itinerary promoted**
- `Itinerary` card rendered separately, full-width (`col-span-2`), `h-[120px]`.
- Background layer: same Puglia image at `opacity-[0.12]` with `filter: blur(2px) saturate(0.85)`, absolutely positioned behind a relative content layer so the foreground text/labels remain crisp (no blur on text).
- The other 7 engines render in the 2-col grid below, unchanged styling.

**Also-in-motion (Marrakech) — image card**
- Replace plain card with a `flex` row, `h-[90px]`, `border border-foreground/15`.
- Left 40% (`w-[40%]`): `<img>` `https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80`, `object-cover h-full w-full`, with editorial treatment.
- Right 60%: existing copy block (city, dates, status tag, readiness) — unchanged.

## Screen 2 — Cura tab (`src/pages/Cura.tsx`)

**Top image band**
- New section above the opening statement: `h-[180px] relative overflow-hidden`.
- `<img>` `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80`, editorial treatment.
- Bottom-left overlay: existing `Asterisk` icon + `CURA` label, ivory, 9px tracked uppercase, `absolute bottom-4 left-5`.
- Existing top header row (`Asterisk` + "Cura" eyebrow on paper) is removed since the band now carries the mark.

**Insight cards**
- Each `<li>` gets `border-l-2` in burnt red `#BA181B` (added as `--accent-burnt` HSL var in `src/index.css`, mapped to `accent-burnt` in `tailwind.config.ts`).
- Inner left padding bumped to `pl-5` (20px) for breathing room from the rule.
- Alternating backgrounds via `even:bg-[hsl(var(--paper-soft))]` — add `--paper-soft: 36 24% 90%` (≈ `#EFE9DF`) to `:root` in `src/index.css`.
- Category eyebrow + body untouched.

**Input field**
- Add `pt-6` above the form.
- Hairline rule above input: keep existing `border-t` but drop opacity to `border-foreground/15` (0.5px feel via existing 1px hairline + low opacity).
- Placeholder set in Playfair italic via existing `italic-serif` class — confirm the input element uses `font-serif italic` for placeholder; if the current `italic-serif` class doesn't propagate to placeholder, add `placeholder:font-serif placeholder:italic` explicitly.

## Screen 3 — You tab (`src/pages/Profile.tsx`)

**Portrait header block (replaces current eyebrow + name section)**
- `relative h-[200px] bg-ink text-ink-foreground overflow-hidden`.
- Giant initial: `<span>` "N" in Playfair, `text-[140px] leading-none`, `text-[hsl(var(--ink-foreground)/0.08)]`, `absolute right-[-12px] top-1/2 -translate-y-1/2`. Bleeds slightly off right edge.
- Bottom-left stack (`absolute left-5 bottom-5`):
  - "YOU" eyebrow, 9px tracked, ivory low-opacity.
  - "Nourhan" in Playfair 40px, ivory.
  - Home / Passport rows below in ivory low-opacity, current key/value treatment but recolored for the dark surface.

**Spacing**
- Add 8px gap between header block and the first row of chapters.
- Existing chapter rows kept exactly as is.

**Footer imprint**
- Ensure `mt-8` (32px) above the imprint footer.

## Screen 4 — Trip Intro (`src/pages/TripIntro.tsx`)

**Layered ivory + ghost image**
- Wrapper `relative overflow-hidden`. Add an absolutely-positioned `<img>` (Puglia URL) at `inset-0 w-full h-full object-cover`, `style={{ opacity: focusing ? 0.15 : 0.06 }}` with a 300ms transition.
- Above the image, a `bg-[hsl(var(--paper)/0.94)]` layer gives the ivory feel while letting the image bleed through.
- New state `focusing` flips to `true` ~200ms before `setFadingOut`, so the image gently comes into focus before the crossfade routes to the dashboard.
- Text reveal animation untouched.

## Tokens & utilities (`src/index.css`, `tailwind.config.ts`)

```text
:root {
  --paper-soft: 36 24% 90%;     /* #EFE9DF */
  --accent-burnt: 359 81% 41%;  /* #BA181B */
}

.editorial-img { position: relative; overflow: hidden; }
.editorial-img > img { filter: saturate(0.85); width: 100%; height: 100%; object-fit: cover; }
.editorial-img::after {
  content: ""; position: absolute; inset: 0;
  background: hsl(var(--paper) / 0.08); pointer-events: none;
}
```

Tailwind `theme.extend.colors` gains `'paper-soft'` and `'accent-burnt'` mapped to the new vars.

## Files touched

```text
src/index.css                  → add --paper-soft, --accent-burnt, .editorial-img utility
tailwind.config.ts             → map new color tokens
src/pages/TripWorkspace.tsx    → image header, promoted Itinerary card, Marrakech image card
src/pages/Cura.tsx             → top image band, left-rule insight cards w/ alt bg, refined input
src/pages/Profile.tsx          → ink portrait header w/ giant "N", spacing tweaks
src/pages/TripIntro.tsx        → ghost image layer + focus-in transition
```

No other files, routes, copy, or navigation touched.

