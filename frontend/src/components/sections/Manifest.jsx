import { principles as staticPrinciples, stats as staticStats } from "../../data/catalog";

export default function Manifest({ apiData }) {
  // Usar datos de API si están disponibles, si no usar datos estáticos
  const principles = apiData?.principles || staticPrinciples;
  const stats = apiData?.stats || staticStats;
  const title = apiData?.title || "Tres principios inquebrantables";
  
  return (
    <section id="manifest" className="section" data-testid="section-manifest">
      <div className="section-frame">
        <div className="overline mb-3">III — Manifiesto</div>
        <h2 className="font-monumental text-5xl md:text-7xl uppercase tracking-tight max-w-5xl">
          {title.split(' ').slice(0, 2).join(' ')}<br />
          <span className="font-narrative italic font-light text-[var(--primary-accent)]">
            {title.split(' ').slice(2).join(' ')}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-dim)] mt-20">
          {principles.map((p) => (
            <div
              key={p.num}
              className="bg-[var(--bg-base)] p-10 md:p-14"
              data-testid={`principle-${p.num}`}
            >
              <div className="num-tag mb-8">{p.num}</div>
              <h3 className="font-monumental text-3xl md:text-5xl uppercase mb-6">
                {p.title}
              </h3>
              <p className="font-narrative text-lg leading-relaxed text-[var(--text-secondary)]">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border-dim)] brutal-border">
          {stats.map((s, idx) => (
            <div
              key={s.label || idx}
              className="bg-[var(--bg-base)] p-8 md:p-12 text-center"
              data-testid={`stat-${s.label || idx}`}
            >
              <div className="font-monumental text-3xl md:text-5xl text-[var(--primary-accent)] mb-3">
                {s.num}
              </div>
              <div className="overline">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
