import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "inline" | "block";
  className?: string;
}

/**
 * CURA AI's voice on the page — quiet, observant.
 * Not a chat bubble. Looks like a margin note from an editor.
 */
export const CuraWhisper = ({ children, variant = "block", className }: Props) => {
  if (variant === "inline") {
    return (
      <p className={cn("italic-serif text-sm text-foreground/70 flex gap-2 items-start", className)}>
        <Sparkles className="h-3.5 w-3.5 mt-1 text-primary cura-pulse shrink-0" strokeWidth={1.5} />
        <span>{children}</span>
      </p>
    );
  }
  return (
    <div className={cn("relative border-l-2 border-primary pl-4 py-1", className)}>
      <div className="editorial-eyebrow text-primary mb-1 flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 cura-pulse" strokeWidth={1.5} />
        Cura
      </div>
      <p className="italic-serif text-[15px] leading-snug text-foreground/85">{children}</p>
    </div>
  );
};
