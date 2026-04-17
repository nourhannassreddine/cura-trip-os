import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  tripId: string;
}

const tabs = [
  { key: "overview", label: "Overview", to: (id: string) => `/trip/${id}` },
  { key: "itinerary", label: "Itinerary", to: (_: string) => `/itinerary` },
  { key: "plan", label: "Plan", to: (_: string) => `/route` },
  { key: "pack", label: "Pack", to: (_: string) => `/pack` },
  { key: "spend", label: "Spend", to: (_: string) => `/spend` },
  { key: "live", label: "Live", to: (_: string) => `/during` },
  { key: "journal", label: "Journal", to: (_: string) => `/journal` },
];

/**
 * Internal navigation inside a trip workspace.
 * Sits under the TopBar. The bottom global nav stays the same.
 */
export const TripTabs = ({ tripId }: Props) => {
  const { pathname } = useLocation();

  const isActive = (key: string) => {
    if (key === "overview") return pathname === `/trip/${tripId}`;
    if (key === "itinerary") return pathname.startsWith("/itinerary");
    if (key === "plan") return pathname.startsWith("/route") || pathname.startsWith("/visa");
    if (key === "pack") return pathname.startsWith("/pack") || pathname.startsWith("/outfits");
    if (key === "spend") return pathname.startsWith("/spend");
    if (key === "live") return pathname.startsWith("/during");
    if (key === "journal") return pathname.startsWith("/journal");
    return false;
  };

  return (
    <nav className="border-y border-foreground/15 bg-background sticky top-0 z-30">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((t) => {
          const active = isActive(t.key);
          return (
            <Link
              key={t.key}
              to={t.to(tripId)}
              className={cn(
                "shrink-0 px-4 py-3 text-[11px] tracking-[0.18em] uppercase border-r border-foreground/10 last:border-0 transition-colors",
                active ? "text-foreground bg-paper-deep" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              {active && <span className="ml-1.5 inline-block h-1 w-1 bg-primary align-middle" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
