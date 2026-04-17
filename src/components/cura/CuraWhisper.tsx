import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "inline" | "block" | "opinion";
  className?: string;
  /** When true, signals this is an opinionated take, not a suggestion. */
  certainty?: "thinking" | "sure" | "would-bet";
}

/**
 * CURA's voice on the page — observant, opinionated, never chatty.
 * Three variants:
 *   - block   : default editor's margin note
 *   - inline  : compact one-liner inside other content
 *   - opinion : a confident take ("I'd bet on this")
 */
export const CuraWhisper = ({ children, variant = "block", className, certainty }: Props) => {
  if (variant === "inline") {
    return (
      <p className={cn("italic-serif text-sm text-foreground/70 flex gap-2 items-start", className)}>
        <Sparkles className="h-3.5 w-3.5 mt-1 text-primary cura-pulse shrink-0" strokeWidth={1.5} />
        <span>{children}</span>
      </p>
    );
  }

  if (variant === "opinion") {
    return (
      <div className={cn("relative bg-ink text-ink-foreground p-4", className)}>
        <div className="editorial-eyebrow mb-2 flex items-center gap-1.5 opacity-80">
          <Sparkles className="h-3 w-3 cura-pulse" strokeWidth={1.5} />
          Cura · {certainty ?? "sure"}
        </div>
        <p className="font-serif text-[17px] leading-snug">{children}</p>
      </div>
    );
  }

  return (
    <div className={cn("relative border-l-2 border-primary pl-4 py-1", className)}>
      <div className="editorial-eyebrow text-primary mb-1 flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 cura-pulse" strokeWidth={1.5} />
        Cura{certainty ? ` · ${certainty}` : ""}
      </div>
      <p className="italic-serif text-[15px] leading-snug text-foreground/85">{children}</p>
    </div>
  );
};
