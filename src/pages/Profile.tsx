import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { trips } from "@/data/cura";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <main className="app-shell pb-20">
      <TopBar eyebrow="You" title="Travel identity" />

      <section className="px-5 pt-3 cura-rise">
        <div className="editorial-eyebrow text-muted-foreground">Lia Moretti</div>
        <h1 className="display-lg max-w-[12ch]">
          Slow, design-<span className="italic-serif">forward</span>.
        </h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-[34ch]">
          You travel for atmosphere, not landmarks. You over-pack outfits, under-pack shoes. You don't like rushed mornings.
        </p>
      </section>

      <section className="mt-7 px-5">
        <div className="editorial-eyebrow text-muted-foreground mb-2">Patterns CURA learned</div>
        <ul className="border border-foreground/15">
          {[
            "Books dinner before activities",
            "Always brings a slip dress",
            "Skips breakfast, late lunches",
            "Prefers masserias & ryokans over hotels",
          ].map((p) => (
            <li key={p} className="px-4 py-3 border-b border-foreground/10 last:border-0 flex items-center justify-between">
              <span className="font-serif text-[15px]">{p}</span>
              <Tag variant="outline">learned</Tag>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-7 px-5 grid grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
        {[
          { l: "Trips", v: "14" },
          { l: "Countries", v: "11" },
          { l: "Days away", v: "82" },
        ].map((x) => (
          <div key={x.l} className="bg-background p-3">
            <div className="editorial-eyebrow text-muted-foreground">{x.l}</div>
            <div className="font-serif text-xl mt-1">{x.v}</div>
          </div>
        ))}
      </section>

      <section className="mt-9 px-5">
        <h2 className="font-serif text-xl mb-3">Archive</h2>
        <div className="space-y-2">
          {trips.map((t) => (
            <Link key={t.id} to={t.status === "memory" ? "/journal" : `/trip/${t.id}`} className="border border-foreground/15 grid grid-cols-[80px_1fr] hover:border-foreground">
              <div className="relative h-[80px] overflow-hidden">
                <img src={t.cover} alt={t.city} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-serif text-base leading-none">{t.city}</div>
                  <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">{t.dates}</div>
                </div>
                <Tag variant="outline">{t.status}</Tag>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Profile;
