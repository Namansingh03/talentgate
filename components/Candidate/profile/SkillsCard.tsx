"use client";

import { Plus } from "lucide-react";
import SkillDialog from "./EditDialogs/SkillDialog";
import { useState } from "react";
import { UpdateProfile } from "@/app/api/candidate/profile";
import { toast } from "sonner";

interface SkillsCardProps {
  skills?: string[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [skillValues, setSkillValues] = useState<string[]>([]);

  const handleSubmit = async (): Promise<boolean> => {
    const res = await UpdateProfile({ skills: skillValues });

    if (res.success) {
      toast.success("About updated successfully");
      return true;
    }

    toast.error(res.message ?? "Failed to update");
    return false;
  };
  return (
    <div className="bg-neutral-50">
      {/* Header */}
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
        Skills
      </p>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2 mb-3">
        {skills?.length ? (
          skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="text-xs px-2 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-400">No skills added yet.</p>
        )}
        <div className="flex items-center justify-center border border-gray-200 rounded-md p-1">
          <Plus size={14} className="text-gray-600" />
        </div>
      </div>
      <SkillDialog
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        open={dialogOpen}
      />
    </div>
  );
}
