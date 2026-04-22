import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, AlertCircle, Bell, ArrowUpRight, CircleCheck } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";

import { trips, curaWhispers, packing, destinations, journalEntries } from "@/data/cura";
import fieldnote from "@/assets/home-fieldnote.jpg";

/* ============================================================
   Homepage — CURA new visual system.
   - Organic blob shapes for image containers (asymmetric).
   - Translucent color washes over destination photos.
   - Pill buttons + tags. Generously rounded cards (20–28px).
   - No solid white surfaces, no sharp corners.
   Copy / routing / data are unchanged from prior version.
   ============================================================ */

/* Status color tokens — used as defaults but mixed creatively. */
const statusColor: Record<string, { hex: string; rgb: string }> = {
  dreaming: { hex: "#4FB6C8", rgb: "79,182,200" },   // aqua
  planning: { hex: "#C24E2A", rgb: "194,78,42" },    // ochre
  ready:    { hex: "#6B7D3D", rgb: "107,125,61" },   // olive
  live:     { hex: "#BA181B", rgb: "186,24,27" },    // mahogany
  memory:   { hex: "#6B7D3D", rgb: "107,125,61" },   // olive (archive)
};

const statusVerb: Record<string, string> = {
  dreaming: "Continue dreaming",
  planning: "Continue planning",
  ready: "Open trip",
  live: "Open today",
  memory: "Revisit",
};

/* A small library of asymmetric organic blob clip-paths.
   Each is a different irregular shape so no two containers match. */
const blobShapes = [
  // soft river stone
  "path('M 60 0 C 140 4 196 28 220 90 C 248 162 196 220 132 232 C 60 246 4 200 0 130 C -4 60 14 -4 60 0 Z')",
  // wider pebble
  "path('M 30 6 C 110 -8 200 14 232 70 C 264 132 224 208 152 224 C 70 244 8 196 0 124 C -6 64 8 18 30 6 Z')",
  // tall organic
  "path('M 18 12 C 90 -10 184 8 220 70 C 256 140 220 220 140 234 C 60 250 -4 196 0 120 C 4 64 0 28 18 12 Z')",
  // slanted blob
  "path('M 50 0 C 130 0 220 30 232 100 C 246 180 180 234 110 232 C 40 230 -8 178 0 110 C 6 50 16 4 50 0 Z')",
];

/* Inline SVG-ish blob shapes used as decorative color washes (CSS clip-path on a div). */
const washShapes = [
  "polygon(72% 6%, 100% 22%, 96% 62%, 78% 78%, 60% 64%, 64% 32%)",
  "polygon(8% 14%, 42% 4%, 62% 28%, 48% 60%, 18% 56%, 0% 32%)",
  "polygon(58% 10%, 92% 24%, 96% 58%, 70% 72%, 44% 56%, 50% 28%)",
  "polygon(10% 60%, 4% 30%, 32% 12%, 58% 28%, 50% 60%, 24% 78%)",
];

const Home = () => {
  const active = trips.filter((t) => t.status !== "memory").sort((a, b) => a.daysOut - b.daysOut);
  const primary = active[0];
  const secondary = active.slice(1);

  const missingCount = packing.filter((p) => !p.packed).length;

  const claimedIds = new Set(trips.map((t) => t.id.split("-")[0]));
  const elsewhere = destinations.filter((d) => !claimedIds.has(d.id)).slice(0, 3);

  const archive = journalEntries.slice(0, 2);

  const primaryColor = primary ? statusColor[primary.status] ?? statusColor.planning : statusColor.planning;

  return (
    <main className="app-shell pb-20">
      {/* Header — logo locked top-left, date sits underneath as the timestamp.
          Right cluster keeps the two utility actions. */}
      <header className="px-5 pt-5 pb-2 flex items-start justify-between">
        <div>
          <div className="font-serif lowercase text-2xl leading-none tracking-tight">cura</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center" style={{ gap: "12px" }}>
            <button aria-label="Notifications" className="hover:opacity-70 inline-flex items-center justify-center" style={{ width: "20px", height: "20px" }}>
              <Bell className="text-foreground" style={{ width: "20px", height: "20px" }} fill="currentColor" stroke="currentColor" strokeWidth={1.5} />
            </button>
            <span aria-hidden="true" style={{ width: "1px", height: "16px", backgroundColor: "rgba(26,26,24,0.15)" }} />
            <Link to="/begin" aria-label="Dream" className="hover:opacity-70 inline-flex items-center justify-center" style={{ width: "20px", height: "20px" }}>
              <span className="inline-flex items-center justify-center text-foreground" style={{ fontSize: "20px", lineHeight: 1 }}>✦</span>
            </Link>
          </div>
          <div className="editorial-eyebrow text-muted-foreground mt-1.5">Tuesday · 4:12 pm</div>
        </div>
      </header>

      {/* Hero greeting */}
      <section className="px-5 pt-3 pb-4 cura-rise">
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-[40px] leading-[0.95] max-w-[12ch]">
            Good afternoon, <span className="italic-serif">Nourhan</span>.
          </h1>
          {primary && (
            <div className="text-right text-xs text-muted-foreground pb-1.5">
              <div>{primary.daysOut} days</div>
              <div>to {primary.city}</div>
            </div>
          )}
        </div>
      </section>

      {/* CURA INSIGHT — linen surface with ochre left border. */}
      <section className="px-5" style={{ paddingTop: "12px", paddingBottom: "20px" }}>
        <Link
          to="/cura"
          className="block"
          style={{
            background: "#EFE9DF",
            borderLeft: "3px solid #C24E2A",
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            padding: "14px 16px",
          }}
        >
          <div
            className="font-sans uppercase"
            style={{ fontSize: "8px", letterSpacing: "0.18em", color: "#C24E2A" }}
          >
            ✦ Cura
          </div>
          <p
            className="font-serif italic"
            style={{ fontSize: "18px", lineHeight: 1.45, color: "#1A1A18", marginTop: "8px" }}
          >
            {curaWhispers[0]}
          </p>
          <div
            className="font-sans uppercase"
            style={{
              fontSize: "7px",
              letterSpacing: "0.22em",
              color: "rgba(26,26,24,0.30)",
              marginTop: "12px",
            }}
          >
            Tap to explore →
          </div>
        </Link>
      </section>

      {/* No active trip — empty state */}
      {!primary && (
        <section className="mt-2 px-5">
          <div
            className="px-5 py-10 text-center"
            style={{
              borderRadius: "24px",
              background: "rgba(245,240,232,0.82)",
              border: "0.5px solid rgba(26,26,24,0.10)",
            }}
          >
            <h2 className="font-serif text-[26px] leading-[1.1] max-w-[18ch] mx-auto">
              Nothing planned. Which is its own kind of plan.
            </h2>
            <Link
              to="/begin"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase transition-colors"
              style={{
                borderRadius: "99px",
                background: "#C24E2A",
                color: "#F5F0E8",
              }}
            >
              Begin
            </Link>
          </div>
        </section>
      )}

      {/* PRIMARY TRIP CARD — Puglia / planning */}
      {primary && primary.status !== "live" && (
        <section className="mt-2 px-5">
          <div className="editorial-eyebrow text-muted-foreground mb-2">Your trip</div>

          <div
            style={{
              borderRadius: "22px",
              background: "rgba(245,240,232,0.82)",
              border: "0.5px solid rgba(26,26,24,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Hero image — clean rounded rectangle crop */}
            <Link to={`/trip/${primary.id}`} className="group block relative" style={{ height: "200px" }}>
              <div
                className="relative h-full w-full overflow-hidden"
                style={{ padding: "12px" }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    borderRadius: "16px",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80"
                    alt={`${primary.city}, ${primary.country}`}
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Bottom gradient for legibility */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                      height: "60%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                    }}
                  />
                  {/* Status pill — bottom left over image */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="inline-flex items-center justify-center font-sans uppercase"
                      style={{
                        borderRadius: "99px",
                        background: primaryColor.hex,
                        color: "#F5F0E8",
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        padding: "4px 10px",
                        minWidth: "76px",
                      }}
                    >
                      {primary.status}
                    </span>
                  </div>
                  {/* Destination text — bottom right over image */}
                  <div className="absolute bottom-3 right-4 text-right">
                    <div className="editorial-eyebrow" style={{ color: "rgba(245,240,232,0.85)" }}>
                      {primary.country}
                    </div>
                    <div className="font-serif text-[28px] leading-none mt-0.5" style={{ color: "#F5F0E8" }}>
                      {primary.city}
                    </div>
                    <div className="text-[11px] mt-1" style={{ color: "rgba(245,240,232,0.85)" }}>
                      {primary.dates}
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Readiness — rounded track */}
            <div className="px-5 pt-3">
              <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                <span>Readiness</span>
                <span>{primary.readiness}%</span>
              </div>
              <div
                className="mt-2 relative overflow-hidden"
                style={{ height: "6px", borderRadius: "99px", background: "rgba(26,26,24,0.10)" }}
              >
                <div
                  className="absolute left-0 top-0 h-full"
                  style={{
                    width: `${primary.readiness}%`,
                    background: primaryColor.hex,
                    borderRadius: "99px",
                  }}
                />
              </div>
            </div>

            {/* Action layer — colored CTA + ghost secondary actions, all rounded to match card */}
            <div className="p-4 pt-3">
              <Link
                to={`/trip/${primary.id}`}
                className="group flex items-center justify-between px-5"
                style={{
                  borderRadius: "20px",
                  background: primaryColor.hex,
                  color: "#F5F0E8",
                  height: "44px",
                }}
              >
                <span className="font-sans text-sm tracking-wide">{statusVerb[primary.status] ?? "Open trip"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  to={`/trip/${primary.id}/itinerary`}
                  className="flex items-center justify-start gap-1.5 px-3 text-[12px] tracking-wide transition-colors"
                  style={{
                    borderRadius: "20px",
                    border: "0.5px solid rgba(26,26,24,0.30)",
                    color: "#1A1A18",
                    height: "44px",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[12px] tracking-wide">View itinerary</span>
                    <span
                      className="font-sans mt-1"
                      style={{ fontSize: "9px", color: "rgba(26,26,24,0.40)" }}
                    >
                      day by day
                    </span>
                  </div>
                </Link>
                <Link
                  to="/pack"
                  className="flex items-center justify-start gap-1.5 px-3 transition-colors"
                  style={{
                    borderRadius: "20px",
                    border: "0.5px solid rgba(26,26,24,0.30)",
                    color: "#1A1A18",
                    height: "44px",
                  }}
                >
                  <CircleCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[12px] tracking-wide whitespace-nowrap">See what's missing</span>
                    <span
                      className="font-sans mt-1"
                      style={{ fontSize: "10px", color: "rgba(26,26,24,0.45)" }}
                    >
                      {missingCount} of {packing.length} complete
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LIVE state */}
      {primary && primary.status === "live" && (
        <section className="mt-2 px-5">
          <div className="editorial-eyebrow text-muted-foreground mb-2">Live now</div>
          <Link
            to={`/trip/${primary.id}`}
            className="block p-5"
            style={{
              borderRadius: "22px",
              background: "rgba(245,240,232,0.82)",
              border: "0.5px solid rgba(186,24,27,0.30)",
            }}
          >
            <div className="editorial-eyebrow" style={{ color: "#BA181B" }}>In motion</div>
            <div className="font-serif text-[34px] leading-none mt-2">Today in {primary.city}</div>
            <p className="text-sm text-muted-foreground mt-3">Your day is loading. Tap to open today's view.</p>
          </Link>
        </section>
      )}

      {/* SECONDARY TRIPS — Marrakech "also in motion" */}
      {secondary.length > 0 && (
        <section className="mt-6 px-5">
          <div className="flex items-baseline justify-between mb-3">
            <div className="editorial-eyebrow text-muted-foreground">Also in motion</div>
            <Link
              to="/trips"
              className="text-[10px] tracking-[0.18em] uppercase hover:opacity-80 inline-flex items-center gap-1"
              style={{ color: "rgba(26,26,24,0.40)" }}
            >
              All trips <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="space-y-3">
            {secondary.map((t, idx) => {
              const c = statusColor[t.status] ?? statusColor.dreaming;
              const blob = blobShapes[(idx + 1) % blobShapes.length];
              const wash = washShapes[(idx + 1) % washShapes.length];
              const isMarrakech = /marrak/i.test(t.city);
              const imgSrc = isMarrakech
                ? "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&q=80"
                : t.cover;
              return (
                <li key={t.id}>
                  <Link
                    to={`/trip/${t.id}`}
                    className="flex w-full transition-colors min-h-[120px]"
                    style={{
                      borderRadius: "18px",
                      background: "rgba(239,233,223,0.60)",
                      border: "0.5px solid rgba(26,26,24,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <div className="relative shrink-0" style={{ width: "40%", padding: "10px" }}>
                      <div
                        className="relative h-full w-full overflow-hidden"
                        style={{ borderRadius: "12px", minHeight: "100px" }}
                      >
                        <img
                          src={imgSrc}
                          alt={t.city}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between p-4" style={{ width: "60%" }}>
                      <div>
                        <div className="font-serif leading-tight" style={{ fontSize: "20px", color: "#1A1A18" }}>
                          {t.city}
                        </div>
                        <div
                          className="font-sans text-muted-foreground mt-1"
                          style={{ fontSize: "10px", letterSpacing: "0.04em" }}
                        >
                          {t.dates}
                        </div>
                      </div>
                      <div className="mt-3">
                        <span
                          className="inline-flex items-center justify-center uppercase"
                          style={{
                            borderRadius: "99px",
                            background: c.hex,
                            color: "#F5F0E8",
                            fontSize: "9px",
                            letterSpacing: "0.18em",
                            padding: "4px 10px",
                            minWidth: "76px",
                          }}
                        >
                          {t.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* FIELD NOTE — left-border insight card, soft olive wash */}
      <section className="mt-12 px-5">
        <div
          className="relative grid grid-cols-5 gap-0 items-stretch overflow-hidden"
          style={{
            background: "rgba(107,125,61,0.10)",
            borderLeft: "3px solid #6B7D3D",
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        >
          <div className="col-span-2 relative h-[140px] p-3">
            <div
              className="relative h-full w-full overflow-hidden"
              style={{ borderRadius: "12px" }}
            >
              <img
                src={fieldnote}
                alt="A flat-lay of a cream linen shirt, wide-leg trousers, leather mules and a rust silk scarf on warm stone"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-3 p-4 flex flex-col justify-center gap-2 relative">
            <div
              className="font-sans uppercase"
              style={{ fontSize: "8px", letterSpacing: "0.18em", color: "#6B7D3D" }}
            >
              Field note
            </div>
            <p className="italic-serif text-[15px] leading-snug" style={{ color: "#1A1A18" }}>
              "Pack like you live there, not like you visit."
            </p>
            <div
              className="font-sans"
              style={{ fontSize: "9px", color: "rgba(26,26,24,0.45)" }}
            >
              — Cura, on packing
            </div>
          </div>
        </div>
      </section>

      {/* ELSEWHERE — destination cards with blob image + color wash */}
      {elsewhere.length > 0 && (
        <section className="mt-10">
          <div className="flex items-baseline justify-between mb-3 px-5">
            <h2 className="font-serif leading-none" style={{ fontSize: "22px" }}>
              A small list of <span className="italic">elsewhere</span>
            </h2>
            <Link
              to="/discover"
              className="text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1 hover:opacity-80"
              style={{ color: "rgba(26,26,24,0.40)" }}
            >
              All <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5 pb-1">
            {elsewhere.map((d, idx) => {
              const wash = washShapes[idx % washShapes.length];
              // Rotate color wash through aqua, ochre, olive
              const washes = [
                "rgba(79,182,200,0.22)",
                "rgba(194,78,42,0.20)",
                "rgba(107,125,61,0.20)",
              ];
              return (
                <Link key={d.id} to="/discover" className="snap-start shrink-0 w-[42%] group">
                  <div className="relative" style={{ height: "220px" }}>
                    <div
                      className="relative h-full w-full overflow-hidden"
                      style={{ borderRadius: "16px" }}
                    >
                      <img
                        src={d.cover}
                        alt={`${d.name}, ${d.country}`}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80";
                        }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Color wash removed — clean rounded rectangle image */}
                      {/* Flight-time pill (top-left) */}
                      <div
                        className="absolute top-3 left-3 uppercase z-10"
                        style={{
                          borderRadius: "99px",
                          background: "rgba(26,26,24,0.78)",
                          color: "#F5F0E8",
                          fontSize: "9px",
                          letterSpacing: "0.14em",
                          padding: "3px 9px",
                        }}
                      >
                        {d.flightHrs}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 px-1">
                    <div className="font-serif text-[17px] leading-tight">{d.name}</div>
                    <div className="italic-serif text-[12px] text-foreground/65 mt-0.5 line-clamp-1">
                      {d.tagline}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* FROM THE ARCHIVE — journal cards with destination photo at 15% behind text */}
      {archive.length > 0 && (
        <section className="mt-10 px-5">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-serif leading-none" style={{ fontSize: "22px" }}>
              From the <span className="italic">archive</span>
            </h2>
            <Link
              to="/journal"
              className="text-[10px] tracking-[0.18em] uppercase hover:opacity-80 inline-flex items-center gap-1"
              style={{ color: "rgba(26,26,24,0.40)" }}
            >
              Journal <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="space-y-3">
            {archive.map((j) => (
              <li key={j.day}>
                <Link
                  to="/journal"
                  className="relative block overflow-hidden transition-colors"
                  style={{
                    borderRadius: "20px",
                    background: "rgba(239,233,223,0.60)",
                    border: "0.5px solid rgba(26,26,24,0.08)",
                  }}
                >
                  {/* Background destination photo at 15% opacity */}
                  {j.cover && (
                    <img
                      src={j.cover}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                      style={{ opacity: 0.15 }}
                    />
                  )}
                  <div className="relative p-5 flex flex-col gap-3">
                    <div className="editorial-eyebrow text-muted-foreground">
                      {j.dateRange ?? j.day}
                    </div>
                    <div className="font-serif text-[26px] leading-none">{j.city ?? j.day}</div>
                    <p className="italic-serif text-[13px] leading-snug text-foreground/80">
                      "{j.quote ?? j.highlight}"
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Editorial imprint */}
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

export default Home;
