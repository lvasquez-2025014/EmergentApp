import { useEffect, useRef } from "react";
import RevealText from "../RevealText";

export default function Hero() {
  const wordsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (wordsRef.current) wordsRef.current.classList.add("reveal-active");
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="section relative min-h-screen flex flex-col justify-end"
      data-testid="section-hero"
    >
      <div className="section-frame w-full">
        <div className="overline mb-6">
          MMXII — Taller de imaginería sacra
        </div>
        <h1 ref={wordsRef} className="hero-title reveal-text" data-testid="hero-title">
          <span className="reveal-word"><span className="reveal-inner" style={{ transitionDelay: "0.0s" }}>Donde</span></span>{" "}
          <span className="reveal-word"><span className="reveal-inner" style={{ transitionDelay: "0.08s" }}>la</span></span>{" "}
          <span className="reveal-word"><span className="reveal-inner accent-italic" style={{ transitionDelay: "0.16s" }}>piedra</span></span>
          <br />
          <span className="reveal-word"><span className="reveal-inner" style={{ transitionDelay: "0.28s" }}>guarda</span></span>{" "}
          <span className="reveal-word"><span className="reveal-inner" style={{ transitionDelay: "0.36s" }}>el</span></span>{" "}
          <span className="reveal-word"><span className="reveal-inner" style={{ transitionDelay: "0.44s" }}>silencio</span></span>
          <br />
          <span className="reveal-word"><span className="reveal-inner" style={{ transitionDelay: "0.56s" }}>de</span></span>{" "}
          <span className="reveal-word"><span className="reveal-inner" style={{ transitionDelay: "0.62s" }}>lo</span></span>{" "}
          <span className="reveal-word"><span className="reveal-inner accent-italic" style={{ transitionDelay: "0.7s" }}>eterno.</span></span>
        </h1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <RevealText
            as="p"
            text="Imaginería religiosa tallada a mano para coleccionistas, parroquias y casas devocionales."
            className="font-narrative text-xl md:text-2xl leading-snug text-[var(--text-primary)]"
            stagger={0.025}
            delay={0.9}
          />
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("catalog")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-sacro magnetic"
              data-cursor-label="Explorar"
              data-testid="hero-cta-explorar"
            >
              Explorar el catálogo →
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 overline flex items-center gap-3">
        <span className="block w-12 h-px bg-[var(--primary-accent)] light-shaft" />
        Scroll
      </div>
    </section>
  );
}
