import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";

/* ------------------------------------------------------------------
   EntryGate — "Where are you right now?"
   Four routes into the system. Everything (heading, eyebrow, options,
   note) shares the same px-5 left edge so the page feels harmonized.
   Roman numerals act as the visual anchor — labels left-align to them.
------------------------------------------------------------------ */

const paths = [
  {
    n: "i",
    title: "I don't know where to go",
    sub: "I have the urge, not the plan",
    to: "/onboarding?path=full",
  },
  {
    n: "ii",
    title: "I have somewhere in mind",
    sub: "Help me shape it properly",
    to: "/onboarding?path=short",
  },
  {
    n: "iii",
    title: "I'm choosing between places",
    sub: "Help me decide",
    to: "/compare?seed=auto",
  },
  {
    n: "iv",
    title: "I already have a trip",
    sub: "Bring me what you have. I'll do the rest.",
    to: "/trip/import",
  },
];

const EntryGate = () => {
  return (
    <main className="app-shell flex flex-col bg-background">
      <TopBar back="/" eyebrow="Entry" title="Begin" />

      <section className="px-5 pt-5 pb-7 cura-rise">
        <div className="editorial-eyebrow text-muted-foreground mb-3">Plate II</div>
        <h1 className="display-lg max-w-[14ch]">
          Where are you <span className="italic-serif">right now?</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-[34ch]">
          Forget the map. Tell me where your head is.
        </p>
      </section>

      {/* Options share the same px-5 gutter as the heading.
          Numerals sit in a fixed-width column so all titles
          AND subs left-align to the same vertical line. */}
      <ul className="border-t border-foreground/15">
        {paths.map((p) => (
          <li key={p.n} className="border-b border-foreground/15">
            <Link
              to={p.to}
              className="group flex items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-foreground/[0.03]"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="font-serif italic text-sm text-muted-foreground w-6 shrink-0 pt-0.5">
                  {p.n}.
                </span>
                <div className="min-w-0">
                  <div className="font-serif text-[18px] leading-tight">{p.title}</div>
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

      <div className="px-5 pt-7 pb-5 mt-auto">
        <p className="italic-serif text-[13px] text-foreground/60 max-w-[30ch]">
          "Most apps ask what you want. I ask where you are."
        </p>
        <div className="editorial-eyebrow text-muted-foreground mt-2">Cura · note</div>
      </div>
    </main>
  );
};

export default EntryGate;
