import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "hero", label: "Inicio" },
    { id: "catalog", label: "Catálogo" },
    { id: "manifest", label: "Manifiesto" },
    { id: "contact", label: "Encargo" },
  ];
  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="nav-bar" data-testid="main-nav">
        <button
          onClick={() => scrollTo("hero")}
          className="font-monumental tracking-widest uppercase text-base md:text-lg"
          data-testid="brand-mark"
        >
          Sanctum<span style={{ color: "var(--primary-accent)" }}>·</span>Marmoris
        </button>
        <ul className="hidden lg:flex gap-10 items-center">
          {items.map((it) => (
            <li key={it.id}>
              <button
                onClick={() => scrollTo(it.id)}
                className="overline hover:text-[var(--primary-accent)] transition-colors"
                data-testid={`nav-${it.id}`}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => scrollTo("contact")}
          className="hidden lg:inline-block overline brutal-border-gold px-4 py-2 hover:bg-[var(--primary-accent)] hover:text-[var(--bg-base)] transition-colors"
          data-testid="nav-cta-encargar"
        >
          Encargar
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden brutal-border-gold p-3"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          data-testid="nav-toggle"
        >
          <span className={`hamburger ${open ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer ${open ? "open" : ""}`}
        data-testid="mobile-drawer"
      >
        <ul>
          {items.map((it, i) => (
            <li key={it.id} style={{ transitionDelay: `${0.12 + i * 0.08}s` }}>
              <button
                onClick={() => scrollTo(it.id)}
                className="font-monumental uppercase"
                data-testid={`mobile-nav-${it.id}`}
              >
                <span className="num-tag mr-4">{["I", "II", "III", "IV"][i]}</span>
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
