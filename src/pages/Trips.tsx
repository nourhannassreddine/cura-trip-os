import { Link } from "react-router-dom";
import { BottomNav } from "@/components/cura/BottomNav";
import { trips } from "@/data/cura";

/**
 * Trips — full image cards using the CURA design system.
 * Visual rebuild only; routing logic preserved.
 */

const tripImages: Record<string, string> = {
  "puglia-25": "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80",
  "marrakech-25": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80",
  "lisbon-24": "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=600&q=80",
};

// Map raw trip status → display group with consistent CURA color system.
type StatusKey = "planning" | "dreaming" | "archive";

const statusFor = (s: string): StatusKey => {
  if (s === "memory") return "archive";
  if (s === "dreaming") return "dreaming";
  return "planning";
};

const statusLabel: Record<StatusKey, string> = {
  planning: "PLANNING",
  dreaming: "DREAMING",
  archive: "ARCHIVE",
};

const statusColor: Record<StatusKey, string> = {
  planning: "#C24E2A",
  dreaming: "#4FB6C8",
  archive: "#6B7D3D",
};

// Spec-locked readiness widths per trip id.
const readinessFor = (id: string, fallback: number) => {
  if (id === "puglia-25") return 64;
  if (id === "marrakech-25") return 2;
  if (id === "lisbon-24") return 100;
  return fallback;
};

const Trips = () => {
  const sorted = [...trips].sort((a, b) => {
    const aPast = a.status === "memory" ? 1 : 0;
    const bPast = b.status === "memory" ? 1 : 0;
    if (aPast !== bPast) return aPast - bPast;
    return a.daysOut - b.daysOut;
  });

  // Empty state — preserved from prior version.
  if (trips.length === 0) {
    return (
      <main className="app-shell pb-20 flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
        <header className="px-5 pt-6 pb-2">
          <div className="editorial-eyebrow text-muted-foreground">Trips</div>
        </header>
        <section className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <h1 className="font-serif text-[32px] leading-[1.05] max-w-[16ch]">
            No trips yet. The first one is the hardest to name.
          </h1>
          <Link
            to="/begin"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm tracking-[0.12em] uppercase text-[#F5F0E8]"
            style={{ backgroundColor: "#C24E2A", borderRadius: "20px" }}
          >
            Begin
          </Link>
        </section>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="app-shell pb-20" style={{ backgroundColor: "#F5F0E8" }}>
      <header className="px-5 pt-6 pb-2">
        <div
          className="uppercase"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            letterSpacing: "0.22em",
            color: "rgba(26,26,24,0.45)",
          }}
        >
          Trips
        </div>
        <h1
          className="mt-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px",
            lineHeight: 0.98,
            letterSpacing: "-0.01em",
            color: "#1A1A18",
          }}
        >
          All of them.
        </h1>
      </header>

      {/* CURA insight card */}
      <section className="px-5 mt-5" style={{ marginBottom: "20px" }}>
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #C24E2A",
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
            padding: "12px 14px",
          }}
        >
          <div
            className="uppercase"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              letterSpacing: "0.22em",
              color: "#C24E2A",
              marginBottom: "6px",
            }}
          >
            ✦ Cura
          </div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "15px",
              lineHeight: 1.4,
              color: "#1A1A18",
              margin: 0,
            }}
          >
            One in motion, one still a feeling, one finished. That's a healthy shelf.
          </p>
        </div>
      </section>

      {/* Trip cards */}
      <section className="px-5">
        <ul className="m-0 p-0 list-none">
          {sorted.map((t) => {
            const key = statusFor(t.status);
            const color = statusColor[key];
            const pct = readinessFor(t.id, t.readiness);

            return (
              <li
                key={t.id}
                style={{
                  borderRadius: "20px",
                  backgroundColor: "rgba(245,240,232,0.85)",
                  border: "0.5px solid rgba(26,26,24,0.08)",
                  marginBottom: "14px",
                  overflow: "hidden",
                }}
              >
                <Link to={`/trip/${t.id}`} className="block">
                  {/* Image with overlay text */}
                  <div className="relative" style={{ height: "140px" }}>
                    <img
                      src={tripImages[t.id]}
                      alt={`${t.city}, ${t.country}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(26,26,24,0.55) 0%, transparent 60%)",
                      }}
                    />

                    {/* Status tag */}
                    <span
                      className="absolute uppercase"
                      style={{
                        bottom: "12px",
                        right: "12px",
                        backgroundColor: color,
                        color: "#F5F0E8",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        padding: "4px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {statusLabel[key]}
                    </span>

                    {/* Destination block */}
                    <div className="absolute" style={{ left: "14px", bottom: "12px", right: "90px" }}>
                      <div
                        className="uppercase"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "7px",
                          letterSpacing: "0.22em",
                          color: "rgba(245,240,232,0.55)",
                        }}
                      >
                        {t.country}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "22px",
                          lineHeight: 1.05,
                          color: "#F5F0E8",
                          marginTop: "2px",
                        }}
                      >
                        {t.city}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "8px",
                          color: "rgba(245,240,232,0.70)",
                          marginTop: "3px",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {t.dates}
                      </div>
                    </div>
                  </div>

                  {/* Bottom — readiness */}
                  <div style={{ padding: "10px 14px 14px" }}>
                    <div className="flex items-center justify-between">
                      <span
                        className="uppercase"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "7px",
                          letterSpacing: "0.22em",
                          color: "rgba(26,26,24,0.35)",
                        }}
                      >
                        Readiness
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          color,
                          fontWeight: 500,
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div
                      className="mt-2 w-full overflow-hidden"
                      style={{
                        height: "2.5px",
                        backgroundColor: "rgba(26,26,24,0.10)",
                        borderRadius: "999px",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          backgroundColor: color,
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Start a new trip */}
        <Link
          to="/begin"
          className="flex items-center justify-center gap-2 w-full"
          style={{
            border: "0.5px dashed rgba(26,26,24,0.22)",
            borderRadius: "18px",
            padding: "14px",
            backgroundColor: "transparent",
            marginTop: "4px",
          }}
        >
          <span style={{ fontSize: "13px", color: "rgba(26,26,24,0.35)" }}>✦</span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "14px",
              color: "rgba(26,26,24,0.45)",
            }}
          >
            Start a new trip
          </span>
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
