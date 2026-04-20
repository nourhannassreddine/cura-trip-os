import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";

/* ------------------------------------------------------------------
   EntryGate — "Where are you right now?"
   Four routes into the system, depending on user intent.
------------------------------------------------------------------ */

const paths = [
  {
    n: "i",
    title: "I don't know where to go",
    sub: "I have the urge, not the plan",
    to: "/onboarding?path=full",
    indent: true,
  },
  {
    n: "ii",
    title: "I have somewhere in mind",
    sub: "Help me shape it properly",
    to: "/onboarding?path=short",
    indent: false,
  },
  {
    n: "iii",
    title: "I'm choosing between places",
    sub: "Help me decide",
    to: "/compare?seed=auto",
    indent: false,
  },
  {
    n: "iv",
    title: "I already have a trip",
    sub: "Organize or improve it",
    to: "/trip/new",
    indent: false,
  },
];

const EntryGate = () => {
  return (
    <main className="app-shell flex flex-col bg-background">
      <TopBar back="/" eyebrow="Entry" title="Begin" />

      <section className="px-6 pt-6 pb-8 cura-rise">
        <div className="editorial-eyebrow text-muted-foreground mb-3">Plate II</div>
        <h1 className="display-lg max-w-[14ch]">
          Where are you <span className="italic-serif">right now?</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-[34ch]">
          Not physically. In the trip.
        </p>
      </section>

      <ul className="border-t border-foreground/15">
        {paths.map((p) => (
          <li key={p.n} className="border-b border-foreground/15">
            <Link
              to={p.to}
              className={
                "group flex items-center justify-between gap-4 py-5 pr-5 transition-colors hover:bg-foreground/[0.03] " +
                (p.indent ? "pl-12" : "pl-5")
              }
            >
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="font-serif italic text-sm text-muted-foreground w-5 shrink-0">
                  {p.n}.
                </span>
                <div className="min-w-0">
                  <div className="font-serif text-[19px] leading-tight">{p.title}</div>
                  <div className="text-[12px] text-muted-foreground mt-1">{p.sub}</div>
                </div>
              </div>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                strokeWidth={1.5}
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="px-6 pt-8 pb-6 mt-auto">
        <p className="italic-serif text-[13px] text-foreground/60 max-w-[30ch]">
          "Most apps ask what you want.<br />
          I ask where you are."
        </p>
        <div className="editorial-eyebrow text-muted-foreground mt-2">Cura · note</div>
      </div>
    </main>
  );
};

export default EntryGate;
