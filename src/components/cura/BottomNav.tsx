import { Link, useLocation } from "react-router-dom";
import { Dot, Compass, Layers, Asterisk, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CURA bottom nav — translucent aqua glass.
 * Backdrop blurred, ivory icons + labels, small ivory dot above active label.
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
    Icon: User,
    match: (p: string) => p.startsWith("/profile"),
  },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <nav
      className="sticky bottom-0 left-0 right-0 z-40"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        background: "#4FB6C8",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "0.5px solid rgba(79,182,200,0.4)",
      }}
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
                  "flex-1 flex flex-col items-center justify-center gap-1 transition-opacity relative"
                )}
                style={{ color: "#F5F0E8" }}
                aria-current={active ? "page" : undefined}
              >
                {/* active indicator dot */}
                {active && (
                  <span
                    aria-hidden
                    className="absolute"
                    style={{
                      top: "6px",
                      width: "3px",
                      height: "3px",
                      borderRadius: "99px",
                      background: "#F5F0E8",
                    }}
                  />
                )}
                <Icon className="h-5 w-5" strokeWidth={1.5} style={{ opacity: 0.9 }} />
                <span className="text-[9px] tracking-[0.08em] uppercase" style={{ opacity: active ? 1 : 0.55 }}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
