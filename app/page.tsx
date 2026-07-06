"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Footer from "@/components/home/Footer";
import HomeNavbar from "@/components/home/HomeNavbar";
import CTASection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeatureSection";
import { redirect } from "next/navigation";

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
