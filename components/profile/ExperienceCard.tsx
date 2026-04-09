"use client";

import { CardWrapper } from "../ui/CardWrapper";

interface WorkExperience {
  id: string;
  company: string;
  title: string;
  location?: string | null;
  startDate: Date;
  endDate?: Date | null;
  isCurrent: boolean;
  description?: string | null;
}

interface ExperienceCardProps {
  experiences?: WorkExperience[];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function ExperienceCard({ experiences }: ExperienceCardProps) {
  if (!experiences?.length) {
    return (
      <CardWrapper>
        <p className="text-sm text-gray-400">No experience added yet.</p>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Work experience
        </p>

        <button className="text-xs text-blue-500">+ Add</button>
      </div>

      {/* Timeline */}
      <div className="ml-1">
        {experiences.map((exp, index) => {
          const isLast = index === experiences.length - 1;

          return (
            <div
              key={exp.id}
              className={`pl-4 relative ${
                !isLast ? "pb-5 border-l border-gray-100" : ""
              }`}
            >
              {/* Dot */}
              <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gray-200" />

              {/* Content */}
              <div>
                <p className="text-sm font-medium text-gray-900">{exp.title}</p>

                <p className="text-sm text-gray-500 mt-0.5">
                  {exp.company}
                  {exp.location && ` · ${exp.location}`}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(exp.startDate)} –{" "}
                  {exp.isCurrent
                    ? "Present"
                    : exp.endDate
                      ? formatDate(exp.endDate)
                      : "—"}
                </p>

                {exp.description && (
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {exp.description}
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
