import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { trips } from "@/data/cura";

/**
 * Trips — clean list of all trips.
 * Each row: destination · dates · status tag · readiness%.
 * Tap → trip workspace. No image-heavy cards here; that's Home's job.
 */

const statusLabel: Record<string, string> = {
  dreaming: "DREAMING",
  planning: "PLANNING",
  ready: "READY",
  live: "ACTIVE",
  memory: "PAST",
};

const statusStyles: Record<string, string> = {
  dreaming: "bg-accent-sky text-foreground",
  planning: "bg-accent-ochre text-white",
  ready: "bg-accent-olive text-white",
  live: "bg-accent-rust text-white",
  memory: "bg-accent-rose text-white",
};

const Trips = () => {
  const sorted = [...trips].sort((a, b) => {
    // future first, past last
    const aPast = a.status === "memory" ? 1 : 0;
    const bPast = b.status === "memory" ? 1 : 0;
    if (aPast !== bPast) return aPast - bPast;
    return a.daysOut - b.daysOut;
  });

  // Empty state — CURA voice, single CTA.
  if (trips.length === 0) {
    return (
      <main className="app-shell pb-20 flex flex-col">
        <header className="px-5 pt-6 pb-2">
          <div className="editorial-eyebrow text-muted-foreground">Trips</div>
        </header>
        <section className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <h1 className="font-serif text-[32px] leading-[1.05] max-w-[16ch]">
            No trips yet. The first one is the hardest to name.
          </h1>
          <Link
            to="/begin"
            className="mt-8 inline-flex items-center gap-2 border border-foreground px-6 py-3 text-sm tracking-[0.12em] uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            Begin
          </Link>
        </section>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="app-shell pb-20">
      <header className="px-5 pt-6 pb-2 flex items-start justify-between">
        <div>
          <div className="editorial-eyebrow text-muted-foreground">Trips</div>
          <h1 className="font-serif text-[40px] leading-[0.95] tracking-tight mt-1">
            All of them
          </h1>
        </div>
      </header>

      <section className="px-5 mt-5">
        <CuraWhisper variant="block">
          One in motion, one still a feeling, one finished. That's a healthy shelf.
        </CuraWhisper>
      </section>

      {/* Trip list — vertical, hairline divided. */}
      <section className="mt-8">
        <ul className="border-t border-foreground/15">
          {sorted.map((t) => (
            <li key={t.id} className="border-b border-foreground/15">
              <Link
                to={`/trip/${t.id}`}
                className="flex items-center justify-between gap-4 px-5 py-5 hover:bg-foreground/[0.03] transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-serif text-[24px] leading-none truncate">
                    {t.city}
                  </div>
                  <div className="editorial-eyebrow text-muted-foreground mt-2">
                    {t.dates}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-[0.16em] uppercase ${
                      statusStyles[t.status] ?? statusStyles.planning
                    }`}
                  >
                    {statusLabel[t.status] ?? t.status}
                  </span>
                  <div className="text-[11px] text-muted-foreground mt-2">
                    {t.readiness}% ready
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* New trip — subtle, not a loud button. */}
      <section className="px-5 mt-6">
        <Link
          to="/trip/new"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          New trip
        </Link>
      </section>

      <footer
        aria-label="Edition imprint"
        className="px-5 pt-10 pb-4 flex justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/35 select-none"
      >
        <span>No. 001</span>
        <span>Vol. I · Spring</span>
      </footer>

      <BottomNav />
    </main>
  );
};

export default Trips;
