import { useEffect } from "react";

export default function DetailDialog({ item, onClose }) {
  useEffect(() => {
    if (item) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-12 bg-[rgba(10,10,12,0.92)] backdrop-blur-md"
      onClick={onClose}
      data-testid="detail-overlay"
    >
      <div
        className="relative w-full max-w-6xl bg-[var(--surface-stone)] brutal-border max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center brutal-border hover:bg-[var(--primary-accent)] hover:text-[var(--bg-base)] transition-colors"
          data-testid="detail-close"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-black aspect-square lg:aspect-auto">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-14">
            <div className="num-tag mb-4">Obra {item.number}</div>
            <h3 className="font-monumental text-4xl md:text-6xl uppercase tracking-tight">
              {item.title}
            </h3>
            <div className="font-narrative italic text-xl text-[var(--text-secondary)] mt-2 mb-8">
              {item.subtitle}
            </div>
            <p className="font-narrative text-lg leading-relaxed text-[var(--text-primary)] mb-10">
              {item.description}
            </p>
            <dl className="grid grid-cols-2 gap-px bg-[var(--border-dim)] brutal-border mb-10">
              {[
                ["Material", item.medium],
                ["Año", item.year],
                ["Dimensiones", item.dimensions],
                ["Precio", item.price],
              ].map(([k, v]) => (
                <div key={k} className="bg-[var(--surface-stone)] p-5">
                  <dt className="overline mb-1">{k}</dt>
                  <dd className="font-narrative text-base">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="btn-sacro"
              data-testid="detail-cta-encargar"
            >
              Solicitar esta obra →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
