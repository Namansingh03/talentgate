"use client";

import React from "react";
import {
  FieldContent,
  FieldDescription,
  FieldSet,
  FieldTitle,
} from "@/src/shared";
import clsx from "clsx";

interface jobFieldCardProps {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}

const JobFieldCard = ({
  description,
  title,
  className,
  children,
}: jobFieldCardProps) => {
  return (
    <FieldSet
      className={clsx(
        "w-full border-2 border-indigo-300 rounded-lg p-5 shadow-md",
        className,
      )}
    >
      <FieldTitle className="flex flex-col items-start text-2xl font-semibold text-neutral-800">
        {title}
        <FieldDescription>{description}</FieldDescription>
      </FieldTitle>
      <FieldContent>{children}</FieldContent>
    </FieldSet>
  );
};

export default JobFieldCard;
