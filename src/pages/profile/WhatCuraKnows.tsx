import { useNavigate } from "react-router-dom";
import { ChapterShell } from "@/components/profile/ChapterShell";

const observations: { eyebrow: string; body: string }[] = [
  { eyebrow: "Pace", body: "You prefer one thing a day, done properly." },
  { eyebrow: "Mornings", body: "You start late. The trip adjusts." },
  { eyebrow: "Food", body: "Every meal is the plan. Not a side note." },
  { eyebrow: "Spending", body: "You spend where it shows. Lunch can be simple." },
  { eyebrow: "Outfits", body: "You plan what you wear. It matters to the trip." },
  { eyebrow: "Energy", body: "You need a rest day mid-trip. Usually day 3 or 4." },
  { eyebrow: "Places", body: "You prefer somewhere that feels like somewhere." },
];

const WhatCuraKnows = () => {
  const navigate = useNavigate();

  const correctMe = () => {
    const prompt = "I want to correct something in my profile.";
    navigate(`/cura?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <ChapterShell
      number="07"
      title="What Cura knows"
      subhead="A read of you, based on everything so far."
      opening="This is my read of you. Not a profile. A portrait."
      openingSize={20}
    >
      <ul className="space-y-7">
        {observations.map((o) => (
          <li key={o.eyebrow}>
            <div
              className="font-sans uppercase"
              style={{ fontSize: "8px", letterSpacing: "0.24em", color: "hsl(var(--foreground) / 0.35)" }}
            >
              {o.eyebrow}
            </div>
            <p
              className="italic-serif mt-2"
              style={{ fontSize: "16px", color: "hsl(var(--foreground))", lineHeight: 1.6 }}
            >
              {o.body}
            </p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={correctMe}
        className="mt-12 mb-4 mx-auto flex flex-col items-center hover:opacity-70 transition-opacity"
      >
        <span style={{ fontSize: "14px", color: "hsl(var(--foreground))", lineHeight: 1 }}>✦</span>
        <span
          className="font-sans uppercase mt-2"
          style={{ fontSize: "9px", letterSpacing: "0.24em", color: "hsl(var(--foreground) / 0.35)" }}
        >
          Tell me where I'm wrong
        </span>
      </button>
    </ChapterShell>
  );
};

export default WhatCuraKnows;
