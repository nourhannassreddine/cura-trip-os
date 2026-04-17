import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { cn } from "@/lib/utils";

const moods = [
  { id: "slow", label: "Slow & sun-faded", note: "long lunches, no schedule" },
  { id: "design", label: "Design-forward", note: "neighborhoods, not landmarks" },
  { id: "wild", label: "A little wild", note: "say yes more often" },
  { id: "refined", label: "Refined & quiet", note: "fewer, better choices" },
  { id: "creative", label: "For making things", note: "shoot, write, walk" },
  { id: "social", label: "Loud, with people", note: "music, late dinners" },
];

const pacing = [
  { id: "auto", label: "Plan it for me", note: "I trust your taste" },
  { id: "planner", label: "Let me design it", note: "I want the controls" },
  { id: "mixed", label: "A bit of both", note: "structure + room to drift" },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [pace, setPace] = useState<string | null>(null);
  const nav = useNavigate();

  const toggle = (id: string) => {
    const next = new Set(picked);
    next.has(id) ? next.delete(id) : next.add(id);
    setPicked(next);
  };

  const stepCount = 3;

  return (
    <main className="app-shell flex flex-col">
      <TopBar
        eyebrow={`Step ${step + 1} of ${stepCount}`}
        title="Your travel taste"
        right={
          <Link to="/home" className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
            Skip
          </Link>
        }
      />

      <div className="px-5">
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: stepCount }).map((_, i) => (
            <div key={i} className={cn("h-px", i <= step ? "bg-primary" : "bg-foreground/20")} />
          ))}
        </div>
      </div>

      <section className="flex-1 px-6 pt-8 pb-6 cura-rise">
        {step === 0 && (
          <>
            <h2 className="display-lg max-w-[12ch]">
              How do you like to <span className="italic-serif">feel</span> on a trip?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Choose two or three.</p>

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
          </>
        )}

        {step === 1 && (
          <>
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

            <div className="mt-8">
              <CuraWhisper variant="inline">
                You can change this per trip. Some weeks you want to lead. Some weeks you don't.
              </CuraWhisper>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="editorial-eyebrow text-primary mb-3">Almost there</div>
            <h2 className="display-lg">
              Welcome <span className="italic-serif">in</span>.
            </h2>
            <p className="mt-4 text-[15px] text-foreground/70 max-w-[34ch]">
              I'll learn as we go. The more trips we plan together, the
              quieter and sharper I get.
            </p>

            <div className="mt-8 border border-foreground/20 p-5">
              <div className="editorial-eyebrow text-muted-foreground mb-2">Your starting profile</div>
              <div className="font-serif text-2xl leading-tight">Slow, design-forward.</div>
              <div className="text-sm text-muted-foreground mt-1">Mixed pacing · Aesthetic mode default</div>
            </div>

            <div className="mt-8">
              <CuraWhisper>
                I added a sample trip — Puglia in June. Open it and you'll see how I think.
              </CuraWhisper>
            </div>
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
          className="group flex items-center gap-3 border border-foreground bg-ink text-ink-foreground px-5 py-3"
        >
          <span className="text-sm tracking-wide">{step < stepCount - 1 ? "Continue" : "Enter CURA"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </footer>
    </main>
  );
};

export default Onboarding;
