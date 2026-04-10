"use client";

import { CardWrapper } from "../../ui/CardWrapper";

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
  if (!education?.length) {
    return (
      <CardWrapper>
        <p className="text-sm text-gray-400">No education added yet.</p>
      </CardWrapper>
    );
  }

  const sorted = [...education].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <CardWrapper>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Education
        </p>

        <button className="text-xs text-blue-500">+ Add</button>
      </div>

      {/* Timeline */}
      <div className="ml-1">
        {sorted.map((edu, index) => {
          const isLast = index === sorted.length - 1;

          return (
            <div
              key={edu.id}
              className={`pl-4 relative ${
                !isLast ? "pb-5 border-l border-gray-100" : ""
              }`}
            >
              {/* Dot */}
              <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gray-200" />

              {/* Content */}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {edu.degree} {edu.field && <span>in {edu.field}</span>}
                </p>

                <p className="text-sm text-gray-500 mt-0.5">{edu.school}</p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(edu.startDate)} –{" "}
                  {edu.isCurrent
                    ? "Present"
                    : edu.endDate
                      ? formatDate(edu.endDate)
                      : "—"}
                </p>

                {edu.description && (
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
}
