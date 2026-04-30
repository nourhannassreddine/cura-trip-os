import { Link } from "react-router-dom";

const TripPrep = () => {
  const sectionLabel: React.CSSProperties = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.10em",
    color: "rgba(26,26,24,0.35)",
    display: "block",
    marginBottom: "12px",
  };

  const sectionBase: React.CSSProperties = {
    backgroundColor: "#F5F0E8",
    padding: "14px 16px",
    borderBottom: "0.5px solid rgba(26,26,24,0.08)",
  };

  const cardBg = "#EFE9DF";

  type TaskStatus = "done" | "warning" | "empty";
  interface Task {
    name: string;
    meta: string;
    status: TaskStatus;
  }
  interface Phase {
    label: string;
    dot: string;
    badge: string;
    badgeBg: string;
    badgeColor: string;
    tasks: Task[];
  }

  const phases: Phase[] = [
    {
      label: "1 month before",
      dot: "#C24E2A",
      badge: "2 of 3 done",
      badgeBg: "rgba(194,78,42,0.12)",
      badgeColor: "#C24E2A",
      tasks: [
        { name: "Apply for visa", meta: "Submitted Apr 28", status: "done" },
        { name: "Book flights", meta: "Emirates · confirmed", status: "done" },
        { name: "Book accommodation", meta: "Not booked yet", status: "warning" },
      ],
    },
    {
      label: "2 weeks before",
      dot: "rgba(26,26,24,0.25)",
      badge: "0 of 5 done",
      badgeBg: "rgba(26,26,24,0.07)",
      badgeColor: "rgba(26,26,24,0.40)",
      tasks: [
        { name: "Book beauty appointments", meta: "Nails · lashes · wax · tan", status: "empty" },
        { name: "Notify bank of travel", meta: "Cards · international use", status: "empty" },
        { name: "Sort eSIM or local SIM", meta: "Italy · Airalo recommended", status: "empty" },
        { name: "Exchange currency", meta: "EUR · check rate first", status: "empty" },
        { name: "Confirm pet sitter", meta: "Arrange care for trip dates", status: "empty" },
      ],
    },
    {
      label: "1 week before",
      dot: "rgba(26,26,24,0.25)",
      badge: "Not started",
      badgeBg: "rgba(26,26,24,0.07)",
      badgeColor: "rgba(26,26,24,0.40)",
      tasks: [
        { name: "Do laundry", meta: "Clean full trip wardrobe", status: "empty" },
        { name: "Confirm airport transfer", meta: "DXB · Jun 12 · 3AM pickup", status: "empty" },
        { name: "Download offline maps", meta: "Puglia · Italy", status: "empty" },
        { name: "Charge all devices", meta: "Power bank · adaptor check", status: "empty" },
        { name: "Pack medications", meta: "Usual + motion sickness", status: "empty" },
      ],
    },
  ];

  const phase4Tasks: Task[] = [
    { name: "Print documents", meta: "Visa · insurance · booking refs", status: "empty" },
    { name: "Set alarm", meta: "Flight 6AM · leave home by 3AM", status: "empty" },
    { name: "Secure home", meta: "Locks · bills on auto-pay · plants", status: "empty" },
  ];

  const renderCheck = (status: TaskStatus) => {
    if (status === "done") {
      return (
        <span
          style={{
            width: "13px",
            height: "13px",
            borderRadius: "50%",
            backgroundColor: "#C24E2A",
            border: "1.5px solid #C24E2A",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "2px",
          }}
        >
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
            <path d="M1 3.5L2.8 5L6 1.5" stroke="#F5F0E8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    }
    const borderColor = status === "warning" ? "#BA181B" : "rgba(26,26,24,0.20)";
    return (
      <span
        style={{
          width: "13px",
          height: "13px",
          borderRadius: "50%",
          border: `1.5px solid ${borderColor}`,
          display: "inline-block",
          flexShrink: 0,
          marginTop: "2px",
        }}
      />
    );
  };

  const metaColor = (status: TaskStatus) =>
    status === "done"
      ? "rgba(107,125,61,0.80)"
      : status === "warning"
        ? "#BA181B"
        : "rgba(26,26,24,0.35)";

  const renderTaskRow = (t: Task, isLast: boolean) => (
    <Link
      to="/trip/puglia"
      key={t.name}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        padding: "7px 0",
        borderBottom: isLast ? "none" : "0.5px solid rgba(26,26,24,0.06)",
        textDecoration: "none",
      }}
    >
      {renderCheck(t.status)}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>
          {t.name}
        </div>
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "7px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
            marginTop: "2px",
            color: metaColor(t.status),
          }}
        >
          {t.meta}
        </span>
      </div>
    </Link>
  );

  const addTaskRow = (
    <Link
      to="/trip/puglia"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 0",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          width: "13px",
          height: "13px",
          borderRadius: "50%",
          border: "1.5px dashed rgba(26,26,24,0.25)",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "8px",
          textTransform: "uppercase",
          color: "rgba(26,26,24,0.35)",
        }}
      >
        + ADD TASK
      </span>
    </Link>
  );

  interface ApptCard {
    name: string;
    date: string;
    note: string;
    done: boolean;
  }

  const beauty: ApptCard[] = [
    { name: "Nails", date: "Jun 9 · 3 days before", note: "Book 3–4 days before", done: true },
    { name: "Lashes", date: "Jun 10 · 2 days before", note: "Book 2 days before max", done: true },
    { name: "Waxing", date: "Not booked", note: "Book 5–7 days before", done: false },
    { name: "Tan", date: "Not booked", note: "Day before only", done: false },
    { name: "Haircut", date: "Not booked", note: "1 week before", done: false },
    { name: "Facial", date: "Not booked", note: "5–7 days before", done: false },
  ];

  const logistics: ApptCard[] = [
    { name: "Pet sitter", date: "Not arranged", note: "Confirm 2 weeks before", done: false },
    { name: "Airport ride", date: "Jun 12 · 3AM", note: "Booked ✓", done: true },
    { name: "Laundry", date: "Not done", note: "1 week before", done: false },
    { name: "Car / home sitter", date: "Not arranged", note: "If needed", done: false },
  ];

  const renderApptCard = (c: ApptCard) => (
    <Link
      to="/trip/puglia"
      key={c.name}
      style={{
        backgroundColor: cardBg,
        borderRadius: "14px",
        padding: "10px 12px",
        position: "relative",
        textDecoration: "none",
        display: "block",
      }}
    >
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          backgroundColor: c.done ? "#C24E2A" : "rgba(26,26,24,0.15)",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18", paddingRight: "14px" }}>
        {c.name}
      </div>
      <div
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "7px",
          textTransform: "uppercase",
          color: "rgba(26,26,24,0.40)",
          marginTop: "3px",
        }}
      >
        {c.date}
      </div>
      <div
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "7px",
          fontStyle: "italic",
          color: "rgba(26,26,24,0.35)",
          marginTop: "2px",
        }}
      >
        {c.note}
      </div>
    </Link>
  );

  const addCard = (label: string) => (
    <Link
      to="/trip/puglia"
      style={{
        border: "1px dashed rgba(26,26,24,0.18)",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        padding: "10px 12px",
      }}
    >
      <span
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "7px",
          textTransform: "uppercase",
          color: "rgba(26,26,24,0.30)",
        }}
      >
        {label}
      </span>
    </Link>
  );

  interface HealthRow {
    name: string;
    meta: string;
    done: boolean;
    pillText: string;
  }

  const health: HealthRow[] = [
    { name: "Travel insurance", meta: "Certificate on file", done: true, pillText: "Done" },
    { name: "Medications", meta: "Pack usual + motion sickness", done: false, pillText: "Pending" },
    { name: "Bank notification", meta: "Set cards for international use", done: false, pillText: "Pending" },
    { name: "eSIM", meta: "Italy · Airalo or local", done: false, pillText: "Pending" },
    { name: "Emergency contacts", meta: "Saved offline + shared with family", done: false, pillText: "Pending" },
    { name: "Offline maps", meta: "Puglia · download before departure", done: false, pillText: "Pending" },
    { name: "Currency exchanged", meta: "EUR · check rate · carry some cash", done: false, pillText: "Pending" },
    { name: "Home secured", meta: "Bills auto-pay · mail held · plants", done: false, pillText: "Pending" },
  ];

  const readinessItems = [
    { label: "Visa ✓", color: "#C24E2A" },
    { label: "Flights ✓", color: "#C24E2A" },
    { label: "Stays ✗", color: "#BA181B" },
    { label: "Pack ✗", color: "rgba(26,26,24,0.20)" },
    { label: "Beauty ✗", color: "rgba(26,26,24,0.20)" },
    { label: "Insurance ✓", color: "#C24E2A" },
  ];

  return (
    <main style={{ maxWidth: "390px", margin: "0 auto", backgroundColor: "#F5F0E8", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ position: "relative", height: "220px", overflow: "hidden", backgroundColor: "#C24E2A" }}>
        <img
          src="https://res.cloudinary.com/dvfzz0min/image/upload/v1777528360/Prep_mgwur2.png"
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
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 16px",
          }}
        >
          <Link
            to="/trip/puglia"
            aria-label="Back"
            style={{ color: "rgba(245,240,232,0.85)", fontSize: "16px", textDecoration: "none", lineHeight: 1 }}
          >
            ←
          </Link>
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "7px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              backgroundColor: "#C24E2A",
              color: "#F5F0E8",
              borderRadius: "99px",
              padding: "3px 10px",
            }}
          >
            PREP ENGINE
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
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "10px",
              color: "rgba(245,240,232,0.60)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Puglia · Jun 12 · 38 days
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "26px",
              color: "#F5F0E8",
              margin: 0,
              marginTop: "2px",
              lineHeight: 1.1,
            }}
          >
            Prep
          </h1>
        </div>
      </header>

      {/* SECTION 2 — PREP READINESS */}
      <section style={sectionBase}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "9px",
              textTransform: "uppercase",
              color: "rgba(26,26,24,0.40)",
            }}
          >
            PREP READINESS
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#C24E2A" }}>28%</span>
        </div>
        <div style={{ height: "3px", backgroundColor: "rgba(26,26,24,0.10)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ width: "28%", height: "100%", backgroundColor: "#C24E2A", borderRadius: "2px" }} />
        </div>
      </section>

      {/* SECTION 3 — CURA INSIGHT */}
      <section style={sectionBase}>
        <div
          style={{
            backgroundColor: cardBg,
            borderLeft: "3px solid #C24E2A",
            borderRadius: "0 14px 14px 0",
            padding: "10px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "9px",
              color: "#C24E2A",
              display: "block",
              marginBottom: "5px",
            }}
          >
            ✦ CURA
          </span>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "13px",
              color: "rgba(26,26,24,0.65)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            38 days sounds like enough. It is not. The visa is your first job this week. Beauty appointments fill fast — book them now, not in two weeks.
          </p>
        </div>
      </section>

      {/* SECTION 4 — PRE-TRIP TIMELINE */}
      <section style={sectionBase}>
        <span style={sectionLabel}>PRE-TRIP TIMELINE</span>

        {phases.map((phase) => (
          <div key={phase.label} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: phase.dot,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: "rgba(26,26,24,0.45)",
                  flex: 1,
                }}
              >
                {phase.label}
              </span>
              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  borderRadius: "99px",
                  backgroundColor: phase.badgeBg,
                  color: phase.badgeColor,
                }}
              >
                {phase.badge}
              </span>
            </div>
            {phase.tasks.map((t, i) => renderTaskRow(t, i === phase.tasks.length - 1))}
            {addTaskRow}
          </div>
        ))}

        {/* Phase 4 — special */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "rgba(26,26,24,0.25)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                color: "rgba(26,26,24,0.45)",
                flex: 1,
              }}
            >
              Day before · Travel day
            </span>
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "7px",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: "99px",
                backgroundColor: "rgba(26,26,24,0.07)",
                color: "rgba(26,26,24,0.40)",
              }}
            >
              Not started
            </span>
          </div>
          {phase4Tasks.map((t) => renderTaskRow(t, false))}
          {/* Mental note row — no check circle */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              padding: "7px 0",
            }}
          >
            <span style={{ color: "#F2C94C", fontSize: "10px", lineHeight: 1.4, flexShrink: 0 }}>✦</span>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "12px",
                color: "rgba(26,26,24,0.55)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Sleep early the night before. You will not regret it.
            </p>
          </div>
          {addTaskRow}
        </div>
      </section>

      {/* SECTION 5 — BEAUTY APPOINTMENTS */}
      <section style={sectionBase}>
        <span style={sectionLabel}>BEAUTY APPOINTMENTS</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {beauty.map(renderApptCard)}
          {addCard("+ Add appointment")}
        </div>
      </section>

      {/* SECTION 6 — LOGISTICS */}
      <section style={sectionBase}>
        <span style={sectionLabel}>LOGISTICS</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {logistics.map(renderApptCard)}
          {addCard("+ Add")}
        </div>
      </section>

      {/* SECTION 7 — HEALTH & ADMIN */}
      <section style={sectionBase}>
        <span style={sectionLabel}>HEALTH & ADMIN</span>
        {health.map((row, i) => (
          <div
            key={row.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 0",
              borderBottom: i === health.length - 1 ? "none" : "0.5px solid rgba(26,26,24,0.07)",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                backgroundColor: cardBg,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: row.done ? "#C24E2A" : "rgba(26,26,24,0.20)",
                  display: "inline-block",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: "#1A1A18" }}>
                {row.name}
              </div>
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "rgba(26,26,24,0.35)",
                  marginTop: "2px",
                }}
              >
                {row.meta}
              </div>
            </div>
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "7px",
                textTransform: "uppercase",
                padding: "2px 7px",
                borderRadius: "99px",
                backgroundColor: row.done ? "rgba(194,78,42,0.12)" : "rgba(26,26,24,0.07)",
                color: row.done ? "#C24E2A" : "rgba(26,26,24,0.40)",
              }}
            >
              {row.pillText}
            </span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0" }}>
          <span
            style={{
              width: "13px",
              height: "13px",
              borderRadius: "50%",
              border: "1.5px dashed rgba(26,26,24,0.25)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              color: "rgba(26,26,24,0.35)",
            }}
          >
            + ADD ITEM
          </span>
        </div>
      </section>

      {/* SECTION 8 — TRAVEL READINESS SCORE */}
      <section style={{ backgroundColor: "#F5F0E8", padding: "14px 16px 32px 16px" }}>
        <span style={sectionLabel}>TRAVEL READINESS SCORE</span>
        <div style={{ backgroundColor: cardBg, borderRadius: "18px", padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "14px",
                color: "rgba(26,26,24,0.65)",
                lineHeight: 1.4,
                margin: 0,
                flex: 1,
              }}
            >
              Are you actually ready to leave?
            </p>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#C24E2A", lineHeight: 1 }}>
              28%
            </span>
          </div>
          <div style={{ height: "0.5px", backgroundColor: "rgba(26,26,24,0.08)", marginBottom: "12px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {readinessItems.map((it) => (
              <div key={it.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: it.color,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "rgba(26,26,24,0.50)",
                  }}
                >
                  {it.label}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: "rgba(26,26,24,0.50)",
              marginTop: "12px",
              marginBottom: 0,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#F2C94C", fontSize: "10px", marginRight: "6px" }}>✦</span>
            Book your accommodation and you jump to 45%. That is the single highest-impact task right now.
          </p>
        </div>
      </section>
    </main>
  );
};

export default TripPrep;
