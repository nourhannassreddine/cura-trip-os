import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TopBar } from "@/components/cura/TopBar";

/* ------------------------------------------------------------------
   Identify — name + email intake.
   Sits between Plate I (Welcome) and Plate II (EntryGate).
   Persists { name, email } to localStorage as `cura.profile`.
------------------------------------------------------------------ */

const Identify = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const valid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    try {
      localStorage.setItem(
        "cura.profile",
        JSON.stringify({ name: name.trim(), email: email.trim() }),
      );
    } catch {
      /* noop */
    }
    navigate("/begin");
  };

  return (
    <main className="app-shell flex flex-col bg-background">
      <TopBar back="/" eyebrow="Plate I · ½" title="Begin" />

      <section className="px-5 pt-5 pb-7 cura-rise">
        <div className="editorial-eyebrow text-muted-foreground mb-3">
          A short introduction
        </div>
        <h1 className="display-md max-w-[18ch]">
          Before we go, what should I{" "}
          <span className="italic-serif">call you?</span>
        </h1>
      </section>

      <form onSubmit={onSubmit} className="px-5 flex flex-col gap-7">
        <label className="block">
          <span className="editorial-eyebrow text-muted-foreground">
            What should I call you?
          </span>
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="a name, a nickname, anything"
            className="mt-2 w-full bg-transparent border-0 border-b border-foreground/30 focus:border-foreground rounded-none px-0 py-2 text-[16px] font-serif placeholder:font-serif placeholder:italic placeholder:text-foreground/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="editorial-eyebrow text-muted-foreground">
            And where can I reach you?
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@somewhere.com"
            className="mt-2 w-full bg-transparent border-0 border-b border-foreground/30 focus:border-foreground rounded-none px-0 py-2 text-[16px] font-sans placeholder:font-serif placeholder:italic placeholder:text-foreground/40 focus:outline-none"
          />
        </label>

        <button
          type="submit"
          disabled={!valid}
          className={`group mt-2 flex items-center justify-between border border-foreground bg-ink text-ink-foreground px-5 py-3.5 transition-opacity ${
            valid ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <span className="font-sans text-sm tracking-wide">Take me in</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </button>
      </form>

      <div className="px-5 pt-7 pb-5 mt-auto">
        <p className="italic-serif text-[13px] text-foreground/60 max-w-[32ch]">
          "I'll only ask once. After this, I just remember."
        </p>
        <div className="editorial-eyebrow text-muted-foreground mt-2">
          Cura · note
        </div>
      </div>
    </main>
  );
};

export default Identify;
