import { cn } from "@/lib/utils";

export interface MapPoint {
  id: string;
  x: number;          // 0–100
  y: number;          // 0–100
  label?: string;     // displayed under the dot
  number?: number;    // sequence number inside dot
  variant?: "primary" | "olive" | "sky" | "ink" | "muted";
}

interface Props {
  points: MapPoint[];
  connect?: boolean;          // draw a line between points in order
  height?: number;
  className?: string;
  caption?: string;
}

/**
 * Editorial, hand-drawn-feeling map canvas.
 * Not a real map — a stylized abstraction that fits CURA's aesthetic.
 * Shows topographic-ish lines + numbered stops + optional route.
 */
export const MapCanvas = ({ points, connect = true, height = 280, className, caption }: Props) => {
  const variantFill: Record<NonNullable<MapPoint["variant"]>, string> = {
    primary: "hsl(var(--primary))",
    olive: "hsl(var(--olive))",
    sky: "hsl(var(--sky))",
    ink: "hsl(var(--ink))",
    muted: "hsl(var(--muted-foreground))",
  };

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className={cn("relative border border-foreground/15 bg-paper-deep overflow-hidden", className)} style={{ height }}>
      {/* topo background */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-30">
        <defs>
          <pattern id="cura-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#cura-grid)" />
        {/* faux contour lines */}
        {[15, 30, 50, 70, 85].map((r) => (
          <circle key={r} cx="48" cy="55" r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.2" opacity="0.5" />
        ))}
        {/* coastline gesture */}
        <path d="M 0 78 Q 20 70, 35 76 T 70 80 T 100 74" fill="none" stroke="hsl(var(--sky))" strokeWidth="0.6" opacity="0.7" />
        <path d="M 0 82 Q 25 76, 40 82 T 100 80" fill="none" stroke="hsl(var(--sky))" strokeWidth="0.4" opacity="0.5" />
      </svg>

      {/* route line */}
      {connect && points.length > 1 && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d={path} fill="none" stroke="hsl(var(--ink))" strokeWidth="0.4" strokeDasharray="1.2 1.2" />
        </svg>
      )}

      {/* points */}
      {points.map((p, i) => {
        const fill = variantFill[p.variant ?? "primary"];
        return (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div
              className="h-6 w-6 flex items-center justify-center text-[10px] font-serif text-ink-foreground border border-foreground"
              style={{ background: fill }}
            >
              {p.number ?? i + 1}
            </div>
            {p.label && (
              <div className="text-[9px] tracking-[0.14em] uppercase bg-background/85 px-1 leading-none py-0.5 max-w-[90px] text-center">
                {p.label}
              </div>
            )}
          </div>
        );
      })}

      {/* edge frame */}
      <div className="absolute inset-0 pointer-events-none border border-foreground/10" />

      {/* caption */}
      {caption && (
        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] tracking-[0.18em] uppercase text-muted-foreground bg-background/70 px-2 py-1">
          <span>{caption}</span>
          <span>N ↑</span>
        </div>
      )}
    </div>
  );
};
