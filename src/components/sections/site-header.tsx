"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// DOM order renders right-to-left visually under dir="rtl" in this plain
// (non-reversed) row, so this list is written features -> about -> shop -> reviews
// to reproduce the source's reviews / shop / about / features left-to-right order.
const NAV_LINKS = [
  { href: "#features", label: "ویژگی ها" },
  { href: "#about", label: "آشنایی با ما" },
  { href: "#shop", label: "خرید آنلاین" },
  { href: "#reviews", label: "نظرات شما" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="top"
      className="fixed inset-x-0 top-4 z-50 mx-auto flex container  flex-col "
    >
      <div className="relative rounded-3xl bg-white shadow-[0_10px_30px_-15px_rgba(14,14,14,0.35)]">
        <div className="relative flex h-[72px] items-center justify-between px-4 sm:h-[88px] sm:px-6">
          {/* Visible at all sizes to match the source; on desktop the dark pill nav
              below already shows the links persistently, so this click is a no-op there */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  className="flex size-9 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-chip"
                  aria-label="باز کردن منو"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 gap-0 border-none bg-brand-dark p-4 text-white"
            >
              <SheetTitle className="sr-only">منو</SheetTitle>
              <nav className="mt-10">
                <ul className="flex flex-col items-center gap-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href} className="w-full">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-4 py-3 text-center text-lg font-bold transition-colors hover:bg-white/10"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            href="#top"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/logo.svg"
              alt="دوغ آبعلی"
              width={93}
              height={59}
              priority
              className="h-10 w-auto sm:h-[52px]"
            />
          </Link>

          {/* flex-row-reverse under dir="rtl" lays DOM order out strictly left-to-right,
              reproducing the source's login button (left) / cart icon (right) */}
          <div className="flex flex-row-reverse items-center gap-2">
            <Button
              render={<Link href="#shop" />}
              nativeButton={false}
              size="lg"
              className="rounded-md px-3 font-bold sm:px-4"
            >
              <Users className="size-4" />
              <span className="hidden sm:inline">ثبت نام یا ورود</span>
              <span className="sm:hidden">ورود</span>
            </Button>
            <button
              type="button"
              aria-label="سبد خرید"
              className="flex size-[38px] shrink-0 items-center justify-center rounded-[5px] bg-chip text-brand transition-colors hover:bg-chip/70"
            >
              <ShoppingBag className="size-5" />
            </button>
          </div>
        </div>

        {/* desktop nav pill, overlapping the bottom edge of the white bar */}
      </div>
      <nav className=" w-full lg:flex px-6">
        <ul className="w-full flex justify-center items-center gap-10 rounded-b-[28px] bg-brand-dark px-10 py-4 text-lg font-bold text-white">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
