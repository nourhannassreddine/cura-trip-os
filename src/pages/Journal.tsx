import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { personalityPatterns, journalEntries, trips } from "@/data/cura";
import lisbon from "@/assets/hero-lisbon.jpg";
import still from "@/assets/still-objects.jpg";

const Journal = () => {
  return (
    <main className="app-shell pb-20">
      <TopBar back="/trips" eyebrow="Journal" title="Identity engine" />

      {/* Editorial cover */}
      <section className="relative">
        <div className="relative h-[260px] overflow-hidden">
          <img src={lisbon} alt="Lisbon afternoon" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
        <div className="px-5 -mt-16 relative">
          <div className="editorial-eyebrow text-foreground/80">Vol. III · Autumn</div>
          <h1 className="display-xl leading-[0.85]">
            Yellow <span className="italic-serif">afternoons</span>.
          </h1>
        </div>
      </section>

      {/* IDENTITY ENGINE — travel personality */}
      <section className="px-5 mt-7 cura-rise">
        <div className="editorial-eyebrow text-muted-foreground mb-2">Who you are when you travel</div>
        <h2 className="font-serif text-2xl leading-tight max-w-[20ch]">
          A <span className="italic-serif">portrait</span>, drawn from 14 trips.
        </h2>
      </section>

      <section className="mt-5">
        <ul className="border-t border-foreground/15">
          {personalityPatterns.map((p, i) => (
            <li key={i} className="border-b border-foreground/10 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-serif text-[18px] leading-tight">{p.insight}</div>
                  <div className="italic-serif text-[12px] text-foreground/60 mt-1.5">{p.evidence}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-serif text-lg leading-none">{p.weight}</div>
                  <div className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground mt-0.5">conf.</div>
                </div>
              </div>
              <div className="mt-3 h-px bg-foreground/15 relative">
                <div className="absolute left-0 top-0 h-px bg-primary" style={{ width: `${p.weight}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CURA opinion on the patterns */}
      <section className="px-5 mt-6">
        <CuraWhisper variant="opinion" certainty="would-bet">
          You're not a "see everything" traveler. Stop pretending. Your best trips are the ones where you cut the morning activity.
        </CuraWhisper>
      </section>

      {/* Auto-generated daily narrative */}
      <section className="mt-9 px-5">
        <div className="editorial-eyebrow text-muted-foreground mb-2">From the last trip</div>
        <h2 className="font-serif text-xl">Daily, in your own voice — written for you.</h2>
      </section>

      <section className="mt-4 px-5 space-y-4">
        {journalEntries.map((e, i) => (
          <article key={i} className="border-l-2 border-foreground pl-4">
            <div className="editorial-eyebrow text-muted-foreground">{e.day}</div>
            <p className="font-serif text-[17px] leading-snug mt-1.5">{e.narrative}</p>
            <div className="italic-serif text-[13px] text-primary mt-2">★ {e.highlight}</div>
          </article>
        ))}
      </section>

      {/* Memory mining — lessons saved forward */}
      <section className="mt-9 px-5">
        <CuraWhisper>
          Three lessons I'm carrying forward to every Portugal trip you take. You don't have to remember.
        </CuraWhisper>
        <ul className="mt-4 space-y-2">
          {[
            "Stay in Alfama, not Bairro Alto.",
            "Skip the famous pastel place. Try Manteigaria.",
            "Book sunset dinner at the castle bar 2 weeks ahead.",
          ].map((l) => (
            <li key={l} className="border border-foreground/15 p-3 flex items-center justify-between">
              <span className="font-serif text-[15px]">{l}</span>
              <Tag variant="outline">saved</Tag>
            </li>
          ))}
        </ul>
      </section>

      {/* Recap card — editorial split */}
      <section className="mt-9 grid grid-cols-5">
        <div className="col-span-3 bg-paper-deep p-5 flex flex-col justify-between">
          <div>
            <div className="editorial-eyebrow text-muted-foreground">Recap</div>
            <h2 className="font-serif text-2xl leading-tight mt-1">A 6-photo carousel, made for you.</h2>
          </div>
          <button className="mt-4 self-start border border-foreground bg-ink text-ink-foreground px-3 py-2 text-xs tracking-wider uppercase">
            Generate →
          </button>
        </div>
        <div className="col-span-2 relative">
          <img src={still} alt="Still life" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* Numbers */}
      <section className="mt-9 px-5">
        <h2 className="font-serif text-xl mb-3">Numbers</h2>
        <div className="grid grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
          {[
            { l: "Days", v: "6" },
            { l: "Steps", v: "94k" },
            { l: "Spent", v: "€1,210" },
            { l: "Photos", v: "248" },
            { l: "Pasteis", v: "11" },
            { l: "Mood", v: "Quiet" },
          ].map((x) => (
            <div key={x.l} className="bg-background p-3">
              <div className="editorial-eyebrow text-muted-foreground">{x.l}</div>
              <div className="font-serif text-lg mt-1">{x.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trip archive */}
      <section className="mt-9 px-5">
        <h2 className="font-serif text-xl mb-3">All journals</h2>
        <ul className="space-y-2">
          {trips.map((t) => (
            <li key={t.id} className="border border-foreground/15 grid grid-cols-[80px_1fr]">
              <div className="relative h-[70px] overflow-hidden">
                <img src={t.cover} alt={t.city} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-serif text-base leading-none">{t.city}</div>
                  <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">{t.dates}</div>
                </div>
                <Tag variant="outline">{t.status}</Tag>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Journal;
