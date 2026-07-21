"use client";

import React from "react";
import { BadgeCheck, CircleCheck, FileCheck } from "lucide-react";

interface AboutRoleCardProps {
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const AboutRoleCard = ({
  description,
  requirements,
  responsibilities,
}: AboutRoleCardProps) => {
  return (
    <div className="flex flex-col gap-y-5 border-2 border-indigo-300 rounded-lg shadow-md p-5 ">
      <h1 className="items-start capitalize text-xl font-bold text-neutral-900">
        About This role
      </h1>
      <p className="text-sm text-neutral-700">{description ?? "description"}</p>

      <div className="w-full flex flex-row items-center justify-between gap-x5">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-md capitalize font-bold flex flex-row">
            <FileCheck className="mr-2 text-indigo-900 w-6 h-6 " />{" "}
            <p>key Requirements</p>
          </h3>
          {requirements.map((req, i) => (
            <span key={i} className="flex flex-row mt-2 items-center">
              <CircleCheck className="text-green-700 h-4 w-4 mr-2" />
              <p className="text-sm text-neutral-500 ">{req}</p>
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-md capitalize font-bold flex flex-row">
            <BadgeCheck className="mr-2 w-6 h-6 text-indigo-900" />{" "}
            <p>key responsibilities</p>
          </h3>
          {responsibilities.map((res, i) => (
            <span key={i} className="flex flex-row mt-2 items-center">
              <CircleCheck className="text-green-700 h-4 w-4 mr-2" />
              <p className="text-sm text-neutral-500">{res}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutRoleCard;
