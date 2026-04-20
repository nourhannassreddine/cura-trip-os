/* ------------------------------------------------------------------
   CityInput — fully open-ended city/place text field. No dropdown,
   no list. The user can type any city, region, country, or place
   name in the world. We resolve it later, downstream.
------------------------------------------------------------------ */

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function CityInput({ value, onChange, placeholder = "Type a place. Anywhere." }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
      className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-lg py-2 placeholder:text-muted-foreground/60"
    />
  );
}
