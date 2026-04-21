import { useEffect, useState } from "react";

/* ------------------------------------------------------------------
   CURA Profile Data — extended profile store covering all 8 chapters.
   Lives alongside src/lib/profile.ts (which holds calibration intake).
   This one persists the editable You-tab state.
------------------------------------------------------------------ */

export interface HowYouTravel {
  pace: string | null;
  with: string[];
  sleep: string | null;
  spend: string | null;
  mornings: string | null;
  food: string | null;
}

export interface ArchiveTrip {
  id: string;
  destination: string;
  from?: string | null;
  to?: string | null;
  memory?: string | null;
  markers: string[];
  source: "cura" | "manual";
}

export interface WatchlistItem {
  id: string;
  title: string;
  type: "series" | "film";
  downloaded: boolean;
}

export interface InTransit {
  genres: string[];
  format: string | null;
  languages: string[];
  watchlist: WatchlistItem[];
}

export interface Rhythm {
  enabled: boolean;
  lastPeriod: string | null; // ISO date
  cycleLength: number;
  periodLength: number;
  symptoms: string[];
}

export interface ProfileData {
  how: HowYouTravel;
  moods: string[];
  purpose: string[];
  rhythm: Rhythm;
  transit: InTransit;
  archive: ArchiveTrip[];
  updatedAt: number;
}

const KEY = "cura.profileData";

const defaultArchive: ArchiveTrip[] = [
  {
    id: "lisbon-cura",
    destination: "Lisbon",
    from: "2024-04-12",
    to: "2024-04-19",
    memory: "The miradouro at golden hour. I'd go back for that alone.",
    markers: ["Loved", "Would revisit"],
    source: "cura",
  },
  {
    id: "kyoto-cura",
    destination: "Kyoto",
    from: "2023-11-02",
    to: "2023-11-10",
    memory: "Quieter than I expected. The temples in the rain.",
    markers: ["Loved"],
    source: "cura",
  },
];

export const empty: ProfileData = {
  how: { pace: null, with: [], sleep: null, spend: null, mornings: null, food: null },
  moods: [],
  purpose: [],
  rhythm: { enabled: false, lastPeriod: null, cycleLength: 28, periodLength: 5, symptoms: [] },
  transit: { genres: [], format: null, languages: [], watchlist: [] },
  archive: defaultArchive,
  updatedAt: 0,
};

export function loadProfileData(): ProfileData {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return {
      ...empty,
      ...parsed,
      how: { ...empty.how, ...(parsed.how ?? {}) },
      rhythm: { ...empty.rhythm, ...(parsed.rhythm ?? {}) },
      transit: { ...empty.transit, ...(parsed.transit ?? {}) },
      archive: parsed.archive?.length ? parsed.archive : defaultArchive,
    } as ProfileData;
  } catch {
    return empty;
  }
}

export function saveProfileData(patch: Partial<ProfileData>) {
  if (typeof window === "undefined") return;
  const next: ProfileData = {
    ...loadProfileData(),
    ...patch,
    updatedAt: Date.now(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  // eslint-disable-next-line no-console
  console.info("[cura] profileData saved", next);
  window.dispatchEvent(new CustomEvent("cura:profileData", { detail: next }));
}

export function useProfileData(): [ProfileData, (patch: Partial<ProfileData>) => void] {
  const [data, setData] = useState<ProfileData>(() => loadProfileData());
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<ProfileData>;
      if (ce.detail) setData(ce.detail);
      else setData(loadProfileData());
    };
    window.addEventListener("cura:profileData", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("cura:profileData", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return [data, saveProfileData];
}
