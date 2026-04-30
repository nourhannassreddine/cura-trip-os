import { Link } from "react-router-dom";

const sectionLabel: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "9px",
  textTransform: "uppercase",
  letterSpacing: "0.10em",
  color: "rgba(26,26,24,0.40)",
  display: "block",
  marginBottom: "10px",
};

const card: React.CSSProperties = {
  backgroundColor: "#EFE9DF",
  borderRadius: "14px",
  padding: "10px 12px",
};

const valueStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "16px",
  color: "#1A1A18",
};

const keyStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "7px",
  textTransform: "uppercase",
  color: "rgba(26,26,24,0.40)",
  marginTop: "3px",
  display: "block",
};

const noScrollbar: React.CSSProperties = {
  display: "flex",
  gap: "6px",
  overflowX: "auto",
  scrollbarWidth: "none",
};

const wardrobePieces = [
  { tag: "Top" },
  { tag: "Dress" },
  { tag: "Swimsuit" },
  { tag: "Trousers" },
  { tag: "Sandals" },
];

const intelligenceCards = [
  {
    spark: "✦ Repetition detected",
    color: "#8C1C13",
    bg: "rgba(140,28,19,0.06)",
    text: "3 of your 4 evening looks use the same silhouette. Consider swapping one dress for a two-piece for visual variety.",
  },
  {
    spark: "✦ Gap detected",
    color: "#8C1C13",
    bg: "rgba(140,28,19,0.06)",
    text: "No layer for cooler evenings. Alberobello sits higher — it will be noticeably cooler after sunset.",
  },
  {
    spark: "✦ Smart reuse",
    color: "#F2C94C",
    bg: "rgba(242,201,76,0.10)",
    text: "Your linen trousers work for 3 different activities — day trip, dinner, and travel day. Strong choice.",
  },
];

const outfitDays = [
  {
    label: "Day 1 · Arrival",
    date: "Jun 12",
    pieces: ["Linen set", "Sneakers", "Tote"],
    photoReady: true,
    share: true,
  },
  {
    label: "Day 2 · Beach club",
    date: "Jun 13",
    pieces: ["Swimsuit", "Cover-up", "Reef sandals", "Gold jewels"],
    photoReady: true,
    share: true,
  },
  {
    label: "Day 3 · Alberobello",
    date: "Jun 14",
    pieces: ["Linen trousers", "Simple top", "Sandals", "Layer?"],
    photoReady: true,
    share: false,
  },
];

type Item = { name: string; done: boolean; tag: "carry-on" | "buy" | "checked" };

const cat1: Item[] = [
  { name: "EU power adaptor", done: false, tag: "buy" },
  { name: "Power bank", done: false, tag: "carry-on" },
  { name: "AirPods / headphones", done: false, tag: "carry-on" },
  { name: "Luggage cubes", done: false, tag: "buy" },
];
const cat2: Item[] = [
  { name: "SPF 50 × 2", done: true, tag: "checked" },
  { name: "Travel makeup bag", done: true, tag: "carry-on" },
  { name: "Waterproof pouch", done: false, tag: "buy" },
  { name: "Medications", done: false, tag: "carry-on" },
  { name: "After-sun lotion", done: false, tag: "checked" },
];
const cat3: Item[] = [
  { name: "Passport", done: true, tag: "carry-on" },
  { name: "Visa + insurance", done: true, tag: "carry-on" },
  { name: "Booking references", done: true, tag: "carry-on" },
];

const tagStyle = (tag: Item["tag"]): React.CSSProperties => {
  if (tag === "buy") {
    return {
      backgroundColor: "rgba(79,182,200,0.12)",
      color: "#4FB6C8",
    };
  }
  return {
    backgroundColor: "rgba(26,26,24,0.07)",
    color: "rgba(26,26,24,0.40)",
  };
};

const tagLabel = (tag: Item["tag"]) =>
  tag === "buy" ? "Buy" : tag === "checked" ? "Checked" : "Carry-on";

const ItemRow = ({ it, last }: { it: Item; last: boolean }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "7px 0",
      borderBottom: last ? "none" : "0.5px solid rgba(26,26,24,0.06)",
    }}
  >
    <span
      style={{
        width: "13px",
        height: "13px",
        borderRadius: "50%",
        backgroundColor: it.done ? "#4FB6C8" : "transparent",
        border: it.done ? "1.5px solid #4FB6C8" : "1.5px solid rgba(26,26,24,0.20)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#F5F0E8",
        fontSize: "8px",
        lineHeight: 1,
      }}
    >
      {it.done ? "✓" : ""}
    </span>
    <span
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "13px",
        color: "#1A1A18",
        flex: 1,
      }}
    >
      {it.name}
    </span>
    <span
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "7px",
        textTransform: "uppercase",
        padding: "2px 7px",
        borderRadius: "99px",
        whiteSpace: "nowrap",
        ...tagStyle(it.tag),
      }}
    >
      {tagLabel(it.tag)}
    </span>
  </div>
);

const AddItemRow = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "9px 0 0 0",
    }}
  >
    <span
      style={{
        width: "13px",
        height: "13px",
        borderRadius: "50%",
        border: "1.5px dashed rgba(26,26,24,0.25)",
        flexShrink: 0,
      }}
    />
    <span
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "8px",
        textTransform: "uppercase",
        color: "rgba(26,26,24,0.35)",
        letterSpacing: "0.06em",
      }}
    >
      Add item
    </span>
  </div>
);

const Category = ({
  name,
  done,
  total,
  items,
  pillAccent,
}: {
  name: string;
  done: number;
  total: number;
  items: Item[];
  pillAccent: boolean;
}) => (
  <div style={{ marginBottom: "16px" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "4px",
      }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "8px",
          textTransform: "uppercase",
          color: "rgba(26,26,24,0.45)",
          letterSpacing: "0.08em",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "7px",
          textTransform: "uppercase",
          padding: "2px 7px",
          borderRadius: "99px",
          backgroundColor: pillAccent ? "rgba(79,182,200,0.12)" : "rgba(26,26,24,0.07)",
          color: pillAccent ? "#4FB6C8" : "rgba(26,26,24,0.40)",
        }}
      >
        {done} of {total}
      </span>
    </div>
    {items.map((it, i) => (
      <ItemRow key={it.name} it={it} last={i === items.length - 1} />
    ))}
    <AddItemRow />
  </div>
);

const TripPack = () => {
  return (
    <main
      style={{
        backgroundColor: "#F5F0E8",
        minHeight: "100vh",
        maxWidth: "390px",
        margin: "0 auto",
      }}
    >
      {/* SECTION 1 — HEADER */}
      <header style={{ position: "relative", height: "220px", overflow: "hidden", backgroundColor: "#6B7D3D" }}>
        <img
          src="https://res.cloudinary.com/dvfzz0min/image/upload/v1777528338/Suitcase_aqo8k4.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.72) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
          }}
        >
          <Link
            to="/trip/puglia"
            aria-label="Back"
            style={{
              color: "rgba(245,240,232,0.85)",
              fontSize: "16px",
              lineHeight: 1,
              textDecoration: "none",
            }}
          >
            ←
          </Link>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "7px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              backgroundColor: "#4FB6C8",
              color: "#F5F0E8",
              borderRadius: "99px",
              padding: "3px 10px",
            }}
          >
            PACK ENGINE
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0 16px 14px",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              color: "rgba(245,240,232,0.60)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Puglia · 10 nights · Jun 12
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "26px",
              color: "#F5F0E8",
              margin: "4px 0 0 0",
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            Pack
          </h1>
        </div>
      </header>

      {/* SECTION 2 — PACKING PROGRESS */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              textTransform: "uppercase",
              color: "rgba(26,26,24,0.40)",
              letterSpacing: "0.08em",
            }}
          >
            PACKING PROGRESS
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#4FB6C8" }}>
            18%
          </span>
        </div>
        <div
          style={{
            marginTop: "6px",
            height: "3px",
            backgroundColor: "rgba(26,26,24,0.10)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "18%", height: "100%", backgroundColor: "#4FB6C8", borderRadius: "2px" }} />
        </div>
      </section>

      {/* SECTION 3 — WEATHER */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>WEATHER · PUGLIA IN JUNE</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          {[
            { v: "32°C", k: "Average high" },
            { v: "Sunny", k: "Expected conditions" },
            { v: "22°C", k: "Evening low" },
            { v: "Low", k: "Rain chance" },
          ].map((c) => (
            <div key={c.k} style={card}>
              <div style={valueStyle}>{c.v}</div>
              <span style={keyStyle}>{c.k}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #4FB6C8",
            borderRadius: "0 14px 14px 0",
            padding: "10px 12px",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              color: "#4FB6C8",
              marginBottom: "5px",
            }}
          >
            ✦ CURA
          </span>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: "rgba(26,26,24,0.65)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Peak summer heat. Pack for sun all day — but Alberobello evenings drop to 22°C. One light layer is not optional. Carry-on is not enough for 10 nights.
          </p>
        </div>
      </section>

      {/* SECTION 4 — DIGITAL WARDROBE */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>YOUR DIGITAL WARDROBE · PUGLIA EDIT</span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          {[
            { title: "Upload an outfit", sub: "CURA segments into individual pieces" },
            { title: "Add a piece", sub: "Upload one item, tag the category" },
          ].map((c) => (
            <div
              key={c.title}
              style={{
                backgroundColor: "#EFE9DF",
                borderRadius: "16px",
                padding: "14px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(26,26,24,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 8px auto",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "8px",
                    backgroundColor: "rgba(26,26,24,0.25)",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", color: "#1A1A18" }}>
                {c.title}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  marginTop: "4px",
                  lineHeight: 1.5,
                }}
              >
                {c.sub}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              color: "rgba(26,26,24,0.35)",
              letterSpacing: "0.08em",
            }}
          >
            SELECTED FOR THIS TRIP
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "7px",
              textTransform: "uppercase",
              color: "#4FB6C8",
            }}
          >
            8 of 42 pieces
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {wardrobePieces.map((p) => (
            <div
              key={p.tag}
              style={{
                backgroundColor: "#EFE9DF",
                borderRadius: "12px",
                aspectRatio: "3 / 4",
                position: "relative",
                border: "2px solid #4FB6C8",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "60%",
                  backgroundColor: "rgba(26,26,24,0.12)",
                  borderRadius: "4px",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "6px",
                  left: "6px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "6px",
                  textTransform: "uppercase",
                  padding: "2px 5px",
                  borderRadius: "99px",
                  backgroundColor: "rgba(245,240,232,0.90)",
                  color: "rgba(26,26,24,0.60)",
                }}
              >
                {p.tag}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  backgroundColor: "#4FB6C8",
                  color: "#F5F0E8",
                  fontSize: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                ✓
              </span>
            </div>
          ))}
          <div
            style={{
              border: "1px dashed rgba(26,26,24,0.18)",
              borderRadius: "12px",
              aspectRatio: "3 / 4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "6px",
              fontFamily: "Inter, sans-serif",
              fontSize: "7px",
              textTransform: "uppercase",
              color: "rgba(26,26,24,0.30)",
              letterSpacing: "0.06em",
            }}
          >
            + Add from wardrobe
          </div>
        </div>

        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Link
            to="/profile"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              textTransform: "uppercase",
              color: "#4FB6C8",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Manage full wardrobe →
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderRadius: "12px",
            padding: "10px 12px",
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>
              Packing for 2
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                textTransform: "uppercase",
                color: "rgba(26,26,24,0.40)",
                marginTop: "3px",
              }}
            >
              Nourhan + 1 traveler
            </div>
          </div>
          <Link
            to="/trip/puglia"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              color: "#4FB6C8",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Manage lists →
          </Link>
        </div>
      </section>

      {/* SECTION 5 — CURA WARDROBE INTELLIGENCE */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>CURA · WARDROBE INTELLIGENCE</span>
        {intelligenceCards.map((c, i) => (
          <div
            key={c.spark}
            style={{
              backgroundColor: c.bg,
              borderLeft: `3px solid ${c.color}`,
              borderRadius: "0 14px 14px 0",
              padding: "10px 12px",
              marginTop: i === 0 ? 0 : "8px",
            }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                color: c.color,
                marginBottom: "4px",
              }}
            >
              {c.spark}
            </span>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "12px",
                color: "rgba(26,26,24,0.65)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {c.text}
            </p>
          </div>
        ))}
      </section>

      {/* SECTION 6 — OUTFIT PLANNER */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>OUTFIT PLANNER · BY DAY</span>
        {outfitDays.map((d, di) => (
          <div key={d.label} style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "8px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.45)",
                  letterSpacing: "0.08em",
                }}
              >
                {d.label}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.35)",
                }}
              >
                {d.date}
              </span>
            </div>
            <div style={noScrollbar}>
              {d.pieces.map((p) => {
                const flagged = di === 2 && p === "Layer?";
                return (
                  <div
                    key={p}
                    style={{
                      width: "54px",
                      aspectRatio: "3 / 4",
                      backgroundColor: flagged ? "rgba(140,28,19,0.05)" : "#EFE9DF",
                      borderRadius: "10px",
                      flexShrink: 0,
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: flagged ? "1.5px dashed rgba(140,28,19,0.40)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "34px",
                        backgroundColor: "rgba(26,26,24,0.12)",
                        borderRadius: "3px",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "6px",
                        textTransform: "uppercase",
                        color: flagged ? "#8C1C13" : "rgba(26,26,24,0.40)",
                        marginTop: "4px",
                        textAlign: "center",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {p}
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  width: "54px",
                  aspectRatio: "3 / 4",
                  border: "1px dashed rgba(26,26,24,0.15)",
                  borderRadius: "10px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.30)",
                  backgroundColor: "transparent",
                }}
              >
                + Add
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
              {d.photoReady && (
                <span
                  style={{
                    backgroundColor: "rgba(242,201,76,0.12)",
                    color: "#F2C94C",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "2px 7px",
                    borderRadius: "99px",
                  }}
                >
                  ✦ Photo-ready
                </span>
              )}
              {d.share && (
                <span
                  style={{
                    backgroundColor: "rgba(79,182,200,0.12)",
                    color: "#4FB6C8",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "2px 7px",
                    borderRadius: "99px",
                  }}
                >
                  Share look →
                </span>
              )}
            </div>
          </div>
        ))}
        <div
          style={{
            borderTop: "0.5px solid rgba(26,26,24,0.07)",
            paddingTop: "10px",
            marginTop: "4px",
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            color: "rgba(26,26,24,0.35)",
            letterSpacing: "0.08em",
          }}
        >
          + Plan another day
        </div>
      </section>

      {/* SECTION 7 — PACKING LIST */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>PACKING LIST · ESSENTIALS</span>
        <Category name="Tech & travel" done={0} total={4} items={cat1} pillAccent={false} />
        <Category name="Toiletries" done={2} total={5} items={cat2} pillAccent={true} />
        <Category name="Documents" done={3} total={3} items={cat3} pillAccent={true} />
      </section>

      {/* SECTION 8 — SHOPPING GAPS */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>SHOPPING GAPS · CURA DETECTED</span>
        {[
          {
            name: "Reef sandals",
            iconBg: "rgba(140,28,19,0.10)",
            reason: "Beach days · not in wardrobe",
            buy: "Find on ASOS or Zara ↗",
            priority: "Must have",
            pillBg: "rgba(140,28,19,0.10)",
            pillColor: "#8C1C13",
          },
          {
            name: "Light layer / jacket",
            iconBg: "rgba(140,28,19,0.10)",
            reason: "Cooler evenings · Alberobello",
            buy: "Add from wardrobe or buy ↗",
            priority: "Must have",
            pillBg: "rgba(140,28,19,0.10)",
            pillColor: "#8C1C13",
          },
          {
            name: "Waterproof pouch",
            iconBg: "rgba(79,182,200,0.10)",
            reason: "Beach + boat days",
            buy: "Find on Amazon ↗",
            priority: "Important",
            pillBg: "rgba(79,182,200,0.12)",
            pillColor: "#4FB6C8",
          },
          {
            name: "EU power adaptor",
            iconBg: "rgba(79,182,200,0.10)",
            reason: "UAE plug incompatible",
            buy: "Find on Amazon ↗",
            priority: "Important",
            pillBg: "rgba(79,182,200,0.12)",
            pillColor: "#4FB6C8",
          },
          {
            name: "Luggage cubes",
            iconBg: "rgba(26,26,24,0.06)",
            reason: "10 nights · organisation",
            buy: "",
            priority: "Nice to have",
            pillBg: "rgba(26,26,24,0.07)",
            pillColor: "rgba(26,26,24,0.45)",
          },
        ].map((g, i, arr) => (
          <div
            key={g.name}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "9px 0",
              borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                backgroundColor: g.iconBg,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>
                {g.name}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  marginTop: "2px",
                  letterSpacing: "0.05em",
                }}
              >
                {g.reason}
              </div>
              {g.buy && (
                <Link
                  to="/trip/puglia"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    color: "#4FB6C8",
                    marginTop: "3px",
                    display: "block",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  {g.buy}
                </Link>
              )}
            </div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                textTransform: "uppercase",
                padding: "2px 7px",
                borderRadius: "99px",
                whiteSpace: "nowrap",
                backgroundColor: g.pillBg,
                color: g.pillColor,
              }}
            >
              {g.priority}
            </span>
          </div>
        ))}
      </section>

      {/* SECTION 9 — LUGGAGE LOGIC */}
      <section
        style={{
          backgroundColor: "#F5F0E8",
          padding: "14px 16px 32px 16px",
        }}
      >
        <span style={sectionLabel}>LUGGAGE LOGIC</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          {[
            { l: "CHECKED BAG", v: "1 × 23kg" },
            { l: "CARRY-ON", v: "1 × 7kg" },
          ].map((c) => (
            <div
              key={c.l}
              style={{
                backgroundColor: "#EFE9DF",
                borderRadius: "14px",
                padding: "12px",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "8px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                }}
              >
                {c.l}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#1A1A18" }}>
                {c.v}
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#EFE9DF", borderRadius: "14px", padding: "12px" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              color: "rgba(26,26,24,0.35)",
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            TSA · LIQUIDS RULE
          </div>
          {[
            { dot: "#8C1C13", n: "SPF, serums, shampoo", r: "Checked bag only · over 100ml" },
            { dot: "#4FB6C8", n: "Makeup, perfume samples", r: "Carry-on · under 100ml in zip bag" },
            { dot: "#4FB6C8", n: "Medications", r: "Carry-on · keep in original packaging" },
          ].map((row, i, arr) => (
            <div
              key={row.n}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                padding: "7px 0",
                borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.06)",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: row.dot,
                  flexShrink: 0,
                  marginTop: "5px",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>
                  {row.n}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    color: "rgba(26,26,24,0.40)",
                    marginTop: "2px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {row.r}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TripPack;
