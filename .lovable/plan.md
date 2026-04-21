

## Goal

Three small, surgical changes:
1. Welcome (Plate I) — refine the rotating thought into a quote-framed editorial block, swap the primary CTA copy, tweak the secondary link copy.
2. New "Identify yourself" page (name + email) — appears between Welcome and Plate II.
3. Plate II option iii reroutes to a new 3-question flow that ends at `/compare`.

No layout, styling, or color changes to existing screens beyond copy + the one routing change.

## 1. Welcome — copy + quote framing

In `src/pages/Welcome.tsx`:

- **Quote framing for the rotating thought.** Today the thought is rendered as a flat italic line with a tiny rule above. Replace that single `<p>` with a small editorial quote block — same `px-5` gutter, same eyebrow above:
  - A large serif opening quotation mark (`"`) sits on its own line at the top-left, Playfair, ~36px, low opacity (`text-foreground/30`), tight leading. Acts as a visual mark, not a character in the sentence.
  - The thought sits directly below it, italic Playfair, slightly larger than today (`text-[15px] leading-snug`), no surrounding straight quotes anymore (the glyph above does the framing).
  - A short hairline rule (`h-px w-6 bg-foreground/30`) and a tiny right-aligned attribution "— Cura" in `editorial-eyebrow` style sit below the thought.
- **Primary CTA copy:** change `Begin` → `Show me Cura`. Keep the arrow, ink-black button styling, and `/begin` route untouched. *(Note: the route currently goes to `/begin` — see §2; we'll repoint it to the new identify page.)*
- **Secondary link copy:** change `I already have an account` → `I've been here before`. Route + style unchanged (`/home`).

Nothing else on Welcome changes — carousel, logo, eyebrow text, headline, footer imprint all stay.

## 2. New page — `src/pages/Identify.tsx`

Editorial two-field intake. Routed at `/identify`. Welcome's primary CTA repoints to this page, and Identify's continue button routes to `/begin` (Plate II). This inserts cleanly between Plate I and Plate II without altering Plate II.

**Layout (matches existing app rhythm — `app-shell`, `px-5`, TopBar):**

- `TopBar` with `back="/"`, eyebrow `"Plate I · ½"`, title `"Begin"`.
- Heading section: editorial eyebrow `"A short introduction"` then a Playfair display heading: `Before we go, what should I call you?` with `call you?` in italic-serif accent.
- Two stacked fields, hairline-bordered, no rounded corners, matching the editorial form treatment used elsewhere in the app:
  - **Name** — label `"What should I call you?"` (10px tracked uppercase eyebrow), input below, no border except a single bottom hairline (`border-b border-foreground/30 focus:border-foreground`), Playfair italic placeholder `"a name, a nickname, anything"`.
  - **Email** — label `"And where can I reach you?"`, hairline-bottom input, placeholder `"you@somewhere.com"`, `type="email"`.
- Continue button: full-width, `bg-ink text-ink-foreground`, copy `Take me in →`. Disabled (opacity-50, pointer-events-none) until both fields have content (basic non-empty + email contains `@`). On submit, persist to localStorage as `cura.profile = { name, email }` so Home/You can read it later, then `navigate("/begin")`.
- Cura whisper line at the bottom in italic-serif: `"I'll only ask once. After this, I just remember."` with `Cura · note` eyebrow.

State: local `useState` for `name` and `email`. No backend, no validation library — just `name.trim().length > 0 && /\S+@\S+\.\S+/.test(email)`.

Register the route in `src/App.tsx`: `<Route path="/identify" element={<Identify />} />` above the catch-all.

## 3. Plate II option iii → new 3-question Choose flow

**Routing change in `src/pages/EntryGate.tsx`:** option iii's `to` becomes `/choose` (was `/compare?seed=auto`). No design or copy changes to EntryGate itself.

**New page `src/pages/Choose.tsx`** — single component that renders one of three steps based on internal state. Each step has its own back button (back from Q1 → `/begin`, back from Q2 → Q1, back from Q3 → Q2) and a continue button (Q3's continue → `/compare`).

Shared chrome on every step:
- `app-shell`, `px-5`, `TopBar` with eyebrow `"Plate II · Choose"` and title that updates per step (`"One of three"`, `"Two of three"`, `"Three of three"`). The TopBar's `back` prop is set per step using a small handler — when not on Q1 it calls a local `goBack()` instead of navigating; we'll achieve this by rendering a custom mini back row for Q2/Q3 (a `button` styled like the TopBar back chevron) and using TopBar with `back="/begin"` only on Q1. Simpler alternative kept in implementation: render a small inline back button row above the question on every step and skip TopBar's back handling — keeps logic local. Going with the inline back row.
- Tiny progress reading like `"i / iii"` in the editorial eyebrow style, top-right of the question block.
- Heading per step (Playfair display, italic-serif accent on the key word).
- Continue button at the bottom, ink-black, full width, disabled until the step's minimum input requirement is met.

**Q1 — Destinations (up to 3).** Heading: `Where are you choosing between?` Three labeled inputs stacked vertically, each with hairline-bottom styling: `First`, `Second`, `Third (optional)`. Continue requires at least 1 non-empty input, accepts up to 3.

**Q2 — Passport nationality.** Heading: `Which passport are you traveling on?` Single hairline-bottom input, placeholder `"e.g. Canadian, Egyptian, German"`. Free-text for now (no country dropdown — keeps scope small, matches editorial tone). Continue requires non-empty.

**Q3 — Departure city.** Heading: `Where will you be flying from?` Single hairline-bottom input, placeholder `"e.g. Toronto, Cairo, Berlin"`. Continue copy: `See them side by side →`. On submit, persist `cura.choose = { destinations, passport, from }` to localStorage and `navigate("/compare?seed=auto")` so Compare keeps its existing seeded mode (the back link there already points to `/begin`).

Register the route in `src/App.tsx`: `<Route path="/choose" element={<Choose />} />` above the catch-all.

## 4. Files touched

```text
src/pages/Welcome.tsx     → quote-frame the rotating thought; CTA copy "Show me Cura"; secondary "I've been here before"; primary route → "/identify"
src/pages/Identify.tsx    → NEW — name + email intake, routes to /begin
src/pages/EntryGate.tsx   → option iii `to` changes from "/compare?seed=auto" to "/choose" (only line touched)
src/pages/Choose.tsx      → NEW — 3-step flow, ends at /compare?seed=auto
src/App.tsx               → register /identify and /choose routes
```

No other pages, components, tokens, or styles touched.

