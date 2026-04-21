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

      {/* Input */}
      {/* <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill..."
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none"
        />

        <button
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600"
          onClick={() => {
            if (!newSkill.trim()) return;

            // For now just log (since no backend yet)
            console.log("Add skill:", newSkill);

            setNewSkill("");
          }}
        >
          Add
        </button>
      </div> */}
    </div>
  );
};
