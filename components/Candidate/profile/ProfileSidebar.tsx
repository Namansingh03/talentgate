"use client";

import React from "react";
import { Separator } from "../../ui/separator";
import ContactCard from "./ContactCard";
import { CardWrapper } from "../../ui/CardWrapper";
import SkillsCard from "./SkillsCard";

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
    <CardWrapper className="h-fit sticky flex flex-col gap-y-5">
      <div id="personal info">
        <h1 className="text-muted-foreground">Personal information</h1>
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
  );
}
