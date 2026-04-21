

## Goal

Five small, targeted refinements:
1. Welcome (Plate I) — frame the rotating thought as a proper Cura "thought" sub-section with a faint background panel, an in-line `Cura · thought` attribution, and more separation before the headline section.
2. Welcome — primary CTA copy: `I'm new here, show me cura` (lowercase "cura").
3. Identify page — remove the redundant inline label that repeats the heading.
4. Choose flow — fix header inconsistency across all 3 questions, make Q1 destinations feel dynamic (not "first/second/third"), promote Q2 passport to the searchable dropdown (excluding Israeli) with cleaner grammar, and rewrite the final CTA in Cura's voice.

No layout, color, or routing changes beyond what's listed.

## 1. `src/pages/Welcome.tsx`

**Quote sub-section as a framed panel**

Replace the current bare quote block with a contained editorial panel — same `px-5` outer gutter, but the panel itself sits inside a faint paper-deep wash so it visibly registers as "a moment of its own":

- Wrap the existing eyebrow + quote glyph + thought line in a single block with `bg-foreground/[0.03] border-l-2 border-foreground/15 px-4 py-4`. No border-radius (stays editorial).
- Existing eyebrow `Plate I · A thought before you begin` and the large `"` glyph stay exactly as they are, just inside the panel.
- Below the thought line, add a tiny right-aligned attribution row matching other Cura whisper attributions in the app: `<div className="editorial-eyebrow text-muted-foreground mt-3 text-right">Cura · thought</div>`.

**More separation before the headline section**

Bump the spacing between the thought panel and the "A travel operating system" section from `pt-5` to `pt-10` so the panel reads as its own moment.

**Primary CTA copy**

Change the button label from `Show me Cura` to `I'm new here, show me cura` — exact casing, lowercase `cura`. Route, styling, arrow all unchanged. (The button text already uses `font-sans tracking-wide`; no font swap needed, the lowercase "cura" reads naturally inside the sans label since it's a deliberate brand wink.)

## 2. `src/pages/Identify.tsx`

**Remove the redundant question label**

The page heading already reads `Before we go, what should I call you?`. The first input then re-asks `What should I call you?` as its eyebrow label — that's the redundancy. 

- Replace the name input's eyebrow `What should I call you?` with the simple field label `Your name` (kept in `editorial-eyebrow` style for consistency with the email field's `And where can I reach you?`).
- Email field, placeholders, validation, button copy all unchanged.

## 3. `src/pages/Choose.tsx` — header consistency

Today the TopBar shows `Plate II · Choose / One of three` while Plate II itself uses `Entry / Begin` and EntryGate's body shows `Plate II`. The user's complaint is internal to the Choose flow: the eyebrow + title combo is too long and inconsistent. Fix all three steps to share the exact same TopBar treatment, with the per-step progress only living in the question block (where `i / iii` already lives):

- TopBar on every step: `eyebrow="Plate II"`, `title="Choose"` — identical across Q1, Q2, Q3.
- Remove the `titles` map (`"One of three"`, etc.) — no longer used.
- The per-step indicator stays inside the question section: keep the existing `i / iii`, `ii / iii`, `iii / iii` numerals top-right of the question block.
- Back behaviour unchanged (Q1 → `/begin` via TopBar's `back` prop; Q2/Q3 → previous step via the inline back row).

## 4. Choose Q1 — make destinations feel dynamic, drop "First/Second/Third"

**State + UX shift**

Replace the three fixed inputs (`d1`, `d2`, `d3`) with a single `destinations: string[]` array starting with two entries (`["", ""]`). Treat the third as opt-in via an "add another" button, matching the user's "maybe add a button to add a third country" ask. Cap at 3.

- Render destinations via `destinations.map((value, idx) => ...)`. Each row has:
  - A small serif italic Roman numeral on the left (`i.`, `ii.`, `iii.`) in `text-muted-foreground` — matches the EntryGate numeral pattern, so it feels native to the Plate II family rather than utilitarian "First/Second/Third" labels.
  - The hairline-bottom input on the right, same `inputClass`, placeholders rotating editorially: `e.g. Lisbon`, `or Marrakech`, `…and one more`.
  - For rows beyond the first, a tiny `×` remove button on the far right (`text-foreground/40 hover:text-foreground`) that splices the row out (only shown when `destinations.length > 1`).
- Below the list, an `Add another place` button (only when `destinations.length < 3`):
  - Editorial style: `flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground` with a small `+` glyph. Not a heavy button — a quiet textual affordance.
  - Clicking appends `""` to the array.
- Validation: continue requires at least one non-empty trimmed destination.
- On submit (Q3), the array is filtered/trimmed exactly as today before persisting to `cura.choose`.

This kills "First / Second / Third" entirely and makes the section feel composed rather than a form.

## 5. Choose Q2 — searchable passport dropdown, fixed grammar

- Heading copy fix: `Which passport are you traveling on?` → `Which passport do you travel with?` (italic-serif accent moves to `travel with?`).
- Remove the redundant `Passport nationality` eyebrow above the field — the heading already says it.
- Replace the free-text `<input>` with the existing `SearchableSelect` component (already built for this exact purpose). 
  - Options: `passportNationalities` from `src/data/locations.ts`, filtered to exclude `"Israeli"`. Since the current list does not contain `"Israeli"`, no entry needs to be removed — but to honor the explicit instruction defensively, derive options as `passportNationalities.filter(p => p !== "Israeli")` so the exclusion is enforced even if the data file ever changes.
  - Props: `value={passport || null}`, `onChange={setPassport}`, `placeholder="Search passports…"`, `label="Choose your passport"`.
- Validation unchanged (`q2Valid` already keys off `passport.trim().length > 0`).

## 6. Choose Q3 — final CTA copy in Cura's voice

Replace `See them side by side` with something more on-brand. Options aligned with Cura's register (chosen: the first):

- Selected: `Lay them on the table`
- Backup if user prefers: `Set them beside each other`, `Bring them in`, `Now we choose`

Going with `Lay them on the table` — it matches Cura's editorial, tactile voice (echoes "field note", "plate", "imprint") and reads as an action, not a feature. Arrow stays.

## Files touched

```text
src/pages/Welcome.tsx   → faint-bg quote panel, "Cura · thought" attribution, more separation before headline section, CTA → "I'm new here, show me cura"
src/pages/Identify.tsx  → name field eyebrow renamed from repeated question to "Your name"
src/pages/Choose.tsx    → unified TopBar (Plate II / Choose) on all steps; Q1 dynamic destinations w/ Roman numerals + "Add another place"; Q2 → SearchableSelect (Israeli excluded), grammar fix, removed redundant label; Q3 CTA copy → "Lay them on the table"
```

No other files, components, tokens, routes, or styles touched.

