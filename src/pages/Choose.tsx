import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus, X } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";
import { SearchableSelect } from "@/components/cura/SearchableSelect";
import { passportNationalities } from "@/data/locations";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Choose — three-question flow for users deciding between places.
   Q1: up to 3 destinations · Q2: passport · Q3: departure city.
   Persists { destinations, passport, from } as `cura.choose`.
------------------------------------------------------------------ */

type Step = 1 | 2 | 3;

const numerals: Record<Step, string> = { 1: "i / iii", 2: "ii / iii", 3: "iii / iii" };
const rowNumerals = ["i.", "ii.", "iii."];
const placeholders = ["e.g. Lisbon", "or Marrakech", "…and one more"];

const passportOptions = passportNationalities.filter((p) => p !== "Israeli");

const Choose = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  const [destinations, setDestinations] = useState<string[]>(["", ""]);
  const [passport, setPassport] = useState("");
  const [from, setFrom] = useState("");

  const trimmedDestinations = destinations.map((d) => d.trim()).filter(Boolean);
  const q1Valid = trimmedDestinations.length > 0;
  const q2Valid = passport.trim().length > 0;
  const q3Valid = from.trim().length > 0;

  const updateDestination = (idx: number, value: string) => {
    setDestinations((prev) => prev.map((d, i) => (i === idx ? value : d)));
  };
  const removeDestination = (idx: number) => {
    setDestinations((prev) => prev.filter((_, i) => i !== idx));
  };
  const addDestination = () => {
    if (destinations.length < 3) setDestinations((prev) => [...prev, ""]);
  };

  const goBack = () => {
    if (step === 1) navigate("/begin");
    else setStep((s) => (s - 1) as Step);
  };

  const goNext = () => {
    if (step === 1 && q1Valid) setStep(2);
    else if (step === 2 && q2Valid) setStep(3);
    else if (step === 3 && q3Valid) {
      try {
        localStorage.setItem(
          "cura.choose",
          JSON.stringify({
            destinations: trimmedDestinations,
            passport: passport.trim(),
            from: from.trim(),
          }),
        );
      } catch {
        /* noop */
      }
      navigate("/compare?seed=auto");
    }
  };

  const canContinue = step === 1 ? q1Valid : step === 2 ? q2Valid : q3Valid;
  const continueLabel = step === 3 ? "Lay them on the table" : "Continue";

  const inputClass =
    "cura-input w-full bg-transparent px-3 py-2.5 text-[16px] font-serif placeholder:font-serif placeholder:italic placeholder:text-foreground/40 focus:outline-none";
  const inputStyle: React.CSSProperties = {
    border: "0.5px solid rgba(26,26,24,0.20)",
    borderRadius: "12px",
  };

  return (
    <main className="app-shell flex flex-col bg-background">
      <TopBar
        back={step === 1 ? "/begin" : undefined}
        eyebrow={`MOVEMENT ${step} · OF 3`}
        title={
          step === 1
            ? "Compare · Places"
            : step === 2
              ? "Compare · Passports"
              : "Compare · Departure"
        }
      />

      {/* Back is rendered in the footer to match the calibration flow */}

      <section className="px-5 pt-5 pb-7 cura-rise">
        <div className="flex items-start justify-between gap-4">
          <div className="editorial-eyebrow text-muted-foreground">
            A few quick questions
          </div>
          <div className="editorial-eyebrow text-muted-foreground">
            {numerals[step]}
          </div>
        </div>

        {step === 1 && (
          <h1 className="display-md max-w-[18ch] mt-3">
            Where are you{" "}
            <span className="italic-serif">choosing</span> between?
          </h1>
        )}
        {step === 2 && (
          <h1 className="display-md max-w-[18ch] mt-3">
            Which passport do you{" "}
            <span className="italic-serif">travel with?</span>
          </h1>
        )}
        {step === 3 && (
          <h1 className="display-md max-w-[18ch] mt-3">
            Where will you be <span className="italic-serif">flying from?</span>
          </h1>
        )}
      </section>

      <div className="px-5 flex flex-col gap-7">
        {step === 1 && (
          <div className="flex flex-col gap-5">
            {destinations.map((value, idx) => (
              <div key={idx} className="flex items-end gap-3">
                <span className="font-serif italic text-muted-foreground text-[15px] pb-2 w-7 shrink-0">
                  {rowNumerals[idx]}
                </span>
                <input
                  autoFocus={idx === 0}
                  value={value}
                  onChange={(e) => updateDestination(idx, e.target.value)}
                  placeholder={placeholders[idx]}
                  className={inputClass}
                />
                {destinations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDestination(idx)}
                    aria-label="Remove"
                    className="pb-2 text-foreground/40 hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            ))}
            {destinations.length < 3 && (
              <button
                type="button"
                onClick={addDestination}
                className="self-start flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>Add another place</span>
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <SearchableSelect
            options={passportOptions}
            value={passport || null}
            onChange={setPassport}
            placeholder="Search passports…"
            label="Choose your passport"
          />
        )}

        {step === 3 && (
          <label className="block">
            <span className="editorial-eyebrow text-muted-foreground">
              Departure city
            </span>
            <input
              autoFocus
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="e.g. Toronto, Cairo, Berlin"
              className={`mt-2 ${inputClass}`}
            />
          </label>
        )}
      </div>

      <footer className="mt-auto border-t border-foreground/15 p-5 flex items-center justify-between bg-background">
        <button
          onClick={goBack}
          className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
        >
          Back
        </button>
        <button
          onClick={goNext}
          disabled={!canContinue}
          className={cn(
            "group flex items-center gap-3 border border-foreground bg-ink text-ink-foreground px-5 py-3 transition-opacity",
            !canContinue && "opacity-40 pointer-events-none"
          )}
        >
          <span className="text-sm tracking-wide">{continueLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </footer>
    </main>
  );
};

export default Choose;
