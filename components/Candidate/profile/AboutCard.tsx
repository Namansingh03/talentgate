"use client";

import { CardWrapper } from "../../ui/CardWrapper";

interface AboutCardProps {
  about?: string | null;
}

export default function AboutCard({ about }: AboutCardProps) {
  return (
    <CardWrapper>
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          About
        </p>

        <button className="text-xs text-blue-500 hover:text-blue-600">
          Edit
        </button>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {about && <span>{about}</span>}
      </p>
    </CardWrapper>
  );
}
