import { useEffect, useState } from "react";

export default function useDevice() {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") {
      return { isMobile: false, isTablet: false, isTouch: false, isLowEnd: false, reduced: false };
    }
    const isTouch = matchMedia("(hover: none)").matches;
    const w = window.innerWidth;
    const isMobile = w < 768;
    const isTablet = w >= 768 && w < 1024;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 4;
    const isLowEnd = isMobile || cores <= 4 || mem <= 4;
    return { isMobile, isTablet, isTouch, isLowEnd, reduced };
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setState((s) => ({
        ...s,
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return state;
}
