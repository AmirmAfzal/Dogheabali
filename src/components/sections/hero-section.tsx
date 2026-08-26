import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-b-[80px] bg-brand pt-32 pb-16 sm:pt-64">
      {/* decorative glow — exact positions/opacity/blur pulled from the source file;
          this is what gives the hero its gradient-like depth over the flat solid fill */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[188px] left-[1049px] size-[411px] rounded-full bg-white opacity-[0.39] blur-[320px]" />
        <div className="absolute top-[312px] left-[77px] size-[411px] rounded-full bg-white opacity-25 blur-[320px]" />
        <div className="absolute top-[735px] left-[375px] size-[411px] rounded-full bg-white opacity-[0.39] blur-[320px]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        <div className="mb-6 flex flex-row-reverse items-center gap-2 rounded-lg bg-white/[0.18] px-5 py-3 text-lg font-medium text-white backdrop-blur-[3.5px] sm:text-2xl">
          <Image
            src="/images/jug-icon.png"
            alt=""
            width={37}
            height={37}
            className="size-7 sm:size-9"
          />
          با آبعلی خاطره هات رو به یادماندنی کن
        </div>

        <h1 className="text-5xl leading-[1.1] font-black text-white sm:text-7xl lg:text-[120px]">
          دوغـت رو بنــــوش!
        </h1>

        <div className="mt-6 flex items-center gap-3 pl-64 text-lg font-medium text-white sm:text-2xl">
          <span>از اینجا بازش کن!</span>
          <Image
            src="/images/hero-pointer-arrow.svg"
            alt=""
            width={96}
            height={42}
            className="h-4 w-auto sm:h-5"
          />
        </div>
      </div>

      {/* products on the yellow platform */}
      <div className="relative mx-auto mt-16 container">
        <div
          className="w-full relative overflow-visible rounded-[48px] h-96 my-48 bg-brand-yellow/95 py-16 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] sm:rounded-[61px] sm:py-20"
          style={{
            backgroundImage: "url('/images/yellow background.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* DOM order is right-to-left visually under dir="rtl", so this list is
              written can -> glass -> family to reproduce the source's
              family (left) / glass (center) / can (right) arrangement */}
          <div className="absolute z-10 top-1/6 left-1/4 size-[411px] rounded-full bg-white opacity-[0.39] blur-[320px]" />
          <div className="w-full z-20 flex flex-col items-center justify-center gap-10 sm:flex-row sm:items-end sm:gap-4 lg:gap-8">
            <div className="flex flex-row items-center absolute -right-20 top-1/2 -translate-y-1/2">
              <Image
                src="/images/group-840-3.png"
                alt="دوغ آبعلی قوطی ۳۳۰ میلی لیتر"
                width={800}
                height={1500}
                priority
                unoptimized
                className={`h-[220px] w-auto sm:h-[300px] lg:h-[700px] z-10  drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)]`}
              />
              <LabelPill
                pillSrc="/images/label-pill-icon-left.svg"
                label="قوطی"
                sublabel="۳۳۰ میلی لیتر"
                iconSide="left"
                className="-mr-52"
              />
            </div>

            <Image
              src="/images/glass-bottle.png"
              alt="دوغ آبعلی شیشه ای"
              width={800}
              height={1500}
              priority
              unoptimized
              className={`h-[220px] w-auto sm:h-[300px] lg:h-[750px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)]`}
            />
            <div className="flex flex-row items-center absolute -left-20 top-1/2  -translate-y-1/2">
              <LabelPill
                pillSrc="/images/label-pill-icon-right.svg"
                label="خانواده"
                sublabel="۱/۵ لیتر"
                iconSide="right"
                className="-ml-72"
              />
              <Image
                src="/images/group-911-3.png"
                alt="دوغ آبعلی خانواده ۱/۵ لیتر"
                width={800}
                height={1500}
                priority
                unoptimized
                className={`h-[220px] w-auto sm:h-[300px] lg:h-[870px]  drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)]`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Text placement mirrors the source exactly: the pill SVGs (exported from
// Figma) already contain the icon + white pill shape at their native
// 299x114 size. In Figma the text isn't centered in a fixed box — it starts
// right next to the icon (58px icon + 20px gap = 78px from that edge, i.e.
// 78/299 = 26.1%) and grows naturally outward from there, which is exactly
// what anchoring one side (without setting a width) gives us here.
function LabelPill({
  pillSrc,
  label,
  sublabel,
  iconSide,
  className,
}: {
  pillSrc: string;
  label: string;
  sublabel: string;
  /** Which side of the pill the icon circle sits on (baked into the SVG) */
  iconSide: "left" | "right";
  className?: string;
}) {
  return (
    <div className={`relative h-[114px] w-[299px] ${className ?? ""}`}>
      <Image
        src={pillSrc}
        alt=""
        fill
        unoptimized
        className="pointer-events-none"
      />
      <div
        className="absolute top-1/2 flex -translate-y-1/2 flex-col text-right leading-tight whitespace-nowrap text-brand"
        style={iconSide === "left" ? { left: "26.1%" } : { right: "26.1%" }}
      >
        <span className="text-2xl font-bold">{label}</span>
        <span className="text-base">{sublabel}</span>
      </div>
    </div>
  );
}
