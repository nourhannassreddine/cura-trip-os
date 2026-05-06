import { useState } from "react";
import { Link } from "react-router-dom";

const RED = "#8C1C13";
const MAHOGANY = "#BA181B";
const OCHRE = "#C24E2A";
const OLIVE = "#6B7D3D";
const AQUA = "#4FB6C8";
const YELLOW = "#F2C94C";
const IVORY = "#F5F0E8";
const LINEN = "#EFE9DF";
const INK = "#1A1A18";

type Tab = "SEARCH" | "SCORES" | "AIRPORTS" | "LOUNGE" | "BOOKING";

const playfair = { fontFamily: "'Playfair Display', serif" };
const inter = { fontFamily: "Inter, system-ui, sans-serif" };

const Pill = ({
  children,
  bg = IVORY,
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
      padding: "5px 10px",
      borderRadius: "99px",
      background: bg,
      color,
      fontSize: "9px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontWeight: 600,
      border: border ?? "none",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const SectionLabel = ({ children, color = INK }: { children: React.ReactNode; color?: string }) => (
  <div
    style={{
      ...inter,
      fontSize: "9px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      fontWeight: 600,
      marginBottom: "10px",
    }}
  >
    {children}
  </div>
);

const Dot = ({ open }: { open: boolean }) => (
  <span
    style={{
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: open ? OLIVE : MAHOGANY,
      display: "inline-block",
      flexShrink: 0,
    }}
  />
);

type DateOption = {
  depart: string;
  return: string;
  nights: number;
  price: number;
  score: number;
  fatigue: "Low" | "Med" | "High";
  badge?: string;
  note: string;
  delta: number; // vs current
};

const dateOptions: DateOption[] = [
  {
    depart: "Wed Jun 10",
    return: "Sat Jun 20",
    nights: 10,
    price: 1840,
    score: 91,
    fatigue: "Low",
    badge: "Better",
    note: "Mid-week depart, lighter Bari arrivals. Saves €120.",
    delta: -120,
  },
  {
    depart: "Thu Jun 11",
    return: "Sun Jun 21",
    nights: 10,
    price: 1910,
    score: 88,
    fatigue: "Low",
    note: "One day earlier. Same rhythm, slightly cheaper.",
    delta: -50,
  },
  {
    depart: "Fri Jun 12",
    return: "Mon Jun 22",
    nights: 10,
    price: 1960,
    score: 84,
    fatigue: "Med",
    badge: "Current",
    note: "Your current dates. Friday departures price up.",
    delta: 0,
  },
  {
    depart: "Sat Jun 13",
    return: "Tue Jun 23",
    nights: 10,
    price: 2080,
    score: 76,
    fatigue: "High",
    note: "Weekend out. Crowded BRI arrival, +€120.",
    delta: 120,
  },
  {
    depart: "Sun Jun 14",
    return: "Wed Jun 24",
    nights: 10,
    price: 1880,
    score: 82,
    fatigue: "Med",
    note: "Quiet Sunday flight, but pushes Day 1 plans.",
    delta: -80,
  },
];

const TripFlights = () => {
  const [tab, setTab] = useState<Tab>("SEARCH");
  const [booked, setBooked] = useState(false);
  const [editingDates, setEditingDates] = useState(false);
  const [selectedDates, setSelectedDates] = useState<number>(2);

  const tabs: { id: Tab; label: string }[] = [
    { id: "SEARCH", label: "Search" },
    { id: "SCORES", label: "Scores" },
    { id: "AIRPORTS", label: "Airports" },
    { id: "LOUNGE", label: "Lounge & miles" },
    { id: "BOOKING", label: "Booking" },
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
              "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0.35) 40%, rgba(140,28,19,0.85) 100%)",
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
                  background: "rgba(245,240,232,0.12)",
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
                  opacity: 0.85,
                }}
              >
                Flights Engine
              </span>
            </div>

            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  opacity: 0.7,
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
                Find your<br />best flight.
              </h1>

              <div
                style={{
                  marginTop: "22px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  ...playfair,
                }}
              >
                <span style={{ fontSize: "26px", fontWeight: 600, letterSpacing: "0.02em" }}>DXB</span>
                <span style={{ fontSize: "16px", opacity: 0.7 }}>→</span>
                <span style={{ fontSize: "26px", fontWeight: 600, letterSpacing: "0.02em" }}>BRI</span>
              </div>
              <div style={{ fontSize: "11px", opacity: 0.85, marginTop: "2px" }}>
                Dubai to Bari · 1 stop available
              </div>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px 14px",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  opacity: 0.9,
                }}
              >
                <span>Jun 12 depart</span>
                <span>·</span>
                <span>Jun 22 return</span>
                <span>·</span>
                <span>2 passengers</span>
              </div>

              <button
                onClick={() => setEditingDates(true)}
                style={{
                  marginTop: "18px",
                  background: IVORY,
                  color: INK,
                  border: "none",
                  padding: "11px 18px",
                  borderRadius: "10px",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  cursor: "pointer",
                  ...inter,
                }}
              >
                Edit dates →
              </button>
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
              const locked = t.id === "AIRPORTS" && !booked;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "14px 10px",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: active ? RED : locked ? "rgba(26,26,24,0.4)" : "rgba(26,26,24,0.6)",
                    borderBottom: active ? `2px solid ${RED}` : "2px solid transparent",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    ...inter,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {t.label}
                  {locked && <span style={{ fontSize: "9px" }}>🔒</span>}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "SEARCH" && <SearchTab booked={booked} setBooked={setBooked} />}
        {tab === "SCORES" && <ScoresTab />}
        {tab === "AIRPORTS" && <AirportsTab booked={booked} goSearch={() => setTab("SEARCH")} />}
        {tab === "LOUNGE" && <LoungeTab />}
        {tab === "BOOKING" && <BookingTab />}

        <div style={{ height: "60px" }} />
      </div>
    </div>
  );
};

/* ---------------- SEARCH ---------------- */
const SearchTab = ({ booked, setBooked }: { booked: boolean; setBooked: (v: boolean) => void }) => (
  <div>
    {/* Passport Filter */}
    <section style={{ background: RED, color: IVORY, padding: "26px 22px 28px" }}>
      <SectionLabel color="rgba(245,240,232,0.7)">Lebanese passport · filtered</SectionLabel>
      <p
        style={{
          ...playfair,
          fontStyle: "italic",
          fontSize: "23px",
          lineHeight: 1.2,
          margin: 0,
          fontWeight: 500,
        }}
      >
        12 routes removed. US transit requires a visa you don't have. What's left is better anyway.
      </p>
      <div style={{ display: "flex", gap: "6px", marginTop: "18px", flexWrap: "wrap" }}>
        <Pill bg="rgba(245,240,232,0.15)" color={IVORY}>12 routes hidden</Pill>
        <Pill bg="rgba(245,240,232,0.15)" color={IVORY}>8 routes showing</Pill>
        <Pill bg={OLIVE} color={IVORY}>All visa-free</Pill>
      </div>
    </section>

    {/* CURA's Pick */}
    <section style={{ padding: "28px 18px 8px" }}>
      <div
        style={{
          position: "relative",
          borderRadius: "14px",
          overflow: "hidden",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: IVORY,
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(26,26,24,0.35) 0%, rgba(26,26,24,0.85) 80%)",
            padding: "20px 18px 18px",
          }}
        >
          <div
            style={{
              ...inter,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: YELLOW,
              fontWeight: 700,
              marginBottom: "180px",
            }}
          >
            ✦ CURA's pick
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
            <div style={{ ...inter, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85 }}>
              Emirates · EK 107
            </div>
            <div style={{ ...inter, fontSize: "10px", opacity: 0.8 }}>9h 40m · 1 stop</div>
          </div>
          <div style={{ ...playfair, fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
            Dubai → Rome FCO → Bari
          </div>

          <p style={{ ...playfair, fontStyle: "italic", fontSize: "16px", lineHeight: 1.35, margin: "0 0 16px" }}>
            "One layover in Rome. Two hours — same terminal, comfortable. Arrives 7:15am. You are in Alberobello by 10. This is the one."
          </p>

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", ...playfair, marginBottom: "14px" }}>
            <span style={{ fontSize: "22px", fontWeight: 600 }}>23:55</span>
            <span style={{ fontSize: "11px", opacity: 0.7 }}>DXB</span>
            <span style={{ opacity: 0.6 }}>→</span>
            <span style={{ fontSize: "22px", fontWeight: 600 }}>07:15</span>
            <span style={{ fontSize: "11px", opacity: 0.7 }}>BRI +1</span>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
            <Pill bg="rgba(245,240,232,0.18)" color={IVORY}>Timing 9.2</Pill>
            <Pill bg="rgba(245,240,232,0.18)" color={IVORY}>Layover 8.5</Pill>
            <Pill bg={OLIVE} color={IVORY}>Fatigue: low</Pill>
          </div>

          <button
            onClick={() => setBooked(true)}
            style={{
              ...inter,
              width: "100%",
              background: YELLOW,
              color: INK,
              border: "none",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Book on Emirates · €420pp</span>
            <span>→</span>
          </button>
          {booked && (
            <div style={{ marginTop: "10px", textAlign: "center", fontSize: "10px", color: YELLOW }}>
              ✓ Marked as booked — Airports tab unlocked
            </div>
          )}
        </div>
      </div>
    </section>

    {/* All Flights */}
    <section style={{ padding: "32px 20px 8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
        <h2 style={{ ...playfair, fontStyle: "italic", fontSize: "32px", margin: 0, fontWeight: 500, letterSpacing: "-0.01em" }}>
          All flights
        </h2>
        <div style={{ display: "flex", gap: "6px" }}>
          <button style={chip()}>Filter</button>
          <button style={chip()}>Sort</button>
        </div>
      </div>

      <FlightCard
        airline="Emirates"
        code="EK 107"
        via="Via Rome FCO · 1 stop · 9h 40m"
        depart="23:55"
        arrive="07:15"
        price="€420"
        pills={[
          { t: "Timing: excellent", c: OLIVE },
          { t: "Layover: comfortable", c: AQUA },
          { t: "CURA pick", c: YELLOW, dark: true },
        ]}
        img="https://images.unsplash.com/photo-1583500178690-f7fd39c5691d?w=600&q=80"
        accent={RED}
        highlight
      />

      <FlightCard
        airline="Etihad"
        code="EY 91"
        via="Via Abu Dhabi · 1 stop · 11h 20m"
        depart="02:15"
        arrive="11:35"
        price="€380"
        pills={[
          { t: "Timing: half day lost", c: OCHRE },
          { t: "Layover: comfortable", c: AQUA },
        ]}
        img="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=600&q=80"
      />

      <FlightCard
        airline="Ryanair"
        code="FR 4421"
        via="Via Milan BGY · 2 stops · 16h 05m"
        depart="06:40"
        arrive="22:45"
        price="€210"
        priceNote="before bags"
        pills={[
          { t: "Timing: Day 1 gone", c: MAHOGANY },
          { t: "Layover: tight", c: OCHRE },
        ]}
        img="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&q=80"
      />

      <div
        style={{
          background: LINEN,
          borderLeft: `3px solid ${OCHRE}`,
          padding: "14px 16px",
          marginTop: "-6px",
          borderRadius: "10px",
        }}
      >
        <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: OCHRE, fontWeight: 700, marginBottom: "6px" }}>
          ✦ CURA warning
        </div>
        <p style={{ ...playfair, fontStyle: "italic", fontSize: "15px", lineHeight: 1.35, margin: 0 }}>
          "Bags cost €85 extra. You land at 11pm. Day 1 of your trip is a hotel corridor."
        </p>
      </div>
    </section>

    {/* Footnote */}
    <section style={{ padding: "44px 28px 36px", textAlign: "center" }}>
      <div style={{ width: "32px", height: "1px", background: INK, opacity: 0.4, margin: "0 auto 22px" }} />
      <p
        style={{
          ...playfair,
          fontStyle: "italic",
          fontSize: "19px",
          lineHeight: 1.35,
          margin: 0,
          color: "rgba(26,26,24,0.85)",
        }}
      >
        "The cheap flight is not always the cheap flight. Price the full cost — bags, your time, a wasted first day — before you decide."
      </p>
      <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: RED, marginTop: "18px", fontWeight: 700 }}>
        — Cura
      </div>
    </section>
  </div>
);

const chip = () => ({
  ...inter,
  background: "transparent",
  border: `1px solid ${INK}`,
  color: INK,
  padding: "7px 12px",
  borderRadius: "99px",
  fontSize: "10px",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  fontWeight: 600,
  cursor: "pointer",
});

const FlightCard = ({
  airline,
  code,
  via,
  depart,
  arrive,
  price,
  priceNote,
  pills,
  img,
  highlight,
  accent = INK,
}: {
  airline: string;
  code: string;
  via: string;
  depart: string;
  arrive: string;
  price: string;
  priceNote?: string;
  pills: { t: string; c: string; dark?: boolean }[];
  img: string;
  highlight?: boolean;
  accent?: string;
}) => (
  <article
    style={{
      background: IVORY,
      borderRadius: "14px",
      overflow: "hidden",
      marginBottom: "16px",
      border: highlight ? `2px solid ${accent}` : `1px solid ${LINEN}`,
      boxShadow: highlight ? "0 8px 24px rgba(140,28,19,0.12)" : "0 2px 8px rgba(26,26,24,0.04)",
    }}
  >
    <div
      style={{
        height: "90px",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(26,26,24,0.55) 0%, rgba(26,26,24,0) 70%)" }} />
      <div style={{ position: "absolute", left: "14px", top: "14px", color: IVORY }}>
        <div style={{ ...inter, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.85 }}>
          {airline}
        </div>
        <div style={{ ...playfair, fontSize: "20px", fontWeight: 600 }}>{code}</div>
      </div>
      <div style={{ position: "absolute", right: "14px", bottom: "10px", color: IVORY, textAlign: "right" }}>
        <div style={{ ...playfair, fontSize: "22px", fontWeight: 700 }}>{price}</div>
        <div style={{ ...inter, fontSize: "9px", opacity: 0.85 }}>per person{priceNote ? ` · ${priceNote}` : ""}</div>
      </div>
    </div>

    <div style={{ padding: "14px 16px 16px" }}>
      <div style={{ ...inter, fontSize: "10px", color: "rgba(26,26,24,0.65)", marginBottom: "10px" }}>{via}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", ...playfair, marginBottom: "12px" }}>
        <span style={{ fontSize: "20px", fontWeight: 600 }}>{depart}</span>
        <span style={{ fontSize: "10px", opacity: 0.6 }}>DXB</span>
        <span style={{ opacity: 0.5 }}>→</span>
        <span style={{ fontSize: "20px", fontWeight: 600 }}>{arrive}</span>
        <span style={{ fontSize: "10px", opacity: 0.6 }}>BRI</span>
      </div>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {pills.map((p, i) => (
          <Pill key={i} bg={p.c} color={p.dark ? INK : IVORY}>
            {p.t}
          </Pill>
        ))}
      </div>
    </div>
  </article>
);

/* ---------------- SCORES ---------------- */
const ScoresTab = () => (
  <div style={{ padding: "26px 20px" }}>
    <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: RED, fontWeight: 700, marginBottom: "8px" }}>
      Selected · Emirates EK 107
    </div>
    <h2 style={{ ...playfair, fontStyle: "italic", fontSize: "32px", margin: "0 0 22px", fontWeight: 500 }}>
      Why this flight scores.
    </h2>

    <ScoreCard
      label="Timing quality"
      score="9.2"
      verdict='"Arrives 7:15am — Day 1 is fully yours. This is the best possible arrival window for a Puglia trip."'
      color={OLIVE}
    />

    <ScoreCard
      label="Layover intelligence"
      score="8.5"
      sub="Rome FCO · Terminal 3"
      verdict='"Same terminal. 12 min walk between gates. No immigration re-entry. Two hours is comfortable on this connection."'
      color={AQUA}
    >
      <div style={{ marginTop: "14px", padding: "12px", background: LINEN, borderRadius: "10px" }}>
        <SectionLabel color={INK}>Facilities during layover</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: "12px", lineHeight: 1.6 }}>
          <li>· 2 cafes open from 5am</li>
          <li>· No shops at that hour</li>
          <li>· Bring water from Dubai</li>
        </ul>
      </div>
    </ScoreCard>

    <ScoreCard
      label="Flight fatigue"
      score="Low"
      verdict='"Overnight flight, single stop, lands fresh. You will be tired but functional. CURA recommends: no heavy activity before noon."'
      color={OLIVE}
    />

    <ScoreCard
      label="Seat intelligence"
      score="34A"
      sub="Best economy window"
      verdict='"Seat 34A is the best economy window seat on this aircraft. Historically no middle neighbour on this route. Exit row 44 available for €25 — worth it for the legroom."'
      color={YELLOW}
      darkText
    />

    <ScoreCard
      label="Airline reputation · this route"
      score="91%"
      sub="On-time rate"
      verdict='"Emirates DXB→FCO has an 8% delay rate. Etihad on the same route: 22%. Ryanair: 41%. You are on the right airline."'
      color={RED}
    />
  </div>
);

const ScoreCard = ({
  label,
  score,
  sub,
  verdict,
  color,
  darkText,
  children,
}: {
  label: string;
  score: string;
  sub?: string;
  verdict: string;
  color: string;
  darkText?: boolean;
  children?: React.ReactNode;
}) => (
  <article
    style={{
      background: IVORY,
      border: `1px solid ${LINEN}`,
      borderRadius: "14px",
      marginBottom: "14px",
      overflow: "hidden",
    }}
  >
    <div style={{ background: color, color: darkText ? INK : IVORY, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.85, fontWeight: 600 }}>
          {label}
        </div>
        {sub && <div style={{ ...inter, fontSize: "11px", marginTop: "4px", opacity: 0.9 }}>{sub}</div>}
      </div>
      <div style={{ ...playfair, fontSize: "36px", fontWeight: 700, lineHeight: 1 }}>{score}</div>
    </div>
    <div style={{ padding: "16px 18px" }}>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "15px", lineHeight: 1.4, margin: 0 }}>{verdict}</p>
      {children}
    </div>
  </article>
);

/* ---------------- AIRPORTS ---------------- */
const AirportsTab = ({ booked, goSearch }: { booked: boolean; goSearch: () => void }) => {
  if (!booked) {
    return (
      <div style={{ padding: "40px 20px" }}>
        <div
          style={{
            background: LINEN,
            borderRadius: "16px",
            padding: "36px 26px",
            textAlign: "center",
            border: `1px dashed ${INK}40`,
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "14px" }}>🔒</div>
          <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: RED, fontWeight: 700, marginBottom: "12px" }}>
            Locked
          </div>
          <p style={{ ...playfair, fontStyle: "italic", fontSize: "18px", lineHeight: 1.4, margin: "0 0 22px" }}>
            "CURA will brief you on every airport — exactly what is open, when, and what to watch out for — once your flight is booked and we know your exact terminals and times."
          </p>
          <button
            onClick={goSearch}
            style={{
              ...inter,
              background: RED,
              color: IVORY,
              border: "none",
              padding: "13px 22px",
              borderRadius: "10px",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Book your flight first →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "26px 18px" }}>
      <h2 style={{ ...playfair, fontStyle: "italic", fontSize: "30px", margin: "0 0 22px", fontWeight: 500 }}>
        Three airports, one day.
      </h2>

      <AirportCard
        name="Dubai"
        code="DXB · T3"
        ctx="Departure · Jun 12 · 23:55"
        img="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
        verdict='"T3 at midnight is fully operational. Emirates lounge open. Security is 20–35 min at this hour. The supermarket on Level 3 is open 24hrs."'
        facilities={[
          ["Supermarket", true],
          ["Pharmacy", true],
          ["Currency exchange", true],
          ["SIM cards", true],
          ["Showers", true],
          ["Restaurants", true],
        ]}
      />

      <AirportCard
        name="Rome"
        code="FCO · T3"
        ctx="Transit · 05:15 → 07:15"
        img="https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&q=80"
        verdict='"FCO T3 at 5am: immigration closed (airside only), 2 cafes open, nothing else. Bring water and something to eat from Dubai. The connection is easy — same terminal, 12 min walk."'
        facilities={[
          ["2 cafes", true],
          ["Shops · closed", false],
          ["Pharmacy · closed", false],
          ["Same terminal", true],
          ["Currency · closed", false],
        ]}
      />

      <AirportCard
        name="Bari"
        code="BRI"
        ctx="Arrival · 07:15"
        img="https://images.unsplash.com/photo-1534445538923-ab0f57a02eb5?w=600&q=80"
        verdict='"Small, efficient. Lebanese passport: immigration in 15–20 min at this hour — no queues. Car rental desks open from 7am. Vodafone SIM at the desk but buy in the city — it is cheaper there."'
        facilities={[
          ["Car rental", true],
          ["SIM · overpriced", false],
          ["ATM", true],
          ["Fast immigration", true],
        ]}
      />
    </div>
  );
};

const AirportCard = ({
  name,
  code,
  ctx,
  img,
  verdict,
  facilities,
}: {
  name: string;
  code: string;
  ctx: string;
  img: string;
  verdict: string;
  facilities: [string, boolean][];
}) => (
  <article style={{ background: IVORY, border: `1px solid ${LINEN}`, borderRadius: "14px", overflow: "hidden", marginBottom: "16px" }}>
    <div
      style={{
        height: "120px",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,26,24,0.1) 0%, rgba(26,26,24,0.75) 100%)" }} />
      <div style={{ position: "absolute", left: "16px", bottom: "12px", color: IVORY }}>
        <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8 }}>{ctx}</div>
        <div style={{ ...playfair, fontSize: "26px", fontWeight: 600, lineHeight: 1 }}>
          {name} <span style={{ fontSize: "13px", opacity: 0.85 }}>{code}</span>
        </div>
      </div>
    </div>
    <div style={{ padding: "16px 18px" }}>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "15px", lineHeight: 1.4, margin: "0 0 16px" }}>{verdict}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 14px", marginBottom: "14px" }}>
        {facilities.map(([t, open], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: open ? INK : "rgba(26,26,24,0.55)" }}>
            <Dot open={open} />
            <span>{t}</span>
          </div>
        ))}
      </div>
      <a
        href="/trip/puglia/flights"
        style={{
          ...inter,
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: RED,
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        View terminal map →
      </a>
    </div>
  </article>
);

/* ---------------- LOUNGE ---------------- */
const LoungeTab = () => (
  <div style={{ padding: "26px 20px" }}>
    <h2 style={{ ...playfair, fontStyle: "italic", fontSize: "30px", margin: "0 0 8px", fontWeight: 500 }}>
      Lounge & miles.
    </h2>

    <SectionLabel>Lounge access · your cards</SectionLabel>

    <div style={{ background: IVORY, border: `1px solid ${LINEN}`, borderRadius: "12px", padding: "16px", marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <div style={{ ...playfair, fontSize: "18px", fontWeight: 600 }}>Emirates Business Lounge</div>
          <div style={{ ...inter, fontSize: "10px", color: "rgba(26,26,24,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
            DXB · T3
          </div>
        </div>
        <Pill bg={OLIVE} color={IVORY}>Access confirmed</Pill>
      </div>
      <div style={{ ...inter, fontSize: "11px", color: "rgba(26,26,24,0.7)", marginBottom: "10px" }}>
        Opens 20:00 · Dinner until 02:00 · Your EK ticket confirms access
      </div>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "14px", lineHeight: 1.4, margin: 0, paddingLeft: "12px", borderLeft: `2px solid ${RED}` }}>
        "The Emirates lounge at T3 is exceptional. Shower, proper food, quiet. Go early."
      </p>
    </div>

    <div style={{ background: IVORY, border: `1px solid ${LINEN}`, borderRadius: "12px", padding: "16px", marginBottom: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <div style={{ ...playfair, fontSize: "18px", fontWeight: 600 }}>Priority Pass</div>
          <div style={{ ...inter, fontSize: "10px", color: "rgba(26,26,24,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
            FCO · T3
          </div>
        </div>
        <Pill bg={MAHOGANY} color={IVORY}>Not available</Pill>
      </div>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "14px", lineHeight: 1.4, margin: "8px 0 0", paddingLeft: "12px", borderLeft: `2px solid ${OCHRE}` }}>
        "No Priority Pass lounge in FCO T3 at 5am. Airside cafe only. Save your visit for Dubai."
      </p>
    </div>

    <SectionLabel>Miles optimizer</SectionLabel>
    <div style={{ background: LINEN, borderRadius: "12px", padding: "4px 16px", marginBottom: "16px" }}>
      <Row label="Cash price · 2 passengers" value="€1,082" />
      <Row label="Miles needed · economy" value="130,000" />
      <Row label="Your Skywards balance" value="48,000" />
      <Row label="Miles short" value="82,000" emphasis={MAHOGANY} last />
    </div>
    <div style={{ background: RED, color: IVORY, borderRadius: "12px", padding: "20px" }}>
      <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: YELLOW, fontWeight: 700, marginBottom: "10px" }}>
        ✦ Cura verdict
      </div>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "17px", lineHeight: 1.35, margin: 0 }}>
        "You are 82,000 miles short for a redemption. Pay cash for this trip — save your miles for a business class redemption. The math is better."
      </p>
    </div>

    <div style={{ height: "28px" }} />
    <SectionLabel>Best card to pay with</SectionLabel>
    <div style={{ background: YELLOW, color: INK, borderRadius: "12px", padding: "18px" }}>
      <div style={{ ...playfair, fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>
        Emirates Skywards Mastercard
      </div>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "14px", lineHeight: 1.4, margin: 0, color: "#5A2818" }}>
        "Use your Skywards Mastercard — you will earn 3x miles on Emirates flights. That is 3,246 Skywards miles on this booking."
      </p>
    </div>
  </div>
);

const Row = ({ label, value, emphasis, last }: { label: string; value: string; emphasis?: string; last?: boolean }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: last ? "none" : `1px solid rgba(26,26,24,0.08)`,
    }}
  >
    <span style={{ ...inter, fontSize: "12px", color: "rgba(26,26,24,0.75)" }}>{label}</span>
    <span style={{ ...playfair, fontSize: "18px", fontWeight: 700, color: emphasis ?? INK }}>{value}</span>
  </div>
);

/* ---------------- BOOKING ---------------- */
const BookingTab = () => (
  <div style={{ padding: "26px 20px" }}>
    <SectionLabel>What you are actually paying</SectionLabel>
    <div style={{ background: IVORY, border: `1px solid ${LINEN}`, borderRadius: "12px", padding: "4px 18px", marginBottom: "12px" }}>
      <Row label="Base fare × 2" value="€840" />
      <Row label="Taxes & fees" value="€180" />
      <Row label="Baggage · 23kg × 2" value="Included" />
      <Row label="Seat selection" value="€50" />
      <Row label="Carbon offset (optional)" value="€12" last />
    </div>
    <div style={{ background: RED, color: IVORY, borderRadius: "14px", padding: "22px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.85, fontWeight: 600 }}>
          Total · 2 passengers
        </div>
      </div>
      <div style={{ ...playfair, fontSize: "44px", fontWeight: 700, lineHeight: 1 }}>€1,082</div>
    </div>

    <SectionLabel>What to do first</SectionLabel>
    <Step n={1} title="Book flights now" tag="Urgent" tagColor={MAHOGANY}>
      "Price is rising. Fare is refundable until 72hrs before — book now, cancel if needed."
    </Step>
    <Step n={2} title="Confirm visa status first" tag="Important" tagColor={OCHRE}>
      "Book refundable fare so you can cancel if your visa appointment goes wrong."
    </Step>
    <Step n={3} title="Book accommodation after" tag="Next step" tagColor={OLIVE}>
      "Flights first — Puglia in June books fast and availability depends on your dates."
    </Step>

    <div style={{ height: "20px" }} />
    <SectionLabel>Travel day · Jun 12</SectionLabel>
    <div style={{ background: IVORY, border: `1px solid ${LINEN}`, borderRadius: "12px", padding: "8px 16px", marginBottom: "28px" }}>
      <Time time="3:15 AM" title="Leave home" note="DXB is 45 min from Downtown · allow extra" />
      <Time time="4:00 AM" title="Arrive DXB Terminal 3" note="Check-in opens 3hrs before departure" />
      <Time time="4:30 AM" title="Security & Emirates lounge" note="Allow 35 min security" />
      <Time time="11:55 PM" title="Boarding · Gate C14" note="EK 107 · Dubai to Rome" last />
    </div>

    <div style={{ background: MAHOGANY, color: IVORY, borderRadius: "12px", padding: "18px", marginBottom: "12px" }}>
      <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: YELLOW, fontWeight: 700, marginBottom: "8px" }}>
        ⚠ If flight is cancelled
      </div>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "14px", lineHeight: 1.4, margin: 0 }}>
        "Emirates rebooks same-day on partner airlines. Call within 2 hours of cancellation — the app queue is slower. Keep your booking reference accessible offline."
      </p>
    </div>

    <div style={{ background: OLIVE, color: IVORY, borderRadius: "12px", padding: "18px", marginBottom: "28px" }}>
      <div style={{ ...inter, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.9, fontWeight: 700, marginBottom: "8px" }}>
        ✦ Arrival intelligence
      </div>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "14px", lineHeight: 1.4, margin: 0 }}>
        "Lebanese passport at Bari: typically 15 min at 7am. Customs rarely stops EK passengers. Your rental car will be ready — Hertz desk is arrivals level, left side."
      </p>
    </div>

    <SectionLabel>Carbon footprint</SectionLabel>
    <div style={{ background: LINEN, borderRadius: "12px", padding: "16px", marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ ...playfair, fontSize: "22px", fontWeight: 700 }}>1.2t CO₂</div>
        <div style={{ ...inter, fontSize: "10px", color: "rgba(26,26,24,0.65)", marginTop: "2px" }}>
          DXB → BRI return · per person
        </div>
        <div style={{ ...playfair, fontStyle: "italic", fontSize: "13px", marginTop: "8px" }}>
          "Optional but worth it."
        </div>
      </div>
      <button style={{ ...inter, background: OLIVE, color: IVORY, border: "none", borderRadius: "10px", padding: "10px 14px", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>
        Add €12
      </button>
    </div>

    <SectionLabel>Documents vault</SectionLabel>
    <div style={{ background: IVORY, border: `1px solid ${LINEN}`, borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
      <DocRow title="E-ticket" status="Not yet booked" warn />
      <DocRow title="Passport" status="Saved in profile" ok />
      <DocRow title="Frequent flyer" status="EK Skywards on file" ok last />
    </div>
    <a
      href="/trip/puglia/flights"
      style={{
        ...inter,
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: RED,
        fontWeight: 700,
        textDecoration: "none",
      }}
    >
      Upload boarding pass when checked in →
    </a>
  </div>
);

const Step = ({ n, title, tag, tagColor, children }: { n: number; title: string; tag: string; tagColor: string; children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: "14px", marginBottom: "14px" }}>
    <div
      style={{
        ...playfair,
        flexShrink: 0,
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        background: IVORY,
        border: `1.5px solid ${INK}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        fontWeight: 700,
      }}
    >
      {n}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
        <div style={{ ...playfair, fontSize: "16px", fontWeight: 600 }}>{title}</div>
        <Pill bg={tagColor} color={IVORY}>{tag}</Pill>
      </div>
      <p style={{ ...playfair, fontStyle: "italic", fontSize: "13px", lineHeight: 1.4, margin: 0, color: "rgba(26,26,24,0.78)" }}>
        {children}
      </p>
    </div>
  </div>
);

const Time = ({ time, title, note, last }: { time: string; title: string; note: string; last?: boolean }) => (
  <div style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: last ? "none" : `1px solid rgba(26,26,24,0.08)` }}>
    <div style={{ ...inter, fontSize: "10px", letterSpacing: "0.1em", color: RED, fontWeight: 700, width: "70px", flexShrink: 0 }}>
      {time}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ ...playfair, fontSize: "14px", fontWeight: 600 }}>{title}</div>
      <div style={{ ...inter, fontSize: "10px", color: "rgba(26,26,24,0.6)", marginTop: "2px" }}>{note}</div>
    </div>
  </div>
);

const DocRow = ({ title, status, ok, warn, last }: { title: string; status: string; ok?: boolean; warn?: boolean; last?: boolean }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: last ? "none" : `1px solid ${LINEN}` }}>
    <div>
      <div style={{ ...playfair, fontSize: "15px", fontWeight: 600 }}>{title}</div>
      <div style={{ ...inter, fontSize: "10px", color: "rgba(26,26,24,0.6)", marginTop: "2px" }}>{status}</div>
    </div>
    <Dot open={!!ok && !warn} />
  </div>
);

export default TripFlights;
