import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";
import { trips } from "@/data/cura";

/**
 * Engine placeholder.
 * Holds the room until the engine interior is built.
 * One CURA line in voice — never feels like a 404.
 */

const ENGINE_META: Record<string, { title: string; line: (city: string) => string }> = {
  visa:      { title: "Visa",      line: (c) => `For ${c}, the paperwork is small. But small still has to be opened.` },
  flights:   { title: "Flights",   line: () => "Flights are just a date and a willingness to commit. We'll start there." },
  stays:     { title: "Stays",     line: (c) => `One base or two? In ${c}, that single decision shapes everything else.` },
  route:     { title: "Route",     line: () => "A route isn't a line on a map. It's a sequence of mornings." },
  itinerary: { title: "Itinerary", line: () => "I'll build days that protect your energy, not just fill your calendar." },
  prep:      { title: "Prep",      line: () => "Preparation is mostly about not forgetting the boring things in time." },
  pack:      { title: "Pack",      line: (c) => `For ${c}: heat, dust, one dressy night. The list writes itself once you tell me three things.` },
  spend:     { title: "Spend",     line: () => "Money is a constraint, not the point. Set the ceiling and we'll work below it." },
};

const TripEngine = () => {
  const { id, engine } = useParams();
  const trip = trips.find((t) => t.id === id) ?? trips[0];
  const meta = ENGINE_META[engine ?? ""] ?? {
    title: engine ?? "Engine",
    line: () => "This room isn't furnished yet. Come back soon.",
  };

  return (
    <main className="app-shell pb-24">
      <header className="px-5 pt-5 pb-3 flex items-center gap-3">
        <Link to={`/trip/${trip.id}`} aria-label="Back" className="-ml-1 p-1 hover:opacity-70">
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
        </Link>
        <div className="editorial-eyebrow text-muted-foreground">{trip.city}</div>
      </header>

      <section className="px-5 pt-12">
        <div className="editorial-eyebrow text-foreground/45">Engine</div>
        <h1 className="font-serif tracking-tight mt-2" style={{ fontSize: "44px", lineHeight: 0.95 }}>
          {meta.title}
        </h1>

        <p
          className="font-serif italic mt-10 max-w-[26ch]"
          style={{ fontSize: "20px", lineHeight: 1.3, color: "hsl(var(--foreground) / 0.85)" }}
        >
          {meta.line(trip.city)}
        </p>

        <div
          className="mt-12 inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "hsl(var(--accent-rust))" }}
        >
          <span className="h-px w-6" style={{ backgroundColor: "hsl(var(--accent-rust))" }} />
          Opening soon
        </div>
      </section>

      <BottomNav />
    </main>
  );
};

export default TripEngine;
