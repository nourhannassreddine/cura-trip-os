import { useId } from "react";
import { worldCities } from "@/data/locations";

/* ------------------------------------------------------------------
   CityInput — open-ended city field with a worldwide datalist of
   hints. Free text always allowed (so trains, small towns, anywhere
   work). Same look as the rest of CURA: serif, thin underline.
------------------------------------------------------------------ */

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function CityInput({ value, onChange, placeholder = "Type a city. Anywhere." }: Props) {
  const id = useId();
  return (
    <>
      <input
        type="text"
        list={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none font-serif text-lg py-2 placeholder:text-muted-foreground/60"
      />
      <datalist id={id}>
        {worldCities.map((c) => <option key={c} value={c} />)}
      </datalist>
    </>
  );
}
