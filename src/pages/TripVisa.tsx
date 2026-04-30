import { Link } from "react-router-dom";

/**
 * Visa engine page — /trip/puglia/visa
 * Static shell. Hardcoded for Nourhan · Lebanese passport · Dubai · Puglia.
 */

const intelCards = [
  { value: "Schengen", key: "Visa type", color: "#1A1A18", full: false },
  { value: "Apply now", key: "Deadline status", color: "#8C1C13", full: false },
  { value: "15–30 days", key: "Processing time", color: "#1A1A18", full: false },
  { value: "€80", key: "Visa fee", color: "#1A1A18", full: false },
  { value: "VFS Global · Dubai", key: "Application centre · based on your residence", color: "#1A1A18", full: true },
];

type StepState = "done" | "active" | "inactive";
const steps: { label: string; state: StepState }[] = [
  { label: "Docs", state: "done" },
  { label: "Apply", state: "active" },
  { label: "Appt", state: "inactive" },
  { label: "Pending", state: "inactive" },
  { label: "Decision", state: "inactive" },
];

type ChecklistStatus = "done" | "warning" | "empty";
interface ChecklistItem {
  name: string;
  status: ChecklistStatus;
  statusText: string;
  upload?: string;
}
const checklist: ChecklistItem[] = [
  { name: "Passport scan",       status: "done",    statusText: "On file · expires 2028" },
  { name: "Visa photo",          status: "done",    statusText: "On file · 35×45mm" },
  { name: "Bank statements",     status: "warning", statusText: "Needs update · 3 months required", upload: "Upload new →" },
  { name: "Travel insurance",    status: "empty",   statusText: "Not uploaded", upload: "Upload →" },
  { name: "Flight confirmation", status: "empty",   statusText: "Not uploaded", upload: "Upload →" },
  { name: "Hotel booking",       status: "empty",   statusText: "Not uploaded", upload: "Upload →" },
  { name: "Employment letter",   status: "done",    statusText: "On file" },
  { name: "NOC",                 status: "empty",   statusText: "Not uploaded", upload: "Upload →" },
];

type DocStatus = "onfile" | "update" | "missing";
const documents: { name: string; meta: string; status: DocStatus }[] = [
  { name: "Passport",          meta: "Lebanese · expires Mar 2028",  status: "onfile" },
  { name: "Bank statements",   meta: "Last updated Jan 2026",        status: "update" },
  { name: "Employment letter", meta: "The Founding Muse · 2026",     status: "onfile" },
  { name: "Travel insurance",  meta: "Not uploaded",                 status: "missing" },
];

const costs = [
  { label: "Visa fee", amount: "€80" },
  { label: "VFS service fee", amount: "€30" },
  { label: "Travel insurance", amount: "€45" },
  { label: "Document translation", amount: "AED 150" },
];

const links = [
  { name: "VFS Global", sub: "Dubai · Italy visa" },
  { name: "Italian Embassy", sub: "Official requirements" },
  { name: "Insurance", sub: "Schengen accepted" },
  { name: "Travel advisory", sub: "Lebanon MFA" },
];

const sectionLabel: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.10em",
  color: "rgba(26,26,24,0.35)",
  marginBottom: "10px",
  display: "block",
};

const TripVisa = () => {
  return (
    <main style={{ backgroundColor: "#F5F0E8", minHeight: "100vh", maxWidth: "390px", margin: "0 auto" }}>
      {/* SECTION 1 — HEADER */}
      <header
        style={{
          position: "relative",
          height: "220px",
          overflow: "hidden",
        }}
      >
        <img
          src="https://res.cloudinary.com/dvfzz0min/image/upload/v1777525552/Stamp_a7rpkq.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)",
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
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "rgba(245,240,232,0.85)",
              textDecoration: "none",
              lineHeight: 1,
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
              backgroundColor: "#C24E2A",
              color: "#F5F0E8",
              borderRadius: "99px",
              padding: "3px 10px",
            }}
          >
            VISA ENGINE
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
              fontSize: "11px",
              color: "rgba(245,240,232,0.60)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Puglia · Italy
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              color: "#F5F0E8",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.1,
              marginTop: "2px",
            }}
          >
            Visa
          </h1>
        </div>
      </header>

      {/* SECTION 2 — INTELLIGENCE */}
      <section
        style={{
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>INTELLIGENCE</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px",
          }}
        >
          {intelCards.map((c) => (
            <div
              key={c.key}
              style={{
                backgroundColor: "#EFE9DF",
                borderRadius: "14px",
                padding: "10px 12px",
                gridColumn: c.full ? "1 / -1" : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "16px",
                  color: c.color,
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                {c.value}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(26,26,24,0.40)",
                  marginTop: "3px",
                }}
              >
                {c.key}
              </div>
            </div>
          ))}
        </div>

        {/* CURA Verdict */}
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #E36414",
            borderTopRightRadius: "14px",
            borderBottomRightRadius: "14px",
            padding: "10px 12px",
            marginTop: "8px",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              color: "#E36414",
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
            The French embassy in Dubai books out 6 weeks in advance. With 38 days to departure, you need to apply this week.
          </p>
        </div>
      </section>

      {/* SECTION 3 — APPLICATION STATUS */}
      <section
        style={{
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>APPLICATION STATUS</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {steps.map((s, i) => {
            const dotBg =
              s.state === "done" ? "#6B7D3D" :
              s.state === "active" ? "#C24E2A" : "#F5F0E8";
            const dotBorder =
              s.state === "done" ? "1.5px solid #6B7D3D" :
              s.state === "active" ? "1.5px solid #C24E2A" :
              "1.5px solid rgba(26,26,24,0.20)";
            const labelColor = s.state === "active" ? "#C24E2A" : "rgba(26,26,24,0.35)";
            const lineBg = i < 1 ? "#6B7D3D" : "rgba(26,26,24,0.12)";
            return (
              <div key={s.label} style={{ display: "flex", alignItems: "center", flex: i === steps.length - 1 ? "0 0 auto" : 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: dotBg,
                      border: dotBorder,
                      boxSizing: "border-box",
                      display: "block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "6.5px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      color: labelColor,
                      marginTop: "6px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "1.5px",
                      backgroundColor: lineBg,
                      marginLeft: "4px",
                      marginRight: "4px",
                      marginBottom: "14px",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — CHECKLIST */}
      <section
        style={{
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>CHECKLIST · 3 OF 8 READY</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {checklist.map((item, i) => {
            const isLast = i === checklist.length - 1;
            const dotStyle: React.CSSProperties =
              item.status === "done"
                ? { backgroundColor: "#6B7D3D", border: "1.5px solid #6B7D3D" }
                : item.status === "warning"
                ? { backgroundColor: "transparent", border: "1.5px solid #E36414" }
                : { backgroundColor: "transparent", border: "1.5px solid rgba(26,26,24,0.20)" };
            const statusColor =
              item.status === "done" ? "rgba(107,125,61,1)" :
              item.status === "warning" ? "#E36414" : "rgba(26,26,24,0.35)";
            return (
              <li
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "9px 0",
                  borderBottom: isLast ? "none" : "0.5px solid rgba(26,26,24,0.07)",
                }}
              >
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    boxSizing: "border-box",
                    flex: "0 0 auto",
                    marginTop: "2px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F5F0E8",
                    fontSize: "8px",
                    lineHeight: 1,
                    ...dotStyle,
                  }}
                >
                  {item.status === "done" ? "✓" : ""}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "13px",
                      color: "#1A1A18",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.name}
                  </div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "7px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: statusColor,
                      marginTop: "2px",
                    }}
                  >
                    {item.statusText}
                  </span>
                  {item.upload && (
                    <button
                      type="button"
                      style={{
                        display: "block",
                        marginTop: "2px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "7px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#C24E2A",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      {item.upload}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* SECTION 5 — YOUR DOCUMENTS */}
      <section
        style={{
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>YOUR DOCUMENTS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {documents.map((d, i) => {
            const isLast = i === documents.length - 1;
            const innerColor =
              d.status === "onfile" ? "#6B7D3D" :
              d.status === "update" ? "#E36414" : "rgba(26,26,24,0.25)";
            const pillStyle: React.CSSProperties =
              d.status === "onfile"
                ? { backgroundColor: "rgba(107,125,61,0.12)", color: "#6B7D3D" }
                : d.status === "update"
                ? { backgroundColor: "rgba(227,100,20,0.12)", color: "#E36414" }
                : { backgroundColor: "rgba(26,26,24,0.07)", color: "rgba(26,26,24,0.40)" };
            const pillLabel =
              d.status === "onfile" ? "On file" :
              d.status === "update" ? "Update" : "Missing";
            return (
              <li
                key={d.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 0",
                  borderBottom: isLast ? "none" : "0.5px solid rgba(26,26,24,0.07)",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    backgroundColor: "#EFE9DF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "0 0 auto",
                  }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "14px",
                      borderRadius: "2px",
                      backgroundColor: innerColor,
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "13px",
                      color: "#1A1A18",
                      lineHeight: 1.2,
                    }}
                  >
                    {d.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "7px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "rgba(26,26,24,0.35)",
                      marginTop: "2px",
                    }}
                  >
                    {d.meta}
                  </div>
                </div>
                <span
                  style={{
                    borderRadius: "99px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "2px 7px",
                    flex: "0 0 auto",
                    ...pillStyle,
                  }}
                >
                  {pillLabel}
                </span>
              </li>
            );
          })}
        </ul>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
          <Link
            to="/profile"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#C24E2A",
              textDecoration: "none",
            }}
          >
            Manage full vault →
          </Link>
        </div>
      </section>

      {/* SECTION 6 — COSTS */}
      <section
        style={{
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>COSTS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {costs.map((c, i) => {
            const isLast = i === costs.length - 1;
            return (
              <li
                key={c.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "7px 0",
                  borderBottom: isLast ? "none" : "0.5px solid rgba(26,26,24,0.07)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "rgba(26,26,24,0.65)",
                  }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "13px",
                    color: "#1A1A18",
                  }}
                >
                  {c.amount}
                </span>
              </li>
            );
          })}
        </ul>
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderRadius: "12px",
            padding: "10px 12px",
            marginTop: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            TOTAL ESTIMATED
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              color: "#C24E2A",
            }}
          >
            ~€185
          </span>
        </div>
      </section>

      {/* SECTION 6.5 — APPOINTMENT BOOKING */}
      <section
        style={{
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>APPOINTMENT BOOKING</span>

        {/* Row 1 */}
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderRadius: "14px",
            padding: "10px 12px",
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#8C1C13", lineHeight: 1.2 }}>
              Not booked
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(26,26,24,0.40)", marginTop: "3px" }}>
              VFS appointment · Dubai
            </div>
          </div>
          <a
            href="https://visa.vfsglobal.com"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#F5F0E8",
              backgroundColor: "#C24E2A",
              borderRadius: "20px",
              padding: "6px 14px",
              border: "none",
              textDecoration: "none",
              flex: "0 0 auto",
            }}
          >
            Book now →
          </a>
        </div>

        {/* Row 2 */}
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderRadius: "14px",
            padding: "10px 12px",
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#1A1A18", lineHeight: 1.2 }}>
              Required
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(26,26,24,0.40)", marginTop: "3px" }}>
              Biometrics · separate appointment
            </div>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "7px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              backgroundColor: "rgba(26,26,24,0.07)",
              color: "rgba(26,26,24,0.40)",
              borderRadius: "99px",
              padding: "3px 8px",
              flex: "0 0 auto",
            }}
          >
            After visa appt
          </span>
        </div>

        {/* Row 3 */}
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderRadius: "14px",
            padding: "10px 12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#1A1A18", lineHeight: 1.2 }}>
              Confirmation
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(26,26,24,0.40)", marginTop: "3px" }}>
              Upload appointment letter
            </div>
          </div>
          <button
            type="button"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "7px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#C24E2A",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              flex: "0 0 auto",
            }}
          >
            Upload →
          </button>
        </div>

        {/* CURA note */}
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #C24E2A",
            borderTopRightRadius: "14px",
            borderBottomRightRadius: "14px",
            padding: "10px 12px",
            marginTop: "8px",
          }}
        >
          <span style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#C24E2A", marginBottom: "5px" }}>
            ✦ CURA
          </span>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.65)", lineHeight: 1.5, margin: 0 }}>
            VFS Dubai slots for Italy fill within hours of release. Check every morning at 9am — that is when new slots typically open.
          </p>
        </div>
      </section>

      {/* SECTION 6.6 — TRAVEL INSURANCE */}
      <section
        style={{
          padding: "14px 16px",
          borderBottom: "0.5px solid rgba(26,26,24,0.08)",
        }}
      >
        <span style={sectionLabel}>TRAVEL INSURANCE</span>

        {/* Row 1 — Coverage requirement (2-col grid inside card) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <div style={{ backgroundColor: "#EFE9DF", borderRadius: "14px", padding: "10px 12px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#1A1A18", lineHeight: 1.2 }}>
              €30,000
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(26,26,24,0.40)", marginTop: "3px" }}>
              Min. coverage
            </div>
          </div>
          <div style={{ backgroundColor: "#EFE9DF", borderRadius: "14px", padding: "10px 12px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#8C1C13", lineHeight: 1.2 }}>
              Required
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(26,26,24,0.40)", marginTop: "3px" }}>
              For Schengen visa
            </div>
          </div>
        </div>

        {/* Row 2 — Status */}
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderRadius: "14px",
            padding: "10px 12px",
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#8C1C13", lineHeight: 1.2 }}>
              Not purchased
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(26,26,24,0.40)", marginTop: "3px" }}>
              Insurance status
            </div>
          </div>
          <button
            type="button"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#F5F0E8",
              backgroundColor: "#C24E2A",
              borderRadius: "20px",
              padding: "6px 14px",
              border: "none",
              cursor: "pointer",
              flex: "0 0 auto",
            }}
          >
            Get insured →
          </button>
        </div>

        {/* Row 3 — Upload certificate */}
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderRadius: "14px",
            padding: "10px 12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#1A1A18", lineHeight: 1.2 }}>
              Certificate
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(26,26,24,0.40)", marginTop: "3px" }}>
              Upload insurance certificate
            </div>
          </div>
          <button
            type="button"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "7px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#C24E2A",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              flex: "0 0 auto",
            }}
          >
            Upload →
          </button>
        </div>

        {/* CURA note */}
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #C24E2A",
            borderTopRightRadius: "14px",
            borderBottomRightRadius: "14px",
            padding: "10px 12px",
            marginTop: "8px",
          }}
        >
          <span style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#C24E2A", marginBottom: "5px" }}>
            ✦ CURA
          </span>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "12px", color: "rgba(26,26,24,0.65)", lineHeight: 1.5, margin: 0 }}>
            AXA Schengen and Europ Assistance are both accepted and issue certificates instantly. Do not buy insurance before your appointment is confirmed — dates must match exactly.
          </p>
        </div>
      </section>

      <section style={{ padding: "14px 16px 32px 16px" }}>
        <span style={sectionLabel}>RELEVANT LINKS</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px",
          }}
        >
          {links.map((l) => (
            <div
              key={l.name}
              style={{
                backgroundColor: "#EFE9DF",
                borderRadius: "12px",
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "12px",
                  color: "#1A1A18",
                  lineHeight: 1.2,
                }}
              >
                {l.name}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.40)",
                  marginTop: "2px",
                  letterSpacing: "0.06em",
                }}
              >
                {l.sub}
              </div>
              <span
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  color: "#C24E2A",
                  marginTop: "6px",
                }}
              >
                ↗
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TripVisa;
