import { catalog as staticCatalog } from "../../data/catalog";

export default function Catalog({ onSelect, apiData }) {
  // Usar datos de API si están disponibles, si no usar datos estáticos
  const works = apiData?.works || staticCatalog;
  const title = apiData?.title || "Obras vivas en piedra";
  const subtitle = apiData?.subtitle || "Cuatro piezas seleccionadas del fondo permanente. Cada una es una conversación entre el cincel, la materia y el silencio.";
  
  // Función para obtener imagen (API no tiene URLs, usar datos estáticos)
  const getImage = (item, idx) => {
    if (staticCatalog[idx]?.id === item.id) {
      return staticCatalog[idx].image;
    }
    return staticCatalog[0]?.image || "";
  };
  
  return (
    <section id="catalog" className="section" data-testid="section-catalog">
      <div className="section-frame">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="overline mb-3">II — Catálogo</div>
            <h2 className="font-monumental text-5xl md:text-7xl uppercase tracking-tight">
              {title.split(' ')[0]}<br />
              <span className="font-narrative italic font-light text-[var(--primary-accent)]">
                {title.split(' ')[1]}
              </span>{" "}
              {title.split(' ').slice(2).join(' ')}
            </h2>
          </div>
          <p className="font-narrative text-lg max-w-md text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {works.map((item, idx) => {
            const span =
              idx === 0
                ? "md:col-span-7 md:row-span-2"
                : idx === 1
                  ? "md:col-span-5"
                  : idx === 2
                    ? "md:col-span-5"
                    : "md:col-span-7";
            const aspect = idx === 0 ? "aspect-[4/5]" : "aspect-[16/10]";
            return (
              <button
                key={item.id}
                onClick={() => onSelect && onSelect({ ...item, image: getImage(item, idx) })}
                className={`tile ${span} ${aspect} text-left group`}
                data-cursor-label="Ver obra"
                data-testid={`catalog-item-${item.id}`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={getImage(item, idx)}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 num-tag bg-[rgba(10,10,12,0.75)] px-3 py-1">
                    {item.number}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[rgba(10,10,12,0.95)] to-transparent">
                    <div className="overline mb-2">{item.medium}</div>
                    <h3 className="font-monumental text-2xl md:text-4xl uppercase">
                      {item.title}
                    </h3>
                    <div className="font-narrative italic text-base md:text-lg text-[var(--text-secondary)] mt-1">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
