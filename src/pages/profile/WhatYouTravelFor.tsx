import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterShell } from "@/components/profile/ChapterShell";
import { SelectChip } from "@/components/profile/SelectChip";
import { SaveButton } from "@/components/profile/SaveButton";
import { CuraNoteA } from "@/components/profile/CuraNoteA";
import { useProfileData } from "@/lib/profileData";
import { toast } from "sonner";

const MOODS: { label: string; hint: string }[] = [
  { label: "Slow & sun-faded", hint: "Long lunches, no schedule" },
  { label: "Design-forward", hint: "Neighborhoods, not landmarks" },
  { label: "A little wild", hint: "Say yes more often" },
  { label: "Refined & quiet", hint: "Fewer, better choices" },
  { label: "For making things", hint: "Shoot, write, walk" },
  { label: "Loud, with people", hint: "Music, late dinners" },
  { label: "Alone, on purpose", hint: "I came here to think" },
  { label: "Something larger than me", hint: "Ritual, silence, distance" },
  { label: "Quiet luxury", hint: "Soft sheets, hard to find" },
  { label: "Glamorous & lazy", hint: "Slow pace, high taste" },
  { label: "Girls trip", hint: "Loud table, photo spots" },
  { label: "Hideaway", hint: "No signal, no calendar" },
];

const WhatYouTravelFor = () => {
  const navigate = useNavigate();
  const [data, save] = useProfileData();
  const [moods, setMoods] = useState<string[]>(data.moods);

  useEffect(() => setMoods(data.moods), [data.moods]);

  const toggle = (m: string) =>
    setMoods((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));

  const handleSave = () => {
    save({ moods });
    toast.success("Saved");
    navigate("/profile");
  };

  return (
    <ChapterShell
      number="02"
      title="What you travel for"
      subhead="The moods and feelings that shape where you go."
      opening="The feeling you're chasing. I watch for it."
    >
      <div className="space-y-2">
        {MOODS.map((m) => (
          <SelectChip
            key={m.label}
            label={m.label}
            hint={m.hint}
            selected={moods.includes(m.label)}
            onClick={() => toggle(m.label)}
          />
        ))}
      </div>

      <CuraNoteA>
        These shape every itinerary I build for you. Change them anytime — I'll adjust.
      </CuraNoteA>

      <SaveButton onClick={handleSave} />
    </ChapterShell>
  );
};

export default WhatYouTravelFor;
