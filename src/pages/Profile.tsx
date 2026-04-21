import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";

/**
 * You — a quiet profile surface.
 * Sections read like chapters of a person, not settings rows.
 * No forms, no editing UI yet — those come in a later prompt.
 */

const chapters = [
  { label: "How you move", hint: "Travel preferences" },
  { label: "Your cycle", hint: "Period & energy tracking" },
  { label: "What you watch", hint: "Entertainment profile" },
  { label: "Where you've been", hint: "Travel history" },
  { label: "Your subscription", hint: "Plan & billing" },
];

const Profile = () => {
  return (
    <main className="app-shell pb-24">
      {/* Portrait header — ink black with giant ghost initial */}
      <header
        className="relative overflow-hidden"
        style={{
          height: "200px",
          backgroundColor: "hsl(var(--ink))",
          color: "hsl(var(--ink-foreground))",
        }}
      >
        <span
          aria-hidden
          className="font-serif absolute top-1/2 -translate-y-1/2 leading-none select-none pointer-events-none"
          style={{
            right: "-12px",
            fontSize: "140px",
            color: "hsl(var(--ink-foreground) / 0.08)",
          }}
        >
          N
        </span>

        <div className="absolute left-5 bottom-5 right-5">
          <div
            className="text-[9px] tracking-[0.24em] uppercase"
            style={{ color: "hsl(var(--ink-foreground) / 0.55)" }}
          >
            You
          </div>
          <h1
            className="font-serif leading-[0.95] tracking-tight mt-1"
            style={{ fontSize: "40px" }}
          >
            Nourhan
          </h1>
          <div
            className="mt-3 space-y-1 text-[12px] tracking-[0.04em]"
            style={{ color: "hsl(var(--ink-foreground) / 0.7)" }}
          >
            <div className="flex justify-between">
              <span style={{ color: "hsl(var(--ink-foreground) / 0.45)" }}>Home</span>
              <span>Cairo</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "hsl(var(--ink-foreground) / 0.45)" }}>Passport</span>
              <span>Egyptian</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chapters — tappable rows, label + arrow. Routes nowhere yet. */}
      <section className="mt-2">
        <ul className="border-t border-foreground/15">
          {chapters.map((c) => (
            <li key={c.label} className="border-b border-foreground/15">
              <Link
                to="#"
                className="flex items-center justify-between px-5 py-5 hover:bg-foreground/[0.03] transition-colors"
              >
                <div>
                  <div className="font-serif text-[17px] leading-none">
                    {c.label}
                  </div>
                  <div className="editorial-eyebrow text-muted-foreground mt-1.5">
                    {c.hint}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer
        aria-label="Edition imprint"
        className="px-5 mt-8 pb-4 flex justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/35 select-none"
      >
        <span>No. 001</span>
        <span>Vol. I · Spring</span>
      </footer>

      <BottomNav />
    </main>
  );
};

export default Profile;
