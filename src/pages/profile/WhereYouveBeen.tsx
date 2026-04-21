import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ChapterShell } from "@/components/profile/ChapterShell";
import { SaveButton } from "@/components/profile/SaveButton";
import { FieldLabel } from "@/components/profile/FieldLabel";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useProfileData, type ArchiveTrip } from "@/lib/profileData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const MARKERS = [
  { label: "Loved", color: "hsl(var(--accent-olive))" },
  { label: "Overrated", color: "hsl(var(--accent-ochre))" },
  { label: "Would revisit", color: "hsl(var(--sky))" },
  { label: "Once was enough", color: "hsl(var(--foreground) / 0.4)" },
];

const MarkerTag = ({ label }: { label: string }) => {
  const m = MARKERS.find((x) => x.label === label);
  const color = m?.color ?? "hsl(var(--foreground))";
  return (
    <span
      className="inline-flex items-center font-sans uppercase"
      style={{
        fontSize: "9px",
        letterSpacing: "0.2em",
        padding: "3px 7px",
        border: `0.5px solid ${color}`,
        color,
        borderRadius: 0,
      }}
    >
      {label}
    </span>
  );
};

const fmtDates = (from?: string | null, to?: string | null) => {
  if (!from && !to) return "";
  const f = from ? format(parseISO(from), "MMM d") : "—";
  const t = to ? format(parseISO(to), "MMM d, yyyy") : "—";
  return `${f} — ${t}`;
};

const WhereYouveBeen = () => {
  const [data, save] = useProfileData();

  const cura = data.archive.filter((t) => t.source === "cura");
  const manual = data.archive.filter((t) => t.source === "manual");

  // form state
  const [destination, setDestination] = useState("");
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const [memory, setMemory] = useState("");
  const [markers, setMarkers] = useState<string[]>([]);

  const toggleMarker = (m: string) =>
    setMarkers((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));

  const addToArchive = () => {
    if (!destination.trim()) {
      toast.error("Where did you go?");
      return;
    }
    const next: ArchiveTrip = {
      id: `t-${Date.now()}`,
      destination: destination.trim(),
      from: from?.toISOString() ?? null,
      to: to?.toISOString() ?? null,
      memory: memory.trim() || null,
      markers,
      source: "manual",
    };
    save({ archive: [...data.archive, next] });
    setDestination(""); setFrom(undefined); setTo(undefined); setMemory(""); setMarkers([]);
    toast.success("Added to archive");
  };

  return (
    <ChapterShell
      number="06"
      title="Where you've been"
      subhead="Every place you've landed. What you thought of it."
      opening="Every place leaves something behind. I keep track."
    >
      {/* CURA trips */}
      <section>
        <FieldLabel>Planned with Cura</FieldLabel>
        <ul className="mt-4 space-y-6">
          {cura.concat(manual).map((trip) => (
            <li
              key={trip.id}
              style={{ borderBottom: "0.5px solid hsl(var(--foreground) / 0.1)", paddingBottom: "20px" }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif" style={{ fontSize: "20px", lineHeight: 1.1 }}>
                  {trip.destination}
                </h3>
                {trip.source === "manual" && (
                  <span className="font-sans uppercase" style={{ fontSize: "8px", letterSpacing: "0.22em", color: "hsl(var(--foreground) / 0.4)" }}>
                    Yours
                  </span>
                )}
              </div>
              {(trip.from || trip.to) && (
                <div className="font-sans mt-1" style={{ fontSize: "10px", letterSpacing: "0.08em", color: "hsl(var(--foreground) / 0.55)" }}>
                  {fmtDates(trip.from, trip.to)}
                </div>
              )}
              {trip.markers.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {trip.markers.map((m) => <MarkerTag key={m} label={m} />)}
                </div>
              )}
              {trip.memory && (
                <p className="italic-serif mt-3" style={{ fontSize: "14px", color: "hsl(var(--foreground) / 0.7)", lineHeight: 1.5 }}>
                  "{trip.memory}"
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Add a trip manually */}
      <section className="mt-10">
        <FieldLabel>Add a trip</FieldLabel>

        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Where did you go?"
          className="mt-4 w-full bg-transparent border-b border-foreground/30 focus:border-foreground/60 outline-none py-2 font-serif"
          style={{ fontSize: "22px" }}
        />

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { label: "From", value: from, set: setFrom },
            { label: "To", value: to, set: setTo },
          ].map((d) => (
            <div key={d.label}>
              <FieldLabel>{d.label}</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="mt-2 flex items-center justify-between w-full border py-2.5 px-3 hover:bg-foreground/[0.03]"
                    style={{ borderColor: "hsl(var(--foreground) / 0.2)", borderRadius: 0 }}
                  >
                    <span className="font-serif" style={{ fontSize: "14px", color: d.value ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.5)" }}>
                      {d.value ? format(d.value, "MMM d, yyyy") : "Pick"}
                    </span>
                    <CalendarIcon className="h-3.5 w-3.5 text-foreground/50" strokeWidth={1.5} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={d.value}
                    onSelect={d.set as (date: Date | undefined) => void}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <FieldLabel>Memory</FieldLabel>
          <input
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            placeholder="One line. What do you remember?"
            className="mt-2 w-full bg-transparent border-b border-foreground/30 focus:border-foreground/60 outline-none py-2 italic-serif"
            style={{ fontSize: "15px" }}
          />
        </div>

        <div className="mt-5">
          <FieldLabel>Markers</FieldLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {MARKERS.map((m) => {
              const on = markers.includes(m.label);
              return (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => toggleMarker(m.label)}
                  className="font-sans uppercase transition-colors"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    padding: "5px 9px",
                    border: `0.5px solid ${m.color}`,
                    color: on ? "hsl(var(--ink-foreground))" : m.color,
                    backgroundColor: on ? m.color : "transparent",
                    borderRadius: 0,
                  }}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <SaveButton onClick={addToArchive}>Add to archive</SaveButton>
      </section>
    </ChapterShell>
  );
};

export default WhereYouveBeen;
