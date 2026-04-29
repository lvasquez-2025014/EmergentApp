export default function Nav() {
  const items = [
    { id: "hero", label: "Inicio" },
    { id: "catalog", label: "Catálogo" },
    { id: "manifest", label: "Manifiesto" },
    { id: "contact", label: "Encargo" },
  ];
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav className="nav-bar" data-testid="main-nav">
      <button
        onClick={() => scrollTo("hero")}
        className="font-monumental text-lg tracking-widest uppercase"
        data-testid="brand-mark"
      >
        Sanctum<span style={{ color: "var(--primary-accent)" }}>·</span>Marmoris
      </button>
      <ul className="hidden md:flex gap-10 items-center">
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
        className="overline brutal-border-gold px-4 py-2 hover:bg-[var(--primary-accent)] hover:text-[var(--bg-base)] transition-colors"
        data-testid="nav-cta-encargar"
      >
        Encargar
      </button>
    </nav>
  );
}
