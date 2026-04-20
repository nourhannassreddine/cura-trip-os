import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   SearchableSelect — editorial dropdown with type-to-filter.
   Used for passport selection (large list) — keeps CURA's
   minimal aesthetic: thin underline, serif value, no rounded chrome.
------------------------------------------------------------------ */

interface Props {
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
  placeholder?: string;
  label?: string;
}

export function SearchableSelect({ options, value, onChange, placeholder = "Search…", label }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((o) => o.toLowerCase().includes(needle));
  }, [q, options]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between border-b border-foreground/30 hover:border-foreground/60 py-2 text-left transition-colors"
      >
        <span className={cn("font-serif text-lg", value ? "text-foreground" : "text-muted-foreground/60")}>
          {value || label || placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-foreground/60 transition-transform", open && "rotate-180")} strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute z-30 left-0 right-0 mt-1 border border-foreground/20 bg-background shadow-lg">
          <div className="flex items-center gap-2 border-b border-foreground/15 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
            <input
              autoFocus
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-xs text-muted-foreground italic">No match. Type your own — I'll trust it.</li>
            )}
            {filtered.map((o) => {
              const on = o === value;
              return (
                <li key={o}>
                  <button
                    type="button"
                    onClick={() => { onChange(o); setOpen(false); setQ(""); }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-foreground/[0.04] transition-colors",
                      on && "bg-foreground/[0.06]"
                    )}
                  >
                    <span className="font-serif">{o}</span>
                    {on && <Check className="h-3.5 w-3.5" strokeWidth={1.5} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
