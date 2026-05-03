import { useEffect, useState, useRef } from "react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const duration = 1500; // ms
    let raf;
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const p = Math.min(1, elapsed / duration);
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setHidden(true);
          onComplete && onComplete();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      className={`preloader ${hidden ? "preloader-out" : ""}`}
      data-testid="preloader"
      aria-hidden={hidden}
    >
      <div className="preloader-inner">
        <div className="preloader-mark font-monumental">SANCTUM<br />MARMORIS</div>
        <div className="preloader-meta">
          <span className="overline">MMXII — Atelier de Imaginería</span>
          <span className="preloader-counter font-monumental">
            {String(progress).padStart(3, "0")}
          </span>
        </div>
        <div className="preloader-track">
          <div
            className="preloader-fill"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
        <div className="preloader-words">
          {["Mármol", "Pan de oro", "Bronce", "Liturgia"].map((w, i) => (
            <span
              key={w}
              className="preloader-word"
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
      <div className="preloader-curtain" />
    </div>
  );
}
