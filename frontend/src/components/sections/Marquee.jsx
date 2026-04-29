export default function Marquee() {
  const words = [
    "Mármol",
    "Pan de oro",
    "Bronce",
    "Talla manual",
    "Mosaico bizantino",
    "Liturgia",
    "Edición limitada",
    "Obra única",
  ];
  const repeated = [...words, ...words, ...words];
  return (
    <div className="marquee" data-testid="marquee">
      <div className="marquee-inner marquee-track">
        {repeated.map((w, i) => (
          <span key={i} className="flex items-center gap-16">
            {w}
            <span className="dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
