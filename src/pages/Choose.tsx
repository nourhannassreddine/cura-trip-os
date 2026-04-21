import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";

/* ------------------------------------------------------------------
   Choose — three-question flow for users deciding between places.
   Q1: up to 3 destinations · Q2: passport · Q3: departure city.
   Persists { destinations, passport, from } as `cura.choose`.
------------------------------------------------------------------ */

type Step = 1 | 2 | 3;

const titles: Record<Step, string> = {
  1: "One of three",
  2: "Two of three",
  3: "Three of three",
};

const numerals: Record<Step, string> = { 1: "i / iii", 2: "ii / iii", 3: "iii / iii" };

const Choose = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [d3, setD3] = useState("");
  const [passport, setPassport] = useState("");
  const [from, setFrom] = useState("");

  const q1Valid = d1.trim().length > 0;
  const q2Valid = passport.trim().length > 0;
  const q3Valid = from.trim().length > 0;

  const goBack = () => {
    if (step === 1) navigate("/begin");
    else setStep((s) => (s - 1) as Step);
  };

  const goNext = () => {
    if (step === 1 && q1Valid) setStep(2);
    else if (step === 2 && q2Valid) setStep(3);
    else if (step === 3 && q3Valid) {
      const destinations = [d1, d2, d3].map((s) => s.trim()).filter(Boolean);
      try {
        localStorage.setItem(
          "cura.choose",
          JSON.stringify({
            destinations,
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
  const continueLabel = step === 3 ? "See them side by side" : "Continue";

  const inputClass =
    "mt-2 w-full bg-transparent border-0 border-b border-foreground/30 focus:border-foreground rounded-none px-0 py-2 text-[16px] font-serif placeholder:font-serif placeholder:italic placeholder:text-foreground/40 focus:outline-none";

  return (
    <main className="app-shell flex flex-col bg-background">
      <TopBar
        back={step === 1 ? "/begin" : undefined}
        eyebrow="Plate II · Choose"
        title={titles[step]}
      />

      {step !== 1 && (
        <button
          onClick={goBack}
          aria-label="Back"
          className="px-5 -mt-1 mb-1 flex items-center gap-1 text-foreground/70 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          <span className="text-[12px]">Back</span>
        </button>
      )}

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
            Which <span className="italic-serif">passport</span> are you
            traveling on?
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
          <>
            <label className="block">
              <span className="editorial-eyebrow text-muted-foreground">First</span>
              <input
                autoFocus
                value={d1}
                onChange={(e) => setD1(e.target.value)}
                placeholder="e.g. Lisbon"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="editorial-eyebrow text-muted-foreground">Second</span>
              <input
                value={d2}
                onChange={(e) => setD2(e.target.value)}
                placeholder="e.g. Marrakech"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="editorial-eyebrow text-muted-foreground">
                Third (optional)
              </span>
              <input
                value={d3}
                onChange={(e) => setD3(e.target.value)}
                placeholder="one more, if you have it"
                className={inputClass}
              />
            </label>
          </>
        )}

        {step === 2 && (
          <label className="block">
            <span className="editorial-eyebrow text-muted-foreground">
              Passport nationality
            </span>
            <input
              autoFocus
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
              placeholder="e.g. Canadian, Egyptian, German"
              className={inputClass}
            />
          </label>
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
              className={inputClass}
            />
          </label>
        )}
      </div>

      <div className="px-5 pt-7 pb-5 mt-auto">
        <button
          onClick={goNext}
          disabled={!canContinue}
          className={`group w-full flex items-center justify-between border border-foreground bg-ink text-ink-foreground px-5 py-3.5 transition-opacity ${
            canContinue ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <span className="font-sans text-sm tracking-wide">{continueLabel}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </main>
  );
};

export default Choose;
