import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { SearchableSelect } from "@/components/cura/SearchableSelect";
import { CityInput } from "@/components/cura/CityInput";
import { passportNationalities } from "@/data/locations";
import { cn } from "@/lib/utils";
import {
  saveProfile,
  type CuraPath,
  type Companion,
  type FamilyComposition,
} from "@/lib/profile";

/* ----------------------------------------------------------
   CURA Onboarding — calibration, not a quiz.
   Path-aware:
     full  → 5 steps (Feel · Decide · Context+Departure · Dealbreakers · Reading)
     short → 4 steps (Feel · Decide · Destination · Context condensed) → /trip/new
---------------------------------------------------------- */

const moods = [
  { id: "slow",        label: "Slow & sun-faded",                 note: "long lunches, no schedule",      react: "Noted. We'll guard your mornings." },
  { id: "design",      label: "Design-forward",                   note: "neighborhoods, not landmarks",   react: "Good. Landmarks are mostly other people's photos." },
  { id: "wild",        label: "A little wild",                    note: "say yes more often",             react: "I'll leave more room for accidents." },
  { id: "refined",     label: "Refined & quiet",                  note: "fewer, better choices",          react: "Then I'll cut three things from every day." },
  { id: "creative",    label: "For making things",                note: "shoot, write, walk",             react: "I'll plan around light, not opening hours." },
  { id: "social",      label: "Loud, with people",                note: "music, late dinners",            react: "Dinners after 9, then. No museums at 9am." },
  { id: "solo",        label: "Alone, on purpose",                note: "I came here to think",           react: "Then I'll plan tables for one without flinching." },
  { id: "luxury",      label: "Quiet luxury, no logos",           note: "soft sheets, hard to find",      react: "Understood. The good places don't have signs." },
  { id: "spontaneous", label: "Plans are suggestions",            note: "I want room to drift",           react: "I'll pencil things, not ink them." },
  { id: "structured",  label: "A clean schedule is a kindness",   note: "I rest better with a plan",      react: "Then I'll book everything before you ask." },
  { id: "wellness",    label: "Bodies before agendas",            note: "sleep, water, sun, repeat",      react: "Then nothing starts before 10. Including me." },
  { id: "spiritual",   label: "Something larger than me",         note: "ritual, silence, distance",      react: "I'll find the places that don't perform." },
  { id: "adventure",   label: "Slightly past my comfort",         note: "altitude, salt, small fear",     react: "I'll pick the route that earns the dinner." },
  { id: "nostalgic",   label: "Somewhere I've been told about",   note: "a story, a name, a memory",      react: "Then we travel toward someone else's love." },
  { id: "culinary",    label: "I came for the table",             note: "every meal is the plan",         react: "Then the trip rotates around lunch. As it should." },
  { id: "off-grid",    label: "Hard to reach me",                 note: "no signal, no calendar",         react: "Good. I'll surface only what matters." },
  { id: "family-led",  label: "It's not about me",                note: "kids, parents, the group",       react: "Then I'll plan around their stamina, not yours." },
  { id: "romantic",    label: "Just the two of us",               note: "small tables, longer evenings",  react: "Then I'll find rooms with doors that close properly." },
];

const pacing = [
  { id: "auto",    label: "Plan it for me",      note: "I trust your taste",        react: "Then I'll be opinionated. You can overrule me." },
  { id: "mixed",   label: "A bit of both",       note: "I suggest, you confirm",    react: "Most travelers say this. The good ones mean it." },
  { id: "planner", label: "Let me design it",    note: "I want the controls",       react: "Fine. I'll provide structure, not decisions." },
];

const company = [
  { id: "solo",    label: "Alone",          note: "I move at my own speed" },
  { id: "partner", label: "With a partner", note: "two people, one tempo" },
  { id: "friends", label: "With friends",   note: "loud table, group chat" },
  { id: "family",  label: "With family",    note: "ages, naps, logistics" },
];

const spending = [
  { id: "top-down",      label: "I start at the top and work down",     note: "the best room, then everything else fits" },
  { id: "where-it-shows",label: "I spend where it shows",                note: "great hotel, average lunch is fine" },
  { id: "where-no-one-sees", label: "I spend where no one sees",         note: "modest room, extraordinary dinner" },
  { id: "ranged",        label: "I want range, not stretch",             note: "comfortable across, never strained" },
  { id: "table-decider", label: "I decide at the table",                 note: "no plan survives the menu" },
  { id: "experience-only", label: "Money for experiences, not objects",  note: "I'll pay for the boat, not the bag" },
  { id: "thrift-flex",   label: "Thrifty, then occasionally absurd",     note: "weeks of restraint, one extravagant night" },
  { id: "points-pilgrim",label: "I optimize before I arrive",            note: "miles, lounges, the long game" },
  { id: "principle",     label: "Cheap on principle",                    note: "luxury makes me uncomfortable" },
  { id: "guilt-free",    label: "I want to not think about it",          note: "tell me the total, then disappear" },
];

const purposes = [
  { id: "reset",         label: "A reset",                    note: "I need the noise turned down" },
  { id: "celebration",   label: "A celebration",              note: "birthday, anniversary, a milestone" },
  { id: "honeymoon",     label: "A honeymoon",                note: "the first trip as us" },
  { id: "babymoon",      label: "A last quiet trip",          note: "before the baby, before the change" },
  { id: "work",          label: "Work, with edges",           note: "the meeting is real, the rest is mine" },
  { id: "creative",      label: "A creative project",         note: "shoot, write, research, make" },
  { id: "reunion",       label: "A reunion",                  note: "people I don't see enough" },
  { id: "wedding",       label: "Someone's wedding",          note: "I'm a guest, not the planner" },
  { id: "grief",         label: "Quiet, after something hard", note: "I want a place to be still" },
  { id: "milestone",     label: "A solo milestone",            note: "the trip I promised myself" },
  { id: "family",        label: "Family time, the good kind", note: "everyone, in one place, slowly" },
  { id: "scout",         label: "Scouting somewhere",         note: "could I live here?" },
  { id: "none",          label: "No reason. I just want to go", note: "the urge is the reason" },
];

const dealbreakers = [
  { id: "crowds",        label: "Crowds & queues" },
  { id: "early",         label: "Early starts" },
  { id: "transit",       label: "Long transfers" },
  { id: "tourist",       label: "Tourist traps" },
  { id: "noise",         label: "Hotel noise" },
  { id: "rushing",       label: "Rushing between things" },
  { id: "bad-coffee",    label: "Bad coffee" },
  { id: "fees",          label: "Hidden fees" },
  { id: "chains",        label: "Chain restaurants" },
  { id: "overplanned",   label: "Over-planned days" },
  { id: "dead-night",    label: "Dead nightlife" },
  { id: "wifi",          label: "Slow wifi" },
  { id: "tipping-stress",label: "Confusing tipping culture" },
  { id: "language",      label: "Places where almost no one speaks English" },
  { id: "instagram",     label: "Places that perform for cameras" },
  { id: "small-rooms",   label: "Tiny hotel rooms" },
  { id: "no-bath",       label: "Showers only, never a bath" },
  { id: "thin-pillows",  label: "Thin, foam pillows" },
  { id: "bad-air",       label: "No working air-con in summer" },
  { id: "scams",         label: "Petty scams & taxi haggling" },
  { id: "harassment",    label: "Street harassment" },
  { id: "unsafe-water",  label: "Tap water I can't trust" },
  { id: "dress-code",    label: "Heavy dress codes" },
  { id: "smoking",       label: "Smoking indoors" },
  { id: "loud-music",    label: "Loud music at dinner" },
  { id: "shared-bath",   label: "Shared bathrooms" },
  { id: "no-laundry",    label: "Nowhere to do laundry" },
  { id: "kids-noise",    label: "Kids' clubs, water parks, mascots" },
  { id: "no-pets",       label: "Anywhere I can't bring my dog" },
  { id: "weather",       label: "Rain on the only beach day" },
  { id: "altitude",      label: "Altitude" },
  { id: "long-flights",  label: "Anywhere with over 8 hours of flying" },
  { id: "jet-lag",       label: "Crossing more than 4 time zones" },
  { id: "expensive-data",label: "No cheap local SIM" },
  { id: "no-vegan",      label: "No vegetarian or vegan options" },
  { id: "all-inclusive", label: "All-inclusive resorts" },
  { id: "cruises",       label: "Anything cruise-adjacent" },
  { id: "no-kitchen",    label: "No kitchen in the room" },
  { id: "loud-ac",       label: "Loud air-con or street noise at night" },
  { id: "visa-hard",     label: "Hard-to-get visas" },
  { id: "visa-expensive",label: "Expensive visa fees" },
  { id: "visa-interview",label: "In-person visa interviews" },
  { id: "visa-onarrival",label: "Visa-on-arrival queues" },
  { id: "passport-stamps", label: "Politically sensitive passport stamps" },
  { id: "cash-only",     label: "Cash-only economies" },
  { id: "no-uber",       label: "No ride-share apps, only street taxis" },
  { id: "no-direct-flight", label: "No direct flight from my city" },
];

/* utility — clean a number for friend count */
const clamp = (n: number, min = 1, max = 12) => Math.max(min, Math.min(max, n));

const Onboarding = () => {
  const [params] = useSearchParams();
  const path: CuraPath = params.get("path") === "short" ? "short" : "full";
  const isShort = path === "short";

  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [pace, setPace] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [purposeNote, setPurposeNote] = useState<string>("");
  const [destination, setDestination] = useState<string>(""); // short path only
  const [passport, setPassport] = useState<string | null>(null);
  const [departure, setDeparture] = useState<string>("");
  const [companyChoice, setCompanyChoice] = useState<string | null>(null);
  // Partner extras
  const [partnerPassport, setPartnerPassport] = useState<string | null>(null);
  const [partnerSameDeparture, setPartnerSameDeparture] = useState<boolean | null>(null);
  const [partnerDeparture, setPartnerDeparture] = useState<string>("");
  const [partnerEmail, setPartnerEmail] = useState<string>("");
  // Friends extras
  const [friendsCount, setFriendsCount] = useState<number>(2);
  const [friendsCountSet, setFriendsCountSet] = useState<boolean>(false);
  const [friendsData, setFriendsData] = useState<Companion[]>([]);
  // Family extras
  const [family, setFamily] = useState<FamilyComposition>({ adults: 1, teens: 0, children: 0 });
  const [familyPassports, setFamilyPassports] = useState<(string | null)[]>([]);
  const [familyEmails, setFamilyEmails] = useState<string[]>([]);
  const [familySameDeparture, setFamilySameDeparture] = useState<boolean | null>(null);
  const [familyDepartures, setFamilyDepartures] = useState<string[]>([]);

  const [spend, setSpend] = useState<string | null>(null);
  const [breakers, setBreakers] = useState<Set<string>>(new Set());
  const [breakerOther, setBreakerOther] = useState<string>("");
  const [lastMood, setLastMood] = useState<string | null>(null);

  const nav = useNavigate();
  const stepCount = isShort ? 5 : 6;

  // reset step if path changes mid-flow
  useEffect(() => { setStep(0); }, [path]);

  // keep friends array length in sync with count
  useEffect(() => {
    setFriendsData((prev) => {
      const n = clamp(friendsCount);
      const next = [...prev];
      while (next.length < n) next.push({ passport: null, email: null, sameDeparture: true, departure: "" });
      while (next.length > n) next.pop();
      return next;
    });
  }, [friendsCount]);

  // keep family member arrays sized to total members
  useEffect(() => {
    const total = family.adults + family.teens + family.children;
    setFamilyPassports((prev) => {
      const next = [...prev];
      while (next.length < total) next.push(null);
      while (next.length > total) next.pop();
      return next;
    });
    setFamilyEmails((prev) => {
      const next = [...prev];
      while (next.length < family.adults) next.push("");
      while (next.length > family.adults) next.pop();
      return next;
    });
    setFamilyDepartures((prev) => {
      const next = [...prev];
      while (next.length < total) next.push("");
      while (next.length > total) next.pop();
      return next;
    });
  }, [family.adults, family.teens, family.children]);

  const toggle = (id: string) => {
    const next = new Set(picked);
    next.has(id) ? next.delete(id) : next.add(id);
    setPicked(next);
    setLastMood(id);
  };

  const toggleBreaker = (id: string) => {
    const next = new Set(breakers);
    next.has(id) ? next.delete(id) : next.add(id);
    setBreakers(next);
  };

  /* ----- CURA's reading of the user (full path, step 5) ----- */
  const reading = useMemo(() => {
    const m = picked;
    const isSlow = m.has("slow") || m.has("refined") || m.has("luxury") || m.has("wellness");
    const isDesign = m.has("design") || m.has("creative");
    const isWild = m.has("wild") || m.has("social") || m.has("spontaneous") || m.has("adventure");

    const headline = isDesign
      ? "You don't travel for landmarks."
      : isSlow
        ? "You don't travel to see things."
        : isWild
          ? "You don't travel to relax."
          : "You don't travel the way you say you do.";

    const sub = isDesign
      ? "You travel for atmosphere."
      : isSlow
        ? "You travel to slow your own clock down."
        : isWild
          ? "You travel to feel less careful."
          : "You travel to be slightly different when you come home.";

    const challenge =
      pace === "planner"
        ? "You said you want the controls. You'll hand them to me by day three."
        : pace === "auto"
          ? "You said plan it for you. You'll override the first restaurant. Everyone does."
          : "You said a bit of both. Translation: lead, but don't make it obvious.";

    const pick = isDesign ? "Puglia" : isSlow ? "Lisbon" : isWild ? "Marrakech" : "Puglia";
    const wouldHavePicked = isDesign ? "Rome" : isSlow ? "Paris" : isWild ? "Bali" : "Rome";

    return { headline, sub, challenge, pick, wouldHavePicked };
  }, [picked, pace]);

  const moodReaction = lastMood ? moods.find((m) => m.id === lastMood)?.react : null;
  const paceReaction = pace ? pacing.find((p) => p.id === pace)?.react : null;

  /* ----- branching validation for "Usually with" ----- */
  const partnerValid =
    companyChoice !== "partner"
      ? true
      : !!(passport && partnerPassport && partnerSameDeparture !== null &&
          (partnerSameDeparture || partnerDeparture.trim().length >= 2));

  const friendsValid =
    companyChoice !== "friends"
      ? true
      : !!(passport && friendsCountSet && friendsData.length === clamp(friendsCount) &&
          friendsData.every((f) => f.passport &&
            (f.sameDeparture || (f.departure ?? "").trim().length >= 2)));

  const familyValid =
    companyChoice !== "family"
      ? true
      : (() => {
          const total = family.adults + family.teens + family.children;
          if (total < 1) return false;
          if (familyPassports.length !== total) return false;
          if (familySameDeparture === null) return false;
          if (familySameDeparture === false) {
            if (familyDepartures.length !== total) return false;
            if (!familyDepartures.every((d) => d.trim().length >= 2)) return false;
          }
          return familyPassports.every((p) => !!p) && !!passport;
        })();

  /* Step routing
     full  : 0 Feel · 1 Decide · 2 Purpose · 3 Context · 4 Dealbreakers · 5 Reading
     short : 0 Feel · 1 Decide · 2 Purpose · 3 Destination · 4 Context           */

  const isPurpose = step === 2;
  const isFullContext = !isShort && step === 3;
  const isShortDestination = isShort && step === 3;
  const isShortContext = isShort && step === 4;

  const fullContextValid =
    isFullContext &&
    departure.trim().length >= 2 &&
    !!passport &&
    companyChoice !== null &&
    spend !== null &&
    partnerValid && friendsValid && familyValid;

  const shortContextValid =
    isShortContext &&
    departure.trim().length >= 2 &&
    !!passport &&
    companyChoice !== null &&
    spend !== null &&
    partnerValid && friendsValid && familyValid;

  const canContinue =
    (step === 0 && picked.size >= 1) ||
    (step === 1 && pace !== null) ||
    (isPurpose && purpose !== null) ||
    (isShortDestination && destination.trim().length >= 2) ||
    fullContextValid ||
    shortContextValid ||
    (!isShort && step === 4) ||
    (!isShort && step === 5);

  const persist = () => {
    saveProfile({
      path,
      moods: Array.from(picked),
      pace,
      purpose,
      purposeNote: purposeNote.trim() || null,
      destination: isShort ? (destination.trim() || null) : null,
      departure: departure.trim() || null,
      passport,
      company: companyChoice,
      partner: companyChoice === "partner" ? {
        passport: partnerPassport,
        sameDeparture: partnerSameDeparture ?? true,
        departure: partnerSameDeparture ? departure.trim() : partnerDeparture.trim(),
        email: partnerEmail.trim() || null,
      } : null,
      friends: companyChoice === "friends" ? friendsData : [],
      family: companyChoice === "family" ? family : null,
      familyDepartures: companyChoice === "family"
        ? (familySameDeparture === false ? familyDepartures : [])
        : [],
      spend,
      dealbreakers: isShort ? [] : Array.from(breakers),
      dealbreakerOther: isShort ? null : (breakerOther.trim() || null),
    });
  };

  const handleContinue = () => {
    if (step < stepCount - 1) {
      persist();
      setStep(step + 1);
      return;
    }
    persist();
    if (isShort) {
      nav("/trip/new");
    } else {
      nav("/home");
    }
  };

  // Button label rules:
  // - short path: only LAST step says "Build my trip", everything else "Next"
  // - full path: last step shows "Take me to {pick}"
  const finalLabel = isShort
    ? step < stepCount - 1
      ? "Next"
      : "Build my trip"
    : step < stepCount - 1
      ? "Continue"
      : `Take me to ${reading.pick}`;

  return (
    <main className="app-shell flex flex-col">
      <TopBar
        eyebrow={`Movement ${step + 1} of ${stepCount}${isShort ? " · short" : ""}`}
        title="Calibration"
        right={
          <Link to="/home" className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
            Skip
          </Link>
        }
      />

      <div className="px-5">
        <div className={cn("grid gap-1.5", isShort ? "grid-cols-4" : "grid-cols-5")}>
          {Array.from({ length: stepCount }).map((_, i) => (
            <div key={i} className={cn("h-px", i <= step ? "bg-primary" : "bg-foreground/20")} />
          ))}
        </div>
      </div>

      <section className="flex-1 px-5 pt-7 pb-6 cura-rise">
        {/* ---------- STEP 0 — FEEL ---------- */}
        {step === 0 && (
          <>
            <div className="editorial-eyebrow text-muted-foreground mb-3">i. Feel</div>
            <h2 className="display-lg max-w-[12ch]">
              How do you like to <span className="italic-serif">feel</span> on a trip?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Pick two or three. Don't overthink it. I'm watching the pattern, not the labels.</p>

            <ul className="mt-7 space-y-2">
              {moods.map((m) => {
                const on = picked.has(m.id);
                return (
                  <li key={m.id}>
                    <button
                      onClick={() => toggle(m.id)}
                      className={cn(
                        "w-full flex items-center justify-between border px-4 py-3.5 text-left transition-colors",
                        on ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20 hover:border-foreground/50"
                      )}
                    >
                      <div>
                        <div className="font-serif text-base leading-tight">{m.label}</div>
                        <div className={cn("text-xs mt-0.5", on ? "text-ink-foreground/70" : "text-muted-foreground")}>{m.note}</div>
                      </div>
                      {on && <Check className="h-4 w-4" strokeWidth={1.5} />}
                    </button>
                  </li>
                );
              })}
            </ul>

            {moodReaction && picked.size > 0 && (
              <div className="mt-6">
                <CuraWhisper variant="inline">{moodReaction}</CuraWhisper>
              </div>
            )}
          </>
        )}

        {/* ---------- STEP 1 — DECIDE ---------- */}
        {step === 1 && (
          <>
            <div className="editorial-eyebrow text-muted-foreground mb-3">ii. Decide</div>
            <h2 className="display-lg max-w-[14ch]">
              How much do you want to <span className="italic-serif">decide</span>?
            </h2>
            <ul className="mt-7 space-y-2">
              {pacing.map((p) => {
                const on = pace === p.id;
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => setPace(p.id)}
                      className={cn(
                        "w-full flex items-center justify-between border px-4 py-4 text-left transition-colors",
                        on ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20 hover:border-foreground/50"
                      )}
                    >
                      <div>
                        <div className="font-serif text-lg leading-tight">{p.label}</div>
                        <div className={cn("text-xs mt-0.5", on ? "text-ink-foreground/70" : "text-muted-foreground")}>{p.note}</div>
                      </div>
                      {on && <Check className="h-4 w-4" strokeWidth={1.5} />}
                    </button>
                  </li>
                );
              })}
            </ul>

            {paceReaction && (
              <div className="mt-6">
                <CuraWhisper variant="inline">{paceReaction}</CuraWhisper>
              </div>
            )}
          </>
        )}

        {/* ---------- SHORT PATH STEP 2 — DESTINATION ---------- */}
        {isShortDestination && (
          <>
            <div className="editorial-eyebrow text-muted-foreground mb-3">iii. Destination</div>
            <h2 className="display-lg max-w-[14ch]">
              Where are you <span className="italic-serif">thinking?</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-[34ch]">
              A city, a region, a country. Anywhere. I'll work with whatever you give me.
            </p>

            <div className="mt-7">
              <div className="editorial-eyebrow text-muted-foreground mb-2">Where</div>
              <CityInput value={destination} onChange={setDestination} placeholder="Type a place. Anywhere in the world." />
              <div className="mt-1 text-[11px] text-muted-foreground">
                No list, no limits. Tell me where you're thinking and I'll meet you there.
              </div>
            </div>

            <div className="mt-8">
              <CuraWhisper variant="inline">
                Good. I won't try to talk you out of it. But I might suggest you go in a different month.
              </CuraWhisper>
            </div>
          </>
        )}

        {/* ---------- CONTEXT (full step 2  ·  short step 3) ---------- */}
        {(isFullContext || isShortContext) && (
          <>
            <div className="editorial-eyebrow text-muted-foreground mb-3">
              {isShort ? "iv." : "iii."} Context
            </div>
            <h2 className="display-lg max-w-[14ch]">
              The <span className="italic-serif">facts</span> of how you move.
            </h2>

            {/* Departure */}
            <div className="mt-7">
              <div className="editorial-eyebrow text-muted-foreground mb-2">Departure</div>
              <CityInput value={departure} onChange={setDeparture} placeholder="Where do you usually leave from?" />
              <div className="mt-1 text-[11px] text-muted-foreground">
                Anywhere in the world. Trains count. I use this for routes, not marketing.
              </div>
            </div>

            {/* Usually with — moved BEFORE passport so partner/friends/family branch can drive passport flow */}
            <div className="mt-7">
              <div className="editorial-eyebrow text-muted-foreground mb-2">Usually with</div>
              <div className="grid grid-cols-2 gap-1.5">
                {company.map((c) => {
                  const on = companyChoice === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCompanyChoice(c.id)}
                      className={cn(
                        "border px-3 py-3 text-left transition-colors",
                        on ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20 hover:border-foreground/50"
                      )}
                    >
                      <div className="font-serif text-[15px] leading-tight">{c.label}</div>
                      <div className={cn("text-[11px] mt-0.5", on ? "text-ink-foreground/70" : "text-muted-foreground")}>{c.note}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PASSPORT — required after company choice */}
            {companyChoice && (
              <div className="mt-7">
                <div className="editorial-eyebrow text-muted-foreground mb-2">Your passport</div>
                <SearchableSelect
                  options={passportNationalities}
                  value={passport}
                  onChange={setPassport}
                  placeholder="Search nationalities…"
                  label="Select your passport"
                />
              </div>
            )}

            {/* PARTNER BRANCH */}
            {companyChoice === "partner" && passport && (
              <div className="mt-7 border-l border-foreground/20 pl-4 space-y-6">
                <div>
                  <div className="editorial-eyebrow text-muted-foreground mb-2">Partner's passport</div>
                  <SearchableSelect
                    options={passportNationalities}
                    value={partnerPassport}
                    onChange={setPartnerPassport}
                    placeholder="Search nationalities…"
                    label="Select their passport"
                  />
                </div>

                {partnerPassport && (
                  <div>
                    <div className="editorial-eyebrow text-muted-foreground mb-2">Leaving from the same city?</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { v: true, label: "Yes" },
                        { v: false, label: "No" },
                      ].map((o) => {
                        const on = partnerSameDeparture === o.v;
                        return (
                          <button
                            key={String(o.v)}
                            onClick={() => setPartnerSameDeparture(o.v)}
                            className={cn(
                              "border px-3 py-2.5 text-sm transition-colors",
                              on ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20 hover:border-foreground/50"
                            )}
                          >
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {partnerSameDeparture === false && (
                  <div>
                    <div className="editorial-eyebrow text-muted-foreground mb-2">Where do they leave from?</div>
                    <CityInput value={partnerDeparture} onChange={setPartnerDeparture} placeholder="Their departure city" />
                  </div>
                )}

                {partnerSameDeparture !== null && (
                  <div>
                    <div className="editorial-eyebrow text-muted-foreground mb-2">Invite them to this trip</div>
                    <input
                      type="email"
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      placeholder="their@email.com"
                      className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-base py-2 placeholder:text-muted-foreground/60"
                    />
                    <div className="mt-1 text-[11px] text-muted-foreground">Optional. They'll get the workspace, not a marketing email.</div>
                  </div>
                )}
              </div>
            )}

            {/* FRIENDS BRANCH */}
            {companyChoice === "friends" && passport && (
              <div className="mt-7 border-l border-foreground/20 pl-4 space-y-6">
                <div>
                  <div className="editorial-eyebrow text-muted-foreground mb-2">How many friends?</div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setFriendsCount((n) => clamp(n - 1))}
                      className="border border-foreground/30 hover:border-foreground p-2"
                      aria-label="Fewer friends"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={friendsCount}
                      onChange={(e) => setFriendsCount(clamp(parseInt(e.target.value, 10)))}
                      className="flex-1 accent-foreground"
                    />
                    <button
                      onClick={() => setFriendsCount((n) => clamp(n + 1))}
                      className="border border-foreground/30 hover:border-foreground p-2"
                      aria-label="More friends"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                    <span className="font-serif text-2xl w-8 text-right">{friendsCount}</span>
                  </div>
                </div>

                {friendsData.map((f, i) => (
                  <div key={i} className="space-y-4 pb-5 border-b border-foreground/10 last:border-0">
                    <div className="editorial-eyebrow text-muted-foreground">Friend {i + 1}</div>
                    <div>
                      <div className="editorial-eyebrow text-muted-foreground mb-2">Friend {i + 1} passport</div>
                      <SearchableSelect
                        options={passportNationalities}
                        value={f.passport}
                        onChange={(v) => setFriendsData((prev) => prev.map((x, idx) => idx === i ? { ...x, passport: v } : x))}
                        placeholder="Search nationalities…"
                        label="Select their passport"
                      />
                    </div>
                    <div>
                      <div className="editorial-eyebrow text-muted-foreground mb-2">Leaving from the same city?</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { v: true, label: "Yes" },
                          { v: false, label: "No" },
                        ].map((o) => {
                          const on = f.sameDeparture === o.v;
                          return (
                            <button
                              key={String(o.v)}
                              onClick={() => setFriendsData((prev) => prev.map((x, idx) => idx === i ? { ...x, sameDeparture: o.v } : x))}
                              className={cn(
                                "border px-3 py-2.5 text-sm transition-colors",
                                on ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20 hover:border-foreground/50"
                              )}
                            >
                              {o.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {f.sameDeparture === false && (
                      <div>
                        <div className="editorial-eyebrow text-muted-foreground mb-2">Where do they leave from?</div>
                        <CityInput
                          value={f.departure ?? ""}
                          onChange={(v) => setFriendsData((prev) => prev.map((x, idx) => idx === i ? { ...x, departure: v } : x))}
                          placeholder="Their departure city"
                        />
                      </div>
                    )}
                    <div>
                      <div className="editorial-eyebrow text-muted-foreground mb-2">Invite them to this trip</div>
                      <input
                        type="email"
                        value={f.email ?? ""}
                        onChange={(e) => setFriendsData((prev) => prev.map((x, idx) => idx === i ? { ...x, email: e.target.value } : x))}
                        placeholder="their@email.com"
                        className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-base py-2 placeholder:text-muted-foreground/60"
                      />
                      <div className="mt-1 text-[11px] text-muted-foreground">Optional. They'll get the workspace, not a marketing email.</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FAMILY BRANCH */}
            {companyChoice === "family" && passport && (
              <div className="mt-7 border-l border-foreground/20 pl-4 space-y-6">
                <div>
                  <div className="editorial-eyebrow text-muted-foreground mb-2">Who's in the family?</div>
                  <div className="space-y-2">
                    {([
                      { key: "adults",   label: "Adults",    note: "18 and over" },
                      { key: "teens",    label: "Teenagers", note: "13 to 18" },
                      { key: "children", label: "Children",  note: "under 13" },
                    ] as const).map((g) => (
                      <div key={g.key} className="flex items-center justify-between border border-foreground/20 px-3 py-2.5">
                        <div>
                          <div className="font-serif text-sm">{g.label}</div>
                          <div className="text-[10px] text-muted-foreground">{g.note}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setFamily((f) => ({ ...f, [g.key]: Math.max(g.key === "adults" ? 1 : 0, f[g.key] - 1) }))}
                            className="border border-foreground/30 hover:border-foreground p-1.5"
                            aria-label={`Fewer ${g.label}`}
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                          <span className="font-serif text-lg w-6 text-center">{family[g.key]}</span>
                          <button
                            onClick={() => setFamily((f) => ({ ...f, [g.key]: Math.min(12, f[g.key] + 1) }))}
                            className="border border-foreground/30 hover:border-foreground p-1.5"
                            aria-label={`More ${g.label}`}
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* passport per family member - explicit Adult/Teen/Child numbering */}
                <div>
                  <div className="editorial-eyebrow text-muted-foreground mb-2">Passports</div>
                  <div className="space-y-3">
                    {familyPassports.map((p, i) => {
                      let role = "Adult";
                      let num = i + 1;
                      if (i >= family.adults && i < family.adults + family.teens) {
                        role = "Teenager";
                        num = i - family.adults + 1;
                      } else if (i >= family.adults + family.teens) {
                        role = "Child";
                        num = i - family.adults - family.teens + 1;
                      }
                      return (
                        <div key={i}>
                          <div className="editorial-eyebrow text-muted-foreground mb-2">{role} {num} passport</div>
                          <SearchableSelect
                            options={passportNationalities}
                            value={p}
                            onChange={(v) => setFamilyPassports((prev) => prev.map((x, idx) => idx === i ? v : x))}
                            placeholder="Search nationalities…"
                            label="Select passport"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="editorial-eyebrow text-muted-foreground mb-2">All leaving from the same city?</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { v: true,  label: "Yes" },
                      { v: false, label: "No, mixed" },
                    ].map((o) => {
                      const on = familySameDeparture === o.v;
                      return (
                        <button
                          key={String(o.v)}
                          onClick={() => setFamilySameDeparture(o.v)}
                          className={cn(
                            "border px-3 py-2.5 text-sm transition-colors",
                            on ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20 hover:border-foreground/50"
                          )}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                  {familySameDeparture === false && (
                    <div className="mt-4 space-y-3">
                      <div className="text-[11px] text-muted-foreground">
                        Tell me where each one leaves from. This shapes the itinerary later.
                      </div>
                      {Array.from({ length: family.adults + family.teens + family.children }).map((_, i) => {
                        let role = "Adult";
                        let num = i + 1;
                        if (i >= family.adults && i < family.adults + family.teens) {
                          role = "Teenager";
                          num = i - family.adults + 1;
                        } else if (i >= family.adults + family.teens) {
                          role = "Child";
                          num = i - family.adults - family.teens + 1;
                        }
                        return (
                          <div key={i}>
                            <div className="text-[11px] text-muted-foreground mb-1.5">{role} {num} departure</div>
                            <input
                              type="text"
                              placeholder="Their departure city"
                              className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-sm py-1.5 placeholder:text-muted-foreground/60"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {family.adults > 0 && (
                  <div>
                    <div className="editorial-eyebrow text-muted-foreground mb-2">Invite the adults to this trip</div>
                    <div className="space-y-2">
                      {familyEmails.map((em, i) => (
                        <input
                          key={i}
                          type="email"
                          value={em}
                          onChange={(e) => setFamilyEmails((prev) => prev.map((x, idx) => idx === i ? e.target.value : x))}
                          placeholder={`Adult ${i + 1} email (optional)`}
                          className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-sm py-1.5 placeholder:text-muted-foreground/60"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Spending mindset */}
            <div className="mt-7">
              <div className="editorial-eyebrow text-muted-foreground">Money, honestly</div>
              <div className="text-[11px] text-muted-foreground/80 italic mt-0.5 mb-2">how you spend, not how much</div>
              <ul className="space-y-1.5">
                {spending.map((s) => {
                  const on = spend === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => setSpend(s.id)}
                        className={cn(
                          "w-full flex items-center justify-between border px-4 py-3 text-left transition-colors",
                          on ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20 hover:border-foreground/50"
                        )}
                      >
                        <div>
                          <div className="font-serif text-[15px] leading-tight">{s.label}</div>
                          <div className={cn("text-[11px] mt-0.5", on ? "text-ink-foreground/70" : "text-muted-foreground")}>{s.note}</div>
                        </div>
                        {on && <Check className="h-4 w-4" strokeWidth={1.5} />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-7">
              <CuraWhisper variant="inline">
                {isShort
                  ? "I'll learn the rest from how you move. Dealbreakers come up when they need to."
                  : "I won't ask your budget. I'll watch how you spend on day two and adjust."}
              </CuraWhisper>
            </div>
          </>
        )}

        {/* ---------- STEP 3 — DEALBREAKERS (full only) ---------- */}
        {!isShort && step === 3 && (
          <>
            <div className="editorial-eyebrow text-muted-foreground mb-3">iv. Dealbreakers</div>
            <h2 className="display-lg max-w-[14ch]">
              What <span className="italic-serif">ruins</span> a trip for you?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              I'd rather know what to remove than what to add. Pick as many as ring true.
            </p>

            <div className="mt-7 flex flex-wrap gap-1.5">
              {dealbreakers.map((d, i) => {
                const on = breakers.has(d.id);
                return (
                  <button
                    key={d.id}
                    onClick={() => toggleBreaker(d.id)}
                    className={cn(
                      "px-3.5 border text-sm transition-colors",
                      i % 3 === 0 ? "py-3" : i % 3 === 1 ? "py-2" : "py-2.5",
                      on
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/25 text-foreground/75 hover:border-foreground/60"
                    )}
                  >
                    <span className={cn("font-serif", on ? "italic" : "")}>{d.label}</span>
                  </button>
                );
              })}
            </div>

            {/* "Other" free-text. Sits inline like one more chip. */}
            <div className="mt-4">
              <div className="editorial-eyebrow text-muted-foreground mb-2">Is there something I missed?</div>
              <input
                type="text"
                value={breakerOther}
                onChange={(e) => setBreakerOther(e.target.value)}
                placeholder="Tell me your specific dealbreaker"
                className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-base py-2 placeholder:text-muted-foreground/60"
              />
            </div>

            <div className="mt-10 ml-auto max-w-[24ch] text-right">
              <div className="editorial-eyebrow text-primary mb-2">Cura · note</div>
              <p className="italic-serif text-[16px] leading-snug text-foreground/85">
                "What you say no to defines the trip more than what you say yes to."
              </p>
            </div>
          </>
        )}

        {/* ---------- STEP 4 — CURA READS YOU (full only) ---------- */}
        {!isShort && step === 4 && (
          <>
            <div className="editorial-eyebrow text-primary mb-3">v. Reading</div>
            <h2 className="display-lg max-w-[16ch]">
              {reading.headline}
            </h2>
            <p className="mt-3 italic-serif text-xl text-foreground/85">
              {reading.sub}
            </p>

            <div className="mt-8 -ml-2 border-l-2 border-primary pl-4">
              <div className="editorial-eyebrow text-primary mb-1.5">A small challenge</div>
              <p className="font-serif text-[17px] leading-snug text-foreground/85">
                {reading.challenge}
              </p>
            </div>

            <div className="mt-8 bg-ink text-ink-foreground p-5 relative">
              <div className="absolute -top-3 left-4 px-2 bg-background text-foreground editorial-eyebrow">
                I started you in
              </div>
              <div className="font-serif text-4xl leading-none mt-2">{reading.pick}.</div>
              <div className="mt-3 text-[13px] text-ink-foreground/80 leading-relaxed">
                You would have picked {reading.wouldHavePicked}. You'd come back saying it was
                <span className="italic-serif"> "fine"</span>. {reading.pick} is not fine. {reading.pick} stays with you.
              </div>
              <div className="mt-4 editorial-eyebrow text-ink-foreground/60">
                Cura · would-bet
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground max-w-[34ch]">
              You can overrule me at any point. I'll learn faster when you do.
            </p>
          </>
        )}
      </section>

      <footer className="border-t border-foreground/15 p-5 flex items-center justify-between bg-background">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={cn("text-[11px] tracking-[0.18em] uppercase", step === 0 ? "opacity-30 pointer-events-none" : "text-muted-foreground hover:text-foreground")}
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={cn(
            "group flex items-center gap-3 border border-foreground bg-ink text-ink-foreground px-5 py-3 transition-opacity",
            !canContinue && "opacity-40 pointer-events-none"
          )}
        >
          <span className="text-sm tracking-wide">{finalLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </footer>
    </main>
  );
};

export default Onboarding;
