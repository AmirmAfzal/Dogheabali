import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bonyadeKoodak = localFont({
  src: "../fonts/bonyade-koodak/BonyadeKoodakFaNum-VF.woff2",
  variable: "--font-bonyade",
  weight: "100 900",
  display: "swap",
  fallback: ["Tahoma", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "دوغ آبعلی | نوشیدنی اصیل ایرانی",
  description:
    "دوغ آبعلی، اصیل ترین نوشیدنی ایرانی. بیش از ۳۱ سال تجربه، موجود در سراسر کشور.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${bonyadeKoodak.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
