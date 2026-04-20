

## Goal

Align the homepage rhythm to the rest of the layout, redesign the **Elsewhere** and **Archive** sections to match the uploaded references, refresh the field note image, and introduce a curated accent palette used tastefully across status identifiers and editorial details.

## 1. Layout alignment

The field note section currently breaks out of the `px-5` rhythm and sits edge-to-edge while every other section is padded. Wrap the field note in `px-5` like everything else so the entire page shares one consistent left/right gutter. Also update the greeting name from "Lia" → **"Nourhan"** to stress-test longer names.

## 2. "A small list of elsewhere" — redesigned

Match the reference: horizontal scrolling row of editorial cards.

```text
A small list of elsewhere                     ALL ↗
─────────────────────────────────────────────────────
┌──────────────┐  ┌──────────────┐  ┌────────
│ [3H]         │  │ [3H 40]      │  │ [3H
│              │  │              │  │
│   image      │  │   image      │  │  image
│              │  │              │  │
│              │  │              │  │
└──────────────┘  └──────────────┘  └────────
Puglia            Marrakech          Sant…
Olive light…      Pink dust…         Blue on…
```

- Horizontal scroll (snap-x), 3 cards visible-ish on mobile.
- Each card: tall portrait image (~3:4), dark **flight-time chip** top-left (`bg-ink text-ink-foreground`, small, square-ish), serif name + italic tagline below.
- "ALL ↗" link top-right replaces the current "Discover" eyebrow.
- Remove the divided-list treatment entirely.

## 3. "From the archive" — redesigned

Match the reference: a single bordered editorial card per archived trip, copy on the left, narrow tall image on the right.

```text
From the archive
┌──────────────────────────────────────────────┐
│ OCT 18 — OCT 24, 2024            ╭─────────╮ │
│                                  │         │ │
│ Lisbon                           │  image  │ │
│                                  │         │ │
│ "Yellow afternoons. The pasteis  │         │ │
│  were better the second day."    ╰─────────╯ │
└──────────────────────────────────────────────┘
```

- Card frame: `border border-foreground/15`, padded.
- Grid: `grid-cols-[1fr_140px]`, image fills the right column edge-to-edge of the card.
- Date eyebrow → city in serif → italic narrative quote.
- Requires: each archive entry needs a `city`, `dateRange`, and `cover` image. Extend `journalEntries` in `src/data/cura.ts` with these fields (keep existing fields for compatibility on Journal page).
- Generate 2 small archive cover images (Lisbon-feel alley, second city-feel) at 600×800 (3:4) into `src/assets/archive-1.jpg`, `src/assets/archive-2.jpg`.

## 4. Accent palette — tasteful, restrained

Add CSS custom properties to `src/index.css` for the accent set:

```text
--accent-rust:    #c1121f   (live / urgent)
--accent-ochre:   #bc6c25   (planning)
--accent-olive:   #606c38   (ready / committed)
--accent-sky:     #90e0ef   (dreaming)
--accent-rose:    #da627d   (memory / archive)
--accent-sun:     #ffc300   (highlight / whisper accent)
```

Map them into Tailwind via existing token system in `tailwind.config.ts` so we can use `bg-accent-rust`, `text-accent-sky`, etc.

Apply tastefully — not everywhere:
- **Status stickers + action button** (`statusStyles`, `statusActionStyles`) get repainted with the accents above (planning=ochre, dreaming=sky, ready=olive, live=rust, memory=rose). White text on each. Replaces the current black "live" + raw orange "planning" combo.
- **Cura whisper** keeps its existing left rule but the rule color shifts to `accent-sun` for a quiet editorial hit.
- **Elsewhere flight-time chip** stays ink/dark — it's a utility chip, not a status.
- Body, surfaces, type, borders → unchanged.

## 5. Field note image

Current image isn't selling the editorial mood. Regenerate `src/assets/home-fieldnote.jpg` with:

> "Overhead flat-lay on warm sun-faded stone of a cool fashionable outfit laid out: oversized cream linen shirt, wide-leg sand trousers, woven leather belt, tortoise sunglasses, small gold hoop earrings, leather mules, a folded silk scarf in muted rust. Soft natural side light, painterly editorial fashion magazine still life, low saturation, no text, no logos, no brand names anywhere."

Generated at 1024×1280 with the high-quality image model.

## 6. Files touched

```text
src/pages/Home.tsx
├── Greeting: "Lia" → "Nourhan"
├── Field note section: wrap in px-5 to align with the rest
├── Elsewhere section: rewritten as horizontal snap-scroll cards w/ flight chip
├── Archive section: rewritten as bordered card grid w/ image right
└── Status maps: repointed to new accent tokens

src/data/cura.ts
└── journalEntries: add city, dateRange, cover per entry (keep day/narrative)

src/index.css
└── Add --accent-* CSS variables (HSL) under :root

tailwind.config.ts
└── Extend colors with accent-{rust,ochre,olive,sky,rose,sun}

src/assets/
├── home-fieldnote.jpg   → regenerate (flat-lay outfit, no brands)
├── archive-1.jpg        → new (Lisbon-feel alley, 3:4)
└── archive-2.jpg        → new (second archive city, 3:4)
```

No changes to routing, hero, primary/secondary trip cards' structure, footer, or other pages.

