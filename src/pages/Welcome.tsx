import { Link } from "react-router-dom";
import surreal from "@/assets/welcome-surreal.jpg";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
  return (
    <main className="app-shell relative grain overflow-hidden flex flex-col">
      {/* image — surreal water/beach, asymmetric, bleeds off the edge */}
      <div className="relative h-[48dvh] w-[112%] -ml-[6%] overflow-hidden shrink-0">
        <img
          src={surreal}
          alt="A surreal oversized white pebble resting on wet reflective sand at the edge of calm water, a small figure in white linen walking along the shoreline at dawn"
          className="h-full w-full object-cover"
          width={1024}
          height={1024}
        />
        {/* logo — top-left, lowercase Playfair, breathing padding */}
        <div className="absolute top-5 left-6">
          <div className="font-serif lowercase text-2xl leading-none tracking-tight mix-blend-multiply text-foreground/85">
            cura
          </div>
        </div>
        {/* hand-set caption — clean stack, no overlap */}
        <div className="absolute bottom-5 left-5 max-w-[60%]">
          <div className="editorial-eyebrow text-foreground/70">Plate I</div>
          <div className="h-px w-8 bg-foreground/40 my-1.5" />
          <div className="italic-serif text-[13px] leading-tight text-foreground/80">
            "Scale, reconsidered."
          </div>
        </div>
      </div>

      <section className="px-6 pt-6 relative cura-rise">
        <div className="editorial-eyebrow text-primary mb-2">A travel operating system</div>
        <h1 className="display-lg leading-[0.95]">
          Not where<br />
          you <span className="italic-serif">plan</span>.<br />
          Where better<br />
          decisions happen.
        </h1>
        <p className="mt-4 text-[13.5px] leading-relaxed text-foreground/70 max-w-[34ch]">
          CURA reads how you travel and quietly steers you toward
          the trip you'd actually love.
        </p>
      </section>

      <section className="px-6 mt-6">
        <Link
          to="/begin"
          className="group flex items-center justify-between border border-foreground bg-ink text-ink-foreground px-5 py-4"
        >
          <span className="font-sans text-sm tracking-wide">Begin</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
        <div className="mt-3 text-center">
          <Link
            to="/home"
            className="text-[12px] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            I already have an account
          </Link>
        </div>
      </section>

      <footer className="px-6 mt-auto pt-6 pb-5 flex justify-between text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        <span>№ 001</span>
        <span>Vol. I — Spring</span>
      </footer>
    </main>
  );
};

export default Welcome;
