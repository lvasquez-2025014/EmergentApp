import { useState, useEffect } from "react";
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
    <div className="App grain vignette" data-testid="app-root">
      <Preloader onComplete={() => setReady(true)} />
      <Cursor />
      <Nav />
      <SectionIndicator />
      <ScrollProgress />
      <Scene scrollProgress={scrollProgress} />

      <main className={`content-layer ${ready ? "ready" : "not-ready"}`}>
        <Hero />
        <Marquee />
        <Catalog onSelect={setSelected} />
        <Manifest />
        <Contact />
        <Footer />
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
  );
}

export default App;
