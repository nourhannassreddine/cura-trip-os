import { Link } from "react-router-dom";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { destinations } from "@/data/cura";
import { Sparkles, Shuffle } from "lucide-react";

const moods = [
  "Sun-faded slow",
  "Honeymoon",
  "Girls trip",
  "Solo & creative",
  "First Europe",
  "Surprise me",
  "Return to favorite",
];

const Discover = () => {
  return (
    <main className="app-shell pb-20">
      <TopBar eyebrow="Discover" title="Where next" right={<button className="p-2 hover:opacity-70" aria-label="Surprise"><Shuffle className="h-5 w-5" strokeWidth={1.5} /></button>} />

      <section className="px-5 pt-2 cura-rise">
        <h1 className="display-lg max-w-[12ch]">
          Pick a <span className="italic-serif">feeling</span>, not a place.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-[36ch]">
          Tell me a mood. I'll match it to a place that fits your taste, your wallet, and the weeks you have free.
        </p>
      </section>

      {/* Mood chips */}
      <section className="mt-6 px-5 flex flex-wrap gap-2">
        {moods.map((m, i) => (
          <button
            key={m}
            className={`px-3 py-2 border text-sm font-sans transition-colors ${i === 0 ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/25 hover:border-foreground"}`}
          >
            {m}
          </button>
        ))}
      </section>

      <section className="mt-7 px-5">
        <CuraWhisper>
          For "sun-faded slow" in early summer, three places came up. I sorted them by how much
          decision you'll have to make.
        </CuraWhisper>
      </section>

      {/* Destinations */}
      <section className="mt-7 space-y-5">
        {destinations.map((d, i) => (
          <article key={d.id} className="px-5">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-7 relative h-[220px] overflow-hidden">
                <img src={d.cover} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute top-2 left-2"><Tag variant="ink">{`No. ${String(i + 1).padStart(2, "0")}`}</Tag></div>
              </div>
              <div className="col-span-5 flex flex-col justify-between">
                <div>
                  <div className="editorial-eyebrow text-muted-foreground">{d.country}</div>
                  <div className="font-serif text-2xl leading-tight">{d.name}</div>
                  <div className="italic-serif text-[13px] text-foreground/70 mt-1">{d.tagline}</div>
                </div>
                <ul className="text-[11px] tracking-wider text-muted-foreground space-y-1">
                  <li className="flex justify-between"><span>Visa</span><span className="text-foreground capitalize">{d.visa}</span></li>
                  <li className="flex justify-between"><span>Flight</span><span className="text-foreground">{d.flightHrs}</span></li>
                  <li className="flex justify-between"><span>/day</span><span className="text-foreground">{d.dailySpend}</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {d.bestFor.map((b) => <Tag key={b} variant="outline">{b}</Tag>)}
              </div>
              <Link to="/compare" className="text-[11px] tracking-[0.16em] uppercase text-primary">Compare →</Link>
            </div>
          </article>
        ))}
      </section>

      {/* Decision fatigue reducer */}
      <section className="mt-12 px-5">
        <div className="border border-foreground p-5 bg-paper">
          <Sparkles className="h-4 w-4 text-primary mb-3" strokeWidth={1.5} />
          <div className="editorial-eyebrow text-primary mb-2">For when you can't decide</div>
          <h3 className="font-serif text-2xl leading-tight">
            Let me <span className="italic-serif">choose</span> for you.
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-[34ch]">
            I'll pick one of the three, draft the trip end-to-end, and you only confirm or veto.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 border border-foreground bg-ink text-ink-foreground px-4 py-2.5 text-sm">
            Decide for me
          </button>
        </div>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Discover;
