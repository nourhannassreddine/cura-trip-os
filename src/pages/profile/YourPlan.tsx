import { ChapterShell } from "@/components/profile/ChapterShell";

const YourPlan = () => {
  return (
    <ChapterShell
      number="08"
      title="Your plan"
      subhead="How you access Cura."
      opening="Your access. Simple."
    >
      <article
        className="px-6 py-7"
        style={{ backgroundColor: "#EFE9DF" }}
      >
        <h2 className="font-serif" style={{ fontSize: "28px", color: "hsl(var(--foreground))", lineHeight: 1 }}>
          cura
        </h2>
        <div
          className="font-sans uppercase mt-2"
          style={{ fontSize: "9px", letterSpacing: "0.22em", color: "hsl(var(--accent-olive))", fontWeight: 500 }}
        >
          Active
        </div>

        <div className="my-5" style={{ height: "0.5px", backgroundColor: "hsl(var(--foreground) / 0.15)" }} />

        <p
          className="italic-serif"
          style={{ fontSize: "14px", color: "hsl(var(--foreground) / 0.4)", lineHeight: 1.55 }}
        >
          Billing, tiers, and access details coming soon.
        </p>
      </article>
    </ChapterShell>
  );
};

export default YourPlan;
