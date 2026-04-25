/* eslint-disable @typescript-eslint/no-unused-expressions */
import CTASection from "@/components/home/CtaSection";
import FeaturesSection from "@/components/home/FeatureSection";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import HomeNavbar from "@/components/home/HomeNavbar";
import LatestJobsSection from "@/components/home/LatestJobSection";
import LatestJobsSkeleton from "@/components/home/LatestJobSkeleton";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export default async function Home() {
  "use cache";
  cacheLife("days");

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
