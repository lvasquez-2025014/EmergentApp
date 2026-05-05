import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const sections = [
  { path: "/inicio", num: "I", label: "Inicio" },
  { path: "/catalogo", num: "II", label: "Catálogo" },
  { path: "/manifiesto", num: "III", label: "Manifiesto" },
  { path: "/encargo", num: "IV", label: "Encargo" },
];

export default function SectionIndicator() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("/inicio");

  useEffect(() => {
    const current = sections.some((s) => s.path === location.pathname)
      ? location.pathname
      : "/inicio";
    setActive(current);
  }, [location.pathname]);

  return (
    <aside className="section-indicator" data-testid="section-indicator">
      <ul>
        {sections.map((s) => {
          const isActive = active === s.path;
          return (
            <li key={s.path}>
              <button
                onClick={() => navigate(s.path)}
                className={`section-dot ${isActive ? "active" : ""}`}
                data-testid={`indicator-${s.path.replace("/", "")}`}
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
