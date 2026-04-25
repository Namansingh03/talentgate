"use client";

import React from "react";

interface SkillsOptionsCardProps {
  skills: string[];
}

export const SkillsOptionCard = ({ skills }: SkillsOptionsCardProps) => {
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
              className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-400">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};
