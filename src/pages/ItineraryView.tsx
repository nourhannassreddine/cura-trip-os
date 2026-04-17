import { useState } from "react";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { itinerary } from "@/data/cura";
import { CloudRain, Battery, Wallet, Sparkles, Shuffle, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const replanTriggers = [
  { id: "rain", icon: CloudRain, label: "It's raining" },
  { id: "tired", icon: Battery, label: "We're tired" },
  { id: "spend", icon: Wallet, label: "Overspent" },
  { id: "fun", icon: Sparkles, label: "More fun" },
  { id: "swap", icon: Shuffle, label: "Swap day" },
  { id: "sun", icon: Sun, label: "Sun day" },
];

const ItineraryView = () => {
  const [day, setDay] = useState(0);
  const [trigger, setTrigger] = useState<string | null>(null);
  const current = itinerary[day];

  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Itinerary" title="Puglia · 10 days" />

      {/* Day strip */}
      <section className="px-5">
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
          <Tag variant="outline">5 stops</Tag>
        </div>
      </section>

      {/* Replan triggers */}
      <section className="mt-6 px-5">
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
        {trigger && (
          <div className="mt-3 cura-rise">
            <CuraWhisper>
              {trigger === "rain" && "Swapped Polignano swim → Faggiano museum + long lunch nearby. Same vibe, indoors."}
              {trigger === "tired" && "Cut the olive grove. Moved breakfast later, dinner at the masseria, candles only."}
              {trigger === "spend" && "Tomorrow's lunch goes from €110 to €35. Same neighborhood, smaller place I trust."}
              {trigger === "fun" && "Added a sunset boat in Polignano. Bring swimwear and the linen shirt."}
              {trigger === "swap" && "Day 2 ⇄ Day 3. Restaurant reservations moved automatically. No conflicts."}
              {trigger === "sun" && "Front-loaded outdoor time, indoor stop after 14:00 when the heat peaks."}
            </CuraWhisper>
          </div>
        )}
      </section>

      {/* Timeline */}
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
                {b.tag && (
                  <div className="italic-serif text-[13px] text-foreground/70 mt-2">"{b.tag}"</div>
                )}
                {b.outfit && (
                  <div className="mt-2 text-[11px] tracking-wider text-muted-foreground">
                    <span className="uppercase tracking-[0.18em]">Wear · </span>
                    <span className="text-foreground italic-serif text-[13px]">{b.outfit}</span>
                  </div>
                )}
                {b.note && (
                  <div className="mt-2 text-[12px] text-foreground/60 border-l border-primary/60 pl-2">{b.note}</div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

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
