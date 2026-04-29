import { Link } from "react-router-dom";
import { BottomNav } from "@/components/cura/BottomNav";

/**
 * Trip Workspace shell — /trip/:id
 *
 * Demo content uses Puglia. All values hardcoded per spec.
 */

interface Engine {
  name: string;
  state: string;
  dot: string;
  to?: string;
  disabled?: boolean;
}

const engines: Engine[] = [
  { name: "Visa",      state: "Not started",        dot: "#E36414",                 to: "/trip/puglia/visa" },
  { name: "Flights",   state: "Not started",        dot: "rgba(26,26,24,0.15)",    to: "/trip/puglia/flights" },
  { name: "Stays",     state: "Not started",        dot: "rgba(26,26,24,0.15)",    to: "/trip/puglia/stays" },
  { name: "Route",     state: "Not started",        dot: "rgba(26,26,24,0.15)",    to: "/trip/puglia/route" },
  { name: "Itinerary", state: "In progress",        dot: "#6B7D3D",                 to: "/trip/puglia/itinerary" },
  { name: "Prep",      state: "Not started",        dot: "rgba(26,26,24,0.15)",    to: "/trip/puglia/prep" },
  { name: "Pack",      state: "Not started",        dot: "rgba(26,26,24,0.15)",    to: "/trip/puglia/pack" },
  { name: "Spend",     state: "Not started",        dot: "rgba(26,26,24,0.15)",    to: "/trip/puglia/spend" },
  { name: "During",    state: "Unlocks when live",  dot: "rgba(26,26,24,0.10)",    disabled: true },
  { name: "Journal",   state: "Not started",        dot: "rgba(26,26,24,0.15)",    to: "/trip/puglia/journal" },
];

const Tile = ({ e }: { e: Engine }) => {
  const inner = (
    <div
      style={{
        backgroundColor: "#EFE9DF",
        borderRadius: "18px",
        padding: "16px 14px",
        position: "relative",
        opacity: e.disabled ? 0.45 : 1,
        height: "100%",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: e.dot,
          display: "block",
        }}
      />
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "15px",
          color: "#1A1A18",
          display: "block",
          marginBottom: "3px",
          fontWeight: 400,
        }}
      >
        {e.name}
      </span>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "rgba(26,26,24,0.35)",
        }}
      >
        {e.state}
      </span>
    </div>
  );

  if (e.disabled || !e.to) {
    return <div>{inner}</div>;
  }
  return (
    <Link to={e.to} style={{ display: "block" }}>
      {inner}
    </Link>
  );
};

const TripWorkspace = () => {
  return (
    <main className="app-shell pb-24" style={{ backgroundColor: "#F5F0E8" }}>
      {/* SECTION 1 — HERO */}
      <header style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80"
          alt="Puglia"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
          }}
        >
          <Link
            to="/trips"
            aria-label="Back to trips"
            style={{
              color: "#F5F0E8",
              fontSize: "20px",
              lineHeight: 1,
              textDecoration: "none",
            }}
          >
            ←
          </Link>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                backgroundColor: "#C24E2A",
                color: "#F5F0E8",
                borderRadius: "99px",
                padding: "4px 12px",
                fontWeight: 500,
              }}
            >
              PLANNING
            </span>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                color: "#F5F0E8",
                fontWeight: 400,
                lineHeight: 1,
                marginTop: "6px",
              }}
            >
              38
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(245,240,232,0.65)",
                marginTop: "2px",
              }}
            >
              days to go
            </div>
          </div>
        </div>

        {/* Bottom-left destination */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0 20px 18px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "30px",
              color: "#F5F0E8",
              fontWeight: 400,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Puglia
          </h1>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              color: "rgba(245,240,232,0.65)",
              letterSpacing: "0.03em",
              marginTop: "4px",
            }}
          >
            Italy · Jun 12 – Jun 22, 2026
          </div>
        </div>
      </header>

      {/* SECTION 2 — READINESS */}
      <section
        style={{
          backgroundColor: "#EFE9DF",
          padding: "12px 20px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(26,26,24,0.40)",
            }}
          >
            TRIP READINESS
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              color: "#C24E2A",
            }}
          >
            64%
          </span>
        </div>
        <div
          style={{
            marginTop: "8px",
            height: "3px",
            backgroundColor: "rgba(26,26,24,0.10)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "64%",
              height: "100%",
              backgroundColor: "#C24E2A",
              borderRadius: "2px",
            }}
          />
        </div>
      </section>

      {/* SECTION 3 — CURA INSIGHT */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "16px 20px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            color: "#C24E2A",
            marginBottom: "8px",
          }}
        >
          ✦
        </span>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "14px",
            color: "rgba(26,26,24,0.60)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Start with your visa — everything else depends on it being resolved first.
        </p>
      </section>

      {/* SECTION 4 — ENGINE GRID */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "16px" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "12px",
          }}
        >
          YOUR ENGINES
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          {engines.map((e) => (
            <Tile key={e.name} e={e} />
          ))}
        </div>
      </section>

      {/* HAIRLINE */}
      <div
        style={{
          height: "0.5px",
          backgroundColor: "rgba(26,26,24,0.08)",
          margin: "8px 0",
        }}
      />

      {/* SECTION 5 — JOURNAL STRIP */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "16px 20px 32px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "rgba(26,26,24,0.35)",
            }}
          >
            JOURNAL
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "15px",
              color: "rgba(26,26,24,0.55)",
              marginTop: "4px",
            }}
          >
            Puglia, unfiltered.
          </div>
        </div>
        <Link
          to="/trip/puglia/journal"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            color: "#C24E2A",
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          Start writing →
        </Link>
      </section>

      <BottomNav />
    </main>
  );
};

export default TripWorkspace;
