"use client";

import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSidebar";
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";
import AboutCard from "./AboutCard";
import { UserWithProfile } from "@/types/prismaTypes";
import { Suspense } from "react";
import ProfileHeaderSkeleton from "./ProfileSkeleton/ProfileHeaderSkeleton";
import AboutSkeleton from "./ProfileSkeleton/AboutSkeleton";
import ExperienceSkeleton from "./ProfileSkeleton/ExperienceSkeleton";

export default function ProfilePage({ user }: { user: UserWithProfile }) {
  return (
    <div className="w-full bg-blue-500 relative">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader
          AvatarImageUrl={user?.image}
          displayName={user?.name}
          headline={user?.candidateProfile?.headline}
          isAvailable={user?.candidateProfile?.isOpenToWork}
          location={user?.candidateProfile?.location}
          username={user?.username}
        />
      </Suspense>

      {/* Main Content Wrapper */}
      <div className="w-full flex justify-center absolute top-60 px-10 gap-x-10 ">
        <ProfileSidebar
          skills={user.candidateProfile?.skills}
          bio={user.candidateProfile?.bio}
          githubUrl={user.candidateProfile?.githubUrl}
          linkedinUrl={user.candidateProfile?.linkedinUrl}
          portfolioUrl={user.candidateProfile?.portfolioUrl}
          resumeUrl={user.candidateProfile?.resumeUrl}
        />
        <div className="w-full max-w-2xl flex gap-10 items-start">
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
