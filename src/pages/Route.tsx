import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { Plane, Train, Car } from "lucide-react";

const segments = [
  { icon: Plane, from: "London LHR", to: "Bari BRI", time: "11:40", date: "Jun 12", meta: "BA · 3h 10m · €214 · 1 stop", note: "Window seat, right side — sea view" },
  { icon: Car, from: "Bari Airport", to: "Ostuni", time: "13:15", date: "Jun 12", meta: "Private driver · 1h 20m · €95" },
  { icon: Train, from: "Ostuni", to: "Lecce", time: "10:02", date: "Jun 18", meta: "Trenitalia · 38m · €9.50" },
  { icon: Plane, from: "Bari BRI", to: "London LHR", time: "16:20", date: "Jun 22", meta: "BA · 3h 25m · €198 · direct" },
];

const Route = () => {
  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Route" title="Door to door" />

      <section className="px-5 pt-2 cura-rise">
        <h1 className="display-md max-w-[14ch]">
          The whole way <span className="italic-serif">there</span>.
        </h1>
        <p className="text-sm text-muted-foreground mt-2">Best route, not just cheapest. CURA scored these for layover pain, luggage logic and timing.</p>
      </section>

      <section className="mt-6 px-5 grid grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
        {[
          { l: "Total cost", v: "€516" },
          { l: "Travel time", v: "5h 25" },
          { l: "Layover pain", v: "Low" },
        ].map((x) => (
          <div key={x.l} className="bg-background p-3">
            <div className="editorial-eyebrow text-muted-foreground">{x.l}</div>
            <div className="font-serif text-lg mt-1">{x.v}</div>
          </div>
        ))}
      </section>

      <section className="mt-7">
        <ol>
          {segments.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={i} className="grid grid-cols-[64px_1fr] gap-3 px-5 py-4 border-b border-foreground/10">
                <div className="text-right">
                  <div className="font-serif text-lg leading-none">{s.time}</div>
                  <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">{s.date}</div>
                </div>
                <div>
                  <div className="flex items-start gap-2">
                    <Icon className="h-4 w-4 mt-1 text-muted-foreground" strokeWidth={1.5} />
                    <div className="flex-1">
                      <div className="font-serif text-base leading-tight">
                        {s.from} <span className="text-muted-foreground italic-serif">to</span> {s.to}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{s.meta}</div>
                      {s.note && <div className="italic-serif text-[13px] text-primary mt-2">{s.note}</div>}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-6 px-5">
        <CuraWhisper>
          The Lecce day-trip is held flexible. Cancel free up to 24h before. I added a fallback bus.
        </CuraWhisper>
      </section>

      <section className="mt-7 px-5">
        <div className="editorial-eyebrow text-muted-foreground mb-2">Stays</div>
        <div className="border border-foreground/15">
          <div className="p-4 border-b border-foreground/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-serif text-lg leading-tight">Masseria Le Carrube</div>
                <div className="text-xs text-muted-foreground mt-0.5">Ostuni · Jun 12 — Jun 18 · 6 nights</div>
              </div>
              <Tag variant="olive">refundable</Tag>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-serif text-lg leading-tight">Palazzo Maresgallo</div>
                <div className="text-xs text-muted-foreground mt-0.5">Lecce · Jun 18 — Jun 22 · 4 nights</div>
              </div>
              <Tag>non-ref</Tag>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Route;
