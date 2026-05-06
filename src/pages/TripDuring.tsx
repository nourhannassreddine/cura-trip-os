import { Link } from "react-router-dom";

const IVORY = "#F5F0E8";
const INK = "#1A1A18";
const RED = "#BA181B";
const OCHRE = "#C24E2A";
const YELLOW = "#F2C94C";
const AQUA = "#4FB6C8";
const OLIVE = "#6B7D3D";
const PAPER = "#F5F0E8";
const SAND = "#EFE9DF";

const sectionLabel: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "rgba(26,26,24,0.40)",
  marginBottom: "10px",
};

const playfair = "'Playfair Display', serif";
const inter = "Inter, sans-serif";

const TripDuring = () => {
  return (
    <div style={{ maxWidth: "390px", margin: "0 auto", background: PAPER, minHeight: "100vh", color: INK, fontFamily: inter }}>
      {/* SECTION 1 — HERO */}
      <div
        style={{
          position: "relative",
          height: "200px",
          backgroundImage:
            "linear-gradient(160deg, rgba(140,28,19,0.90) 0%, rgba(186,24,27,0.85) 60%, rgba(194,78,42,0.80) 100%), url('https://images.unsplash.com/photo-1534445538923-ab0f57a02eb5?w=400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", top: "12px", left: "14px", right: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/trip/puglia" style={{ color: "rgba(245,240,232,0.85)", fontSize: "18px", textDecoration: "none" }}>←</Link>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(245,240,232,0.15)", border: "1px solid rgba(245,240,232,0.25)", borderRadius: "99px", padding: "4px 10px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: IVORY }} />
            <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.12em", color: IVORY }}>LIVE · DAY 2</span>
          </div>
        </div>

        <div style={{ position: "absolute", top: "44px", left: "14px" }}>
          <div style={{ fontFamily: inter, fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(245,240,232,0.55)" }}>
            Thursday · 2:47 PM · Puglia
          </div>
          <div style={{ fontFamily: playfair, fontSize: "28px", color: IVORY, lineHeight: 1, marginTop: "4px" }}>Day 2.</div>
          <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "15px", color: "rgba(245,240,232,0.70)", marginTop: "2px" }}>You are here.</div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.20)", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {[
            { v: "32°C", k: "Sunny" },
            { v: "3 of 5", k: "Stops done" },
            { v: "€140", k: "Spent today" },
            { v: "On track", k: "Status" },
          ].map((s, i, arr) => (
            <div key={s.k} style={{ display: "contents" }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontFamily: playfair, fontSize: "16px", color: IVORY }}>{s.v}</div>
                <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(245,240,232,0.50)", marginTop: "1px" }}>{s.k}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: "1px", height: "28px", background: "rgba(245,240,232,0.15)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 — STATUS STRIP */}
      <div style={{ background: RED, padding: "7px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(245,240,232,0.70)" }}>NEXT STOP IN 25 MIN</span>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: OLIVE }} />
          <span style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(245,240,232,0.90)" }}>RUNNING ON TIME</span>
        </div>
      </div>

      {/* SECTION 3 — MORNING BRIEF */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>MORNING BRIEF · CURA</div>
        <div style={{ background: "linear-gradient(135deg, rgba(186,24,27,0.06) 0%, rgba(194,78,42,0.04) 100%)", borderRadius: "16px", padding: "14px", border: "1px solid rgba(186,24,27,0.12)" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: RED, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(245,240,232,0.80)" }} />
            </div>
            <p style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.65)", lineHeight: 1.5, margin: 0 }}>
              "A long day ahead. The trulli at 9am are worth the early start. Watch your time at Locorotondo — the sunset at Polignano cannot be missed."
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {[
              { v: "8:47 PM", k: "Sunset · do not miss", c: RED },
              { v: "9:00 PM", k: "Dinner · Il Bastione" },
              { v: "32°C", k: "Hot · stay hydrated" },
              { v: "Full", k: "Energy · from yesterday" },
            ].map((s) => (
              <div key={s.k} style={{ background: "rgba(245,240,232,0.80)", borderRadius: "10px", padding: "8px 10px" }}>
                <div style={{ fontFamily: playfair, fontSize: "15px", color: INK }}>{s.v}</div>
                <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "2px", color: s.c || "rgba(26,26,24,0.45)" }}>{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — YOU ARE HERE */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>YOU ARE HERE</div>
        <div style={{ background: RED, borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ position: "relative", height: "70px", backgroundImage: "linear-gradient(rgba(186,24,27,0.55), rgba(186,24,27,0.55)), url('https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=400&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div style={{ position: "absolute", top: "8px", left: "10px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(245,240,232,0.70)" }}>CURRENT LOCATION</div>
            <div style={{ position: "absolute", bottom: "8px", left: "10px", fontFamily: playfair, fontSize: "15px", color: IVORY }}>Locorotondo</div>
          </div>
          <div style={{ padding: "10px 12px" }}>
            <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(245,240,232,0.55)", marginBottom: "8px" }}>
              Here since 3:00 PM · 47 min · 15 min over plan
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(245,240,232,0.55)" }}>NEXT STOP</div>
                <div style={{ fontFamily: playfair, fontSize: "13px", color: IVORY, marginTop: "2px" }}>Polignano a Mare · 25 min drive</div>
              </div>
              <Link to="/trip/puglia" style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "5px 12px", borderRadius: "99px", background: "rgba(245,240,232,0.20)", color: IVORY, border: "1px solid rgba(245,240,232,0.25)", textDecoration: "none" }}>
                Leave now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — TIME ALERT */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={{ background: "rgba(242,201,76,0.10)", borderLeft: `3px solid ${YELLOW}`, borderRadius: "0 12px 12px 0", padding: "10px 12px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(242,201,76,0.20)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: YELLOW }} />
          </div>
          <div>
            <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: OCHRE, marginBottom: "4px" }}>✦ TIME ALERT</div>
            <p style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.65)", lineHeight: 1.4, margin: 0 }}>
              "15 min behind. Skip the second viewpoint — you will still make sunset with 10 min to spare."
            </p>
            <Link to="/trip/puglia" style={{ display: "block", fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: OCHRE, marginTop: "5px", textDecoration: "none" }}>
              Adjust plan automatically →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WEATHER PIVOT */}
      <section style={{ padding: "0 14px 12px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={{ background: "rgba(79,182,200,0.08)", borderLeft: `3px solid ${AQUA}`, borderRadius: "0 12px 12px 0", padding: "10px 12px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(79,182,200,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: AQUA }} />
          </div>
          <div>
            <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: AQUA, marginBottom: "4px" }}>✦ WEATHER PIVOT</div>
            <p style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.65)", lineHeight: 1.4, margin: 0 }}>
              "Rain at 6pm. Your outdoor sunset spot is at 7:30. CURA has 3 covered alternatives nearby."
            </p>
            <Link to="/trip/puglia" style={{ display: "block", fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: AQUA, marginTop: "5px", textDecoration: "none" }}>
              See indoor alternatives →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — LIVE BUTTONS */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)", display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {[
          { l: "It's raining", c: RED, bg: "rgba(186,24,27,0.06)", bd: "rgba(186,24,27,0.30)" },
          { l: "We're tired", c: RED, bg: "rgba(186,24,27,0.06)", bd: "rgba(186,24,27,0.30)" },
          { l: "More fun", c: "rgba(26,26,24,0.55)", bg: PAPER, bd: "rgba(26,26,24,0.18)" },
          { l: "Swap stop", c: "rgba(26,26,24,0.55)", bg: PAPER, bd: "rgba(26,26,24,0.18)" },
          { l: "Photo mode", c: "rgba(26,26,24,0.60)", bg: "rgba(242,201,76,0.10)", bd: "rgba(242,201,76,0.40)" },
          { l: "Low budget", c: "rgba(26,26,24,0.60)", bg: "rgba(242,201,76,0.10)", bd: "rgba(242,201,76,0.40)" },
        ].map((b) => (
          <button key={b.l} style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "5px 10px", borderRadius: "99px", border: `1px solid ${b.bd}`, background: b.bg, color: b.c }}>
            {b.l}
          </button>
        ))}
      </section>

      {/* SECTION 8 — UP NEXT TODAY */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>UP NEXT TODAY</div>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none" }}>
          {[
            { time: "7:30 PM", name: "Polignano a Mare", tag: "Sunset ✦", tagC: YELLOW, photo: "https://images.unsplash.com/photo-1534078362425-387ae9668c17?w=200&q=80" },
            { time: "9:00 PM", name: "Il Bastione", tag: "Reserved ✓", tagC: OLIVE, photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80" },
            { time: "11:00 PM", name: "Return to stay", tag: "Later", tagC: "rgba(26,26,24,0.35)", photo: null },
          ].map((c, i) => (
            <div key={i} style={{ minWidth: "100px", flexShrink: 0, borderRadius: "14px", overflow: "hidden", opacity: c.photo ? 1 : 0.4 }}>
              <div style={{ position: "relative", height: "60px", background: c.photo ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${c.photo}') center/cover` : "#D3CFC6" }}>
                <div style={{ position: "absolute", top: "5px", left: "7px", fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", color: c.photo ? "rgba(245,240,232,0.80)" : "rgba(26,26,24,0.50)" }}>{c.time}</div>
              </div>
              <div style={{ background: SAND, padding: "7px 8px" }}>
                <div style={{ fontFamily: playfair, fontSize: "11px", color: INK, lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "3px", color: c.tagC }}>{c.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — TODAY'S SPEND */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>TODAY'S SPEND</div>
        <div style={{ fontFamily: playfair, fontSize: "36px", color: RED, textAlign: "center", margin: "4px 0" }}>€140</div>
        <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(26,26,24,0.40)", textAlign: "center", marginBottom: "10px" }}>
          of €250 daily budget · €110 remaining
        </div>
        <div style={{ height: "6px", background: "rgba(26,26,24,0.10)", borderRadius: "3px", overflow: "hidden" }}>
          <div style={{ width: "56%", height: "100%", background: RED, borderRadius: "3px" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(26,26,24,0.35)" }}>€0</span>
          <span style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(26,26,24,0.35)" }}>€250</span>
        </div>
        <Link to="/trip/puglia" style={{ display: "block", fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: RED, textAlign: "center", marginTop: "10px", textDecoration: "none" }}>
          + Log expense →
        </Link>
      </section>

      {/* SECTION 10 — NEARBY RIGHT NOW */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>NEARBY RIGHT NOW · WITHIN 15 MIN</div>
        <div style={{ height: "90px", background: "linear-gradient(135deg, #EFE9DF 0%, #E8E2D8 100%)", borderRadius: "12px", position: "relative", overflow: "hidden", marginBottom: "10px" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(26,26,24,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,24,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid rgba(186,24,27,0.25)" }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "14px", height: "14px", borderRadius: "50%", background: RED, border: `3px solid ${IVORY}` }} />
          {/* Pin 1 */}
          <div style={{ position: "absolute", left: "30%", top: "35%", width: "8px", height: "8px", borderRadius: "50%", background: RED, border: `2px solid ${IVORY}` }} />
          <div style={{ position: "absolute", left: "34%", top: "28%", fontFamily: inter, fontSize: "6px", color: RED, background: IVORY, padding: "2px 5px", borderRadius: "99px" }}>8 min</div>
          {/* Pin 2 */}
          <div style={{ position: "absolute", left: "60%", top: "55%", width: "8px", height: "8px", borderRadius: "50%", background: AQUA, border: `2px solid ${IVORY}` }} />
          <div style={{ position: "absolute", left: "64%", top: "48%", fontFamily: inter, fontSize: "6px", color: AQUA, background: IVORY, padding: "2px 5px", borderRadius: "99px" }}>4 min</div>
          {/* Pin 3 */}
          <div style={{ position: "absolute", left: "45%", top: "70%", width: "8px", height: "8px", borderRadius: "50%", background: OLIVE, border: `2px solid ${IVORY}` }} />
          <div style={{ position: "absolute", left: "49%", top: "63%", fontFamily: inter, fontSize: "6px", color: OLIVE, background: IVORY, padding: "2px 5px", borderRadius: "99px" }}>6 min</div>
        </div>
        {[
          { name: "Osteria Borghese", sub: "Restaurant · saved", dist: "8 min walk", c: RED, bg: "rgba(186,24,27,0.10)" },
          { name: "Ceramiche Artigianali", sub: "Shopping · saved", dist: "4 min walk", c: AQUA, bg: "rgba(79,182,200,0.10)" },
          { name: "Belvedere di Locorotondo", sub: "Viewpoint · not saved", dist: "6 min walk", c: OLIVE, bg: "rgba(107,125,61,0.10)" },
        ].map((r, i, arr) => (
          <div key={r.name} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: r.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: r.c }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: playfair, fontSize: "12px", color: INK }}>{r.name}</div>
              <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(26,26,24,0.40)", marginTop: "1px" }}>{r.sub}</div>
            </div>
            <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(26,26,24,0.40)" }}>{r.dist}</div>
          </div>
        ))}
      </section>

      {/* SECTION 11 — PHOTO MODE */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>PHOTO MODE · LOCOROTONDO</div>
        {[
          { done: true, name: "Whitewashed rooftops from above", status: "Captured ✓" },
          { done: false, name: "Narrow alley with hanging plants", status: "Not yet" },
          { done: false, name: "Circular town wall at dusk", status: "Best at sunset" },
        ].map((s, i, arr) => (
          <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "6px 0", borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: s.done ? OLIVE : "transparent", border: s.done ? `1.5px solid ${OLIVE}` : "1.5px solid rgba(26,26,24,0.20)", marginTop: "2px", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: playfair, fontSize: "12px", color: INK }}>{s.name}</div>
              <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", color: s.done ? OLIVE : "rgba(26,26,24,0.35)", marginTop: "2px" }}>{s.status}</div>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 12 — QUICK ACTIONS */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>QUICK ACTIONS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            { name: "Call driver", sub: "Saved contact", bg: "rgba(186,24,27,0.10)" },
            { name: "Reservation", sub: "Il Bastione · 9PM", bg: "rgba(107,125,61,0.12)" },
            { name: "Ride app", sub: "Nearest taxi", bg: "rgba(79,182,200,0.12)" },
            { name: "Group chat", sub: "Trip message", bg: "rgba(194,78,42,0.10)" },
          ].map((c) => (
            <div key={c.name} style={{ background: SAND, borderRadius: "12px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: c.bg, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: playfair, fontSize: "12px", color: INK }}>{c.name}</div>
                <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(26,26,24,0.40)", marginTop: "2px" }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 13 — EMERGENCY LAYER */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>EMERGENCY · ITALY</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            { name: "Emergency", val: "112", bg: "rgba(186,24,27,0.12)" },
            { name: "Police", val: "113", bg: "rgba(186,24,27,0.12)" },
            { name: "Embassy · Lebanon", val: "+39 06 872 8601", bg: "rgba(79,182,200,0.12)" },
            { name: "Insurance", val: "24hr hotline", bg: "rgba(107,125,61,0.12)" },
          ].map((c) => (
            <div key={c.name} style={{ background: SAND, borderRadius: "12px", padding: "10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: c.bg }} />
                <div style={{ fontFamily: playfair, fontSize: "11px", color: INK }}>{c.name}</div>
              </div>
              <div style={{ fontFamily: inter, fontSize: "12px", fontWeight: 500, color: RED }}>{c.val}</div>
            </div>
          ))}
        </div>
        <Link to="/trip/puglia" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(186,24,27,0.06)", border: "1px solid rgba(186,24,27,0.15)", borderRadius: "12px", padding: "10px 12px", marginTop: "8px", textDecoration: "none" }}>
          <span style={{ fontFamily: playfair, fontSize: "12px", color: RED }}>I lost my passport — what do I do?</span>
          <span style={{ color: RED, fontSize: "14px" }}>→</span>
        </Link>
      </section>

      {/* SECTION 14 — ASK CURA */}
      <section style={{ padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={sectionLabel}>ASK CURA ANYTHING</div>
        <div style={{ background: SAND, borderRadius: "14px", padding: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", color: IVORY, fontSize: "12px", flexShrink: 0 }}>✦</div>
            <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.40)" }}>Find me a covered spot for rain...</div>
          </div>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {["Skip something?", "Move dinner later", "Brunch nearby?", "What can we cut?"].map((p) => (
              <button key={p} style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 9px", borderRadius: "99px", border: "1px solid rgba(26,26,24,0.15)", color: "rgba(26,26,24,0.50)", background: "transparent" }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15 — END OF DAY CARD */}
      <div style={{ margin: "10px 14px 20px", background: SAND, borderRadius: "16px", padding: "16px" }}>
        <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(26,26,24,0.35)", marginBottom: "6px" }}>END OF DAY 2 · THURSDAY</div>
        <div style={{ fontFamily: playfair, fontStyle: "italic", fontSize: "16px", color: RED, lineHeight: 1.3, marginBottom: "12px" }}>
          "A long day. Worth every minute of it."
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "12px" }}>
          {[
            { v: "5", k: "Places" },
            { v: "42km", k: "Covered" },
            { v: "€240", k: "Spent" },
          ].map((s) => (
            <div key={s.k} style={{ background: "rgba(26,26,24,0.06)", borderRadius: "10px", padding: "8px", textAlign: "center" }}>
              <div style={{ fontFamily: playfair, fontSize: "18px", color: INK }}>{s.v}</div>
              <div style={{ fontFamily: inter, fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(26,26,24,0.35)", marginTop: "3px" }}>{s.k}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: inter, fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(26,26,24,0.35)", marginBottom: "6px" }}>HOW WAS TODAY?</div>
        <div style={{ display: "flex", gap: "5px" }}>
          {[
            { l: "Perfect", sel: true },
            { l: "Almost", sel: false },
            { l: "Tiring", sel: false },
            { l: "Bad", sel: false },
          ].map((b) => (
            <button key={b.l} style={{ flex: 1, borderRadius: "10px", padding: "7px 4px", textAlign: "center", fontSize: "8px", textTransform: "uppercase", fontFamily: inter, letterSpacing: "0.04em", border: "none", background: b.sel ? RED : "rgba(26,26,24,0.08)", color: b.sel ? IVORY : "rgba(26,26,24,0.40)" }}>
              {b.l}
            </button>
          ))}
        </div>
        <div style={{ borderTop: "0.5px solid rgba(26,26,24,0.10)", paddingTop: "10px", marginTop: "10px", fontFamily: playfair, fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.35)" }}>
          Add tonight's note before you sleep...
        </div>
      </div>
    </div>
  );
};

export default TripDuring;
