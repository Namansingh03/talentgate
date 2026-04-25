"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SelectedSkills from "@/components/ui/SelectedSkills";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { UpdateProfile } from "@/app/api/candidate/profile";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

interface SkillsEditProps {
  skills?: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditSkillsDialog = ({
  onOpenChange,
  open,
  skills = [],
}: SkillsEditProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(skills);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleSave = async () => {
    console.log(selectedSkills);

    startTransition(async () => {
      const res = await UpdateProfile({
        candidateProfile: {
          skills: selectedSkills,
        },
      });

      if (!res.success) {
        toast.error(res.message, {
          description: formatDate(),
        });

        return res.redirectUrl
          ? router.push(res.redirectUrl)
          : router.refresh();
      }

      toast.success(res.message, {
        description: formatDate(),
      });

      router.refresh();
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>Skills</DialogTitle>
          <DialogDescription>Add skills to your profile</DialogDescription>
        </DialogHeader>

        <SelectedSkills skills={selectedSkills} onChange={setSelectedSkills} />

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>

          <Button variant="secondary" onClick={handleSave} disabled={isPending}>
            {isPending ? <Loader2Icon className="animate-spin" /> : "save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSkillsDialog;
