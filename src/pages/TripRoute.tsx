import { Link } from "react-router-dom";

const IVORY = "#F5F0E8";
const INK = "#1A1A18";
const BONE = "#EFE9DF";
const AQUA = "#4FB6C8";
const OCHRE = "#C24E2A";
const OLIVE = "#6B7D3D";
const YELLOW = "#F2C94C";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "Inter", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(26,26,24,0.45)", marginBottom: "10px" }}>
    {children}
  </div>
);

const StatCard = ({ value, label, keyColor }: { value: string; label: string; keyColor?: string }) => (
  <div style={{ background: BONE, borderRadius: "12px", padding: "10px 12px" }}>
    <div style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", color: INK, lineHeight: 1 }}>{value}</div>
    <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", color: keyColor ?? "rgba(26,26,24,0.40)", marginTop: "4px" }}>{label}</div>
  </div>
);

const HealthBar = ({ label, pct, color, val }: { label: string; pct: number; color: string; val: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
    <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(26,26,24,0.45)", width: "80px", flexShrink: 0 }}>{label}</div>
    <div style={{ flex: 1, height: "4px", background: "rgba(26,26,24,0.10)", borderRadius: "2px", overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "4px", background: color, borderRadius: "2px" }} />
    </div>
    <div style={{ fontFamily: "Inter", fontSize: "8px", color: "rgba(26,26,24,0.40)", width: "28px", textAlign: "right" }}>{val}</div>
  </div>
);

const ModeIcon = ({ bg, shape }: { bg: string; shape: "car" | "ferry" | "train" }) => (
  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {shape === "car" && <div style={{ width: "14px", height: "8px", borderRadius: "2px", background: "rgba(26,26,24,0.55)" }} />}
    {shape === "ferry" && <div style={{ width: "16px", height: "6px", borderRadius: "10px", background: "rgba(26,26,24,0.55)" }} />}
    {shape === "train" && <div style={{ width: "12px", height: "12px", background: "rgba(26,26,24,0.55)" }} />}
  </div>
);

const TransportCard = ({
  iconBg, route, time, status, statusBg, statusColor, note,
}: { iconBg: string; route: string; time: string; status: string; statusBg: string; statusColor: string; note: string }) => (
  <div style={{ background: BONE, borderRadius: "14px", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderBottom: "0.5px solid rgba(26,26,24,0.07)" }}>
      <ModeIcon bg={iconBg} shape="car" />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: "12px", color: INK, lineHeight: 1.3 }}>{route}</div>
        <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(26,26,24,0.40)", marginTop: "2px" }}>{time}</div>
      </div>
      <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 8px", borderRadius: "99px", background: statusBg, color: statusColor, flexShrink: 0 }}>
        {status}
      </div>
    </div>
    <div style={{ padding: "8px 12px" }}>
      <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "11px", color: "rgba(26,26,24,0.55)", lineHeight: 1.4 }}>{note}</div>
    </div>
  </div>
);

const DotRoute = ({ color, labels }: { color: string; labels: string[] }) => (
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {labels.map((_, i) => (
        <>
          <div key={`d${i}`} style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, border: `2px solid ${IVORY}`, flexShrink: 0 }} />
          {i < labels.length - 1 && <div key={`l${i}`} style={{ flex: 1, height: "2px", background: color, borderRadius: "1px" }} />}
        </>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
      {labels.map((l, i) => (
        <div key={i} style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(26,26,24,0.45)" }}>{l}</div>
      ))}
    </div>
  </div>
);

const NeighborhoodRow = ({ img, name, meta, tag, tagBg, tagColor, last }: { img: string; name: string; meta: string; tag: string; tagBg: string; tagColor: string; last?: boolean }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0", borderBottom: last ? "none" : "0.5px solid rgba(26,26,24,0.07)" }}>
    <img src={img} alt={name} style={{ width: "44px", height: "52px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: "Playfair Display, serif", fontSize: "13px", color: INK }}>{name}</div>
      <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(26,26,24,0.40)", marginTop: "3px", lineHeight: 1.4 }}>{meta}</div>
      <div style={{ display: "inline-block", fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 7px", borderRadius: "99px", background: tagBg, color: tagColor, marginTop: "5px" }}>{tag}</div>
    </div>
  </div>
);

const WhatIfCard = ({ q, a, impact, color }: { q: string; a: string; impact: string; color: string }) => (
  <div style={{ background: BONE, borderRadius: "14px", padding: "12px 14px" }}>
    <div style={{ fontFamily: "Playfair Display, serif", fontSize: "13px", color: INK, marginBottom: "6px" }}>{q}</div>
    <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.65)", lineHeight: 1.4 }}>{a}</div>
    <div style={{ fontFamily: "Inter", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.08em", color, marginTop: "6px" }}>{impact}</div>
  </div>
);

export default function TripRoute() {
  return (
    <div style={{ maxWidth: "390px", margin: "0 auto", background: IVORY, minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ position: "relative", height: "170px", background: "linear-gradient(160deg, #2a5a4a 0%, #4FB6C8 100%)", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }}
        />
        <div style={{ position: "absolute", top: "12px", left: "14px", right: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/trip/puglia" style={{ fontSize: "16px", color: "rgba(245,240,232,0.85)", textDecoration: "none" }}>←</Link>
          <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em", background: AQUA, color: IVORY, borderRadius: "99px", padding: "3px 10px" }}>
            Route Engine
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px" }}>
          <div style={{ fontFamily: "Inter", fontSize: "9px", color: "rgba(245,240,232,0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Puglia · Italy · Jun 12–22
          </div>
          <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "22px", color: IVORY, lineHeight: 1.1, marginTop: "4px" }}>
            Your trip,
          </div>
          <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "22px", color: IVORY, lineHeight: 1.1, marginTop: "2px" }}>
            mapped.
          </div>
          <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
            {["10 days", "487 km total", "8 stops"].map((c) => (
              <span key={c} style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 8px", borderRadius: "99px", background: "rgba(245,240,232,0.20)", color: IVORY }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2 — DISTANCE SUMMARY */}
      <div style={{ background: IVORY, padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <SectionLabel>Trip distance summary</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
          <StatCard value="487 km" label="Total distance" />
          <StatCard value="6.2 hrs" label="Time in transit" />
          <StatCard value="94 km" label="Longest single drive" />
          <StatCard value="18%" label="Trip spent moving" keyColor={OCHRE} />
        </div>

        <div style={{ background: BONE, borderRadius: "14px", padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "13px", color: INK }}>Route health score</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", color: AQUA, lineHeight: 1 }}>7.4</div>
          </div>
          <HealthBar label="Efficiency" pct={85} color={AQUA} val="8.5" />
          <HealthBar label="Fatigue risk" pct={65} color={OCHRE} val="6.5" />
          <HealthBar label="Flexibility" pct={70} color={OLIVE} val="7.0" />
          <HealthBar label="Geo logic" pct={80} color={AQUA} val="8.0" />
          <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "9px", color: OCHRE, lineHeight: 1.4, marginTop: "8px" }}>
            Moving Lecce to Day 4 saves 90 min of driving and removes a logistical conflict on Day 6.
          </div>
        </div>
      </div>

      {/* SECTION 3 — TRIP MAP */}
      <div style={{ background: IVORY, padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <SectionLabel>Trip map · Puglia region</SectionLabel>
        <div style={{ background: BONE, borderRadius: "16px", overflow: "hidden" }}>
          <svg viewBox="0 0 282 220" style={{ width: "100%", height: "220px", display: "block" }}>
            <rect width="282" height="220" fill="#EAE2D0" />
            {/* background roads */}
            <path d="M 10 130 Q 80 110 160 90 T 270 60" stroke="#D4CAB5" strokeWidth="3" fill="none" />
            <path d="M 30 200 Q 120 170 200 180 T 275 160" stroke="#D4CAB5" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            <path d="M 50 20 Q 100 80 150 100 T 260 180" stroke="#D4CAB5" strokeWidth="2" fill="none" strokeDasharray="3 5" />
            <path d="M 0 100 Q 100 130 200 110 T 282 130" stroke="#D4CAB5" strokeWidth="2" fill="none" />

            {/* route threads */}
            <path d="M 50 140 L 110 100 L 185 100" stroke={AQUA} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 110 100 L 160 70 L 185 100" stroke={OCHRE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 185 100 L 175 140 L 150 180" stroke={OLIVE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 150 180 L 70 175" stroke={YELLOW} strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* stops */}
            {[
              { cx: 50, cy: 140, fill: AQUA, label: "Bari", lx: 50, ly: 130, anchor: "middle" as const },
              { cx: 110, cy: 100, fill: AQUA, label: "Alberobello", lx: 120, ly: 102, anchor: "start" as const },
              { cx: 160, cy: 70, fill: OCHRE, label: "Matera", lx: 170, ly: 72, anchor: "start" as const },
              { cx: 185, cy: 100, fill: OCHRE, label: "Locorotondo", lx: 195, ly: 102, anchor: "start" as const },
              { cx: 175, cy: 140, fill: OLIVE, label: "Polignano", lx: 185, ly: 142, anchor: "start" as const },
              { cx: 150, cy: 180, fill: OLIVE, label: "Lecce", lx: 150, ly: 198, anchor: "middle" as const },
              { cx: 70, cy: 175, fill: YELLOW, label: "Gallipoli", lx: 70, ly: 195, anchor: "middle" as const },
            ].map((s) => (
              <g key={s.label}>
                <circle cx={s.cx} cy={s.cy} r={7} fill={s.fill} stroke={IVORY} strokeWidth={2} />
                <text x={s.lx} y={s.ly} fontSize="8" fontFamily="Inter" fill="rgba(26,26,24,0.60)" textAnchor={s.anchor}>{s.label}</text>
              </g>
            ))}
          </svg>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", padding: "8px 12px", borderTop: "0.5px solid rgba(26,26,24,0.08)" }}>
            {[
              { c: AQUA, t: "Days 1–2" },
              { c: OCHRE, t: "Days 3–4" },
              { c: OLIVE, t: "Days 5–7" },
              { c: YELLOW, t: "Days 8–10" },
            ].map((l) => (
              <div key={l.t} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.c }} />
                <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(26,26,24,0.50)" }}>{l.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 — DAY STRIPS */}
      <div style={{ background: IVORY, padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <SectionLabel>Day-by-day route strips</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ background: BONE, borderRadius: "12px", padding: "10px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "13px", color: INK }}>Day 2 · Alberobello loop</div>
              <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(26,26,24,0.40)" }}>94 km · 2.1 hrs driving</div>
            </div>
            <DotRoute color={AQUA} labels={["Bari", "Alberobello", "Locorotondo", "Polignano"]} />
          </div>
          <div style={{ background: BONE, borderRadius: "12px", padding: "10px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "13px", color: INK }}>Day 3 · Matera day trip</div>
              <div style={{ fontFamily: "Inter", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(26,26,24,0.40)" }}>138 km · 2.8 hrs driving</div>
            </div>
            <DotRoute color={OCHRE} labels={["Bari", "Matera", "Bari"]} />
          </div>
        </div>
      </div>

      {/* SECTION 5 — TRANSPORT LEGS */}
      <div style={{ background: IVORY, padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <SectionLabel>Transport legs · Booking status</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <TransportCard
            iconBg="rgba(79,182,200,0.12)"
            route="Bari → Alberobello"
            time="Day 2 · 8:00 AM · 55 min drive"
            status="Rental ✓"
            statusBg="rgba(107,125,61,0.12)"
            statusColor={OLIVE}
            note="Traffic light on Jun 13. On weekends add 40 min — you are going Thursday, no issue."
          />
          <TransportCard
            iconBg="rgba(194,78,42,0.10)"
            route="Bari → Matera"
            time="Day 3 · 9:00 AM · 1 hr 20 min drive"
            status="Rental ✓"
            statusBg="rgba(107,125,61,0.12)"
            statusColor={OLIVE}
            note="Parking in Matera is limited. Use Parcheggio Lanera — €5/day, 10 min walk to Sassi."
          />
          <TransportCard
            iconBg="rgba(242,201,76,0.15)"
            route="Gallipoli → Bari Airport"
            time="Day 10 · 6:00 AM · 2 hrs"
            status="Book now"
            statusBg="rgba(194,78,42,0.10)"
            statusColor={OCHRE}
            note="Your flight is at 9:15 AM. Leave Gallipoli by 6am. Book the return rental drop-off now — airport lots fill early."
          />
        </div>
      </div>

      {/* SECTION 6 — CRITICAL PATH */}
      <div style={{ background: IVORY, padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <SectionLabel>Critical path · At risk</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ background: "rgba(194,78,42,0.08)", borderLeft: `3px solid ${OCHRE}`, borderRadius: "0 12px 12px 0", padding: "10px 12px" }}>
            <div style={{ fontFamily: "Inter", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.08em", color: OCHRE, marginBottom: "4px" }}>
              ✦ CURA flagged · Single point of failure
            </div>
            <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.65)", lineHeight: 1.5 }}>
              Your return drive from Gallipoli to Bari Airport on Day 10 is 2 hours with no buffer. If you hit traffic or a flat tyre, you miss your flight. Book a night in Bari on Day 9 instead.
            </div>
            <Link to="/trip/puglia" style={{ display: "block", marginTop: "6px", fontFamily: "Inter", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.08em", color: OCHRE, textDecoration: "none" }}>
              Move Bari night to Day 9 →
            </Link>
          </div>
          <div style={{ background: "rgba(79,182,200,0.08)", borderLeft: `3px solid ${AQUA}`, borderRadius: "0 12px 12px 0", padding: "10px 12px" }}>
            <div style={{ fontFamily: "Inter", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.08em", color: AQUA, marginBottom: "4px" }}>
              ✦ CURA suggestion
            </div>
            <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.65)", lineHeight: 1.5 }}>
              Moving Lecce to Day 4 instead of Day 6 saves 90 minutes of driving and removes a geographic conflict.
            </div>
            <Link to="/trip/puglia" style={{ display: "block", marginTop: "6px", fontFamily: "Inter", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.08em", color: AQUA, textDecoration: "none" }}>
              Reorder Day 4 and Day 6 →
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 7 — NEIGHBOURHOOD INTELLIGENCE */}
      <div style={{ background: IVORY, padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <SectionLabel>Neighbourhood intelligence</SectionLabel>
        <NeighborhoodRow
          img="https://images.unsplash.com/photo-1534445538923-ab0f57a02eb5?w=200&q=80"
          name="Bari Vecchia"
          meta="Best base for Days 1–3 · Walk score: 9/10"
          tag="Best area for your route"
          tagBg="rgba(107,125,61,0.12)"
          tagColor={OLIVE}
        />
        <NeighborhoodRow
          img="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80"
          name="Gallipoli Old Town"
          meta="Stay on the island · Walk score: 8/10"
          tag="Uber works here"
          tagBg="rgba(79,182,200,0.12)"
          tagColor={AQUA}
        />
        <NeighborhoodRow
          img="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=200&q=80"
          name="Matera Sassi district"
          meta="Day trip only · No parking in Sassi · Walk in"
          tag="Drive to edge, walk in"
          tagBg="rgba(194,78,42,0.10)"
          tagColor={OCHRE}
          last
        />
      </div>

      {/* SECTION 8 — WHAT IF */}
      <div style={{ background: IVORY, padding: "12px 14px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <SectionLabel>What if planner</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <WhatIfCard
            q="What if I add one more day?"
            a="Best added between Days 5 and 6 — gives you a slow beach day at Torre dell'Orso without disrupting the flow."
            impact="+1 day · +0 km · removes Day 5 fatigue risk →"
            color={AQUA}
          />
          <WhatIfCard
            q="What if I skip Matera?"
            a="Saves 138km and 2.8hrs of driving. Use that day for Ostuni instead — closer, less effort, equally beautiful."
            impact="−138 km · −2.8 hrs · route score ↑ to 8.9 →"
            color={OLIVE}
          />
          <WhatIfCard
            q="What if I fly into Brindisi instead of Bari?"
            a="Saves 45 minutes on Day 1 and puts you closer to Lecce and Gallipoli from the start. Slightly fewer flight options from Dubai."
            impact="−45 min Day 1 · fewer Emirates connections →"
            color={OCHRE}
          />
        </div>
      </div>

      {/* SECTION 9 — OFFLINE ROUTE CARD */}
      <div style={{ background: IVORY, padding: "12px 14px 32px" }}>
        <SectionLabel>Offline route card</SectionLabel>
        <div style={{ background: "rgba(79,182,200,0.08)", borderLeft: `3px solid ${AQUA}`, borderRadius: "0 14px 14px 0", padding: "12px 14px" }}>
          <div style={{ fontFamily: "Inter", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.08em", color: AQUA, marginBottom: "10px" }}>
            ✦ Available offline · Tap to download
          </div>
          {[
            "All addresses in Italian",
            "All booking references",
            "Emergency contacts per location",
            "Map snapshot per day",
            "Rental car details + drop-off",
          ].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: AQUA, flexShrink: 0 }} />
              <div style={{ fontFamily: "Inter", fontSize: "11px", color: "rgba(26,26,24,0.65)" }}>{t}</div>
            </div>
          ))}
          <button
            type="button"
            style={{ width: "100%", background: AQUA, color: IVORY, border: "none", borderRadius: "20px", padding: "10px", fontFamily: "Inter", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.10em", marginTop: "12px", cursor: "pointer" }}
          >
            Download offline route →
          </button>
        </div>
      </div>
    </div>
  );
}
