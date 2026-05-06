import { useState } from "react";
import { Link } from "react-router-dom";

const MAHOGANY = "#BA181B";
const OCHRE = "#C24E2A";
const OLIVE = "#6B7D3D";
const YELLOW = "#F2C94C";
const IVORY = "#F5F0E8";
const LINEN = "#EFE9DF";
const INK = "#1A1A18";
const SAND = "#D9C9A8";
const TERRACOTTA = "#B86F4A";

const playfair = { fontFamily: "'Playfair Display', serif" };
const inter = { fontFamily: "Inter, system-ui, sans-serif" };

type Tab = "STAYS" | "SEARCH" | "COMPARE" | "BOOKED";

const Pill = ({
  children,
  bg = LINEN,
  color = INK,
  border,
}: {
  children: React.ReactNode;
  bg?: string;
  color?: string;
  border?: string;
}) => (
  <span
    style={{
      ...inter,
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "5px 10px",
      borderRadius: "99px",
      background: bg,
      color,
      fontSize: "9px",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      fontWeight: 600,
      border: border ?? "none",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const SectionLabel = ({
  children,
  color = INK,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <div
    style={{
      ...inter,
      fontSize: "9px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color,
      fontWeight: 600,
      marginBottom: "12px",
    }}
  >
    {children}
  </div>
);

const Dot = ({ ok }: { ok: boolean }) => (
  <span
    style={{
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: ok ? OLIVE : MAHOGANY,
      display: "inline-block",
      flexShrink: 0,
    }}
  />
);

const TripStays = () => {
  const [tab, setTab] = useState<Tab>("STAYS");

  const tabs: { id: Tab; label: string; badge?: string }[] = [
    { id: "STAYS", label: "Stays" },
    { id: "SEARCH", label: "Search" },
    { id: "COMPARE", label: "Compare" },
    { id: "BOOKED", label: "Booked", badge: "1" },
  ];

  return (
    <div style={{ background: IVORY, minHeight: "100vh", ...inter, color: INK }}>
      <div style={{ maxWidth: "390px", margin: "0 auto", background: IVORY }}>
        {/* HERO */}
        <div
          style={{
            position: "relative",
            height: "440px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1586611292717-f828b167408c?w=600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(26,26,24,0.45) 0%, rgba(26,26,24,0.3) 35%, rgba(107,125,61,0.85) 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              padding: "18px 20px 24px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              color: IVORY,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link
                to="/trip/puglia"
                style={{
                  color: IVORY,
                  textDecoration: "none",
                  fontSize: "20px",
                  width: "32px",
                  height: "32px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "99px",
                  background: "rgba(245,240,232,0.15)",
                  backdropFilter: "blur(6px)",
                }}
              >
                ←
              </Link>
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  opacity: 0.9,
                }}
              >
                Stays Engine
              </span>
            </div>

            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  opacity: 0.75,
                  marginBottom: "12px",
                }}
              >
                Nourhan · Puglia
              </div>
              <h1
                style={{
                  ...playfair,
                  fontStyle: "italic",
                  fontSize: "44px",
                  lineHeight: 0.98,
                  margin: 0,
                  letterSpacing: "-0.01em",
                  fontWeight: 500,
                }}
              >
                Where you<br />sleep matters.
              </h1>
              <div style={{ fontSize: "11px", opacity: 0.9, marginTop: "16px", letterSpacing: "0.04em" }}>
                10 nights · Puglia · Jun 12–22
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
                <Pill bg="rgba(245,240,232,0.18)" color={IVORY}>3 properties</Pill>
                <Pill bg="rgba(245,240,232,0.18)" color={IVORY}>€2,100 est.</Pill>
                <Pill bg={OCHRE} color={IVORY}>2 unbooked</Pill>
              </div>
            </div>
          </div>
        </div>

        {/* STICKY TABS */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: IVORY,
            borderBottom: `1px solid ${LINEN}`,
            overflowX: "auto",
          }}
        >
          <div style={{ display: "flex", padding: "0 14px" }}>
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "14px 12px",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: active ? OLIVE : "rgba(26,26,24,0.6)",
                    borderBottom: active ? `2px solid ${OLIVE}` : "2px solid transparent",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    ...inter,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {t.label}
                  {t.badge && (
                    <span
                      style={{
                        background: OLIVE,
                        color: IVORY,
                        fontSize: "8px",
                        padding: "2px 6px",
                        borderRadius: "99px",
                        fontWeight: 700,
                      }}
                    >
                      {t.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "STAYS" && <StaysTab />}
        {tab === "SEARCH" && <SearchTab />}
        {tab === "COMPARE" && <CompareTab />}
        {tab === "BOOKED" && <BookedTab />}

        <div style={{ height: "60px" }} />
      </div>
    </div>
  );
};

/* ==================== STAYS TAB ==================== */
const StaysTab = () => (
  <div>
    {/* Timeline */}
    <section style={{ padding: "26px 20px 22px", borderBottom: `1px solid ${LINEN}` }}>
      <SectionLabel>10-night timeline</SectionLabel>
      <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
        {[1, 2, 3].map((n) => (
          <div key={`p1-${n}`} style={{ flex: 1, height: "44px", background: TERRACOTTA, borderRadius: "6px", color: IVORY, ...inter, fontSize: "9px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "4px", fontWeight: 600 }}>{n}</div>
        ))}
        {[4, 5, 6, 7].map((n) => (
          <div key={`p2-${n}`} style={{ flex: 1, height: "44px", background: OLIVE, borderRadius: "6px", color: IVORY, ...inter, fontSize: "9px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "4px", fontWeight: 600 }}>{n}</div>
        ))}
        {[8, 9, 10].map((n) => (
          <div key={`p3-${n}`} style={{ flex: 1, height: "44px", background: OCHRE, borderRadius: "6px", color: IVORY, ...inter, fontSize: "9px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "4px", fontWeight: 600 }}>{n}</div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "rgba(26,26,24,0.6)", letterSpacing: "0.04em" }}>
        <span>Jun 12</span><span>Jun 22</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "14px", borderTop: `1px solid ${LINEN}` }}>
        <div>
          <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,24,0.55)" }}>Total est.</div>
          <div style={{ ...playfair, fontSize: "26px", fontWeight: 600, marginTop: "2px" }}>€2,100</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,24,0.55)" }}>Avg / night</div>
          <div style={{ ...playfair, fontSize: "26px", fontWeight: 600, marginTop: "2px" }}>€210</div>
        </div>
      </div>
    </section>

    {/* CURA's plan */}
    <section style={{ background: OLIVE, color: IVORY, padding: "30px 22px 26px" }}>
      <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: YELLOW, fontWeight: 700, marginBottom: "10px" }}>
        ✦ CURA's plan
      </div>
      <h2 style={{ ...playfair, fontStyle: "italic", fontSize: "26px", lineHeight: 1.15, margin: 0, fontWeight: 500 }}>
        Three stays. Each one chosen for what comes next.
      </h2>
    </section>

    <section style={{ padding: "20px 18px 8px", display: "flex", flexDirection: "column", gap: "18px" }}>
      <StayCard
        nights="Nights 1–3"
        type="Boutique hotel"
        location="Bari Vecchia"
        photo="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80"
        accent={TERRACOTTA}
        note="You are doing day trips from a central base. Bari Vecchia puts you in the old town, 10 min from everything. Practical first."
        booked={false}
        cta="Search Bari hotels →"
      />
      <StayCard
        nights="Nights 4–7"
        type="Masseria"
        location="Countryside near Alberobello"
        photo="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80"
        accent={OLIVE}
        note="This is the Puglia experience. Isolated, pool, breakfast included. The masseria is the reason people come here. Do not skip it."
        booked={false}
        cta="Search masserias →"
      />
      <StayCard
        nights="Nights 8–10"
        type="Apartment"
        location="Gallipoli Old Town"
        photo="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80"
        accent={OCHRE}
        note="Stay on the island. Walk to the beach, walk to dinner, walk everywhere. Your last nights should feel like freedom."
        booked={true}
        cta="View booking →"
      />
    </section>

    {/* Stay type intelligence */}
    <section style={{ padding: "30px 0 6px" }}>
      <div style={{ padding: "0 18px" }}>
        <SectionLabel>What type of stay fits when</SectionLabel>
      </div>
      <div style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "4px 18px 18px" }}>
        {[
          { name: "Masseria", verdict: "Converted farmhouse. Pool, breakfast, silence. The defining Puglia experience.", best: "Middle nights · countryside days" },
          { name: "Trullo", verdict: "Iconic cone-roof structure. Worth one night for the story.", best: "One special night in Alberobello" },
          { name: "Boutique hotel", verdict: "Walk out the door into the city. Best when your days are high-activity.", best: "City stops · first night arrivals" },
          { name: "Airbnb apartment", verdict: "Kitchen, neighbourhood, freedom. Better for longer stays in one place.", best: "Stays of 3+ nights in one city" },
          { name: "Villa", verdict: "When the stay IS the destination. For groups or total privacy.", best: "Groups · celebration trips" },
        ].map((t) => (
          <div key={t.name} style={{ flex: "0 0 220px", background: LINEN, borderRadius: "14px", padding: "16px" }}>
            <div style={{ ...playfair, fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>{t.name}</div>
            <div style={{ ...inter, fontStyle: "italic", fontSize: "11px", lineHeight: 1.45, color: "rgba(26,26,24,0.78)", ...playfair }}>
              "{t.verdict}"
            </div>
            <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: `1px solid rgba(26,26,24,0.1)`, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: OCHRE, fontWeight: 600 }}>
              {t.best}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Geographic check */}
    <section style={{ padding: "20px 18px 30px" }}>
      <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: OLIVE, fontWeight: 700, marginBottom: "14px" }}>
        ✦ CURA geographic check
      </div>
      <GeoCheck
        accent={OLIVE}
        label="Pass"
        text="Nights 8–10 in Gallipoli Old Town — your Salento coast days are all within 20 min. Perfect base."
      />
      <GeoCheck
        accent={OCHRE}
        label="Flag"
        text="Nights 4–7: Your masseria is near Alberobello. Matera day trip is 1hr 20min each way — long but doable. Leave by 8am."
      />
    </section>
  </div>
);

const StayCard = ({
  nights,
  type,
  location,
  photo,
  accent,
  note,
  booked,
  cta,
}: {
  nights: string;
  type: string;
  location: string;
  photo: string;
  accent: string;
  note: string;
  booked: boolean;
  cta: string;
}) => (
  <div style={{ background: "#FFFFFF", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 0 rgba(26,26,24,0.04)" }}>
    <div style={{ position: "relative", height: "180px", backgroundImage: `url(${photo})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div style={{ position: "absolute", top: "12px", left: "12px" }}>
        <Pill bg={accent} color={IVORY}>{nights}</Pill>
      </div>
      {booked && (
        <div style={{ position: "absolute", top: "12px", right: "12px" }}>
          <Pill bg={OLIVE} color={IVORY}>Confirmed ✓</Pill>
        </div>
      )}
    </div>
    <div style={{ padding: "16px 18px 18px" }}>
      <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,24,0.55)", fontWeight: 600 }}>
        {type}
      </div>
      <div style={{ ...playfair, fontSize: "22px", fontWeight: 600, marginTop: "2px" }}>{location}</div>
      <div style={{ ...playfair, fontStyle: "italic", fontSize: "13px", lineHeight: 1.45, marginTop: "10px", color: "rgba(26,26,24,0.78)" }}>
        "{note}"
      </div>
      <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${LINEN}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: booked ? OLIVE : OCHRE, textTransform: "uppercase", fontWeight: 600 }}>
          {booked ? "Booked" : "Not booked"}
        </span>
        <Link
          to="/trip/puglia"
          style={{
            ...inter,
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: OLIVE,
            textDecoration: "none",
          }}
        >
          {cta}
        </Link>
      </div>
    </div>
  </div>
);

const GeoCheck = ({ accent, label, text }: { accent: string; label: string; text: string }) => (
  <div style={{ display: "flex", gap: "12px", marginBottom: "12px", padding: "14px", background: "#FFFFFF", borderLeft: `3px solid ${accent}`, borderRadius: "10px" }}>
    <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: accent, fontWeight: 700, flexShrink: 0, paddingTop: "1px" }}>
      {label}
    </div>
    <div style={{ ...playfair, fontStyle: "italic", fontSize: "13px", lineHeight: 1.45, color: INK }}>
      {text}
    </div>
  </div>
);

/* ==================== SEARCH TAB ==================== */
const SearchTab = () => {
  const [type, setType] = useState("All");
  const types = ["All", "Masseria", "Hotel", "Airbnb", "Trullo", "Villa"];

  return (
    <div>
      {/* Filters */}
      <section style={{ padding: "22px 18px 18px", borderBottom: `1px solid ${LINEN}` }}>
        <SectionLabel>Searching</SectionLabel>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <div>
            <div style={{ ...playfair, fontSize: "20px", fontWeight: 600 }}>Jun 12–15</div>
            <div style={{ fontSize: "10px", color: "rgba(26,26,24,0.6)", marginTop: "2px" }}>3 nights</div>
          </div>
          <button style={{ ...inter, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: OLIVE, background: "transparent", border: "none", cursor: "pointer" }}>
            Change dates →
          </button>
        </div>

        <div style={{ display: "flex", gap: "6px", overflowX: "auto", marginBottom: "18px", paddingBottom: "4px" }}>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                ...inter,
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "8px 14px",
                borderRadius: "99px",
                border: type === t ? "none" : `1px solid rgba(26,26,24,0.18)`,
                background: type === t ? OLIVE : "transparent",
                color: type === t ? IVORY : INK,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "rgba(26,26,24,0.6)", letterSpacing: "0.06em", marginBottom: "8px" }}>
            <span>Budget</span><span style={{ color: INK, fontWeight: 600 }}>up to €250 / night</span>
          </div>
          <div style={{ position: "relative", height: "6px", background: LINEN, borderRadius: "99px" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "75%", background: OLIVE, borderRadius: "99px" }} />
            <div style={{ position: "absolute", left: "75%", top: "50%", transform: "translate(-50%,-50%)", width: "16px", height: "16px", borderRadius: "50%", background: IVORY, border: `3px solid ${OLIVE}` }} />
          </div>
        </div>
      </section>

      {/* Results header */}
      <section style={{ padding: "22px 18px 6px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "10px" }}>
        <div>
          <div style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,26,24,0.55)", marginBottom: "4px" }}>3 nights</div>
          <div style={{ ...playfair, fontStyle: "italic", fontSize: "22px", fontWeight: 500, lineHeight: 1.15 }}>
            Bari Vecchia<br />Jun 12–15
          </div>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button style={{ ...inter, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, padding: "8px 12px", border: `1px solid rgba(26,26,24,0.18)`, borderRadius: "10px", background: "transparent", cursor: "pointer" }}>Filter</button>
          <button style={{ ...inter, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, padding: "8px 12px", border: `1px solid rgba(26,26,24,0.18)`, borderRadius: "10px", background: "transparent", cursor: "pointer" }}>Sort</button>
        </div>
      </section>

      {/* Property cards */}
      <section style={{ padding: "18px 18px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <PropertyCard
          name="Palazzo Meo"
          type="Boutique Hotel"
          photo="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80"
          rate="€95"
          total="€285 total"
          details={["Breakfast included", "Free cancel until May 20"]}
          verdict="Best location in the old town. Ask for a room facing the courtyard — street side gets traffic from 6am."
          cta="Book on Booking.com →"
        />
        <PropertyCard
          name="Dimora Storica Bari"
          type="Boutique Hotel"
          photo="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80"
          rate="€78"
          total="€234 total"
          details={["No breakfast", "Free cancel until Jun 1"]}
          verdict="Slightly cheaper, slightly further. Good reviews on cleanliness. Fine."
          cta="Book on Booking.com →"
        />
        <PropertyCard
          name="Bari Old Town Apartment"
          type="Airbnb"
          photo="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80"
          rate="€65"
          total="€195 + €40 cleaning"
          details={["Kitchen", "Self check-in", "Cancel 48hrs"]}
          verdict="Cleaning fee kills the savings. At 3 nights the hotel is better value. For 5+ nights reconsider this one."
          cta="Book on Airbnb →"
        />
      </section>
    </div>
  );
};

const PropertyCard = ({
  name,
  type,
  photo,
  rate,
  total,
  details,
  verdict,
  cta,
}: {
  name: string;
  type: string;
  photo: string;
  rate: string;
  total: string;
  details: string[];
  verdict: string;
  cta: string;
}) => (
  <div style={{ background: "#FFFFFF", borderRadius: "14px", overflow: "hidden" }}>
    <div style={{ position: "relative", height: "240px", backgroundImage: `url(${photo})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div style={{ position: "absolute", top: "12px", left: "12px" }}>
        <Pill bg="rgba(245,240,232,0.92)" color={INK}>{type}</Pill>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(26,26,24,0.7) 100%)" }} />
      <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px", color: IVORY }}>
        <div style={{ ...playfair, fontSize: "22px", fontWeight: 600, lineHeight: 1.1 }}>{name}</div>
      </div>
    </div>
    <div style={{ padding: "16px 18px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
        <div>
          <span style={{ ...playfair, fontSize: "26px", fontWeight: 600 }}>{rate}</span>
          <span style={{ ...inter, fontSize: "10px", color: "rgba(26,26,24,0.6)", marginLeft: "4px" }}>/ night</span>
        </div>
        <div style={{ ...inter, fontSize: "11px", color: "rgba(26,26,24,0.7)", letterSpacing: "0.04em" }}>{total}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
        {details.map((d) => (
          <Pill key={d} bg={LINEN}>{d}</Pill>
        ))}
      </div>
      <div style={{ ...playfair, fontStyle: "italic", fontSize: "13px", lineHeight: 1.45, color: "rgba(26,26,24,0.78)", paddingTop: "12px", borderTop: `1px solid ${LINEN}` }}>
        "{verdict}"
      </div>
      <Link
        to="/trip/puglia"
        style={{
          display: "block",
          marginTop: "14px",
          padding: "12px",
          background: OLIVE,
          color: IVORY,
          textAlign: "center",
          borderRadius: "10px",
          ...inter,
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {cta}
      </Link>
    </div>
  </div>
);

/* ==================== COMPARE TAB ==================== */
const CompareTab = () => {
  const rows = [
    { label: "Nightly rate", a: "€95", b: "€78" },
    { label: "Total (3 nights)", a: "€285", b: "€234" },
    { label: "Breakfast", a: "Yes", b: "No", flag: "adds ~€30/day" },
    { label: "Cancellation", a: "Free until May 20", b: "Free until Jun 1" },
    { label: "Location score", a: "9.2", b: "7.8" },
    { label: "Pool", a: "No", b: "No" },
    { label: "True all-in", a: "€285", b: "€324", emphasize: true },
  ];

  return (
    <div>
      <section style={{ padding: "26px 18px 14px" }}>
        <SectionLabel>Side by side · Bari Vecchia · 3 nights</SectionLabel>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          {/* Recommended column */}
          <div style={{ background: "rgba(107,125,61,0.12)", border: `1px solid rgba(107,125,61,0.4)`, borderRadius: "12px", padding: "14px 12px", position: "relative" }}>
            <div style={{ position: "absolute", top: "-9px", left: "12px" }}>
              <Pill bg={OLIVE} color={IVORY}>✦ CURA pick</Pill>
            </div>
            <div style={{ height: "70px", backgroundImage: "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80)", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "8px", marginTop: "6px", marginBottom: "10px" }} />
            <div style={{ ...playfair, fontSize: "16px", fontWeight: 600, lineHeight: 1.1 }}>Palazzo Meo</div>
            <div style={{ ...inter, fontSize: "9px", color: "rgba(26,26,24,0.6)", marginTop: "2px" }}>Boutique Hotel</div>
          </div>
          <div style={{ background: LINEN, borderRadius: "12px", padding: "14px 12px", marginTop: "0" }}>
            <div style={{ height: "70px", backgroundImage: "url(https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80)", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "8px", marginBottom: "10px" }} />
            <div style={{ ...playfair, fontSize: "16px", fontWeight: 600, lineHeight: 1.1 }}>Dimora Storica</div>
            <div style={{ ...inter, fontSize: "9px", color: "rgba(26,26,24,0.6)", marginTop: "2px" }}>Boutique Hotel</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden", marginTop: "14px" }}>
          {rows.map((r, i) => (
            <div key={r.label} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${LINEN}` : "none", padding: "12px 14px" }}>
              <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,24,0.55)", marginBottom: "6px", fontWeight: 600 }}>
                {r.label}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ ...playfair, fontSize: r.emphasize ? "18px" : "15px", fontWeight: 600, color: r.emphasize ? OLIVE : INK }}>{r.a}</div>
                <div style={{ ...playfair, fontSize: r.emphasize ? "18px" : "15px", fontWeight: 600, color: r.emphasize ? OCHRE : INK }}>{r.b}</div>
              </div>
              {r.flag && (
                <div style={{ marginTop: "6px", fontSize: "10px", color: OCHRE, fontStyle: "italic" }}>⚠ {r.flag}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: OLIVE, color: IVORY, padding: "26px 22px" }}>
        <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: YELLOW, fontWeight: 700, marginBottom: "10px" }}>
          ✦ CURA verdict
        </div>
        <div style={{ ...playfair, fontStyle: "italic", fontSize: "22px", lineHeight: 1.2, fontWeight: 500 }}>
          Once you add breakfast, Dimora costs more. Book Palazzo Meo.
        </div>
      </section>

      <section style={{ padding: "20px 18px 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link
          to="/trip/puglia"
          style={{
            display: "block",
            padding: "14px",
            background: OLIVE,
            color: IVORY,
            textAlign: "center",
            borderRadius: "10px",
            ...inter,
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Book Palazzo Meo →
        </Link>
        <button style={{ ...inter, padding: "14px", background: "transparent", border: `1px solid ${INK}`, color: INK, borderRadius: "10px", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>
          Keep comparing
        </button>
      </section>
    </div>
  );
};

/* ==================== BOOKED TAB ==================== */
const BookedTab = () => {
  const incl = ["Pool", "WiFi", "Kitchen", "AC", "Washing machine"];
  const excl = ["Breakfast", "Parking", "Gym"];
  return (
    <div>
      <section style={{ padding: "22px 18px 16px" }}>
        <Pill bg={OLIVE} color={IVORY}>Confirmed ✓</Pill>
        <div style={{ ...playfair, fontStyle: "italic", fontSize: "26px", fontWeight: 500, marginTop: "10px", lineHeight: 1.15 }}>
          Gallipoli Island Apartment
        </div>
        <div style={{ fontSize: "11px", color: "rgba(26,26,24,0.65)", marginTop: "6px", letterSpacing: "0.04em" }}>
          Jun 20–22 · 3 nights
        </div>
      </section>

      <section style={{ padding: "0 18px 18px" }}>
        <div style={{ height: "200px", backgroundImage: "url(https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80)", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "14px" }} />
      </section>

      <section style={{ padding: "0 18px 22px" }}>
        <div style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden" }}>
          <Row label="Check-in" value="Jun 20 · 3:00 PM" />
          <Row label="Check-out" value="Jun 22 · 11:00 AM" />
          <Row label="Address" value="Via Antonietta De Pace 12, Gallipoli" />
          <Row label="Host" value="Marco · Superhost · Replies in 1hr" last />
        </div>
      </section>

      {/* Check-in intelligence */}
      <section style={{ background: OLIVE, color: IVORY, padding: "26px 22px" }}>
        <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: YELLOW, fontWeight: 700, marginBottom: "10px" }}>
          ✦ CURA check-in brief
        </div>
        <div style={{ ...playfair, fontStyle: "italic", fontSize: "16px", lineHeight: 1.4, marginBottom: "14px" }}>
          Your flight lands Jun 12 at 7:15am. Check-in at this property is at 3pm. You have 8 hours to fill. Drop bags at the host's lockbox on arrival — Marco will message you the code the morning of check-in.
        </div>
        <div style={{ ...playfair, fontStyle: "italic", fontSize: "14px", lineHeight: 1.4, opacity: 0.92, paddingTop: "12px", borderTop: "1px solid rgba(245,240,232,0.2)" }}>
          Ask for early check-in when you message Marco — Superhost status means he usually accommodates.
        </div>
      </section>

      {/* Refund window */}
      <section style={{ padding: "22px 18px 18px" }}>
        <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,24,0.55)", fontWeight: 600 }}>Cancellation</div>
            <div style={{ ...playfair, fontSize: "16px", fontWeight: 600, marginTop: "2px" }}>Free until Jun 18</div>
            <div style={{ fontSize: "10px", color: "rgba(26,26,24,0.6)", marginTop: "2px" }}>34 days remaining</div>
          </div>
          <Pill bg={OLIVE} color={IVORY}>Safe to cancel</Pill>
        </div>
      </section>

      {/* What's included */}
      <section style={{ padding: "0 18px 22px" }}>
        <SectionLabel>What's included</SectionLabel>
        <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
          {incl.map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}><Dot ok={true} />{i}</div>
          ))}
          {excl.map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "rgba(26,26,24,0.55)" }}><Dot ok={false} />{i}</div>
          ))}
        </div>
      </section>

      {/* Packing note */}
      <section style={{ padding: "0 18px 22px" }}>
        <Link to="/trip/puglia/pack" style={{ textDecoration: "none", color: INK, display: "block" }}>
          <div style={{ background: LINEN, borderRadius: "12px", padding: "16px", borderLeft: `3px solid ${OCHRE}` }}>
            <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: OCHRE, fontWeight: 700, marginBottom: "6px" }}>
              ✦ Connected to Pack
            </div>
            <div style={{ ...playfair, fontStyle: "italic", fontSize: "14px", lineHeight: 1.4 }}>
              This property has a pool. Make sure swimwear is accessible in your carry-on in case luggage is delayed.
            </div>
          </div>
        </Link>
      </section>

      {/* Documents vault */}
      <section style={{ padding: "0 18px 22px" }}>
        <SectionLabel>Documents vault</SectionLabel>
        <div style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden" }}>
          <DocRow title="Booking confirmation" status="Saved ✓" ok />
          <DocRow title="Host contact" status="Saved ✓" ok />
          <DocRow title="Address (Italian)" status="Via Antonietta De Pace 12, 73014 Gallipoli LE" ok />
        </div>
        <Link to="/trip/puglia/route" style={{ display: "block", marginTop: "12px", padding: "12px", background: "transparent", border: `1px solid ${INK}`, color: INK, textAlign: "center", borderRadius: "10px", ...inter, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none" }}>
          Add to offline route →
        </Link>
      </section>

      {/* Upgrade */}
      <section style={{ padding: "0 18px 28px" }}>
        <div style={{ background: SAND, borderRadius: "14px", padding: "20px" }}>
          <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: OCHRE, fontWeight: 700, marginBottom: "10px" }}>
            ✦ CURA upgrade
          </div>
          <div style={{ ...playfair, fontStyle: "italic", fontSize: "16px", lineHeight: 1.35, marginBottom: "14px" }}>
            For €40 more total, you can upgrade to the upper floor unit — private terrace with sea views. Your last nights in Puglia. Worth considering.
          </div>
          <Link to="/trip/puglia" style={{ display: "block", padding: "12px", background: INK, color: IVORY, textAlign: "center", borderRadius: "10px", ...inter, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none" }}>
            Request upgrade →
          </Link>
        </div>
      </section>
    </div>
  );
};

const Row = ({ label, value, last }: { label: string; value: string; last?: boolean }) => (
  <div style={{ padding: "12px 16px", borderBottom: last ? "none" : `1px solid ${LINEN}` }}>
    <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,24,0.55)", fontWeight: 600 }}>{label}</div>
    <div style={{ ...playfair, fontSize: "14px", fontWeight: 600, marginTop: "2px" }}>{value}</div>
  </div>
);

const DocRow = ({ title, status, ok }: { title: string; status: string; ok?: boolean }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${LINEN}` }}>
    <div>
      <div style={{ ...playfair, fontSize: "14px", fontWeight: 600 }}>{title}</div>
      <div style={{ ...inter, fontSize: "10px", color: "rgba(26,26,24,0.6)", marginTop: "2px" }}>{status}</div>
    </div>
    <Dot ok={!!ok} />
  </div>
);

export default TripStays;
