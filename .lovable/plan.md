

## Goal

Final pass on the Welcome hero: remove flamingo, rework 4 frames for stronger surreal scale + perspective, fix the Jacquemus text leak on the balloon frame, and collapse the headline to a single line.

## Frame changes

| # | Action | New / revised concept |
|---|---|---|
| 1 | **Replace** | Giant slightly-open pomegranate with a few seeds spilled on pale dunes, tiny person standing beside it for scale (replaces silk ribbon) |
| 2 | **Revise** | Same beach + shell, but shell scaled up dramatically (house-sized), tiny person added at base for perspective |
| 3 | **Replace concept** | Drop napkin/paper-birds. New: a giant porcelain teacup tipped on its side on a sunlit terrace, calm sea spilling out of it onto the tiles — single surreal object, cohesive palette |
| 4 | Keep | Giant straw hat + tiny figure in shade |
| 5 | Keep | Snowy peak + ice cream cone |
| 6 | **Revise** | Same hot-air balloon Mediterranean village over wildflowers — regenerate cleanly with NO text, NO logos, NO "Jacquemus" or any wordmark anywhere in frame |
| 7 | **Revise** | Tiny person standing outdoors (meadow / hillside) **holding** an oversized unfolded paper map in front of them, looking at it — replaces the crouched-over-map composition |
| 8 | **Remove** | Flamingo frame deleted entirely |
| 9 | Keep | Giant olives on Mediterranean rooftop |

Final count: **8 frames** (was 9).

## Copy change

Subheadline currently wraps:
> "You bring the appetite. Cura will handle the rest."

Force single line. Remove the `max-w-[34ch]` constraint on that paragraph so it flows the full content width without breaking. Headline above stays as-is.

## Logo

No change — stays permanent white + drop shadow.

## Technical changes

```text
src/pages/Welcome.tsx
├── frames[] shrinks 9 → 8 (remove flamingo entry, slot 8)
├── Re-import: drop welcome-surreal-8 (flamingo); welcome-surreal-9 (olives) becomes new slot 8
├── alt text rewritten for frames 1, 2, 3, 7
└── Subheadline <p>: remove max-w-[34ch] so it stays one line

src/assets/  (regenerate in place at 1536×1024, 3:2)
├── welcome-surreal.jpg     → giant open pomegranate + tiny person, pale dunes
├── welcome-surreal-2.jpg   → much larger seashell + tiny person at base
├── welcome-surreal-3.jpg   → giant tipped porcelain teacup spilling sea on terrace
├── welcome-surreal-6.jpg   → balloon village — regenerate, NO text/wordmarks anywhere
└── welcome-surreal-7.jpg   → tiny person outdoors holding giant unfolded map
```

Generation: Nano banana pro (`google/gemini-3-pro-image-preview`) at 1536×1024, with explicit framing prompt: "horizontal landscape, centered subject, full subject visible inside safe margins, sun-faded cohesive painterly palette, low saturation, **no text, no logos, no wordmarks, no signage, no letters anywhere in the image**".

No changes to container ratio, headline, Plate I block, CTA, footer, routing, or tokens.

