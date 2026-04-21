import { Link } from "react-router-dom";
import { Plus, Bell, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";

import { trips, curaWhispers, packing, destinations, journalEntries } from "@/data/cura";
import fieldnote from "@/assets/home-fieldnote.jpg";

/* Status sticker — small identifier chip whose color encodes trip phase.
   Uses the editorial accent palette so each phase reads as its own marker.
   - dreaming → sky   (faded blue, low commitment)
   - planning → ochre (warm earth, in motion)
   - ready    → olive (committed, almost there)
   - live     → rust  (the trip is now)
   - memory   → rose  (past, archived) */
const statusStyles: Record<string, string> = {
  // DREAMING — aqua bg #4FB6C8, ivory text #F5F0E8, no border
  dreaming: "bg-[#4FB6C8] text-[#F5F0E8]",
  planning: "bg-accent-ochre text-white",
  ready: "bg-accent-olive text-white",
  live: "bg-accent-rust text-white",
  memory: "bg-accent-rose text-white",
};

/* Solid action-button surface for "Continue ___" — shares the sticker's color
   so the user reads card + button as the same identifier system. */
const statusActionStyles: Record<string, string> = {
  dreaming: "bg-accent-sky text-foreground border-accent-sky",
  planning: "bg-accent-ochre text-white border-accent-ochre",
  ready: "bg-accent-olive text-white border-accent-olive",
  live: "bg-accent-rust text-white border-accent-rust",
  memory: "bg-accent-rose text-white border-accent-rose",
};

const statusVerb: Record<string, string> = {
  dreaming: "Continue dreaming",
  planning: "Continue planning",
  ready: "Open trip",
  live: "Open today",
  memory: "Revisit",
};

const StatusSticker = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-[0.16em] uppercase ${
      statusStyles[status] ?? statusStyles.planning
    }`}
  >
    {status}
  </span>
);

const Home = () => {
  // Active trips, sorted by closest first.
  const active = trips
    .filter((t) => t.status !== "memory")
    .sort((a, b) => a.daysOut - b.daysOut);

  const primary = active[0];
  const secondary = active.slice(1);

  // Drives "See what's missing"
  const missingCount = packing.filter((p) => !p.packed).length;

  // Elsewhere — destinations the user hasn't claimed as a trip yet.
  const claimedIds = new Set(trips.map((t) => t.id.split("-")[0]));
  const elsewhere = destinations.filter((d) => !claimedIds.has(d.id)).slice(0, 3);

  const archive = journalEntries.slice(0, 2);

  return (
    <main className="app-shell pb-20">
      {/* Header — logo locked top-left, date sits underneath as the timestamp.
          Right cluster keeps the two utility actions. */}
      <header className="px-5 pt-5 pb-2 flex items-start justify-between">
        <div>
          <div className="font-serif lowercase text-2xl leading-none tracking-tight">
            cura
          </div>
          <div className="editorial-eyebrow text-muted-foreground mt-1.5">
            Tuesday · 4:12 pm
          </div>
        </div>
        <div className="flex items-center" style={{ gap: "12px" }}>
          <button aria-label="Notifications" className="hover:opacity-70 inline-flex items-center justify-center" style={{ width: "20px", height: "20px" }}>
            <Bell className="text-foreground" style={{ width: "20px", height: "20px" }} fill="currentColor" stroke="currentColor" strokeWidth={1.5} />
          </button>
          <Link to="/begin" aria-label="Dream" className="hover:opacity-70 inline-flex items-center justify-center" style={{ width: "20px", height: "20px" }}>
            <span className="inline-flex items-center justify-center text-foreground" style={{ fontSize: "20px", lineHeight: 1 }}>✦</span>
          </Link>
        </div>
      </header>

      {/* Hero — greeting + days-to header. */}
      <section className="px-5 pt-3 pb-4 cura-rise">
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-[40px] leading-[0.95] max-w-[12ch]">
            Good afternoon, <span className="italic-serif">Nourhan</span>.
          </h1>
          {primary && (
            <div className="text-right text-xs text-muted-foreground pb-1.5">
              <div>{primary.daysOut} days</div>
              <div>to {primary.city}</div>
            </div>
          )}
        </div>
      </section>

      {/* CURA insight strip — Type B: no surface, sits on ivory page bg.
          Sits between greeting and trip card. */}
      <section className="px-5" style={{ paddingTop: "28px", paddingBottom: "24px" }}>
        <div
          className="font-sans uppercase"
          style={{
            fontSize: "8px",
            letterSpacing: "0.18em",
            color: "hsl(var(--ink) / 0.35)",
          }}
        >
          ✦ Cura
        </div>
        <p
          className="font-serif italic mt-2"
          style={{
            fontSize: "22px",
            lineHeight: 1.35,
            color: "hsl(var(--ink))",
          }}
        >
          {curaWhispers[0]}
        </p>
        <div
          className="mt-5 w-full"
          style={{ height: "0.5px", background: "hsl(var(--ink) / 0.1)" }}
        />
      </section>

      {/* STATE 1 — no active trips. Single editorial empty state, CURA voice. */}
      {!primary && (
        <section className="mt-2 px-5">
          <div className="border border-foreground/15 px-5 py-10 text-center">
            <h2 className="font-serif text-[26px] leading-[1.1] max-w-[18ch] mx-auto">
              Nothing planned. Which is its own kind of plan.
            </h2>
            <Link
              to="/begin"
              className="mt-6 inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Begin
            </Link>
          </div>
        </section>
      )}

      {/* STATE 3 — trip is live. Stub: "today's plan is loading." */}
      {primary && primary.status === "live" && (
        <section className="mt-2 px-5">
          <div className="editorial-eyebrow text-muted-foreground mb-2">Live now</div>
          <Link
            to={`/trip/${primary.id}`}
            className="block border border-foreground bg-background p-5"
          >
            <div className="editorial-eyebrow text-accent-rust">In motion</div>
            <div className="font-serif text-[34px] leading-none mt-2">
              Today in {primary.city}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Your day is loading. Tap to open today's view.
            </p>
          </Link>
        </section>
      )}

      {/* STATE 2 — default. Active planning trip as the focal point. */}
      {primary && primary.status !== "live" && (
        <section className="mt-2 px-5">
          <div className="editorial-eyebrow text-muted-foreground mb-2">Your trip</div>

          <div className="border border-foreground bg-background">
            {/* Cover */}
            <Link to={`/trip/${primary.id}`} className="group block relative h-[220px] overflow-hidden">
              <img
                src={primary.cover}
                alt={`${primary.city}, ${primary.country}`}
                loading="eager"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <StatusSticker status={primary.status} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="editorial-eyebrow text-white/80">{primary.country}</div>
                <div className="font-serif text-white text-[34px] leading-none mt-1">
                  {primary.city}
                </div>
                <div className="text-[11px] text-white/85 mt-1">{primary.dates}</div>
              </div>
            </Link>

            {/* Readiness bar */}
            <div className="px-4 pt-4">
              <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                <span>Readiness</span>
                <span>{primary.readiness}%</span>
              </div>
              <div className="mt-2 h-1 bg-foreground/15 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full"
                  style={{ width: `${primary.readiness}%`, backgroundColor: "#C24E2A" }}
                />
              </div>
            </div>

            {/* ACTION LAYER — primary CTA color matches the status sticker
                so the card reads as a single identifier system. */}
            <div className="p-4 pt-3">
              <Link
                to={`/trip/${primary.id}`}
                className={`group flex items-center justify-between border px-4 py-3 ${
                  statusActionStyles[primary.status] ?? statusActionStyles.planning
                }`}
              >
                <span className="font-sans text-sm tracking-wide">
                  {statusVerb[primary.status] ?? "Open trip"}
                </span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  to={`/trip/${primary.id}/itinerary`}
                  className="flex items-center justify-center gap-1.5 border border-foreground/25 hover:border-foreground px-3 py-2.5 text-[12px] tracking-wide"
                >
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                  View itinerary
                </Link>
                <Link
                  to="/pack"
                  className="flex items-center justify-center gap-1.5 border border-foreground/25 hover:border-foreground px-3 py-2.5 text-[12px] tracking-wide"
                >
                  <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
                  See what's missing
                  {missingCount > 0 && (
                    <span className="text-muted-foreground">· {missingCount}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECONDARY TRIPS — flex row 38/62 with desaturated image. */}
      {secondary.length > 0 && (
        <section className="mt-6 px-5">
          <div className="flex items-baseline justify-between mb-3">
            <div className="editorial-eyebrow text-muted-foreground">Also in motion</div>
            <Link
              to="/trips"
              className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
            >
              All trips
            </Link>
          </div>
          <ul className="space-y-3">
            {secondary.map((t) => (
              <li key={t.id}>
                <Link
                  to={`/trip/${t.id}`}
                  className="flex w-full border border-foreground/15 hover:border-foreground transition-colors min-h-[110px]"
                >
                  <div
                    className="relative overflow-hidden shrink-0"
                    style={{ width: "38%" }}
                  >
                    <img
                      src={t.cover}
                      alt={t.city}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ filter: "saturate(0.75)" }}
                    />
                  </div>
                  <div
                    className="flex flex-col justify-between p-4"
                    style={{ width: "62%" }}
                  >
                    <div>
                      <div className="font-serif leading-tight" style={{ fontSize: "18px" }}>
                        {t.city}
                      </div>
                      <div
                        className="font-sans text-muted-foreground mt-1"
                        style={{ fontSize: "10px", letterSpacing: "0.04em" }}
                      >
                        {t.dates}
                      </div>
                    </div>
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 uppercase ${
                          statusStyles[t.status] ?? statusStyles.planning
                        }`}
                        style={{ fontSize: "8px", letterSpacing: "0.18em" }}
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Field note — linen surface w/ left ink hairline */}
      <section className="mt-12 px-5">
        <div
          className="grid grid-cols-5 gap-0 items-stretch"
          style={{
            background: "#EFE9DF",
            borderLeft: "1.5px solid rgba(26,26,24,0.15)",
          }}
        >
          <div className="col-span-3 relative h-[200px]">
            <img
              src={fieldnote}
              alt="A flat-lay of a cream linen shirt, wide-leg trousers, leather mules and a rust silk scarf on warm stone"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-span-2 p-4 flex flex-col justify-between">
            <div className="editorial-eyebrow text-muted-foreground">Field note</div>
            <p className="italic-serif text-[15px] leading-tight">
              "Pack like you live there, not like you visit."
            </p>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              — Cura, on packing
            </div>
          </div>
        </div>
      </section>

      {/* ELSEWHERE — horizontal scroll of editorial destination cards.
          Flight-time chip top-left (utility, stays ink), serif name + tagline below. */}
      {elsewhere.length > 0 && (
        <section className="mt-10">
          <div className="flex items-baseline justify-between mb-3 px-5">
            <h2 className="font-serif text-[22px] leading-none">
              A small list of <span className="italic">elsewhere</span>
            </h2>
            <Link
              to="/discover"
              className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              All <ArrowRight className="h-3 w-3 -rotate-45" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5 pb-1">
            {elsewhere.map((d) => (
              <Link
                key={d.id}
                to="/discover"
                className="snap-start shrink-0 w-[42%] group"
              >
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <img
                    src={d.cover}
                    alt={`${d.name}, ${d.country}`}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80";
                    }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-ink text-ink-foreground px-1.5 py-0.5 text-[10px] tracking-[0.12em] uppercase z-10">
                    {d.flightHrs}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="font-serif text-[17px] leading-tight">{d.name}</div>
                  <div className="italic-serif text-[12px] text-foreground/65 mt-0.5 line-clamp-1">
                    {d.tagline}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FROM THE ARCHIVE — bordered editorial card per past trip.
          Copy left, narrow tall image right. Memory layer. */}
      {archive.length > 0 && (
        <section className="mt-10 px-5">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-serif text-[22px] leading-none">
              From the <span className="italic">archive</span>
            </h2>
            <Link
              to="/journal"
              className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
            >
              Journal
            </Link>
          </div>
          <ul>
            {archive.map((j, idx) => (
              <li
                key={j.day}
                style={
                  idx > 0
                    ? { borderTop: "0.5px solid hsl(var(--ink) / 0.1)" }
                    : undefined
                }
              >
                <Link
                  to="/journal"
                  className="grid grid-cols-[1fr_120px] hover:bg-foreground/[0.02] transition-colors overflow-hidden"
                >
                  <div className="p-4 flex flex-col justify-between gap-3">
                    <div className="editorial-eyebrow text-muted-foreground">
                      {j.dateRange ?? j.day}
                    </div>
                    <div className="font-serif text-[26px] leading-none">
                      {j.city ?? j.day}
                    </div>
                    <p className="italic-serif text-[13px] leading-snug text-foreground/75">
                      "{j.quote ?? j.highlight}"
                    </p>
                  </div>
                  {j.cover && (
                    <div className="relative h-full min-h-[150px]">
                      <img
                        src={j.cover}
                        alt={j.city ?? j.day}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Editorial imprint — matched to Welcome (No. 001 · Vol. I · Spring) */}
      <footer
        aria-label="Edition imprint"
        className="px-5 pt-8 pb-4 flex justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/35 select-none"
      >
        <span>No. 001</span>
        <span>Vol. I · Spring</span>
      </footer>

      <BottomNav />
    </main>
  );
};

export default Home;
