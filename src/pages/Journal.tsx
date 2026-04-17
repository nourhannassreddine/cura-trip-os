import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import lisbon from "@/assets/hero-lisbon.jpg";
import still from "@/assets/still-objects.jpg";

const Journal = () => {
  return (
    <main className="app-shell pb-20">
      <TopBar back="/home" eyebrow="Journal" title="Lisbon · Oct 2024" />

      {/* Cover */}
      <section className="relative">
        <div className="relative h-[280px] overflow-hidden">
          <img src={lisbon} alt="Lisbon afternoon" className="h-full w-full object-cover" />
        </div>
        <div className="px-5 -mt-12 relative">
          <div className="editorial-eyebrow text-foreground/80">Vol. III · Autumn</div>
          <h1 className="display-xl leading-[0.85]">
            Yellow <span className="italic-serif">afternoons</span>.
          </h1>
        </div>
      </section>

      <section className="px-5 mt-5 cura-rise">
        <div className="editorial-eyebrow text-muted-foreground mb-2">Field note</div>
        <p className="font-serif text-[19px] leading-snug">
          The pasteis were better the second day. We walked instead of took the tram and
          everything was downhill anyway. <span className="italic-serif">Note to self:</span> stay in Alfama next time, not Bairro.
        </p>
      </section>

      {/* Memory mining */}
      <section className="mt-8 px-5">
        <CuraWhisper>
          Three lessons I saved for future-you. Want them on every Portugal trip going forward?
        </CuraWhisper>
        <ul className="mt-4 space-y-2">
          {[
            "Stay in Alfama, not Bairro Alto.",
            "Skip the famous pastel place. Try Manteigaria.",
            "Book sunset dinner at the castle bar 2 weeks ahead.",
          ].map((l) => (
            <li key={l} className="border border-foreground/15 p-3 flex items-center justify-between">
              <span className="font-serif text-[15px]">{l}</span>
              <Tag variant="outline">save</Tag>
            </li>
          ))}
        </ul>
      </section>

      {/* Recap card */}
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

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Journal;
