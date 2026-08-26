"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

// DOM order renders right-to-left visually under dir="rtl", so this list is
// written can -> family -> glass to reproduce the source's
// glass (left) / family (center) / can (right) arrangement.
const PRODUCTS = [
  {
    name: "آبعلی قوطی",
    image: "/images/group-840-4.png",
    width: 237,
    height: 408,
  },
  {
    name: "دوغ خانواده",
    image: "/images/group-911-4.png",
    width: 193,
    height: 485,
  },
  {
    name: "آبعلی شیشه‌ای",
    image: "/images/group-910-3.png",
    width: 156,
    height: 452,
  },
];

export function ShopSection() {
  const [gas, setGas] = useState<"with" | "without">("with");

  return (
    <section id="shop" className="bg-surface py-20 sm:py-28 ">
      <div className="mx-auto flex container flex-col items-center gap-10 px-4">
        {/* flex-row-reverse under dir="rtl" lays DOM order out strictly left-to-right,
            reproducing the source's بدون گاز (left) / گاز دار (right) order */}
        <div className="flex flex-row-reverse rounded-3xl bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => setGas("without")}
            className={cn(
              "rounded-xl px-8 py-4 text-xl font-extrabold transition-colors",
              gas === "without" ? "bg-secondary text-brand" : "text-ink/50"
            )}
          >
            بدون گاز
          </button>
          <button
            type="button"
            onClick={() => setGas("with")}
            className={cn(
              "rounded-xl px-8 py-4 text-xl font-extrabold transition-colors",
              gas === "with" ? "bg-brand text-white" : "text-ink/50"
            )}
          >
            گاز دار
          </button>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-[#2f2f2f] sm:text-5xl">
          نوشیدنی ایرانی برای سلیقه های متفاوت
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6 mt-24">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="group relative mx-auto flex size-90 items-end justify-center rounded-[50px] bg-brand/[0.08] transition-colors duration-300 hover:bg-brand"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={product.width}
                height={product.height}
                className="h-[280px] w-auto origin-bottom scale-100 object-contain transition-transform duration-600 group-hover:scale-150"
              />
              <div className="absolute inset-x-0 bottom-6 flex flex-row-reverse translate-y-4 items-center justify-center gap-3 px-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <button
                  type="button"
                  aria-label={`افزودن ${product.name} به سبد خرید`}
                  className="flex size-[72px] shrink-0 items-center justify-center rounded-[25px] bg-white/90 text-brand backdrop-blur-sm"
                >
                  <ShoppingBag className="size-6" />
                </button>
                <span className="rounded-[25px] bg-white/90 px-6 py-4 text-2xl font-bold text-brand backdrop-blur-sm">
                  {product.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
