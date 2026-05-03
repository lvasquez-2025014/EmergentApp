import { useEffect, useRef } from "react";

// Splits a string into spans (words and chars) and reveals them
// when the element enters viewport.
export default function RevealText({
  as: Tag = "h2",
  text,
  className = "",
  splitBy = "word", // 'word' | 'char'
  stagger = 0.04,
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-active");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tokens =
    splitBy === "char"
      ? Array.from(text)
      : text.split(/(\s+)/);

  return (
    <Tag ref={ref} className={`reveal-text ${className}`}>
      {tokens.map((t, i) => {
        if (/^\s+$/.test(t)) return <span key={i}>{t}</span>;
        return (
          <span key={i} className="reveal-word">
            <span
              className="reveal-inner"
              style={{
                transitionDelay: `${delay + i * stagger}s`,
              }}
            >
              {t}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
