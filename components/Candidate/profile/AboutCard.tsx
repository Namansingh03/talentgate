"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CardWrapper } from "../../ui/CardWrapper";
import TextEditDialog from "./EditDialogs/TextEditDialogs";
import { UpdateProfile } from "@/app/api/candidate/profile";

interface AboutCardProps {
  about?: string | null;
}

export default function AboutCard({ about }: AboutCardProps) {
  const [aboutText, setAboutText] = useState(about ?? "");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (value: string): Promise<boolean> => {
    const res = await UpdateProfile({ about: value });

    if (res.success) {
      setAboutText(value);
      toast.success("About updated successfully");
      return true;
    }

    toast.error(res.message ?? "Failed to update");
    return false;
  };

  return (
    <CardWrapper>
      <div className="flex justify-between items-center mb-3 min-w-xl">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          About
        </p>
        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 transition-colors"
        >
          Edit
        </button>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed max-w-full overflow-y-visible">
        {aboutText || (
          <span className="text-gray-400 italic">Add an about section...</span>
        )}
      </p>
      <TextEditDialog
        label="About"
        initialText={aboutText}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        maxLength={500}
      />
    </CardWrapper>
  );
}
