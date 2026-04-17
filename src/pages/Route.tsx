import { useState } from "react";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { TripTabs } from "@/components/cura/TripTabs";
import { MapCanvas } from "@/components/cura/MapCanvas";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { itinerary, savedPlaces, SavedPlaceType } from "@/data/cura";
import { Plane, Train, Car } from "lucide-react";
import { cn } from "@/lib/utils";

type View = "trip" | "day" | "saved";

const placeTypes: { key: SavedPlaceType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "food", label: "Food" },
  { key: "coffee", label: "Coffee" },
  { key: "photo", label: "Photo" },
  { key: "view", label: "View" },
  { key: "shop", label: "Shop" },
  { key: "stay", label: "Stay" },
];

const Route = () => {
  const [view, setView] = useState<View>("trip");
  const [day, setDay] = useState(0);
  const [filter, setFilter] = useState<SavedPlaceType | "all">("all");

  const tripPoints = itinerary.flatMap((d, i) => {
    const stay = d.blocks.find((b) => b.type === "stay" || b.type === "moment");
    const first = d.blocks[0];
    const p = stay ?? first;
    if (p?.x === undefined) return [];
    return [{
      id: `d${i}`,
      x: p.x!,
      y: p.y!,
      number: i + 1,
      label: `Day ${i + 1}`,
      variant: (i === 0 ? "primary" : i === 1 ? "olive" : "sky") as "primary" | "olive" | "sky",
    }];
  });

  const dayBlocks = itinerary[day].blocks.filter((b) => b.x !== undefined);
  const dayPoints = dayBlocks.map((b, i) => ({
    id: b.title,
    x: b.x!,
    y: b.y!,
    number: i + 1,
    label: b.place ?? b.title,
    variant: (b.type === "eat" ? "primary" : b.type === "moment" ? "olive" : b.type === "rest" ? "sky" : "ink") as "primary" | "olive" | "sky" | "ink",
  }));

  const filtered = filter === "all" ? savedPlaces : savedPlaces.filter((p) => p.type === filter);
  const savedPoints = filtered.map((p) => ({
    id: p.id,
    x: p.x,
    y: p.y,
    label: p.name,
    variant: (p.type === "food" ? "primary" : p.type === "view" || p.type === "photo" ? "olive" : p.type === "stay" ? "ink" : "sky") as "primary" | "olive" | "sky" | "ink",
  }));

  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Plan" title="Route & places" />
      <TripTabs tripId="puglia-25" />

      <section className="px-5 pt-4 cura-rise">
        <h1 className="display-md max-w-[14ch]">
          The <span className="italic-serif">shape</span> of the trip.
        </h1>
      </section>

      <section className="px-5 mt-5">
        <div className="grid grid-cols-3 border border-foreground/20">
          {([
            { k: "trip", l: "Trip" },
            { k: "day", l: "Day" },
            { k: "saved", l: "Saved" },
          ] as const).map((v) => (
            <button
              key={v.k}
              onClick={() => setView(v.k)}
              className={cn(
                "py-2.5 text-[11px] tracking-[0.18em] uppercase border-r border-foreground/15 last:border-0",
                view === v.k ? "bg-ink text-ink-foreground" : "hover:bg-paper"
              )}
            >
              {v.l}
            </button>
          ))}
        </div>
      </section>

      {view === "trip" && (
        <section className="mt-5 cura-rise">
          <div className="px-5">
            <MapCanvas points={tripPoints} caption="10-day arc · Bari → Ostuni → Polignano → Alberobello" height={320} />
          </div>
          <div className="px-5 mt-4">
            <CuraWhisper>
              You spend 6 of 10 nights at the same masseria — that's by design. The trip breathes from one anchor.
            </CuraWhisper>
          </div>
          <ul className="mt-5 border-t border-foreground/15">
            {[
              { icon: Plane, leg: "FCO → BRI", detail: "Direct · 1h 10 · €82", tag: "Booked" },
              { icon: Car, leg: "BRI → Ostuni", detail: "Driver · 1h 20 · €95", tag: "Booked" },
              { icon: Train, leg: "Ostuni → Lecce day trip", detail: "Regional · 35 min · €4", tag: "Optional" },
              { icon: Car, leg: "Ostuni → BRI return", detail: "Same driver · 1h 20", tag: "Confirmed" },
            ].map((l, i) => (
              <li key={i} className="px-5 py-3 border-b border-foreground/10 last:border-0 flex items-center gap-3">
                <l.icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                <div className="flex-1">
                  <div className="font-serif text-[15px] leading-none">{l.leg}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{l.detail}</div>
                </div>
                <Tag variant={l.tag === "Booked" || l.tag === "Confirmed" ? "olive" : "outline"}>{l.tag}</Tag>
              </li>
            ))}
          </ul>
        </section>
      )}

      {view === "day" && (
        <section className="mt-5 cura-rise">
          <div className="px-5 flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {itinerary.map((d, i) => (
              <button
                key={i}
                onClick={() => setDay(i)}
                className={cn(
                  "shrink-0 px-3 py-2 border text-left",
                  i === day ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20"
                )}
              >
                <div className={cn("editorial-eyebrow", i === day ? "opacity-70" : "text-muted-foreground")}>{itinerary[i].date.split(" · ")[0]}</div>
                <div className="font-serif text-sm leading-none mt-0.5">Day {String(i + 1).padStart(2, "0")}</div>
              </button>
            ))}
          </div>
          <div className="px-5">
            <MapCanvas points={dayPoints} caption={`Day ${day + 1} · ${dayPoints.length} stops · ~14 km`} height={280} />
          </div>
          <ul className="mt-3 border-t border-foreground/15">
            {dayBlocks.map((b, i) => (
              <li key={b.title} className="px-5 py-2.5 border-b border-foreground/10 last:border-0 flex items-center gap-3">
                <span className="font-serif text-base w-6 text-muted-foreground">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-sm leading-none truncate">{b.title}</div>
                  {b.place && <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{b.place}</div>}
                </div>
                <span className="text-[11px] text-muted-foreground">{b.time}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {view === "saved" && (
        <section className="mt-5 cura-rise">
          <div className="px-5 flex gap-1.5 overflow-x-auto scrollbar-hide pb-2">
            {placeTypes.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className={cn(
                  "shrink-0 px-3 py-1.5 border text-[11px] tracking-[0.16em] uppercase",
                  filter === t.key ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/25"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="px-5">
            <MapCanvas points={savedPoints} connect={false} caption={`${filtered.length} saved · filter: ${filter}`} height={280} />
          </div>
          <ul className="mt-3 border-t border-foreground/15">
            {filtered.map((p) => (
              <li key={p.id} className="px-5 py-3 border-b border-foreground/10 last:border-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-serif text-[15px] leading-tight">{p.name}</div>
                    <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">{p.source}</div>
                    {p.note && <div className="italic-serif text-[12px] text-foreground/60 mt-1">"{p.note}"</div>}
                  </div>
                  <Tag variant={p.type === "food" ? "default" : p.type === "view" || p.type === "photo" ? "olive" : "outline"}>{p.type}</Tag>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Route;
