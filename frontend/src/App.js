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
import { inicioAPI, catalogoAPI, manifiestoAPI, encargoAPI } from "./lib/api";

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await catalogoAPI.getData();
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error loading catalogo:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (pageRef.current && !loading) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [location, loading]);
  
  if (loading) return <div className="page-view-catalog flex items-center justify-center"><div className="overline">Cargando...</div></div>;
  if (error) return <div className="page-view-catalog flex items-center justify-center"><div className="text-red-500">Error: {error}</div></div>;
  
  return (
    <div ref={pageRef} className="page-view-catalog">
      <Catalog onSelect={onSelect} apiData={data} />
      {data?.process && (
        <section className="section" style={{ paddingTop: '4rem' }}>
          <div className="section-frame">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-[var(--border-dim)]">
              {data.process.steps?.map((step, idx) => (
                <div key={idx}>
                  <div className="num-tag mb-4">{data.process.title}</div>
                  <h3 className="font-monumental text-2xl uppercase mb-4">{step.title}</h3>
                  <p className="font-narrative text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ManifestPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await manifiestoAPI.getData();
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error loading manifiesto:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (pageRef.current && !loading) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [location, loading]);
  
  if (loading) return <div className="page-view-manifest flex items-center justify-center"><div className="overline">Cargando...</div></div>;
  if (error) return <div className="page-view-manifest flex items-center justify-center"><div className="text-red-500">Error: {error}</div></div>;
  
  return (
    <div ref={pageRef} className="page-view-manifest">
      <Manifest apiData={data} />
      {data?.history && (
        <section className="section">
          <div className="section-frame">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 pt-16 border-t border-[var(--border-dim)]">
              <div>
                <div className="overline mb-6">Historia</div>
                <h3 className="font-monumental text-4xl md:text-5xl uppercase tracking-tight mb-8">
                  {data.history.title?.split(' ')[0]} {data.history.title?.split(' ')[1]} {data.history.title?.split(' ')[2]}<br />
                  <span className="font-narrative italic text-[var(--primary-accent)]">{data.history.title?.split(' ')[3]}</span>
                </h3>
                <p className="font-narrative text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                  {data.history.story}
                </p>
                <p className="font-narrative text-lg text-[var(--text-secondary)] leading-relaxed">
                  {data.history.location}
                </p>
              </div>
              <div className="space-y-8">
                {data.stats?.map((stat, idx) => (
                  <div key={idx} className="p-8 border border-[var(--border-dim)] bg-[var(--surface-stone)]">
                    <div className="num-tag mb-4">{stat.label}</div>
                    <div className="font-monumental text-3xl uppercase mb-2">{stat.num}</div>
                    <p className="font-narrative text-[var(--text-secondary)]">
                      {idx === 0 && "Fundación del taller por tres familias de artesanos."}
                      {idx === 1 && "Obras catalogadas en nuestro archivo histórico."}
                      {idx === 2 && "Maestros especializados en diferentes técnicas."}
                      {idx === 3 && "Países donde han llegado nuestras obras."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ContactPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await encargoAPI.getData();
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error loading encargo:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (pageRef.current && !loading) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [location, loading]);
  
  if (loading) return <div className="page-view-contact flex items-center justify-center"><div className="overline">Cargando...</div></div>;
  if (error) return <div className="page-view-contact flex items-center justify-center"><div className="text-red-500">Error: {error}</div></div>;
  
  return (
    <div ref={pageRef} className="page-view-contact">
      <Contact apiData={data} />
      {data?.contact && (
        <section className="section" style={{ paddingTop: '2rem' }}>
          <div className="section-frame">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-dim)] mt-12">
              <div className="bg-[var(--bg-base)] p-10 md:p-12">
                <div className="num-tag mb-6">Ubicación</div>
                <p className="font-narrative text-lg mb-2">{data.contact.address.street}</p>
                <p className="font-narrative text-lg mb-2">{data.contact.address.city}</p>
                <p className="font-narrative text-[var(--text-secondary)]">{data.contact.address.country}</p>
              </div>
              <div className="bg-[var(--bg-base)] p-10 md:p-12">
                <div className="num-tag mb-6">Contacto</div>
                <p className="font-narrative text-lg mb-2">{data.contact.email}</p>
                <p className="font-narrative text-lg mb-2">{data.contact.phone}</p>
                <p className="font-narrative text-[var(--text-secondary)]">{data.contact.hours}</p>
              </div>
              <div className="bg-[var(--bg-base)] p-10 md:p-12">
                <div className="num-tag mb-6">{data.visit_policy?.title}</div>
                <p className="font-narrative text-lg mb-2">Con cita previa</p>
                <p className="font-narrative text-[var(--text-secondary)] mb-4">
                  {data.visit_policy?.description}
                </p>
                <p className="font-narrative text-sm text-[var(--primary-accent)]">
                  * {data.visit_policy?.note}
                </p>
              </div>
            </div>
            
            {data?.quote && (
              <div className="mt-20 text-center">
                <div className="overline mb-4">Compromiso</div>
                <p className="font-narrative text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                  "{data.quote.text}"
                </p>
                <p className="font-narrative text-sm mt-6 text-[var(--text-secondary)]">
                  — {data.quote.author}, {data.quote.role}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
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
