import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";

/**
 * You — quiet profile surface.
 * Header: ink black. Linen avatar circle (no ghost initial), name in ivory Playfair.
 * Then a paper-toned CURA intro, then 8 chapter rows that each route to their own screen.
 */

const chapters = [
  {
    title: "How you travel",
    sub: "THE PACE, THE PEOPLE, THE NON-NEGOTIABLES.",
    to: "/profile/how-you-travel",
  },
  {
    title: "What you travel for",
    sub: "THE MOODS AND FEELINGS THAT SHAPE WHERE YOU GO.",
    to: "/profile/what-you-travel-for",
  },
  {
    title: "What travel means to you",
    sub: "THE REASON UNDERNEATH EVERY TRIP.",
    to: "/profile/what-travel-means",
  },
  {
    title: "Your rhythm",
    sub: "YOUR CYCLE, YOUR ENERGY — MAPPED TO YOUR TRIPS.",
    to: "/profile/your-rhythm",
  },
  {
    title: "In transit",
    sub: "WHAT YOU WATCH, READ, AND LISTEN TO BETWEEN HERE AND THERE.",
    to: "/profile/in-transit",
  },
  {
    title: "Where you've been",
    sub: "EVERY PLACE YOU'VE LANDED. WHAT YOU THOUGHT OF IT.",
    to: "/profile/where-youve-been",
  },
  {
    title: "What Cura knows",
    sub: "A READ OF YOU, BASED ON EVERYTHING SO FAR.",
    to: "/profile/what-cura-knows",
  },
  {
    title: "Your plan",
    sub: "HOW YOU ACCESS CURA.",
    to: "/profile/your-plan",
  },
];

const Profile = () => {
  return (
    <main className="app-shell pb-24">
      {/* Portrait header — ink black, linen avatar, ivory name */}
      <header
        className="px-5 pt-8 pb-7"
        style={{
          backgroundColor: "hsl(var(--ink))",
          color: "hsl(var(--ink-foreground))",
        }}
      >
        <div
          className="text-[10px] tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--ink-foreground) / 0.55)" }}
        >
          You
        </div>

        {/* Avatar placeholder — linen circle with "Add your look" caption */}
        <button
          type="button"
          aria-label="Add your look"
          className="block mt-5 hover:opacity-90 transition-opacity"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "9999px",
            backgroundColor: "#EFE9DF",
            border: "0.5px solid rgba(26,26,24,0.15)",
          }}
        >
          <span
            className="font-sans uppercase"
            style={{
              fontSize: "8px",
              letterSpacing: "0.18em",
              color: "rgba(26,26,24,0.4)",
              fontWeight: 500,
              display: "block",
              textAlign: "center",
              lineHeight: 1.2,
              padding: "0 6px",
            }}
          >
            Add your look
          </span>
        </button>

        <h1
          className="font-serif leading-[0.95] tracking-tight mt-5"
          style={{ fontSize: "36px" }}
        >
          Nourhan
        </h1>

        <div
          className="mt-4 space-y-1 text-[12px] tracking-[0.04em]"
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
      </header>

      {/* CURA intro block — paper bg, italic Playfair */}
      <section
        style={{
          backgroundColor: "hsl(var(--paper))",
          padding: "20px 22px",
          borderBottom: "0.5px solid rgba(26,26,24,0.10)",
        }}
      >
        <p
          className="italic-serif"
          style={{
            fontSize: "15px",
            lineHeight: 1.5,
            color: "hsl(var(--foreground) / 0.65)",
          }}
        >
          I've been paying attention. This is what I know about how you travel. Tell me where I'm wrong.
        </p>
      </section>

      {/* Chapter rows */}
      <section>
        <ul>
          {chapters.map((c) => (
            <li
              key={c.to}
              style={{ borderBottom: "0.5px solid hsl(var(--foreground) / 0.1)" }}
            >
              <Link
                to={c.to}
                className="flex items-center justify-between hover:bg-foreground/[0.03] transition-colors"
                style={{ padding: "18px 22px" }}
              >
                <div className="min-w-0 pr-3">
                  <div
                    className="font-serif"
                    style={{ fontSize: "17px", lineHeight: 1.15, color: "hsl(var(--foreground))" }}
                  >
                    {c.title}
                  </div>
                  <div
                    className="font-sans uppercase mt-1.5"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      color: "hsl(var(--foreground) / 0.35)",
                      fontWeight: 500,
                    }}
                  >
                    {c.sub}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} style={{ color: "hsl(var(--foreground) / 0.45)" }} />
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
