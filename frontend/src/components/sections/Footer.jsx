export default function Footer() {
  return (
    <footer
      className="relative pt-24 pb-10 px-6 overflow-hidden"
      data-testid="footer"
    >
      <div className="section-frame">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 brutal-border-gold border-x-0 border-b-0 pt-12">
          <div>
            <div className="overline mb-4">Atelier</div>
            <p className="font-narrative text-lg leading-snug">
              Calle del Mármol, 12<br />
              41004 Sevilla, España
            </p>
          </div>
          <div>
            <div className="overline mb-4">Contacto</div>
            <p className="font-narrative text-lg leading-snug">
              hola@sanctummarmoris.es<br />
              +34 954 000 000
            </p>
          </div>
          <div>
            <div className="overline mb-4">Visitas</div>
            <p className="font-narrative text-lg leading-snug">
              Sólo con cita previa<br />
              Lun – Vie · 10h – 18h
            </p>
          </div>
          <div>
            <div className="overline mb-4">Envíos</div>
            <p className="font-narrative text-lg leading-snug">
              Mundial vía Brink's Fine Art<br />
              Seguros incluidos
            </p>
          </div>
        </div>

        <div className="footer-mark text-center select-none leading-none">
          SANCTUM<br />MARMORIS
        </div>

        <div className="flex flex-wrap items-center justify-between mt-10 gap-4">
          <div className="overline">
            © MMXXVI Sanctum Marmoris · Tous droits reservés
          </div>
          <div className="overline">
            Designed with reverence · WebGL · R3F · GSAP
          </div>
        </div>
      </div>
    </footer>
  );
}
