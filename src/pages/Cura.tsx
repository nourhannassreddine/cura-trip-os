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
    <main className="app-shell pb-20 bg-bone">
      {/* Top — minimal eyebrow, no big title. The opening statement is the title. */}
      <header className="px-5 pt-6 pb-2 flex items-center gap-2">
        <Asterisk className="h-4 w-4" strokeWidth={1.5} />
        <span className="editorial-eyebrow text-foreground/60">Cura</span>
      </header>

      {/* Opening read — Playfair, generous leading. */}
      <section className="px-5 pt-4 pb-8 cura-rise">
        <p className="font-serif text-[26px] leading-[1.2] tracking-tight max-w-[26ch]">
          {openingStatement}
        </p>
        {primary && (
          <div className="editorial-eyebrow text-foreground/40 mt-4">
            On {primary.city} · {primary.daysOut} days
          </div>
        )}
      </section>

      {/* Insight feed — hairline-divided cards, no heavy borders, no shadows. */}
      <section className="border-t border-foreground/15">
        <ul>
          {insights.map((card, i) => (
            <li key={i} className="px-5 py-6 border-b border-foreground/15">
              <div className="editorial-eyebrow text-foreground/45 mb-2">
                {card.category}
              </div>
              <p className="font-serif text-[17px] leading-snug text-foreground/90">
                {card.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Input — bottom of the room. No label, only a placeholder in CURA's voice.
          Send arrow only appears once the user has typed something. */}
      <section className="px-5 py-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Stub — wired in a later prompt.
            setDraft("");
          }}
          className="flex items-center gap-2 border-t border-foreground/25 pt-3"
        >
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask me anything about this trip."
            className="flex-1 bg-transparent border-0 outline-none italic-serif text-[15px] placeholder:text-foreground/40 placeholder:italic-serif"
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
