import { Link, useLocation } from "react-router-dom";
import { Compass, Home as HomeIcon, Plane, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", label: "Home", icon: HomeIcon, match: (p: string) => p === "/" || p.startsWith("/home") },
  { to: "/dream", label: "Dream", icon: Compass, match: (p: string) => p.startsWith("/dream") || p.startsWith("/discover") || p.startsWith("/compare") },
  { to: "/trips", label: "Trips", icon: Plane, match: (p: string) => p.startsWith("/trips") || p.startsWith("/trip/") },
  { to: "/journal", label: "Journal", icon: BookOpen, match: (p: string) => p.startsWith("/journal") },
  { to: "/profile", label: "You", icon: User, match: (p: string) => p.startsWith("/profile") },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 border-t border-foreground/15 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] tracking-[0.18em] uppercase transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
