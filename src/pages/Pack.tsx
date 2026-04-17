import { useState } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { TripTabs } from "@/components/cura/TripTabs";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { Tag } from "@/components/cura/Tag";
import { packing } from "@/data/cura";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Pack = () => {
  const [items, setItems] = useState(packing);
  const toggle = (i: number) => setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, packed: !it.packed } : it)));
  const grouped = items.reduce<Record<string, { it: typeof items[0]; idx: number }[]>>((acc, it, idx) => {
    (acc[it.category] ||= []).push({ it, idx });
    return acc;
  }, {});
  const done = items.filter((i) => i.packed).length;

  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Pack" title="Puglia · 10 days" />
      <TripTabs tripId="puglia-25" />

      <section className="px-5 pt-4 cura-rise">
        <div className="flex items-end justify-between">
          <h1 className="display-md max-w-[14ch]">
            Pack like you <span className="italic-serif">live</span> there.
          </h1>
          <div className="text-right">
            <div className="font-serif text-2xl leading-none">{done}<span className="text-muted-foreground text-sm">/{items.length}</span></div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">Packed</div>
          </div>
        </div>
      </section>

      <section className="px-5 mt-5">
        <CuraWhisper>
          The slip dress isn't packed. Day 1 dinner is dressy and you said you don't want to repeat.
        </CuraWhisper>
      </section>

      {/* Outfit moments — editorial preview, links to full Outfits engine */}
      <section className="mt-7 px-5">
        <div className="flex items-baseline justify-between mb-3">
          <div className="editorial-eyebrow text-muted-foreground">Outfit moments</div>
          <Link to="/outfits" className="text-[11px] tracking-[0.18em] uppercase text-primary">Open outfits →</Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { tag: "airport", look: "Linen set + slip-ons" },
            { tag: "dinner", look: "Slip dress + gold" },
            { tag: "beach", look: "Swim under shirt" },
            { tag: "sunset", look: "White dress" },
          ].map((m) => (
            <div key={m.tag} className="border border-foreground/15 p-3">
              <Tag variant="ink">{m.tag}</Tag>
              <div className="font-serif text-base leading-tight mt-2">{m.look}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Packing list grouped */}
      <section className="mt-9">
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="border-t border-foreground/15">
            <div className="px-5 pt-4 pb-2 editorial-eyebrow text-muted-foreground">{cat}</div>
            <ul>
              {list.map(({ it, idx }) => (
                <li key={idx}>
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-paper transition-colors"
                  >
                    <span className={cn("w-5 h-5 border flex items-center justify-center", it.packed ? "bg-ink border-ink" : "border-foreground/40")}>
                      {it.packed && <Check className="h-3 w-3 text-ink-foreground" strokeWidth={2} />}
                    </span>
                    <div className="flex-1">
                      <div className={cn("font-serif text-base leading-none", it.packed && "line-through text-muted-foreground")}>{it.name}</div>
                      {it.note && <div className="text-[11px] text-primary mt-1 italic-serif">{it.note}</div>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-6 px-5">
        <button className="w-full border border-foreground bg-ink text-ink-foreground px-4 py-3 text-sm">
          Find shopping gaps →
        </button>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Pack;
