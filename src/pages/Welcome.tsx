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
import surreal8 from "@/assets/welcome-surreal-9.jpg";

/* ------------------------------------------------------------------
   Welcome - Plate I.
   Hero: 10-frame surreal carousel, slow crossfade, story-like rhythm.
   Logo flips white over light/warm frames where black would lose
   legibility (the orange + pink lady frame in particular).
   Footer is treated as an editorial imprint, not a UI element.
------------------------------------------------------------------ */

type Frame = { src: string; alt: string };

/* 9 frames, one album. Jacquemus × Tim Walker × Slim Aarons — sun-faded, low
   saturation, single oversized object per frame. Each composed for the locked
   3:2 horizontal banner so subjects sit fully inside the frame. */
const frames: Frame[] = [
  { src: surreal1, alt: "A colossal slightly-open pomegranate on pale dunes with seeds spilled on the sand, a tiny figure standing beside it for scale" },
  { src: surreal2, alt: "A house-sized seashell on an empty beach, a tiny figure standing at its base for perspective, soft morning light" },
  { src: surreal3, alt: "A giant porcelain teacup tipped on its side on a sunlit Mediterranean terrace, calm sea spilling out across the tiles" },
  { src: surreal4, alt: "A house-sized woven straw sun hat casting a circular shadow on a sunlit plaza, a tiny figure standing in the shade" },
  { src: surreal5, alt: "A snowy alpine peak with a giant pastel pink ice cream cone planted upright in the summit" },
  { src: surreal6, alt: "A colossal hot-air balloon carrying a tiny Mediterranean village in baskets, drifting over a wildflower meadow" },
  { src: surreal7, alt: "A tiny figure standing outdoors on a soft hillside, holding up an enormous unfolded paper map and looking at it" },
  { src: surreal8, alt: "Three colossal green olives balanced on an empty Mediterranean rooftop, calm sea in the distance" },
];

const Welcome = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), 6000);
    return () => clearInterval(id);
  }, []);

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
        {/* Logo - 8px from the safe edge, lowercase Playfair, always white with
            soft shadow for legibility on every frame regardless of background */}
        <div className="absolute top-2 left-2 p-2">
          <div className="font-serif lowercase text-2xl leading-none tracking-tight text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            cura
          </div>
        </div>
      </div>

      {/* Everything below the image shares the same px-5 rhythm */}
      <div className="flex-1 flex flex-col px-5">
        <section className="pt-6">
          <div className="editorial-eyebrow text-primary mb-2">A travel operating system</div>
          <h1 className="display-md leading-[0.95]">
            A system <span className="italic-serif">with taste.</span><br />
            And <span className="italic-serif">opinions.</span>
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-foreground/70 whitespace-nowrap">
            You bring the appetite. Cura will handle the rest.
          </p>
        </section>

        <section className="mt-auto pt-5 flex flex-col items-stretch">
          <Link
            to="/identify"
            className="group flex w-full items-center justify-center gap-2 text-ink-foreground"
            style={{
              backgroundColor: "#C24E2A",
              color: "#F5F0E8",
              borderRadius: "20px",
              padding: "15px 40px",
            }}
          >
            <span className="font-sans text-sm tracking-wide">I'm new here, show me cura</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
          <div className="mt-2.5 text-center">
            <Link
              to="/home"
              className="font-serif italic text-[13px] text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              I've been here before
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
