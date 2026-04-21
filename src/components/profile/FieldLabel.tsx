interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Inter, 9px, uppercase, tracked, ink at 55% — the section label across chapter screens.
 */
export const FieldLabel = ({ children, className = "" }: Props) => (
  <div
    className={`font-sans uppercase ${className}`}
    style={{
      fontSize: "9px",
      letterSpacing: "0.22em",
      color: "hsl(var(--foreground) / 0.55)",
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);
