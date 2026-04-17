import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "default" | "olive" | "sky" | "ink" | "outline";
  className?: string;
}

export const Tag = ({ children, variant = "default", className }: Props) => {
  const styles = {
    default: "bg-primary-soft text-foreground",
    olive: "bg-olive-soft text-foreground",
    sky: "bg-sky-soft text-foreground",
    ink: "bg-ink text-ink-foreground",
    outline: "border border-foreground/25 text-foreground",
  }[variant];
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 text-[10px] tracking-[0.16em] uppercase", styles, className)}>
      {children}
    </span>
  );
};
