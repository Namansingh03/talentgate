"use client";

import React, { Suspense, useState } from "react";
import { Separator } from "../../ui/separator";
import ContactCard from "./ContactCard";
import { CardWrapper } from "../../ui/CardWrapper";
import SkillsCard from "./SkillsCard";
import SkillsSkeleton from "./ProfileSkeleton/SkillsSkeleton";
import { UpdateProfile } from "@/app/api/candidate/profile";
import { toast } from "sonner";
import TextEditDialog from "./EditDialogs/TextEditDialogs";
import { useRouter } from "next/navigation";

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
  const [aboutText, setAboutText] = useState(bio ?? "");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (value: string): Promise<boolean> => {
    const res = await UpdateProfile({
      candidateProfile: {
        bio: value,
      },
    });

    if (res.success) {
      setAboutText(value);
      toast.success("About updated successfully");
      router.refresh();
      return true;
    }

    toast.error(res.message ?? "Failed to update");
    return false;
  };

  return (
    <Suspense fallback={<SkillsSkeleton />}>
      <CardWrapper className="h-fit sticky flex flex-col gap-y-5 max-w-md min-w-3xs z-5">
        <div id="personal info">
          <h1 className="text-muted-foreground flex justify-between">
            Personal information
            <span
              className=" text-blue-500 text-xs"
              onClick={() => setDialogOpen(true)}
            >
              Edit
            </span>
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
      <TextEditDialog
        label="About"
        initialText={aboutText}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        maxLength={200}
      />
    </Suspense>
  );
}
