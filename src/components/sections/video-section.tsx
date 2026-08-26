"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Placeholder clips (generic stock footage) — swap `src` for the real
// videos when they're ready, everything else (slider, play/pause, posters)
// already works against any 3 sources here.
const VIDEOS = [
  { src: "/videos/feature-video-1.mp4", poster: "/images/video-poster.png" },
  { src: "/videos/feature-video-2.mp4", poster: "/images/feature-video-2-poster.jpg" },
  { src: "/videos/feature-video-3.mp4", poster: "/images/feature-video-3-poster.jpg" },
];

export function VideoSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = VIDEOS[active];

  const goTo = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  const togglePause = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play();
    else el.pause();
  };

  return (
    <section className="mx-auto container px-4 pb-20 sm:pb-28 mt-32">
      <div className="relative overflow-hidden rounded-[36px] sm:rounded-[73px]">
        {playing ? (
          <video
            key={video.src}
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            autoPlay
            playsInline
            onClick={togglePause}
            onEnded={() => setPlaying(false)}
            className="h-[320px] w-full cursor-pointer bg-black object-cover sm:h-[700px]"
          />
        ) : (
          <Image
            src={video.poster}
            alt="چهار نسل خاطره با آبعلی"
            width={1309}
            height={636}
            className="h-[320px] w-full object-cover sm:h-[700px]"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />

        {!playing && (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="پخش ویدیو"
            className="group absolute top-1/2 left-1/2 flex size-[110px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-105 sm:size-[160px]"
          >
            <span className="flex size-[75px] items-center justify-center rounded-full bg-white shadow-lg sm:size-[110px]">
              <Play className="size-7 translate-x-0.5 fill-brand text-brand sm:size-9" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-4 px-4 sm:bottom-12 sm:gap-6">
          <p className="text-2xl font-extrabold text-white sm:text-4xl">
            چهار نسل خاطره با آبعلی
          </p>
          <div className="pointer-events-auto flex items-center gap-1.5">
            {VIDEOS.map((v, i) => (
              <button
                key={v.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`ویدیوی ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === active ? "w-16 bg-white" : "w-2 bg-white/40",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
