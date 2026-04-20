

## Goal

Three discrete fixes: app-wide scroll-to-top on navigation, strict sequential gating in the friends/family context branches, and a grander map hero image.

## 1. Scroll to top on route change

Add a tiny `ScrollToTop` component that listens to `useLocation()` pathname changes and calls `window.scrollTo(0, 0)`. Mount it once inside `<BrowserRouter>` in `App.tsx`. Affects every route.

```tsx
// src/components/ScrollToTop.tsx
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [pathname]);
  return null;
};
```

## 2. Sequential gating — Friends & Family branches

Applies to **both** `/onboarding?path=full` (Step 3 Context) and `/onboarding?path=short` (Step 4 Context). One source of truth — same `Onboarding.tsx` file handles both paths.

### Current behavior (problem)
- **Friends**: After count is set, ALL N "Friend X passport" inputs render at once. Then once ALL passports filled, ALL same-departure + invite blocks render at once.
- **Family**: Once user passport is picked, the WHOLE family block (passports + same-departure + invite adults) renders at once.

### New behavior — strict sequential cascade

**Friends branch** (per friend, in order):
1. Friend count → confirm count
2. For friend `i` (starting at 0): show **passport** input. Only when friend `i`'s passport is filled → reveal **"Leaving from the same city?"** for friend `i`.
3. If "Yes" → reveal **"Invite them to this trip"** email field for friend `i`.
4. If "No" → reveal **"Where do they leave from?"** city input. Only once city ≥ 2 chars → reveal **"Invite them to this trip"** email field for friend `i`.
5. Only once friend `i`'s invite email block is visible → render the next friend `i+1`'s passport (start cascade again).

The invite email itself is optional to fill (matches current `friendsValid` which doesn't require email), but the **block must be visible** before the next friend appears.

**Family branch** (single sequence, not per-member):
1. Family composition counters (always visible once family chosen + user passport set)
2. Per-member passport list — sequential: family member `i+1`'s passport input only appears after member `i`'s passport is filled.
3. Once ALL family passports filled → reveal **"All leaving from the same city?"**
4. If "Yes" → reveal **"Invite the adults to this trip"** email block.
5. If "No" → reveal per-member departure city inputs. Once ALL departure cities ≥ 2 chars → reveal **"Invite the adults to this trip"** email block.

### Implementation
Use derived booleans (no new state) inside the JSX. Example pattern for friends:

```tsx
{friendsData.map((f, i) => {
  const prevComplete = i === 0 || friendInviteVisible(friendsData[i-1]);
  if (!prevComplete) return null;
  return (
    <div key={i}>
      <PassportSelect />
      {f.passport && <SameCityChoice />}
      {f.sameDeparture === false && <CityInput />}
      {(f.sameDeparture === true ||
        (f.sameDeparture === false && f.departure.length >= 2)) && <InviteEmail />}
    </div>
  );
})}
```

Same passport→sameCity→invite gating already exists for the **partner** branch (lines 622–683) — partner is already correct, no changes there.

`friendsValid` and `familyValid` validation stay unchanged — they already match the new visible-fields contract.

## 3. Map hero image — grander

Regenerate `src/assets/welcome-surreal-7.jpg` at 1536×1024 with stronger scale exaggeration: tiny figure dwarfed by an enormous unfolded paper map, map fills most of the frame like a billowing sail, soft daylight, sun-faded painterly palette, no text/wordmarks. Other 7 frames stay untouched. `alt` text in `Welcome.tsx` updated to reflect grander framing.

## Files touched

```text
src/components/ScrollToTop.tsx     NEW (10 lines)
src/App.tsx                        + mount <ScrollToTop /> inside <BrowserRouter>
src/pages/Onboarding.tsx           Friends branch (~lines 686–796): per-friend cascade
                                   Family branch (~lines 798–940): sequential passport list,
                                                                    gate same-city + invite
src/assets/welcome-surreal-7.jpg   regenerate, grander map composition
src/pages/Welcome.tsx              update alt text for frame 7 only
```

No changes to routing, validation logic, profile shape, copy, tokens, or any other page.

