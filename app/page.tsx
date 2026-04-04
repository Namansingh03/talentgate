import CTASection from "@/components/home/CtaSection";
import FeaturesSection from "@/components/home/FeatureSection";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import HomeNavbar from "@/components/home/HomeNavbar";
import LatestJobsSection from "@/components/home/LatestJobSection";
import LatestJobsSkeleton from "@/components/home/LatestJobSkeleton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <HomeNavbar />
      <HeroSection />
      <FeaturesSection />
      <Separator />
      <Suspense fallback={<LatestJobsSkeleton />}>
        <LatestJobsSection />
      </Suspense>

      <CTASection />
      <Footer />
    </main>
  );
}
