"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ExperienceCard from "@/components/profile/ExperienceCard";
import EducationCard from "@/components/profile/EducationCard";
import AboutCard from "@/components/profile/AboutCard";

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ProfileHeader />

      <div className="w-full h-auto flex flex-row gap-x-30 px-30 py-10 absolute top-55">
        <ProfileSidebar />

        <div className="flex flex-col justify-center gap-y-5">
          <AboutCard />
          <ExperienceCard />
          <EducationCard />
        </div>
      </div>
    </div>
  );
}
