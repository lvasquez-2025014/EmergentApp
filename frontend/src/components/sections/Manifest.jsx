import { principles, stats } from "../../data/catalog";

export default function Manifest() {
  return (
    <section id="manifest" className="section" data-testid="section-manifest">
      <div className="section-frame">
        <div className="overline mb-3">III — Manifiesto</div>
        <h2 className="font-monumental text-5xl md:text-7xl uppercase tracking-tight max-w-5xl">
          Tres principios<br />
          <span className="font-narrative italic font-light text-[var(--primary-accent)]">
            inquebrantables
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
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[var(--bg-base)] p-8 md:p-12 text-center"
              data-testid={`stat-${s.label}`}
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
