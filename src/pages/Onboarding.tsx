import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { cn } from "@/lib/utils";
import { saveProfile, type CuraPath } from "@/lib/profile";

/* ----------------------------------------------------------
   CURA Onboarding — calibration, not a quiz.
   Path-aware:
     full  → 5 steps (Feel · Decide · Context+Departure · Dealbreakers · Reading)
     short → 3 steps (Feel · Decide · Context condensed) → /trip/new
---------------------------------------------------------- */

const moods = [
  { id: "slow",        label: "Slow & sun-faded",            note: "long lunches, no schedule",       react: "Noted. We'll guard your mornings." },
  { id: "design",      label: "Design-forward",              note: "neighborhoods, not landmarks",    react: "Good. Landmarks are mostly other people's photos." },
  { id: "wild",        label: "A little wild",               note: "say yes more often",              react: "I'll leave more room for accidents." },
  { id: "refined",     label: "Refined & quiet",             note: "fewer, better choices",           react: "Then I'll cut three things from every day." },
  { id: "creative",    label: "For making things",           note: "shoot, write, walk",              react: "I'll plan around light, not opening hours." },
  { id: "social",      label: "Loud, with people",           note: "music, late dinners",             react: "Dinners after 9, then. No museums at 9am." },
  { id: "solo",        label: "Alone, on purpose",           note: "I came here to think",            react: "Then I'll plan tables for one without flinching." },
  { id: "luxury",      label: "Quiet luxury, no logos",      note: "soft sheets, hard to find",       react: "Understood. The good places don't have signs." },
  { id: "spontaneous", label: "Plans are suggestions",       note: "I want room to drift",            react: "I'll pencil things, not ink them." },
  { id: "structured",  label: "A clean schedule is a kindness", note: "I rest better with a plan",  react: "Then I'll book everything before you ask." },
];

const pacing = [
  { id: "auto",    label: "Plan it for me",      note: "I trust your taste",        react: "Then I'll be opinionated. You can overrule me." },
  { id: "mixed",   label: "A bit of both",       note: "I suggest, you confirm",    react: "Most travelers say this. The good ones mean it." },
  { id: "planner", label: "Let me design it",    note: "I want the controls",       react: "Fine. I'll provide structure, not decisions." },
];

const passports = ["Italian", "American", "British", "French", "German", "Brazilian", "Indian", "Nigerian", "Other"];

const departureCities = [
  "Lagos", "New York", "London", "Lisbon", "Dubai", "Mumbai", "São Paulo",
  "Paris", "Berlin", "Rome", "Milan", "Madrid", "Barcelona", "Amsterdam",
  "Istanbul", "Cairo", "Nairobi", "Cape Town", "Singapore", "Hong Kong",
  "Tokyo", "Seoul", "Sydney", "Toronto", "Mexico City",
];

const company = [
  { id: "solo",    label: "Alone",          note: "I move at my own speed" },
  { id: "partner", label: "With a partner", note: "two people, one tempo" },
  { id: "friends", label: "With friends",   note: "loud table, group chat" },
  { id: "family",  label: "With family",    note: "ages, naps, logistics" },
];

const spending = [
  { id: "luxury-first",  label: "Luxury-first",   note: "I start at the top and work down" },
  { id: "balanced",      label: "Balanced",       note: "I spend where it shows" },
  { id: "budget-aware",  label: "Budget-aware",   note: "I want range, not stretch" },
  { id: "impulsive",     label: "Impulsive",      note: "I decide at the table" },
];

const dealbreakers = [
  { id: "crowds",        label: "Crowds & queues" },
  { id: "early",         label: "Early starts" },
  { id: "transit",       label: "Long transfers" },
  { id: "tourist",       label: "Tourist traps" },
  { id: "noise",         label: "Hotel noise" },
  { id: "rushing",       label: "Rushing" },
  { id: "bad-coffee",    label: "Bad coffee" },
  { id: "fees",          label: "Hidden fees" },
  { id: "chains",        label: "Chain restaurants" },
  { id: "overplanned",   label: "Over-planned days" },
  { id: "dead-night",    label: "Dead nightlife" },
  { id: "wifi",          label: "Slow wifi" },
];

const Onboarding = () => {
  const [params] = useSearchParams();
  const path: CuraPath = params.get("path") === "short" ? "short" : "full";
  const isShort = path === "short";

  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [pace, setPace] = useState<string | null>(null);
  const [passport, setPassport] = useState<string>("Italian");
  const [departure, setDeparture] = useState<string>("");
  const [companyChoice, setCompanyChoice] = useState<string | null>(null);
  const [spend, setSpend] = useState<string | null>(null);
  const [breakers, setBreakers] = useState<Set<string>>(new Set());
  const [lastMood, setLastMood] = useState<string | null>(null);

  const nav = useNavigate();
  const stepCount = isShort ? 3 : 5;

  // reset step if path changes mid-flow
  useEffect(() => { setStep(0); }, [path]);

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
    const isSlow = m.has("slow") || m.has("refined") || m.has("luxury");
    const isDesign = m.has("design") || m.has("creative");
    const isWild = m.has("wild") || m.has("social") || m.has("spontaneous");

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

  const isContextStep = step === 2;
  const contextValid = isShort
    ? departure.trim().length >= 2 && companyChoice !== null && spend !== null
    : departure.trim().length >= 2 && companyChoice !== null && spend !== null;

  const canContinue =
    (step === 0 && picked.size >= 1) ||
    (step === 1 && pace !== null) ||
    (isContextStep && contextValid) ||
    (!isShort && step === 3) ||
    (!isShort && step === 4);

  const persist = () => {
    saveProfile({
      path,
      moods: Array.from(picked),
      pace,
      departure: departure.trim() || null,
      passport: isShort ? null : passport,
      company: companyChoice,
      spend,
      dealbreakers: isShort ? [] : Array.from(breakers),
    });
  };

  const handleContinue = () => {
    if (step < stepCount - 1) {
      // persist progressively at every step
      persist();
      setStep(step + 1);
      return;
    }
    // final step
    persist();
    if (isShort) {
      nav("/trip/new");
    } else {
      nav("/home");
    }
  };

  const finalLabel = isShort
    ? "Build my trip"
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
        <div className={cn("grid gap-1.5", isShort ? "grid-cols-3" : "grid-cols-5")}>
          {Array.from({ length: stepCount }).map((_, i) => (
            <div key={i} className={cn("h-px", i <= step ? "bg-primary" : "bg-foreground/20")} />
          ))}
        </div>
      </div>

      <section className="flex-1 px-6 pt-8 pb-6 cura-rise">
        {/* ---------- STEP 0 — FEEL ---------- */}
        {step === 0 && (
          <>
            <div className="editorial-eyebrow text-muted-foreground mb-3">i. Feel</div>
            <h2 className="display-lg max-w-[12ch]">
              How do you like to <span className="italic-serif">feel</span> on a trip?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Pick two or three. Don't overthink it — I'm watching the pattern, not the labels.</p>

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

        {/* ---------- STEP 2 — CONTEXT ---------- */}
        {step === 2 && (
          <>
            <div className="editorial-eyebrow text-muted-foreground mb-3">iii. Context</div>
            <h2 className="display-lg max-w-[14ch]">
              The <span className="italic-serif">facts</span> of how you move.
            </h2>

            {/* Departure — required, datalist-backed free text */}
            <div className="mt-7">
              <div className="editorial-eyebrow text-muted-foreground mb-2">Departure</div>
              <label className="block">
                <span className="sr-only">Where do you usually leave from?</span>
                <input
                  type="text"
                  list="cura-cities"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  placeholder="Where do you usually leave from?"
                  className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-lg py-2 placeholder:text-muted-foreground/60"
                />
                <datalist id="cura-cities">
                  {departureCities.map((c) => <option key={c} value={c} />)}
                </datalist>
              </label>
              <div className="mt-1 text-[11px] text-muted-foreground">
                Anywhere in the world. I use this for routes, not marketing.
              </div>
            </div>

            {/* Passport — only on full path */}
            {!isShort && (
              <div className="mt-7">
                <div className="editorial-eyebrow text-muted-foreground mb-2">Passport</div>
                <div className="flex flex-wrap gap-1.5">
                  {passports.map((p) => {
                    const on = passport === p;
                    return (
                      <button
                        key={p}
                        onClick={() => setPassport(p)}
                        className={cn(
                          "px-3 py-1.5 border text-xs tracking-wide transition-colors",
                          on ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/25 text-foreground/70 hover:border-foreground/60"
                        )}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Who you travel with */}
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

            {/* Spending mindset */}
            <div className="mt-7">
              <div className="editorial-eyebrow text-muted-foreground mb-2">Money, honestly</div>
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
              I'd rather know what to remove than what to add.
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

            <div className="mt-10 ml-auto max-w-[22ch] text-right">
              <div className="editorial-eyebrow text-primary mb-2">Cura · note</div>
              <p className="italic-serif text-[17px] leading-snug text-foreground/85">
                "What you say no to <br/>defines the trip more than what you say yes to."
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
                <span className="italic-serif"> "fine"</span>. {reading.pick} is not fine.
                {reading.pick} stays with you.
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
