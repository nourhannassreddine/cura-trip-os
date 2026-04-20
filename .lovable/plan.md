## Goal

Stop fighting the carousel. Lock the hero into a true horizontal landscape banner, generate **7 cohesive surreal frames** (Jacquemus-adjacent, muted not bright) where each image is composed *for that exact frame* (no `object-contain` letterboxing, no `object-cover` cropping of subjects), and replace the subheadline with one line that actually sounds like CURA.

## Why the framing keeps breaking

The hero is currently `h-[44dvh]` inside a 440px-wide shell. That ratio is a moving target across devices, so we either crop subjects (`object-cover`) or letterbox them (`object-contain`, current state). Neither is acceptable for an editorial cover.

**Fix at the container level first**: lock the hero to a fixed landscape ratio (`aspect-[3/2]`, ~440×293) so the visible canvas is *predictable*. Then generate every image at the matching 3:2 ratio (1536×1024) with the subject framed inside a safe zone. Use `object-cover` (no blur backdrop, no letterbox), and keep `object-position: center` — because the source already fits, nothing gets cut.

## Hero set — 7 frames, one album

Direction: **Jacquemus × Tim Walker × Slim Aarons in a low-saturation dust-and-cream palette**. Sun-faded, slightly chalky, never neon. Single oversized object per frame, single tiny human or none. Quiet surrealism. One unified light: late-morning to soft-afternoon, never night. No two frames in the same environment.


| #   | Frame                                                                                                        | Palette anchor                 | Logo tone |
| --- | ------------------------------------------------------------------------------------------------------------ | ------------------------------ | --------- |
| 1   | A colossal cream silk ribbon coiling slowly across pale dunes, one set of footprints leading into it         | warm sand, ivory               | dark      |
| 2   | An enormous terracotta urn lying on its side in a quiet olive grove, light spilling out like water           | clay, olive, bone              | dark      |
| 3   | A giant folded white linen napkin standing upright on a bare wooden table on a sunlit terrace, sea behind    | bleached blue, linen           | dark      |
| 4   | A monumental matte-black rotary telephone half-buried in a pale rose desert, receiver slightly off the hook  | dust pink, ink black           | light     |
| 5   | A vast pearl-grey storm cloud the size of a building, parked low over a quiet stone village square at midday | slate, stone, cream            | light     |
| 6   | A giant single brass key resting on still water in a flooded marble courtyard, soft reflections              | water-grey, brass              | dark      |
| 7   | A house-sized woven straw basket placed gently on a mountain road at golden hour, lavender hills behind      | wheat, faded purple, dusk gold | dark      |


Cohesion is enforced by: same desaturated film stock look, same soft directional light, no bright primaries (the current ice-cream/origami/balloon all break this — they go).

Old assets (`welcome-surreal-2…10.jpg`) get **regenerated in place** at 1536×1024, so the import paths stay clean. We drop the 8th, 9th, and 10th slots entirely.

## Subheadline — final pass

Headline stays: *"A system with taste. And opinions."*

New subheadline (one line, CURA voice, confident, slightly amused, no justification):

> **"You bring the appetite. Cura will handle the rest."**

Tone notes: first-person singular (CURA speaks as a person, matching `CuraWhisper` voice across the app), declarative, faintly imperious, not explaining mechanics.

If the user prefers a less literal version, the alternate held in reserve is:
*"Tell me you're going. I already know how."*

Only one ships.

## Other Welcome copy

Everything else on the page stays exactly as is — Plate I rotating thought, eyebrow, headline, Begin CTA, footer imprint. No structural changes.

## Technical changes

```text
src/pages/Welcome.tsx
├── Hero container: h-[44dvh]  →  aspect-[3/2] w-full
├── Drop the blur backdrop <img> + the object-contain pattern
├── Single <img> per frame, object-cover, position center
├── frames[] trimmed from 10 → 7, alts + logoTone updated
└── Subheadline string replaced

src/assets/
├── welcome-surreal.jpg       → regenerate (frame 1, ribbon dunes)
├── welcome-surreal-2.jpg     → regenerate (urn / olive grove)
├── welcome-surreal-3.jpg     → regenerate (linen napkin terrace)
├── welcome-surreal-4.jpg     → regenerate (rotary telephone desert)
├── welcome-surreal-5.jpg     → regenerate (storm cloud village)
├── welcome-surreal-6.jpg     → regenerate (brass key marble courtyard)
├── welcome-surreal-7.jpg     → regenerate (straw basket mountain road)
└── welcome-surreal-8/9/10.jpg → unused (left in place, no imports)
```

All images generated at 1536×1024 (3:2) using the high-quality image model, with explicit "centered subject, safe margins on all four sides, full subject visible, horizontal landscape composition" framing instructions to prevent the cropping problem from recurring.

No changes to EntryGate, Onboarding, copy elsewhere, routing, or design tokens.