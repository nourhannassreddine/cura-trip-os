

## Goal

Ship the 9-frame surreal hero set with **giant olives** as frame 9. Lock the CURA logo to permanent white-with-shadow for universal legibility. Container ratio (`aspect-[3/2]`), copy, and routing all stay untouched.

## Final frame list (locked order)

| # | Concept |
|---|---|
| 1 | Surreal cream silk ribbon across pale dunes — exaggerated impossible scale, soft footprints leading in |
| 2 | Giant beautiful seashell on an empty beach, larger than a person, soft morning light |
| 3 | Folded white linen napkin upright on a terrace table, sea behind, paper birds emerging from the fold |
| 4 | House-sized woven straw sun hat casting circular shadow on a sunlit plaza, tiny figure in the shade |
| 5 | Snowy alpine peak with a giant pastel ice cream cone planted upright in the summit |
| 6 | Colossal hot-air balloon carrying a tiny Mediterranean village in baskets, drifting over wildflower meadow |
| 7 | Small figure crouched on the ground, looking down at an enormous unfolded paper map |
| 8 | Larger-than-life flamingo in a tropical lagoon, palm fronds, painterly surreal scale |
| 9 | **Three colossal green olives balanced on an empty Mediterranean rooftop**, soft afternoon light, sea in distance |

Cohesion held by: same desaturated film stock, soft directional sunlight, single oversized subject per frame, no neon, painterly fashion-editorial finish.

## Logo treatment

Remove `logoTone` field entirely. Logo always renders as:
`text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]`

Guarantees legibility on every frame regardless of background brightness.

## Technical changes

```text
src/pages/Welcome.tsx
├── frames[] grows from 7 → 9 entries
├── Frame type: drop logoTone field
├── Logo block: remove conditional, single white+shadow class
└── alt text updated per new concepts

src/assets/  (regenerate in place at 1536×1024, 3:2)
├── welcome-surreal.jpg     → more surreal cream ribbon dunes
├── welcome-surreal-2.jpg   → giant seashell on beach
├── welcome-surreal-3.jpg   → linen napkin + paper birds
├── welcome-surreal-4.jpg   → giant straw hat + tiny figure in shade
├── welcome-surreal-5.jpg   → snowy peak + ice cream cone
├── welcome-surreal-6.jpg   → hot-air balloon Mediterranean village over wildflowers
├── welcome-surreal-7.jpg   → tiny figure + giant paper map
├── welcome-surreal-8.jpg   → larger-than-life flamingo lagoon (NEW slot)
└── welcome-surreal-9.jpg   → giant olives on rooftop (NEW slot)
```

Generated with Nano banana pro (`google/gemini-3-pro-image-preview`) at 1536×1024 with explicit "horizontal landscape, centered subject, full subject visible inside safe margins, soft sun-faded cohesive palette, painterly editorial fashion-house aesthetic, low saturation" framing instructions to prevent any cropping regressions.

