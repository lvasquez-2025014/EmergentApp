import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "@/App.css";
import { Toaster } from "sonner";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import SectionIndicator from "./components/SectionIndicator";
import ScrollProgress from "./components/ScrollProgress";
import Scene from "./components/three/Scene";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Catalog from "./components/sections/Catalog";
import Manifest from "./components/sections/Manifest";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import DetailDialog from "./components/sections/DetailDialog";
import useScrollProgress from "./lib/useScrollProgress";
import useLenis from "./lib/useLenis";
import { gsap } from "gsap";

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
    </>
  );
}

function CatalogPage({ onSelect }) {
  const pageRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [location]);
  
  return (
    <div ref={pageRef} className="page-view-catalog">
      <Catalog onSelect={onSelect} />
      <section className="section" style={{ paddingTop: '4rem' }}>
        <div className="section-frame">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-[var(--border-dim)]">
            <div>
              <div className="num-tag mb-4">Proceso</div>
              <h3 className="font-monumental text-2xl uppercase mb-4">Desde la piedra</h3>
              <p className="font-narrative text-[var(--text-secondary)] leading-relaxed">
                Cada obra comienza con la selección meticulosa de la materia prima. 
                Visitamos canteras históricas en Carrara, Volterra y Macael para encontrar 
                la piedra perfecta para cada proyecto.
              </p>
            </div>
            <div>
              <div className="num-tag mb-4">Taller</div>
              <h3 className="font-monumental text-2xl uppercase mb-4">Manos maestras</h3>
              <p className="font-narrative text-[var(--text-secondary)] leading-relaxed">
                Nuestros maestros talladores provienen de linajes de artesanos con 
                siglos de tradición. Cada gesto del cincel está impregnado de 
                conocimiento ancestral.
              </p>
            </div>
            <div>
              <div className="num-tag mb-4">Entrega</div>
              <h3 className="font-monumental text-2xl uppercase mb-4">Envío sagrado</h3>
              <p className="font-narrative text-[var(--text-secondary)] leading-relaxed">
                Las obras se transportan en empaques especiales diseñados para proteger 
                la integridad de la pieza. Incluimos certificado de autenticidad y 
                documentación de procedencia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ManifestPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [location]);
  
  return (
    <div ref={pageRef} className="page-view-manifest">
      <Manifest />
      <section className="section">
        <div className="section-frame">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 pt-16 border-t border-[var(--border-dim)]">
            <div>
              <div className="overline mb-6">Historia</div>
              <h3 className="font-monumental text-4xl md:text-5xl uppercase tracking-tight mb-8">
                Doce años de<br />
                <span className="font-narrative italic text-[var(--primary-accent)]">devoción</span>
              </h3>
              <p className="font-narrative text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Fundado en MMXII, Sanctum Marmoris nació de la unión de tres familias 
                de artesanos: los Bianchi de Carrara, maestros del mármol; los Navarro 
                de Toledo, herederos de la tradición damasquina; y los Petrov de Sofía, 
                iconógrafos de la escuela bizantina.
              </p>
              <p className="font-narrative text-lg text-[var(--text-secondary)] leading-relaxed">
                Nuestro taller principal se encuentra en las afueras de Florencia, 
                en una antigua capilla del siglo XIV que convertimos en santuario 
                de la escultura sagrada. Allí, bajo la luz que filtran las rosas 
                de ojiva, nacen nuestras obras.
              </p>
            </div>
            <div className="space-y-8">
              <div className="p-8 border border-[var(--border-dim)] bg-[var(--surface-stone)]">
                <div className="num-tag mb-4">Artesanos</div>
                <div className="font-monumental text-3xl uppercase mb-2">27 Maestros</div>
                <p className="font-narrative text-[var(--text-secondary)]">
                  Cada uno especializado en una técnica: talla directa, modelado, 
                  dorado, policromía o mosaico.
                </p>
              </div>
              <div className="p-8 border border-[var(--border-dim)] bg-[var(--surface-stone)]">
                <div className="num-tag mb-4">Obras</div>
                <div className="font-monumental text-3xl uppercase mb-2">184 Piezas</div>
                <p className="font-narrative text-[var(--text-secondary)]">
                  Catalogadas y documentadas. Cada una con historia, técnica y 
                  proveniencia registradas en nuestro archivo.
                </p>
              </div>
              <div className="p-8 border border-[var(--border-dim)] bg-[var(--surface-stone)]">
                <div className="num-tag mb-4">Clientes</div>
                <div className="font-monumental text-3xl uppercase mb-2">IX Países</div>
                <p className="font-narrative text-[var(--text-secondary)]">
                  Obras en colecciones privadas, parroquias, catedrales y museos 
                  en cuatro continentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [location]);
  
  return (
    <div ref={pageRef} className="page-view-contact">
      <Contact />
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="section-frame">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-dim)] mt-12">
            <div className="bg-[var(--bg-base)] p-10 md:p-12">
              <div className="num-tag mb-6">Ubicación</div>
              <p className="font-narrative text-lg mb-2">Via della Pietra Sacra, 42</p>
              <p className="font-narrative text-lg mb-2">50014 Fiesole (FI)</p>
              <p className="font-narrative text-[var(--text-secondary)]">Italia</p>
            </div>
            <div className="bg-[var(--bg-base)] p-10 md:p-12">
              <div className="num-tag mb-6">Contacto</div>
              <p className="font-narrative text-lg mb-2">info@sanctummarmoris.com</p>
              <p className="font-narrative text-lg mb-2">+39 055 789 2341</p>
              <p className="font-narrative text-[var(--text-secondary)]">Lun-Vie: 9:00 - 18:00 CET</p>
            </div>
            <div className="bg-[var(--bg-base)] p-10 md:p-12">
              <div className="num-tag mb-6">Visitas</div>
              <p className="font-narrative text-lg mb-2">Con cita previa</p>
              <p className="font-narrative text-[var(--text-secondary)] mb-4">
                Recibimos coleccionistas y comisiones previa solicitud.
              </p>
              <p className="font-narrative text-sm text-[var(--primary-accent)]">
                * No tenemos showroom al público
              </p>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <div className="overline mb-4">Compromiso</div>
            <p className="font-narrative text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              "Cada obra que sale de nuestro taller lleva consigo no solo la mano del artesano, 
              sino la oración silenciosa de quien la recibirá."
            </p>
            <p className="font-narrative text-sm mt-6 text-[var(--text-secondary)]">
              — Marco Bianchi, Director Artístico
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  useLenis();
  const scrollProgress = useScrollProgress();
  const [selected, setSelected] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [ready]);

  return (
    <BrowserRouter>
      <div className="App grain vignette" data-testid="app-root">
        <Preloader onComplete={() => setReady(true)} />
        <Cursor />
        <Nav />
        <SectionIndicator />
        <ScrollProgress />
        <Scene scrollProgress={scrollProgress} />

        <main className={`content-layer ${ready ? "ready" : "not-ready"}`}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/inicio" />} />
            <Route path="/inicio" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogPage onSelect={setSelected} />} />
            <Route path="/manifiesto" element={<ManifestPage />} />
            <Route path="/encargo" element={<ContactPage />} />
            <Route path="*" element={<Navigate replace to="/inicio" />} />
          </Routes>
        </main>

        <Footer />

        <DetailDialog item={selected} onClose={() => setSelected(null)} />

        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--surface-stone)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-dim)",
              borderRadius: 0,
              fontFamily: "Outfit, sans-serif",
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
