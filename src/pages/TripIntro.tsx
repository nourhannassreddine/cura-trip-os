import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { trips } from "@/data/cura";

/**
 * The transition moment.
 * Ivory screen. CURA reads one true line about the trip, character by character.
 * After the line finishes, fade slowly into the dashboard.
 *
 * Only shows on the first visit per session — workspace logic gates this.
 */

const lineFor = (city: string) => {
  switch (city) {
    case "Puglia":
      return "The light in Puglia hits differently after 5pm. Build your days around that.";
    case "Marrakech":
      return "Marrakech doesn't ask you to keep up. It asks you to slow down.";
    case "Lisbon":
      return "Lisbon rewards a second visit to the same café. Plan accordingly.";
    default:
      return `${city} rewards the unhurried. You're going to want to stay longer.`;
  }
};

const TripIntro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = trips.find((t) => t.id === id) ?? trips[0];
  const line = lineFor(trip.city);

  const [shown, setShown] = useState("");
  const [fadingOut, setFadingOut] = useState(false);
  const [focusing, setFocusing] = useState(false);

  useEffect(() => {
    if (id) sessionStorage.setItem(`cura.tripIntro.${id}`, "seen");

    let i = 0;
    const stride = 1;
    const tick = setInterval(() => {
      i += stride;
      setShown(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(tick);
        setTimeout(() => setFocusing(true), 500);
        setTimeout(() => setFadingOut(true), 700);
        setTimeout(() => navigate(`/trip/${trip.id}`, { replace: true }), 1100);
      }
    }, 28);

    return () => clearInterval(tick);
  }, [id, line, navigate, trip.id]);

  return (
    <main
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-8 transition-opacity duration-[400ms] overflow-hidden ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Ghost image — barely there, comes into focus before route */}
      <img
        src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: focusing ? 0.15 : 0.06, filter: "saturate(0.85)" }}
      />
      {/* Ivory wash on top */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "hsl(var(--ink-foreground) / 0.94)" }}
      />

      <div className="absolute top-10 left-0 right-0 flex justify-center z-10">
        <span
          className="text-[10px] tracking-[0.32em] uppercase"
          style={{ color: "hsl(var(--ink) / 0.35)" }}
        >
          Cura
        </span>
      </div>

      <p
        className="relative z-10 font-serif text-center max-w-[22ch]"
        style={{ color: "hsl(var(--ink))", fontSize: "30px", lineHeight: 1.18 }}
      >
        {shown}
        <span
          aria-hidden
          className="inline-block w-[2px] align-middle ml-1 cura-pulse"
          style={{
            height: "1em",
            backgroundColor: "hsl(var(--ink) / 0.5)",
            transform: "translateY(2px)",
          }}
        />
      </p>
    </main>
  );
};

export default TripIntro;
