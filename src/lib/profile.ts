import { useEffect, useState } from "react";

/* ------------------------------------------------------------------
   CURA Profile Store — small localStorage-backed identity object.
   Other screens (Dream, Itinerary, Compare) can read this to adapt
   their behavior. Today we persist + log; tomorrow we filter.
------------------------------------------------------------------ */

export type CuraPath = "full" | "short";

export interface Companion {
  passport: string | null;
  email?: string | null;
  // for partner: same departure city as user?
  sameDeparture?: boolean;
  departure?: string | null;
}

export interface FamilyComposition {
  adults: number;
  teens: number;
  children: number;
}

export interface CuraProfile {
  path: CuraPath | null;
  moods: string[];
  pace: string | null;
  destination?: string | null; // short path: where they're thinking
  departure: string | null;
  passport?: string | null;
  company: string | null;
  // company-specific extras
  partner?: Companion | null;
  friends?: Companion[];
  family?: FamilyComposition | null;
  spend: string | null;
  dealbreakers: string[];
  dealbreakerOther?: string | null;
  updatedAt: number;
}

const KEY = "cura.profile";

const empty: CuraProfile = {
  path: null,
  moods: [],
  pace: null,
  destination: null,
  departure: null,
  passport: null,
  company: null,
  partner: null,
  friends: [],
  family: null,
  spend: null,
  dealbreakers: [],
  dealbreakerOther: null,
  updatedAt: 0,
};

export function loadProfile(): CuraProfile {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) } as CuraProfile;
  } catch {
    return empty;
  }
}

export function saveProfile(patch: Partial<CuraProfile>) {
  if (typeof window === "undefined") return;
  const next: CuraProfile = {
    ...loadProfile(),
    ...patch,
    updatedAt: Date.now(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  // Behavioral wiring: log so we can verify other screens later.
  // eslint-disable-next-line no-console
  console.info("[cura] profile saved", next);
  window.dispatchEvent(new CustomEvent("cura:profile", { detail: next }));
}

export function useProfile(): CuraProfile {
  const [profile, setProfile] = useState<CuraProfile>(() => loadProfile());
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<CuraProfile>;
      if (ce.detail) setProfile(ce.detail);
      else setProfile(loadProfile());
    };
    window.addEventListener("cura:profile", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("cura:profile", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return profile;
}
