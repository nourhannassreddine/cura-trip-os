interface Props {
  children: React.ReactNode;
  /** Override accent border color. Defaults to ochre. */
  accent?: string;
}

/**
 * Type A CURA insight — linen background, ochre left border, Playfair italic.
 * Used inline beneath fields to comment on the user's selection.
 */
export const CuraNoteA = ({ children, accent = "hsl(var(--accent-ochre))" }: Props) => {
  return (
    <div
      className="px-4 py-4 mt-6"
      style={{
        backgroundColor: "hsl(var(--paper-soft))",
        borderLeft: `2px solid ${accent}`,
      }}
    >
      <div
        className="editorial-eyebrow mb-1.5"
        style={{ color: accent, fontSize: "9px" }}
      >
        Cura
      </div>
      <p
        className="italic-serif leading-snug"
        style={{ fontSize: "14px", color: "hsl(var(--foreground) / 0.85)" }}
      >
        {children}
      </p>
    </div>
  );
};
