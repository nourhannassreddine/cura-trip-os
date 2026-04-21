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

  const headerImg =
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80";

  const itinerary = engines.find((e) => e.key === "itinerary")!;
  const otherEngines = engines.filter((e) => e.key !== "itinerary");

  return (
    <main className="app-shell pb-24">
      {/* HEADER — full-bleed editorial image */}
      <header
        className="relative overflow-hidden"
        style={{ minHeight: "260px", color: "hsl(var(--ink-foreground))" }}
      >
        <div className="editorial-img absolute inset-0">
          <img src={headerImg} alt={`${trip.city} — editorial header`} />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--ink) / 0.7), hsl(var(--ink) / 0.3) 55%, transparent)",
          }}
        />

        {/* Top-right: countdown */}
        <div className="absolute top-6 right-5 text-right">
          <div
            className="text-[10px] tracking-[0.18em] uppercase"
            style={{ color: "hsl(var(--ink-foreground) / 0.7)" }}
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

        {/* Bottom-left: name + dates + country */}
        <div className="absolute left-5 right-5 bottom-10">
          <h1
            className="font-serif leading-[0.95] tracking-tight"
            style={{ fontSize: "48px" }}
          >
            {trip.city}
          </h1>
          <div
            className="text-[12px] tracking-[0.14em] mt-3"
            style={{ color: "hsl(var(--ink-foreground) / 0.75)" }}
          >
            {trip.dates}
          </div>
          <div
            className="text-[12px] tracking-[0.14em] mt-1"
            style={{ color: "hsl(var(--ink-foreground) / 0.55)" }}
          >
            {trip.country}
          </div>
        </div>

        {/* Readiness — horizon line at very bottom */}
        <div className="absolute left-0 right-0 bottom-0 px-5 pb-2">
          <div
            className="text-[10px] tracking-[0.18em] mb-1.5 text-right"
            style={{ color: "hsl(var(--ink-foreground) / 0.7)" }}
          >
            {trip.readiness}% ready
          </div>
          <div
            className="h-[2px] w-full relative"
            style={{ backgroundColor: "hsl(var(--ink-foreground) / 0.2)" }}
          >
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${trip.readiness}%`,
                backgroundColor: "hsl(var(--ink-foreground))",
              }}
            />
          </div>
        </div>
      </header>

      {/* CURA INSIGHT — sunflower bleed */}
      <section
        className="px-5 py-5"
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
        <p
          className="italic-serif mt-1.5"
          style={{ fontSize: "16px", lineHeight: 1.75 }}
        >
          {insightFor(trip.city)}
        </p>
      </section>

      {/* ENGINE GRID */}
      <section className="px-4 pt-6">
        {/* Itinerary — promoted, full width, ghost image */}
        <Link
          to={`/trip/${trip.id}/engine/${itinerary.key}`}
          className="relative overflow-hidden border border-foreground/15 bg-background flex flex-col justify-between hover:bg-foreground/[0.03] transition-colors mb-[10px]"
          style={{ height: "120px" }}
        >
          <img
            src={headerImg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.12, filter: "blur(2px) saturate(0.85)" }}
          />
          <div className="relative p-4 flex flex-col justify-between h-full">
            <div className="text-[11px] tracking-[0.16em] uppercase font-medium">
              {itinerary.name}
            </div>
            <div
              className="text-[12px] text-foreground/70"
              style={{ lineHeight: 1.75 }}
            >
              {itinerary.status}
            </div>
            <div className="flex items-end justify-between">
              <div
                className="text-[10px] leading-tight max-w-[80%]"
                style={{ color: "hsl(var(--accent-rust))" }}
              >
                {itinerary.action}
              </div>
              <StateDot state={itinerary.state} />
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-[10px]">
          {otherEngines.map((e) => (
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
              <div
                className="text-[12px] text-foreground/65 mt-2"
                style={{ lineHeight: 1.75 }}
              >
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
        <section className="px-5 mt-14">
          <div className="editorial-eyebrow text-foreground/45 mb-3">
            Also in motion
          </div>
          <Link
            to={`/trip/${alsoInMotion.id}`}
            className="border border-foreground/15 flex items-stretch hover:bg-foreground/[0.03] transition-colors overflow-hidden"
            style={{ height: "90px" }}
          >
            <div className="editorial-img w-[40%] shrink-0">
              <img
                src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80"
                alt={`${alsoInMotion.city}`}
              />
            </div>
            <div className="flex-1 px-4 py-3 flex items-center justify-between min-w-0">
              <div className="min-w-0">
                <div className="font-serif text-[20px] leading-none truncate">
                  {alsoInMotion.city}
                </div>
                <div className="editorial-eyebrow text-foreground/55 mt-2">
                  {alsoInMotion.dates}
                </div>
              </div>
              <div className="text-right shrink-0 ml-3">
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
            </div>
          </Link>
        </section>
      )}

      <BottomNav />
    </main>
  );
};

export default TripWorkspace;
