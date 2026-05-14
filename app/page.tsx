"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Footer from "@/components/home/Footer";
import { authClient } from "@/lib/auth-client";
import HomeNavbar from "@/components/home/HomeNavbar";
import CTASection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeatureSection";
import LatestJobsSection from "@/components/home/LatestJobSection";
import LatestJobsSkeleton from "@/components/home/LatestJobSkeleton";
import HomePageSkeleton from "@/components/Skeletons/HomePageSkeleton";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (session?.user?.username) {
      router.replace(`/${session.user.username}`);
    }
  }, [session, isPending, router]);
  if (isPending) {
    return <HomePageSkeleton />;
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
