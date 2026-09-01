"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

// Each of the 3 review slides has its own map in the source file (node ids
// 796:1591 / 796:1657 / 796:1634) — same Iran outline, but a different
// decorative region accent, a different pin location, and a different
// region label. Pin/label positions are the real Figma coordinates
// (ellipse/text center), converted to percentages of the map image's own
// bounds so they scale with the element at any size. Map variant assigned to
// each slide was confirmed by direct visual comparison of all 4 exported map
// images — "iran-map-3.png" turned out to be a near-duplicate of the south
// variant (same cutout position), so it's unused; "iran-map-2.png" is the
// one that's actually visually distinct and used for the north slide.
const SLIDES = [
  {
    photo: "/images/review-photo-3.jpg",
    title: "توی یک ظهر گرم تابستونی..",
    body: "دوغ آبعلی توی یک ظهر گرم تابستونی خیلی میچسبه !",
    map: "/images/iran-map-south.png",
    region: "جــنـوب",
    pin: { x: 56.26, y: 55.51 },
    label: { x: 55.17, y: 70.57 },
  },
  {
    photo: "/images/review-photo-1.png",
    title: "من عاشق دوغ آبعلی ام !",
    body: "دوغ آبعلی من رو به خاطرات دوران کودکی میبره و هر بار از خوردن این نوشیدنی لذت میبرم",
    map: "/images/iran-map-north.png",
    region: "غــرب",
    pin: { x: 12.61, y: 5.34 },
    label: { x: 15.21, y: 19.86 },
  },
  {
    photo: "/images/review-photo-2.jpg",
    title: "من برای سلامتم دوغ میخورم!",
    body: "برای منی که ورزش میکنم و از خوردن نوشیدنی های قندی پرهیز میکنم دوغ آبعلی جذاب ترین گزینه اس",
    map: "/images/iran-map-2.png",
    region: "شمال",
    pin: { x: 51.46, y: 21.31 },
    label: { x: 50.15, y: 36.44 },
  },
];

export function ReviewsSection() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  const next = () => setActive((i) => (i + 1) % SLIDES.length);
  const prev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="rounded-[10px] bg-secondary px-6 py-3 text-2xl font-bold text-brand">
          نظرات شما
        </span>
        <h2 className="text-3xl font-extrabold text-[#222628] sm:text-5xl">
          آبعـلــی ، برای تمام اقوام ایران
        </h2>
      </div>

      {/* flex-row-reverse under dir="rtl" lays DOM order out strictly left-to-right,
          reproducing the source's testimonial card (left) / map (right) arrangement */}
      <div className="mt-16 flex flex-col-reverse items-center gap-16 sm:flex-row-reverse sm:items-center sm:justify-between">
        {/* testimonial card */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-[290px]">
            <div className="pointer-events-none absolute inset-x-3 top-6 h-[210px] rounded-2xl bg-brand-yellow/35" />
            <div className="relative overflow-hidden rounded-2xl bg-brand-yellow shadow-lg">
              <Image
                key={slide.photo}
                src={slide.photo}
                alt="نظر مشتری درباره دوغ آبعلی"
                width={337}
                height={227}
                className="h-[200px] w-full animate-in fade-in object-cover duration-500"
              />
              <div className="flex flex-col gap-2 px-5 py-5">
                <p className="text-xl font-bold text-ink">{slide.title}</p>
                <p className="text-sm leading-relaxed text-[#222628]">{slide.body}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  {SLIDES.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === active ? "w-6 bg-white" : "w-2 bg-ink/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* plain row under dir="rtl" renders DOM-first on the right: "next" (down
              chevron) first puts it on the right, "prev" (up chevron) on the left */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={next}
              aria-label="نظر بعدی"
              className="flex size-[55px] items-center justify-center rounded-full bg-brand-yellow text-ink transition-transform hover:scale-105"
            >
              <ChevronDown className="size-6" />
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="نظر قبلی"
              className="flex size-[55px] items-center justify-center rounded-full bg-brand-yellow text-ink transition-transform hover:scale-105"
            >
              <ChevronUp className="size-6" />
            </button>
          </div>
        </div>

        {/* map */}
        <div className="relative w-full max-w-[520px]">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-brand/10" />
          <Image
            key={slide.map}
            src={slide.map}
            alt="نقشه ایران"
            width={677}
            height={609}
            className="relative w-full animate-in fade-in duration-500"
          />
          <div
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-2 transition-all duration-500"
            style={{ left: `${slide.pin.x}%`, top: `${slide.pin.y}%` }}
          >
            <div className="relative flex size-[85px] items-center justify-center">
              {/* teardrop tail: a rotated square peeking out below the avatar circle */}
              <div className="absolute top-14 left-1/2 -z-10 size-7 -translate-x-1/2 rotate-45 rounded-br-xl bg-brand-yellow" />
              <span className="relative z-10 flex size-full items-center justify-center rounded-full border-4 border-brand-yellow bg-white p-1 shadow-lg">
                <Image
                  key={slide.photo}
                  src={slide.photo}
                  alt=""
                  width={80}
                  height={80}
                  className="size-full rounded-full object-cover"
                />
              </span>
            </div>
          </div>
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-white/90 px-3 py-1 text-sm font-bold whitespace-nowrap text-ink transition-all duration-500"
            style={{ left: `${slide.label.x}%`, top: `${slide.label.y}%` }}
          >
            {slide.region}
          </span>
        </div>
      </div>
    </section>
  );
}
