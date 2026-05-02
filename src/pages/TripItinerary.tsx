import { useState } from "react";
import { Link } from "react-router-dom";

const INK = "#1A1A18";
const IVORY = "#F5F0E8";
const PAPER = "#EFE9DF";
const OCHRE = "#C24E2A";
const MAHOGANY = "#BA181B";
const OLIVE = "#6B7D3D";
const YELLOW = "#F2C94C";
const AQUA = "#4FB6C8";

const playfair = "'Playfair Display', serif";
const inter = "'Inter', sans-serif";

type Tab = "DAYS" | "PLACES" | "MOOD" | "MAP";

const TripItinerary = () => {
  const [tab, setTab] = useState<Tab>("DAYS");

  const tabs: Tab[] = ["DAYS", "PLACES", "MOOD", "MAP"];

  return (
    <div style={{ maxWidth: "390px", margin: "0 auto", backgroundColor: IVORY, minHeight: "100vh", fontFamily: inter, color: INK }}>
      {/* SECTION 1 — HEADER */}
      <div style={{ position: "relative", height: "160px", width: "100%", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1534445538923-ab0f57a02eb5?w=800&q=80"
          alt="Puglia"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.75) 100%)" }} />
        {/* Top bar */}
        <div style={{ position: "absolute", top: "12px", left: "14px", right: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/trip/puglia" style={{ color: "rgba(245,240,232,0.85)", fontSize: "16px", textDecoration: "none" }}>←</Link>
          <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: OCHRE, color: IVORY, borderRadius: "99px", padding: "3px 10px" }}>ITINERARY</span>
        </div>
        {/* Bottom */}
        <div style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px" }}>
          <div style={{ fontFamily: inter, fontSize: "9px", color: "rgba(245,240,232,0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Puglia · Italy · Jun 12–22</div>
          <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "24px", color: IVORY, lineHeight: 1.1 }}>Your trip,</div>
          <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "24px", color: IVORY, lineHeight: 1.1, marginTop: "3px" }}>day by day.</div>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            {["10 nights", "First visit", "2 travellers"].map(c => (
              <span key={c} style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 8px", borderRadius: "99px", backgroundColor: "rgba(245,240,232,0.20)", color: IVORY }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2 — STICKY TAB BAR */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: PAPER, borderBottom: "0.5px solid rgba(26,26,24,0.10)", display: "flex" }}>
        {tabs.map(t => {
          const active = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.10em",
              padding: "10px 0", textAlign: "center", border: "none", background: "transparent",
              color: active ? OCHRE : "rgba(26,26,24,0.40)",
              borderBottom: active ? `2px solid ${OCHRE}` : "2px solid transparent",
              cursor: "pointer"
            }}>{t}</button>
          );
        })}
      </div>

      {/* SECTION 3 — TRIP STATS BAR */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        {[
          { v: "10", k: "Days" },
          { v: "24", k: "Places" },
          { v: "6", k: "Reserved" },
        ].map((s, i) => (
          <div key={s.k} style={{ padding: "10px", textAlign: "center", borderRight: i < 2 ? "0.5px solid rgba(26,26,24,0.08)" : "none" }}>
            <div style={{ fontFamily: playfair, fontSize: "16px", color: INK }}>{s.v}</div>
            <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(26,26,24,0.40)", marginTop: "2px" }}>{s.k}</div>
          </div>
        ))}
      </div>

      {/* SECTION 4 — CONFLICT DETECTOR */}
      <div style={{ margin: "10px 14px", backgroundColor: "rgba(194,78,42,0.08)", borderLeft: `3px solid ${OCHRE}`, borderRadius: "0 10px 10px 0", padding: "8px 12px" }}>
        <span style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.07em", color: OCHRE, display: "block", marginBottom: "3px" }}>✦ CURA detected 1 conflict</span>
        <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "11px", color: "rgba(26,26,24,0.65)", lineHeight: 1.4 }}>
          Day 4 has 6 stops across 3 towns — that's 4 hours of driving. Something needs to move.
        </div>
      </div>

      {tab === "DAYS" && <DaysTab />}
      {tab === "PLACES" && <PlacesTab />}
      {tab === "MOOD" && <MoodTab />}
      {tab === "MAP" && <MapTab />}
    </div>
  );
};

// ============ DAYS TAB ============
const DaysTab = () => {
  return (
    <div>
      {/* DAY 2 EXPANDED */}
      <div style={{ padding: "0 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <div>
            <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.10em", color: "rgba(26,26,24,0.40)" }}>Day 2 · Thursday Jun 13</div>
            <div style={{ fontFamily: playfair, fontSize: "18px", color: INK, marginTop: "2px", lineHeight: 1.2 }}>Alberobello & Locorotondo</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: inter, fontSize: "11px", color: AQUA }}>32°C  Sunny</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px", justifyContent: "flex-end" }}>
              <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)" }}>ENERGY</span>
              {[0,1,2].map(i => <span key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: OCHRE, display: "inline-block" }} />)}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ backgroundColor: "rgba(194,78,42,0.10)", border: "1px solid rgba(194,78,42,0.25)", borderRadius: "99px", padding: "3px 10px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: OCHRE }}>Packed & adventurous</span>
          <Link to="/trip/puglia/route" style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)", textDecoration: "none" }}>View on map →</Link>
        </div>

        {/* MORNING */}
        <SegmentLabel>MORNING</SegmentLabel>
        <PlaceCard
          image="https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=400&q=80"
          time="9:00 AM"
          duration="Est. 2 hrs"
          name="Trulli di Alberobello"
          verdict='"Worth every tourist in the room. Go before 9am — it is yours alone."'
          tags={[
            { label: "Actually worth it", bg: "rgba(107,125,61,0.12)", color: OLIVE },
            { label: "Better at dawn", bg: "rgba(242,201,76,0.12)", color: "rgba(26,26,24,0.60)" },
          ]}
          shotList={[
            "Trulli rooftops from the upper terrace",
            "The blue door on Via Monte Nero",
            "Narrow alley with hanging flowers",
          ]}
        />
        <Transit label="18 min drive" />

        {/* LUNCH */}
        <SegmentLabel>LUNCH</SegmentLabel>
        <RestaurantCard
          image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80"
          typePill="RESTAURANT"
          name="Osteria del Tempo Perso"
          dish="Must order: Orecchiette al ragù bianco"
          intel='"Ask for the terrace. Not on the menu — they will make it. Do not rush."'
          leftMeta="1:00 PM · Est. 1.5 hrs"
          actionLabel="BOOK NOW →"
          actionBg={OCHRE}
          actionColor={IVORY}
        />
        <Transit label="12 min walk" />

        {/* AFTERNOON */}
        <SegmentLabel>AFTERNOON</SegmentLabel>
        <PlaceCard
          image="https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=400&q=80"
          time="3:00 PM"
          duration="Est. 90 min"
          name="Locorotondo Centro Storico"
          verdict='"Slower and more beautiful than Alberobello. Give it 90 minutes minimum."'
          tags={[
            { label: "Deep cut", bg: "rgba(79,182,200,0.12)", color: AQUA },
            { label: "Photo-heavy", bg: "rgba(242,201,76,0.12)", color: "rgba(26,26,24,0.60)" },
          ]}
        />
        <Transit label="25 min drive" />

        {/* EVENING */}
        <SegmentLabel>EVENING</SegmentLabel>
        <PlaceCard
          image="https://images.unsplash.com/photo-1534078362425-387ae9668c17?w=400&q=80"
          time="7:30 PM"
          duration="Est. 2 hrs"
          name="Polignano a Mare"
          verdict='"Sunset at 8:47pm. Be at the cliff by 8:15 for the best light."'
          extra={
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(242,201,76,0.12)", borderRadius: "10px", padding: "7px 10px", marginTop: "6px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: YELLOW, flexShrink: 0 }} />
              <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "11px", color: "rgba(26,26,24,0.65)" }}>Golden hour: 8:47pm sunset — be there by 8:15</div>
            </div>
          }
        />

        <RestaurantCard
          image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"
          typePill="DINNER"
          name="Il Bastione"
          dish="Must order: Burrata di Andria + grilled octopus"
          intel='"Dress well. Terrace table only. Reserve at least 2 weeks out."'
          leftMeta="9:00 PM"
          actionLabel="RESERVED ✓"
          actionBg="rgba(107,125,61,0.15)"
          actionColor={OLIVE}
          marginTop="8px"
        />

        {/* OUTFIT STRIP */}
        <div style={{ marginTop: "12px" }}>
          <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.10em", color: "rgba(26,26,24,0.35)", marginBottom: "6px" }}>OUTFITS THIS DAY</div>
          <div style={{ display: "flex", gap: "6px" }}>
            {["Morning", "Lunch", "Sunset", "Dinner"].map(l => (
              <Link key={l} to="/trip/puglia/pack" style={{ width: "54px", textDecoration: "none" }}>
                <div style={{ width: "54px", height: "66px", borderRadius: "10px", backgroundColor: PAPER }} />
                <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)", textAlign: "center", marginTop: "4px" }}>{l}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* MEMORY STRIP */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: PAPER, borderRadius: "10px", padding: "8px 10px", marginTop: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "rgba(26,26,24,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1.5px solid rgba(26,26,24,0.30)" }} />
          </div>
          <span style={{ fontFamily: inter, fontSize: "11px", color: "rgba(26,26,24,0.40)", fontStyle: "italic" }}>Add a moment from today...</span>
        </div>

        {/* INTERACTIVE BUTTONS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}>
          {[
            { l: "It's raining", type: "urgent" },
            { l: "We're tired", type: "urgent" },
            { l: "Not feeling it", type: "neutral" },
            { l: "Swap day", type: "neutral" },
            { l: "Photo day", type: "yellow" },
            { l: "Low budget", type: "yellow" },
          ].map(b => {
            const styles = b.type === "urgent"
              ? { border: "1px solid rgba(186,24,27,0.30)", color: MAHOGANY, backgroundColor: "rgba(186,24,27,0.06)" }
              : b.type === "neutral"
              ? { border: "1px solid rgba(26,26,24,0.18)", color: "rgba(26,26,24,0.55)", backgroundColor: IVORY }
              : { border: "1px solid rgba(242,201,76,0.40)", color: "rgba(26,26,24,0.60)", backgroundColor: "rgba(242,201,76,0.10)" };
            return (
              <Link key={b.l} to="/trip/puglia/itinerary" style={{ ...styles, fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.05em", padding: "5px 10px", borderRadius: "99px", textDecoration: "none" }}>{b.l}</Link>
            );
          })}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ height: "8px", backgroundColor: "rgba(26,26,24,0.04)", margin: "14px 0" }} />

      {/* DAY 3 COLLAPSED */}
      <div style={{ padding: "0 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <div>
            <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)" }}>Day 3 · Friday Jun 14</div>
            <div style={{ fontFamily: playfair, fontSize: "16px", color: INK, marginTop: "2px" }}>Matera Day Trip</div>
          </div>
          <span style={{ backgroundColor: "rgba(194,78,42,0.10)", border: "1px solid rgba(194,78,42,0.25)", borderRadius: "99px", padding: "3px 10px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: OCHRE }}>Slow & indulgent</span>
        </div>
        <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: MAHOGANY, marginBottom: "8px" }}>Conflict: 6 stops · too many. Tap to resolve →</div>
      </div>

      <div style={{ height: "8px", backgroundColor: "rgba(26,26,24,0.04)", margin: "14px 0" }} />

      {/* DAY 4 COLLAPSED */}
      <div style={{ padding: "0 14px", marginBottom: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)" }}>Day 4 · Saturday Jun 15</div>
            <div style={{ fontFamily: playfair, fontSize: "16px", color: INK, marginTop: "2px" }}>Lecce & Gallipoli</div>
          </div>
          <span style={{ backgroundColor: "rgba(79,182,200,0.10)", border: "1px solid rgba(79,182,200,0.25)", borderRadius: "99px", padding: "3px 10px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: AQUA }}>Culture & depth</span>
        </div>
      </div>

      {/* ADD DAY */}
      <div style={{ margin: "10px 14px 24px", border: "1px dashed rgba(26,26,24,0.20)", borderRadius: "14px", padding: "12px", textAlign: "center" }}>
        <span style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.30)" }}>+ Add a day or regenerate with new mood</span>
      </div>
    </div>
  );
};

// Helpers
const SegmentLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.10em", color: "rgba(26,26,24,0.35)", margin: "10px 0 6px" }}>{children}</div>
);

const Transit = ({ label }: { label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 0", margin: "2px 0" }}>
    <span style={{ width: "16px", height: "1px", backgroundColor: "rgba(26,26,24,0.15)" }} />
    <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)" }}>{label}</span>
    <span style={{ width: "16px", height: "1px", backgroundColor: "rgba(26,26,24,0.15)" }} />
  </div>
);

interface PlaceCardProps {
  image: string;
  time: string;
  duration: string;
  name: string;
  verdict: string;
  tags?: { label: string; bg: string; color: string }[];
  shotList?: string[];
  extra?: React.ReactNode;
}
const PlaceCard = ({ image, time, duration, name, verdict, tags, shotList, extra }: PlaceCardProps) => (
  <div style={{ backgroundColor: PAPER, borderRadius: "14px", overflow: "hidden", marginBottom: "8px" }}>
    <div style={{ position: "relative", height: "72px" }}>
      <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)" }} />
      <div style={{ position: "absolute", bottom: "6px", left: "10px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", color: IVORY }}>{time}</div>
      <div style={{ position: "absolute", bottom: "6px", right: "10px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(245,240,232,0.70)" }}>{duration}</div>
    </div>
    <div style={{ padding: "8px 10px" }}>
      <div style={{ fontFamily: playfair, fontSize: "13px", color: INK, marginBottom: "3px" }}>{name}</div>
      <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "11px", color: "rgba(26,26,24,0.55)", lineHeight: 1.4, marginBottom: "5px" }}>{verdict}</div>
      {tags && (
        <div style={{ display: "flex", gap: "5px" }}>
          {tags.map(t => (
            <span key={t.label} style={{ backgroundColor: t.bg, color: t.color, fontFamily: inter, fontSize: "7px", textTransform: "uppercase", padding: "2px 6px", borderRadius: "99px" }}>{t.label}</span>
          ))}
        </div>
      )}
      {shotList && (
        <div style={{ backgroundColor: "rgba(26,26,24,0.04)", borderRadius: "10px", padding: "8px 10px", marginTop: "8px" }}>
          <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)", marginBottom: "6px" }}>PHOTO SHOT LIST</div>
          {shotList.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 0", borderBottom: i < shotList.length - 1 ? "0.5px solid rgba(26,26,24,0.06)" : "none" }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(26,26,24,0.25)", flexShrink: 0 }} />
              <span style={{ fontFamily: inter, fontSize: "11px", color: "rgba(26,26,24,0.60)" }}>{s}</span>
            </div>
          ))}
        </div>
      )}
      {extra}
    </div>
  </div>
);

interface RestaurantCardProps {
  image: string;
  typePill: string;
  name: string;
  dish: string;
  intel: string;
  leftMeta: string;
  actionLabel: string;
  actionBg: string;
  actionColor: string;
  marginTop?: string;
}
const RestaurantCard = ({ image, typePill, name, dish, intel, leftMeta, actionLabel, actionBg, actionColor, marginTop }: RestaurantCardProps) => (
  <div style={{ backgroundColor: PAPER, borderRadius: "14px", overflow: "hidden", marginBottom: "8px", marginTop }}>
    <div style={{ position: "relative", height: "64px" }}>
      <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }} />
      <span style={{ position: "absolute", top: "6px", left: "10px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", padding: "2px 7px", borderRadius: "99px", backgroundColor: "rgba(26,26,24,0.55)", color: IVORY }}>{typePill}</span>
    </div>
    <div style={{ padding: "8px 10px" }}>
      <div style={{ fontFamily: playfair, fontSize: "13px", color: INK }}>{name}</div>
      <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.05em", color: OCHRE, marginTop: "3px" }}>{dish}</div>
      <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "11px", color: "rgba(26,26,24,0.55)", lineHeight: 1.4, marginTop: "3px" }}>{intel}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
        <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)" }}>{leftMeta}</span>
        <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", padding: "3px 10px", borderRadius: "99px", backgroundColor: actionBg, color: actionColor }}>{actionLabel}</span>
      </div>
    </div>
  </div>
);

// ============ PLACES TAB ============
const PlacesTab = () => {
  const filters = ["All", "Eat", "See", "Stay", "Beach"];
  const places = [
    { name: "Trulli di Alberobello", img: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=400&q=80", cat: "SEE · Day 2", v: '"Go before 9am."', dot: OLIVE },
    { name: "Osteria del Tempo Perso", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80", cat: "EAT · Day 2 · Lunch", v: '"Order the orecchiette."', dot: OCHRE },
    { name: "Polignano a Mare", img: "https://images.unsplash.com/photo-1534078362425-387ae9668c17?w=200&q=80", cat: "SEE · Day 2 · Sunset", v: '"Sunset only."', dot: OLIVE },
    { name: "Il Bastione", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80", cat: "EAT · Day 2 · Dinner", v: '"Reserved ✓"', dot: OLIVE },
    { name: "Locorotondo Centro", img: "https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=200&q=80", cat: "SEE · Day 2 · Afternoon", v: "", dot: OLIVE },
    { name: "Sassi di Matera", img: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=200&q=80", cat: "SEE · Day 3", v: '"More dramatic than Alberobello."', dot: OLIVE },
    { name: "Torre dell'Orso Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80", cat: "BEACH · Day 5", v: "", dot: "rgba(26,26,24,0.20)" },
    { name: "Ciccio Sultano", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80", cat: "EAT · Not placed yet", v: '"Best table in the region."', dot: "rgba(26,26,24,0.20)" },
  ];
  return (
    <div style={{ padding: "14px" }}>
      <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)", marginBottom: "10px" }}>ALL SAVED PLACES · 24 TOTAL</div>
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", marginBottom: "12px", scrollbarWidth: "none" }}>
        {filters.map((f, i) => (
          <span key={f} style={{
            backgroundColor: i === 0 ? OCHRE : PAPER,
            color: i === 0 ? IVORY : "rgba(26,26,24,0.55)",
            fontFamily: inter, fontSize: "7px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "99px", whiteSpace: "nowrap"
          }}>{f}</span>
        ))}
      </div>
      {places.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < places.length - 1 ? "0.5px solid rgba(26,26,24,0.07)" : "none" }}>
          <div style={{ width: "44px", height: "52px", borderRadius: "10px", backgroundImage: `url(${p.img})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: playfair, fontSize: "13px", color: INK }}>{p.name}</div>
            <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)", marginTop: "2px" }}>{p.cat}</div>
            {p.v && <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "11px", color: "rgba(26,26,24,0.50)", marginTop: "2px" }}>{p.v}</div>}
          </div>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: p.dot, flexShrink: 0 }} />
        </div>
      ))}
    </div>
  );
};

// ============ MOOD TAB ============
const MoodTab = () => {
  const days = [
    { n: "1", l: "Jun 12" },
    { n: "2", l: "Jun 13" },
    { n: "3", l: "Jun 14" },
    { n: "4", l: "Jun 15" },
    { n: "5", l: "Jun 16" },
    { n: "6", l: "Jun 17" },
  ];
  const moods = [
    { icon: "⚡", name: "Packed & adventurous", sub: "Full day · maximum places · high energy", selected: true, bg: "rgba(194,78,42,0.10)" },
    { icon: "☁", name: "Slow & indulgent", sub: "Long lunches · no rushing · low agenda", bg: PAPER },
    { icon: "⊞", name: "Culture & depth", sub: "Museums · history · guided experiences", bg: PAPER },
    { icon: "∿", name: "Beach & nothing", sub: "One spot · read · swim · stay put", bg: PAPER },
    { icon: "◎", name: "Photo-heavy day", sub: "Golden hour · shot lists · best light", bg: PAPER },
    { icon: "⊕", name: "Local & off-path", sub: "No tourists · hidden spots · real Puglia", bg: PAPER },
    { icon: "◇", name: "Luxury splurge", sub: "Best table · upgrade · no budget today", bg: PAPER },
    { icon: "✦", name: "Surprise me", sub: "CURA picks everything · full trust mode", bg: "rgba(242,201,76,0.12)", border: "1px solid rgba(242,201,76,0.30)", nameColor: OCHRE },
  ];

  return (
    <div>
      {/* CURA intro */}
      <div style={{ margin: "14px 14px 0", backgroundColor: PAPER, borderLeft: `3px solid ${OCHRE}`, borderRadius: "0 12px 12px 0", padding: "10px 12px" }}>
        <span style={{ fontFamily: inter, fontSize: "9px", color: OCHRE, display: "block", marginBottom: "4px" }}>✦ CURA</span>
        <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "13px", color: "rgba(26,26,24,0.65)", lineHeight: 1.6 }}>
          Pick a day, tell me how you want to feel, set your energy. I will build the entire day around that. One tap.
        </div>
      </div>

      {/* DAY SELECTOR */}
      <div style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)", overflowX: "auto", display: "flex", gap: "6px", scrollbarWidth: "none" }}>
        {days.map((d, i) => {
          const active = i === 1;
          return (
            <div key={d.n} style={{
              backgroundColor: active ? OCHRE : PAPER,
              borderRadius: "10px", padding: "7px 8px", minWidth: "52px", textAlign: "center", flexShrink: 0
            }}>
              <div style={{ fontFamily: playfair, fontSize: "14px", color: active ? IVORY : INK }}>{d.n}</div>
              <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: active ? "rgba(245,240,232,0.70)" : "rgba(26,26,24,0.40)", marginTop: "2px" }}>{d.l}</div>
            </div>
          );
        })}
      </div>

      {/* MOOD GRID */}
      <div style={{ padding: "14px" }}>
        <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)", marginBottom: "12px" }}>HOW DO YOU WANT DAY 2 TO FEEL?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
          {moods.map(m => (
            <div key={m.name} style={{
              borderRadius: "16px", padding: "14px 12px", position: "relative",
              backgroundColor: m.bg,
              border: m.selected ? `2px solid ${OCHRE}` : (m.border || "2px solid transparent")
            }}>
              <span style={{ fontSize: "20px", display: "block", marginBottom: "6px" }}>{m.icon}</span>
              <div style={{ fontFamily: playfair, fontSize: "13px", color: m.nameColor || INK, lineHeight: 1.2, marginBottom: "3px" }}>{m.name}</div>
              <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)", lineHeight: 1.4 }}>{m.sub}</div>
              {m.selected && (
                <div style={{ position: "absolute", top: "8px", right: "8px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: OCHRE, color: IVORY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>✓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ENERGY LEVEL */}
      <div style={{ padding: "0 14px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)" }}>ENERGY LEVEL FOR THIS DAY</span>
          <span style={{ fontFamily: playfair, fontSize: "14px", color: OCHRE }}>Full</span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ flex: 1, height: "8px", borderRadius: "4px", backgroundColor: i < 3 ? OCHRE : "rgba(26,26,24,0.10)" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
          <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)" }}>Low</span>
          <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)" }}>Full</span>
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <div style={{ margin: "14px 14px 0" }}>
        <button style={{
          width: "100%", backgroundColor: OCHRE, color: IVORY, border: "none",
          borderRadius: "20px", padding: "13px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          fontFamily: playfair, fontSize: "14px", cursor: "pointer"
        }}>✦  Generate Day 2 with this mood</button>
      </div>

      {/* GENERATED PLAN */}
      <div style={{ padding: "14px" }}>
        <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)", marginBottom: "10px" }}>GENERATED PLAN · PACKED & ADVENTUROUS</div>
        {[
          { img: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=400&q=80", time: "9:00 AM · Trulli di Alberobello", v: '"Worth every tourist. Go before 9am."', transit: "18 min drive" },
          { img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", time: "1:00 PM · Osteria del Tempo Perso", v: '"Order the orecchiette. Ask for terrace."', transit: "12 min walk" },
          { img: "https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=400&q=80", time: "3:00 PM · Locorotondo", v: '"Slower and more beautiful."', transit: null },
        ].map((p, i) => (
          <div key={i}>
            <div style={{ backgroundColor: PAPER, borderRadius: "14px", overflow: "hidden", marginBottom: "6px" }}>
              <div style={{ position: "relative", height: "60px" }}>
                <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)" }} />
                <div style={{ position: "absolute", bottom: "6px", left: "10px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: IVORY }}>{p.time}</div>
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "11px", color: "rgba(26,26,24,0.55)" }}>{p.v}</div>
              </div>
            </div>
            {p.transit && <Transit label={p.transit} />}
          </div>
        ))}
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button style={{ flex: 1, backgroundColor: OCHRE, color: IVORY, border: "none", borderRadius: "20px", padding: "10px", textAlign: "center", fontFamily: inter, fontSize: "8px", textTransform: "uppercase", cursor: "pointer" }}>Apply this plan →</button>
          <button style={{ backgroundColor: PAPER, border: "none", borderRadius: "20px", padding: "10px 14px", fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.55)", cursor: "pointer" }}>Regenerate</button>
        </div>
      </div>

      {/* ALTERNATIVE SUGGESTIONS */}
      <div style={{ padding: "0 14px 14px" }}>
        <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)", marginBottom: "8px" }}>NOT FEELING SOMETHING? SWAP IT OUT.</div>
        <div style={{ backgroundColor: PAPER, borderRadius: "12px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{ width: "36px", height: "44px", borderRadius: "8px", backgroundImage: "url(https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=400&q=80)", backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: playfair, fontSize: "12px", color: INK }}>Trulli di Alberobello</div>
            <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)", marginTop: "2px" }}>Currently on Day 2 · Morning</div>
          </div>
          <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", padding: "4px 10px", borderRadius: "99px", border: "1px solid rgba(26,26,24,0.20)", color: "rgba(26,26,24,0.55)" }}>SWAP →</span>
        </div>
        <div style={{ backgroundColor: PAPER, borderRadius: "12px", padding: "10px 12px", border: "1px solid rgba(107,125,61,0.25)" }}>
          <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: OLIVE, marginBottom: "4px" }}>✦ Alternative</div>
          <div style={{ fontFamily: playfair, fontSize: "12px", color: INK }}>Sassi di Matera</div>
          <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)", marginTop: "2px" }}>90 min drive · UNESCO · Full morning</div>
          <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "11px", color: "rgba(26,26,24,0.55)", marginTop: "4px", lineHeight: 1.4 }}>"More dramatic than Alberobello. Worth the drive if you have the time."</div>
          <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
            <span style={{ backgroundColor: OLIVE, color: IVORY, fontFamily: inter, fontSize: "7px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "99px" }}>USE THIS INSTEAD →</span>
            <span style={{ border: "1px solid rgba(26,26,24,0.18)", color: "rgba(26,26,24,0.50)", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "99px" }}>SHOW MORE</span>
          </div>
        </div>
      </div>

      {/* CONFLICT DETECTOR */}
      <div style={{ margin: "0 14px 14px", backgroundColor: "rgba(194,78,42,0.08)", borderLeft: `3px solid ${OCHRE}`, borderRadius: "0 12px 12px 0", padding: "10px 12px" }}>
        <span style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: OCHRE, display: "block", marginBottom: "6px" }}>✦ CURA CONFLICT DETECTOR</span>
        {[
          { t: "Day 4 has 6 stops across 3 towns — 4 hours of driving. Something needs to move.", f: "Move Ostuni to Day 5 →" },
          { t: "Il Bastione on Day 6 requires a reservation — it's 6 weeks out. Book now.", f: "Book reservation →" },
          { t: "Beach morning and cave tour back to back on Day 7 — swap the order.", f: "Swap order automatically →" },
        ].map((c, i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px", padding: "5px 0", borderBottom: i < arr.length - 1 ? "0.5px solid rgba(194,78,42,0.15)" : "none" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: OCHRE, flexShrink: 0, marginTop: "4px" }} />
            <div>
              <div style={{ fontFamily: inter, fontSize: "11px", color: "rgba(26,26,24,0.65)", lineHeight: 1.4 }}>{c.t}</div>
              <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: OCHRE, marginTop: "3px" }}>{c.f}</div>
            </div>
          </div>
        ))}
      </div>

      {/* COLLABORATIVE VOTING */}
      <div style={{ margin: "0 14px 20px" }}>
        <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.35)", marginBottom: "8px" }}>COLLABORATIVE VOTING · DAY 2</div>
        {[
          {
            name: "Trulli di Alberobello · Morning",
            votes: [
              { i: "NR", bg: "rgba(194,78,42,0.15)", c: OCHRE, dir: "↑", dirColor: OLIVE },
              { i: "TR", bg: "rgba(107,125,61,0.15)", c: OLIVE, dir: "↑", dirColor: OLIVE },
            ],
            label: "2 / 2 want this", labelColor: OLIVE
          },
          {
            name: "Osteria del Tempo Perso · Lunch",
            votes: [
              { i: "NR", bg: "rgba(194,78,42,0.15)", c: OCHRE, dir: "↑", dirColor: OLIVE },
              { i: "TR", bg: "rgba(186,24,27,0.10)", c: MAHOGANY, dir: "↓", dirColor: MAHOGANY },
            ],
            label: "1 / 2 conflict", labelColor: MAHOGANY
          },
        ].map((v, i) => (
          <div key={i} style={{ backgroundColor: PAPER, borderRadius: "12px", padding: "10px 12px", marginBottom: "6px" }}>
            <div style={{ fontFamily: playfair, fontSize: "12px", color: INK, marginBottom: "6px" }}>{v.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {v.votes.map((vote, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: vote.bg, color: vote.c, fontFamily: inter, fontSize: "7px", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center" }}>{vote.i}</span>
                  <span style={{ color: vote.dirColor, fontSize: "10px" }}>{vote.dir}</span>
                </div>
              ))}
              <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", color: v.labelColor, marginLeft: "auto" }}>{v.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ MAP TAB ============
const MapTab = () => (
  <div style={{ padding: "14px" }}>
    <div style={{ backgroundColor: PAPER, borderRadius: "18px", height: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
      <span style={{ color: OCHRE, fontSize: "18px" }}>✦</span>
      <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "16px", color: "rgba(26,26,24,0.65)" }}>Trip map</div>
      <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)", marginTop: "4px" }}>See all 24 places across 10 days</div>
      <Link to="/trip/puglia/route" style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", padding: "8px 20px", borderRadius: "20px", backgroundColor: OCHRE, color: IVORY, textDecoration: "none", marginTop: "4px" }}>Open Route engine →</Link>
    </div>
  </div>
);

export default TripItinerary;
