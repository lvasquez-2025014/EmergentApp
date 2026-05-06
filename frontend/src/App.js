import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "@/App.css";
import { Toaster } from "sonner";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Catalog from "./components/sections/Catalog";
import Manifest from "./components/sections/Manifest";
import Contact from "./components/sections/Contact";
import DetailDialog from "./components/sections/DetailDialog";
import useLenis from "./lib/useLenis";
import { gsap } from "gsap";
import { catalogoAPI, manifiestoAPI, encargoAPI } from "./lib/api";

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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await catalogoAPI.getData();
        setData(response.data);
      } catch (err) {
        console.error("Error loading catalogo:", err);
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
  
  return (
    <div ref={pageRef} className="page-view-catalog">
      <Catalog onSelect={onSelect} apiData={data} />
    </div>
  );
}

function ManifestPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await manifiestoAPI.getData();
        setData(response.data);
      } catch (err) {
        console.error("Error loading manifiesto:", err);
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
  
  return (
    <div ref={pageRef} className="page-view-manifest">
      <Manifest apiData={data} />
    </div>
  );
}

function ContactPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await encargoAPI.getData();
        setData(response.data);
      } catch (err) {
        console.error("Error loading encargo:", err);
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
  
  return (
    <div ref={pageRef} className="page-view-contact">
      <Contact apiData={data} />
    </div>
  );
}

function App() {
  useLenis();
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
