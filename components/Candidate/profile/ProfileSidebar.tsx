"use client";

import React, { Suspense } from "react";
import { Separator } from "../../ui/separator";
import ContactCard from "./ContactCard";
import { CardWrapper } from "../../ui/CardWrapper";
import SkillsCard from "./SkillsCard";
import SkillsSkeleton from "./ProfileSkeleton/SkillsSkeleton";

interface ProfileSidebarProps {
  bio?: string | null;
  skills?: string[];
  resumeUrl?: string | null;
  portfolioUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
}

export default function ProfileSidebar({
  bio,
  githubUrl,
  linkedinUrl,
  portfolioUrl,
  resumeUrl,
  skills,
}: ProfileSidebarProps) {
  return (
    <Suspense fallback={<SkillsSkeleton />}>
      <CardWrapper className="h-fit sticky flex flex-col gap-y-5 max-w-1/3">
        <div id="personal info">
          <h1 className="text-muted-foreground flex justify-between">
            Personal information
            <span className=" text-blue-500 text-xs">Edit</span>
          </h1>
          <p className="mt-2 text-sm">{bio}</p>
        </div>
        <Separator />
        <ContactCard
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
          portfolioUrl={portfolioUrl}
          resumeUrl={resumeUrl}
        />
        <Separator />
        <SkillsCard skills={skills} />
      </CardWrapper>
    </Suspense>
  );
}
