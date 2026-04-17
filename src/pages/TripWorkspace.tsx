import { useParams, Link } from "react-router-dom";
import { trips, curaWhispers, itinerary } from "@/data/cura";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { TripTabs } from "@/components/cura/TripTabs";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { MapCanvas } from "@/components/cura/MapCanvas";
import { Tag } from "@/components/cura/Tag";

const TripWorkspace = () => {
  const { id } = useParams();
  const trip = trips.find((t) => t.id === id) ?? trips[0];

  // Quick map — anchor + first day stops, used as a teaser
  const mapPoints = itinerary[0].blocks
    .filter((b) => b.x !== undefined)
    .slice(0, 5)
    .map((b, i) => ({ id: b.title, x: b.x!, y: b.y!, number: i + 1, label: b.place ?? b.title, variant: "ink" as const }));

  return (
    <main className="app-shell pb-20">
      <TopBar back="/trips" eyebrow="Trip" title={`${trip.city} · ${trip.country}`} />
      <TripTabs tripId={trip.id} />

      {/* Cover — editorial */}
      <section className="relative">
        <div className="relative h-[280px] overflow-hidden">
          <img src={trip.cover} alt={trip.city} className="h-full w-full object-cover" width={1024} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          <div className="absolute top-3 right-3">
            <Tag variant="ink">{trip.mode} mode</Tag>
          </div>
        </div>
        <div className="px-5 -mt-16 relative">
          <div className="editorial-eyebrow text-foreground/80">{trip.dates}</div>
          <h1 className="display-xl leading-[0.85]">
            {trip.city}<span className="italic-serif text-primary">.</span>
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Tag variant="outline">{trip.travelers.join(" · ")}</Tag>
            <Tag>{trip.daysOut > 0 ? `${trip.daysOut} days out` : "Past trip"}</Tag>
          </div>
        </div>
      </section>

      {/* CURA whisper */}
      <section className="px-5 mt-6">
        <CuraWhisper>{curaWhispers[1]}</CuraWhisper>
      </section>

      {/* Readiness — editorial bar */}
      <section className="px-5 mt-6">
        <div className="flex items-baseline justify-between">
          <div className="editorial-eyebrow text-muted-foreground">Readiness</div>
          <div className="font-serif text-lg">{trip.readiness}<span className="text-muted-foreground text-sm">/100</span></div>
        </div>
        <div className="mt-2 h-px bg-foreground/15 relative">
          <div className="absolute left-0 top-0 h-px bg-primary" style={{ width: `${trip.readiness}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          <span>Booked</span><span>Packed</span><span>Documents</span><span>Outfits</span>
        </div>
      </section>

      {/* The shape — small map preview leading to Plan */}
      <section className="px-5 mt-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-serif text-xl">The shape of it</h2>
          <Link to="/route" className="text-[11px] tracking-[0.18em] uppercase text-primary">Open plan →</Link>
        </div>
        <MapCanvas points={mapPoints} caption="Day 1 · arrival arc" height={200} />
      </section>

      {/* What's next — editorial action list, not a generic grid */}
      <section className="mt-9">
        <div className="px-5 editorial-eyebrow text-muted-foreground mb-3">What's next</div>
        <ul className="border-t border-foreground/15">
          {[
            { to: "/itinerary", primary: "Day 2 needs your eye", secondary: "I cut one stop. Confirm or push back.", tag: "review" },
            { to: "/outfits", primary: "Two outfit moments still open", secondary: "Sunset on Day 1 + Alberobello morning.", tag: "open" },
            { to: "/pack", primary: "Pack the slip dress", secondary: "Day 1 dinner is dressy. You haven't.", tag: "todo" },
            { to: "/spend", primary: "€2,255 projected", secondary: "Stays paid. Food still flexible.", tag: "ok" },
          ].map((row, i) => (
            <li key={i} className="border-b border-foreground/10 last:border-0">
              <Link to={row.to} className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-paper transition-colors">
                <div className="min-w-0">
                  <div className="font-serif text-[17px] leading-tight">{row.primary}</div>
                  <div className="italic-serif text-[12px] text-foreground/60 mt-1">{row.secondary}</div>
                </div>
                <Tag variant={row.tag === "review" || row.tag === "todo" ? "default" : "outline"}>{row.tag}</Tag>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Live mode CTA */}
      <section className="mt-9 px-5">
        <Link to="/during" className="block border border-foreground bg-ink text-ink-foreground p-5 group">
          <div className="editorial-eyebrow opacity-70 mb-2">When you arrive</div>
          <div className="font-serif text-2xl leading-tight">Open <span className="italic-serif">Live mode</span> →</div>
          <p className="text-xs opacity-70 mt-2">Today view, nearby saved places, quick actions.</p>
        </Link>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default TripWorkspace;
