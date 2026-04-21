import { cn } from "@/lib/utils";

interface Props {
  label: string;
  hint?: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * Editorial select chip — used for single + multi select fields.
 * Selected = ink fill, ivory text. Idle = paper border, ink text.
 * Zero radius, generous padding, label can wrap to two lines with optional hint.
 */
export const SelectChip = ({ label, hint, selected, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "text-left w-full transition-colors",
        "px-4 py-3.5",
        "border",
        selected
          ? "bg-ink text-ink-foreground border-ink"
          : "bg-transparent text-foreground border-foreground/15 hover:border-foreground/35"
      )}
      style={{ borderRadius: 0 }}
    >
      <div className="font-serif" style={{ fontSize: "15px", lineHeight: 1.25 }}>
        {label}
      </div>
      {hint && (
        <div
          className="mt-1"
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: selected ? 0.6 : 0.45,
          }}
        >
          {hint}
        </div>
      )}
    </button>
  );
};
