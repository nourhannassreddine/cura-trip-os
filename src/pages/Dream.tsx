import { Link } from "react-router-dom";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { destinations, desireSignals } from "@/data/cura";
import { Shuffle } from "lucide-react";

const moods = [
  "Sun-faded slow",
  "Honeymoon",
  "Girls trip",
  "Solo & creative",
  "First Europe",
  "Surprise me",
  "Return to favorite",
];

const kindLabel: Record<string, string> = {
  "almost": "You almost chose this",
  "like-yours": "Trips like yours",
  "based-on": "Based on your past trips",
  "prefer-over": "You'd prefer this",
};

const Dream = () => {
  const byId = (id: string) => destinations.find((d) => d.id === id)!;

  return (
    <main className="app-shell pb-20">
      <TopBar
        eyebrow="Dream"
        title="A desire engine"
        right={
          <button className="p-2 hover:opacity-70" aria-label="Surprise">
            <Shuffle className="h-5 w-5" strokeWidth={1.5} />
          </button>
        }
      />

      {/* Editorial hero — typographic, asymmetric */}
      <section className="px-5 pt-2 cura-rise">
        <div className="grid grid-cols-12 gap-2 items-end">
          <h1 className="display-xl col-span-9 leading-[0.88]">
            What you <span className="italic-serif text-primary">almost</span><br />went for.
          </h1>
          <div className="col-span-3 text-right text-[10px] tracking-[0.22em] uppercase text-muted-foreground pb-2">
            Vol. 02<br />Desire
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground max-w-[36ch]">
          Not a feed. Not a search. A list of places I'm fairly sure you'd love — and one I'm willing to argue for.
        </p>
      </section>

      {/* The 4 desire signals — each is its own editorial spread */}
      <section className="mt-8 space-y-px bg-foreground/15">
        {desireSignals.map((s, i) => {
          const d = byId(s.destinationId);
          const tall = i % 2 === 0;
          return (
            <article key={i} className="bg-background">
              <div className={`grid ${tall ? "grid-cols-[1fr_140px]" : "grid-cols-[140px_1fr]"} gap-0`}>
                {tall ? (
                  <div className="p-5">
                    <div className="editorial-eyebrow text-primary">{kindLabel[s.kind]}</div>
                    <h2 className="font-serif text-[26px] leading-[1.05] mt-2 max-w-[18ch]">{s.headline}</h2>
                    <p className="italic-serif text-[14px] text-foreground/70 mt-3 leading-snug">{s.reason}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Tag variant="ink">{d.name}</Tag>
                      <Tag variant="outline">{d.flightHrs}</Tag>
                      <Tag variant="outline">{d.dailySpend}/day</Tag>
                    </div>
                    {s.kind === "prefer-over" && (
                      <div className="mt-3 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                        instead of <span className="text-foreground">{s.comparedTo}</span>
                      </div>
                    )}
                    <Link to="/compare" className="mt-4 inline-block text-[11px] tracking-[0.18em] uppercase text-primary">
                      Open →
                    </Link>
                  </div>
                ) : null}

                <div className="relative h-[230px] overflow-hidden">
                  <img src={d.cover} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute top-2 left-2"><Tag variant="ink">No. {String(i + 1).padStart(2, "0")}</Tag></div>
                </div>

                {!tall ? (
                  <div className="p-5">
                    <div className="editorial-eyebrow text-primary">{kindLabel[s.kind]}</div>
                    <h2 className="font-serif text-[26px] leading-[1.05] mt-2 max-w-[18ch]">{s.headline}</h2>
                    <p className="italic-serif text-[14px] text-foreground/70 mt-3 leading-snug">{s.reason}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Tag variant="ink">{d.name}</Tag>
                      <Tag variant="outline">{d.flightHrs}</Tag>
                      <Tag variant="outline">{d.dailySpend}/day</Tag>
                    </div>
                    {s.kind === "prefer-over" && (
                      <div className="mt-3 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                        instead of <span className="text-foreground">{s.comparedTo}</span>
                      </div>
                    )}
                    <Link to="/compare" className="mt-4 inline-block text-[11px] tracking-[0.18em] uppercase text-primary">
                      Open →
                    </Link>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>

      {/* Mood layer — secondary, deeper */}
      <section className="mt-12 px-5">
        <div className="editorial-eyebrow text-muted-foreground mb-3">Or pick a feeling</div>
        <div className="flex flex-wrap gap-2">
          {moods.map((m, i) => (
            <button
              key={m}
              className={`px-3 py-2 border text-sm transition-colors ${
                i === 0 ? "border-foreground bg-ink text-ink-foreground" : "border-foreground/25 hover:border-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5">
        <CuraWhisper variant="opinion" certainty="would-bet">
          For "sun-faded slow" in early summer — it's Puglia. I've stopped pretending it's a tie.
        </CuraWhisper>
      </section>

      {/* Decision fatigue reducer */}
      <section className="mt-12 px-5">
        <div className="border border-foreground p-5 bg-paper">
          <div className="editorial-eyebrow text-primary mb-2">For when you can't decide</div>
          <h3 className="font-serif text-2xl leading-tight">
            Let me <span className="italic-serif">choose</span> for you.
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-[34ch]">
            I'll pick one, draft the trip end-to-end, and you only confirm or veto.
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

export default Dream;
