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
    <main className="app-shell pb-20">
      <header className="px-5 pt-6 pb-2">
        <div className="editorial-eyebrow text-muted-foreground">You</div>
      </header>

      {/* Identity block — three short lines, serif name. */}
      <section className="px-5 pt-4 pb-8 cura-rise">
        <h1 className="font-serif text-[40px] leading-[0.95] tracking-tight">
          Nourhan
        </h1>
        <div className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Home</span>
            <span>Cairo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Passport</span>
            <span>Egyptian</span>
          </div>
        </div>
      </section>

      {/* Chapters — tappable rows, label + arrow. Routes nowhere yet. */}
      <section>
        <ul className="border-t border-foreground/15">
          {chapters.map((c) => (
            <li key={c.label} className="border-b border-foreground/15">
              <Link
                to="#"
                className="flex items-center justify-between px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
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
        className="px-5 pt-8 pb-4 flex justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/35 select-none"
      >
        <span>No. 001</span>
        <span>Vol. I · Spring</span>
      </footer>

      <BottomNav />
    </main>
  );
};

export default Profile;
