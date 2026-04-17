import { Link } from "react-router-dom";
import { Plus, Bell, ArrowUpRight } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { Tag } from "@/components/cura/Tag";
import { trips, destinations, curaWhispers } from "@/data/cura";
import still from "@/assets/still-objects.jpg";

const Home = () => {
  const upcoming = trips.filter((t) => t.status !== "memory");
  const memory = trips.find((t) => t.status === "memory");

  return (
    <main className="app-shell pb-20">
      {/* Header — editorial masthead */}
      <header className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <div className="editorial-eyebrow text-muted-foreground">Tuesday · 4:12 pm</div>
          <div className="font-serif text-2xl leading-none mt-0.5">CURA</div>
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

      {/* Greeting — slightly oversized, asymmetric */}
      <section className="px-5 pt-2 pb-6 cura-rise">
        <div className="flex items-end justify-between">
          <h1 className="display-lg max-w-[10ch]">
            Good <br />
            afternoon, <span className="italic-serif">Lia</span>.
          </h1>
          <div className="text-right text-xs text-muted-foreground pb-2">
            <div>38 days</div>
            <div>to Puglia</div>
          </div>
        </div>
      </section>

      {/* CURA whisper — today's note */}
      <section className="px-5">
        <CuraWhisper>{curaWhispers[0]}</CuraWhisper>
      </section>

      {/* Active trips */}
      <section className="mt-8">
        <div className="px-5 flex items-baseline justify-between">
          <h2 className="font-serif text-xl">Your trips</h2>
          <Link to="/trip/new" className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
            + New
          </Link>
        </div>

        <div className="mt-4 space-y-4 px-5">
          {upcoming.map((t, i) => (
            <Link
              key={t.id}
              to={`/trip/${t.id}`}
              className="group block border border-foreground/15 hover:border-foreground transition-colors"
            >
              <div className="grid grid-cols-[140px_1fr] gap-0">
                <div className="relative h-[170px] overflow-hidden">
                  <img
                    src={t.cover}
                    alt={`${t.city}, ${t.country}`}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="editorial-eyebrow text-muted-foreground">{t.country}</div>
                    <div className="font-serif text-2xl leading-tight mt-1">{t.city}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{t.dates}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Tag variant={i === 0 ? "default" : "outline"}>{t.status}</Tag>
                    <div className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                      {t.readiness}% ready
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3">
                <div className="h-px bg-foreground/10 relative">
                  <div className="absolute left-0 top-0 h-px bg-primary" style={{ width: `${t.readiness}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial split — still life + quote */}
      <section className="mt-12 grid grid-cols-5 gap-0 items-stretch">
        <div className="col-span-3 relative h-[200px]">
          <img src={still} alt="Linen, hat, espresso, gold earrings on warm beige" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="col-span-2 bg-paper-deep p-4 flex flex-col justify-between">
          <div className="editorial-eyebrow text-muted-foreground">Field note</div>
          <p className="italic-serif text-[15px] leading-tight">
            "Pack like you live there, not like you visit."
          </p>
          <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">— CURA, on packing</div>
        </div>
      </section>

      {/* Discover strip */}
      <section className="mt-12">
        <div className="px-5 flex items-baseline justify-between">
          <h2 className="font-serif text-xl">A small list of <span className="italic-serif">elsewhere</span></h2>
          <Link to="/discover" className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            All <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {destinations.map((d) => (
            <Link key={d.id} to="/discover" className="shrink-0 w-[180px] group">
              <div className="relative h-[230px] overflow-hidden">
                <img src={d.cover} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-2 left-2"><Tag variant="ink">{d.flightHrs}</Tag></div>
              </div>
              <div className="pt-2">
                <div className="font-serif text-lg leading-none">{d.name}</div>
                <div className="text-[11px] text-muted-foreground mt-1 italic-serif">{d.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Memory */}
      {memory && (
        <section className="mt-12 px-5">
          <h2 className="font-serif text-xl">From the archive</h2>
          <Link to="/journal" className="mt-3 group block border border-foreground/15 hover:border-foreground">
            <div className="grid grid-cols-[1fr_120px]">
              <div className="p-4">
                <div className="editorial-eyebrow text-muted-foreground">{memory.dates}</div>
                <div className="font-serif text-2xl leading-tight mt-1">{memory.city}</div>
                <p className="italic-serif text-sm text-foreground/70 mt-2 max-w-[28ch]">
                  "Yellow afternoons. The pasteis were better the second day."
                </p>
              </div>
              <div className="relative">
                <img src={memory.cover} alt={memory.city} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </Link>
        </section>
      )}

      <footer className="px-5 mt-14 mb-6 flex justify-between text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        <span>CURA · № 001</span>
        <span>Made slowly</span>
      </footer>

      <BottomNav />
    </main>
  );
};

export default Home;
