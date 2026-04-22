import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { format, addDays, differenceInCalendarDays, parseISO, startOfDay } from "date-fns";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { ChapterShell } from "@/components/profile/ChapterShell";
import { SelectChip } from "@/components/profile/SelectChip";
import { SaveButton } from "@/components/profile/SaveButton";
import { CuraNoteA } from "@/components/profile/CuraNoteA";
import { FieldLabel } from "@/components/profile/FieldLabel";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useProfileData, type Rhythm } from "@/lib/profileData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SYMPTOMS = ["Low energy", "High cramps", "Mood shifts", "Bloating", "Strong and fine", "It varies"];

const Stepper = ({
  value,
  onChange,
  min = 1,
  max = 60,
  unit,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  unit: string;
}) => (
  <div
    className="mt-2 flex items-center justify-between border"
    style={{ borderColor: "hsl(var(--foreground) / 0.2)", borderRadius: 0, padding: "10px 14px" }}
  >
    <button
      type="button"
      onClick={() => onChange(Math.max(min, value - 1))}
      aria-label="Decrease"
      className="p-1 hover:opacity-60"
    >
      <Minus className="h-4 w-4" strokeWidth={1.5} />
    </button>
    <div className="font-serif" style={{ fontSize: "20px" }}>
      {value} <span className="font-sans text-foreground/50" style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>{unit}</span>
    </div>
    <button
      type="button"
      onClick={() => onChange(Math.min(max, value + 1))}
      aria-label="Increase"
      className="p-1 hover:opacity-60"
    >
      <Plus className="h-4 w-4" strokeWidth={1.5} />
    </button>
  </div>
);

const YourRhythm = () => {
  const navigate = useNavigate();
  const [data, save] = useProfileData();
  const [r, setR] = useState<Rhythm>(data.rhythm);

  useEffect(() => setR(data.rhythm), [data.rhythm]);

  const lastPeriodDate = r.lastPeriod ? parseISO(r.lastPeriod) : undefined;

  // Build a 56-day (8 weeks) window starting from today for the calendar strip
  const days = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 56 }, (_, i) => addDays(today, i));
  }, []);

  const isPeriodDay = (d: Date) => {
    if (!lastPeriodDate) return false;
    const diff = differenceInCalendarDays(d, lastPeriodDate);
    if (diff < 0) {
      // earlier cycles
      const back = ((-diff) % r.cycleLength + r.cycleLength) % r.cycleLength;
      return back < r.periodLength;
    }
    const intoCycle = diff % r.cycleLength;
    return intoCycle < r.periodLength;
  };

  const isPredicted = (d: Date) => {
    if (!lastPeriodDate) return false;
    const diff = differenceInCalendarDays(d, lastPeriodDate);
    return diff > r.periodLength && isPeriodDay(d);
  };

  const isToday = (d: Date) =>
    differenceInCalendarDays(d, startOfDay(new Date())) === 0;

  const toggleSymptom = (s: string) =>
    setR((p) => ({ ...p, symptoms: p.symptoms.includes(s) ? p.symptoms.filter((x) => x !== s) : [...p.symptoms, s] }));

  const handleSave = () => {
    save({ rhythm: r });
    toast.success("Saved");
    navigate("/profile");
  };

  return (
    <ChapterShell
      number="04"
      title="Your rhythm"
      subhead="Your cycle, your energy — mapped to your trips."
      opening="Your body travels with you. I can plan around it."
    >
      {/* Toggle */}
      <section className="flex items-start justify-between gap-4 pb-2">
        <div className="min-w-0">
          <div className="font-serif" style={{ fontSize: "17px" }}>Track my cycle</div>
          <p
            className="mt-1.5"
            style={{ fontSize: "11px", color: "hsl(var(--foreground) / 0.5)", lineHeight: 1.5 }}
          >
            Private. Never shared. Only used to flag your trip dates.
          </p>
        </div>
        <Switch checked={r.enabled} onCheckedChange={(v) => setR((p) => ({ ...p, enabled: v }))} />
      </section>

      {r.enabled && (
        <>
          {/* Cycle basics */}
          <section className="mt-8">
            <FieldLabel>Last period started</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="mt-2 flex items-center justify-between w-full border py-3 px-3 hover:bg-foreground/[0.03] transition-colors"
                  style={{ borderColor: "hsl(var(--foreground) / 0.2)", borderRadius: 0 }}
                >
                  <span className="font-serif" style={{ fontSize: "17px", color: lastPeriodDate ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.5)" }}>
                    {lastPeriodDate ? format(lastPeriodDate, "MMMM d, yyyy") : "Pick a date"}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-foreground/50" strokeWidth={1.5} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={lastPeriodDate}
                  onSelect={(d) => setR((p) => ({ ...p, lastPeriod: d ? d.toISOString() : null }))}
                  disabled={(date) => date > new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </section>

          <section className="mt-6">
            <FieldLabel>Average cycle length</FieldLabel>
            <Stepper value={r.cycleLength} onChange={(n) => setR((p) => ({ ...p, cycleLength: n }))} min={15} max={45} unit="days" />
          </section>

          <section className="mt-6">
            <FieldLabel>Average period duration</FieldLabel>
            <Stepper value={r.periodLength} onChange={(n) => setR((p) => ({ ...p, periodLength: n }))} min={1} max={14} unit="days" />
          </section>

          {/* Calendar strip */}
          <section className="mt-8">
            <FieldLabel>Next 8 weeks</FieldLabel>
            <div
              className="mt-3 flex gap-1.5 pb-2"
              style={{ scrollSnapType: "x mandatory", overflowX: "scroll", WebkitOverflowScrolling: "touch" }}
            >
              {days.map((d) => {
                const today = isToday(d);
                const period = isPeriodDay(d);
                const predicted = isPredicted(d);
                return (
                  <div
                    key={d.toISOString()}
                    className="shrink-0 flex flex-col items-center justify-center"
                    style={{
                      width: "36px",
                      height: "52px",
                      backgroundColor: today
                        ? "hsl(var(--ink))"
                        : period
                          ? predicted
                            ? "rgba(194,78,42,0.04)"
                            : "rgba(194,78,42,0.08)"
                          : "transparent",
                      color: today ? "hsl(var(--ink-foreground))" : "hsl(var(--foreground))",
                      border: "0.5px solid hsl(var(--foreground) / 0.1)",
                      scrollSnapAlign: "start",
                    }}
                  >
                    <span style={{ fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55 }}>
                      {format(d, "EEE")[0]}
                    </span>
                    <span className="font-serif mt-0.5" style={{ fontSize: "14px" }}>
                      {format(d, "d")}
                    </span>
                    {period && (
                      <span
                        className="mt-0.5 rounded-full"
                        style={{ width: "4px", height: "4px", backgroundColor: "hsl(var(--accent-ochre))", opacity: predicted ? 0.5 : 1 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Symptoms */}
          <section className="mt-8">
            <FieldLabel>How you feel during</FieldLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {SYMPTOMS.map((s) => {
                const on = r.symptoms.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSymptom(s)}
                    className={cn(
                      "px-3 py-2 border transition-colors font-serif",
                      on ? "bg-ink text-ink-foreground border-ink" : "border-foreground/15 hover:border-foreground/35"
                    )}
                    style={{ borderRadius: 0, fontSize: "13px" }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </section>

          <CuraNoteA>
            Based on your cycle, Jun 14 — your first beach day in Puglia — falls on day 2. I can move the active days to later in the trip.
          </CuraNoteA>
        </>
      )}

      <SaveButton onClick={handleSave} />
    </ChapterShell>
  );
};

export default YourRhythm;
