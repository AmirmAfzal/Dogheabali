"use client";

import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";

// DOM order renders right-to-left visually under dir="rtl", so this list is
// written 91% -> 100% -> 31 to reproduce the source's
// 31 (left) / 100% (center) / 91% (right) arrangement.
const STATS = [
  { end: 91, suffix: "%", label: "رضایت مصرف کننده" },
  { end: 100, suffix: "%", label: "موجود در سراسر کشور" },
  { end: 31, suffix: "", label: "سال اعتبار در کنار شما" },
];

// react-countup's own `autoAnimate` scroll-trigger fires unreliably (counts
// up on mount regardless of visibility), so the "start when it scrolls into
// view" part is driven by hand here with a plain IntersectionObserver —
// CountUp itself is only mounted once `inView` flips true, and since it
// always starts from 0 on mount, that's exactly when the animation begins.
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function StatsSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-16 mt-32">
      <div ref={ref} className="relative">
        <div className="pointer-events-none absolute inset-x-4 top-4 h-[190px] rounded-[34px] bg-brand/25" />
        <div className="relative flex flex-col items-center justify-center gap-8 rounded-[34px] bg-brand px-8 py-10 text-white sm:flex-row sm:justify-around sm:gap-4 sm:py-14">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-4 text-center">
              <span className="text-5xl font-extrabold sm:text-6xl">
                {inView ? (
                  <CountUp end={stat.end} suffix={stat.suffix} duration={2} />
                ) : (
                  `0${stat.suffix}`
                )}
              </span>
              <span className="text-xl font-medium sm:text-2xl">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
