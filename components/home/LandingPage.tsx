/* eslint-disable @typescript-eslint/no-unused-expressions */
import CTASection from "@/components/home/CtaSection";
import FeaturesSection from "@/components/home/FeatureSection";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import HomeNavbar from "@/components/home/HomeNavbar";
import LatestJobsSection from "@/components/home/LatestJobSection";
import LatestJobsSkeleton from "@/components/home/LatestJobSkeleton";

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const role = session.user.role?.toUpperCase();

    if (role === "CANDIDATE") {
      redirect(`/candidate/${session.user.name}/profile`);
    }

    if (role === "EMPLOYER") {
      redirect(`/employer/${session.user.name}/profile`);
    }
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
