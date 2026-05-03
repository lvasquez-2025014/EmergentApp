import { useEffect, useState } from "react";

const sections = [
  { id: "hero", num: "I", label: "Inicio" },
  { id: "catalog", num: "II", label: "Catálogo" },
  { id: "manifest", num: "III", label: "Manifiesto" },
  { id: "contact", num: "IV", label: "Encargo" },
];

export default function SectionIndicator() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let current = "hero";
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          if (center >= top) current = s.id;
        }
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="section-indicator" data-testid="section-indicator">
      <ul>
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() =>
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`section-dot ${isActive ? "active" : ""}`}
                data-testid={`indicator-${s.id}`}
                aria-label={s.label}
              >
                <span className="section-dot-num">{s.num}</span>
                <span className="section-dot-line" />
                <span className="section-dot-label">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
