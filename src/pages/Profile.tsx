import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";

/**
 * You — profile surface (rebuilt).
 * Header is a full-bleed image with a single dark gradient overlay.
 * Followed by a CURA intro card and 8 color-coded chapter rows.
 */

const chapters = [
  {
    title: "How you travel",
    sub: "THE PACE, THE PEOPLE, THE NON-NEGOTIABLES.",
    color: "#C24E2A",
    to: "/profile/how-you-travel",
  },
  {
    title: "What you travel for",
    sub: "THE MOODS AND FEELINGS THAT SHAPE WHERE YOU GO.",
    color: "#E36414",
    to: "/profile/what-you-travel-for",
  },
  {
    title: "What travel means to you",
    sub: "THE REASON UNDERNEATH EVERY TRIP.",
    color: "#8C1C13",
    to: "/profile/what-travel-means",
  },
  {
    title: "Your rhythm",
    sub: "HOW YOU MOVE. HOW MUCH. HOW OFTEN.",
    color: "#BA181B",
    to: "/profile/your-rhythm",
  },
  {
    title: "In transit",
    sub: "THE GAPS BETWEEN THE DESTINATION.",
    color: "#4FB6C8",
    to: "/profile/in-transit",
  },
  {
    title: "Where you've been",
    sub: "THE RECORD OF YOUR DISTANCES.",
    color: "#6B7D3D",
    to: "/profile/where-youve-been",
  },
  {
    title: "What Cura knows",
    sub: "THE CONCLUSIONS I'VE DRAWN.",
    color: "#F2C94C",
    to: "/profile/what-cura-knows",
  },
  {
    title: "Your plan",
    sub: "WHERE THIS IS GOING.",
    color: "rgba(26,26,24,0.15)",
    to: "/profile/your-plan",
    noWash: true,
  },
];

// Convert hex to rgba with alpha. Pass-through for already rgba() strings.
const toWash = (color: string, alpha = 0.04) => {
  if (color.startsWith("rgba") || color.startsWith("rgb")) return color;
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const Profile = () => {
  return (
    <main className="app-shell pb-24" style={{ backgroundColor: "#F5F0E8" }}>
      {/* SECTION 1 — Image header */}
      <header
        className="relative"
        style={{ height: "260px", overflow: "hidden" }}
      >
        <img
          src="https://res.cloudinary.com/dvfzz0min/image/upload/v1777349929/mirror_xmg1ku.png"
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="relative h-full flex flex-col" style={{ padding: "16px 20px" }}>
          <div className="flex items-center justify-between">
            <div
              className="font-serif lowercase"
              style={{
                fontSize: "24px",
                lineHeight: 1,
                color: "#F5F0E8",
                letterSpacing: "-0.01em",
              }}
            >
              cura
            </div>
            <div
              className="font-sans"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.12em",
                color: "rgba(245,240,232,0.75)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              YOU
            </div>
          </div>

          <button
            type="button"
            aria-label="Build your look"
            className="mt-4 flex items-center justify-center hover:opacity-90 transition-opacity"
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "9999px",
              backgroundColor: "rgba(194,78,42,0.55)",
              border: "2px dashed rgba(245,240,232,0.85)",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                letterSpacing: "0.1em",
                color: "#F5F0E8",
                textTransform: "uppercase",
                fontWeight: 500,
                textAlign: "center",
                lineHeight: 1.2,
                padding: "0 12px",
              }}
            >
              BUILD YOUR LOOK
            </span>
          </button>

          <h1
            className="font-serif leading-[0.98] tracking-tight mt-auto"
            style={{ fontSize: "28px", color: "#F5F0E8" }}
          >
            Nourhan
          </h1>
          <div
            className="mt-1.5"
            style={{
              fontSize: "11px",
              color: "rgba(245,240,232,0.6)",
            }}
          >
            Lebanese · Dubai · 4 Trips
          </div>
        </div>
      </header>

      {/* SECTION 2 — CURA intro (typographic, no surface) */}
      <section style={{ padding: "28px 20px 24px 20px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#C24E2A",
            marginBottom: "10px",
            lineHeight: 1,
            display: "block",
          }}
        >
          ✦
        </div>
        <p
          className="font-serif italic"
          style={{
            fontSize: "15px",
            lineHeight: 1.65,
            color: "rgba(26,26,24,0.55)",
          }}
        >
          I've been paying attention. This is what I know about how you travel. Tell me where I'm wrong.
        </p>
        <div
          style={{
            height: "0.5px",
            backgroundColor: "rgba(26,26,24,0.10)",
            marginTop: "20px",
            width: "100%",
          }}
        />
      </section>

      {/* SECTION 3 — Chapter rows */}
      <section>
        <ul>
          {chapters.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                className="flex items-center justify-between hover:bg-foreground/[0.03] transition-colors"
                style={{
                  padding: "18px 20px",
                  borderBottom: "0.5px solid rgba(26,26,24,0.08)",
                  borderLeft: `3px solid ${c.color}`,
                  backgroundColor: c.noWash ? "transparent" : toWash(c.color, 0.04),
                  borderRadius: 0,
                }}
              >
                <div className="min-w-0 pr-3">
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.15,
                      color: "#1A1A18",
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    className="font-sans uppercase"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.08em",
                      color: "rgba(26,26,24,0.35)",
                      fontWeight: 500,
                      marginTop: "3px",
                    }}
                  >
                    {c.sub}
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0"
                  strokeWidth={1.5}
                  style={{ color: "rgba(26,26,24,0.25)" }}
                />
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
