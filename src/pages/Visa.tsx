import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { Tag } from "@/components/cura/Tag";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { Check, FileText, ShieldCheck } from "lucide-react";

const docs = [
  { name: "Passport", status: "ok", note: "Valid until Mar 2031" },
  { name: "EU Health Card", status: "ok", note: "Auto-renewed" },
  { name: "Travel insurance", status: "todo", note: "CURA flagged · 14 days before" },
  { name: "Driver's license (international)", status: "todo", note: "Optional · only if renting" },
];

const timeline = [
  { when: "1 month before", items: ["Confirm hotel deposit", "Lock activities"] },
  { when: "2 weeks before", items: ["Insurance", "Currency swap", "Nail apt", "Wax apt"] },
  { when: "1 week before", items: ["Outfit edit", "Charger kit", "Pet sitter brief"] },
  { when: "Day before", items: ["Pack final", "Confirm driver", "Set OOO"] },
];

const Visa = () => {
  return (
    <main className="app-shell pb-20">
      <TopBar back="/trip/puglia-25" eyebrow="Visa & Prep" title="Italy · EU" />

      <section className="px-5 pt-2 cura-rise">
        <div className="editorial-eyebrow text-olive flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" /> Cleared</div>
        <h1 className="display-md mt-1 max-w-[16ch]">
          No visa needed for this passport.
        </h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-[34ch]">
          Schengen rules apply. You have <span className="text-foreground">62 days</span> remaining in your 180-day window.
        </p>
      </section>

      <section className="mt-7 px-5">
        <div className="editorial-eyebrow text-muted-foreground mb-2">Document vault</div>
        <ul className="border border-foreground/15">
          {docs.map((d, i) => (
            <li key={i} className="flex items-start gap-3 px-4 py-3 border-b border-foreground/10 last:border-0">
              <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="font-serif text-base leading-none">{d.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{d.note}</div>
              </div>
              {d.status === "ok" ? (
                <Tag variant="olive">ok</Tag>
              ) : (
                <Tag>todo</Tag>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-7 px-5">
        <CuraWhisper>
          Insurance is the only real to-do. I'll surface it again 14 days before you fly.
        </CuraWhisper>
      </section>

      <section className="mt-9 px-5">
        <h2 className="font-serif text-xl mb-3">Pre-trip timeline</h2>
        <ol className="space-y-4">
          {timeline.map((t, i) => (
            <li key={i} className="grid grid-cols-[110px_1fr] gap-3 border-t border-foreground/15 pt-3">
              <div className="editorial-eyebrow text-muted-foreground">{t.when}</div>
              <ul className="space-y-1.5">
                {t.items.map((x) => (
                  <li key={x} className="flex items-center gap-2 text-sm">
                    <span className="w-4 h-4 border border-foreground/40 inline-flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 opacity-0" />
                    </span>
                    <span className="font-serif">{x}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default Visa;
