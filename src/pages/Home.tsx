import { Link } from "react-router-dom";
import { Plus, Bell, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { Tag } from "@/components/cura/Tag";
import { trips, curaWhispers, packing } from "@/data/cura";
import fieldnote from "@/assets/home-fieldnote.jpg";

const Home = () => {
  // Active trips, sorted by closest first.
  const active = trips
    .filter((t) => t.status !== "memory")
    .sort((a, b) => a.daysOut - b.daysOut);

  // The one trip the user is actually working on.
  const primary = active[0];
  const secondary = active.slice(1);

  // What's missing: packing items not yet packed (drives "See what's missing")
  const missingCount = packing.filter((p) => !p.packed).length;

  return (
    <main className="app-shell pb-20">
      {/* Header — editorial masthead, locked white-on-paper logo treatment */}
      <header className="px-5 pt-5 pb-2 flex items-center justify-between">
        <div>
          <div className="editorial-eyebrow text-muted-foreground">Tuesday · 4:12 pm</div>
          <div className="font-serif lowercase text-2xl leading-none tracking-tight mt-0.5">
            cura
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button aria-label="Notifications" className="p-2 hover:opacity-70">
            <Bell className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <Link to="/trip/new" aria-label="New trip" className="p-2 hover:opacity-70">
            <Plus className="h-5 w-5" strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* Hero — tightened: greeting + whisper, kept as entry not focus */}
      <section className="px-5 pt-1 pb-4 cura-rise">
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-[40px] leading-[0.95] max-w-[10ch]">
            Good afternoon, <span className="italic-serif">Lia</span>.
          </h1>
          {primary && (
            <div className="text-right text-xs text-muted-foreground pb-1.5">
              <div>{primary.daysOut} days</div>
              <div>to {primary.city}</div>
            </div>
          )}
        </div>
        <div className="mt-4">
          <CuraWhisper variant="inline">{curaWhispers[0]}</CuraWhisper>
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
                <Tag variant="ink">{primary.status}</Tag>
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

            {/* ACTION LAYER — what to do next */}
            <div className="p-4 pt-3">
              <Link
                to={`/trip/${primary.id}`}
                className="group flex items-center justify-between border border-foreground bg-ink text-ink-foreground px-4 py-3"
              >
                <span className="font-sans text-sm tracking-wide">Continue planning</span>
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

      {/* SECONDARY TRIPS — compact list */}
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
                    <Tag variant="outline">{t.status}</Tag>
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

      {/* Field note — editorial breathing room, no brand mention */}
      <section className="mt-12 grid grid-cols-5 gap-0 items-stretch">
        <div className="col-span-3 relative h-[200px]">
          <img
            src={fieldnote}
            alt="Linen, straw hat, leather sandals and a gold hoop on warm beige stone"
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
      </section>

      {/* Editorial imprint — consistent with Welcome */}
      <footer
        aria-label="Edition imprint"
        className="px-5 pt-6 pb-4 flex justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/35 select-none"
      >
        <span>No. 001</span>
        <span>Vol. I · Spring</span>
      </footer>

      <BottomNav />
    </main>
  );
};

export default Home;
