import { Link, useLocation } from "react-router-dom";
import { Dot, Compass, Layers, Asterisk, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CURA bottom nav — 5 tabs on ink black.
 * Active state is a pure color shift to ivory; no pill, no border, no shadow.
 * Container has zero radius. Height ~64px including iOS safe-area inset.
 */
const items = [
  {
    to: "/home",
    label: "Home",
    Icon: Dot,
    match: (p: string) => p === "/" || p.startsWith("/home"),
  },
  {
    to: "/begin",
    label: "Dream",
    Icon: Compass,
    match: (p: string) =>
      p.startsWith("/begin") ||
      p.startsWith("/onboarding") ||
      p.startsWith("/dream") ||
      p.startsWith("/discover") ||
      p.startsWith("/compare"),
  },
  {
    to: "/trips",
    label: "Trips",
    Icon: Layers,
    match: (p: string) => p.startsWith("/trips") || p.startsWith("/trip/"),
  },
  {
    to: "/cura",
    label: "Cura",
    Icon: Asterisk,
    match: (p: string) => p.startsWith("/cura"),
  },
  {
    to: "/profile",
    label: "You",
    Icon: Circle,
    match: (p: string) => p.startsWith("/profile"),
  },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <nav
      className="sticky bottom-0 left-0 right-0 z-40 bg-ink text-ink-foreground"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <ul className="grid grid-cols-5 h-16">
        {items.map(({ to, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={to} className="flex">
              <Link
                to={to}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-1.5 transition-colors",
                  active ? "text-ink-foreground" : "text-ink-foreground/40 hover:text-ink-foreground/70"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-[9px] tracking-[0.08em] uppercase">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
