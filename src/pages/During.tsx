import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { MapPin, Phone, MessageCircle, Wifi, Navigation, Car } from "lucide-react";

const During = () => {
  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Live · Day 02" title="Ostuni" right={<Tag variant="olive">on track</Tag>} />

      {/* Now card */}
      <section className="px-5 pt-2 cura-rise">
        <div className="editorial-eyebrow text-primary cura-pulse">Right now · 13:42</div>
        <h1 className="display-lg leading-[0.9] mt-2 max-w-[14ch]">
          Polignano <span className="italic-serif">lunch</span> in 18 min.
        </h1>
        <div className="mt-3 text-sm text-foreground/70 max-w-[34ch]">
          Grotta Palazzese · table for 2, terrace · 9 min walk from your current spot.
        </div>

        <div className="mt-4 grid grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
          {[
            { l: "Walk", v: "9 min" },
            { l: "Sun", v: "Strong" },
            { l: "Reservation", v: "13:30" },
          ].map((x) => (
            <div key={x.l} className="bg-background p-3">
              <div className="editorial-eyebrow text-muted-foreground">{x.l}</div>
              <div className="font-serif text-base mt-1">{x.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-6 px-5 grid grid-cols-4 gap-2">
        {[
          { icon: Navigation, l: "Route" },
          { icon: Phone, l: "Call" },
          { icon: Car, l: "Driver" },
          { icon: MessageCircle, l: "Group" },
        ].map(({ icon: I, l }) => (
          <button key={l} className="border border-foreground/25 hover:border-foreground p-3 flex flex-col items-center gap-2">
            <I className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.16em] uppercase">{l}</span>
          </button>
        ))}
      </section>

      <section className="mt-7 px-5">
        <CuraWhisper>
          Reservation says terrace. Bring the linen jacket — sun moves off the tables at 14:30, gets breezy.
        </CuraWhisper>
      </section>

      {/* Nearby */}
      <section className="mt-9">
        <div className="px-5 flex items-baseline justify-between">
          <h2 className="font-serif text-xl">Nearby & saved</h2>
          <span className="editorial-eyebrow text-muted-foreground">12 within 1 km</span>
        </div>
        <ul className="mt-3 border-t border-foreground/15">
          {[
            { name: "Quintessenza", tag: "coffee · saved by you", dist: "240 m" },
            { name: "Libreria Mondadori", tag: "rainy-day fallback", dist: "380 m" },
            { name: "Cala Paura cove", tag: "swim spot · CURA pick", dist: "650 m" },
          ].map((p) => (
            <li key={p.name} className="px-5 py-3 border-b border-foreground/10 flex items-start justify-between">
              <div>
                <div className="font-serif text-base leading-tight">{p.name}</div>
                <div className="italic-serif text-[13px] text-foreground/65 mt-0.5">{p.tag}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-1 justify-end"><MapPin className="h-3 w-3" /> {p.dist}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Local tools */}
      <section className="mt-9 px-5">
        <div className="editorial-eyebrow text-muted-foreground mb-2">Local layer</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { l: "FreeNow taxi", n: "ride app" },
            { l: "Trenitalia", n: "trains" },
            { l: "Glovo", n: "delivery" },
            { l: "eSIM · 8.2 GB", n: "data" },
          ].map((x) => (
            <button key={x.l} className="border border-foreground/20 p-3 text-left hover:border-foreground">
              <div className="font-serif text-base leading-tight">{x.l}</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1 flex items-center gap-1">
                <Wifi className="h-3 w-3" /> {x.n}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Tonight */}
      <section className="mt-9 px-5">
        <h2 className="font-serif text-xl">Tonight</h2>
        <div className="mt-3 border border-foreground p-4 bg-paper">
          <div className="editorial-eyebrow text-primary">21:00</div>
          <div className="font-serif text-xl leading-tight mt-1">Pizza in town</div>
          <p className="text-xs text-muted-foreground mt-1">Pizzeria Pugliese · 6 min walk from masseria · low energy planned</p>
        </div>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default During;
