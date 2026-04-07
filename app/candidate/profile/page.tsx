"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ExperienceCard from "@/components/profile/ExperienceCard";
import EducationCard from "@/components/profile/EducationCard";
import AboutCard from "@/components/profile/AboutCard";
import SkillsCard from "@/components/profile/SkillsCard";
import { Suspense } from "react";
import SkillsCardSkeleton from "@/components/profile/skeletons/SkillsCardSkeleton";
import TimelineCardSkeleton from "@/components/profile/skeletons/TimelineCardSkeleton";
import AboutCardSkeleton from "@/components/profile/skeletons/AboutCardSkeleton";

export default function ProfilePage() {
  return (
    <div className="w-full bg-blue-300 relative">
      <ProfileHeader />

      {/* Main Content Wrapper */}
      <div className="w-full flex justify-center absolute top-60 px-10">
        <ProfileSidebar />
        <div className="w-full max-w-7xl flex gap-10 items-start">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-5 rounded-2xl p-8">
            <Suspense fallback={<AboutCardSkeleton />}>
              <AboutCard />
            </Suspense>

            <Suspense fallback={<TimelineCardSkeleton />}>
              <ExperienceCard />
            </Suspense>

            <Suspense fallback={<TimelineCardSkeleton />}>
              <EducationCard />
            </Suspense>

            <Suspense fallback={<SkillsCardSkeleton />}>
              <SkillsCard />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
