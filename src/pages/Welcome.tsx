import { Link } from "react-router-dom";
import hands from "@/assets/onboarding-hands.jpg";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
  return (
    <main className="app-shell relative grain overflow-hidden">
      {/* image — asymmetric, bleeds off the edge */}
      <div className="relative h-[58dvh] w-[112%] -ml-[6%] overflow-hidden">
        <img
          src={hands}
          alt="Hands holding a paper map and small camera on warm sand"
          className="h-full w-full object-cover"
          width={1024}
          height={1280}
        />
        <div className="absolute top-5 right-7 text-right">
          <div className="editorial-eyebrow text-foreground/80">Est. now</div>
          <div className="font-serif text-3xl leading-none">CURA</div>
        </div>
      </div>

      <section className="px-6 -mt-10 relative cura-rise">
        <div className="editorial-eyebrow text-primary mb-3">A travel operating system</div>
        <h1 className="display-xl">
          Travel,<br />
          <span className="italic-serif">remembered</span><br />
          well.
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-foreground/70 max-w-[34ch]">
          One workspace for the whole trip — from the first daydream
          to the last photo. Use everything, or just the part you need.
        </p>
      </section>

      <section className="px-6 mt-10 space-y-3">
        <Link
          to="/onboarding"
          className="group flex items-center justify-between border border-foreground bg-ink text-ink-foreground px-5 py-4"
        >
          <span className="font-sans text-sm tracking-wide">Begin</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
        <Link
          to="/home"
          className="flex items-center justify-between border border-foreground/30 px-5 py-4"
        >
          <span className="font-sans text-sm tracking-wide">I already have an account</span>
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </section>

      <footer className="px-6 mt-12 mb-8 flex justify-between text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        <span>№ 001</span>
        <span>Vol. I — Spring</span>
      </footer>
    </main>
  );
};

export default Welcome;
