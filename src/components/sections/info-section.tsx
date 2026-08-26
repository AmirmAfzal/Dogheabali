"use client";

import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

// Placeholder clip — swap for the real video when it's ready.
const VIDEO_SRC = "/videos/feature-video-1.mp4";
const POSTER_SRC = "/images/subtract-2.png";

// The photo/video isn't a plain rounded rect in the source — it's a boolean
// "Subtract" shape with a notch cut out of the top-left corner where the
// "100%" badge sits. Path pulled from Figma (node 1024:967) and converted to
// fractional (objectBoundingBox) coordinates so it scales with the element
// at any rendered size instead of being tied to the original 676x582 frame.
const PHOTO_CLIP_PATH =
  "M0.02663 0.19759 C0.01192 0.19759, 0.00000 0.21144, 0.00000 0.22852 V0.93127 C0.00000 0.96923, 0.02649 1.00000, 0.05917 1.00000 H0.94083 C0.97351 1.00000, 1.00000 0.96923, 1.00000 0.93127 V0.06873 C1.00000 0.03077, 0.97351 0.00000, 0.94083 0.00000 H0.27811 C0.26340 0.00000, 0.25148 0.01385, 0.25148 0.03093 V0.12887 C0.25148 0.16682, 0.22499 0.19759, 0.19231 0.19759 H0.02663 Z";

export function InfoSection() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePause = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play();
    else el.pause();
  };

  return (
    <section id="about" className="mx-auto container px-4 py-20 sm:py-28">
      {/* hidden SVG just to host the reusable clipPath definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="info-photo-clip" clipPathUnits="objectBoundingBox">
            <path d={PHOTO_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* flex-row-reverse under dir="rtl" lays DOM order out strictly left-to-right,
          reproducing the source's text (left) / image (right) arrangement */}
      <div className="flex flex-col items-center gap-12 overflow-hidden rounded-[33px] bg-surface p-8 sm:flex-row-reverse sm:p-16">
        <div className="flex flex-1 flex-col items-center gap-6 text-center sm:items-start sm:text-right">
          <h2 className="text-4xl leading-tight font-black text-ink sm:text-5xl">
            دوغ آبعلی، همون همیشگی!
          </h2>
          <p className="max-w-[630px] text-lg leading-relaxed font-light text-ink/80 sm:text-2xl">
            با افتخار شرکت مینو می تواند ادعا کند که کیفیت دوغ آبعلی اندکی تغییر نسبت به گذشته نداشته است.
          </p>
          <div className="flex flex-row-reverse gap-4">
            <button className="rounded-[19px] bg-secondary px-10 py-5 text-xl font-extrabold text-brand">
              دربـــاره مــا
            </button>
            <button className="rounded-[19px] bg-brand px-10 py-5 text-xl font-extrabold text-white">
              ثبت سفارش
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-[420px] shrink-0 sm:max-w-none sm:flex-1">
          {playing ? (
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted={muted}
              playsInline
              onClick={togglePause}
              onEnded={() => setPlaying(false)}
              className="h-[320px] w-full cursor-pointer bg-ink object-cover sm:h-[430px]"
              style={{ clipPath: "url(#info-photo-clip)" }}
            />
          ) : (
            <Image
              src={POSTER_SRC}
              alt="دوغ آبعلی، همون همیشگی!"
              width={676}
              height={582}
              className="h-[320px] w-full object-cover sm:h-[430px]"
              style={{ clipPath: "url(#info-photo-clip)" }}
            />
          )}

          <div className="absolute -top-6 -left-3 flex flex-col items-start gap-1 rounded-bl-[18px] rounded-tl-[18px] rounded-tr-[18px] rounded-br-[30px] bg-brand px-6 py-4 text-white">
            <span className="text-3xl font-black sm:text-3xl">100%</span>
            <span className="text-lg font-medium sm:text-xl">با اطمینان</span>
          </div>

          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="پخش ویدیو"
              className="group absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-105 sm:size-24"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-lg sm:size-16">
                <Play className="size-5 translate-x-0.5 fill-brand text-brand sm:size-6" />
              </span>
            </button>
          )}

          {playing && (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "پخش صدا" : "بی‌صدا"}
              aria-pressed={!muted}
              className="absolute bottom-6 left-6 flex size-14 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
            >
              {muted ? <VolumeX className="size-6" /> : <Volume2 className="size-6" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
