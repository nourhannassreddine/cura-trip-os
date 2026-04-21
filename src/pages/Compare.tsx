import { Link, useSearchParams } from "react-router-dom";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { destinations } from "@/data/cura";


const rows = [
  { key: "visa", label: "Visa effort", get: (d: any) => d.visa, render: (v: string) => <Tag variant={v === "easy" ? "olive" : v === "medium" ? "default" : "outline"}>{v}</Tag> },
  { key: "flight", label: "Flight time", get: (d: any) => d.flightHrs },
  { key: "spend", label: "€ / day", get: (d: any) => d.dailySpend },
  { key: "transit", label: "Internal transit", get: (d: any, i: number) => ["Driver", "Taxis", "Ferry", "Tram"][i] },
  { key: "season", label: "Best window", get: (d: any, i: number) => ["May–Jun", "Mar–Apr", "May–Jun", "Sep–Oct"][i] },
  { key: "fit", label: "Couple fit", get: (d: any, i: number) => ["High", "Med", "High", "Med"][i] },
];

const Compare = () => {
  const [params] = useSearchParams();
  const seeded = params.get("seed") === "auto";
  const list = destinations.slice(0, 3);
  return (
    <main className="app-shell pb-20">
      <TopBar back={seeded ? "/begin" : "/discover"} eyebrow="Compare" title="Side by side" />

      <section className="px-5 pt-2 cura-rise">
        <h1 className="display-md max-w-[14ch]">
          Three places, <span className="italic-serif">one</span> table.
        </h1>
        {seeded && (
          <div className="mt-4 border-l-2 border-primary pl-3">
            <p className="italic-serif text-[14px] leading-snug text-foreground/85 max-w-[36ch]">
              "You didn't bring places. I picked three you'd actually consider."
            </p>
            <div className="mt-1 flex items-center gap-3">
              <span className="editorial-eyebrow text-primary">Cura · seeded</span>
              <Link
                to="/dream"
                className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Bring your own
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="mt-6 overflow-x-auto scrollbar-hide">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 align-bottom border-b border-foreground/20" />
              {list.map((d) => (
                <th key={d.id} className="p-2 align-bottom border-b border-foreground/20">
                  <div className="relative h-[110px] overflow-hidden">
                    <img src={d.cover} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="text-left mt-2">
                    <div className="font-serif text-base leading-none">{d.name}</div>
                    <div className="text-[10px] tracking-wider uppercase text-muted-foreground">{d.country}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-foreground/10">
                <td className="p-3 text-[11px] tracking-[0.16em] uppercase text-muted-foreground align-middle whitespace-nowrap">{r.label}</td>
                {list.map((d, i) => (
                  <td key={d.id} className="p-3 text-sm align-middle font-serif">
                    {r.render ? r.render(r.get(d, i)) : <span>{r.get(d, i)}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-8 px-5">
        <div
          style={{
            background: "#EFE9DF",
            borderLeft: "2px solid #E36414",
            padding: "20px 18px",
          }}
        >
          <div
            style={{
              color: "#E36414",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              marginBottom: "8px",
            }}
          >
            ✦ CURA
          </div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "17px",
              color: "#1A1A18",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Puglia wins on couple fit and food, but it's the most expensive day-to-day.
            Marrakech wins on cost — and design. Want me to draft both and you choose at the end?
          </p>
        </div>
      </section>

      <section className="mt-8 px-5">
        <button className="w-full border border-foreground bg-ink text-ink-foreground px-4 py-3 text-sm">
          Draft both trips →
        </button>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Compare;
