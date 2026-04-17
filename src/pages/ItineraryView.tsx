import { useState } from "react";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { TripTabs } from "@/components/cura/TripTabs";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { MapCanvas } from "@/components/cura/MapCanvas";
import { itinerary } from "@/data/cura";
import { CloudRain, Battery, Wallet, Sparkles, Shuffle, Sun, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const replanTriggers = [
  { id: "rain", icon: CloudRain, label: "It's raining" },
  { id: "tired", icon: Battery, label: "We're tired" },
  { id: "spend", icon: Wallet, label: "Overspent" },
  { id: "fun", icon: Sparkles, label: "More fun" },
  { id: "swap", icon: Shuffle, label: "Swap day" },
  { id: "sun", icon: Sun, label: "Sun day" },
];

interface Diff {
  rationale: string;
  changes: { from: string; to: string; why: string }[];
}

const triggerDiffs: Record<string, Diff> = {
  rain: {
    rationale: "Same vibe, indoors. I kept the lunch you'd already chosen, only swapped what gets wet.",
    changes: [
      { from: "Polignano swim cove", to: "Faggiano museum", why: "covered, 8 min walk from your lunch" },
      { from: "Sunset terrace", to: "Wine bar courtyard", why: "still golden hour, no wind" },
    ],
  },
  tired: {
    rationale: "I cut everything that asks more than 'show up'. Day stays beautiful, costs nothing.",
    changes: [
      { from: "Olive grove tasting", to: "removed", why: "you said this was the dispensable one" },
      { from: "Restaurant dinner", to: "Masseria kitchen, candles", why: "no driving, no dressing up" },
    ],
  },
  spend: {
    rationale: "I touched only tomorrow. Today is already done — no point pretending.",
    changes: [
      { from: "Grotta Palazzese lunch · €110", to: "Trattoria Amatulli · €35", why: "same neighborhood, food I trust more" },
    ],
  },
  fun: {
    rationale: "Added one thing, kept the rest. I don't believe in fixing a day that wasn't broken.",
    changes: [
      { from: "free afternoon", to: "Sunset boat in Polignano", why: "you've saved 2 boat trips this year, never booked" },
    ],
  },
  swap: {
    rationale: "Day 2 ⇄ Day 3. Reservations moved automatically. No conflicts.",
    changes: [
      { from: "Day 2 — Coast & olives", to: "Day 3 slot", why: "weather is better Saturday" },
      { from: "Day 3 — Alberobello", to: "Day 2 slot", why: "tour group avoidance — Friday is quieter" },
    ],
  },
  sun: {
    rationale: "Outdoors first while it's bearable, indoors at 14:00 when the heat peaks.",
    changes: [
      { from: "Olive grove · 16:00", to: "Olive grove · 09:30", why: "shade & cool air" },
      { from: "Lunch · 13:30", to: "Late lunch · 14:30", why: "peak heat under stone vaults" },
    ],
  },
};

const ItineraryView = () => {
  const [day, setDay] = useState(0);
  const [trigger, setTrigger] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const current = itinerary[day];
  const diff = trigger ? triggerDiffs[trigger] : null;

  const mapPoints = current.blocks
    .filter((b) => b.x !== undefined && b.y !== undefined)
    .map((b, i) => ({
      id: b.title,
      x: b.x!,
      y: b.y!,
      number: i + 1,
      label: b.place ?? b.title,
      variant: (b.type === "eat" ? "primary" : b.type === "moment" ? "olive" : b.type === "rest" ? "sky" : "ink") as "primary" | "olive" | "sky" | "ink",
    }));

  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Itinerary" title="Puglia · 10 days" />
      <TripTabs tripId="puglia-25" />

      {/* Day strip */}
      <section className="px-5 pt-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-2">
          {itinerary.map((d, i) => (
            <button
              key={i}
              onClick={() => setDay(i)}
              className={cn(
                "shrink-0 px-3 py-2 border text-left min-w-[110px]",
                i === day ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20 hover:border-foreground/50"
              )}
            >
              <div className={cn("editorial-eyebrow", i === day ? "opacity-70" : "text-muted-foreground")}>{d.date.split(" · ")[0]}</div>
              <div className="font-serif text-base leading-none mt-0.5">{`Day ${String(i + 1).padStart(2, "0")}`}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Day header */}
      <section className="px-5 mt-4 cura-rise">
        <div className="flex items-end justify-between">
          <div>
            <div className="editorial-eyebrow text-muted-foreground">{current.date}</div>
            <h2 className="display-md max-w-[14ch] mt-1">{current.dayLabel}</h2>
          </div>
          <div className="text-right">
            <div className="font-serif text-2xl leading-none">{current.weather.temp}</div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">{current.weather.condition}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Tag variant={current.energy === "high" ? "default" : current.energy === "med" ? "olive" : "sky"}>
            {current.energy} energy
          </Tag>
          <Tag variant="outline">{current.blocks.length} stops</Tag>
          <button
            onClick={() => setShowMap((s) => !s)}
            className="ml-auto text-[10px] tracking-[0.18em] uppercase text-primary"
          >
            {showMap ? "Timeline" : "Map view"}
          </button>
        </div>
      </section>

      {/* Design intent — the new editorial intelligence layer */}
      <section className="px-5 mt-6">
        <div className="border-l-2 border-foreground pl-4">
          <div className="editorial-eyebrow text-muted-foreground">Design intent</div>
          <p className="font-serif text-[17px] leading-snug mt-1.5">{current.intent}</p>
        </div>
      </section>

      {/* Don't-miss moment */}
      <section className="px-5 mt-5">
        <div className="bg-paper-deep p-4 border-l-4 border-primary">
          <div className="editorial-eyebrow text-primary mb-1">Don't miss</div>
          <p className="font-serif text-[18px] leading-snug italic-serif">"{current.moment}"</p>
        </div>
      </section>

      {/* CURA rationale — opinionated */}
      <section className="px-5 mt-5">
        <CuraWhisper variant="opinion" certainty="sure">
          {current.rationale}
        </CuraWhisper>
      </section>

      {/* Map view (toggleable) */}
      {showMap && (
        <section className="px-5 mt-6 cura-rise">
          <MapCanvas points={mapPoints} caption={`Day ${day + 1} · ${current.blocks.length} stops`} height={280} />
          <div className="mt-2 text-[11px] text-muted-foreground italic-serif">
            ~14 km total · 2h 10 driving · order optimized to avoid backtracks.
          </div>
        </section>
      )}

      {/* Replan triggers */}
      <section className="mt-7 px-5">
        <div className="editorial-eyebrow text-muted-foreground mb-2">If today changes</div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {replanTriggers.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTrigger(trigger === id ? null : id)}
              className={cn(
                "shrink-0 inline-flex items-center gap-1.5 px-3 py-2 border text-xs",
                trigger === id ? "border-foreground bg-primary text-primary-foreground" : "border-foreground/25 hover:border-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </div>

        {/* Diff explanation — what changed + why */}
        {diff && (
          <div className="mt-4 cura-rise">
            <CuraWhisper>{diff.rationale}</CuraWhisper>
            <ul className="mt-3 border border-foreground/15">
              {diff.changes.map((c, i) => (
                <li key={i} className="px-3 py-3 border-b border-foreground/10 last:border-0">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-serif line-through text-muted-foreground truncate">{c.from}</span>
                    <ArrowRight className="h-3 w-3 shrink-0 text-primary" strokeWidth={1.5} />
                    <span className="font-serif text-foreground truncate">{c.to}</span>
                  </div>
                  <div className="italic-serif text-[12px] text-foreground/60 mt-1">because {c.why}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Timeline */}
      {!showMap && (
        <section className="mt-8">
          <ol className="relative">
            {current.blocks.map((b, i) => (
              <li key={i} className="grid grid-cols-[64px_1fr] gap-3 px-5 py-4 border-b border-foreground/10 last:border-0">
                <div className="text-right pt-1">
                  <div className="font-serif text-lg leading-none">{b.time}</div>
                  {b.duration && <div className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground mt-1">{b.duration}</div>}
                </div>
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-serif text-lg leading-tight">{b.title}</div>
                      {b.place && <div className="text-xs text-muted-foreground mt-0.5">{b.place}</div>}
                    </div>
                    <Tag variant={b.type === "eat" ? "default" : b.type === "moment" ? "olive" : b.type === "rest" ? "sky" : "outline"}>
                      {b.type}
                    </Tag>
                  </div>
                  {b.tag && <div className="italic-serif text-[13px] text-foreground/70 mt-2">"{b.tag}"</div>}
                  {b.outfit && (
                    <div className="mt-2 text-[11px] tracking-wider text-muted-foreground">
                      <span className="uppercase tracking-[0.18em]">Wear · </span>
                      <span className="text-foreground italic-serif text-[13px]">{b.outfit}</span>
                    </div>
                  )}
                  {b.note && <div className="mt-2 text-[12px] text-foreground/60 border-l border-primary/60 pl-2">{b.note}</div>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-6 px-5">
        <div className="grid grid-cols-2 gap-2">
          <button className="border border-foreground/30 px-3 py-3 text-xs hover:border-foreground">Plan B</button>
          <button className="border border-foreground/30 px-3 py-3 text-xs hover:border-foreground">Cheaper version</button>
          <button className="border border-foreground/30 px-3 py-3 text-xs hover:border-foreground">Photo-heavy</button>
          <button className="border border-foreground/30 px-3 py-3 text-xs hover:border-foreground">Stay near hotel</button>
        </div>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default ItineraryView;
