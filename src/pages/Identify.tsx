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
            Your name
          </span>
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="a name, a nickname, anything"
            className="cura-input mt-2 w-full bg-transparent px-3 py-2.5 text-[16px] font-serif placeholder:font-serif placeholder:italic placeholder:text-foreground/40 focus:outline-none"
            style={{
              border: "0.5px solid rgba(26,26,24,0.20)",
              borderRadius: "12px",
            }}
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
            className="cura-input mt-2 w-full bg-transparent px-3 py-2.5 text-[16px] font-sans placeholder:font-serif placeholder:italic placeholder:text-foreground/40 focus:outline-none"
            style={{
              border: "0.5px solid rgba(26,26,24,0.20)",
              borderRadius: "12px",
            }}
          />
        </label>

        <button
          type="submit"
          disabled={!valid}
          className={`group mt-2 inline-flex items-center justify-center gap-2 transition-opacity ${
            valid ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
          style={{
            backgroundColor: valid ? "#C24E2A" : "rgba(26,26,24,0.10)",
            color: valid ? "#F5F0E8" : "rgba(26,26,24,0.50)",
            borderRadius: "20px",
            padding: "14px 24px",
          }}
        >
          <span className="font-sans text-sm tracking-wide">Take me in</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </button>
      </form>

      <div className="px-5 pt-7 pb-5 mt-auto">
        <div
          style={{
            backgroundColor: "#EFE9DF",
            borderLeft: "3px solid #C24E2A",
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
            padding: "14px 16px",
          }}
        >
          <p className="italic-serif text-[13px] text-foreground/80 max-w-[32ch]">
            "I'll only ask once. After this, I just remember."
          </p>
          <div
            className="editorial-eyebrow mt-2"
            style={{ color: "#C24E2A", fontSize: "8px" }}
          >
            ✦ Cura · note
          </div>
        </div>
      </div>
    </main>
  );
};

export default Identify;
