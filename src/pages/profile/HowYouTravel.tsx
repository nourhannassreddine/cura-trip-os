import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterShell } from "@/components/profile/ChapterShell";
import { SelectChip } from "@/components/profile/SelectChip";
import { SaveButton } from "@/components/profile/SaveButton";
import { FieldLabel } from "@/components/profile/FieldLabel";
import { useProfileData, type HowYouTravel as HowType } from "@/lib/profileData";
import { toast } from "sonner";

const PACE = [
  "One thing a day, done properly",
  "Packed. I'll rest at home.",
  "Somewhere in between",
];

const WITH = [
  "Just me",
  "The two of us",
  "A group I love",
  "Family — the full chaos",
  "It depends on the trip",
];

const SLEEP = [
  "A hotel with a good bed",
  "A villa or something with a kitchen",
  "Whatever makes sense for the trip",
  "It has to feel like somewhere, not anywhere",
];

const SPEND = [
  "I start at the top and work down",
  "I spend where it shows",
  "I spend where no one sees",
  "Money for experiences, not objects",
  "Thrifty, then occasionally absurd",
];

const MORNINGS = [
  "Early. The city before everyone else.",
  "Late. The trip can wait an hour.",
  "Depends on what the day needs",
];

const FOOD = [
  "Adventurous. I'll try anything once.",
  "I have my preferences and I keep them",
  "Dietary restrictions shape the trip",
  "Every meal is the plan",
];

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="mt-8">
    <FieldLabel>{label}</FieldLabel>
    <div className="mt-3 space-y-2">{children}</div>
  </section>
);

const HowYouTravel = () => {
  const navigate = useNavigate();
  const [data, save] = useProfileData();
  const [local, setLocal] = useState<HowType>(data.how);

  useEffect(() => setLocal(data.how), [data.how]);

  const set = <K extends keyof HowType>(k: K, v: HowType[K]) => setLocal((p) => ({ ...p, [k]: v }));
  const toggle = (key: keyof HowType, val: string) => {
    const arr = (local[key] as string[]) ?? [];
    set(key, (arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]) as HowType[typeof key]);
  };

  const handleSave = () => {
    save({ how: local });
    toast.success("Saved");
    navigate("/profile");
  };

  return (
    <ChapterShell
      number="01"
      title="How you travel"
      subhead="The pace, the people, the non-negotiables."
      opening="You told me how you move. I've held onto it."
    >
      <Field label="Your pace">
        {PACE.map((o) => (
          <SelectChip key={o} label={o} selected={local.pace === o} onClick={() => set("pace", local.pace === o ? null : o)} />
        ))}
      </Field>

      <Field label="You travel with">
        {WITH.map((o) => (
          <SelectChip key={o} label={o} selected={local.with.includes(o)} onClick={() => toggle("with", o)} />
        ))}
      </Field>

      <Field label="Where you sleep">
        {SLEEP.map((o) => (
          <SelectChip key={o} label={o} selected={local.sleep === o} onClick={() => set("sleep", local.sleep === o ? null : o)} />
        ))}
      </Field>

      <Field label="How you spend">
        {SPEND.map((o) => (
          <SelectChip key={o} label={o} selected={local.spend === o} onClick={() => set("spend", local.spend === o ? null : o)} />
        ))}
      </Field>

      <Field label="Your mornings">
        {MORNINGS.map((o) => (
          <SelectChip key={o} label={o} selected={local.mornings === o} onClick={() => set("mornings", local.mornings === o ? null : o)} />
        ))}
      </Field>

      <Field label="How you eat">
        {FOOD.map((o) => (
          <SelectChip key={o} label={o} selected={local.food === o} onClick={() => set("food", local.food === o ? null : o)} />
        ))}
      </Field>

      <SaveButton onClick={handleSave} />
    </ChapterShell>
  );
};

export default HowYouTravel;
