import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------
   CURA Onboarding — calibration, not a quiz.
   Five movements: Feel · Decide · Context · Dealbreakers · Reading
---------------------------------------------------------- */

const moods = [
  { id: "slow",     label: "Slow & sun-faded",     note: "long lunches, no schedule",       react: "Noted. We'll guard your mornings." },
  { id: "design",   label: "Design-forward",       note: "neighborhoods, not landmarks",    react: "Good. Landmarks are mostly other people's photos." },
  { id: "wild",     label: "A little wild",        note: "say yes more often",              react: "I'll leave more room for accidents." },
  { id: "refined",  label: "Refined & quiet",      note: "fewer, better choices",           react: "Then I'll cut three things from every day." },
  { id: "creative", label: "For making things",    note: "shoot, write, walk",              react: "I'll plan around light, not opening hours." },
  { id: "social",   label: "Loud, with people",    note: "music, late dinners",             react: "Dinners after 9, then. No museums at 9am." },
];

const pacing = [
  { id: "auto",    label: "Plan it for me",      note: "I trust your taste",       react: "Then I'll be opinionated. You can overrule me." },
  { id: "planner", label: "Let me design it",    note: "I want the controls",      react: "Fine. I'll stay out of the way until you ask." },
  { id: "mixed",   label: "A bit of both",       note: "structure + room to drift", react: "Most travelers say this. The good ones mean it." },
];

const passports = ["Italian", "American", "British", "French", "German", "Brazilian", "Indian", "Nigerian", "Other"];

const company = [
  { id: "solo",    label: "Alone",          note: "I move at my own speed" },
  { id: "partner", label: "With a partner", note: "two people, one tempo" },
  { id: "friends", label: "With friends",   note: "loud table, group chat" },
  { id: "family",  label: "With family",    note: "ages, naps, logistics" },
];

const spending = [
  { id: "considered", label: "Considered",  note: "I spend on what matters, skip the rest" },
  { id: "splurger",   label: "Splurger",    note: "I'll overpay for the right moment" },
  { id: "stretcher",  label: "Stretcher",   note: "I want the trip to last longer" },
  { id: "unbothered", label: "Unbothered",  note: "I don't track. It works out." },
];

const dealbreakers = [
  { id: "crowds",    label: "Crowds & queues" },
  { id: "early",     label: "Early starts" },
  { id: "transit",   label: "Long transit days" },
  { id: "tourist",   label: "Tourist menus" },
  { id: "noise",     label: "Hotel noise" },
  { id: "rushing",   label: "Rushing between things" },
  { id: "kitsch",    label: "Kitsch & costume" },
  { id: "chains",    label: "Chains & franchises" },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [pace, setPace] = useState<string | null>(null);
  const [passport, setPassport] = useState<string>("Italian");
  const [companyChoice, setCompanyChoice] = useState<string | null>(null);
  const [spend, setSpend] = useState<string | null>(null);
  const [breakers, setBreakers] = useState<Set<string>>(new Set());
  const [lastMood, setLastMood] = useState<string | null>(null);

  const nav = useNavigate();
  const stepCount = 5;

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

  /* ----- CURA's reading of the user (step 5) ----- */
  const reading = useMemo(() => {
    const moodSet = picked;
    const isSlow = moodSet.has("slow") || moodSet.has("refined");
    const isDesign = moodSet.has("design") || moodSet.has("creative");
    const isWild = moodSet.has("wild") || moodSet.has("social");

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

  const canContinue =
    (step === 0 && picked.size >= 1) ||
    (step === 1 && pace !== null) ||
    (step === 2 && companyChoice !== null && spend !== null) ||
    (step === 3) ||
    step === 4;

  return (
    <main className="app-shell flex flex-col">
      <TopBar
        eyebrow={`Movement ${step + 1} of ${stepCount}`}
        title="Calibration"
        right={
          <Link to="/home" className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
            Skip
          </Link>
        }
      />

      <div className="px-5">
        <div className="grid grid-cols-5 gap-1.5">
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

            {/* Passport — editorial chip row, not a form */}
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

            {/* Spending mindset — not a number */}
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
                I won't ask your budget. I'll watch how you spend on day two and adjust.
              </CuraWhisper>
            </div>
          </>
        )}

        {/* ---------- STEP 3 — DEALBREAKERS ---------- */}
        {step === 3 && (
          <>
            <div className="editorial-eyebrow text-muted-foreground mb-3">iv. Dealbreakers</div>
            <h2 className="display-lg max-w-[14ch]">
              What <span className="italic-serif">ruins</span> a trip for you?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              I'd rather know what to remove than what to add.
            </p>

            {/* Asymmetric tag cloud — staggered, varying widths */}
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

            {/* unexpected element — pulled-quote */}
            <div className="mt-10 ml-auto max-w-[22ch] text-right">
              <div className="editorial-eyebrow text-primary mb-2">Cura · note</div>
              <p className="italic-serif text-[17px] leading-snug text-foreground/85">
                "What you say no to <br/>defines the trip more than what you say yes to."
              </p>
            </div>
          </>
        )}

        {/* ---------- STEP 4 — CURA READS YOU ---------- */}
        {step === 4 && (
          <>
            <div className="editorial-eyebrow text-primary mb-3">v. Reading</div>
            <h2 className="display-lg max-w-[16ch]">
              {reading.headline}
            </h2>
            <p className="mt-3 italic-serif text-xl text-foreground/85">
              {reading.sub}
            </p>

            {/* the challenge — bold and slightly off */}
            <div className="mt-8 -ml-2 border-l-2 border-primary pl-4">
              <div className="editorial-eyebrow text-primary mb-1.5">A small challenge</div>
              <p className="font-serif text-[17px] leading-snug text-foreground/85">
                {reading.challenge}
              </p>
            </div>

            {/* the opinionated starter trip */}
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
          onClick={() => (step < stepCount - 1 ? setStep(step + 1) : nav("/home"))}
          disabled={!canContinue}
          className={cn(
            "group flex items-center gap-3 border border-foreground bg-ink text-ink-foreground px-5 py-3 transition-opacity",
            !canContinue && "opacity-40 pointer-events-none"
          )}
        >
          <span className="text-sm tracking-wide">
            {step < stepCount - 1 ? "Continue" : "Take me to Puglia"}
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </footer>
    </main>
  );
};

export default Onboarding;
