// CURA — shared trip data used across engines.
// Kept simple: in-memory mock that feels like a real connected workspace.

import lisbon from "@/assets/hero-lisbon.jpg";
import puglia from "@/assets/hero-puglia.jpg";
import marrakech from "@/assets/hero-marrakech.jpg";
import santorini from "@/assets/hero-santorini.jpg";
import still from "@/assets/still-objects.jpg";
import archive1 from "@/assets/archive-1.jpg";
import archive2 from "@/assets/archive-2.jpg";

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
  // Map coordinates within a normalized 0–100 viewbox (mock)
  x?: number;
  y?: number;
}

export interface ItineraryDay {
  date: string;
  dayLabel: string;
  weather: { temp: string; condition: string };
  energy: "low" | "med" | "high";
  blocks: ItineraryBlock[];
  // Editorial intelligence
  intent: string;          // why the day is shaped this way
  moment: string;          // the don't-miss highlight
  rationale: string;       // CURA reasoning
}

export const itinerary: ItineraryDay[] = [
  {
    date: "Thu · Jun 12",
    dayLabel: "Day 01 — Arrival, slow",
    weather: { temp: "29°", condition: "Clear, warm wind" },
    energy: "low",
    intent: "You land tired. I keep the day low until the light turns gold, then peak with one dressy dinner. No second activity.",
    moment: "Sunset on the Tenuta terrace — be there at 19:55, not later.",
    rationale: "Arrival days you've cancelled the second activity 4 of the last 5 trips. I just stopped pretending you'd do it.",
    blocks: [
      { time: "11:40", title: "Land in Bari", type: "travel", energy: "low", duration: "—", note: "Driver waiting at exit C.", x: 80, y: 22 },
      { time: "13:15", title: "Drive to Ostuni", place: "Masseria Le Carrube", type: "travel", energy: "low", duration: "1h 20m", x: 55, y: 48 },
      { time: "15:00", title: "Check-in & rest", place: "Masseria Le Carrube", type: "stay", energy: "low", outfit: "linen set, slip-ons", x: 50, y: 52 },
      { time: "19:30", title: "Sunset aperitivo", place: "Tenuta Moreno terrace", type: "moment", energy: "low", outfit: "white dress, gold", tag: "photo light at 19:55", x: 47, y: 58 },
      { time: "21:00", title: "Pugliese tasting menu", place: "Osteria del Tempo Perso", type: "eat", energy: "med", tag: "worth dressing up for", note: "Reserved · table 4, courtyard.", x: 44, y: 62 },
    ],
  },
  {
    date: "Fri · Jun 13",
    dayLabel: "Day 02 — Coast & olives",
    weather: { temp: "31°", condition: "Sunny, light breeze" },
    energy: "high",
    intent: "Sea in the morning while you're fresh, shade by 13:00, slow culture in the afternoon, dinner at home so you sleep early.",
    moment: "The cove south of Polignano — empty before 10:30. Not the main beach.",
    rationale: "Day 2 is the only high-energy slot in the trip. I'm spending it on the one thing you'd regret missing.",
    blocks: [
      { time: "08:30", title: "Slow breakfast", place: "Masseria garden", type: "eat", energy: "low", x: 50, y: 52 },
      { time: "10:00", title: "Polignano a Mare", type: "activity", energy: "high", outfit: "swim under linen shirt", tag: "swim cove, not the main beach", x: 38, y: 65 },
      { time: "13:30", title: "Lunch by the sea", place: "Grotta Palazzese (lunch only)", type: "eat", energy: "med", tag: "best for lunch not dinner", x: 36, y: 66 },
      { time: "16:00", title: "Olive grove visit", place: "Masseria Brancati", type: "activity", energy: "med", note: "Tasting included. Wear closed shoes.", x: 52, y: 50 },
      { time: "20:30", title: "Quiet dinner in", place: "Masseria kitchen", type: "eat", energy: "low", tag: "low-key, candles", x: 50, y: 52 },
    ],
  },
  {
    date: "Sat · Jun 14",
    dayLabel: "Day 03 — Alberobello, then nothing",
    weather: { temp: "30°", condition: "Sunny" },
    energy: "med",
    intent: "Front-load the only crowded thing on the trip, then nothing. The afternoon is empty on purpose.",
    moment: "Alberobello before 11:00. After that, it stops being magical.",
    rationale: "You've told me 3 times you over-program day 3. I left it open. Don't fill it.",
    blocks: [
      { time: "09:30", title: "Alberobello early", type: "activity", energy: "med", tag: "go before 11 — crowds", x: 60, y: 45 },
      { time: "12:30", title: "Trattoria Amatulli", type: "eat", energy: "low", tag: "amazing food, ugly space", x: 60, y: 46 },
      { time: "15:00", title: "Pool & paperback", place: "Masseria", type: "rest", energy: "low", note: "We left this open on purpose.", x: 50, y: 52 },
      { time: "20:00", title: "Pizza in town", place: "Pizzeria Pugliese", type: "eat", energy: "low", x: 48, y: 54 },
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

// ---- Outfits (wardrobe pieces & looks) ----
export type ItemCategory = "dress" | "top" | "bottom" | "shoes" | "bag" | "accessory" | "swim" | "outerwear";

export interface WardrobeItem {
  id: string;
  name: string;
  category: ItemCategory;
  color: string;     // human label
  swatch: string;    // hsl(...) css color, used as a tile
  uses: number;      // assigned to N moments
  note?: string;
}

export const wardrobe: WardrobeItem[] = [
  { id: "w1", name: "Cream linen midi", category: "dress", color: "Cream", swatch: "hsl(38 35% 88%)", uses: 2 },
  { id: "w2", name: "White slip dress", category: "dress", color: "White", swatch: "hsl(40 30% 96%)", uses: 1 },
  { id: "w3", name: "Olive button-down", category: "top", color: "Olive", swatch: "hsl(70 22% 38%)", uses: 3, note: "you packed this on 4 of last 5 trips" },
  { id: "w4", name: "White cotton tee", category: "top", color: "White", swatch: "hsl(40 25% 94%)", uses: 2 },
  { id: "w5", name: "Wide-leg cream trousers", category: "bottom", color: "Cream", swatch: "hsl(38 30% 86%)", uses: 1 },
  { id: "w6", name: "Leather sandals", category: "shoes", color: "Tan", swatch: "hsl(28 35% 55%)", uses: 4 },
  { id: "w7", name: "Closed canvas shoes", category: "shoes", color: "Sand", swatch: "hsl(38 25% 78%)", uses: 1 },
  { id: "w8", name: "Straw tote", category: "bag", color: "Straw", swatch: "hsl(42 45% 70%)", uses: 3 },
  { id: "w9", name: "Gold hoops", category: "accessory", color: "Gold", swatch: "hsl(42 60% 60%)", uses: 4 },
  { id: "w10", name: "Black one-piece", category: "swim", color: "Black", swatch: "hsl(25 20% 14%)", uses: 1 },
];

export interface OutfitLook {
  id: string;
  name: string;          // e.g. "Sunset aperitivo"
  moment: string;        // matches itinerary block title
  day: number;           // 0-indexed itinerary day
  itemIds: string[];     // wardrobe item IDs
  note?: string;         // CURA observation
  warning?: string;      // e.g. overuse, missing
}

export const outfitLooks: OutfitLook[] = [
  { id: "o1", name: "Airport day", moment: "Land in Bari", day: 0, itemIds: ["w4", "w5", "w6"] },
  { id: "o2", name: "Sunset aperitivo", moment: "Sunset aperitivo", day: 0, itemIds: ["w2", "w9", "w8"], note: "white on the terrace at 19:55 — that's the photo." },
  { id: "o3", name: "Cove morning", moment: "Polignano a Mare", day: 1, itemIds: ["w10", "w3", "w8", "w6"], warning: "Olive shirt is on day 1, 2, and 4. That's overuse." },
  { id: "o4", name: "Olive grove", moment: "Olive grove visit", day: 1, itemIds: ["w1", "w7"], warning: "No closed shoes packed yet — flagged." },
  { id: "o5", name: "Alberobello morning", moment: "Alberobello early", day: 2, itemIds: ["w1", "w6", "w8"] },
];

// ---- Saved places (for the Saved Places map) ----
export type SavedPlaceType = "food" | "coffee" | "photo" | "shop" | "stay" | "view";

export interface SavedPlace {
  id: string;
  name: string;
  type: SavedPlaceType;
  source: string;       // who/where it came from
  x: number;            // 0–100
  y: number;            // 0–100
  note?: string;
}

export const savedPlaces: SavedPlace[] = [
  { id: "p1", name: "Osteria del Tempo Perso", type: "food", source: "Cura · verified", x: 44, y: 62, note: "table 4, courtyard" },
  { id: "p2", name: "Trattoria Amatulli", type: "food", source: "@noemielle", x: 60, y: 46, note: "amazing food, ugly space" },
  { id: "p3", name: "Caffè Tripoli", type: "coffee", source: "Cura", x: 46, y: 58 },
  { id: "p4", name: "Polignano cove (south)", type: "photo", source: "@traveldiaries", x: 38, y: 65 },
  { id: "p5", name: "Tenuta Moreno terrace", type: "view", source: "Cura", x: 47, y: 58, note: "19:55 light" },
  { id: "p6", name: "Lab Concept (linen)", type: "shop", source: "@noemielle", x: 49, y: 55 },
  { id: "p7", name: "Masseria Le Carrube", type: "stay", source: "You · booked", x: 50, y: 52 },
  { id: "p8", name: "Grotta Palazzese", type: "food", source: "Cura · lunch only", x: 36, y: 66 },
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

// ---- Desire engine signals (Dream tab) ----
export interface DesireSignal {
  kind: "almost" | "like-yours" | "based-on" | "prefer-over";
  destinationId: string;     // refers to destinations[].id
  headline: string;          // the emotional hook
  reason: string;            // CURA's confident reasoning
  comparedTo?: string;       // for "prefer-over"
}

export const desireSignals: DesireSignal[] = [
  {
    kind: "almost",
    destinationId: "santorini",
    headline: "You almost chose this in March.",
    reason: "You opened it 11 times, compared it twice, then walked away. The shoulder season opens in 6 weeks.",
  },
  {
    kind: "like-yours",
    destinationId: "marrakech",
    headline: "Trips like yours go here next.",
    reason: "47 travelers with your taste pattern (slow, design-led, warm) booked this within 4 months of a Puglia trip.",
  },
  {
    kind: "based-on",
    destinationId: "lisbon",
    headline: "Based on your last three.",
    reason: "Soft light, walkable, low-decision. You'd find your rhythm here in a day.",
  },
  {
    kind: "prefer-over",
    destinationId: "puglia",
    headline: "You'd prefer this over Amalfi.",
    reason: "Same coast feeling, half the crowd, better food. I'm sure enough to say it plainly.",
    comparedTo: "Amalfi Coast",
  },
];

// ---- Travel personality patterns (Journal / You) ----
export interface PersonalityPattern {
  insight: string;       // first-person observation, e.g. "You prefer slow mornings"
  evidence: string;      // why CURA thinks so
  weight: number;        // 0–100 confidence
}

export const personalityPatterns: PersonalityPattern[] = [
  { insight: "You prefer slow mornings.", evidence: "First booking of the day starts after 10:00 in 11 of your last 14 trips.", weight: 92 },
  { insight: "You build days around food.", evidence: "Restaurants are the first thing you book. Activities slot around them.", weight: 88 },
  { insight: "You avoid crowded places.", evidence: "You opened 'before 11' or 'low season' filters on 6 out of 8 city trips.", weight: 81 },
  { insight: "You skip the famous version.", evidence: "Manteigaria over Belém. Osteria over the rooftop. You consistently choose the smaller name.", weight: 76 },
  { insight: "You overpack outfits, underpack shoes.", evidence: "Average 9 outfits, 1.4 pairs of shoes across 14 trips.", weight: 95 },
];

// ---- Daily auto-narrative (Journal) ----
export interface JournalEntry {
  day: string;
  narrative: string;     // CURA's auto-generated summary
  highlight: string;     // the one moment to remember
  // Archive card fields (used on Home / archive cards)
  city?: string;
  dateRange?: string;
  cover?: string;
  quote?: string;        // short editorial pull-quote for archive card
}

export const journalEntries: JournalEntry[] = [
  {
    day: "Day 1 · Lisbon",
    city: "Lisbon",
    dateRange: "Oct 18 — Oct 24, 2024",
    cover: archive1,
    quote: "Yellow afternoons. The pastéis were better the second day.",
    narrative: "You walked 9km, mostly downhill. Lunch ran late, dinner ran later. You stayed at the table after the bill came — that's usually a good sign.",
    highlight: "The pastel was better the second day. Try Manteigaria next time.",
  },
  {
    day: "Day 2 · Kyoto",
    city: "Kyoto",
    dateRange: "Apr 02 — Apr 09, 2024",
    cover: archive2,
    quote: "Lanterns on wet stone. We ate where the queue wasn't.",
    narrative: "Slow morning. You skipped the tram and walked Alfama instead. You bought the linen shirt you'd been thinking about for 3 trips.",
    highlight: "Alfama, not Bairro Alto. Save this for next time.",
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
