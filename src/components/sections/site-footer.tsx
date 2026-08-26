import Image from "next/image";
import { MapPin } from "lucide-react";

import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons/social-icons";

// DOM order renders right-to-left visually under dir="rtl" in a plain (non-reversed)
// row, so this list is written github -> instagram -> facebook -> twitter to
// reproduce the source's twitter / facebook / instagram / github left-to-right order.
const SOCIALS = [
  { icon: GithubIcon, label: "گیت‌هاب", href: "#" },
  { icon: InstagramIcon, label: "اینستاگرام", href: "#" },
  { icon: FacebookIcon, label: "فیسبوک", href: "#" },
  { icon: TwitterIcon, label: "توییتر", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-16">
      <div className="relative bg-brand-light pt-24 pb-16 sm:pt-16">
        <Image
          src="/images/footer-mask-group.png"
          alt=""
          aria-hidden
          fill
          className="object-cover"
        />

        {/* flex-row-reverse under dir="rtl" lays DOM order out strictly left-to-right,
            reproducing the source's bottle (left) / contact text (right) arrangement */}
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:flex-row-reverse sm:items-end sm:justify-between">
          <Image
            src="/images/footer-dogh-decor.png"
            alt="دوغ آبعلی"
            width={234}
            height={588}
            className="-mt-32 h-[260px] w-auto drop-shadow-2xl sm:-mt-40 sm:h-[470px]"
          />

          <div className="flex flex-col items-center gap-6 text-center sm:items-end sm:text-right">
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-black text-white sm:text-4xl">شماره تماس:</span>
              <span dir="ltr" className="text-2xl font-medium text-white sm:text-4xl">
                ۰۲۱ - ۴۴۵۵۶۰۰۳- ۵
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-black text-white sm:text-4xl">پست الکترونیک:</span>
              <span dir="ltr" className="text-xl font-medium text-white sm:text-4xl">
                info@behnoushiran.com
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-brand py-10">
        {/* flex-row-reverse under dir="rtl" lays DOM order out strictly left-to-right,
            reproducing the source's logo (left) / location+socials stack (right) */}
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row-reverse sm:justify-between">
          <Image src="/images/logo.svg" alt="دوغ آبعلی" width={93} height={59} className="h-12 w-auto" />

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <span className="text-lg">تهران، کیلومتر ۹ بزرگراه شهید لشگری، خیابان شهید پوری</span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                <MapPin className="size-4" />
              </span>
            </div>

            <div className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center text-white transition-opacity hover:opacity-70"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-footer py-4 text-center text-sm text-white">
        کپی رایت این وب سایت برای هیچکس محفوظ نیست چون کانسپته :)
      </div>
    </footer>
  );
}
