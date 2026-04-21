import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  number: string; // e.g. "01"
  title: string;
  subhead: string;
  opening: string;
  children: React.ReactNode;
  /** Optional larger opening size (e.g. screen 7) */
  openingSize?: number;
}

/**
 * Shared chapter shell:
 * - Ink black header (back arrow → /profile, eyebrow "NN · YOU", Playfair title, subhead)
 * - Type B CURA opening: large italic on ivory bg, hairline below
 */
export const ChapterShell = ({ number, title, subhead, opening, openingSize = 22, children }: Props) => {
  return (
    <main className="app-shell pb-32">
      <header
        className="px-5 pt-5 pb-7"
        style={{ backgroundColor: "hsl(var(--ink))", color: "hsl(var(--ink-foreground))" }}
      >
        <Link
          to="/profile"
          aria-label="Back"
          className="inline-flex items-center -ml-1 p-1 hover:opacity-70"
          style={{ color: "hsl(var(--ink-foreground))" }}
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
        </Link>
        <div
          className="mt-5 text-[10px] tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--ink-foreground) / 0.55)" }}
        >
          {number} · You
        </div>
        <h1
          className="font-serif leading-[0.98] tracking-tight mt-2"
          style={{ fontSize: "32px" }}
        >
          {title}
        </h1>
        <p
          className="mt-3 leading-snug"
          style={{ fontSize: "11px", color: "hsl(var(--ink-foreground) / 0.4)" }}
        >
          {subhead}
        </p>
      </header>

      {/* Type B CURA opening — large italic on ivory, hairline below */}
      <section
        className="px-5 pt-7 pb-7"
        style={{ backgroundColor: "hsl(var(--bone))" }}
      >
        <p
          className="italic-serif leading-snug"
          style={{
            fontSize: `${openingSize}px`,
            color: "hsl(var(--foreground) / 0.85)",
          }}
        >
          {opening}
        </p>
      </section>
      <div style={{ height: "0.5px", backgroundColor: "hsl(var(--foreground) / 0.1)" }} />

      <div className="px-5 pt-7">{children}</div>
    </main>
  );
};
