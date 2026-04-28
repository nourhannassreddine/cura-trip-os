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

        <div className="relative h-full px-5 pt-6 pb-6 flex flex-col">
          <div
            className="font-sans uppercase"
            style={{
              fontSize: "9px",
              letterSpacing: "0.24em",
              color: "rgba(245,240,232,0.6)",
              fontWeight: 500,
            }}
          >
            You
          </div>

          <button
            type="button"
            aria-label="Add your look"
            className="mt-4 flex items-center justify-center hover:opacity-90 transition-opacity"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "9999px",
              backgroundColor: "#EFE9DF",
              border: "1.5px dashed rgba(245,240,232,0.6)",
            }}
          >
            <span
              className="font-sans uppercase"
              style={{
                fontSize: "7px",
                letterSpacing: "0.18em",
                color: "rgba(26,26,24,0.5)",
                fontWeight: 500,
                textAlign: "center",
                lineHeight: 1.2,
                padding: "0 6px",
              }}
            >
              Add your look
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
              color: "rgba(245,240,232,0.55)",
            }}
          >
            Dubai · 4 trips
          </div>
        </div>
      </header>

      {/* SECTION 2 — CURA intro card */}
      <section
        style={{
          backgroundColor: "#EFE9DF",
          borderLeft: "3px solid #C24E2A",
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
          padding: "16px 18px",
          margin: "16px 16px 8px 16px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "#C24E2A",
            marginBottom: "8px",
            lineHeight: 1,
          }}
        >
          ✦
        </div>
        <p
          className="italic-serif"
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            color: "rgba(26,26,24,0.7)",
          }}
        >
          I've been paying attention. This is what I know about how you travel. Tell me where I'm wrong.
        </p>
        <div
          style={{
            height: "0.5px",
            backgroundColor: "rgba(26,26,24,0.1)",
            marginTop: "12px",
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
