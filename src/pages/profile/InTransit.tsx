import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { ChapterShell } from "@/components/profile/ChapterShell";
import { SelectChip } from "@/components/profile/SelectChip";
import { SaveButton } from "@/components/profile/SaveButton";
import { FieldLabel } from "@/components/profile/FieldLabel";
import { CuraNoteA } from "@/components/profile/CuraNoteA";
import { SearchableSelect } from "@/components/cura/SearchableSelect";
import { useProfileData, type InTransit as InTransitT, type WatchlistItem } from "@/lib/profileData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const GENRES = [
  "Something that makes me think",
  "Easy. I'm tired.",
  "A good story, well told",
  "Documentary. Real things.",
  "Funny. Actually funny.",
  "Tense. I like the feeling.",
  "Romance. No apologies.",
  "Sci-fi or fantasy",
];

const FORMAT = [
  "Series — I like something to continue",
  "Films — contained, start to finish",
  "Both, depending on the flight",
];

const LANGS = [
  "English", "Arabic", "French", "Spanish", "Italian", "German",
  "Japanese", "Korean", "Hindi", "Portuguese", "Mandarin", "Turkish",
  "Greek", "Dutch", "Swedish", "Russian", "Polish", "Hebrew",
];

const InTransit = () => {
  const navigate = useNavigate();
  const [data, save] = useProfileData();
  const [t, setT] = useState<InTransitT>(data.transit);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"series" | "film">("film");

  useEffect(() => setT(data.transit), [data.transit]);

  const toggleGenre = (g: string) =>
    setT((p) => ({ ...p, genres: p.genres.includes(g) ? p.genres.filter((x) => x !== g) : [...p.genres, g] }));

  const toggleLang = (l: string) =>
    setT((p) => ({ ...p, languages: p.languages.includes(l) ? p.languages.filter((x) => x !== l) : [...p.languages, l] }));

  const addItem = () => {
    if (!newTitle.trim()) return;
    const item: WatchlistItem = {
      id: `w-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      downloaded: false,
    };
    setT((p) => ({ ...p, watchlist: [...p.watchlist, item] }));
    setNewTitle("");
  };

  const toggleDl = (id: string) =>
    setT((p) => ({ ...p, watchlist: p.watchlist.map((w) => w.id === id ? { ...w, downloaded: !w.downloaded } : w) }));

  const removeItem = (id: string) =>
    setT((p) => ({ ...p, watchlist: p.watchlist.filter((w) => w.id !== id) }));

  const handleSave = () => {
    save({ transit: t });
    toast.success("Saved");
    navigate("/profile");
  };

  return (
    <ChapterShell
      number="05"
      title="In transit"
      subhead="What you watch, read, and listen to between here and there."
      opening="The hours between departure and arrival. I don't waste them."
    >
      <section>
        <FieldLabel>Genres</FieldLabel>
        <div className="mt-3 space-y-2">
          {GENRES.map((g) => (
            <SelectChip key={g} label={g} selected={t.genres.includes(g)} onClick={() => toggleGenre(g)} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <FieldLabel>You prefer</FieldLabel>
        <div className="mt-3 space-y-2">
          {FORMAT.map((f) => (
            <SelectChip key={f} label={f} selected={t.format === f} onClick={() => setT((p) => ({ ...p, format: p.format === f ? null : f }))} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <FieldLabel>Language preference</FieldLabel>
        <div className="mt-3">
          <SearchableSelect
            options={LANGS.filter((l) => !t.languages.includes(l))}
            value={null}
            onChange={(l) => toggleLang(l)}
            placeholder="Search a language…"
            label="Add a language"
          />
        </div>
        {t.languages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {t.languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => toggleLang(l)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-ink-foreground font-serif"
                style={{ borderRadius: 0, fontSize: "13px" }}
                aria-label={`Remove ${l}`}
              >
                {l}
                <X className="h-3 w-3" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <FieldLabel>Your watchlist</FieldLabel>
        <ul className="mt-3" style={{ borderTop: "0.5px solid hsl(var(--foreground) / 0.1)" }}>
          {t.watchlist.length === 0 && (
            <li
              className="italic-serif py-4"
              style={{ fontSize: "14px", color: "hsl(var(--foreground) / 0.5)" }}
            >
              Nothing here yet. Add what you'd actually watch.
            </li>
          )}
          {t.watchlist.map((w) => (
            <li
              key={w.id}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: "0.5px solid hsl(var(--foreground) / 0.1)" }}
            >
              <div className="min-w-0 pr-3">
                <div className="font-serif" style={{ fontSize: "15px" }}>{w.title}</div>
                <div className="font-sans uppercase mt-1" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "hsl(var(--foreground) / 0.45)" }}>
                  {w.type}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleDl(w.id)}
                  className={cn(
                    "px-2.5 py-1 border font-sans uppercase",
                    w.downloaded ? "bg-ink text-ink-foreground border-ink" : "border-foreground/20 text-foreground/65"
                  )}
                  style={{ borderRadius: 0, fontSize: "9px", letterSpacing: "0.18em" }}
                >
                  {w.downloaded ? "Downloaded" : "To download"}
                </button>
                <button type="button" onClick={() => removeItem(w.id)} aria-label="Remove" className="p-1 text-foreground/40 hover:text-foreground">
                  <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-stretch gap-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Add a title…"
            className="flex-1 bg-transparent border-b border-foreground/30 focus:border-foreground/60 outline-none py-2 font-serif"
            style={{ fontSize: "15px" }}
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as "series" | "film")}
            className="bg-transparent border-b border-foreground/30 outline-none py-2 font-sans uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.18em", borderRadius: 0 }}
          >
            <option value="film">Film</option>
            <option value="series">Series</option>
          </select>
          <button
            type="button"
            onClick={addItem}
            aria-label="Add"
            className="px-3 bg-ink text-ink-foreground"
            style={{ borderRadius: 0 }}
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <CuraNoteA>
          I'll build your flight-specific list when you add flights to a trip.
        </CuraNoteA>
      </section>

      <SaveButton onClick={handleSave} />
    </ChapterShell>
  );
};

export default InTransit;
