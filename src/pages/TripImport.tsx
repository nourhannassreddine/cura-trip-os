import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, FileText, Mail, Plane } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { cn } from "@/lib/utils";
import { saveProfile } from "@/lib/profile";

/* ------------------------------------------------------------------
   TripImport — "I already have a trip."
   For users coming through EntryGate path iv. They paste/forward
   what they have (a confirmation email, dates + city, or a PDF).
   CURA opens a workspace from whatever they bring.
------------------------------------------------------------------ */

const TripImport = () => {
  const nav = useNavigate();
  const [mode, setMode] = useState<"paste" | "manual" | "forward">("paste");
  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const submit = () => {
    saveProfile({ path: "full" }); // mark engagement
    nav("/trip/puglia-25");
  };

  const canSubmit =
    (mode === "paste" && text.trim().length > 12) ||
    (mode === "manual" && city.trim().length > 1 && from && to) ||
    mode === "forward";

  return (
    <main className="app-shell flex flex-col bg-background">
      <TopBar back="/begin" eyebrow="Path iv" title="Bring me your trip" />

      <section className="px-5 pt-5 pb-6 cura-rise">
        <div className="editorial-eyebrow text-muted-foreground mb-3">Plate III</div>
        <h1 className="display-lg max-w-[14ch]">
          Drop it in. I'll <span className="italic-serif">organize</span> the rest.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-[34ch]">
          A confirmation email, a few dates, or a PDF. Whatever you have. I'll turn it into a trip.
        </p>
      </section>

      {/* mode tabs — share the same px-5 gutter */}
      <div className="px-5">
        <div className="grid grid-cols-3 border border-foreground/20">
          {([
            { id: "paste",   label: "Paste",    icon: FileText },
            { id: "manual",  label: "Type",     icon: Plane },
            { id: "forward", label: "Forward",  icon: Mail },
          ] as const).map((t) => {
            const Icon = t.icon;
            const on = mode === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setMode(t.id)}
                className={cn(
                  "flex items-center justify-center gap-2 px-3 py-2.5 text-xs tracking-wide transition-colors",
                  on ? "bg-ink text-ink-foreground" : "hover:bg-foreground/[0.04]"
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="flex-1 px-5 pt-6">
        {mode === "paste" && (
          <div>
            <div className="editorial-eyebrow text-muted-foreground mb-2">Paste anything</div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={9}
              placeholder="Flight confirmation, hotel booking, a friend's recommendation list — paste it raw. I'll parse what matters."
              className="w-full bg-transparent border border-foreground/25 focus:border-foreground outline-none p-3 text-sm font-sans placeholder:text-muted-foreground/70"
            />
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-5">
            <div>
              <div className="editorial-eyebrow text-muted-foreground mb-2">Where</div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City or country"
                className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-lg py-2 placeholder:text-muted-foreground/60"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="editorial-eyebrow text-muted-foreground mb-2">From</div>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-base py-2"
                />
              </div>
              <div>
                <div className="editorial-eyebrow text-muted-foreground mb-2">To</div>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-base py-2"
                />
              </div>
            </div>
          </div>
        )}

        {mode === "forward" && (
          <div className="border border-dashed border-foreground/30 p-5">
            <div className="editorial-eyebrow text-muted-foreground mb-2">Forwarding address</div>
            <div className="font-serif text-xl">trip@cura.travel</div>
            <p className="text-xs text-muted-foreground mt-2 max-w-[34ch]">
              Forward any booking email — flight, hotel, train, restaurant. I read them and stitch the trip together. You'll get a notification.
            </p>
          </div>
        )}

        <div className="mt-7">
          <CuraWhisper variant="inline">
            I don't need a perfect brief. I need a starting point. I'll ask the rest in context.
          </CuraWhisper>
        </div>
      </section>

      <footer className="border-t border-foreground/15 p-5 flex items-center justify-between bg-background">
        <Link to="/begin" className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
          Back
        </Link>
        <button
          onClick={submit}
          disabled={!canSubmit}
          className={cn(
            "group flex items-center gap-3 border border-foreground bg-ink text-ink-foreground px-5 py-3 transition-opacity",
            !canSubmit && "opacity-40 pointer-events-none"
          )}
        >
          <span className="text-sm tracking-wide">Open my workspace</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </footer>
    </main>
  );
};

export default TripImport;
