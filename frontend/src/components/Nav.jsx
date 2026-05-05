import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const items = [
    { path: "/inicio", label: "Inicio" },
    { path: "/catalogo", label: "Catálogo" },
    { path: "/manifiesto", label: "Manifiesto" },
    { path: "/encargo", label: "Encargo" },
  ];

  return (
    <>
      <nav className="nav-bar" data-testid="main-nav">
        <Link
          to="/inicio"
          className="font-monumental tracking-widest uppercase text-base md:text-lg"
          data-testid="brand-mark"
        >
          Sanctum<span style={{ color: "var(--primary-accent)" }}>·</span>Marmoris
        </Link>
        <ul className="hidden lg:flex gap-10 items-center">
          {items.map((it) => (
            <li key={it.path}>
              <Link
                to={it.path}
                className="overline hover:text-[var(--primary-accent)] transition-colors"
                data-testid={`nav-${it.path.replace("/", "")}`}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/encargo"
          className="hidden lg:inline-block overline brutal-border-gold px-4 py-2 hover:bg-[var(--primary-accent)] hover:text-[var(--bg-base)] transition-colors"
          data-testid="nav-cta-encargar"
        >
          Encargar
        </Link>
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
            <li key={it.path} style={{ transitionDelay: `${0.12 + i * 0.08}s` }}>
              <Link
                to={it.path}
                onClick={() => setOpen(false)}
                className="font-monumental uppercase"
                data-testid={`mobile-nav-${it.path.replace("/", "")}`}
              >
                <span className="num-tag mr-4">{["I", "II", "III", "IV"][i]}</span>
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
