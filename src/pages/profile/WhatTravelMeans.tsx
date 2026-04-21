import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChapterShell } from "@/components/profile/ChapterShell";
import { SelectChip } from "@/components/profile/SelectChip";
import { SaveButton } from "@/components/profile/SaveButton";
import { CuraNoteA } from "@/components/profile/CuraNoteA";
import { useProfileData } from "@/lib/profileData";
import { toast } from "sonner";

const PURPOSE: { label: string; hint: string }[] = [
  { label: "A reset", hint: "I need the noise turned down" },
  { label: "A celebration", hint: "Birthday, anniversary, milestone" },
  { label: "A honeymoon", hint: "The first trip as us" },
  { label: "A last quiet trip", hint: "Before the baby, before the change" },
  { label: "Work, with edges", hint: "The meeting is real, the rest is mine" },
  { label: "A creative project", hint: "Shoot, write, research, make" },
  { label: "A reunion", hint: "People I don't see enough" },
  { label: "Someone's wedding", hint: "I'm a guest, not the planner" },
  { label: "Quiet, after something hard", hint: "I need a place to be still" },
  { label: "A solo milestone", hint: "The trip I promised myself" },
  { label: "Family time, the good kind", hint: "Everyone, in one place, slowly" },
  { label: "No reason. I just want to go", hint: "The urge is the reason" },
];

const WhatTravelMeans = () => {
  const navigate = useNavigate();
  const [data, save] = useProfileData();
  const [purpose, setPurpose] = useState<string[]>(data.purpose);

  useEffect(() => setPurpose(data.purpose), [data.purpose]);

  const toggle = (m: string) =>
    setPurpose((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));

  const handleSave = () => {
    save({ purpose });
    toast.success("Saved");
    navigate("/profile");
  };

  return (
    <ChapterShell
      number="03"
      title="What travel means to you"
      subhead="The reason underneath every trip."
      opening="Not where you go. Why you go at all."
    >
      <div className="space-y-2">
        {PURPOSE.map((m) => (
          <SelectChip
            key={m.label}
            label={m.label}
            hint={m.hint}
            selected={purpose.includes(m.label)}
            onClick={() => toggle(m.label)}
          />
        ))}
      </div>

      <CuraNoteA>
        The reason shapes the pace. A reset trip and a celebration trip are different animals.
      </CuraNoteA>

      <SaveButton onClick={handleSave} />
    </ChapterShell>
  );
};

export default WhatTravelMeans;
