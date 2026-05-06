import { useState } from "react";
import { Link } from "react-router-dom";

type Tab = "ENTRIES" | "RECAP" | "ARCHIVE";

const TripJournal = () => {
  const [tab, setTab] = useState<Tab>("ENTRIES");

  const heroTitle =
    tab === "ENTRIES"
      ? ["The trip,", "in your words."]
      : tab === "RECAP"
      ? ["The trip,", "in review."]
      : ["Your travel", "archive."];

  const moodDays = [
    { h: 20, c: "#F2C94C" },
    { h: 20, c: "#F2C94C" },
    { h: 14, c: "#C24E2A" },
    { h: 20, c: "#F2C94C" },
    { h: 20, c: "#F2C94C" },
    { h: 8, c: "#BA181B" },
    { h: 20, c: "#F2C94C" },
    { h: 16, c: "#6B7D3D" },
    { h: 20, c: "#F2C94C" },
    { h: 20, c: "#F2C94C" },
  ];

  const tabs: Tab[] = ["ENTRIES", "RECAP", "ARCHIVE"];

  const actionPill: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "7px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    padding: "4px 10px",
    borderRadius: "99px",
    background: "rgba(242,201,76,0.12)",
    color: "rgba(26,26,24,0.55)",
  };

  const chipHero: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "7px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "2px 8px",
    borderRadius: "99px",
    background: "rgba(245,240,232,0.20)",
    color: "#F5F0E8",
  };

  const sectionLabel: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "rgba(26,26,24,0.35)",
    marginBottom: "10px",
  };

  const renderEntryCard = (opts: {
    image: string;
    date: string;
    vibeLabel: string;
    vibeBg: string;
    vibeColor: string;
    location: string;
    curaLine: string;
    body: string;
    photos?: string[];
    showActions?: boolean;
    marginTop?: string;
  }) => (
    <div
      style={{
        margin: `${opts.marginTop ?? "10px"} 14px 0`,
        background: "#EFE9DF",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", height: "110px", backgroundImage: `url('${opts.image}')`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.60) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontFamily: "Inter, sans-serif",
            fontSize: "7px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(245,240,232,0.80)",
          }}
        >
          {opts.date}
        </div>
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontFamily: "Inter, sans-serif",
            fontSize: "7px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            background: opts.vibeBg,
            color: opts.vibeColor,
            borderRadius: "99px",
            padding: "2px 8px",
          }}
        >
          {opts.vibeLabel}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "10px",
            fontFamily: "Inter, sans-serif",
            fontSize: "7px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(245,240,232,0.70)",
          }}
        >
          {opts.location}
        </div>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "12px",
            color: "#F2C94C",
            lineHeight: 1.5,
            marginBottom: "6px",
          }}
        >
          {opts.curaLine}
        </div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "12px",
            color: "rgba(26,26,24,0.75)",
            lineHeight: 1.6,
          }}
        >
          {opts.body}
        </div>
      </div>
      {opts.photos && (
        <div style={{ display: "flex", gap: "5px", padding: "8px 12px 0" }}>
          {opts.photos.map((p, i) => (
            <Link key={i} to="/trip/puglia/pack" style={{ flex: 1 }}>
              <img
                src={p}
                alt=""
                style={{
                  width: "100%",
                  height: "54px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            </Link>
          ))}
        </div>
      )}
      {opts.showActions && (
        <div style={{ display: "flex", gap: "6px", padding: "8px 12px 10px" }}>
          <span style={actionPill}>+ Add photo</span>
          <span style={actionPill}>+ Add note</span>
          <span style={actionPill}>+ Add quote</span>
        </div>
      )}
    </div>
  );

  const verdicts = [
    {
      img: "https://images.unsplash.com/photo-1534445538923-ab0f57a02eb5?w=200&q=80",
      name: "Trulli di Alberobello",
      verdict: "Worth it only before 9am. After that it is a theme park.",
      tag: "Revisit · early only",
      tagBg: "rgba(107,125,61,0.12)",
      tagColor: "#6B7D3D",
    },
    {
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80",
      name: "Osteria del Tempo Perso",
      verdict: "Best meal of the trip. Non-negotiable.",
      tag: "Loved · go back",
      tagBg: "rgba(242,201,76,0.15)",
      tagColor: "rgba(26,26,24,0.60)",
    },
    {
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80",
      name: "Il Bastione",
      verdict: "Overpriced for what it was. The terrace saved it.",
      tag: "Once only",
      tagBg: "rgba(186,24,27,0.10)",
      tagColor: "#BA181B",
    },
  ];

  const exports = [
    { iconBg: "rgba(242,201,76,0.20)", name: "5-slide carousel", sub: "With captions · ready to post", btn: "Generate →" },
    { iconBg: "rgba(107,125,61,0.15)", name: "Trip summary card", sub: "One shareable image", btn: "Generate →" },
    { iconBg: "rgba(194,78,42,0.12)", name: "Highlight reel", sub: "3 best moments · CURA picks", btn: "Generate →" },
    { iconBg: "rgba(79,182,200,0.12)", name: "Memory book", sub: "Full trip · PDF format", btn: "Export →" },
  ];

  const archiveCard = (opts: {
    img: string;
    dest: string;
    dates: string;
    chip: string;
    chipBg: string;
    chipColor: string;
    score: string;
  }) => (
    <div
      style={{
        margin: "0 14px",
        borderRadius: "14px",
        overflow: "hidden",
        height: "90px",
        position: "relative",
      }}
    >
      <img
        src={opts.img}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.10) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#F5F0E8" }}>
          {opts.dest}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "7px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(245,240,232,0.60)",
            marginTop: "2px",
          }}
        >
          {opts.dates}
        </div>
        <span
          style={{
            display: "inline-block",
            marginTop: "5px",
            fontFamily: "Inter, sans-serif",
            fontSize: "7px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "2px 6px",
            borderRadius: "99px",
            background: opts.chipBg,
            color: opts.chipColor,
          }}
        >
          {opts.chip}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "right",
        }}
      >
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#F2C94C" }}>
          {opts.score}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "7px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(245,240,232,0.50)",
            marginTop: "2px",
          }}
        >
          Trip score
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "390px",
        margin: "0 auto",
        background: "#EFE9DF",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img
          src="https://res.cloudinary.com/dvfzz0min/image/upload/v1777958136/JOURNAL_lxw5rc.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "14px",
            right: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/trip/puglia"
            style={{
              color: "rgba(245,240,232,0.85)",
              fontSize: "16px",
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
              letterSpacing: "0.10em",
              background: "#F2C94C",
              color: "rgba(26,26,24,0.80)",
              borderRadius: "99px",
              padding: "3px 10px",
            }}
          >
            JOURNAL
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "14px",
            right: "14px",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              color: "rgba(245,240,232,0.55)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Puglia · Italy · Jun 12–22
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "22px",
              color: "#F5F0E8",
              lineHeight: 1.1,
              marginTop: "4px",
            }}
          >
            {heroTitle[0]}
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "22px",
              color: "#F5F0E8",
              lineHeight: 1.1,
              marginTop: "2px",
            }}
          >
            {heroTitle[1]}
          </div>
          <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
            <span style={chipHero}>10 days</span>
            <span style={chipHero}>24 places</span>
            <span style={chipHero}>Trip complete</span>
          </div>
        </div>
      </div>

      {/* TAB BAR */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#EFE9DF",
          borderBottom: "0.5px solid rgba(26,26,24,0.10)",
          display: "flex",
        }}
      >
        {tabs.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "10px 0",
                textAlign: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                background: "transparent",
                border: "none",
                borderBottom: active ? "2px solid #F2C94C" : "2px solid transparent",
                color: active ? "#F2C94C" : "rgba(26,26,24,0.40)",
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* ENTRIES */}
      {tab === "ENTRIES" && (
        <div>
          {/* Mood timeline */}
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "0.5px solid rgba(26,26,24,0.08)",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(26,26,24,0.35)",
                marginBottom: "8px",
              }}
            >
              MOOD ACROSS THE TRIP
            </div>
            <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "28px" }}>
              {moodDays.map((d, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${d.h}px`,
                      background: d.c,
                      borderRadius: "3px",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "6px",
                      color: "rgba(26,26,24,0.35)",
                      marginTop: "2px",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {renderEntryCard({
            image: "https://images.unsplash.com/photo-1534445538923-ab0f57a02eb5?w=400&q=80",
            date: "DAY 2 · THURSDAY JUN 13",
            vibeLabel: "Perfect",
            vibeBg: "rgba(242,201,76,0.25)",
            vibeColor: "#F2C94C",
            location: "Alberobello & Locorotondo",
            curaLine:
              "✦ Thursday began at the trulli before the tourists arrived. The light was still cool.",
            body:
              "We were there by 8am and had the streets entirely to ourselves. The silence was the point. Lunch ran three hours — the orecchiette was everything. Locorotondo in the afternoon was the surprise of the whole trip.",
            photos: [
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80",
            ],
            showActions: true,
          })}

          {/* Quote card */}
          <div
            style={{
              margin: "8px 14px",
              background: "#F5F0E8",
              borderRadius: "14px",
              borderLeft: "3px solid #F2C94C",
              padding: "12px 14px",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                color: "rgba(242,201,76,0.30)",
                lineHeight: 1,
                marginBottom: "-8px",
                display: "block",
              }}
            >
              "
            </span>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "13px",
                color: "rgba(26,26,24,0.70)",
                lineHeight: 1.6,
              }}
            >
              You must come back in September. The trulli are yours then.
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(26,26,24,0.35)",
                marginTop: "6px",
              }}
            >
              — The owner of Osteria del Tempo Perso · Day 2
            </div>
          </div>

          {/* Scrapbook */}
          <div style={{ margin: "8px 14px" }}>
            <div style={sectionLabel}>SCRAPBOOK · DAY 2</div>
            <div style={{ display: "flex", gap: "6px" }}>
              <div
                style={{
                  height: "64px",
                  flex: 1,
                  borderRadius: "10px",
                  transform: "rotate(-1.5deg)",
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                style={{
                  height: "64px",
                  flex: 1,
                  borderRadius: "10px",
                  transform: "rotate(1deg)",
                  background: "#EFE9DF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(26,26,24,0.30)",
                }}
              >
                Menu scan
              </div>
              <div
                style={{
                  height: "64px",
                  flex: 1,
                  borderRadius: "10px",
                  transform: "rotate(-0.5deg)",
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>

          {renderEntryCard({
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
            date: "DAY 5 · SUNDAY JUN 16",
            vibeLabel: "Almost",
            vibeBg: "rgba(107,125,61,0.25)",
            vibeColor: "#6B7D3D",
            location: "Torre dell'Orso Beach",
            curaLine:
              "✦ The beach was everything promised. The afternoon was slower than expected.",
            body:
              "We stayed longer than planned and missed the sunset spot. Next time — stay one more night here.",
            marginTop: "8px",
          })}

          {/* Add entry */}
          <div
            style={{
              margin: "10px 14px 20px",
              border: "1px dashed rgba(26,26,24,0.20)",
              borderRadius: "14px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1.5px dashed rgba(26,26,24,0.25)",
              }}
            />
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(26,26,24,0.30)",
              }}
            >
              + Add entry · Day 6 · Lecce
            </div>
          </div>
        </div>
      )}

      {/* RECAP */}
      {tab === "RECAP" && (
        <div>
          {/* Verdicts */}
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "0.5px solid rgba(26,26,24,0.08)",
            }}
          >
            <div style={sectionLabel}>
              YOUR PLACE VERDICTS · TELL CURA WHAT YOU ACTUALLY THOUGHT
            </div>
            {verdicts.map((v, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  padding: "7px 0",
                  borderBottom:
                    i < verdicts.length - 1
                      ? "0.5px solid rgba(26,26,24,0.07)"
                      : "none",
                }}
              >
                <img
                  src={v.img}
                  alt=""
                  style={{
                    width: "36px",
                    height: "44px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "12px",
                      color: "#1A1A18",
                    }}
                  >
                    {v.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "11px",
                      color: "rgba(26,26,24,0.55)",
                      marginTop: "2px",
                      lineHeight: 1.4,
                    }}
                  >
                    {v.verdict}
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "4px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "7px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "2px 7px",
                      borderRadius: "99px",
                      background: v.tagBg,
                      color: v.tagColor,
                    }}
                  >
                    {v.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Social export */}
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "0.5px solid rgba(26,26,24,0.08)",
            }}
          >
            <div style={sectionLabel}>SOCIAL EXPORT · READY TO SHARE</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {exports.map((e, i) => (
                <div
                  key={i}
                  style={{
                    background: "#EFE9DF",
                    borderRadius: "12px",
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "6px",
                      background: e.iconBg,
                      marginBottom: "6px",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "12px",
                      color: "#1A1A18",
                    }}
                  >
                    {e.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "7px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(26,26,24,0.40)",
                      marginTop: "2px",
                    }}
                  >
                    {e.sub}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "7px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#F2C94C",
                      marginTop: "8px",
                      display: "block",
                    }}
                  >
                    {e.btn}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future-me note */}
          <div
            style={{
              margin: "10px 14px",
              background: "#EFE9DF",
              borderLeft: "3px solid #F2C94C",
              borderTopRightRadius: "14px",
              borderBottomRightRadius: "14px",
              padding: "12px 14px",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                color: "#F2C94C",
                display: "block",
                marginBottom: "5px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              ✦ CURA · memory mining
            </span>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "13px",
                color: "rgba(26,26,24,0.65)",
                lineHeight: 1.5,
                marginBottom: "8px",
              }}
            >
              What would you tell yourself before this trip?
            </div>
            <div
              style={{
                background: "rgba(26,26,24,0.06)",
                borderRadius: "10px",
                padding: "10px 12px",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "12px",
                color: "rgba(26,26,24,0.50)",
                lineHeight: 1.5,
              }}
            >
              Book the masseria for the last night, not the first. Arrive in Alberobello before 8am. Skip Bari — give that day to Locorotondo instead.
            </div>
          </div>

          {/* Unsent postcard */}
          <div
            style={{
              margin: "10px 14px 20px",
              background: "#F5F0E8",
              borderRadius: "14px",
              border: "1px solid rgba(26,26,24,0.10)",
              padding: "14px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "22px",
                height: "30px",
                background: "rgba(242,201,76,0.25)",
                borderRadius: "3px",
                border: "1px solid rgba(242,201,76,0.40)",
              }}
            />
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(26,26,24,0.35)",
                marginBottom: "8px",
              }}
            >
              THE UNSENT POSTCARD · PUGLIA
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "12px",
                color: "rgba(26,26,24,0.70)",
                lineHeight: 1.7,
              }}
            >
              The trulli look exactly like the photos, which surprised me — usually the photos lie. The pasta was unreasonable. I have left a piece of something here that I will have to come back for.
            </div>
            <div
              style={{
                marginTop: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(26,26,24,0.35)",
              }}
            >
              — Written Jun 22 · Last evening in Puglia
            </div>
            <span
              style={{
                display: "inline-block",
                marginTop: "4px",
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "3px 8px",
                borderRadius: "99px",
                background: "rgba(242,201,76,0.15)",
                color: "rgba(26,26,24,0.55)",
              }}
            >
              ✦ Puglia · Jun 2026
            </span>
          </div>
        </div>
      )}

      {/* ARCHIVE */}
      {tab === "ARCHIVE" && (
        <div>
          <div style={{ padding: "10px 14px 4px" }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(26,26,24,0.35)",
                marginBottom: "10px",
              }}
            >
              2026
            </div>
          </div>
          {archiveCard({
            img: "https://images.unsplash.com/photo-1534445538923-ab0f57a02eb5?w=400&q=80",
            dest: "Puglia",
            dates: "Italy · Jun 12–22 · 10 days",
            chip: "8 perfect days",
            chipBg: "rgba(242,201,76,0.25)",
            chipColor: "#F2C94C",
            score: "9.2",
          })}

          <div style={{ padding: "10px 14px 4px" }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(26,26,24,0.35)",
                marginBottom: "10px",
              }}
            >
              2024
            </div>
          </div>
          {archiveCard({
            img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80",
            dest: "Lisbon",
            dates: "Portugal · Oct 18–24 · 6 days",
            chip: "5 perfect days",
            chipBg: "rgba(107,125,61,0.25)",
            chipColor: "#6B7D3D",
            score: "8.7",
          })}
          <div style={{ height: "8px" }} />
          {archiveCard({
            img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80",
            dest: "Kyoto",
            dates: "Japan · Apr 2–9 · 7 days",
            chip: "7 perfect days",
            chipBg: "rgba(242,201,76,0.25)",
            chipColor: "#F2C94C",
            score: "9.8",
          })}

          <div
            style={{
              margin: "12px 14px",
              background: "#EFE9DF",
              borderRadius: "14px",
              padding: "12px 14px",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(26,26,24,0.35)",
                marginBottom: "6px",
              }}
            >
              ✦ CURA · travel intelligence
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "12px",
                color: "rgba(26,26,24,0.65)",
                lineHeight: 1.5,
              }}
            >
              You travel best in June and October. Your highest-rated trips are all in southern Europe. You consistently rate food experiences above sightseeing.
            </div>
          </div>

          <div
            style={{
              margin: "0 14px 20px",
              border: "1px dashed rgba(26,26,24,0.20)",
              borderRadius: "14px",
              padding: "12px",
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(26,26,24,0.30)",
            }}
          >
            + Add a past trip to the archive
          </div>
        </div>
      )}
    </div>
  );
};

export default TripJournal;
