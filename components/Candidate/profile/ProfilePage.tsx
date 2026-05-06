"use client";

import { Suspense } from "react";
import AboutCard from "./AboutCard";
import ProfileHeader from "./ProfileHeader";
import EducationCard from "./EducationCard";
import ProfileSidebar from "./ProfileSidebar";
import { UserProfileType } from "@/helpers/PrismaTypes";
import AboutSkeleton from "./ProfileSkeleton/AboutSkeleton";
import ExperienceCard from "@/components/ui/ExperienceCard";
import ExperienceSkeleton from "./ProfileSkeleton/ExperienceSkeleton";
import ProfileHeaderSkeleton from "./ProfileSkeleton/ProfileHeaderSkeleton";

export default function ProfilePage({ user }: { user: UserProfileType }) {
  return (
    <div className="w-full bg-blue-500 relative">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader
          AvatarImageUrl={user.image}
          bannerImageUrl={user.candidateProfile?.bannerImage}
          displayName={user.displayUsername}
          headline={user.headline}
          isAvailable={user.candidateProfile?.isOpenToWork}
          location={user.location}
          username={user.username}
        />
      </Suspense>

      {/* Main Content Wrapper */}
      <div className="w-full flex justify-center absolute top-60 px-10 gap-x-10 bg-neutral-10 ">
        <ProfileSidebar
          skills={user.candidateProfile?.skills}
          bio={user.bio}
          githubUrl={user.candidateProfile?.githubUrl}
          linkedinUrl={user.candidateProfile?.linkedinUrl}
          portfolioUrl={user.candidateProfile?.portfolioUrl}
          resumeUrl={user.candidateProfile?.resumeUrl}
        />
        <div className="w-full max-w-2xl flex gap-10 items-start z-2">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-5 rounded-2xl">
            <Suspense fallback={<AboutSkeleton />}>
              <AboutCard about={user.candidateProfile?.about} />
            </Suspense>
            <ExperienceCard experiences={user.candidateProfile?.experience} />
            <Suspense fallback={<ExperienceSkeleton />}></Suspense>
            <EducationCard education={user.candidateProfile?.education} />
            <Suspense fallback={<EducationCard />}></Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
