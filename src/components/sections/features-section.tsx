"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// Each slide has its own unique bottle render — despite slides 1 and 3
// sharing the layer name "DOGH BA STAND 6" in the source file, their image
// fills have different hashes (confirmed via the Figma plugin API), so all
// three ("DOGH BA STAND 6/7/8") are genuinely distinct photos.
const SLIDES = [
  {
    title: "اصیل ترین نوشیدنی ایرانی",
    body: "70 کیلو کالری ، 3.5 گرم پروتئین ، : 7.6 گرم کربوهیدرات ، 3 گرم چربی",
    image: "/images/dogh-ba-stand-6.png",
    imageWidth: 360,
    imageHeight: 640,
  },
  {
    title: "دارای تائیدیه سیب سلامت",
    body: "این محصول دارای تاییدیه سیب سلامت از سازمان غذا و دارو و دارای استاندارد و گواهینامه های ایزو 9001 و 22000و 14001+ میباشد.",
    image: "/images/dogh-ba-stand-7.png",
    imageWidth: 478,
    imageHeight: 612,
    // This crop is proportionally wider/shorter than the others, so at the
    // shared display height its base sticks out well past the circle's
    // bottom edge while the cap still sits right at the top. Clip only the
    // bottom (top stays anchored, unclipped) instead of centering + clipping
    // both sides evenly.
    clipBottom: true,
  },
  {
    title: "درب آسان بازشو",
    body: "محصول دوغ آبعلی را در جای خشک و خنک ، دور از تابش مستقیم خورشید نگهداری کنید. بدین ترتیب طول عمر نگهداری آن بیشتر شود.",
    image: "/images/dogh-ba-stand-8.png",
    imageWidth: 360,
    imageHeight: 640,
  },
];

export function FeaturesSection() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  // Auto-advance every 5s; restarts on manual clicks too (active is a
  // dependency), so each slide always gets a full 5s regardless of how it
  // became active.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section id="features" className="mx-auto container px-4 py-20 sm:py-32 mt-24">
      {/* flex-row-reverse under dir="rtl" lays DOM order out strictly left-to-right,
          reproducing the source's nav bar (left) / image (center) / text (right) */}
      <div className="flex flex-col items-center gap-12 sm:flex-row-reverse sm:items-center sm:gap-16">
        {/* slide nav bar — all segments share one color; only the active
            segment's length changes, matching the source exactly. Needs its own
            stacking context so the oversized decorative circle behind the bottle
            (same brand-blue color) can't paint over it where the two overlap. */}
        <div className="relative z-10 flex items-center gap-2 sm:flex-col">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={s.title}
              aria-current={i === active}
              className={cn(
                "rounded-[4px]  transition-all duration-300",
                i === active
                  ? "h-2 w-10 sm:h-16 sm:w-2 bg-brand"
                  : "h-2 w-5 sm:h-8 sm:w-2 bg-brand/30",
              )}
            />
          ))}
        </div>

        {/* image — width matches the circle's diameter so it can't overflow
            into the nav bar's space (same brand-blue fill would hide it there) */}
        <div className="relative flex w-[300px] shrink-0 items-center justify-center sm:w-[420px]">
          <div className="pointer-events-none absolute top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand sm:size-[420px]" />
          <div
            className={cn(
              "",
              slide.clipBottom && "h-auto w-auto",
            )}
          >
            <Image
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              width={slide.imageWidth}
              height={slide.imageHeight}
              className={`relative ${slide.clipBottom ? "h-[520px] absolute bottom-0 left-1/2 -translate-x-1/2 w-auto " : "h-[520px] w-auto"} animate-in fade-in zoom-in-95 duration-500 `}
              priority
              unoptimized
            />
          </div>
        </div>

        {/* text */}
        <div
          key={active}
          className="flex flex-1 animate-in fade-in slide-in-from-bottom-4 flex-col items-center gap-6 text-center duration-500 sm:items-start sm:text-right"
        >
          <span className="rounded-md bg-brand-yellow px-6 py-3 text-2xl font-bold text-ink">
            ویژگی های دوغ آبعلی
          </span>
          <h2 className="text-4xl leading-tight font-black text-brand sm:text-5xl">
            {slide.title}
          </h2>
          <p className="max-w-[478px] text-lg leading-relaxed text-ink/90 sm:text-2xl">
            {slide.body}
          </p>
        </div>
      </div>
    </section>
  );
}
