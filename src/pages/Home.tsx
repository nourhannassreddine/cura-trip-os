import { Link } from "react-router-dom";
import { Plus, Bell, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
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
  dreaming: "bg-accent-sky text-foreground",
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
        <div className="flex items-center gap-1 -mr-2">
          <button aria-label="Notifications" className="p-2 hover:opacity-70">
            <Bell className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <Link to="/trip/new" aria-label="New trip" className="p-2 hover:opacity-70">
            <Plus className="h-5 w-5" strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* Hero — greeting + days-to header. Tight, an entry not the focus. */}
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
        {/* Cura whisper — elevated. More breathing room, slightly heavier
            typographic weight. The first thing felt, not the last noticed. */}
        <div className="mt-7 mb-2">
          <CuraWhisper variant="block" className="text-[16px]">
            {curaWhispers[0]}
          </CuraWhisper>
        </div>
      </section>

      {/* PRIMARY TRIP — control center focal point */}
      {primary && (
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
              <div className="mt-2 h-px bg-foreground/15 relative">
                <div
                  className="absolute left-0 top-0 h-px bg-primary"
                  style={{ width: `${primary.readiness}%` }}
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

      {/* SECONDARY TRIPS — compact list, status sticker on the right */}
      {secondary.length > 0 && (
        <section className="mt-8 px-5">
          <div className="flex items-baseline justify-between mb-3">
            <div className="editorial-eyebrow text-muted-foreground">Also in motion</div>
            <Link
              to="/trips"
              className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
            >
              All trips
            </Link>
          </div>
          <ul className="space-y-2">
            {secondary.map((t) => (
              <li key={t.id}>
                <Link
                  to={`/trip/${t.id}`}
                  className="grid grid-cols-[72px_1fr_auto] items-center gap-3 border border-foreground/15 hover:border-foreground transition-colors"
                >
                  <div className="relative h-[72px] overflow-hidden">
                    <img
                      src={t.cover}
                      alt={t.city}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="py-2">
                    <div className="font-serif text-base leading-none">{t.city}</div>
                    <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">
                      {t.dates}
                    </div>
                  </div>
                  <div className="pr-3 text-right">
                    <StatusSticker status={t.status} />
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {t.readiness}%
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Field note — wrapped in px-5 to share the page's gutter rhythm */}
      <section className="mt-12 px-5">
        <div className="grid grid-cols-5 gap-0 items-stretch border border-foreground/10">
          <div className="col-span-3 relative h-[200px]">
            <img
              src={fieldnote}
              alt="A flat-lay of a cream linen shirt, wide-leg trousers, leather mules and a rust silk scarf on warm stone"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-span-2 bg-paper-deep p-4 flex flex-col justify-between">
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
            <div className="editorial-eyebrow text-muted-foreground">A small list of elsewhere</div>
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
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={d.cover}
                    alt={`${d.name}, ${d.country}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-ink text-ink-foreground px-1.5 py-0.5 text-[10px] tracking-[0.12em] uppercase">
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
            <div className="editorial-eyebrow text-muted-foreground">From the archive</div>
            <Link
              to="/journal"
              className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
            >
              Journal
            </Link>
          </div>
          <ul className="space-y-3">
            {archive.map((j) => (
              <li key={j.day}>
                <Link
                  to="/journal"
                  className="grid grid-cols-[1fr_120px] border border-foreground/15 hover:border-foreground/40 transition-colors overflow-hidden"
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
