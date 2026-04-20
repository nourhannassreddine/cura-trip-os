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

/* ------------------------------------------------------------------
   Welcome - Plate I.
   Hero: 10-frame surreal carousel, slow crossfade, story-like rhythm.
   Logo flips white over light/warm frames where black would lose
   legibility (the orange + pink lady frame in particular).
   Footer is treated as an editorial imprint, not a UI element.
------------------------------------------------------------------ */

type Frame = { src: string; alt: string; logoTone: "dark" | "light" };

/* 7 frames, one album. Jacquemus × Tim Walker × Slim Aarons — sun-faded, low
   saturation, single oversized object per frame. logoTone flips to "light"
   (white) on frames whose top-left is bright enough that black would be lost. */
const frames: Frame[] = [
  { src: surreal1, alt: "A colossal cream silk ribbon coiling slowly across pale dunes, one set of footprints leading into it", logoTone: "dark" },
  { src: surreal2, alt: "An enormous terracotta urn lying on its side in a quiet olive grove, light spilling out like water", logoTone: "dark" },
  { src: surreal3, alt: "A giant folded white linen napkin standing upright on a bare wooden table on a sunlit terrace, sea behind", logoTone: "dark" },
  { src: surreal4, alt: "A monumental matte-black rotary telephone half-buried in a pale rose desert, receiver slightly off the hook", logoTone: "light" },
  { src: surreal5, alt: "A vast pearl-grey storm cloud the size of a building, parked low over a quiet stone village square at midday", logoTone: "light" },
  { src: surreal6, alt: "A giant single brass key resting on still water in a flooded marble courtyard, soft reflections", logoTone: "dark" },
  { src: surreal7, alt: "A house-sized woven straw basket placed gently on a mountain road at golden hour, lavender hills behind", logoTone: "dark" },
];

/* Rotating editorial thought - chosen once per app open.
   These are observations, not motivation. CURA's voice. */
const thoughts: string[] = [
  "Most trips are decided before they are planned.",
  "The good ones happen on purpose.",
  "Taste is the part of you that does not need a reason.",
  "A trip is a sequence of small refusals.",
  "Where you go is rarely the question. How you go is.",
  "The interesting part of any city is what it asks of you.",
  "Itineraries are written. Trips are edited.",
];

const Welcome = () => {
  const [i, setI] = useState(0);
  // Pick a thought once per mount (i.e. per app open).
  const [thought] = useState(() => thoughts[Math.floor(Math.random() * thoughts.length)]);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), 6000);
    return () => clearInterval(id);
  }, []);

  const currentTone = frames[i].logoTone;

  return (
    <main className="app-shell relative grain overflow-hidden flex flex-col">
      {/* Hero carousel - locked 3:2 landscape banner. Images are composed for
          this exact ratio so object-cover never crops the subject. */}
      <div className="relative aspect-[3/2] w-full overflow-hidden shrink-0 bg-paper-deep">
        {frames.map((f, idx) => (
          <img
            key={idx}
            src={f.src}
            alt={idx === i ? f.alt : ""}
            aria-hidden={idx === i ? undefined : true}
            loading={idx === 0 ? "eager" : "lazy"}
            width={1536}
            height={1024}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[3200ms] ease-in-out ${
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
        {/* Caption sits cleanly under the image, aligned to the same gutter.
            Eyebrow is a fixed system label; the line below rotates per app open. */}
        <div className="pt-4 cura-rise">
          <div className="editorial-eyebrow text-muted-foreground">Plate I · A thought before you begin</div>
          <div className="h-px w-8 bg-foreground/40 my-1.5" />
          <p className="italic-serif text-[13px] leading-tight text-foreground/75">
            "{thought}"
          </p>
        </div>

        <section className="pt-5">
          <div className="editorial-eyebrow text-primary mb-2">A travel operating system</div>
          <h1 className="display-md leading-[0.95]">
            A system <span className="italic-serif">with taste.</span><br />
            And <span className="italic-serif">opinions.</span>
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-foreground/70 max-w-[34ch]">
            You bring the appetite. Cura will handle the rest.
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
