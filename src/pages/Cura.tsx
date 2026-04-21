import { useState } from "react";
import { ArrowUp, Asterisk } from "lucide-react";
import { BottomNav } from "@/components/cura/BottomNav";
import { trips } from "@/data/cura";

/**
 * CURA tab — the dedicated AI surface.
 * Not a chatbot. Opens with a read on the user's current state, then a feed
 * of proactive insight cards. The input lives at the bottom and is intentionally
 * understated — no send button until the user starts typing.
 *
 * Background uses --bone (ivory feel) so this tab reads warmer than the rest
 * of the app, like a private room.
 */

interface Insight {
  category: string;
  body: string;
}

// Stubbed for now — Puglia-specific, in CURA's voice.
const openingStatement =
  "Puglia in 38 days. The bones of the trip are there. What's missing is the thing that will make it.";

const insights: Insight[] = [
  {
    category: "Readiness",
    body:
      "You haven't opened the visa section. Italy is easy for you — but easy still wants a passport that isn't expiring in November. Worth a check tonight.",
  },
  {
    category: "Decision",
    body:
      "Jun 12 is a Wednesday. Most masserie open their kitchens to non-guests Thursday onward. If you want that first dinner outside the property, today is the day to call.",
  },
  {
    category: "Preparation",
    body:
      "38 days is enough time to get the packing list wrong twice and still recover. Start with what you actually need for heat, dust, and one dressy night.",
  },
];

const Cura = () => {
  const [draft, setDraft] = useState("");
  const primary = trips.find((t) => t.status !== "memory");

  return (
    <main className="app-shell pb-24 bg-bone">
      {/* Top image band — editorial anchor */}
      <section
        className="relative overflow-hidden"
        style={{ height: "180px" }}
      >
        <div className="editorial-img absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
            alt="Cura — a quiet view"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--ink) / 0.35), transparent 60%)",
          }}
        />
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <Asterisk
            className="h-3.5 w-3.5"
            strokeWidth={1.5}
            style={{ color: "hsl(var(--ink-foreground))" }}
          />
          <span
            className="text-[9px] tracking-[0.24em] uppercase"
            style={{ color: "hsl(var(--ink-foreground) / 0.85)" }}
          >
            Cura
          </span>
        </div>
      </section>

      {/* Opening read — Playfair, generous leading. */}
      <section className="px-5 pt-10 pb-10 cura-rise">
        <p
          className="font-serif tracking-tight max-w-[26ch]"
          style={{ fontSize: "26px", lineHeight: 1.25 }}
        >
          {openingStatement}
        </p>
        {primary && (
          <div className="editorial-eyebrow text-foreground/40 mt-5">
            On {primary.city} · {primary.daysOut} days
          </div>
        )}
      </section>

      {/* Insight feed — left-rule editorial cards, alternating surface. */}
      <section className="border-t border-foreground/15">
        <ul>
          {insights.map((card, i) => (
            <li
              key={i}
              className={`px-5 py-7 border-b border-foreground/15 border-l-2 ${
                i % 2 === 1 ? "bg-paper-soft" : ""
              }`}
              style={{ borderLeftColor: "hsl(var(--accent-burnt))", paddingLeft: "20px" }}
            >
              <div className="editorial-eyebrow text-foreground/45 mb-2">
                {card.category}
              </div>
              <p
                className="font-serif text-foreground/90"
                style={{ fontSize: "17px", lineHeight: 1.75 }}
              >
                {card.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Input — bottom of the room. */}
      <section className="px-5 pt-6 pb-7">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDraft("");
          }}
          className="flex items-center gap-2 border-t border-foreground/15 pt-6"
        >
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask me anything about this trip."
            className="flex-1 bg-transparent border-0 outline-none text-[15px] font-serif italic placeholder:font-serif placeholder:italic placeholder:text-foreground/40"
          />
          {draft.trim().length > 0 && (
            <button
              type="submit"
              aria-label="Send"
              className="p-1.5 hover:opacity-70"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
            </button>
          )}
        </form>
      </section>

      <BottomNav />
    </main>
  );
};

export default Cura;
