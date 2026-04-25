"use client";

import { useState, useTransition } from "react";
import { EllipsisVertical } from "lucide-react";

import { Education } from "@/app/generated/prisma/client";
import { EducationSchemaType } from "@/schemas/CandidateSchemas";

import { CardWrapper } from "../../ui/CardWrapper";
import EducationEditDialog from "./EditDialogs/EducationEditDialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { deleteProfileEducation } from "@/app/api/candidate/profile";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
interface EducationCardProps {
  education?: Education[];
}

function formatDateFn(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function EducationCard({ education }: EducationCardProps) {
  const [open, setOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<EducationSchemaType>();
  const [eduId, setEduId] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleAdd = () => {
    setSelectedEducation(undefined);
    setEduId("");
    setOpen(true);
  };

  const handleUpdate = (edu: Education) => {
    setSelectedEducation({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      isCurrent: edu.isCurrent,
    });

    setEduId(edu.id);
    setOpen(true);
  };

  const handleDelete = async (educationId: string) => {
    console.log("Delete:", educationId);
    startTransition(async () => {
      const res = await deleteProfileEducation(educationId);

      if (!res.success) {
        toast.error(res.message, { description: formatDate() });
        return;
      }

      toast.success(res.message, { description: formatDate() });
      router.refresh();
    });
  };

  const sortedEducation = [...(education || [])].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <>
      <CardWrapper>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase text-gray-400">
            Education
          </p>

          <button
            onClick={handleAdd}
            className="text-xs font-medium text-blue-500 hover:underline"
          >
            + Add
          </button>
        </div>

        <Separator className="my-4" />

        {!education?.length ? (
          <p className="text-sm text-muted-foreground">
            No education added yet.
          </p>
        ) : (
          <div className="space-y-5">
            {sortedEducation.map((edu, index) => {
              const isLast = index === sortedEducation.length - 1;

              return (
                <div
                  key={edu.id}
                  className={`relative pl-4 ${
                    !isLast ? "border-l border-blue-300 pb-5" : ""
                  }`}
                >
                  <div className="absolute top-1.5 -left-1 h-2 w-2 rounded-full bg-blue-500" />

                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">
                        {edu.degree} in {edu.field}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {edu.school}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDateFn(edu.startDate)} —{" "}
                        {edu.isCurrent
                          ? "Present"
                          : edu.endDate
                            ? formatDateFn(edu.endDate)
                            : "—"}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <EllipsisVertical
                            size={16}
                            className="cursor-pointer text-blue-500"
                          />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Button
                            className="w-full"
                            variant={"secondary"}
                            onClick={() => handleUpdate(edu)}
                          >
                            update
                          </Button>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDelete(edu.id)}
                        >
                          <Button
                            variant={"destructive"}
                            onClick={() => handleDelete(edu.id)}
                            disabled={isPending}
                            className="w-full"
                          >
                            delete
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardWrapper>

      <EducationEditDialog
        key={eduId || "new"}
        open={open}
        onOpenChange={setOpen}
        education={selectedEducation}
        educationId={eduId}
      />
    </>
  );
}
