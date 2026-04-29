import { useEffect, useRef } from "react";

// Returns a ref whose .current is the page scroll progress 0..1
export default function useScrollProgress() {
  const ref = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      ref.current = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return ref;
}
