import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BottomNav } from "@/components/cura/BottomNav";
import { trips } from "@/data/cura";

/**
 * Trip Dashboard — the central operating surface for one trip.
 *
 * Structure:
 *   1. Ink-black header — destination, dates, country, countdown, readiness bar
 *   2. CURA insight strip — sunflower, full bleed, italic Playfair line
 *   3. Engine grid — 8 engines, 2 columns, hairline-bordered cards
 *   4. "Also in motion" — quiet card pointing at the next trip
 *
 * On first visit per session, redirects to /trip/:id/intro for the
 * CURA reading-the-trip-aloud transition.
 */

interface Engine {
  key: string;
  name: string;
  status: string;
  action: string;
  state: "todo" | "doing" | "done";
}

const engines: Engine[] = [
  { key: "visa",      name: "Visa",      status: "Visa-free for most EU passports", action: "Confirm passport nationality", state: "todo" },
  { key: "flights",   name: "Flights",   status: "No flights added yet",           action: "Start with departure date",   state: "todo" },
  { key: "stays",     name: "Stays",     status: "Accommodation undecided",        action: "Set your base — one place or two?", state: "todo" },
  { key: "route",     name: "Route",     status: "10 nights, no movement mapped",  action: "Decide: stay or travel south", state: "todo" },
  { key: "itinerary", name: "Itinerary", status: "Nothing planned yet",            action: "Build your first day",        state: "todo" },
  { key: "prep",      name: "Prep",      status: "38 days to prepare",             action: "Open the pre-trip timeline",  state: "doing" },
  { key: "pack",      name: "Pack",      status: "Packing list not started",       action: "Answer 3 questions to start", state: "todo" },
  { key: "spend",     name: "Spend",     status: "No budget set",                  action: "Set a total trip budget",     state: "todo" },
];

const insightFor = (city: string) =>
  city === "Puglia"
    ? "Your itinerary has no evenings planned. Puglia's best hours are after 7pm."
    : `${city} is taking shape. The next decision is the one that unlocks the rest.`;

const StateDot = ({ state }: { state: Engine["state"] }) => {
  if (state === "done") {
    return <span className="inline-block h-2 w-2 rounded-full bg-foreground" />;
  }
  if (state === "doing") {
    return (
      <span className="relative inline-block h-2 w-2 rounded-full border border-foreground overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-1/2 bg-foreground" />
      </span>
    );
  }
  return <span className="inline-block h-2 w-2 rounded-full border border-foreground" />;
};

const TripWorkspace = () => {
  const { id } = useParams();
  const trip = trips.find((t) => t.id === id) ?? trips[0];

  // First-visit transition gate.
  const introKey = `cura.tripIntro.${trip.id}`;
  const seenIntro =
    typeof window !== "undefined" && sessionStorage.getItem(introKey) === "seen";

  useEffect(() => {
    // No-op; just ensures the effect runs after mount.
  }, []);

  if (!seenIntro) {
    return <Navigate to={`/trip/${trip.id}/intro`} replace />;
  }

  // The next trip in motion (not this one, not memory).
  const alsoInMotion = trips.find(
    (t) => t.id !== trip.id && t.status !== "memory",
  );

  return (
    <main className="app-shell pb-24">
      {/* HEADER — ink black */}
      <header
        className="px-5 pt-10 pb-0 relative"
        style={{
          backgroundColor: "hsl(var(--ink))",
          color: "hsl(var(--ink-foreground))",
          minHeight: "140px",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1
              className="font-serif leading-[0.95] tracking-tight"
              style={{ fontSize: "42px" }}
            >
              {trip.city}
            </h1>
            <div
              className="text-[12px] tracking-[0.14em] mt-3"
              style={{ color: "hsl(var(--ink-foreground) / 0.55)" }}
            >
              {trip.dates}
            </div>
            <div
              className="text-[12px] tracking-[0.14em] mt-1"
              style={{ color: "hsl(var(--ink-foreground) / 0.4)" }}
            >
              {trip.country}
            </div>
          </div>

          <div className="text-right shrink-0">
            <div
              className="text-[10px] tracking-[0.18em] uppercase"
              style={{ color: "hsl(var(--ink-foreground) / 0.45)" }}
            >
              Until departure
            </div>
            <div
              className="font-serif mt-1"
              style={{ color: "hsl(var(--accent-rust))", fontSize: "22px", lineHeight: 1 }}
            >
              {trip.daysOut > 0 ? `${trip.daysOut} days` : trip.daysOut === 0 ? "today" : "—"}
            </div>
          </div>
        </div>

        {/* Readiness bar — ivory on ink */}
        <div className="mt-7 pb-3">
          <div
            className="h-[2px] w-full relative"
            style={{ backgroundColor: "hsl(var(--ink-foreground) / 0.18)" }}
          >
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${trip.readiness}%`,
                backgroundColor: "hsl(var(--ink-foreground))",
              }}
            />
          </div>
          <div
            className="text-[10px] tracking-[0.18em] mt-2 text-right"
            style={{ color: "hsl(var(--ink-foreground) / 0.55)" }}
          >
            {trip.readiness}% ready
          </div>
        </div>
      </header>

      {/* CURA INSIGHT — sunflower bleed */}
      <section
        className="px-5 py-4"
        style={{
          backgroundColor: "hsl(var(--accent-sun))",
          color: "hsl(var(--ink))",
        }}
      >
        <div
          className="text-[9px] tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--ink) / 0.55)" }}
        >
          Cura
        </div>
        <p className="italic-serif mt-1.5" style={{ fontSize: "16px", lineHeight: 1.35 }}>
          {insightFor(trip.city)}
        </p>
      </section>

      {/* ENGINE GRID */}
      <section className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-[10px]">
          {engines.map((e) => (
            <Link
              key={e.key}
              to={`/trip/${trip.id}/engine/${e.key}`}
              className="border border-foreground/15 bg-background p-3 flex flex-col justify-between hover:bg-foreground/[0.03] transition-colors"
              style={{ minHeight: "100px" }}
            >
              <div className="flex items-start justify-between">
                <div className="text-[11px] tracking-[0.16em] uppercase font-medium">
                  {e.name}
                </div>
              </div>
              <div className="text-[12px] text-foreground/65 leading-snug mt-2">
                {e.status}
              </div>
              <div className="flex items-end justify-between mt-2">
                <div
                  className="text-[10px] leading-tight max-w-[80%]"
                  style={{ color: "hsl(var(--accent-rust))" }}
                >
                  {e.action}
                </div>
                <StateDot state={e.state} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ALSO IN MOTION */}
      {alsoInMotion && (
        <section className="px-5 mt-10">
          <div className="editorial-eyebrow text-foreground/45 mb-3">
            Also in motion
          </div>
          <Link
            to={`/trip/${alsoInMotion.id}`}
            className="border border-foreground/15 px-4 py-4 flex items-center justify-between hover:bg-foreground/[0.03] transition-colors"
          >
            <div className="min-w-0">
              <div className="font-serif text-[20px] leading-none truncate">
                {alsoInMotion.city}
              </div>
              <div className="editorial-eyebrow text-foreground/55 mt-2">
                {alsoInMotion.dates}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span
                className="inline-flex items-center px-2 py-0.5 text-[9px] tracking-[0.18em] uppercase"
                style={{
                  backgroundColor:
                    alsoInMotion.status === "dreaming"
                      ? "hsl(var(--accent-sky))"
                      : "hsl(var(--accent-ochre))",
                  color:
                    alsoInMotion.status === "dreaming"
                      ? "hsl(var(--foreground))"
                      : "white",
                }}
              >
                {alsoInMotion.status}
              </span>
              <div className="text-[10px] text-foreground/55 mt-1.5">
                {alsoInMotion.readiness}% ready
              </div>
            </div>
          </Link>
        </section>
      )}

      <BottomNav />
    </main>
  );
};

export default TripWorkspace;
