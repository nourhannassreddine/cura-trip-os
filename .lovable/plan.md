

## Goal

Remove the trailing period from every breadcrumb top line across all onboarding paths. Text-only change.

## Change

In each file, find the eyebrow string passed to `TopBar` and strip the trailing `.`:

- `src/pages/Onboarding.tsx` — `MOVEMENT ${n} · OF 6.` → `MOVEMENT ${n} · OF 6`
- `src/pages/Choose.tsx` — `MOVEMENT ${step} · OF 3.` → `MOVEMENT ${step} · OF 3`
- `src/pages/TripImport.tsx` — `PLATE II · ½.` → `PLATE II · ½`

No other copy, layout, routing, or styling touched.

## Files touched

```text
src/pages/Onboarding.tsx
src/pages/Choose.tsx
src/pages/TripImport.tsx
```

