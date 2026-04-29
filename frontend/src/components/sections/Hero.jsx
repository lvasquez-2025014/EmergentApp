import { useEffect, useRef } from "react";

export default function Hero() {
  const titleRef = useRef(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.add("in-view");
  }, []);

  return (
    <section
      id="hero"
      className="section relative min-h-screen flex flex-col justify-end"
      data-testid="section-hero"
    >
      <div className="section-frame w-full">
        <div className="overline mb-6 reveal-up in-view">
          MMXII — Taller de imaginería sacra
        </div>
        <h1
          ref={titleRef}
          className="hero-title reveal-up"
          data-testid="hero-title"
        >
          Donde la <span className="accent">piedra</span><br />
          guarda el silencio<br />
          de lo <span className="accent">eterno</span>.
        </h1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <p className="font-narrative text-xl md:text-2xl leading-snug text-[var(--text-primary)]">
            Imaginería religiosa tallada a mano para coleccionistas, parroquias y casas devocionales.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("catalog")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-sacro"
              data-testid="hero-cta-explorar"
            >
              Explorar el catálogo →
            </button>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 right-8 overline flex items-center gap-3">
        <span className="block w-12 h-px bg-[var(--primary-accent)]" />
        Scroll
      </div>
    </section>
  );
}
