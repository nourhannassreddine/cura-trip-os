// CURA — shared trip data used across engines.
// Kept simple: in-memory mock that feels like a real connected workspace.

import lisbon from "@/assets/hero-lisbon.jpg";
import puglia from "@/assets/hero-puglia.jpg";
import marrakech from "@/assets/hero-marrakech.jpg";
import santorini from "@/assets/hero-santorini.jpg";
import still from "@/assets/still-objects.jpg";

export const heroImages = { lisbon, puglia, marrakech, santorini, still };

export type TripMode = "Premium" | "Planner" | "Auto" | "Aesthetic";

export interface Trip {
  id: string;
  city: string;
  country: string;
  dates: string;
  status: "dreaming" | "planning" | "ready" | "live" | "memory";
  cover: string;
  mode: TripMode;
  travelers: string[];
  daysOut: number;       // negative if past
  readiness: number;     // 0-100
}

export const trips: Trip[] = [
  {
    id: "puglia-25",
    city: "Puglia",
    country: "Italy",
    dates: "Jun 12 — Jun 22",
    status: "planning",
    cover: puglia,
    mode: "Aesthetic",
    travelers: ["You", "Maya"],
    daysOut: 38,
    readiness: 64,
  },
  {
    id: "marrakech-25",
    city: "Marrakech",
    country: "Morocco",
    dates: "Sep 04 — Sep 11",
    status: "dreaming",
    cover: marrakech,
    mode: "Aesthetic",
    travelers: ["You", "Maya", "Iman"],
    daysOut: 122,
    readiness: 12,
  },
  {
    id: "lisbon-24",
    city: "Lisbon",
    country: "Portugal",
    dates: "Oct 18 — Oct 24, 2024",
    status: "memory",
    cover: lisbon,
    mode: "Planner",
    travelers: ["You"],
    daysOut: -180,
    readiness: 100,
  },
];

export const activeTrip = trips[0];

// ---- Itinerary (Puglia) ----
export interface ItineraryBlock {
  time: string;
  title: string;
  place?: string;
  type: "travel" | "eat" | "stay" | "activity" | "moment" | "rest";
  energy: "low" | "med" | "high";
  outfit?: string;
  tag?: string;          // editorial tag e.g. "worth dressing up for"
  note?: string;         // CURA whisper
  duration?: string;
}

export interface ItineraryDay {
  date: string;
  dayLabel: string;
  weather: { temp: string; condition: string };
  energy: "low" | "med" | "high";
  blocks: ItineraryBlock[];
}

export const itinerary: ItineraryDay[] = [
  {
    date: "Thu · Jun 12",
    dayLabel: "Day 01 — Arrival, slow",
    weather: { temp: "29°", condition: "Clear, warm wind" },
    energy: "low",
    blocks: [
      { time: "11:40", title: "Land in Bari", type: "travel", energy: "low", duration: "—", note: "Driver waiting at exit C." },
      { time: "13:15", title: "Drive to Ostuni", place: "Masseria Le Carrube", type: "travel", energy: "low", duration: "1h 20m" },
      { time: "15:00", title: "Check-in & rest", place: "Masseria Le Carrube", type: "stay", energy: "low", outfit: "linen set, slip-ons" },
      { time: "19:30", title: "Sunset aperitivo", place: "Tenuta Moreno terrace", type: "moment", energy: "low", outfit: "white dress, gold", tag: "photo light at 19:55" },
      { time: "21:00", title: "Pugliese tasting menu", place: "Osteria del Tempo Perso", type: "eat", energy: "med", tag: "worth dressing up for", note: "Reserved · table 4, courtyard." },
    ],
  },
  {
    date: "Fri · Jun 13",
    dayLabel: "Day 02 — Coast & olives",
    weather: { temp: "31°", condition: "Sunny, light breeze" },
    energy: "high",
    blocks: [
      { time: "08:30", title: "Slow breakfast", place: "Masseria garden", type: "eat", energy: "low" },
      { time: "10:00", title: "Polignano a Mare", type: "activity", energy: "high", outfit: "swim under linen shirt", tag: "swim cove, not the main beach" },
      { time: "13:30", title: "Lunch by the sea", place: "Grotta Palazzese (lunch only)", type: "eat", energy: "med", tag: "best for lunch not dinner" },
      { time: "16:00", title: "Olive grove visit", place: "Masseria Brancati", type: "activity", energy: "med", note: "Tasting included. Wear closed shoes." },
      { time: "20:30", title: "Quiet dinner in", place: "Masseria kitchen", type: "eat", energy: "low", tag: "low-key, candles" },
    ],
  },
  {
    date: "Sat · Jun 14",
    dayLabel: "Day 03 — Alberobello, then nothing",
    weather: { temp: "30°", condition: "Sunny" },
    energy: "med",
    blocks: [
      { time: "09:30", title: "Alberobello early", type: "activity", energy: "med", tag: "go before 11 — crowds" },
      { time: "12:30", title: "Trattoria Amatulli", type: "eat", energy: "low", tag: "amazing food, ugly space" },
      { time: "15:00", title: "Pool & paperback", place: "Masseria", type: "rest", energy: "low", note: "We left this open on purpose." },
      { time: "20:00", title: "Pizza in town", place: "Pizzeria Pugliese", type: "eat", energy: "low" },
    ],
  },
];

// ---- Packing list ----
export interface PackItem { name: string; category: string; packed: boolean; note?: string; }
export const packing: PackItem[] = [
  { name: "Linen midi dress (cream)", category: "Outfits", packed: true },
  { name: "White button-down", category: "Outfits", packed: true },
  { name: "Wide-leg trousers", category: "Outfits", packed: false },
  { name: "Slip dress for dinner", category: "Outfits", packed: false, note: "for Osteria reservation" },
  { name: "Leather sandals", category: "Shoes", packed: true },
  { name: "Closed shoes (olive grove)", category: "Shoes", packed: false, note: "CURA flagged · day 2" },
  { name: "Straw hat", category: "Accessories", packed: true },
  { name: "Gold hoops", category: "Accessories", packed: true },
  { name: "Mineral SPF 50", category: "Care", packed: false },
  { name: "Refillable bottle", category: "Essentials", packed: true },
  { name: "Universal adapter (Type F)", category: "Essentials", packed: false },
  { name: "Passport + EU eHIC", category: "Documents", packed: true },
];

// ---- Spend ----
export interface SpendItem { label: string; amount: number; currency: string; category: string; who: string; day: string; }
export const spend: SpendItem[] = [
  { label: "Masseria Le Carrube · 4 nights", amount: 1840, currency: "€", category: "Stay", who: "Split", day: "Pre" },
  { label: "Bari → Ostuni driver", amount: 95, currency: "€", category: "Transit", who: "You", day: "Day 1" },
  { label: "Osteria del Tempo Perso", amount: 168, currency: "€", category: "Food", who: "Maya", day: "Day 1" },
  { label: "Olive grove tasting", amount: 40, currency: "€", category: "Activity", who: "Split", day: "Day 2" },
  { label: "Polignano lunch", amount: 112, currency: "€", category: "Food", who: "You", day: "Day 2" },
];

// ---- Discover (mood-led destinations) ----
export interface Destination {
  id: string;
  name: string;
  country: string;
  cover: string;
  tagline: string;
  visa: "easy" | "medium" | "hard";
  flightHrs: string;
  dailySpend: string;
  bestFor: string[];
}

export const destinations: Destination[] = [
  {
    id: "puglia",
    name: "Puglia",
    country: "Italy",
    cover: puglia,
    tagline: "Olive light, slow lunches.",
    visa: "easy",
    flightHrs: "3h",
    dailySpend: "€140",
    bestFor: ["aesthetic", "couples", "slow"],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    cover: marrakech,
    tagline: "Pink dust at golden hour.",
    visa: "easy",
    flightHrs: "3h 40",
    dailySpend: "€90",
    bestFor: ["girls trip", "design", "warm"],
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    cover: santorini,
    tagline: "Blue on blue. Repeat.",
    visa: "easy",
    flightHrs: "3h 30",
    dailySpend: "€180",
    bestFor: ["honeymoon", "premium", "view"],
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    cover: lisbon,
    tagline: "Soft yellow afternoons.",
    visa: "easy",
    flightHrs: "2h 50",
    dailySpend: "€110",
    bestFor: ["solo", "creative", "walkable"],
  },
];

// ---- CURA AI whispers — editorial concierge voice ----
export const curaWhispers = [
  "It rains in Ostuni on the 14th — I held a museum option for you.",
  "Day 2 is heavy. I moved the olive grove earlier so dinner stays slow.",
  "The slip dress hasn't been packed. Dinner on Day 1 is dressy.",
  "You overspent €60 on food today. Tomorrow's lunch is already booked, you're fine.",
  "Maya hasn't seen Day 3 yet. Want me to nudge her?",
];
