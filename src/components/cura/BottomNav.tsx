import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * CURA bottom nav — olive background with custom hand-drawn-feeling icons.
 */

type IconProps = { className?: string };

const HorizonIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <circle cx="12" cy="10" r="2.4" />
    <line x1="3" y1="16" x2="21" y2="16" />
  </svg>
);

const EyeLashIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {/* almond eye */}
    <path d="M3 13c2.5 -4 6 -6 9 -6s6.5 2 9 6c-2.5 4 -6 6 -9 6s-6.5 -2 -9 -6z" />
    {/* lashes radiating from upper lid */}
    <line x1="7" y1="7.6" x2="6" y2="5.4" />
    <line x1="9.6" y1="6.6" x2="9" y2="4.2" />
    <line x1="12" y1="6.2" x2="12" y2="3.8" />
    <line x1="14.4" y1="6.6" x2="15" y2="4.2" />
    <line x1="16.8" y1="7.6" x2="18" y2="5.4" />
  </svg>
);

const SuitcaseIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {/* handle */}
    <path d="M9.5 6.5v-1a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v1" />
    {/* case */}
    <rect x="4" y="6.5" width="16" height="13" rx="2" />
    {/* clasp */}
    <line x1="4" y1="13" x2="20" y2="13" />
  </svg>
);

const SparkIcon = ({ className }: IconProps) => (
  <span
    className={cn("inline-flex items-center justify-center", className)}
    style={{ fontSize: "18px", lineHeight: 1 }}
    aria-hidden
  >
    ✦
  </span>
);

const MirrorIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {/* mirror head */}
    <circle cx="12" cy="9.5" r="5.5" />
    {/* subtle reflective oval inside */}
    <ellipse cx="10.5" cy="8" rx="1.4" ry="0.7" opacity="0.55" />
    {/* tapered handle */}
    <path d="M11.2 15 L10.6 21 L13.4 21 L12.8 15" />
  </svg>
);

const items = [
  {
    to: "/home",
    label: "Home",
    Icon: HorizonIcon,
    match: (p: string) => p === "/" || p.startsWith("/home"),
  },
  {
    to: "/begin",
    label: "Dream",
    Icon: EyeLashIcon,
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
    Icon: SuitcaseIcon,
    match: (p: string) => p.startsWith("/trips") || p.startsWith("/trip/"),
  },
  {
    to: "/cura",
    label: "Cura",
    Icon: SparkIcon,
    match: (p: string) => p.startsWith("/cura"),
  },
  {
    to: "/profile",
    label: "You",
    Icon: MirrorIcon,
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
        background: "#717744",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.15)",
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
                <Icon className="h-5 w-5" />
                <span
                  className="text-[9px] tracking-[0.08em] uppercase"
                  style={{ opacity: active ? 1 : 0.45 }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
