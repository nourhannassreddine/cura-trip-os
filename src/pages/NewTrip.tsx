import { Link } from "react-router-dom";
import { TopBar } from "@/components/cura/TopBar";
import { BottomNav } from "@/components/cura/BottomNav";
import { CuraWhisper } from "@/components/cura/CuraWhisper";
import { Sparkles, Upload, PencilLine } from "lucide-react";

const NewTrip = () => {
  return (
    <main className="app-shell pb-20">
      <TopBar back="/home" eyebrow="New" title="Begin a trip" />

      <section className="px-5 pt-2 cura-rise">
        <h1 className="display-lg max-w-[14ch]">
          How would you like to <span className="italic-serif">start</span>?
        </h1>
      </section>

      <section className="mt-7 px-5 space-y-3">
        <Link to="/discover" className="group block border border-foreground bg-ink text-ink-foreground p-5">
          <Sparkles className="h-4 w-4 mb-3" strokeWidth={1.5} />
          <div className="font-serif text-2xl leading-tight">Let CURA suggest</div>
          <p className="text-xs opacity-70 mt-2 max-w-[32ch]">Tell me a feeling, a window of time, and a budget. I'll bring you three places.</p>
        </Link>

        <Link to="/trip/puglia-25" className="group block border border-foreground/30 hover:border-foreground p-5">
          <PencilLine className="h-4 w-4 mb-3" strokeWidth={1.5} />
          <div className="font-serif text-2xl leading-tight">I know where I'm going</div>
          <p className="text-xs text-muted-foreground mt-2 max-w-[32ch]">Drop in dates and a city. I'll set up the workspace and engines.</p>
        </Link>

        <Link to="/trip/puglia-25" className="group block border border-foreground/30 hover:border-foreground p-5">
          <Upload className="h-4 w-4 mb-3" strokeWidth={1.5} />
          <div className="font-serif text-2xl leading-tight">I booked elsewhere</div>
          <p className="text-xs text-muted-foreground mt-2 max-w-[32ch]">Forward me your hotel + flights. I'll handle the rest — itinerary, packing, the day-of.</p>
        </Link>
      </section>

      <section className="mt-9 px-5">
        <CuraWhisper>
          Companion mode is real, by the way. You don't have to do it all in CURA. Just bring me what you have.
        </CuraWhisper>
      </section>

      <div className="h-10" />
      <BottomNav />
    </main>
  );
};

export default NewTrip;
