import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { spend } from "@/data/cura";

const Spend = () => {
  const total = spend.reduce((s, x) => s + x.amount, 0);
  const budget = 4200;
  const pct = Math.round((total / budget) * 100);

  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Spend" title="Puglia · split with Maya" />

      <section className="px-5 pt-2 cura-rise">
        <div className="editorial-eyebrow text-muted-foreground">Trip budget</div>
        <h1 className="display-xl leading-[0.85] mt-1">€{total.toLocaleString()}</h1>
        <div className="mt-2 text-sm text-muted-foreground">of €{budget.toLocaleString()} planned · {pct}%</div>

        <div className="mt-4 h-px bg-foreground/15 relative">
          <div className="absolute h-px bg-primary" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <section className="mt-5 px-5">
        <CuraWhisper>
          You're tracking under by €420. Day 4 has a splurge dinner held — go for it, you're fine.
        </CuraWhisper>
      </section>

      {/* Category strip */}
      <section className="mt-7 px-5">
        <div className="grid grid-cols-4 gap-px bg-foreground/15 border border-foreground/15">
          {[
            { l: "Stay", v: "€1,840", c: "olive" },
            { l: "Food", v: "€280", c: "default" },
            { l: "Activity", v: "€40", c: "sky" },
            { l: "Transit", v: "€95", c: "outline" },
          ].map((x) => (
            <div key={x.l} className="bg-background p-3">
              <div className="editorial-eyebrow text-muted-foreground">{x.l}</div>
              <div className="font-serif text-lg mt-1">{x.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Group split */}
      <section className="mt-7 px-5">
        <div className="editorial-eyebrow text-muted-foreground mb-2">Shared wallet</div>
        <div className="border border-foreground/15 p-4 flex items-center justify-between">
          <div>
            <div className="font-serif text-lg">Maya owes you</div>
            <div className="text-xs text-muted-foreground">3 items · last from Day 1</div>
          </div>
          <div className="font-serif text-2xl text-primary">€124</div>
        </div>
      </section>

      {/* Ledger */}
      <section className="mt-9">
        <div className="px-5 editorial-eyebrow text-muted-foreground mb-2">Ledger</div>
        <ul className="border-t border-foreground/15">
          {spend.map((s, i) => (
            <li key={i} className="px-5 py-3 border-b border-foreground/10 grid grid-cols-[1fr_auto] gap-3 items-center">
              <div>
                <div className="font-serif text-base leading-tight">{s.label}</div>
                <div className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground mt-1">{s.day} · {s.who}</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-lg leading-none">{s.currency}{s.amount}</div>
                <Tag variant="outline" className="mt-1">{s.category}</Tag>
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

export default Spend;
