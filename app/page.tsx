import { Suspense } from "react";
import Footer from "@/components/home/Footer";
import HomeNavbar from "@/components/home/HomeNavbar";
import CTASection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeatureSection";
import LatestJobsSection from "@/components/home/LatestJobSection";
import LatestJobsSkeleton from "@/components/home/LatestJobSkeleton";

export default async function Home() {
  return (
    <main>
      <HomeNavbar />
      <HeroSection />
      <FeaturesSection />

      <Suspense fallback={<LatestJobsSkeleton />}>
        <LatestJobsSection />
      </Suspense>

      <CTASection />
      <Footer />
    </main>
  );
}
