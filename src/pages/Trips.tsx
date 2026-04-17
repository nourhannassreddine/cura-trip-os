import { Link } from "react-router-dom";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { trips } from "@/data/cura";
import { Plus } from "lucide-react";

const Trips = () => {
  const upcoming = trips.filter((t) => t.status !== "memory");
  const past = trips.filter((t) => t.status === "memory");

  return (
    <main className="app-shell pb-20">
      <TopBar
        eyebrow="Trips"
        title="All your worlds"
        right={
          <Link to="/trip/new" aria-label="New trip" className="p-2 hover:opacity-70">
            <Plus className="h-5 w-5" strokeWidth={1.5} />
          </Link>
        }
      />

      {/* Editorial header */}
      <section className="px-5 pt-2 cura-rise">
        <div className="flex items-end justify-between">
          <h1 className="display-lg max-w-[10ch] leading-[0.92]">
            <span className="italic-serif">Three</span><br />
            in motion.
          </h1>
          <div className="text-right text-[10px] tracking-[0.22em] uppercase text-muted-foreground pb-2">
            Index<br />of journeys
          </div>
        </div>
      </section>

      <section className="px-5 mt-5">
        <CuraWhisper>
          Puglia is the only one ready to push on. Marrakech is still a feeling. Lisbon is finished — but I'm still learning from it.
        </CuraWhisper>
      </section>

      {/* Active trips — large editorial cards */}
      <section className="mt-8">
        <div className="px-5 editorial-eyebrow text-muted-foreground mb-3">In motion</div>
        <ul className="space-y-px bg-foreground/15">
          {upcoming.map((t, i) => (
            <li key={t.id} className="bg-background">
              <Link to={`/trip/${t.id}`} className="group block">
                <div className="grid grid-cols-[160px_1fr]">
                  <div className="relative h-[180px] overflow-hidden">
                    <img src={t.cover} alt={t.city} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-2 left-2">
                      <Tag variant="ink">№ {String(i + 1).padStart(2, "0")}</Tag>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="editorial-eyebrow text-muted-foreground">{t.country}</div>
                      <div className="font-serif text-[26px] leading-none mt-1">{t.city}</div>
                      <div className="text-xs text-muted-foreground mt-1">{t.dates}</div>
                      <div className="italic-serif text-[12px] text-foreground/60 mt-1">{t.travelers.join(" · ")}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                        <span>{t.status}</span>
                        <span>{t.daysOut > 0 ? `${t.daysOut} days out` : "past"}</span>
                      </div>
                      <div className="mt-2 h-px bg-foreground/15 relative">
                        <div className="absolute left-0 top-0 h-px bg-primary" style={{ width: `${t.readiness}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="mt-10 px-5">
          <div className="editorial-eyebrow text-muted-foreground mb-3">Archive</div>
          <ul className="space-y-2">
            {past.map((t) => (
              <li key={t.id}>
                <Link to="/journal" className="block border border-foreground/15 grid grid-cols-[80px_1fr] hover:border-foreground">
                  <div className="relative h-[80px] overflow-hidden">
                    <img src={t.cover} alt={t.city} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-serif text-base leading-none">{t.city}</div>
                      <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">{t.dates}</div>
                    </div>
                    <Tag variant="outline">memory</Tag>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA — start new */}
      <section className="mt-10 px-5">
        <Link to="/trip/new" className="block border border-foreground bg-ink text-ink-foreground p-5">
          <div className="editorial-eyebrow opacity-70 mb-2">Begin</div>
          <div className="font-serif text-2xl leading-tight">
            Start a <span className="italic-serif">fourth</span>.
          </div>
          <p className="text-xs opacity-70 mt-2">Tell me a feeling, or a place. I'll do the rest.</p>
        </Link>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Trips;
