import { Link } from "react-router-dom";

const TripSpendWork = () => {
  return (
    <div style={{ maxWidth: "390px", margin: "0 auto", backgroundColor: "#F5F0E8", minHeight: "100vh" }}>
      {/* SECTION 1 — HEADER */}
      <header style={{ position: "relative", height: "160px", overflow: "hidden" }}>
        <img
          src="https://res.cloudinary.com/dvfzz0min/image/upload/v1777700993/wallet_blghfj.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "160px",
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
        <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px" }}>
            <Link to="/trip/puglia" style={{ color: "rgba(245,240,232,0.85)", fontSize: "16px", textDecoration: "none" }}>
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
              WORK MODE
            </span>
          </div>
          <div style={{ padding: "0 16px 14px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "#F5F0E8", margin: "4px 0 0 0", lineHeight: 1 }}>
              Spend
            </h1>
          </div>
        </div>
      </header>

      {/* SECTION 2 — WORK TOGGLE (ON STATE) */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <Link
          to="/trip/puglia/spend"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(79,182,200,0.10)",
            border: "1px solid rgba(79,182,200,0.30)",
            borderRadius: "12px",
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", color: "#1A1A18" }}>Work trip</div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                textTransform: "uppercase",
                color: "#4FB6C8",
                marginTop: "2px",
              }}
            >
              Expense mode active
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "32px",
              height: "18px",
              borderRadius: "99px",
              backgroundColor: "#4FB6C8",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "14px",
                height: "14px",
                borderRadius: "99px",
                backgroundColor: "#F5F0E8",
                top: "2px",
                right: "2px",
              }}
            />
          </div>
        </Link>
      </section>

      {/* SECTION 3 — CURA WORK MODE INSIGHT */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #4FB6C8",
            borderRadius: "0 14px 14px 0",
            padding: "12px 14px",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#4FB6C8", display: "block", marginBottom: "5px" }}>
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
            Work mode is on. Tag each expense as billable or personal as you go. Your expense summary updates in real time — export as PDF when you're ready to submit.
          </p>
        </div>
      </section>

      {/* SECTION 4 — BUDGET OVERVIEW (WORK MODE) */}
      <section style={{ backgroundColor: "#F5F0E8", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div style={{ padding: "20px 16px 16px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "rgba(26,26,24,0.35)",
              marginBottom: "6px",
            }}
          >
            TOTAL SPEND
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "52px",
              color: "#1A1A18",
              lineHeight: 1,
              marginBottom: "4px",
            }}
          >
            €1,240
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "20px",
            marginBottom: "14px",
            padding: "0 16px",
          }}
        >
          {[
            { v: "€680", l: "BILLABLE", c: "#4FB6C8" },
            { v: "€560", l: "PERSONAL", c: "#C24E2A" },
            { v: "Day 3", l: "OF 10", c: "#1A1A18" },
          ].map((s, i) => (
            <div key={s.l} style={{ display: "flex", alignItems: "stretch", gap: "20px" }}>
              {i > 0 && <div style={{ width: "1px", backgroundColor: "rgba(26,26,24,0.10)" }} />}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: s.c }}>{s.v}</div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    color: "rgba(26,26,24,0.40)",
                    marginTop: "2px",
                  }}
                >
                  {s.l}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{ height: "6px", backgroundColor: "rgba(26,26,24,0.10)", borderRadius: "3px", display: "flex", overflow: "hidden" }}>
            <div style={{ width: "54.8%", height: "100%", backgroundColor: "#4FB6C8", borderRadius: "3px 0 0 3px" }} />
            <div style={{ width: "45.2%", height: "100%", backgroundColor: "#C24E2A", borderRadius: "0 3px 3px 0" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", margin: "0 16px 12px" }}>
          {[
            { dot: "#4FB6C8", label: "Billable" },
            { dot: "#C24E2A", label: "Personal" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: l.dot }} />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                }}
              >
                {l.label}
              </span>
            </div>
          ))}
        </div>
        <div style={{ padding: "0 16px 14px" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "rgba(26,26,24,0.35)",
              marginBottom: "6px",
            }}
          >
            BY CATEGORY
          </div>
          {[
            { name: "Flights", spent: "€800", budget: "€800", spentColor: "#1A1A18", pct: 100, fill: "#6B7D3D", billPct: 100, split: "€800 billable · €0 personal" },
            { name: "Stays", spent: "€0", budget: "€1,800", spentColor: "#1A1A18", pct: 0, fill: "#C24E2A", billPct: 0, alert: "Not booked — highest impact task", alertColor: "#BA181B" },
            { name: "Food & dining", spent: "€280", budget: "€600", spentColor: "#1A1A18", pct: 46, fill: "#C24E2A", billPct: 23, split: "€140 billable · €140 personal" },
            { name: "Activities", spent: "€160", budget: "€400", spentColor: "#1A1A18", pct: 40, fill: "#C24E2A", billPct: 0, split: "€0 billable · €160 personal" },
            { name: "Shopping", spent: "€0", budget: "€300", spentColor: "#1A1A18", pct: 0, fill: "#C24E2A", billPct: 0, split: "€0 billable · €0 personal" },
            { name: "Beauty prep", spent: "€185", budget: "€150", spentColor: "#BA181B", pct: 100, fill: "#BA181B", billPct: 0, alert: "Over budget by €35", alertColor: "#BA181B", split: "€0 billable · €185 personal" },
          ].map((c, i, arr) => (
            <div
              key={c.name}
              style={{
                padding: "8px 0",
                borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>{c.name}</span>
                <span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: c.spentColor }}>{c.spent}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(26,26,24,0.40)" }}> / {c.budget}</span>
                </span>
              </div>
              <div style={{ position: "relative", height: "3px", backgroundColor: "rgba(26,26,24,0.10)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, width: `${c.pct}%`, backgroundColor: c.fill, borderRadius: "2px" }} />
                <div style={{ position: "absolute", left: 0, top: 0, height: "2px", width: `${c.billPct}%`, backgroundColor: "#4FB6C8" }} />
              </div>
              {c.alert && (
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: "3px",
                    color: c.alertColor,
                  }}
                >
                  {c.alert}
                </div>
              )}
              {c.split && (
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    color: "rgba(26,26,24,0.40)",
                    marginTop: "3px",
                  }}
                >
                  {c.split}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — DAILY BURN RATE (WORK MODE) */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "10px",
          }}
        >
          DAILY BURN RATE
        </div>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
          {[
            { day: "Day 1", name: "Arrival", amount: "€180", amountColor: "#6B7D3D", status: "Under budget", statusColor: "#6B7D3D", bg: "rgba(107,125,61,0.08)", border: "1px solid rgba(107,125,61,0.20)", opacity: 1, split: "€180 billable · €0 personal" },
            { day: "Day 2", name: "Beach club", amount: "€340", amountColor: "#BA181B", status: "Over by €90", statusColor: "#BA181B", bg: "rgba(186,24,27,0.08)", border: "1px solid rgba(186,24,27,0.20)", opacity: 1, split: "€100 billable · €240 personal" },
            { day: "Day 3", name: "Alberobello", amount: "€220", amountColor: "#C24E2A", status: "On track", statusColor: "#C24E2A", bg: "#EFE9DF", border: "none", opacity: 1, split: "€160 billable · €60 personal" },
            { day: "Day 4", name: "Ostuni", amount: "—", amountColor: "rgba(26,26,24,0.40)", status: "Upcoming", statusColor: "rgba(26,26,24,0.35)", bg: "#EFE9DF", border: "none", opacity: 0.4, split: "" },
          ].map((d) => (
            <div
              key={d.day}
              style={{
                borderRadius: "14px",
                padding: "12px",
                minWidth: "108px",
                flexShrink: 0,
                backgroundColor: d.bg,
                border: d.border,
                opacity: d.opacity,
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  marginBottom: "4px",
                }}
              >
                {d.day}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", color: "#1A1A18", lineHeight: 1.2, marginBottom: "6px" }}>
                {d.name}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", lineHeight: 1, color: d.amountColor }}>
                {d.amount}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  marginTop: "4px",
                  color: d.statusColor,
                }}
              >
                {d.status}
              </div>
              {d.split && (
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    color: "rgba(26,26,24,0.40)",
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  {d.split}
                </div>
              )}
            </div>
          ))}
          <div
            style={{
              border: "1px dashed rgba(26,26,24,0.18)",
              borderRadius: "14px",
              minWidth: "72px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                textTransform: "uppercase",
                color: "rgba(26,26,24,0.30)",
                textAlign: "center",
              }}
            >
              + Add spend
            </span>
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #C24E2A",
            borderRadius: "0 12px 12px 0",
            padding: "10px 12px",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#C24E2A", display: "block", marginBottom: "4px" }}>
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
            Averaging €247/day against a €250 target. On track — but Day 2 was expensive. Watch dining spend this week.
          </p>
        </div>
      </section>

      {/* SECTION 6 — RECEIPT VAULT (PROMINENT) */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "10px",
          }}
        >
          RECEIPT VAULT · TAG AS YOU GO
        </div>
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #4FB6C8",
            borderRadius: "0 12px 12px 0",
            padding: "10px 12px",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#4FB6C8", display: "block", marginBottom: "4px" }}>
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
            Upload receipts as you spend and tag them. Your employer summary builds automatically.
          </p>
        </div>
        {[
          { iconBg: "rgba(79,182,200,0.12)", name: "Emirates booking", sub: "Flights · Apr 12", amount: "€800", billable: true },
          { iconBg: "rgba(194,78,42,0.10)", name: "Boat tour deposit", sub: "Activities · Apr 20", amount: "€80", billable: false },
          { iconBg: "rgba(194,78,42,0.10)", name: "Beach club dinner", sub: "Food & dining · Jun 13", amount: "€120", billable: false },
        ].map((r) => (
          <div
            key={r.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 0",
              borderBottom: "0.5px solid rgba(26,26,24,0.07)",
            }}
          >
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: r.iconBg, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>{r.name}</div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  marginTop: "2px",
                }}
              >
                {r.sub}
              </div>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>{r.amount}</div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: "99px",
                backgroundColor: r.billable ? "rgba(79,182,200,0.12)" : "rgba(26,26,24,0.07)",
                color: r.billable ? "#4FB6C8" : "rgba(26,26,24,0.40)",
                border: r.billable ? "1px solid rgba(79,182,200,0.30)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {r.billable ? "Billable" : "Personal"}
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "9px 0",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              backgroundColor: "rgba(26,26,24,0.06)",
              border: "1px dashed rgba(26,26,24,0.18)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              color: "rgba(26,26,24,0.35)",
            }}
          >
            + Upload receipt
          </span>
        </div>
      </section>

      {/* SECTION 7 — PER DIEM TRACKER */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "10px",
          }}
        >
          PER DIEM TRACKER
        </div>
        <div style={{ backgroundColor: "#EFE9DF", borderRadius: "14px", padding: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)" }}>
                DAILY ALLOWANCE
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#1A1A18", marginTop: "3px" }}>€150 / day</div>
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)", textAlign: "right" }}>
                DAYS ELAPSED
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#1A1A18", marginTop: "3px", textAlign: "right" }}>3 of 10</div>
            </div>
          </div>
          <div style={{ borderTop: "0.5px solid rgba(26,26,24,0.08)", margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)" }}>
                TOTAL ALLOWANCE
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#1A1A18" }}>€450</div>
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", color: "rgba(26,26,24,0.40)", textAlign: "right" }}>
                ACTUAL SPEND
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#6B7D3D", textAlign: "right" }}>€420</div>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#4FB6C8" }}>✦</span>{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "12px",
                color: "rgba(26,26,24,0.65)",
              }}
            >
              You're €30 under your per diem. Well managed.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 8 — EXPENSE SUMMARY */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "10px",
          }}
        >
          EXPENSE SUMMARY
        </div>
        <div style={{ backgroundColor: "#EFE9DF", borderRadius: "14px", padding: "14px" }}>
          {[
            { l: "Total trip spend", v: "€1,240", c: "#1A1A18" },
            { l: "Total billable", v: "€680", c: "#4FB6C8" },
            { l: "Total personal", v: "€560", c: "#C24E2A" },
            { l: "Receipts uploaded", v: "3 of 8", c: "#1A1A18" },
          ].map((r, i, arr) => (
            <div
              key={r.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "7px 0",
                borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)",
              }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(26,26,24,0.65)" }}>{r.l}</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: r.c }}>{r.v}</span>
            </div>
          ))}
        </div>
        <button
          style={{
            width: "100%",
            backgroundColor: "#4FB6C8",
            color: "#F5F0E8",
            border: "none",
            borderRadius: "20px",
            padding: "12px",
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Export expense report as PDF →
        </button>
      </section>

      {/* SECTION 9 — HIDDEN COSTS */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "10px",
          }}
        >
          HIDDEN COSTS · CURA DETECTED
        </div>
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #BA181B",
            borderRadius: "0 14px 14px 0",
            padding: "12px 14px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#BA181B", display: "block", marginBottom: "4px" }}>
                ✦ CURA flagged
              </span>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "12px",
                  color: "rgba(26,26,24,0.65)",
                  margin: 0,
                }}
              >
                You may have forgotten to budget for these.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#BA181B", textAlign: "right" }}>€345</div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(186,24,27,0.60)",
                  textAlign: "right",
                }}
              >
                UNBUDGETED
              </div>
            </div>
          </div>
          {[
            { dot: "#BA181B", name: "City tax · Italy", amount: "~€70" },
            { dot: "#BA181B", name: "Airport transfers × 2", amount: "~€120" },
            { dot: "#C24E2A", name: "Checked baggage", amount: "~€80" },
            { dot: "#C24E2A", name: "Gratuities budget", amount: "~€60" },
            { dot: "rgba(26,26,24,0.25)", name: "eSIM · Italy", amount: "~€15" },
          ].map((it, i, arr) => (
            <div
              key={it.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 0",
                borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)",
              }}
            >
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: it.dot, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", color: "#1A1A18", flex: 1 }}>{it.name}</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(26,26,24,0.60)" }}>{it.amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10 — REFUND TRACKER */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "6px",
          }}
        >
          REFUND TRACKER
        </div>
        {[
          { name: "Emirates flights", iconBg: "rgba(107,125,61,0.12)", sub: "Refundable until May 12", deadline: "12 days remaining", deadlineColor: "#6B7D3D", pillBg: "rgba(107,125,61,0.12)", pillColor: "#6B7D3D", pillText: "Refundable" },
          { name: "Masseria deposit", iconBg: "rgba(186,24,27,0.10)", sub: "€400 non-refundable", deadline: "Lost if cancelled", deadlineColor: "#BA181B", pillBg: "rgba(186,24,27,0.10)", pillColor: "#BA181B", pillText: "Non-refund" },
          { name: "Boat tour", iconBg: "rgba(194,78,42,0.10)", sub: "€80 deposit · refundable Jun 1", deadline: "34 days remaining", deadlineColor: "#C24E2A", pillBg: "rgba(194,78,42,0.10)", pillColor: "#C24E2A", pillText: "Partial" },
        ].map((r, i, arr) => (
          <div
            key={r.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 0",
              borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)",
            }}
          >
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: r.iconBg, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>{r.name}</div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  marginTop: "2px",
                }}
              >
                {r.sub}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  marginTop: "2px",
                  color: r.deadlineColor,
                }}
              >
                {r.deadline}
              </div>
            </div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                textTransform: "uppercase",
                padding: "2px 7px",
                borderRadius: "99px",
                whiteSpace: "nowrap",
                backgroundColor: r.pillBg,
                color: r.pillColor,
              }}
            >
              {r.pillText}
            </span>
          </div>
        ))}
      </section>

      {/* SECTION 11 — CURRENCY INTELLIGENCE */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px", borderBottom: "0.5px solid rgba(26,26,24,0.08)" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "10px",
          }}
        >
          CURRENCY INTELLIGENCE
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
          {[
            ["1 EUR = 3.97 AED", "Live rate"],
            ["Emirates Visa", "Best card · 0% forex"],
            ["Markets, taxis", "Use cash"],
            ["€200–300", "Carry in cash"],
          ].map(([v, k]) => (
            <div key={k} style={{ backgroundColor: "#EFE9DF", borderRadius: "12px", padding: "10px 12px" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: "#1A1A18" }}>{v}</div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  marginTop: "3px",
                }}
              >
                {k}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #4FB6C8",
            borderRadius: "0 12px 12px 0",
            padding: "10px 12px",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#4FB6C8", display: "block", marginBottom: "4px" }}>
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
            Use your Emirates Visa everywhere you can. Avoid airport exchange booths. Withdraw cash from Banca Intesa ATMs — lowest fees in Italy.
          </p>
        </div>
      </section>

      {/* SECTION 12 — TIPPING INTELLIGENCE */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px 32px 16px" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "rgba(26,26,24,0.35)",
            marginBottom: "6px",
          }}
        >
          TIPPING INTELLIGENCE · ITALY
        </div>
        {[
          { venue: "Restaurants", sub: "Round up or leave €2–5 · not expected", right: "5–10%" },
          { venue: "Bars & cafes", sub: "Leave coins · never expected", right: "Round up" },
          { venue: "Taxi / drivers", sub: "Round to nearest €5", right: "Round up" },
          { venue: "Hotel staff", sub: "Bellhop €1–2 · housekeeping €2/night", right: "€1–2" },
          { venue: "Tour guides", sub: "Appreciated · €5–10 per person", right: "€5–10" },
        ].map((t, i, arr) => (
          <div
            key={t.venue}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "8px 0",
              borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>{t.venue}</div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  marginTop: "2px",
                }}
              >
                {t.sub}
              </div>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18", textAlign: "right" }}>
              {t.right}
            </div>
          </div>
        ))}
        <div
          style={{
            backgroundColor: "rgba(79,182,200,0.08)",
            borderLeft: "3px solid #4FB6C8",
            borderRadius: "0 12px 12px 0",
            padding: "8px 12px",
            marginTop: "8px",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#4FB6C8", display: "block", marginBottom: "3px" }}>
            ✦ CURA
          </span>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: "rgba(26,26,24,0.65)",
              margin: 0,
            }}
          >
            Check your company policy before submitting tipping as a billable expense — policies vary.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TripSpendWork;
