"use client";

import { useState } from "react";
import { CardWrapper } from "../../ui/CardWrapper";
import EducationEditDialog from "./EditDialogs/EducationEditDialog";

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date | null;
  isCurrent: boolean;
  description?: string | null;
}

interface EducationCardProps {
  education?: Education[];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function EducationCard({ education }: EducationCardProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Education | null>(null);

  const openAddDialog = () => {
    setSelected(null);
    setOpen(true);
  };

  const sorted = [...(education || [])].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <CardWrapper>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase">Education</p>
        <button onClick={openAddDialog} className="text-xs text-blue-500">
          + Add
        </button>
      </div>

      {!education?.length ? (
        <p className="text-sm text-gray-500">No education added yet.</p>
      ) : (
        <div className="ml-1 space-y-5">
          {sorted.map((edu, index) => {
            const isLast = index === sorted.length - 1;

            return (
              <div
                key={edu.id}
                className={`pl-4 relative ${
                  !isLast ? "pb-5 border-l border-blue-300" : ""
                }`}
              >
                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-blue-400" />

                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {edu.degree} in {edu.field}
                    </p>

                    <p className="text-sm text-gray-500">{edu.school}</p>

                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(edu.startDate)} –{" "}
                      {edu.isCurrent
                        ? "Present"
                        : edu.endDate
                          ? formatDate(edu.endDate)
                          : "—"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ONE DIALOG ONLY */}
      <EducationEditDialog
        open={open}
        onOpenChange={setOpen}
        school={selected?.school}
        degree={selected?.degree}
        field={selected?.field}
        startDate={selected?.startDate}
        endDate={selected?.endDate}
        isCurrent={selected?.isCurrent}
        description={selected?.description ?? ""}
      />
    </CardWrapper>
  );
}
