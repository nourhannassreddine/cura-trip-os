import { Link, useLocation } from "react-router-dom";
import { Compass, Home as HomeIcon, Plane, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", label: "Home", icon: HomeIcon },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/trip/puglia-25", label: "Trip", icon: Plane },
  { to: "/journal", label: "Journal", icon: BookOpen },
  { to: "/profile", label: "You", icon: User },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 border-t border-foreground/15 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/home" ? pathname === "/" || pathname.startsWith("/home") : pathname.startsWith(to);
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
