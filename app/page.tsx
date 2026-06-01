"use client";

import { Suspense } from "react";
import Footer from "@/components/home/Footer";
import HomeNavbar from "@/components/home/HomeNavbar";
import CTASection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeatureSection";
import LatestJobsSection from "@/components/home/LatestJobSection";
import LatestJobsSkeleton from "@/components/home/LatestJobSkeleton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-centre justify-center">
        loading ...
      </div>
    );
  }

  if (data?.session) {
    return router.push("/redirect");
  }

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
