"use client";

import React from "react";
import Image from "next/image";
import { Badge, Button } from "@/src/shared";
import { EyeClosedIcon, UserIcon } from "lucide-react";
import { ApplicationStatus } from "@/prisma/generated/enums";

interface ApplicantCardProps {
  id: string;
  image?: string;
  email?: string;
  name?: string;
  location: string;
  jobTitle: string;
  requestedAt: Date;
  applicationStatus: ApplicationStatus;
}

const badgeVariants = {
  ACCEPTED: "default",
  PENDING: "outline",
  REJECTED: "destructive",
  REVIEWED: "ghost",
} as const;

const ApplicantCard = (applicantDetails: ApplicantCardProps) => {
  return (
    <div className="w-full p-5 grid grid-cols-8">
      <div className="flex flex-row gap-x-5 col-span-3 items-center">
        {applicantDetails.image ? (
          <Image
            alt="avatarImage"
            src={applicantDetails.image}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <UserIcon />
        )}
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-semibold">
            {applicantDetails.name ?? "name"}
          </h1>
          <p className="text-sm text-neutral-600">
            {applicantDetails.email ?? "email"}
          </p>
        </div>
      </div>

      <p className="col-span-1 capitalize text-md text-neutral-600">
        {applicantDetails.location ?? "location"}
      </p>
      <p className="col-span-1 capitalize text-md text-neutral-600">
        {applicantDetails.jobTitle ?? "job title"}
      </p>
      <p className="col-span-1 capitalize text-md text-neutral-600">
        {applicantDetails.requestedAt.toDateString() ?? "requested at"}
      </p>
      <Badge
        className="col-span-1"
        variant={badgeVariants[applicantDetails.applicationStatus]}
      >
        {applicantDetails.applicationStatus}
      </Badge>

      {/* actions */}
      <Button variant={"ghost"} className="col-span-1">
        <EyeClosedIcon />
      </Button>
    </div>
  );
};

export default ApplicantCard;
