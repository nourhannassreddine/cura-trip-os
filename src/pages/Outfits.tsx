import { useState } from "react";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { TripTabs } from "@/components/cura/TripTabs";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { wardrobe, outfitLooks, itinerary, WardrobeItem } from "@/data/cura";
import { Upload, Plus, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const Outfits = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [picker, setPicker] = useState<string | null>(null); // moment id being assigned

  const dayLooks = outfitLooks.filter((l) => l.day === selectedDay);
  const overused = wardrobe.filter((w) => w.uses >= 3);
  const itemMap: Record<string, WardrobeItem> = Object.fromEntries(wardrobe.map((w) => [w.id, w]));
  const dayBlocks = itinerary[selectedDay].blocks.filter((b) => b.type !== "travel");

  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Outfits" title="Puglia · 10 days" />
      <TripTabs tripId="puglia-25" />

      {/* Editorial header */}
      <section className="px-5 pt-4 cura-rise">
        <div className="grid grid-cols-12 gap-2 items-end">
          <h1 className="display-md col-span-8 leading-[0.95]">
            What you'll <span className="italic-serif">wear</span>, when.
          </h1>
          <div className="col-span-4 text-right">
            <div className="font-serif text-2xl leading-none">{outfitLooks.length}<span className="text-muted-foreground text-sm">/{itinerary.length * 2}</span></div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">Looks set</div>
          </div>
        </div>
      </section>

      {/* CURA opinion */}
      <section className="px-5 mt-5">
        <CuraWhisper variant="opinion" certainty="sure">
          The olive shirt is on three days. That's overuse — your photos will look like the same trip on loop.
        </CuraWhisper>
      </section>

      {/* Wardrobe — uploads + tagged items */}
      <section className="mt-8">
        <div className="px-5 flex items-baseline justify-between">
          <h2 className="font-serif text-xl">Wardrobe</h2>
          <button className="text-[11px] tracking-[0.18em] uppercase text-primary inline-flex items-center gap-1.5">
            <Upload className="h-3.5 w-3.5" strokeWidth={1.5} /> Upload
          </button>
        </div>
        <div className="mt-3 px-5 grid grid-cols-4 gap-2">
          {wardrobe.map((w) => (
            <div key={w.id} className="border border-foreground/15 bg-background">
              <div className="aspect-square relative" style={{ background: w.swatch }}>
                {w.uses >= 3 && (
                  <div className="absolute top-1 right-1 bg-ink text-ink-foreground text-[9px] tracking-wider uppercase px-1">
                    ×{w.uses}
                  </div>
                )}
              </div>
              <div className="p-1.5">
                <div className="font-serif text-[11px] leading-tight truncate">{w.name}</div>
                <div className="text-[9px] tracking-[0.14em] uppercase text-muted-foreground mt-0.5">{w.category}</div>
              </div>
            </div>
          ))}
          <button className="border border-dashed border-foreground/30 aspect-square flex items-center justify-center text-muted-foreground hover:border-foreground hover:text-foreground">
            <Plus className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* Overuse + missing flags */}
      <section className="mt-8 px-5 space-y-3">
        <div className="border border-foreground/30 bg-paper-deep p-3">
          <div className="flex items-center gap-2 editorial-eyebrow text-foreground mb-2">
            <AlertTriangle className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
            Cura sees
          </div>
          <ul className="space-y-1.5 text-sm">
            <li className="flex justify-between gap-2">
              <span className="italic-serif">Olive button-down</span>
              <span className="text-muted-foreground">3 uses · drop one</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className="italic-serif">Closed shoes</span>
              <span className="text-muted-foreground">missing · day 2 olive grove</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className="italic-serif">A second swimsuit</span>
              <span className="text-muted-foreground">recommended · 4 swim days</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Day-by-day moment assignment */}
      <section className="mt-9">
        <div className="px-5 editorial-eyebrow text-muted-foreground mb-3">Moments</div>

        <div className="px-5 flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {itinerary.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={cn(
                "shrink-0 px-3 py-2 border text-left",
                i === selectedDay ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/20"
              )}
            >
              <div className={cn("editorial-eyebrow", i === selectedDay ? "opacity-70" : "text-muted-foreground")}>{d.date.split(" · ")[0]}</div>
              <div className="font-serif text-sm leading-none mt-0.5">Day {String(i + 1).padStart(2, "0")}</div>
            </button>
          ))}
        </div>

        <ul className="mt-3 border-t border-foreground/15">
          {dayBlocks.map((b) => {
            const look = dayLooks.find((l) => l.moment === b.title);
            return (
              <li key={b.title} className="border-b border-foreground/10 px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="editorial-eyebrow text-muted-foreground">{b.time}</div>
                    <div className="font-serif text-base leading-tight mt-0.5">{b.title}</div>
                    {look?.note && <p className="italic-serif text-[12px] text-foreground/60 mt-1">{look.note}</p>}
                  </div>
                  <Tag variant={look ? "olive" : "outline"}>{look ? "set" : "open"}</Tag>
                </div>
                {look ? (
                  <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                    {look.itemIds.map((id) => {
                      const it = itemMap[id];
                      return (
                        <div key={id} className="flex items-center gap-1.5 border border-foreground/20 pr-2">
                          <span className="h-7 w-7 inline-block" style={{ background: it.swatch }} />
                          <span className="text-[11px]">{it.name}</span>
                        </div>
                      );
                    })}
                    {look.warning && (
                      <div className="basis-full mt-1 text-[11px] text-primary italic-serif">⚠ {look.warning}</div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setPicker(picker === b.title ? null : b.title)}
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-primary"
                  >
                    <Plus className="h-3 w-3" strokeWidth={1.5} /> Assign outfit
                  </button>
                )}
                {picker === b.title && (
                  <div className="mt-3 grid grid-cols-5 gap-1.5">
                    {wardrobe.slice(0, 10).map((w) => (
                      <button
                        key={w.id}
                        className="aspect-square border border-foreground/20 hover:border-foreground"
                        style={{ background: w.swatch }}
                        title={w.name}
                      />
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* CURA suggestion */}
      <section className="mt-8 px-5">
        <CuraWhisper>
          For Day 3 lunch, I'd pair the cream linen with the straw tote — you haven't used it yet, and it photographs well in midday light.
        </CuraWhisper>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Outfits;
