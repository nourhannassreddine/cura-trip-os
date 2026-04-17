import { useParams, Link } from "react-router-dom";
import { trips, curaWhispers } from "@/data/cura";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { Tag } from "@/components/cura/Tag";
import { Compass, ArrowLeftRight, FileCheck2, Map, CalendarDays, Luggage, Wallet, Radio, BookOpen } from "lucide-react";

const engines = [
  { key: "discover", label: "Discover", icon: Compass, status: "Saved 12", to: "/discover" },
  { key: "compare", label: "Compare", icon: ArrowLeftRight, status: "Decided", to: "/compare" },
  { key: "visa", label: "Visa", icon: FileCheck2, status: "Cleared", to: "/visa" },
  { key: "route", label: "Route", icon: Map, status: "FCO ↦ BRI", to: "/route" },
  { key: "itinerary", label: "Itinerary", icon: CalendarDays, status: "10 days", to: "/itinerary" },
  { key: "pack", label: "Pack", icon: Luggage, status: "7 / 12", to: "/pack" },
  { key: "spend", label: "Spend", icon: Wallet, status: "€2,255", to: "/spend" },
  { key: "during", label: "During", icon: Radio, status: "Live in 38d", to: "/during" },
  { key: "journal", label: "Journal", icon: BookOpen, status: "Locked", to: "/journal" },
];

const TripWorkspace = () => {
  const { id } = useParams();
  const trip = trips.find((t) => t.id === id) ?? trips[0];

  return (
    <main className="app-shell pb-20">
      <TopBar back="/home" eyebrow="Trip" title={`${trip.city} · ${trip.country}`} />

      {/* Cover */}
      <section className="relative">
        <div className="relative h-[280px] overflow-hidden">
          <img src={trip.cover} alt={trip.city} className="h-full w-full object-cover" width={1024} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
        <div className="px-5 -mt-16 relative">
          <div className="editorial-eyebrow text-foreground/80">{trip.dates}</div>
          <h1 className="display-xl leading-[0.85]">
            {trip.city}<span className="italic-serif text-primary">.</span>
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Tag variant="ink">{trip.mode} mode</Tag>
            <Tag variant="outline">{trip.travelers.join(" · ")}</Tag>
            <Tag>{trip.daysOut > 0 ? `${trip.daysOut} days out` : "Past trip"}</Tag>
          </div>
        </div>
      </section>

      {/* CURA daily note */}
      <section className="px-5 mt-6">
        <CuraWhisper>{curaWhispers[1]}</CuraWhisper>
      </section>

      {/* Readiness */}
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

      {/* Engines grid */}
      <section className="mt-9 px-5">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-serif text-xl">Engines</h2>
          <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">Use any · skip any</span>
        </div>
        <ul className="grid grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
          {engines.map(({ key, label, icon: Icon, status, to }) => (
            <li key={key} className="bg-background">
              <Link to={to} className="flex flex-col gap-2 p-4 h-[100px] hover:bg-paper transition-colors">
                <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                <div className="mt-auto">
                  <div className="font-serif text-base leading-none">{label}</div>
                  <div className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground mt-1">{status}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Today shortcut */}
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
