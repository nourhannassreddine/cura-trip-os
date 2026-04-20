import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import surreal1 from "@/assets/welcome-surreal.jpg";
import surreal2 from "@/assets/welcome-surreal-2.jpg";
import surreal3 from "@/assets/welcome-surreal-3.jpg";
import surreal4 from "@/assets/welcome-surreal-4.jpg";
import surreal5 from "@/assets/welcome-surreal-5.jpg";
import surreal6 from "@/assets/welcome-surreal-6.jpg";
import surreal7 from "@/assets/welcome-surreal-7.jpg";
import surreal8 from "@/assets/welcome-surreal-8.jpg";
import surreal9 from "@/assets/welcome-surreal-9.jpg";
import surreal10 from "@/assets/welcome-surreal-10.jpg";

/* ------------------------------------------------------------------
   Welcome - Plate I.
   Hero: 10-frame surreal carousel, slow crossfade, story-like rhythm.
   Logo flips white over light/warm frames where black would lose
   legibility (the orange + pink lady frame in particular).
   Footer is treated as an editorial imprint, not a UI element.
------------------------------------------------------------------ */

type Frame = { src: string; alt: string; logoTone: "dark" | "light" };

const frames: Frame[] = [
  { src: surreal1, alt: "An enormous ripe peach the size of a small house in a field of pale lavender at golden hour, a tiny figure in pink linen walking toward it", logoTone: "dark" },
  { src: surreal2, alt: "An enormous low cumulus cloud hovering over a vast empty pale-green meadow at dusk, casting a soft round shadow on the grass, a tiny figure in a long red dress standing inside the shadow looking up", logoTone: "dark" },
  { src: surreal3, alt: "An oversized ripe orange resting in a quiet pastel olive grove, a small woman in a flowing yellow dress walking past for scale", logoTone: "light" },
  { src: surreal4, alt: "A giant pastel pink suitcase abandoned on a vast empty salt flat, a tiny figure in a wide straw hat sitting on top", logoTone: "dark" },
  { src: surreal5, alt: "An enormous white linen sheet draped over an invisible form on a warm pink stucco rooftop overlooking a sleepy Mediterranean village at dusk", logoTone: "dark" },
  { src: surreal6, alt: "A colossal pearlescent shellfish on wet reflective sand at a quiet pale-blue beach at dawn, a tiny figure in cream linen standing beside it", logoTone: "dark" },
  { src: surreal7, alt: "An enormous straw sun hat casting a perfect circular shadow on a sun-bleached pink stucco plaza, a tiny figure in a red dress standing inside the shadow", logoTone: "light" },
  { src: surreal8, alt: "An enormous antique brass pocket watch the size of a small car half-buried in soft pale pink desert sand at golden hour, a tiny figure in a flowing cream linen dress walking past it", logoTone: "light" },
  { src: surreal9, alt: "An oversized antique brass key the length of a bus laying flat on cracked white salt flats under a pale lavender sky", logoTone: "dark" },
  { src: surreal10, alt: "A massive blank folded paper map standing upright like a sail on a calm green hillside at dusk, a tiny figure in a white shirt looking up at it", logoTone: "dark" },
];

const Welcome = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), 6000);
    return () => clearInterval(id);
  }, []);

  const currentTone = frames[i].logoTone;

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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[3200ms] ease-in-out ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Logo - 8px from the safe edge, lowercase Playfair, tone flips per frame */}
        <div className="absolute top-2 left-2 p-2">
          <div
            className={`font-serif lowercase text-2xl leading-none tracking-tight transition-colors duration-[1600ms] ${
              currentTone === "light"
                ? "text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                : "text-foreground/85 mix-blend-multiply"
            }`}
          >
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
            "Travel, with judgment."
          </p>
        </div>

        <section className="pt-5">
          <div className="editorial-eyebrow text-primary mb-2">A travel operating system</div>
          <h1 className="display-md leading-[0.95]">
            A system <span className="italic-serif">with taste.</span><br />
            And <span className="italic-serif">opinions.</span>
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-foreground/70 max-w-[34ch]">
            Cura plans the trip you would have chosen, if you had the time to choose properly.
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

        {/* Editorial imprint - printed, not interactive. A whisper at the foot of the page. */}
        <footer
          aria-label="Edition imprint"
          className="pt-3 pb-3 flex justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/35 select-none"
        >
          <span>No. 001</span>
          <span>Vol. I · Spring</span>
        </footer>
      </div>
    </main>
  );
};

export default Welcome;
