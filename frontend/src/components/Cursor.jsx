import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      target = null;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // magnetic offset toward hovered target center
      if (target) {
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        mx = mx + (cx - mx) * 0.25;
        my = my + (cy - my) * 0.25;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      if (labelRef.current) {
        labelRef.current.style.left = `${rx}px`;
        labelRef.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e) => {
      const t = e.target.closest(
        "a, button, input, textarea, [data-cursor='active']"
      );
      if (t) {
        target = t;
        document.body.classList.add("cursor-active");
        const lbl = t.getAttribute("data-cursor-label");
        if (labelRef.current) {
          labelRef.current.textContent = lbl || "";
          labelRef.current.classList.toggle("visible", !!lbl);
        }
      }
    };
    const onOut = (e) => {
      const t = e.target.closest(
        "a, button, input, textarea, [data-cursor='active']"
      );
      if (t) {
        target = null;
        document.body.classList.remove("cursor-active");
        if (labelRef.current) {
          labelRef.current.classList.remove("visible");
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
