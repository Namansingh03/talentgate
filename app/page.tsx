"use server";

import { auth } from "@/src/config/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Footer from "@/src/features/home/components/Footer";
import HomeNavbar from "@/src/features/home/components/HomeNavbar";
import CTASection from "@/src/features/home/components/CtaSection";
import HeroSection from "@/src/features/home/components/HeroSection";
import FeaturesSection from "@/src/features/home/components/FeatureSection";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/redirect");
  }

  return (
    <main>
      <HomeNavbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
