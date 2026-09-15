"use client";

import { useEffect, useRef, useState } from "react";

// PLACEHOLDER STATS — not verified MILPAQ figures.
// Confirm real numbers (years operating, units handled, clients served, reliability rate)
// with the client before this ships live.
const stats = [
  { value: "25+", label: "Years of proven expertise in military packaging solutions." },
  { value: "1M+", label: "Units protected with precision-engineered packaging." },
  { value: "100+", label: "Defense and industrial clients served worldwide." },
  { value: "99.9%", label: "Reliability rate across missions and operations." },
];

const VALUE_PATTERN = /^([\d.]+)(.*)$/;

function CountUpValue({ value, animate }: { value: string; animate: boolean }) {
  const match = value.match(VALUE_PATTERN);
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!animate || !match) return;

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const duration = 1800;
    let start: number | null = null;
    let frame: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(`${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  return <>{display}</>;
}

export function StatsBand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-milpaq-deep-olive">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 shrink-0 bg-milpaq-tan" />
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-tan">
            Operational Excellence
          </p>
        </div>
        <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
          Strength Backed By Experience
        </h2>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-5xl font-bold text-white sm:text-6xl">
                <CountUpValue value={stat.value} animate={animate} />
              </p>
              <span className="mt-4 block h-px w-16 bg-white/30" />
              <p className="mt-4 text-sm leading-relaxed text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
