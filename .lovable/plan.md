

## Refactor: Multi-path entry + logic-driven calibration

### 1. Visual fixes (Welcome.tsx)
- **Hero**: regenerate `welcome-surreal.jpg` as a surreal **water/beach** scene (oversized object on wet sand, white-linen figure walking), not desert.
- **Logo**: move "cura" (lowercase, Playfair) to **top-left** of the image with breathing padding, not edge-aligned. Remove right-side "CURA" mark.
- **Caption hierarchy**: clean stack — `PLATE I` eyebrow → thin rule → `"Scale, reconsidered."` italic line. No overlap.
- **Layout**: shrink hero to ~48dvh, tighten headline + supporting paragraph, ensure entire screen fits in 832px viewport without scroll.
- **CTAs**: keep "Begin" as the bordered ink button; downgrade "I already have an account" to a **plain text link** centered below.

### 2. New entry routing (replaces direct → /onboarding)
"Begin" now routes to a new screen **`/begin`** — *"Where are you right now?"*

```text
┌──────────────────────────────┐
│  WHERE ARE YOU RIGHT NOW?    │
│  Not physically. In the trip.│
│                              │
│  ─ I don't know where to go  │  → /onboarding?path=full
│    I have the urge, not plan │
│  ─ I have somewhere in mind  │  → /onboarding?path=short
│    Help me shape it properly │
│  ─ I'm choosing between      │  → /compare?seed=auto
│    Help me decide            │
│  ─ I already have a trip     │  → /trip/new
│    Organize or improve it    │
└──────────────────────────────┘
```

Editorial style: numbered roman (i, ii, iii, iv), asymmetric — first item indented, full-width borders, no card grid.

### 3. Onboarding becomes path-aware (Onboarding.tsx)
Read `?path=full|short` query param. Same component, two flows:

**Full path (5 steps — existing, with one addition)**
- Feel · Decide · **Context (+Departure)** · Dealbreakers · Reading
- Add new "Departure" subsection in Context: searchable city input (free text + datalist of ~25 global cities: Lagos, NYC, London, Lisbon, Dubai, Mumbai, São Paulo, etc.). Required.

**Short path (3 steps)**
- Feel · Decide · **Context (condensed)**
- Context shows ONLY: Departure city, Usually with, Money honestly. No passport, no dealbreakers.
- Final continue → `/trip/new` (skip the Reading screen and Puglia auto-pick — user already has destination).

`stepCount` and `canContinue` switch by path. Progress bar adapts (5 vs 3 segments).

### 4. Question expansion
**Moods** — add: `solo` ("Alone, on purpose"), `luxury` ("Quiet luxury, no logos"), `spontaneous` ("Plans are suggestions"), `structured` ("A clean schedule is a kindness"). Each gets a CURA reaction line.

**Money, honestly** — replace 4 with 4 sharper:
- `luxury-first` — "I start at the top and work down"
- `balanced` — "I spend where it shows"
- `budget-aware` — "I want range, not stretch"
- `impulsive` — "I decide at the table"

**Dealbreakers** — replace vague items, expand to 12 across logistics/crowds/pricing/food/pace:
crowds, early starts, long transfers, tourist traps, hotel noise, rushing, bad coffee, hidden fees, chain restaurants, over-planned days, dead nightlife, slow wifi.

### 5. Behavioral output (state persistence)
Create **`src/lib/profile.ts`** — small store (localStorage) with `saveProfile()` / `loadProfile()`:
```ts
{ path, moods[], pace, departure, passport?, company, spend, dealbreakers[] }
```
Wire into Onboarding submit + expose `useProfile()` hook. Other screens (Dream, Itinerary, Compare) can read it later — for now we just persist + log so behavior is wired, not passive.

### 6. Compare page seeding (Compare.tsx)
Read `?seed=auto` — if present, show banner: *"You didn't bring places. I picked three you'd actually consider."* Already pre-loads 3 destinations — just add the framing line + a "Bring your own" link.

### 7. Routing (App.tsx)
- `/` → Welcome
- `/begin` → **new** EntryGate page
- `/onboarding` → existing (now reads `?path`)
- `/compare?seed=auto` → existing
- `/trip/new` → existing

---

**Files touched**
- `src/pages/Welcome.tsx` — visual fixes, route to `/begin`
- `src/pages/EntryGate.tsx` — **new**, the 4-path screen
- `src/pages/Onboarding.tsx` — path-aware (full vs short), add Departure, expanded options, persist profile
- `src/pages/Compare.tsx` — seed banner
- `src/lib/profile.ts` — **new**, profile persistence
- `src/App.tsx` — register `/begin`
- `src/assets/welcome-surreal.jpg` — regenerate (surreal water/beach)

No data model changes to `cura.ts`. No changes to existing trip workspace, journal, or other engines.

