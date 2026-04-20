import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import surreal1 from "@/assets/welcome-surreal.jpg";
import surreal2 from "@/assets/welcome-surreal-2.jpg";
import surreal3 from "@/assets/welcome-surreal-3.jpg";
import surreal4 from "@/assets/welcome-surreal-4.jpg";
import surreal5 from "@/assets/welcome-surreal-5.jpg";

/* ------------------------------------------------------------------
   Welcome - Plate I.
   Hero is now a slow Jacquemus-style carousel of 5 surreal frames.
   Crossfades every ~5s. The first frame is eager-loaded for LCP.
   Everything below the image shares the same px-5 rhythm so logo,
   caption, headline, CTAs and footer all line up to one column.
------------------------------------------------------------------ */

const frames = [
  { src: surreal1, alt: "An oversized white scallop shell on wet pastel sand at the edge of a calm sea, a small figure in white linen walking the shoreline at golden hour" },
  { src: surreal2, alt: "A giant sun-bleached lemon resting on wet pink sand by a turquoise sea, a tiny figure in white linen walking past for scale" },
  { src: surreal3, alt: "A colossal straw hat floating on a still milky-blue sea, a small figure in cream linen swimming toward it" },
  { src: surreal4, alt: "A towering terracotta jug standing alone on warm ochre sand at golden hour, a barefoot figure in white linen walking past" },
  { src: surreal5, alt: "An enormous ripe peach resting on cool morning sand by a pale blue sea, a small figure in pink linen sitting beside it" },
];

const Welcome = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="app-shell relative grain overflow-hidden flex flex-col">
      {/* Hero carousel - bleeds the full width, sits inside a fixed 44dvh frame */}
      <div className="relative h-[44dvh] w-full overflow-hidden shrink-0 bg-paper-deep">
        {frames.map((f, idx) => (
          <img
            key={idx}
            src={f.src}
            alt={f.alt}
            loading={idx === 0 ? "eager" : "lazy"}
            width={832}
            height={1216}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Logo - 8px from the safe edge, lowercase Playfair */}
        <div className="absolute top-2 left-2 p-2">
          <div className="font-serif lowercase text-2xl leading-none tracking-tight text-foreground/85 mix-blend-multiply">
            cura
          </div>
        </div>
      </div>

      {/* Everything below the image shares the same px-5 rhythm */}
      <div className="flex-1 flex flex-col px-5">
        {/* Caption sits cleanly under the image, aligned to the same gutter */}
        <div className="pt-4 cura-rise">
          <div className="editorial-eyebrow text-muted-foreground">Plate I · A note before you begin</div>
          <div className="h-px w-8 bg-foreground/40 my-1.5" />
          <p className="italic-serif text-[13px] leading-tight text-foreground/75">
            "The trip starts long before the airport."
          </p>
        </div>

        <section className="pt-5">
          <div className="editorial-eyebrow text-primary mb-2">A travel operating system</div>
          <h1 className="display-md leading-[0.95]">
            Other apps build<br />
            <span className="italic-serif">itineraries.</span><br />
            I build the version<br />
            of you that<br />
            <span className="italic-serif">comes home.</span>
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-foreground/70 max-w-[34ch]">
            CURA studies how you move and quietly steers you toward the trip you didn't know you wanted.
          </p>
        </section>

        <section className="mt-auto pt-5">
          <Link
            to="/begin"
            className="group flex items-center justify-between border border-foreground bg-ink text-ink-foreground px-5 py-3.5"
          >
            <span className="font-sans text-sm tracking-wide">Begin</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
          <div className="mt-2.5 text-center">
            <Link
              to="/home"
              className="font-serif italic text-[13px] text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              I already have an account
            </Link>
          </div>
        </section>

        <footer className="pt-3 pb-3 flex justify-between text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
          <span>№ 001</span>
          <span>Vol. I · Spring</span>
        </footer>
      </div>
    </main>
  );
};

export default Welcome;
