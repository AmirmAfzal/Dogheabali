import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InfoSection } from "@/components/sections/info-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ShopSection } from "@/components/sections/shop-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { StatsSection } from "@/components/sections/stats-section";
import { VideoSection } from "@/components/sections/video-section";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <VideoSection />
        <ShopSection />
        <StatsSection />
        <InfoSection />
        <ReviewsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
