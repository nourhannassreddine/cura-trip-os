import { cn } from "@/lib/utils";

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Full-width ink save button. Zero radius. Ivory text.
 * Sits at the bottom of every chapter screen above the page padding.
 */
export const SaveButton = ({ onClick, children = "Save", className }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full bg-ink text-ink-foreground py-4 mt-10 font-serif text-[15px] tracking-wide hover:opacity-90 transition-opacity",
        className
      )}
      style={{ borderRadius: 0 }}
    >
      {children}
    </button>
  );
};
