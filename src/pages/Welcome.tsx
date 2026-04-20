import { Link } from "react-router-dom";
import surreal from "@/assets/welcome-surreal.jpg";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------
   Welcome — Plate I.
   Layout obeys an 8px outer padding rhythm so the logo, caption,
   headline, CTAs and footer all share the same left/right edge.
   The image bleeds slightly past the safe-area but the type does not.
------------------------------------------------------------------ */

const Welcome = () => {
  return (
    <main className="app-shell relative grain overflow-hidden flex flex-col">
      {/* image — bleeds the full width, sits inside a fixed 44dvh frame */}
      <div className="relative h-[44dvh] w-full overflow-hidden shrink-0">
        <img
          src={surreal}
          alt="A surreal oversized white scallop shell standing on wet pastel sand at the edge of a calm turquoise sea, a small figure in white linen walking the shoreline at golden hour"
          className="h-full w-full object-cover"
          width={832}
          height={1216}
        />
        {/* logo — 8px from the safe edge, lowercase Playfair */}
        <div className="absolute top-2 left-2 p-2">
          <div className="font-serif lowercase text-2xl leading-none tracking-tight text-foreground/85 mix-blend-multiply">
            cura
          </div>
        </div>
      </div>

      {/* everything below the image shares the same px-5 rhythm
          so the logo (left edge of image) lines up with all type below */}
      <div className="flex-1 flex flex-col px-5">
        {/* caption — no longer over the image, sits cleanly under it,
            aligned to the same 5px gutter as the logo above */}
        <div className="pt-4 cura-rise">
          <div className="editorial-eyebrow text-muted-foreground">Plate I · The shell, mistaken for an island</div>
          <div className="h-px w-8 bg-foreground/40 my-1.5" />
          <p className="italic-serif text-[13px] leading-tight text-foreground/75">
            "We mistook the small thing for the whole thing."
          </p>
        </div>

        <section className="pt-5">
          <div className="editorial-eyebrow text-primary mb-2">A travel operating system</div>
          <h1 className="display-md leading-[0.95]">
            Most apps help you<br />
            <span className="italic-serif">book</span> a trip.<br />
            I help you<br />
            <span className="italic-serif">become</span> the<br />
            kind of person<br />
            who took it.
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-foreground/70 max-w-[34ch]">
            CURA reads how you move and quietly removes the trips you'd regret.
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
              className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              I already have an account
            </Link>
          </div>
        </section>

        <footer className="pt-3 pb-3 flex justify-between text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
          <span>№ 001</span>
          <span>Vol. I — Spring</span>
        </footer>
      </div>
    </main>
  );
};

export default Welcome;
